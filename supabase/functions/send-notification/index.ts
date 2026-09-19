import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "npm:@supabase/server@^1";
import webpush from "npm:web-push@3.6.7";

const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY");
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY");
const VAPID_SUBJECT =
  Deno.env.get("VAPID_SUBJECT") ?? "mailto:admin@example.com";

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  throw new Error("VAPID keys are not configured");
}

webpush.setVapidDetails(
  VAPID_SUBJECT,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
);

export default {
  fetch: withSupabase(
    { auth: "secret" },
    async (req, ctx) => {
      if (req.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 },
        );
      }

      try {
        const body = await req.json();

        const title = body.title;
        const message = body.body;
        const url = body.url ?? "/";

        if (!title || !message) {
          return Response.json(
            {
              error: "title and body are required",
            },
            { status: 400 },
          );
        }

        const { data: subscriptions, error: subscriptionError } =
          await ctx.supabaseAdmin
            .from("push_subscriptions")
            .select("id, endpoint, p256dh, auth")
            .eq("is_active", true);

        if (subscriptionError) {
          console.error(subscriptionError);

          return Response.json(
            {
              error: "Failed to load subscriptions",
            },
            { status: 500 },
          );
        }

        if (!subscriptions || subscriptions.length === 0) {
          return Response.json({
            success: true,
            message: "No active subscriptions found",
            sent: 0,
            failed: 0,
          });
        }

        const payload = JSON.stringify({
          title,
          body: message,
          url,
        });

        let sent = 0;
        let failed = 0;
        let removed = 0;

        for (const subscription of subscriptions) {
          try {
            await webpush.sendNotification(
              {
                endpoint: subscription.endpoint,
                keys: {
                  p256dh: subscription.p256dh,
                  auth: subscription.auth,
                },
              },
              payload,
              {
                TTL: 60,
              },
            );

            sent++;
          } catch (error) {
            failed++;

            const statusCode =
              typeof error === "object" &&
              error !== null &&
              "statusCode" in error
                ? Number(error.statusCode)
                : undefined;

            console.error(
              `Push failed for subscription ${subscription.id}:`,
              error,
            );

            // 404 and 410 normally mean the subscription is no longer valid.
            if (statusCode === 404 || statusCode === 410) {
              const { error: updateError } =
                await ctx.supabaseAdmin
                  .from("push_subscriptions")
                  .update({ is_active: false })
                  .eq("id", subscription.id);

              if (!updateError) {
                removed++;
              }
            }
          }
        }

        return Response.json({
          success: true,
          sent,
          failed,
          removed,
          total: subscriptions.length,
        });
      } catch (error) {
        console.error("Notification error:", error);

        return Response.json(
          {
            error: "Failed to send notifications",
          },
          { status: 500 },
        );
      }
    },
  ),
};