import { useParams } from 'react-router-dom';
import { useTeam } from '../../hooks/useTeams';
import { mediaUrl } from '../../api/client';
import Loader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';

export default function TeamDetailPage() {
  const { slug } = useParams();
  const { data: team, isLoading, isError } = useTeam(slug);

  if (isLoading) return <Loader />;
  if (isError || !team) return <EmptyState title="Team not found" />;

  const cover = mediaUrl(team.coverImage?.url);

  return (
    <article className="team-detail">
      {cover && <div className="team-detail__cover" style={{ backgroundImage: `url(${cover})` }} />}
      <div className="container">
        <h1>{team.name}</h1>
        <p className="team-detail__meta">
          <span>{team.sport}</span> • <span>{team.category}</span>
        </p>
        {team.description && (
          <div className="prose" dangerouslySetInnerHTML={{ __html: team.description }} />
        )}

        {team.coach && (
          <section>
            <h2>Coach</h2>
            <div className="coach-card">
              {team.coach.photo?.url && <img src={mediaUrl(team.coach.photo.url)} alt={team.coach.fullName} />}
              <div>
                <h3>{team.coach.fullName}</h3>
                <p>{team.coach.role}</p>
              </div>
            </div>
          </section>
        )}

        {team.athletes?.length > 0 && (
          <section>
            <h2>Roster</h2>
            <div className="roster-grid">
              {team.athletes.map((a) => (
                <div key={a.id} className="athlete-card">
                  {a.profileImage?.url && <img src={mediaUrl(a.profileImage.url)} alt={a.fullName} />}
                  <h4>{a.fullName}</h4>
                  <span>#{a.jerseyNumber} · {a.position}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {team.achievements?.length > 0 && (
          <section>
            <h2>Achievements</h2>
            <ul>
              {team.achievements.map((a, i) => (
                <li key={i}><strong>{a.year}:</strong> {a.title} — {a.description}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}