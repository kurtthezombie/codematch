import { Navigate } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/pages/LandingPage';

export default function HomeRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}
