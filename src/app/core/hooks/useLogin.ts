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

  const [loginMessage, setLoginMessage] =
    useState<IMessageForm>(initialMessageForm);

  const {
    form: loginForm,
    handleInput: handleLoginInput,
    resetForm: resetLoginForm,
  } = useHandleInput(initialGatewayForm as unknown as Record<string, string>);

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const loginData = await authApi.login({
        username: loginForm.username,
        passphrase: loginForm.passphrase,
      });
      storage.set('TOKEN', loginData.token);
      storage.set('ENCRYPTED_PRIVATE_KEY', loginData.encryptedPrivateKey);
      dispatch({ type: Actions.LoadUser, payload: mapLoginToUser(loginData) });
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
      setLoginMessage({
        style: ElementStyles.Success,
        message: 'Inicio de sesión exitoso',
      });
      resetLoginForm();
      navigate('/');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setLoginMessage({
          style: ElementStyles.Danger,
          message: 'Usuario o passphrase incorrectos',
        });
      } else if (err instanceof ApiError) {
        setLoginMessage({
          style: ElementStyles.Warning,
          message: `Error del servidor (${err.status})`,
        });
      } else {
        setLoginMessage({
          style: ElementStyles.Danger,
          message: 'Error de conexión',
        });
      }
    }
  };

  return { loginForm, handleLoginInput, handleLoginSubmit, loginMessage };
};
