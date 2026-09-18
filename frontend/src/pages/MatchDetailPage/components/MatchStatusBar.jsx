import LiveIndicator from './LiveIndicator';
import LiveClock from './LiveClock';

export default function MatchStatusBar({ match }) {
  const status = match.status;
  const matchDate = match.match_date || match.matchDate;
  const updatedAt = match.updated_at || match.updatedAt;
  return <div className="match-status-bar">
    <div className="match-status-bar__left"><LiveIndicator status={status} updatedAt={updatedAt} />{!['live', 'halftime'].includes(status) && <span className={`status-pill status-pill--${status}`}>{String(status || '').replace('-', ' ')}</span>}</div>
    <div className="match-status-bar__center">{match.period && <span className="match-status-bar__period">{match.period}</span>}{status === 'live' && <LiveClock minute={match.minute} status={status} updatedAt={updatedAt} />}</div>
    <div className="match-status-bar__right"><span>{match.competition}</span>{matchDate && <time>{new Date(matchDate).toLocaleString()}</time>}<span>{match.venue}</span></div>
  </div>;
}
