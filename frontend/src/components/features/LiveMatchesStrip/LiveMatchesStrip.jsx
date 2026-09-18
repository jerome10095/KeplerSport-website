import { Link } from 'react-router-dom';
import { useLiveMatchesList } from '../../../hooks/useLiveMatchesList';

export default function LiveMatchesStrip() {
  const { data: matches = [] } = useLiveMatchesList();
  if (!matches.length) return null;
  return <section className="live-strip"><div className="live-strip__head"><span className="live-strip__pulse" /><strong>LIVE NOW</strong><span className="muted">{matches.length} match{matches.length > 1 ? 'es' : ''}</span></div><div className="live-strip__list">{matches.map((match) => <Link key={match.id} to={`/matches/${match.id}`} className="live-strip__card"><span>{match.home_team_name || match.homeTeam?.name || 'Kepler'}</span><strong>{match.home_score ?? match.homeScore ?? 0} : {match.away_score ?? match.awayScore ?? 0}</strong><span>{match.away_team_name || match.awayTeam?.name || match.opponent_name || 'TBD'}</span><small>{match.period || 'LIVE'}</small></Link>)}</div></section>;
}
