// src/app/core/hooks/useMarkAsRead.ts

import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { messagesApi } from '../api/messages.api';
import { Actions } from '../models/enums/Actions.enum';

export const useMarkAsRead = (): {
  markAsRead: (chatId: number) => Promise<void>;
} => {
  const { dispatch } = useContext(AppContext);

  const markAsRead = async (chatId: number): Promise<void> => {
    try {
      await messagesApi.markAsRead(chatId);

      // 🧠 actualizar frontend
      dispatch({
        type: Actions.SetMessagesAsReadByChat, // 👈 nuevo action
        payload: chatId,
      });
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  return { markAsRead };
};
