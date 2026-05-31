import { BrowserRouter, Route, Routes } from 'react-router';

import LoginPage from '@/pages/LoginPage.tsx';
import SignupPage from '@/pages/SignupPage.tsx';
import NotFoundPage from '@/pages/NotFoundPage';

import RequireAuth from '@/routes/RequireAuth';
import RedirectIfAuth from '@/routes/RedirectIfAuth';
import HomeRedirect from '@/routes/HomeRedirect';

import { authenticatedPages } from '@/routes/routes';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          {authenticatedPages.map((page, index) => {
            return <Route key={index} path={page.path} element={<page.element />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
