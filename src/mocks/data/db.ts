import type { UserResponse } from '../../app/core/models/auth.model';
import type { ChatApiResponse } from '../../app/core/api/chats.api';
import type { ContactApiResponse } from '../../app/core/api/contacts.api';
import type { IMessage } from '../../app/core/models/main/IMessage.model';
import { createFakeUser } from './factories';

export interface MockDb {
  users: UserResponse[];
  chats: ChatApiResponse[];
  contacts: ContactApiResponse[];
  messages: IMessage[];
}

const db: MockDb = {
  users: [],
  chats: [],
  contacts: [],
  messages: [],
};

export const getDb = (): MockDb => db;

export const findUserByUsername = (
  username: string
): UserResponse | undefined => db.users.find((u) => u.username === username);

export const findUserByToken = (token: string): UserResponse | undefined =>
  db.users.find((u) => u.token === token);

export const addUser = (user: UserResponse): void => {
  db.users.push(user);
};

export const addChat = (chat: ChatApiResponse): void => {
  db.chats.push(chat);
};

export const findChatById = (chatId: number): ChatApiResponse | undefined =>
  db.chats.find((c) => c.chatId === chatId);

export const findExistingChat = (
  userAId: number,
  userBId: number
): ChatApiResponse | undefined =>
  db.chats.find(
    (c) =>
      (c.initiatedBy === userAId && c.participant.userId === userBId) ||
      (c.initiatedBy === userBId && c.participant.userId === userAId)
  );

export const getChatsForUser = (userId: number): ChatApiResponse[] =>
  db.chats.filter(
    (c) => c.initiatedBy === userId || c.participant.userId === userId
  );

export const addMessage = (msg: IMessage): void => {
  db.messages.push(msg);
};

export const getMessagesForChat = (chatId: number): IMessage[] =>
  db.messages.filter((m) => m.chatId === chatId);

export const markMessagesAsRead = (chatId: number): void => {
  db.messages
    .filter((m) => m.chatId === chatId)
    .forEach((m) => {
      m.isRead = true;
    });
};

export const addContact = (contact: ContactApiResponse): void => {
  db.contacts.push(contact);
};

export const getContactsForUser = (): ContactApiResponse[] => db.contacts;

export const removeContact = (contactId: number): boolean => {
  const idx = db.contacts.findIndex((c) => c.contactId === contactId);
  if (idx === -1) return false;
  db.contacts.splice(idx, 1);
  return true;
};

export const seedDatabase = async (): Promise<void> => {
  if (db.users.length > 0) return;

  const alice = await createFakeUser('alice');
  const bob = await createFakeUser('bob');
  const charlie = await createFakeUser('charlie');

  db.users.push(alice, bob, charlie);

  const chat1: ChatApiResponse = {
    chatId: 1,
    status: 'ACCEPTED' as never,
    initiatedBy: alice.userId,
    participant: {
      userId: bob.userId,
      username: bob.username,
      publicKey: bob.publicKey,
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  };

  const chat2: ChatApiResponse = {
    chatId: 2,
    status: 'PENDING' as never,
    initiatedBy: charlie.userId,
    participant: {
      userId: alice.userId,
      username: alice.username,
      publicKey: alice.publicKey,
    },
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  };

  db.chats.push(chat1, chat2);

  db.contacts.push(
    {
      contactId: 1,
      username: bob.username,
      publicKey: bob.publicKey,
    },
    {
      contactId: 2,
      username: charlie.username,
      publicKey: charlie.publicKey,
    }
  );

  db.messages.push(
    {
      chatId: 1,
      messageId: 1,
      senderId: alice.userId,
      encryptedContent: 'mock-encrypted-hello-from-alice',
      sentAt: new Date(Date.now() - 3500000).toISOString(),
      isRead: true,
    },
    {
      chatId: 1,
      messageId: 2,
      senderId: bob.userId,
      encryptedContent: 'mock-encrypted-hello-from-bob',
      sentAt: new Date(Date.now() - 3400000).toISOString(),
      isRead: true,
    },
    {
      chatId: 1,
      messageId: 3,
      senderId: alice.userId,
      encryptedContent: 'mock-encrypted-how-are-you',
      sentAt: new Date(Date.now() - 3300000).toISOString(),
      isRead: false,
    }
  );
};
