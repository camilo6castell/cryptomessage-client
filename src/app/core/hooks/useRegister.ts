import { useHandleInput } from './useHandleInput';
import { authApi } from '../api/auth.api';
import { ConflictError } from '../errors/ConflictError';
import { ApiError } from '../errors/ApiError';
import { initialGatewayForm } from '../models/ui/IGatewayForm.model';

// 🔐 crypto
import {
  generateKeyPair,
  exportPublicKey,
  exportPrivateKey,
} from '../services/crypto.service';

import { encryptPrivateKeyAES } from '../services/crypto-aes.service';

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
      console.log('🔐 Generating key pair...');

      // 1️⃣ Generar claves
      const keyPair = await generateKeyPair();

      // 2️⃣ Exportarlas a base64
      const publicKeyStr = await exportPublicKey(keyPair.publicKey);
      const privateKeyStr = await exportPrivateKey(keyPair.privateKey);

      console.log('🔑 Keys generated');

      // 3️⃣ Cifrar private key con passphrase
      const encryptedPrivateKey = await encryptPrivateKeyAES(
        privateKeyStr,
        registerForm.passphrase
      );

      console.log('🔒 Private key encrypted');

      // 4️⃣ Enviar al backend
      await authApi.register({
        username: registerForm.username,
        passphrase: registerForm.passphrase,
        publicKey: publicKeyStr,
        encryptedPrivateKey: encryptedPrivateKey,
      });

      showToast(
        'Usuario creado exitosamente. ¡Ya puedes iniciar sesión!',
        false
      );

      resetRegisterForm();
    } catch (err) {
      console.error(err);

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
