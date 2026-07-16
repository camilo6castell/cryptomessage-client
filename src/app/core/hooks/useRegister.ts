import { useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    form: registerForm,
    handleInput: handleRegisterInput,
    resetForm: resetRegisterForm,
  } = useHandleInput(initialGatewayForm as unknown as Record<string, string>);

  const handleRegisterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1️⃣ Generar claves (RSA — puede tomar un momento en equipos lentos)
      const keyPair = await generateKeyPair();

      // 2️⃣ Exportarlas a base64
      const publicKeyStr = await exportPublicKey(keyPair.publicKey);
      const privateKeyStr = await exportPrivateKey(keyPair.privateKey);

      // 3️⃣ Cifrar private key con passphrase
      const encryptedPrivateKey = await encryptPrivateKeyAES(
        privateKeyStr,
        registerForm.passphrase
      );

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
      if (err instanceof ConflictError) {
        showToast('Ese nombre de usuario ya existe. Intenta con otro.', true);
      } else if (err instanceof ApiError) {
        showToast(`Error del servidor (${err.status})`, true);
      } else {
        console.error(err);
        showToast('Error de conexión', true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    registerForm,
    handleRegisterInput,
    handleRegisterSubmit,
    isSubmitting,
  };
};
