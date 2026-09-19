import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <div className="page not-found"><h1>404</h1><p className="muted">Page not found.</p><Link className="btn btn--primary" to="/">Back to dashboard</Link></div>; }
