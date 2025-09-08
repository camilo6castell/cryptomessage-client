import { IContact } from './IContact.model';
import { IChat } from './IChat.model';

export interface IUser {
  userId: number | null;
  username: string | null;
  publicKey: string | null;
  privateKey: string | null;
  contacts: IContact[];
  chats: IChat[];
}

export const InitialUser: IUser = {
  userId: null,
  username: null,
  publicKey: null,
  privateKey: null,
  contacts: [],
  chats: [],
};
