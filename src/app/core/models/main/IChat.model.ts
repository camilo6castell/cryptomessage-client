import { IContact } from './IContact.model';
import { IMessage } from './IMessage.model';

export interface IChat {
  chatId: number;
  participants: IContact[];
  messages: IMessage[];
  lastMessage: IMessage;
  createdAt: string;
}
