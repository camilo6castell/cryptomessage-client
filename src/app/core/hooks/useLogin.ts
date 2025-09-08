import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { useHandleInput } from './useHandleInput';
import {
  IMessageForm,
  initialMessageForm,
} from '../models/ui/IMessageForm.model';
import {
  IGatewayLoginFormResponse,
  initialGatewayForm,
} from '../models/ui/IGatewayForm.model';
import httpService from '../services/general/http.service';
import { ElementStyles } from '../models/enums/ElementStyles.enum';
import { Actions } from '../models/enums/Actions.enum';
import { StorageService } from '../services/general/storage.service';
import urls from '../../core/resources/url.resource';
import loadUserMap from '../mappers/loadUser.map';

export const useLogin = (): {
  form: Record<string, string>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  messageForm: IMessageForm;
} => {
  // NAVIGATION
  const navigate = useNavigate();
  // END NAVIGATION

  // MESSAGE FORM
  const [messageForm, setMessageForm] =
    useState<IMessageForm>(initialMessageForm);
  // END MESSAGE FORM

  // CONTEXT
  const { dispatch } = useContext(AppContext);
  // END CONTEXT

  // FORM
  const { form, handleInput, resetForm } = useHandleInput(
    initialGatewayForm as unknown as Record<string, string>,
  );
  // END FORM

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    httpService
      .post(urls.authenticate, form)
      .then((response) => {
        const { status, data } = response as IGatewayLoginFormResponse;

        switch (status) {
          case 200: {
            setMessageForm({
              style: ElementStyles.Success,
              message: 'Inicio de sesión exitoso',
            });
            const storageService = new StorageService();
            storageService.set<string>('TOKEN', data!.token);

            dispatch({
              type: Actions.LoadUser,
              payload: loadUserMap.toModel(data!),
            });
            resetForm();
            navigate('/');
            break;
          }

          case 404:
            setMessageForm({
              style: ElementStyles.Danger,
              message: `Usuario no encontrado. ${status}`,
            });
            break;

          case 401:
            setMessageForm({
              style: ElementStyles.Danger,
              message: `Información incorrecta. ${status}`,
            });
            break;

          default:
            setMessageForm({
              style: ElementStyles.Warning,
              message: `Falla desconocida, contacte al desarrollador. ${status}`,
            });
        }
      })
      .catch((error) => {
        console.error(error);
        setMessageForm({
          style: ElementStyles.Danger,
          message: 'Error de conexión o servidor',
        });
      })
      .finally(() => {
        resetForm();
      });
  };

  return {
    form,
    handleInput,
    submitHandler,
    messageForm,
  };
};
