// src/app/core/api/messages.api.ts
import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';
import { IMessage } from '../models/main/IMessage.model';

const base = `${API_BASE_URL}/api/v1/messages`;

export const messagesApi = {
  send: (chatId: number, encryptedContentByUser: Record<string, string>) =>
    httpClient.post(`${base}`, {
      chatId,
      encryptedContentByUser,
    }),

  getByChat: (chatId: number) =>
    httpClient.get<IMessage[]>(`${base}/chat/${chatId}`),

  markAsRead: (chatId: number) =>
    httpClient.patch(`${base}/chat/${chatId}/read`),
};
