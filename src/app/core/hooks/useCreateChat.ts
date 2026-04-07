// src/app/core/hooks/useCreateChat.ts
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

      dispatch({ type: Actions.AddChat, payload: mapChat(newChat) });
      dispatch({ type: Actions.SetMainAuxChat, payload: newChat.chatId });
      dispatch({ type: Actions.SetMainState, payload: MainComponentsEnum.ChatList });

    } catch (err) {
      if (err instanceof ConflictError) {
        // Chat ya existe — buscarlo por participant.userId
        const existingChat = state.user.chats.find(
          (chat) => chat.participant.userId === contact.contactId,
        );

        if (existingChat) {
          dispatch({ type: Actions.SetMainAuxChat, payload: existingChat.chatId });
          dispatch({ type: Actions.SetMainState, payload: MainComponentsEnum.ChatList });
        }
      } else {
        console.error('Error al crear el chat:', err);
      }
    }
  };

  return { createChat };
};