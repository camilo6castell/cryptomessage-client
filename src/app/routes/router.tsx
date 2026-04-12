import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../ui/layouts/MainLayout';
import { StartLayout } from '../ui/layouts/StartLayout';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { MainPage } from '../pages/MainPage';
import { PrivateGuard } from './PrivateGuard';
import { PublicGuard } from './PublicGuard';

export const router = createBrowserRouter([
  // Rutas públicas
  {
    element: (
      <PublicGuard>
        <StartLayout />
      </PublicGuard>
    ),
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  // Rutas privadas
  {
    path: '/',
    element: (
      <PrivateGuard>
        <MainLayout />
      </PrivateGuard>
    ),
    children: [
      { index: true, element: <MainPage /> }, // 👈 esto representa "/"
    ],
  },
]);
