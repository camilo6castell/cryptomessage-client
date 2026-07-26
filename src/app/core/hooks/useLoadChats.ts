import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';

import { chatsApi } from '../api/chats.api';
import { mapChat } from '../mappers/loadUser.map';

import { Actions } from '../models/enums/Actions.enum';
import { IChat } from '../models/main/IChat.model';

export const useLoadChats = (): {
  chatList: IChat[];
  loadingChats: boolean;
  errorLoadingChats: string | null;
  reloadChats: () => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChats = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const chats = await chatsApi.list();

      dispatch({
        type: Actions.SetChats, // 👈 asegúrate de tener esta action
        payload: chats.map(mapChat),
      });
    } catch (err) {
      console.error('Error cargando chats', err);
      setError('Error loading chats');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.user.chats.length > 0) return;

    void loadChats();
  }, [loadChats, state.user.chats.length]);

  return {
    chatList: state.user.chats,
    loadingChats: loading,
    errorLoadingChats: error,
    reloadChats: loadChats,
  };
};
