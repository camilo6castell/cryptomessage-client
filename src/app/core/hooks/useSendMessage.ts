// src/app/core/hooks/useSendMessage.ts
import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { messagesApi } from '../api/messages.api';
import { Actions } from '../models/enums/Actions.enum';

export const useSendMessage = () => {
  const { state, dispatch } = useContext(AppContext);

  const sendMessage = async (
    chatId: number,
    messageContent: string
  ): Promise<void> => {
    try {
      const chat = state.user.chats.find((c) => c.chatId === chatId);

      if (!chat) return;

      const myId = state.user.userId;
      const otherId = chat.participant?.userId;

      if (!myId || !otherId) return;

      const encryptedContentByUser: Record<string, string> = {
        [String(myId)]: messageContent,
        [String(otherId)]: messageContent,
      };

      const response = await messagesApi.send(chatId, encryptedContentByUser);

      dispatch({
        type: Actions.AddMessage,
        payload: response,
      });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
    }
  };

  return { sendMessage };
};
