import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const VAPID_PUBLIC = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export function usePushNotifications() {
  const supported = typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window;
  const [permission, setPermission] = useState(typeof Notification === 'undefined' ? 'denied' : Notification.permission);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!supported) return;
    navigator.serviceWorker.getRegistration().then((registration) => registration?.pushManager.getSubscription()).then((subscription) => setSubscribed(Boolean(subscription)));
  }, [supported]);

  async function register() {
    if (!supported || !VAPID_PUBLIC || !supabase) return false;

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const nextPermission = await Notification.requestPermission();
      setPermission(nextPermission);
      if (nextPermission !== 'granted') return false;

      const existing = await registration.pushManager.getSubscription();
      const subscription = existing || await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: toUint8Array(VAPID_PUBLIC),
      });
      const json = subscription.toJSON();

      if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) return false;

      const { error } = await supabase.from('push_subscriptions').upsert({
        endpoint: json.endpoint,
        p256dh: json.keys.p256dh,
        auth: json.keys.auth,
        user_agent: navigator.userAgent,
        is_active: true,
      }, { onConflict: 'endpoint' });

      setSubscribed(!error);
      return !error;
    } catch (error) {
      console.error('[push] subscription failed', error);
      return false;
    }
  }

  async function unregister() {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    if (!subscription) return;
    await subscription.unsubscribe();
    if (supabase) await supabase.from('push_subscriptions').update({ is_active: false }).eq('endpoint', subscription.endpoint);
    setSubscribed(false);
  }

  return { supported, permission, subscribed, register, unregister };
}

function toUint8Array(value) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const raw = window.atob((value + padding).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from([...raw].map((character) => character.charCodeAt(0)));
}
