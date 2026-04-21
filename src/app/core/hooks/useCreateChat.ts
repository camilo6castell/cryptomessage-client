import { useContext } from 'react';
import { AppContext } from '../../core/state/AppContext';
import { chatsApi } from '../../core/api/chats.api';
import { Actions } from '../../core/models/enums/Actions.enum';
import { IContact } from '../../core/models/main/IContact.model';
import { MainComponentsEnum } from '../models/enums/MainComponents.enum';
import { ConflictError } from '../errors/ConflictError';
import { mapChat } from '../mappers/loadUser.map';

export const useCreateChat = (): {
  createChat: (contact: IContact) => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);

  const createChat = async (contact: IContact): Promise<void> => {
    try {
      const newChat = await chatsApi.create(contact.username!);

      const mappedChat = mapChat(newChat);

      // ✅ guardar en estado
      dispatch({ type: Actions.AddChat, payload: mappedChat });

      // ✅ seleccionar chat
      dispatch({
        type: Actions.SetSelectedChatId,
        payload: mappedChat.chatId,
      });

      // ✅ navegar
      dispatch({
        type: Actions.SetMainState,
        payload: MainComponentsEnum.ChatList,
      });
    } catch (err) {
      if (err instanceof ConflictError) {
        // 🔍 buscar chat existente de forma segura
        const existingChat = state.user.chats.find(
          (chat) => chat.participant?.userId === contact.contactId
        );

        if (existingChat) {
          dispatch({
            type: Actions.SetSelectedChatId,
            payload: existingChat.chatId,
          });

          dispatch({
            type: Actions.SetMainState,
            payload: MainComponentsEnum.ChatList,
          });
        }
      } else {
        console.error('Error al crear el chat:', err);
      }
    }
  };

  return { createChat };
};
