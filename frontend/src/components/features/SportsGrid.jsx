import { Link } from 'react-router-dom';
import { useTeams } from '../../hooks/useTeams';
import { mediaUrl } from '../../api/client';
import Loader from '../common/Loader/Loader';
import EmptyState from '../common/EmptyState/EmptyState';

export default function SportsGrid({ limit }) {
  const { data, isLoading, isError } = useTeams();

  if (isLoading) return <Loader text="Loading teams…" />;
  if (isError) return <EmptyState title="Couldn't load teams" />;
  const teams = Array.isArray(data) ? data : [];
  if (teams.length === 0) return <EmptyState title="No teams yet" message="Teams will appear once added in the admin panel." />;

  const visibleTeams = limit ? teams.slice(0, limit) : teams;

  return (
    <div className="sports-grid">
      {visibleTeams.map((t) => {
        const logo = mediaUrl(t.logo?.url);
        return (
          <Link key={t.id} to={`/teams/${t.slug}`} className="sport-card">
            {logo && <img src={logo} alt={t.name} />}
            <h3>{t.name}</h3>
            <span className="sport-card__sport">{t.sport}</span>
          </Link>
        );
      })}
    </div>
  );
}