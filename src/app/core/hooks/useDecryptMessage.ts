// src/app/core/hooks/useDecryptMessage.ts
import { useState, useEffect, useContext } from 'react';
import { httpClient } from '../../core/api/http.client';
import { IMessage } from '../../core/models/main/IMessage.model';
import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';
import { API_BASE_URL } from '../config/api.config';

export const useDecryptMessage = (
  chatId: number,
  messageId: number,
  senderId: number,
  shouldFetch: boolean,
  setMessageWidth: (width: number) => void,
): { decryptedMessage: string; isLoading: boolean; error: string | null } => {
  const { state, dispatch } = useContext(AppContext);
  const [decryptedMessage, setDecryptedMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldFetch) return;

    let mounted = true;

    const fetchDecrypted = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: confirmar URL exacta cuando el endpoint de descifrado esté definido en el backend
        const data = await httpClient.get<IMessage>(
          `${API_BASE_URL}/api/v1/messages/decrypt/${state.user.userId}/${messageId}`,
        );

        if (!mounted) return;

        setDecryptedMessage(data.content);
        setMessageWidth(data.content.length);

        // Solo marcar como leído si el mensaje es de otro usuario
        if (state.user.userId !== senderId) {
          dispatch({
            type: Actions.SetMessageAsRead,
            payload: { chatId, messageId },
          });
        }
      } catch (err) {
        if (mounted) {
          setError('Error al descifrar el mensaje');
          console.error(err);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void fetchDecrypted();

    return () => { mounted = false; };
  }, [chatId, messageId, senderId, shouldFetch, dispatch, setMessageWidth, state.user.userId]);

  return { decryptedMessage, isLoading, error };
};