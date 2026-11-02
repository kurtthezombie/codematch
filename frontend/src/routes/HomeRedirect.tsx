import { Navigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import { useSelectedRole } from '@/hooks/useSelectedRole';
import LandingPage from '@/pages/LandingPage';

export default function HomeRedirect() {
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

  return <LandingPage />;
}
