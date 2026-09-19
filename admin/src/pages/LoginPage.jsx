import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function LoginPage() {
  const { signIn, session } = useAuth(); const navigate = useNavigate(); const location = useLocation(); const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  useEffect(() => { if (session) navigate(from, { replace: true }); }, [session, navigate, from]);
  async function submit(event) { event.preventDefault(); setBusy(true); setError(''); try { await signIn(email, password); } catch (err) { setError(err.message || 'Login failed'); } finally { setBusy(false); } }
  return <div className="login-page"><div className="login-card"><div className="login-brand"><span className="login-brand__mark">🏀</span><h1>Kepler Sports</h1><p className="muted">Admin Dashboard</p></div><form onSubmit={submit} className="login-form"><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@keplercollege.ac.rw" required autoFocus /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="error-text">{error}</p>}<button type="submit" className="btn btn--primary" disabled={busy}>{busy ? 'Signing in...' : 'Sign In'}</button></form><p className="login-hint muted">Access is restricted to Kepler Sports staff.</p></div></div>;
}
