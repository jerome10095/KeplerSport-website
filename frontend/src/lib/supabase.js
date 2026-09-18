import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasValidConfig = url?.startsWith('https://') && key && !key.includes('...');

if (!hasValidConfig) {
  console.warn('[supabase] Missing or placeholder env vars; realtime features disabled.');
}

export const supabase = hasValidConfig
  ? createClient(url, key, {
      auth: { persistSession: false },
      realtime: { params: { eventsPerSecond: 20 } },
    })
  : null;

export const STORAGE_BUCKETS = {
  TEAM_LOGOS: 'team-logos',
  NEWS_IMAGES: 'news-images',
  ATHLETE_PHOTOS: 'athlete-photos',
  MATCH_GALLERY: 'match-gallery',
  HIGHLIGHT_VIDEOS: 'highlight-videos',
};

export function publicUrl(bucket, path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (!supabase) return null;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
