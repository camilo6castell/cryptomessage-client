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
): {
  registerForm: Record<string, string>;
  handleRegisterInput: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleRegisterSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
} => {
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

      showToast('Account created successfully. You can now sign in.', false);

      resetRegisterForm();
    } catch (err) {
      if (err instanceof ConflictError) {
        showToast('That username is already taken. Try another one.', true);
      } else if (err instanceof ApiError) {
        showToast(`Server error (${err.status})`, true);
      } else {
        console.error(err);
        showToast('Connection error', true);
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
