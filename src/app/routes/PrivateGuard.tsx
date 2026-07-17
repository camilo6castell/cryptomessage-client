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
import { LoadingScreen } from '../ui/components/general/LoadingScreen';
import { PassphraseModal } from '../ui/components/general/PassphraseModal';

const storageService = new StorageService();

type RestoredUser = {
  token: string;
  userId: number;
  username: string;
  createdAt: string;
  publicKey: string | null;
  encryptedPrivateKey: string | null;
  contacts: [];
  chats: [];
};

export const PrivateGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const { dispatch } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pendingUser, setPendingUser] = useState<RestoredUser | null>(null);
  const [passphraseError, setPassphraseError] = useState<string | null>(null);
  const [isVerifyingPassphrase, setIsVerifyingPassphrase] = useState(false);

  const forceLogout = () => {
    clearCrypto();
    storageService.remove('APP_STATE');
    dispatch({ type: Actions.Logout, payload: null });
    setPendingUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const user = storageService.get<IAppState>('APP_STATE')?.user;

    if (!user?.token) {
      setIsAuthenticated(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const data: UserResponse = await authApi.verify();

        const restoredUser: RestoredUser = {
          token: data.token,
          userId: data.userId,
          username: data.username,
          createdAt: data.createdAt,
          publicKey: data.publicKey,
          encryptedPrivateKey: data.encryptedPrivateKey,
          contacts: [],
          chats: [],
        };

        if (!hasPrivateKey()) {
          // The private key only ever lives in memory — a reload needs the
          // passphrase again. Hand off to the modal instead of blocking here.
          setPendingUser(restoredUser);
          return;
        }

        dispatch({ type: Actions.LoadUser, payload: restoredUser });
        setIsAuthenticated(true);
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status;
        if (status === 401) {
          forceLogout();
        } else {
          console.error(err);
          setIsAuthenticated(true); // fallback (opcional)
        }
      }
    };

    void verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handlePassphraseSubmit = async (passphrase: string) => {
    if (!pendingUser) return;

    setIsVerifyingPassphrase(true);
    setPassphraseError(null);

    try {
      await loadKeys(
        pendingUser.publicKey!,
        pendingUser.encryptedPrivateKey!,
        passphrase
      );

      dispatch({ type: Actions.LoadUser, payload: pendingUser });
      setPendingUser(null);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('❌ Error desencriptando clave privada', err);
      setPassphraseError('Passphrase incorrecta. Intenta de nuevo.');
    } finally {
      setIsVerifyingPassphrase(false);
    }
  };

  if (pendingUser) {
    return (
      <PassphraseModal
        username={pendingUser.username}
        error={passphraseError}
        isVerifying={isVerifyingPassphrase}
        onSubmit={handlePassphraseSubmit}
        onCancel={forceLogout}
      />
    );
  }

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
