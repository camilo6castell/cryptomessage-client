// import { createHashRouter } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../ui/layouts/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { MainPage } from '../pages/MainPage';

import { PrivateGuard } from './PrivateGuard';
import { PublicGuard } from './PublicGuard';

export const router = createBrowserRouter([
  {
    path: '',
    Component: MainLayout,
    children: [
      {
        path: '',
        element: (
          <PrivateGuard>
            <MainPage />
          </PrivateGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicGuard>
            <RegisterPage />
          </PublicGuard>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicGuard>
            <LoginPage />
          </PublicGuard>
        ),
      },
    ],
  },
]);
