import { publicUrl, STORAGE_BUCKETS } from '../../../lib/supabase';
import { mediaUrl } from '../../../api/client';

function value(match, primary, fallback) {
  return match[primary] ?? match[fallback];
}

function teamName(value, fallback) {
  return typeof value === 'string' ? value : value?.name || fallback;
}

export default function ScoreboardLive({ match }) {
  const status = match.status;
  const homeName = teamName(value(match, 'home_team_name', 'homeTeam'), 'Kepler');
  const awayName = teamName(value(match, 'away_team_name', 'awayTeam'), match.opponent_name || match.opponentName || 'TBD');
  const homeLogo = match.home_team_logo || match.homeTeam?.logo?.url;
  const awayLogo = match.away_team_logo || match.awayTeam?.logo?.url;
  const active = status === 'live' || status === 'halftime';
  return <div className={`scoreboard-live${active ? ' scoreboard-live--active' : ''}`}>
    <TeamBlock name={homeName} logo={homeLogo} score={value(match, 'home_score', 'homeScore')} bucket={homeLogo?.startsWith?.('http') ? null : STORAGE_BUCKETS.TEAM_LOGOS} />
    <div className="scoreboard-live__center">:</div>
    <TeamBlock name={awayName} logo={awayLogo} score={value(match, 'away_score', 'awayScore')} bucket={awayLogo?.startsWith?.('http') ? null : STORAGE_BUCKETS.TEAM_LOGOS} />
  </div>;
}

function TeamBlock({ name, logo, score, bucket }) {
  const image = logo ? (bucket ? publicUrl(bucket, logo) : mediaUrl(logo)) : null;
  return <div className="team-block"><div className="team-block__logo-wrap">{image ? <img className="team-block__logo" src={image} alt={name} /> : <div className="team-block__logo-placeholder">🏀</div>}</div><h2 className="team-block__name">{name}</h2><div className="team-block__score">{typeof score === 'number' ? score : '–'}</div></div>;
}
