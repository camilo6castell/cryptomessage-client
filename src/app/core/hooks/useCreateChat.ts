import { useContext } from 'react';
import { AppContext } from '../../core/state/AppContext';
import httpService from '../../core/services/general/http.service';
import urls from '../../core/resources/url.resource';
import { Actions } from '../../core/models/enums/Actions.enum';
import { IContact } from '../../core/models/main/IContact.model';
import { IChat } from '../../core/models/main/IChat.model';
import { MainComponentsEnum } from '../models/enums/MainComponents.enum';

export const useCreateChat = (): {
  createChat: (contact: IContact) => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);
  const createChat = async (contact: IContact): Promise<void> => {
    try {
      const response = await httpService.post(
        `${urls.createChat}?user1Id=${state.user.userId}&user2Id=${contact.contactId}`,
        {},
      );
      console.log(response);
      const { status, data } = response;
      if (status === 201 && data) {
        const newChat = data as IChat;

        dispatch({ type: Actions.AddChat, payload: newChat });
        dispatch({ type: Actions.SetMainAuxChat, payload: newChat.chatId });
        dispatch({
          type: Actions.SetMainState,
          payload: MainComponentsEnum.ChatList,
        });
      }
      if (status === 409) {
        // Busca el chat existente por contactId
        const existedChat = state.user.chats.find((chat) =>
          chat.participants.some(
            (participant) => participant.contactId === contact.contactId,
          ),
        );
        dispatch({
          type: Actions.SetMainAuxChat,
          payload: existedChat!.chatId,
        });
        dispatch({
          type: Actions.SetMainState,
          payload: MainComponentsEnum.ChatList,
        });
      } else {
        console.error(`Error al crear el chat: ${status}`);
      }
    } catch (error) {
      console.error('Error al crear el chat:', error);
    }
  };

  return { createChat };
};
