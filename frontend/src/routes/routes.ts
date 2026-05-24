import DashboardPage from '@/pages/DashboardPage.tsx';

// add pages here that requires auth
export const authenticatedPages = [
    {
        path: "/dashboard",
        element: DashboardPage,
    },
];