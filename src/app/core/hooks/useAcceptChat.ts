import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { chatsApi } from '../api/chats.api';
import { Actions } from '../models/enums/Actions.enum';
import { ChatStatus } from '../models/enums/ChatStatus.enum';

export const useAcceptChat = (): {
  acceptChat: (chatId: number) => Promise<void>;
} => {
  const { dispatch } = useContext(AppContext);

  const acceptChat = async (chatId: number): Promise<void> => {
    try {
      await chatsApi.accept(chatId);
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
