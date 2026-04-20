import { ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContext } from '../core/state/AppContext';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';

import { authApi } from '../core/api/auth.api';
import { StorageService } from '../core/services/storage.service';
import { Actions } from '../core/models/enums/Actions.enum';
import { IAppState } from '../core/models/context/IAppState.model';
import { VerifyApiResponse } from '../core/models/auth.model';

const storageService = new StorageService();

export const PrivateGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const { dispatch } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = storageService.get<IAppState>('APP_STATE')?.user;

    // 🔴 no token
    if (!user?.token) {
      setIsAuthenticated(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const data: VerifyApiResponse = await authApi.verify();
        console.log('Token verificado:', data);

        dispatch({
          type: Actions.LoadUser,
          payload: {
            token: data.token,
            userId: data.user.userId,
            username: data.user.username,
            createdAt: data.user.createdAt,
            publicKey: data.user.publicKey,
            encryptedPrivateKey: data.user.encryptedPrivateKey,
            contacts: [],
            chats: [],
          },
        });

        setIsAuthenticated(true);
      } catch {
        // 🔥 limpiar sesión
        storageService.remove('APP_STATE');

        dispatch({
          type: Actions.Logout,
          payload: null,
        });

        setIsAuthenticated(false);
      }
    };

    void verifyToken();
  }, [dispatch]);

  // ⏳ loading
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  // 🔴 redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🟢 ok
  return children;
};
