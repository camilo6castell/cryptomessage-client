import { IMessage } from './IMessage.model';
import { ChatStatus } from '../enums/ChatStatus.enum';

export interface IParticipant {
  userId: number;
  username: string;
  publicKey: string;
}

export interface IChat {
  chatId: number;
  status: ChatStatus;
  initiatedBy: number; // 👈 CLAVE
  participant: IParticipant; // el OTRO usuario, no tú
  messages?: IMessage[]; // se carga por separado, empieza vacío
  lastMessage: IMessage | null; // se carga por separado, empieza null
  createdAt: string;
}
