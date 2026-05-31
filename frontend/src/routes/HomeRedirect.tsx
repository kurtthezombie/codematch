import { Navigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/pages/LandingPage';

export default function HomeRedirect() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}
