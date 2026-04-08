// src/app/core/api/chats.api.ts
import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';
import { IChat, ChatStatus } from '../models/main/IChat.model';
import { IMessage } from '../models/main/IMessage.model';

const base = `${API_BASE_URL}/api/v1`;

// Lo que el backend devuelve para un chat
export interface ChatApiResponse {
  chatId: number;
  status: ChatStatus;
  participant: {
    userId: number;
    username: string;
    publicKey: string;
  };
  createdAt: string;
}

export const chatsApi = {
  list: (status?: ChatStatus) => {
    const url = status ? `${base}/chats?status=${status}` : `${base}/chats`;
    return httpClient.get<ChatApiResponse[]>(url);
  },

  create: (username: string) =>
    httpClient.post<ChatApiResponse>(`${base}/chats`, { username }),

  accept: (chatId: number) =>
    httpClient.post<void>(`${base}/chats/${chatId}/accept`),

  block: (chatId: number) =>
    httpClient.post<void>(`${base}/chats/${chatId}/block`),

  getMessages: (chatId: number) =>
    httpClient.get<IMessage[]>(`${base}/messages/chat/${chatId}`),
};
