import { IChat } from '../main/IChat.model';
import { IContact } from '../main/IContact.model';
import { IMessageForm } from './IMessageForm.model';

export interface IGatewayForm {
  username: string;
  passphrase: string;
}

export const initialGatewayForm: IGatewayForm = {
  username: '',
  passphrase: '',
};

// PROPS
export interface IGatewayFormProps {
  children: React.ReactNode;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  messageForm: IMessageForm;
  formTitle: string;
  $visible: boolean;
  formText: string;
  helpText: string;
  helpLink: string;
  helpTextLink: string;
}

// LOGIN

export interface IGatewayLoginFormResponse {
  status: number;
  data?: ILoginFormDataResponse;
}

export interface ILoginFormDataResponse {
  token: string;
  userId: number;
  username: string;
  publicKey: string;
  privateKey: string;
  createdAt: string;
  contacts: IContact[];
  chats: IChat[];
}

// REGISTER

export interface IGatewayRegisterFormResponse {
  status: number;
  data?: IRegisterFormDataResponse;
}

export interface IRegisterFormDataResponse {
  username: string;
}
