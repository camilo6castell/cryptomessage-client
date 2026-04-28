// src/app/core/mappers/loadUser.map.ts
import { IUser } from '../models/main/IUser.model';
import { UserResponse } from '../models/auth.model';
import { ContactApiResponse } from '../api/contacts.api';
import { ChatApiResponse } from '../api/chats.api';
import { IChat } from '../models/main/IChat.model';
import { IContact } from '../models/main/IContact.model';
// import { IMessage } from '../models/main/IMessage.model';

export const mapLoginToUser = (data: UserResponse): IUser => ({
  userId: data.userId,
  username: data.username,
  token: data.token,
  publicKey: data.publicKey,
  encryptedPrivateKey: data.encryptedPrivateKey,
  contacts: [],
  chats: [],
});

export const mapContact = (c: ContactApiResponse): IContact => ({
  contactId: c.contactId,
  username: c.username,
  publicKey: c.publicKey,
});

export const mapChat = (c: ChatApiResponse): IChat => ({
  chatId: c.chatId,
  status: c.status,
  initiatedBy: c.initiatedBy,
  participant: {
    userId: c.participant.userId,
    username: c.participant.username,
    publicKey: c.participant.publicKey,
  },
  messages: [],
  lastMessage: null,
  createdAt: c.createdAt,
});

// const mapMessage = (msg: any): IMessage => ({
//   messageId: msg.messageId,
//   chatId: msg.chatId,
//   senderId: msg.senderId,
//   encryptedContent: msg.encryptedContent,
//   sentAt: msg.sentAt,
//   isRead: msg.isRead,
// });
