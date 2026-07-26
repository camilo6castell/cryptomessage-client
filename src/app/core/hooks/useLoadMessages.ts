import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { Actions } from '../models/enums/Actions.enum';
import { messagesApi } from '../api/messages.api';

export const useLoadMessages = (): {
  loading: boolean;
  error: string | null;
  loadMessages: () => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async (): Promise<void> => {
    if (!state.app.selectedChatId) return;

    setLoading(true);
    setError(null);

    try {
      const messages = await messagesApi.getByChat(state.app.selectedChatId);

      dispatch({
        type: Actions.SetMessages,
        payload: { chatId: state.app.selectedChatId, messages },
      });
    } catch (err) {
      console.error('Error loading messages', err);
      setError('Error loading messages');
    } finally {
      setLoading(false);
    }
  }, [dispatch, state.app.selectedChatId]);

  useEffect(() => {
    if (!state.app.selectedChatId) return;

    void loadMessages();
  }, [state.app.selectedChatId, loadMessages]);

  return { loading, error, loadMessages };
};

// export const useLoadMessages = (chatId: number | null) => {
//   const { state, dispatch } = useContext(AppContext);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const loadMessages = async () => {
//     if (!chatId) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const messages = await messagesApi.getByChat(chatId);

//       dispatch({
//         type: Actions.SetMessages,
//         payload: { chatId, messages },
//       });
//     } catch (err) {
//       console.error('Error cargando mensajes', err);
//       setError('Error cargando mensajes');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!chatId) return;

//     const chat = state.user.chats.find((c) => c.chatId === chatId);

//     // ✅ ahora sí correcto
//     if (chat?.messages !== undefined) return;

//     void loadMessages();
//   }, [chatId]); //

//   return { loading, error, loadMessages };
// };
