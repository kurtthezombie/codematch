import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/AuthContext';

export default function RedirectIfAuth() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    console.log('user role: ', user?.role);
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
