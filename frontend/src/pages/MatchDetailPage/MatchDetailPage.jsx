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
import { useParams } from 'react-router-dom';
import { useMatch } from '../../hooks/useLiveMatches';
import { mediaUrl } from '../../api/client';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';

export default function MatchDetailPage() {
  const { id } = useParams();
  const { data: m, isLoading, isError } = useMatch(id);

  if (isLoading) return <Loader />;
  if (isError || !m) return <EmptyState title="Match not found" />;

  return (
    <article className="match-detail">
      <div className="container">
        <div className="match-detail__head">
          <span className={`badge badge--${m.status}`}>{m.status}</span>
          <span>{m.competition}</span>
          <time>{new Date(m.matchDate).toLocaleString()}</time>
        </div>

        <div className="match-detail__scoreboard">
          <div className="team">
            {m.homeTeam?.logo?.url && <img src={mediaUrl(m.homeTeam.logo.url)} alt="" />}
            <h2>{m.homeTeam?.name || 'Kepler'}</h2>
            <div className="score">{m.homeScore ?? '-'}</div>
          </div>
          <div className="vs">VS</div>
          <div className="team">
            {m.awayTeam?.logo?.url && <img src={mediaUrl(m.awayTeam.logo.url)} alt="" />}
            <h2>{m.awayTeam?.name || m.opponentName || 'TBD'}</h2>
            <div className="score">{m.awayScore ?? '-'}</div>
          </div>
        </div>

        <p className="match-detail__venue">{m.venue}</p>

        {m.highlights && (
          <section>
            <h3>Highlights</h3>
            <div className="prose" dangerouslySetInnerHTML={{ __html: m.highlights }} />
          </section>
        )}

        {m.gallery?.length > 0 && (
          <section>
            <h3>Gallery</h3>
            <div className="gallery">
              {m.gallery.map((g) => (
                <img key={g.id} src={mediaUrl(g.url)} alt={g.alternativeText || ''} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}