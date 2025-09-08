import { ElementStyles } from '../enums/ElementStyles.enum';

export interface IMessageForm {
  style: ElementStyles | null;
  message: string | null;
}

export const initialMessageForm: IMessageForm = {
  style: null,
  message: null,
};
