import { NavLink, Link } from 'react-router-dom';
import { useGlobal } from '../../../hooks/useGlobal';
import { mediaUrl } from '../../../api/client';

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/teams', label: 'Teams' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/standings', label: 'Standings' },
  { to: '/news', label: 'News' },
  { to: '/facilities', label: 'Facilities' },
];

export default function Header() {
  const { data: global } = useGlobal();
  const logo = mediaUrl(global?.logo?.url);
  const siteName = global?.siteName || 'Kepler Sports';

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          {logo ? <img src={logo} alt={siteName} style={{ height: 40 }} /> : (
            <span className="header__logo-text">🏀 {siteName}</span>
          )}
        </Link>
        <nav className="header__nav">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => `header__nav-link${isActive ? ' is-active' : ''}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}