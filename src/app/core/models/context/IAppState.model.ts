import { MainComponentsEnum } from '../enums/MainComponents.enum';
import { InitialUser, IUser } from '../main/IUser.model';

export interface IAppState {
  user: IUser;
  app: {
    mainState: MainComponentsEnum | null;
    mainAuxChat: number | null;
    error: string | null;
  };
}

export const initialAppState: IAppState = {
  user: InitialUser,
  app: {
    mainState: null,
    mainAuxChat: null,
    error: null,
  },
};
