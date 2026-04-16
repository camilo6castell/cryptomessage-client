export interface IMessageForm {
  isDanger: boolean | null;
  message: string | null;
}

export const initialMessageForm: IMessageForm = {
  isDanger: null,
  message: null,
};
