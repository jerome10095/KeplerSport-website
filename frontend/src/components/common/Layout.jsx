import { NavLink, Outlet } from 'react-router-dom';

const SITE_NAME = import.meta.env.VITE_SITE_NAME;

function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <span className="site-name">{SITE_NAME}</span>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/news">News</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} {SITE_NAME}</p>
      </footer>
    </div>
  );
}

export default Layout;
