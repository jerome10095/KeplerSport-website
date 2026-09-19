import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key && !key.includes('your_')
  ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null;

export const STORAGE_BUCKETS = {
  TEAM_LOGOS: 'team-logos', ATHLETE_PHOTOS: 'athlete-photos', NEWS_IMAGES: 'news-images',
  MATCH_GALLERY: 'match-gallery', FACILITY_IMAGES: 'facility-images', SITE_ASSETS: 'site-assets', HIGHLIGHT_VIDEOS: 'highlight-videos',
};

export function publicUrl(bucket, path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return supabase?.storage.from(bucket).getPublicUrl(path).data.publicUrl || null;
}
