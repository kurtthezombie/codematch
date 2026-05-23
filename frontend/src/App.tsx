import { BrowserRouter, Route, Routes } from 'react-router';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage.tsx';

import RequireAuth from './routes/RequireAuth';
import RedirectIfAuth from './routes/RedirectIfAuth';
import HomeRedirect from './routes/HomeRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<RedirectIfAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<RequireAuth/ >}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
