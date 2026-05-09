import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/atoms/Button';

export default function DashboardPage () {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <main>
      <h1>Dashboard Page</h1>
      <Button type="button" variant="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </main>
  )
}
