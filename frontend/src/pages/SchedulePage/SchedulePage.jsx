import { useState } from 'react';
import Section from '../../components/ui/Section';
import { useAllMatches } from '../../hooks/useLiveMatches';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { Link } from 'react-router-dom';

const FILTERS = ['all', 'live', 'scheduled', 'completed'];

export default function SchedulePage() {
  const [filter, setFilter] = useState('all');
  const params = filter === 'all' ? {} : { 'filters[status][$eq]': filter };
  const { data, isLoading } = useAllMatches(params);

  return (
    <Section title="Schedule" subtitle="All Kepler matches">
      <div className="filter-row">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`chip${filter === f ? ' is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? <Loader /> : (
        data?.length ? (
          <ul className="match-list match-list--full">
            {data.map((m) => (
              <li key={m.id} className="match-list__item">
                <div className="match-list__date">
                  {new Date(m.matchDate).toLocaleString()}
                </div>
                <div className="match-list__teams">
                  <strong>{m.homeTeam?.name || 'Kepler'}</strong>
                  <span> vs </span>
                  <strong>{m.awayTeam?.name || m.opponentName || 'TBD'}</strong>
                </div>
                <span className={`badge badge--${m.status}`}>{m.status}</span>
                <div className="match-list__venue">{m.venue}</div>
                <Link to={`/matches/${m.id}`} className="btn btn--small">Details</Link>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="No matches found" message="Try another filter." />
      )}
    </Section>
  );
}