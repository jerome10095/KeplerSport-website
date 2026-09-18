import { useState } from 'react';
import Section from '../../components/ui/Section';
import StandingsTable from '../../components/features/StandingsTable/StandingsTable';

const SPORTS = ['basketball', 'volleyball', 'football', 'athletics', 'swimming'];

export default function StandingsPage() {
  const [sport, setSport] = useState('basketball');

  return (
    <Section title="Standings" subtitle="League tables by sport">
      <div className="filter-row">
        {SPORTS.map((s) => (
          <button
            key={s}
            className={`chip${sport === s ? ' is-active' : ''}`}
            onClick={() => setSport(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <StandingsTable sport={sport} />
    </Section>
  );
}