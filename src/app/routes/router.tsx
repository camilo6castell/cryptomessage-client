import { Navigate, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../ui/layouts/MainLayout';
import { StartLayout } from '../ui/layouts/StartLayout';
import { StartPage } from '../pages/StartPage';
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
      { path: 'login', element: <StartPage /> },
      { path: 'register', element: <StartPage /> },
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
    children: [{ index: true, element: <MainPage /> }],
  },

  // Catch-all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
