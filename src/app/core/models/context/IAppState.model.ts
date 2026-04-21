import { MainComponentsEnum } from '../enums/MainComponents.enum';
import { IContact } from '../main/IContact.model';
import { InitialUser, IUser } from '../main/IUser.model';

export interface IAppState {
  user: IUser;
  app: {
    mainState: MainComponentsEnum | null;
    selectedContact: IContact | null;
    selectedChatId: number | null;
    error: string | null;
  };
}

export const initialAppState: IAppState = {
  user: InitialUser,
  app: {
    mainState: MainComponentsEnum.Login,
    selectedContact: null,
    selectedChatId: null,
    error: null,
  },
};
