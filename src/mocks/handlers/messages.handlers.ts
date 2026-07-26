import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../app/core/config/api.config';
import {
  findUserByToken,
  getMessagesForChat,
  addMessage,
  markMessagesAsRead,
} from '../data/db';
import { createFakeMessage } from '../data/factories';

const base = `${API_BASE_URL}/api/v1/messages`;

const getCurrentUser = (
  auth: string | null
): { userId: number; username: string } | null => {
  const token = auth?.replace('Bearer ', '');
  if (!token) return null;
  const user = findUserByToken(token);
  if (!user) return null;
  return { userId: user.userId, username: user.username };
};

export const messagesHandlers = [
  http.get(`${base}/chat/:chatId`, ({ params, request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const chatId = Number(params.chatId);
    const messages = getMessagesForChat(chatId);

    return HttpResponse.json(messages);
  }),

  http.post(`${base}`, async ({ request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as {
      chatId: number;
      encryptedContentByUser: Record<string, string>;
    };

    const entry = Object.entries(body.encryptedContentByUser)[0];
    const encryptedContent = entry ? entry[1] : 'mock-encrypted';

    const msg = createFakeMessage(body.chatId, user.userId, encryptedContent);

    addMessage(msg);

    return HttpResponse.json(msg, { status: 201 });
  }),

  http.patch(`${base}/chat/:chatId/read`, ({ params, request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const chatId = Number(params.chatId);
    markMessagesAsRead(chatId);

    return HttpResponse.json(null, { status: 200 });
  }),
];
