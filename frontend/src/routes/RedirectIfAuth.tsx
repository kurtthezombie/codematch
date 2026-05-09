import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function RedirectIfAuth() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
