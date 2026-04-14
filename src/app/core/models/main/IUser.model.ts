import { IContact } from './IContact.model';
import { IChat } from './IChat.model';

export interface IUser {
  userId: number | null;
  username: string | null;
  token: string | null;
  publicKey: string | null;
  encryptedPrivateKey: string | null;
  contacts: IContact[];
  chats: IChat[];
}

export const InitialUser: IUser = {
  userId: null,
  username: null,
  token: null,
  publicKey: null,
  encryptedPrivateKey: null,
  contacts: [],
  chats: [],
};
