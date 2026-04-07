// src/app/core/mappers/loadUser.map.ts
import { IUser } from '../models/main/IUser.model';
import { LoginApiResponse } from '../models/auth.model';
import { ContactApiResponse } from '../api/contacts.api';
import { ChatApiResponse } from '../api/chats.api';
import { IChat } from '../models/main/IChat.model';
import { IContact } from '../models/main/IContact.model';

export const mapLoginToUser = (data: LoginApiResponse): IUser => ({
  userId: data.user.userId,
  username: data.user.username,
  publicKey: data.user.publicKey,
  privateKey: data.encryptedPrivateKey,
  contacts: [],
  chats: [],
});

export const mapContact = (c: ContactApiResponse): IContact => ({
  contactId: c.contactId,
  username: c.username,
  publicKey: c.publicKey,
  addedAt: null,
});

export const mapChat = (c: ChatApiResponse): IChat => ({
  chatId: c.chatId,
  status: c.status,
  participant: {
    userId: c.participant.userId,
    username: c.participant.username,
    publicKey: c.participant.publicKey,
  },
  messages: [],
  lastMessage: null,
  createdAt: c.createdAt,
});