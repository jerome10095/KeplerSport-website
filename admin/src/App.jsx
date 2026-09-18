import { useState } from 'react';

const stats = [
  { label: 'Teams', value: '12' },
  { label: 'Upcoming matches', value: '8' },
  { label: 'Published news', value: '24' },
  { label: 'Live matches', value: '2', accent: true },
];

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar__brand"><strong>Kepler</strong><span>Sports Admin</span></div>
        <nav className="sidebar__nav" aria-label="Admin navigation">
          {['Overview', 'Teams', 'Matches', 'News', 'Athletes'].map((item, index) => (
            <a className={`sidebar__link${index === 0 ? ' is-active' : ''}`} href={`#${item.toLowerCase()}`} key={item}>{item}</a>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar"><div><span className="eyebrow">Control center</span><h1>Good evening, admin</h1></div><button className="btn btn--primary" onClick={() => setShowModal(true)}>New match</button></header>
        <section className="stats-grid" aria-label="Overview statistics">
          {stats.map((stat) => <article className={`stat${stat.accent ? ' stat--accent' : ''}`} key={stat.label}><div><div className="stat__value">{stat.value}</div><div className="stat__label">{stat.label}</div></div></article>)}
        </section>

        <section className="panel">
          <div className="panel__head"><div><h2>Match center</h2><p className="muted">Manage live and upcoming fixtures.</p></div><div className="filter-row">{['all', 'live', 'scheduled', 'completed'].map((filter) => <button className={`chip${activeFilter === filter ? ' is-active' : ''}`} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div></div>
          <div className="table-wrap"><table><thead><tr><th>Fixture</th><th>Date</th><th>Status</th><th>Score</th></tr></thead><tbody><tr><td>Kepler Lions vs. North Stars</td><td>Today, 18:30</td><td><span className="badge badge--live">Live</span></td><td>2 - 1</td></tr><tr><td>Kepler Falcons vs. City United</td><td>Tomorrow, 15:00</td><td><span className="badge badge--scheduled">Scheduled</span></td><td>-</td></tr></tbody></table></div>
        </section>

        <section className="panel form-panel"><h2>Quick announcement</h2><form className="form" onSubmit={(event) => event.preventDefault()}><label>Title<input placeholder="Announcement title" /></label><label>Message<textarea rows="3" placeholder="Write an update for supporters" /></label><div className="form-actions"><button className="btn btn--ghost-dark" type="button">Cancel</button><button className="btn btn--primary" type="submit">Publish announcement</button></div></form></section>
      </main>

      {showModal && <div className="modal-backdrop" role="presentation" onClick={() => setShowModal(false)}><div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><div className="modal__icon">+</div><h3>Create match</h3><p className="muted">The match editor will connect to the backend API.</p><div className="modal__actions"><button className="btn btn--ghost-dark" onClick={() => setShowModal(false)}>Close</button><button className="btn btn--primary" onClick={() => setShowModal(false)}>Continue</button></div></div></div>}
    </div>
  );
}

export default App;
