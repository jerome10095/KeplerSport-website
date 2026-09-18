import { Link } from 'react-router-dom';
import { useUpcomingMatches } from '../../../hooks/useLiveMatches';
import Loader from '../../common/Loader/Loader';
import EmptyState from '../../common/EmptyState/EmptyState';

export default function UpcomingMatches({ limit = 5 }) {
  const { data, isLoading, isError, refetch } = useUpcomingMatches();

  if (isLoading) return <Loader text="Loading matches…" />;
  if (isError) {
    return <EmptyState title="Couldn't load matches" action={<button onClick={refetch}>Retry</button>} />;
  }
  if (!data || data.length === 0) {
    return <EmptyState title="No upcoming matches" message="Check back soon — the schedule is updated by our admin team." />;
  }

  return (
    <ul className="match-list">
      {data.slice(0, limit).map((m) => (
        <li key={m.id} className="match-list__item">
          <div className="match-list__date">{new Date(m.matchDate).toLocaleDateString()}</div>
          <div className="match-list__teams">
            <strong>{m.homeTeam?.name || 'Kepler'}</strong>
            <span> vs </span>
            <strong>{m.awayTeam?.name || m.opponentName || 'TBD'}</strong>
          </div>
          <div className="match-list__venue">{m.venue}</div>
          <Link to={`/matches/${m.id}`} className="btn btn--small">Details</Link>
        </li>
      ))}
    </ul>
  );
}