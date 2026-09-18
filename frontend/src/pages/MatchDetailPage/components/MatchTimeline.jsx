import { useEffect, useState } from 'react';

export default function MatchTimeline({ match }) {
  const [events, setEvents] = useState([]);
  const home = match.home_score ?? match.homeScore ?? 0;
  const away = match.away_score ?? match.awayScore ?? 0;
  useEffect(() => {
    setEvents((previous) => {
      const last = previous[0];
      if (!last) return [{ ts: Date.now(), home, away, period: match.period }];
      if (last.home === home && last.away === away) return previous;
      const homeDelta = home - last.home;
      const awayDelta = away - last.away;
      return [{ ts: Date.now(), home, away, period: match.period, event: homeDelta > 0 ? `+${homeDelta} ${match.home_team_name || match.homeTeam?.name || 'Home'}` : `+${awayDelta} ${match.away_team_name || match.awayTeam?.name || 'Away'}` }, ...previous].slice(0, 6);
    });
  }, [home, away, match.period, match.home_team_name, match.away_team_name, match.homeTeam, match.awayTeam]);

  if (!events.length) return null;
  return <div className="match-timeline"><h3>Live Updates</h3><ul>{events.map((event, index) => <li className={index === 0 ? 'is-new' : ''} key={event.ts}><time>{new Date(event.ts).toLocaleTimeString()}</time><strong>{event.home} – {event.away}</strong>{event.event && <span className="match-timeline__event">{event.event}</span>}{event.period && <span className="match-timeline__period">{event.period}</span>}</li>)}</ul></div>;
}
