/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppState, initialAppState } from '../models/context/IAppState.model';
import { MainComponentsEnum } from '../models/enums/MainComponents.enum';
import { Actions } from '../models/enums/Actions.enum';

import { IChat } from '../models/main/IChat.model';
import { IContact, initialContact } from '../models/main/IContact.model';
import { IMessage } from '../models/main/IMessage.model';
import { ILoginFormDataResponse } from '../models/ui/IGatewayForm.model';
import { ChatStatus } from '../models/enums/ChatStatus.enum';

const useCases: {
  [key in Actions]: (state: IAppState, payload: any) => IAppState;
} = {
  [Actions.LoadUser]: (
    state: IAppState,
    payload: ILoginFormDataResponse
  ): IAppState => ({
    ...state,
    user: payload,
  }),
  [Actions.SetMainState]: (
    state: IAppState,
    payload: MainComponentsEnum
  ): IAppState => ({
    ...state,
    app: {
      ...state.app,
      mainState: payload,
    },
  }),
  [Actions.SetSelectedContact]: (
    state: IAppState,
    payload: IContact | null
  ): IAppState => ({
    ...state,
    app: {
      ...state.app,
      selectedContact: payload,
    },
  }),
  [Actions.SetSelectedChatId]: (
    state: IAppState,
    payload: number | null
  ): IAppState => ({
    ...state,
    app: {
      ...state.app,
      selectedChatId: payload,
    },
  }),
  [Actions.SetInitialSelectedContact]: (state: IAppState): IAppState => ({
    ...state,
    app: {
      ...state.app,
      selectedContact: initialContact,
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
        (contact) => contact.contactId !== payload
      ),
    },
  }),
  [Actions.SetContacts]: (state, payload: IContact[]) => ({
    ...state,
    user: {
      ...state.user,
      contacts: payload,
    },
  }),
  [Actions.SetChats]: (state, payload: IChat[]) => ({
    ...state,
    user: {
      ...state.user,
      chats: payload,
    },
  }),
  [Actions.AddChat]: (state: IAppState, payload: IChat): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: [...state.user.chats, payload],
    },
  }),
  [Actions.UpsertChat]: (state: IAppState, payload: IChat): IAppState => {
    const exists = state.user.chats.some(
      (chat) => chat.chatId === payload.chatId
    );

    return {
      ...state,
      user: {
        ...state.user,
        chats: exists
          ? state.user.chats.map((chat) =>
              chat.chatId === payload.chatId
                ? { ...chat, status: payload.status }
                : chat
            )
          : [...state.user.chats, payload],
      },
    };
  },
  [Actions.UpdateChatStatus]: (
    state,
    payload: { chatId: number; status: ChatStatus }
  ) => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) =>
        chat.chatId === payload.chatId
          ? { ...chat, status: payload.status }
          : chat
      ),
    },
  }),
  [Actions.SetMessages]: (
    state: IAppState,
    payload: { chatId: number; messages: IMessage[] }
  ): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) =>
        chat.chatId === payload.chatId
          ? {
              ...chat,
              messages: payload.messages,
              lastMessage:
                payload.messages[payload.messages.length - 1] ?? null,
            }
          : chat
      ),
    },
  }),
  [Actions.AddMessage]: (state: IAppState, payload: IMessage): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) => {
        if (chat.chatId === payload.chatId) {
          const currentMessages = chat.messages ?? []; // 👈 clave

          const updatedMessages = [...currentMessages, payload]
            .filter(
              (msg, index, self) =>
                index === self.findIndex((m) => m.messageId === msg.messageId)
            )
            .sort((a, b) => a.messageId - b.messageId);
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
    payload: { chatId: number; messageId: number }
  ): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) => {
        if (chat.chatId !== payload.chatId) return chat;

        // 🔒 mensajes no cargados → no hacer nada
        if (!chat.messages) return chat;

        const updatedMessages = chat.messages
          .map((message) =>
            message.messageId === payload.messageId
              ? { ...message, isRead: true }
              : message
          )
          .sort((a, b) => a.messageId - b.messageId);

        return {
          ...chat,
          messages: updatedMessages,
          lastMessage:
            chat.lastMessage?.messageId === payload.messageId
              ? { ...chat.lastMessage, isRead: true }
              : chat.lastMessage,
        };
      }),
    },
  }),
  [Actions.SetMessagesAsReadByChat]: (
    state: IAppState,
    payload: number // chatId
  ): IAppState => ({
    ...state,
    user: {
      ...state.user,
      chats: state.user.chats.map((chat) => {
        if (chat.chatId !== payload) return chat;

        if (!chat.messages) return chat;

        const updatedMessages = chat.messages.map((msg) =>
          msg.isRead ? msg : { ...msg, isRead: true }
        );

        return {
          ...chat,
          messages: updatedMessages,
          lastMessage: chat.lastMessage
            ? { ...chat.lastMessage, isRead: true }
            : null,
        };
      }),
    },
  }),
  [Actions.SetError]: (state: IAppState, payload: string): IAppState => ({
    ...state,
    app: {
      ...state.app,
      error: payload,
    },
  }),
  [Actions.Logout]: (): IAppState => initialAppState,
};

export const reducer = (
  state: IAppState,
  action: { type: Actions; payload: any }
): IAppState => {
  return useCases[action.type](state, action.payload) || state;
};
