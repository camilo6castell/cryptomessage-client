// src/app/routes/PrivateGuard.tsx
import { ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContext } from '../core/state/AppContext';
import { Actions } from '../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum';
import { StorageService } from '../core/services/storage.service';
import { authApi } from '../core/api/auth.api';
import { contactsApi } from '../core/api/contacts.api';
import { chatsApi } from '../core/api/chats.api';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';
import { mapContact, mapChat } from '../core/mappers/loadUser.map';

const storage = new StorageService();

export const PrivateGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const { dispatch } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = storage.get<string>('TOKEN');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const bootstrap = async (): Promise<void> => {
      try {
        // 1. Verificar token y recuperar datos base del usuario
        const verifyData = await authApi.verify();

        dispatch({
          type: Actions.LoadUser,
          payload: {
            userId: verifyData.user.userId,
            username: verifyData.user.username,
            publicKey: verifyData.user.publicKey,
            privateKey: storage.get<string>('ENCRYPTED_PRIVATE_KEY') ?? '',
            contacts: [],
            chats: [],
          },
        });

        // 2. Cargar contactos y chats en paralelo
        const [contacts, chats] = await Promise.all([
          contactsApi.list(),
          chatsApi.list(),
        ]);

        contacts.forEach((c) =>
          dispatch({ type: Actions.AddContact, payload: mapContact(c) })
        );

        chats.forEach((c) =>
          dispatch({ type: Actions.AddChat, payload: mapChat(c) })
        );

        // 3. Restaurar o inicializar el estado de navegación
        const savedState = storage.get<MainComponentsEnum>('CURRENT');
        const mainState = savedState ?? MainComponentsEnum.ChatList;
        if (savedState === null)
          storage.set('CURRENT', MainComponentsEnum.ChatList);
        dispatch({ type: Actions.SetMainState, payload: mainState });

        setIsAuthenticated(true);
      } catch {
        storage.remove('TOKEN');
        storage.remove('ENCRYPTED_PRIVATE_KEY');
        setIsAuthenticated(false);
      }
    };

    void bootstrap();
  }, [dispatch]);

  if (isAuthenticated === null) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};
