// src/app/core/models/main/IChat.model.ts
import { IMessage } from './IMessage.model';

export type ChatStatus = 'PENDING' | 'ACCEPTED' | 'BLOCKED';

export interface IParticipant {
  userId: number;
  username: string;
  publicKey: string;
}

export interface IChat {
  chatId: number | null;
  status: ChatStatus | null;
  participant: IParticipant | null; // el OTRO usuario, no tú
  messages: IMessage[]; // se carga por separado, empieza vacío
  lastMessage: IMessage | null;
  createdAt: string | null;
}

export const InitialChat: IChat = {
  chatId: null,
  status: null,
  participant: null,
  messages: [],
  lastMessage: null,
  createdAt: null,
};
