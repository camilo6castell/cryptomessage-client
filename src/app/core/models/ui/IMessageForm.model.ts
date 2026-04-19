import { MessageStatus } from '../enums/MessageStatus.enum';
export interface IMessageForm {
  result: MessageStatus;
  isDanger: boolean | null;
  message: string | null;
}

export const initialMessageForm: IMessageForm = {
  result: MessageStatus.Idle,
  isDanger: null,
  message: null,
};
