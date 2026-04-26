import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';
import { useHandleInput } from './useHandleInput';
import { authApi } from '../api/auth.api';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ApiError } from '../errors/ApiError';
import { mapLoginToUser } from '../mappers/loadUser.map';
import { MainComponentsEnum } from '../models/enums/MainComponents.enum';

// 🔥 NUEVO
import { loadKeys } from '../services/crypto.manager';

export const useLogin = (
  showToast: (message: string, isDanger: boolean) => void
) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const initialForm = {
    username: '',
    passphrase: '',
  };

  const {
    form: loginForm,
    handleInput: handleLoginInput,
    resetForm: resetLoginForm,
  } = useHandleInput(initialForm);

  const handleLoginSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const loginData = await authApi.login({
        username: loginForm.username,
        passphrase: loginForm.passphrase,
      });

      const user = mapLoginToUser(loginData);

      // 🔐 Cargar claves ANTES de entrar a la app
      await loadKeys(
        user.publicKey!,
        user.encryptedPrivateKey!
        // loginForm.passphrase
      );

      // 🧠 Guardar usuario en estado
      dispatch({
        type: Actions.LoadUser,
        payload: user,
      });

      dispatch({
        type: Actions.SetMainState,
        payload: MainComponentsEnum.ChatList,
      });

      showToast('Inicio de sesión exitoso', false);
      resetLoginForm();
      navigate('/');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        showToast('Usuario o passphrase incorrectos', true);
      } else if (err instanceof ApiError) {
        showToast(`Error del servidor (${err.status})`, true);
      } else {
        console.error(err);
        showToast('Error de conexión', true);
      }
    }
  };

  return { loginForm, handleLoginInput, handleLoginSubmit };
};
