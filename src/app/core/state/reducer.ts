/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppState, initialAppState } from '../models/context/IAppState.model';
import { MainComponentsEnum } from '../models/enums/MainComponents.enum';
import { Actions } from '../models/enums/Actions.enum';

import { IChat } from '../models/main/IChat.model';
import { IContact } from '../models/main/IContact.model';
import { IMessage } from '../models/main/IMessage.model';
import { ILoginFormDataResponse } from '../models/ui/IGatewayForm.model';

const useCases: {
  [key in Actions]: (state: IAppState, payload: any) => IAppState;
} = {
  [Actions.LoadUser]: (
    state: IAppState,
    payload: ILoginFormDataResponse,
  ): IAppState => ({
    ...state,
    user: payload,
  }),
  [Actions.SetMainState]: (
    state: IAppState,
    payload: MainComponentsEnum,
  ): IAppState => ({
    ...state,
    app: {
      ...state.app,
      mainState: payload,
    },
  }),
  [Actions.SetMainAuxChat]: (state: IAppState, payload: number): IAppState => ({
    ...state,
    app: {
      ...state.app,
      mainAuxChat: payload,
    },
  }),
  [Actions.AddContact]: (state: IAppState, payload: IContact): IAppState => ({
    ...state,
    user: {
      ...state.user,
      contacts: [...state.user.contacts, payload],
    },
  }),
  [Actions.DeleteContact]: (state: IAppState, payload: number): IAppState => ({
    ...state,
    user: {
      ...state.user,
      contacts: state.user.contacts.filter(
        (contact) => contact.contactId !== payload,
      ),
    },
  }),
  [Actions.AddChat]: (state: IAppState, payload: IChat): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: [...state.user.chats, payload],
    },
  }),
  [Actions.AddMessage]: (state: IAppState, payload: IMessage): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) => {
        if (chat.chatId === payload.chatId) {
          const updatedMessages = [...chat.messages, payload].sort(
            (a, b) => a.messageId - b.messageId,
          );
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: payload,
          };
        }
        return chat;
      }),
    },
  }),
  [Actions.SetMessageAsRead]: (
    state: IAppState,
    payload: { chatId: number; messageId: number },
  ): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) =>
        chat.chatId === payload.chatId
          ? {
              ...chat,
              messages: chat.messages
                .map((message) =>
                  message.messageId === payload.messageId
                    ? { ...message, isRead: true }
                    : message,
                )
                .sort((a, b) => a.messageId - b.messageId),
              lastMessage:
                chat.lastMessage.messageId === payload.messageId
                  ? { ...chat.lastMessage, isRead: true }
                  : chat.lastMessage,
            }
          : chat,
      ),
    },
  }),
  [Actions.Logout]: (): IAppState => initialAppState,
};

export const reducer = (
  state: IAppState,
  action: { type: Actions; payload: any },
): IAppState => {
  return useCases[action.type](state, action.payload) || state;
};

// PARA OTROS CASOS
// esto es un ejemplo de como se puede hacer un reducer con varios casos de varias entidades
// import { userCases, userInitialState } from './user';
// import { otherCases, otherInitialState } from './other';

// export const userInitialState = {... userInitialState. ... otherInitialState};

// export const reducer = (state: any, action: {type: string | number; payload: any;}) => {
//   const cases = {...userCases, ...otherCases};
//   return cases[action.type](state, action.payload) || state;
// };
