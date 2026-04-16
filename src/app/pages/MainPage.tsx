import { ReactElement, useContext } from 'react';
import { AppContext } from '../core/state/AppContext';
import { UserInfoContainer } from '../containers/UserInfoContainer';
import { ChatListContainer } from '../containers/ChatListContainer';
import { UserInfoContainerAux } from '../containers/UserInfoContainerAux';
import { ContactListContainer } from '../containers/ContactListContainer';
import { ContactListContainerAux } from '../containers/ContactListContainerAux';
import { ChatListContainerAux } from '../containers/ChatListContainerAux';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum';

export const MainPage = (): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <>
      {state.app.mainState === MainComponentsEnum.ChatList && (
        <ChatListContainer />
      )}
      {state.app.mainState === MainComponentsEnum.ContactList && (
        <ContactListContainer />
      )}
      {state.app.mainState === MainComponentsEnum.UserInfo && (
        <UserInfoContainer />
      )}

      {state.app.mainState === MainComponentsEnum.ChatList && (
        <ChatListContainerAux />
      )}
      {state.app.mainState === MainComponentsEnum.ContactList && (
        <ContactListContainerAux />
      )}
      {state.app.mainState === MainComponentsEnum.UserInfo && (
        <UserInfoContainerAux />
      )}
    </>
  );
};
