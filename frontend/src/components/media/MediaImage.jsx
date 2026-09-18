import { publicUrl, STORAGE_BUCKETS } from '../../lib/supabase';

export default function MediaImage({ bucket = STORAGE_BUCKETS.NEWS_IMAGES, path, alt = '', className = '', ...rest }) {
  if (!path) return null;
  return <img src={publicUrl(bucket, path) || path} alt={alt} loading="lazy" decoding="async" className={className} {...rest} />;
}
