// src/app/core/api/chats.api.ts
import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';
import { ChatStatus } from '../models/enums/ChatStatus.enum';
import { IMessage } from '../models/main/IMessage.model';

const base = `${API_BASE_URL}/api/v1`;

// Lo que el backend devuelve para un chat
export interface ChatApiResponse {
  chatId: number;
  status: ChatStatus;
  initiatedBy: number;
  participant: {
    userId: number;
    username: string;
    publicKey: string;
  };
  createdAt: string;
}

export const chatsApi = {
  list: (status?: ChatStatus): Promise<ChatApiResponse[]> => {
    const url = status ? `${base}/chats?status=${status}` : `${base}/chats`;
    return httpClient.get<ChatApiResponse[]>(url);
  },

  create: (username: string): Promise<ChatApiResponse> =>
    httpClient.post<ChatApiResponse>(`${base}/chats`, { username }),

  accept: (chatId: number): Promise<void> =>
    httpClient.post<void>(`${base}/chats/${chatId}/accept`),

  block: (chatId: number): Promise<void> =>
    httpClient.post<void>(`${base}/chats/${chatId}/block`),

  getMessages: (chatId: number): Promise<IMessage[]> =>
    httpClient.get<IMessage[]>(`${base}/messages/chat/${chatId}`),
};
