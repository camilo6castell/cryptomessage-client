import { MainComponentsEnum } from '../enums/MainComponents.enum';
import { IChat } from '../main/IChat.model';
import { IContact } from '../main/IContact.model';
import { InitialUser, IUser } from '../main/IUser.model';

export interface IAppState {
  user: IUser;
  app: {
    mainState: MainComponentsEnum | null;
    selectedContact: IContact | null;
    selectedChat: IChat | null;
    error: string | null;
  };
}

export const initialAppState: IAppState = {
  user: InitialUser,
  app: {
    mainState: MainComponentsEnum.Login,
    selectedContact: null,
    selectedChat: null,
    error: null,
  },
};
