function SportsGrid({ teams = [] }) {
  if (teams.length === 0) {
    return (
      <section className="sports-grid">
        <p>No teams to show yet.</p>
      </section>
    );
  }

  return (
    <section className="sports-grid">
      {teams.map((team) => (
        <article key={team.id ?? team.slug} className="sports-grid-card">
          <h3>{team.name}</h3>
          <p>{team.sport}</p>
        </article>
      ))}
    </section>
  );
}

export default SportsGrid;
