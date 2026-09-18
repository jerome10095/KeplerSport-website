import { Link } from 'react-router-dom';
import { useFeaturedMatch } from '../../../hooks/useLiveMatches';
import { mediaUrl } from '../../../api/client';
import Loader from '../../common/Loader/Loader';

export default function FeaturedMatch() {
  const { data: match, isLoading } = useFeaturedMatch();

  if (isLoading) return <Loader text="Loading featured match…" />;
  if (!match) return null;

  const { homeTeam, awayTeam, homeScore, awayScore, status, matchDate, venue, competition } = match;

  return (
    <section className="featured-match">
      <div className="container">
        <div className="featured-match__head">
          <span className={`badge badge--${status}`}>{status.toUpperCase()}</span>
          <span>{competition}</span>
          <span>{new Date(matchDate).toLocaleString()}</span>
        </div>
        <div className="featured-match__body">
          <TeamSide team={homeTeam} score={homeScore} />
          <div className="featured-match__vs">VS</div>
          <TeamSide team={awayTeam} score={awayScore} align="right" />
        </div>
        <div className="featured-match__foot">
          <span>{venue}</span>
          <Link to={`/matches/${match.id}`} className="btn btn--primary">Match Details</Link>
        </div>
      </div>
    </section>
  );
}

function TeamSide({ team, score, align = 'left' }) {
  const logo = mediaUrl(team?.logo?.url);
  return (
    <div className={`featured-match__team featured-match__team--${align}`}>
      {logo && <img src={logo} alt={team?.name} />}
      <h3>{team?.name || 'TBD'}</h3>
      {typeof score === 'number' && <div className="featured-match__score">{score}</div>}
    </div>
  );
}