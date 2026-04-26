import { ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContext } from '../core/state/AppContext';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';

import { authApi } from '../core/api/auth.api';
import { StorageService } from '../core/services/storage.service';
import { Actions } from '../core/models/enums/Actions.enum';
import { IAppState } from '../core/models/context/IAppState.model';
import { VerifyApiResponse } from '../core/models/auth.model';

// 🔥 IMPORTANTE
import { hasPrivateKey, loadKeys } from '../core/services/crypto.manager';

const storageService = new StorageService();

export const PrivateGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const { dispatch } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = storageService.get<IAppState>('APP_STATE')?.user;

    if (!user?.token) {
      setIsAuthenticated(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const data: VerifyApiResponse = await authApi.verify();

        const restoredUser = {
          token: data.token,
          userId: data.user.userId,
          username: data.user.username,
          createdAt: data.user.createdAt,
          publicKey: data.user.publicKey,
          encryptedPrivateKey: data.user.encryptedPrivateKey,
          contacts: [],
          chats: [],
        };

        // 🔥 SOLO cargar keys si NO existen
        if (!hasPrivateKey()) {
          const passphrase = prompt('Ingresa tu passphrase');

          if (!passphrase) {
            setIsAuthenticated(false);
            return;
          }

          await loadKeys(
            restoredUser.publicKey!,
            restoredUser.encryptedPrivateKey!
            // passphrase
          );
        }

        dispatch({
          type: Actions.LoadUser,
          payload: restoredUser,
        });

        setIsAuthenticated(true);
      } catch (err: any) {
        if (err.status === 401) {
          storageService.remove('APP_STATE');

          dispatch({
            type: Actions.Logout,
            payload: null,
          });

          setIsAuthenticated(false);
        } else {
          console.error(err);
          setIsAuthenticated(true);
        }
      }
    };

    void verifyToken();
  }, [dispatch]);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
