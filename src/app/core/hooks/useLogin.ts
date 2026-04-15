import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';
import { useHandleInput } from './useHandleInput';
import { authApi } from '../api/auth.api';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ApiError } from '../errors/ApiError';
import { mapLoginToUser } from '../mappers/loadUser.map';
import { initialGatewayForm } from '../models/ui/IGatewayForm.model';
import { MainComponentsEnum } from '../models/enums/MainComponents.enum';

export const useLogin = (
  showToast: (message: string, isDanger: boolean) => void
) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

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
      showToast('Inicio de sesión exitoso', false);
      resetLoginForm();
      dispatch({ type: Actions.LoadUser, payload: mapLoginToUser(loginData) });
      dispatch({
        type: Actions.SetMainState,
        payload: MainComponentsEnum.ChatList,
      });
      navigate('/');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        showToast('Usuario o passphrase incorrectos', true);
      } else if (err instanceof ApiError) {
        showToast(`Error del servidor (${err.status})`, true);
      } else {
        showToast('Error de conexión', true);
      }
    }
  };

  return { loginForm, handleLoginInput, handleLoginSubmit };
};
