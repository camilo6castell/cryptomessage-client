import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../app/core/config/api.config';
import {
  findUserByUsername,
  findUserByToken,
  findChatById,
  findExistingChat,
  getChatsForUser,
  addChat,
} from '../data/db';
import { createFakeChat } from '../data/factories';
import { ChatStatus } from '../../app/core/models/enums/ChatStatus.enum';

const base = `${API_BASE_URL}/api/v1`;

const getCurrentUser = (
  auth: string | null
): { userId: number; username: string } | null => {
  const token = auth?.replace('Bearer ', '');
  if (!token) return null;
  const user = findUserByToken(token);
  if (!user) return null;
  return { userId: user.userId, username: user.username };
};

export const chatsHandlers = [
  http.get(`${base}/chats`, ({ request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const statusFilter = url.searchParams.get('status');

    let chats = getChatsForUser(user.userId);

    if (statusFilter) {
      chats = chats.filter((c) => c.status === (statusFilter as ChatStatus));
    }

    return HttpResponse.json(chats);
  }),

  http.post(`${base}/chats`, async ({ request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { username: string };
    const target = findUserByUsername(body.username);

    if (!target) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (target.username === user.username) {
      return HttpResponse.json(
        { message: 'Cannot create chat with yourself' },
        { status: 400 }
      );
    }

    const existing = findExistingChat(user.userId, target.userId);
    if (existing) {
      return HttpResponse.json(
        { message: 'Chat already exists' },
        { status: 409 }
      );
    }

    const chat = createFakeChat(
      target.username,
      target.publicKey,
      user.userId,
      {
        status: ChatStatus.PENDING,
        initiatedBy: user.userId,
      }
    );

    addChat(chat);

    return HttpResponse.json(chat, { status: 201 });
  }),

  http.post(`${base}/chats/:chatId/accept`, ({ params, request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const chatId = Number(params.chatId);
    const chat = findChatById(chatId);

    if (!chat) {
      return HttpResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    chat.status = ChatStatus.ACCEPTED;

    return HttpResponse.json(null, { status: 200 });
  }),

  http.post(`${base}/chats/:chatId/block`, ({ params, request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const chatId = Number(params.chatId);
    const chat = findChatById(chatId);

    if (!chat) {
      return HttpResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    chat.status = ChatStatus.BLOCKED;

    return HttpResponse.json(null, { status: 200 });
  }),
];
