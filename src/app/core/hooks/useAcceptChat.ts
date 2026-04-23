import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { httpClient } from '../api/http.client';
import urls from '../resources/url.resource';
import { Actions } from '../models/enums/Actions.enum';
import { ChatStatus } from '../models/enums/ChatStatus.enum';

export const useAcceptChat = () => {
  const { dispatch } = useContext(AppContext);

  const acceptChat = async (chatId: number): Promise<void> => {
    try {
      await httpClient.post(urls.chats.accept(chatId));
      dispatch({
        type: Actions.UpdateChatStatus,
        payload: {
          chatId,
          status: ChatStatus.ACCEPTED,
        },
      });
    } catch (err) {
      console.error('Error al aceptar chat:', err);
    }
  };

  return { acceptChat };
};
