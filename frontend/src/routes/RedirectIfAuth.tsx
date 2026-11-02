import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { useSelectedRole } from '@/hooks/useSelectedRole';

export default function RedirectIfAuth() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const selectedRole = useSelectedRole();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    if (user?.role === selectedRole) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
