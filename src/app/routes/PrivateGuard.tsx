import { ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContext } from '../core/state/AppContext';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';

import { authApi } from '../core/api/auth.api';
import { StorageService } from '../core/services/storage.service';
import { Actions } from '../core/models/enums/Actions.enum';
import { IAppState } from '../core/models/context/IAppState.model';
import { UserResponse } from '../core/models/auth.model';

import {
  hasPrivateKey,
  loadKeys,
  clearCrypto,
} from '../core/services/crypto.manager';

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

    const forceLogout = () => {
      clearCrypto();

      storageService.remove('APP_STATE');

      dispatch({
        type: Actions.Logout,
        payload: null,
      });

      setIsAuthenticated(false);
    };

    const verifyToken = async () => {
      try {
        const data: UserResponse = await authApi.verify();

        const restoredUser = {
          token: data.token,
          userId: data.userId,
          username: data.username,
          createdAt: data.createdAt,
          publicKey: data.publicKey,
          encryptedPrivateKey: data.encryptedPrivateKey,
          contacts: [],
          chats: [],
        };

        // 🔐 Cargar claves si no están
        if (!hasPrivateKey()) {
          const passphrase = prompt('Ingresa tu passphrase');

          // ❌ canceló → logout
          if (!passphrase) {
            forceLogout();
            return;
          }

          console.log('PUBLIC KEY:', restoredUser.publicKey);
          console.log(
            'ENCRYPTED PRIVATE KEY:',
            restoredUser.encryptedPrivateKey
          );

          try {
            await loadKeys(
              restoredUser.publicKey!,
              restoredUser.encryptedPrivateKey!,
              passphrase
            );
          } catch (err) {
            console.error('❌ Error desencriptando clave privada', err);

            alert('Passphrase incorrecta');
            forceLogout();
            return;
          }
        }

        dispatch({
          type: Actions.LoadUser,
          payload: restoredUser,
        });

        setIsAuthenticated(true);
      } catch (err: any) {
        if (err.status === 401) {
          forceLogout();
        } else {
          console.error(err);
          setIsAuthenticated(true); // fallback (opcional)
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
