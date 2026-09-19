import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const { session, loading, isAdmin } = useAuth();
  const location = useLocation();
  if (loading) return <div className="auth-loading">Checking session...</div>;
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAdmin) return <div className="auth-denied"><h2>Access Denied</h2><p>Your account does not have admin permissions.</p></div>;
  return children;
}
