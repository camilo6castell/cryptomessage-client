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
  const [messageForm, setMessageForm] =
    useState<IMessageForm>(initialMessageForm);
  const { form, handleInput, resetForm } = useHandleInput(
    initialGatewayForm as unknown as Record<string, string>
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      await authApi.register({
        username: form.username,
        passphrase: form.passphrase,
      });

      setMessageForm({
        style: ElementStyles.Success,
        message: 'Usuario creado exitosamente. ¡Ya puedes iniciar sesión!',
      });
      resetForm();
    } catch (err) {
      if (err instanceof ConflictError) {
        setMessageForm({
          style: ElementStyles.Warning,
          message: 'Ese nombre de usuario ya existe. Intenta con otro.',
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

  return { form, handleInput, handleSubmit, messageForm };
};
