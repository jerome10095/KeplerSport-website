import { useStandings } from '../../../hooks/useStandings';
import Loader from '../../common/Loader/Loader';
import EmptyState from '../../common/EmptyState/EmptyState';

export default function StandingsTable({ sport }) {
  const { data, isLoading } = useStandings(sport);

  if (isLoading) return <Loader />;
  if (!data || data.length === 0) return <EmptyState title="No standings available" />;

  return (
    <table className="standings">
      <thead>
        <tr>
          <th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>Pts</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id}>
            <td>{i + 1}</td>
            <td>{row.teamName}</td>
            <td>{row.played}</td>
            <td>{row.won}</td>
            <td>{row.drawn}</td>
            <td>{row.lost}</td>
            <td><strong>{row.points}</strong></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}