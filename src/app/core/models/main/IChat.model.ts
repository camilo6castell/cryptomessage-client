// src/app/core/models/main/IChat.model.ts
import { IMessage } from './IMessage.model';

export type ChatStatus = 'PENDING' | 'ACCEPTED' | 'BLOCKED';

export interface IParticipant {
  userId: number;
  username: string;
  publicKey: string;
}

export interface IChat {
  chatId: number;
  status: ChatStatus;
  participant: IParticipant;   // el OTRO usuario, no tú
  messages: IMessage[];        // se carga por separado, empieza vacío
  lastMessage: IMessage | null;
  createdAt: string;
}