import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';

import { chatsApi } from '../api/chats.api';
import { mapChat } from '../mappers/loadUser.map';

import { Actions } from '../models/enums/Actions.enum';

export const useLoadChats = () => {
  const { state, dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChats = async () => {
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
      setError('Error cargando chats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user.chats.length > 0) return;

    void loadChats();
  }, []);

  return {
    chatList: state.user.chats,
    loadingChats: loading,
    errorLoadingChats: error,
    reloadChats: loadChats,
  };
};
