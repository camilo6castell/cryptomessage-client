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
    path: '',
    element: (
      <PublicGuard>
        <StartLayout />
      </PublicGuard>
    ),
    children: [
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },

  // Rutas privadas
  {
    path: '',
    element: (
      <PrivateGuard>
        <MainLayout />
      </PrivateGuard>
    ),
    children: [{ path: '', element: <MainPage /> }],
  },
]);
