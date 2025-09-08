import { useState } from 'react';
import http from '../../core/services/general/http.service';
import urls from '../../core/resources/url.resource.ts';
import { useHandleInput } from '../../core/hooks/useHandleInput';
import {
  IMessageForm,
  initialMessageForm,
} from '../../core/models/ui/IMessageForm.model.ts';
import { ElementStyles } from '../../core/models/enums/ElementStyles.enum.ts';
import {
  IGatewayRegisterFormResponse,
  initialGatewayForm,
} from '../../core/models/ui/IGatewayForm.model.ts';

export const useRegister = (): {
  form: Record<string, string>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  messageForm: IMessageForm;
} => {
  const [messageForm, setMessageForm] =
    useState<IMessageForm>(initialMessageForm);
  const { form, handleInput, resetForm } = useHandleInput(
    initialGatewayForm as unknown as Record<string, string>,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    http
      .post(urls.register, form)
      .then((response) => {
        const { status } = response as IGatewayRegisterFormResponse;

        switch (status) {
          case 201:
            setMessageForm({
              style: ElementStyles.Success,
              message: 'Usuario creado exitosamente.',
            });
            break;

          case 409:
            setMessageForm({
              style: ElementStyles.Warning,
              message: 'Usuario restringido. Intenta con otro',
            });
            break;

          default:
            setMessageForm({
              style: ElementStyles.Warning,
              message: `Error desde el servidor. CODE: ${status}`,
            });
        }
        resetForm();
      })
      .catch((error) => {
        console.error('Error desconocido:', error);
        setMessageForm({
          style: ElementStyles.Danger,
          message: 'Error de conexión o servidor',
        });
      });
  };

  return {
    form,
    handleInput,
    handleSubmit,
    messageForm,
  };
};
