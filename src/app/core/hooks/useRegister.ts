import { useHandleInput } from './useHandleInput';
import { authApi } from '../api/auth.api';
import { ConflictError } from '../errors/ConflictError';
import { ApiError } from '../errors/ApiError';
import { initialGatewayForm } from '../models/ui/IGatewayForm.model';

export const useRegister = (
  showToast: (message: string, isDanger: boolean) => void
) => {
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
      showToast(
        'Usuario creado exitosamente. ¡Ya puedes iniciar sesión!',
        false
      );
      resetRegisterForm();
    } catch (err) {
      if (err instanceof ConflictError) {
        showToast('Ese nombre de usuario ya existe. Intenta con otro.', true);
      } else if (err instanceof ApiError) {
        showToast(`Error del servidor (${err.status})`, true);
      } else {
        showToast('Error de conexión', true);
      }
    }
  };

  return {
    registerForm,
    handleRegisterInput,
    handleRegisterSubmit,
  };
};
