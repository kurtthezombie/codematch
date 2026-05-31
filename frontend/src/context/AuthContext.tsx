import { createContext, useEffect, useContext, useMemo, useState, type ReactNode } from 'react';

import { AUTH_UNAUTHORIZED_EVENT, api } from '@/utils/api';
import type { AuthUser } from '@/types/auth';

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem('access_token')));

  function login(token: string, user: AuthUser) {
    setToken(token);
    setUser(user);
    setIsLoading(false);
    localStorage.setItem('access_token', token);
  }

  function logout() {
    setToken(null);
    setUser(null);
    setIsLoading(false);
    localStorage.removeItem('access_token');
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
    }),
    [token, user, isLoading]
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    api
      .get<AuthUser>('/auth/profile')
      .then((profile) => {
        setToken(storedToken);
        setUser(profile);
      })
      .catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('access_token');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setToken(null);
      setUser(null);
      setIsLoading(false);
      localStorage.removeItem('access_token');

      if (!['/login', '/signup'].includes(window.location.pathname)) {
        window.location.replace('/login');
      }
    }
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
