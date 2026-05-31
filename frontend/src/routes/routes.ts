// user pages
import DashboardPage from '@/pages/DashboardPage.tsx';

// admin pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage.tsx';

// add pages here that requires auth
export const authenticatedPages = [
  // user side
  {
    path: '/dashboard',
    element: DashboardPage,
  },

  // admin side
  {
    path: '/admin/dashboard',
    element: AdminDashboardPage,
  },
];
