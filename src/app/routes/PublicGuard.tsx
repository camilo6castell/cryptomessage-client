import { ReactNode, useEffect, useState } from 'react';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';
import { Navigate } from 'react-router-dom';

import { StorageService } from '../core/services/storage.service';

export const PublicGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const storageService = new StorageService();
    const token = storageService.get<string>('TOKEN');
    if (!token) {
      setIsAuthenticated(false);
      return;
    } else {
      setIsAuthenticated(true);
      return;
    }
  }, []);

  if (isAuthenticated === null) {
    // return <div>Cargando...</div>;
    return <Navigate to={'/login'} replace />;
  }
  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};
