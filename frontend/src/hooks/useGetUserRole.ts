import { useAuth } from '@/context/AuthContext';

export const useGetUserRole = () => {
  const { user } = useAuth();
  return user?.role;
};
