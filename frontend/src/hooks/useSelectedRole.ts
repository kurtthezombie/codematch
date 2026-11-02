import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/constants/auth';

export const useSelectedRole = () => {
  const { user } = useAuth();
  const userRole = user?.role;

  const selectedRole = userRole === UserRole.Admin ? UserRole.Admin : UserRole.User;
  return selectedRole;
};
