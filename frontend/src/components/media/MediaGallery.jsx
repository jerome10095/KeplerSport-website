import MediaImage from './MediaImage';
import MediaVideo from './MediaVideo';

export default function MediaGallery({ items = [], className = '' }) {
  if (!items.length) return null;
  return <div className={`media-gallery ${className}`}>{items.map((item, index) => {
    const object = typeof item === 'object' && item !== null;
    const path = object ? item.path : item;
    const bucket = object ? item.bucket : 'match-gallery';
    const type = object ? item.media_type : /\.(mp4|webm|mov)$/i.test(path) ? 'video' : 'image';
    return <div key={`${path}-${index}`} className="media-gallery__item">{type === 'video' ? <MediaVideo bucket={bucket} path={path} autoPlay={false} loop={false} /> : <MediaImage bucket={bucket} path={path} alt="" />}</div>;
  })}</div>;
}
