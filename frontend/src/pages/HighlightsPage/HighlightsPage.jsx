import { useState } from 'react';
import { useHighlights } from '../../hooks/useHighlights';
import { publicUrl } from '../../lib/supabase';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import MediaVideo from '../../components/media/MediaVideo';

const SPORTS = ['all', 'basketball', 'volleyball', 'football', 'athletics'];

export default function HighlightsPage() {
  const [sport, setSport] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);
  const { data = [], isLoading } = useHighlights({ sport: sport === 'all' ? null : sport });

  return <div className="highlights-page">
    <header className="highlights-hero"><div className="container"><span className="highlights-hero__badge">VIDEO</span><h1>Match Highlights</h1><p>Relive the biggest moments from Kepler Sports.</p></div></header>
    <div className="container"><div className="filter-row highlights-filters">{SPORTS.map((item) => <button key={item} className={`chip${sport === item ? ' is-active' : ''}`} onClick={() => setSport(item)}>{item}</button>)}</div>
      {isLoading ? <Loader /> : data.length ? <div className="highlights-grid">{data.map((video) => <button className="highlight-card" key={video.id} onClick={() => setActiveVideo(video)}><div className="highlight-card__thumb"><video src={publicUrl(video.bucket, video.path)} muted preload="metadata" /><span className="highlight-card__play">▶</span>{video.duration_seconds && <span className="highlight-card__duration">{Math.floor(video.duration_seconds / 60)}:{String(Math.floor(video.duration_seconds % 60)).padStart(2, '0')}</span>}</div><div className="highlight-card__meta"><strong>{video.caption || video.file_name}</strong>{video.tags?.length > 0 && <span className="muted">{video.tags.slice(0, 3).join(' · ')}</span>}</div></button>)}</div> : <EmptyState title="No highlights yet" message="Video highlights will appear here after they are uploaded." />}
    </div>
    {activeVideo && <div className="video-lightbox" role="presentation" onClick={() => setActiveVideo(null)}><div className="video-lightbox__inner" onClick={(event) => event.stopPropagation()}><button className="video-lightbox__close" onClick={() => setActiveVideo(null)} aria-label="Close">×</button><MediaVideo bucket={activeVideo.bucket} path={activeVideo.path} controls autoPlay loop={false} muted={false} />{activeVideo.caption && <p className="video-lightbox__caption">{activeVideo.caption}</p>}</div></div>}
  </div>;
}
