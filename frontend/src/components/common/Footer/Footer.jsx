import { Link } from 'react-router-dom';
import { useGlobal } from '../../../hooks/useGlobal';

export default function Footer() {
  const { data: global } = useGlobal();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <h4>{global?.siteName || 'Kepler Sports'}</h4>
          <p>{global?.tagline || 'Home of Champions.'}</p>
        </div>
        <div>
          <h5>Navigate</h5>
          <Link to="/teams">Teams</Link>
          <Link to="/schedule">Schedule</Link>
          <Link to="/standings">Standings</Link>
          <Link to="/news">News</Link>
        </div>
        <div>
          <h5>Contact</h5>
          <p>{global?.contactEmail || '—'}</p>
          <p>{global?.contactPhone || '—'}</p>
          <p>{global?.address || ''}</p>
        </div>
      </div>
      <div className="footer__bottom">
        © {year} {global?.siteName || 'Kepler Sports'} — All rights reserved.
      </div>
    </footer>
  );
}