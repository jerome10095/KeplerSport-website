import { publicUrl } from '../../lib/supabase';

export default function MediaVideo({ bucket = 'highlight-videos', path, poster, autoPlay = true, muted = true, loop = true, controls = true, className = '', ...rest }) {
  if (!path) return null;
  return <video src={publicUrl(bucket, path) || path} poster={poster ? publicUrl(bucket, poster) || poster : undefined} autoPlay={autoPlay} muted={muted} loop={loop} controls={controls} playsInline preload="metadata" className={className} {...rest} />;
}
