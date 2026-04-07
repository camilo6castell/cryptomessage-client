// src/app/core/hooks/useSendMessage.ts
import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { httpClient } from '../api/http.client';
import urls from '../resources/url.resource';
import { Actions } from '../models/enums/Actions.enum';
import { IMessage } from '../models/main/IMessage.model';

export const useSendMessage = (): {
  sendMessage: (chatId: number, messageContent: string) => Promise<void>;
} => {
  const { dispatch } = useContext(AppContext);
  // senderId ya no se necesita — el backend lo extrae del JWT

  const sendMessage = async (
    chatId: number,
    messageContent: string,
  ): Promise<void> => {
    try {
      const newMessage = await httpClient.post<IMessage>(urls.messages.send, {
        chatId,
        content: messageContent,
        // senderId ya NO se manda
      });

      dispatch({ type: Actions.AddMessage, payload: newMessage });
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
    }
  };

  return { sendMessage };
};