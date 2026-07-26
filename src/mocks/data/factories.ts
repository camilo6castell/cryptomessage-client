import {
  generateKeyPair,
  exportPublicKey,
  exportPrivateKey,
} from '../../app/core/services/crypto.service';
import { encryptPrivateKeyAES } from '../../app/core/services/crypto-aes.service';
import type { UserResponse } from '../../app/core/models/auth.model';
import type { ChatApiResponse } from '../../app/core/api/chats.api';
import type { ContactApiResponse } from '../../app/core/api/contacts.api';
import type { IMessage } from '../../app/core/models/main/IMessage.model';
import { ChatStatus } from '../../app/core/models/enums/ChatStatus.enum';

const MOCK_PASSPHRASE = 'mock-passphrase-123';

let nextUserId = 100;
let nextChatId = 1;
let nextMessageId = 1;
let nextContactId = 1;

export const createFakeUser = async (
  username: string
): Promise<UserResponse> => {
  const keyPair = await generateKeyPair();
  const publicKeyStr = await exportPublicKey(keyPair.publicKey);
  const privateKeyStr = await exportPrivateKey(keyPair.privateKey);
  const encryptedPrivateKey = await encryptPrivateKeyAES(
    privateKeyStr,
    MOCK_PASSPHRASE
  );

  return {
    userId: nextUserId++,
    username,
    token: `mock-jwt-${username}-${Date.now()}`,
    publicKey: publicKeyStr,
    encryptedPrivateKey,
    createdAt: new Date().toISOString(),
  };
};

export const createFakeChat = (
  username: string,
  publicKey: string,
  userId: number,
  options?: {
    status?: ChatStatus;
    initiatedBy?: number;
  }
): ChatApiResponse => ({
  chatId: nextChatId++,
  status: options?.status ?? ChatStatus.ACCEPTED,
  initiatedBy: options?.initiatedBy ?? userId,
  participant: {
    userId,
    username,
    publicKey,
  },
  createdAt: new Date().toISOString(),
});

export const createFakeContact = (
  username: string,
  publicKey: string
): ContactApiResponse => ({
  contactId: nextContactId++,
  username,
  publicKey,
});

export const createFakeMessage = (
  chatId: number,
  senderId: number,
  encryptedContent: string,
  options?: { isRead?: boolean; sentAt?: string }
): IMessage => ({
  chatId,
  messageId: nextMessageId++,
  senderId,
  encryptedContent,
  sentAt: options?.sentAt ?? new Date().toISOString(),
  isRead: options?.isRead ?? false,
});

export const getMockPassphrase = (): string => MOCK_PASSPHRASE;

export const resetCounters = (): void => {
  nextUserId = 100;
  nextChatId = 1;
  nextMessageId = 1;
  nextContactId = 1;
};
