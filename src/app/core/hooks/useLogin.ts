// src/app/core/hooks/useLogin.ts
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';
import { ElementStyles } from '../models/enums/ElementStyles.enum';
import { useHandleInput } from './useHandleInput';
import { authApi } from '../api/auth.api';
import { contactsApi } from '../api/contacts.api';
import { chatsApi } from '../api/chats.api';
import { StorageService } from '../services/storage.service';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ApiError } from '../errors/ApiError';
import { mapLoginToUser, mapContact, mapChat } from '../mappers/loadUser.map';

import type { IMessageForm } from '../models/ui/IMessageForm.model';
import { initialMessageForm } from '../models/ui/IMessageForm.model';
import { initialGatewayForm } from '../models/ui/IGatewayForm.model';

const storage = new StorageService();

export const useLogin = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [messageForm, setMessageForm] =
    useState<IMessageForm>(initialMessageForm);
  const { form, handleInput, resetForm } = useHandleInput(
    initialGatewayForm as unknown as Record<string, string>
  );

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      // 1. Login — obtenemos token y datos base del usuario
      const loginData = await authApi.login({
        username: form.username,
        passphrase: form.passphrase,
      });

      storage.set('TOKEN', loginData.token);
      storage.set('ENCRYPTED_PRIVATE_KEY', loginData.encryptedPrivateKey);

      // 2. Cargar usuario base en el estado
      dispatch({ type: Actions.LoadUser, payload: mapLoginToUser(loginData) });

      // 3. Cargar contactos y chats en paralelo
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

      setMessageForm({
        style: ElementStyles.Success,
        message: 'Inicio de sesión exitoso',
      });

      resetForm();
      navigate('/');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setMessageForm({
          style: ElementStyles.Danger,
          message: 'Usuario o passphrase incorrectos',
        });
      } else if (err instanceof ApiError) {
        setMessageForm({
          style: ElementStyles.Warning,
          message: `Error del servidor (${err.status})`,
        });
      } else {
        setMessageForm({
          style: ElementStyles.Danger,
          message: 'Error de conexión',
        });
      }
    }
  };

  return { form, handleInput, submitHandler, messageForm };
};
