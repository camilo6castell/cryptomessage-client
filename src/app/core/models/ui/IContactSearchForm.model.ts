import { IContact } from '../main/IContact.model';

export interface IContactSearchForm {
  username: string;
}

export const initialContactSearchForm: IContactSearchForm = {
  username: '',
};

export interface IContactSearchFormResponse {
  status: number;
  data?: IContact;
}
