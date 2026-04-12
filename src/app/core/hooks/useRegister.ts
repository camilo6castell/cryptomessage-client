// src/app/core/hooks/useRegister.ts
import { useState } from 'react';

import { useHandleInput } from './useHandleInput';
import { authApi } from '../api/auth.api';
import { ConflictError } from '../errors/ConflictError';
import { ApiError } from '../errors/ApiError';
import { ElementStyles } from '../models/enums/ElementStyles.enum';

import type { IMessageForm } from '../models/ui/IMessageForm.model';
import { initialMessageForm } from '../models/ui/IMessageForm.model';
import { initialGatewayForm } from '../models/ui/IGatewayForm.model';

export const useRegister = () => {
  const [registerMessage, setRegisterMessage] =
    useState<IMessageForm>(initialMessageForm);

  const {
    form: registerForm,
    handleInput: handleRegisterInput,
    resetForm: resetRegisterForm,
  } = useHandleInput(initialGatewayForm as unknown as Record<string, string>);

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await authApi.register({
        username: registerForm.username,
        passphrase: registerForm.passphrase,
      });
      setRegisterMessage({
        style: ElementStyles.Success,
        message: 'Usuario creado exitosamente. ¡Ya puedes iniciar sesión!',
      });
      resetRegisterForm();
    } catch (err) {
      if (err instanceof ConflictError) {
        setRegisterMessage({
          style: ElementStyles.Warning,
          message: 'Ese nombre de usuario ya existe. Intenta con otro.',
        });
      } else if (err instanceof ApiError) {
        setRegisterMessage({
          style: ElementStyles.Warning,
          message: `Error del servidor (${err.status})`,
        });
      } else {
        setRegisterMessage({
          style: ElementStyles.Danger,
          message: 'Error de conexión',
        });
      }
    }
  };

  return {
    registerForm,
    handleRegisterInput,
    handleRegisterSubmit,
    registerMessage,
  };
};
