import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { messagesApi } from '../api/messages.api';
import { Actions } from '../models/enums/Actions.enum';
import { encryptMessage } from '../services/crypto.manager';
import { useGlobalToast } from '../hooks/useGlobalToast';

export const useSendMessage = (): {
  sendMessage: (chatId: number, messageContent: string) => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);
  const { showToast } = useGlobalToast();

  const sendMessage = async (
    chatId: number,
    messageContent: string
  ): Promise<void> => {
    try {
      const chat = state.user.chats.find((c) => c.chatId === chatId);
      if (!chat) return;

      const myId = state.user.userId;
      const otherId = chat.participant?.userId;
      const myPublicKey = state.user.publicKey;
      const otherPublicKey = chat.participant?.publicKey;

      if (!myId || !otherId || !myPublicKey || !otherPublicKey) {
        console.error('Missing required data for encryption');
        showToast('No se pudo enviar: faltan datos de cifrado.', true);
        return;
      }

      const encryptedForMe = await encryptMessage(myPublicKey, messageContent);

      const encryptedForOther = await encryptMessage(
        otherPublicKey,
        messageContent
      );

      const encryptedContentByUser = {
        [String(myId)]: encryptedForMe,
        [String(otherId)]: encryptedForOther,
      };

      const response = await messagesApi.send(chatId, encryptedContentByUser);

      dispatch({
        type: Actions.AddMessage,
        payload: response,
      });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      showToast('No se pudo enviar el mensaje. Intenta de nuevo.', true);
    }
  };

  return { sendMessage };
};
