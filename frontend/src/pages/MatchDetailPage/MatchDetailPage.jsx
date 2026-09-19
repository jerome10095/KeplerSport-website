import { Link, useParams } from 'react-router-dom';
import { useMatchLive } from '../../hooks/useMatchLive';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import MediaGallery from '../../components/media/MediaGallery';
import MediaVideo from '../../components/media/MediaVideo';
import MatchStatusBar from './components/MatchStatusBar';
import ScoreboardLive from './components/ScoreboardLive';
import MatchTimeline from './components/MatchTimeline';

export default function MatchDetailPage() {
  const { id } = useParams();
  const { data: match, isLoading, isError } = useMatchLive(id);

  if (isLoading) return <Loader text="Loading match..." />;
  if (isError || !match) return <EmptyState title="Match not found" message="This match may have been removed or the link is incorrect." action={<Link to="/schedule" className="btn btn--primary">Back to Schedule</Link>} />;

  const matchDate = match.match_date || match.matchDate;
  const gallery = match.gallery_urls || match.gallery || [];
  return <article className="match-live-page">
    <MatchStatusBar match={match} />
    <div className="container">
      <ScoreboardLive match={match} />
      <div className="match-live-page__grid">
        <div className="match-live-page__main">
          <MatchTimeline match={match} />
          {match.highlights && <section className="match-live-page__section"><h3>Match Highlights</h3><div className="prose" dangerouslySetInnerHTML={{ __html: match.highlights }} /></section>}
          {match.highlight_video_path && <section className="match-live-page__section"><h3>Video Highlights</h3><MediaVideo bucket="highlight-videos" path={match.highlight_video_path} autoPlay={false} loop={false} /></section>}
          {gallery.length > 0 && <section className="match-live-page__section"><h3>Gallery</h3><MediaGallery items={gallery} /></section>}
        </div>
        <aside className="match-live-page__side"><div className="info-card"><h4>Match Info</h4><dl><dt>Sport</dt><dd>{match.sport || '—'}</dd><dt>Competition</dt><dd>{match.competition || '—'}</dd><dt>Season</dt><dd>{match.season || '—'}</dd><dt>Venue</dt><dd>{match.venue || '—'}</dd><dt>Date</dt><dd>{matchDate ? new Date(matchDate).toLocaleString() : '—'}</dd></dl></div><Link to="/schedule" className="btn btn--primary">All Matches</Link></aside>
      </div>
    </div>
  </article>;
}