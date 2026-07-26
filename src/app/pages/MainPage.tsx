import { ReactElement, useContext, useState } from 'react';
import { AppContext } from '../core/state/AppContext';
import { UserInfoContainer } from '../containers/UserInfoContainer';
import { ChatListContainer } from '../containers/ChatListContainer';
import { UserInfoContainerAux } from '../containers/UserInfoContainerAux';
import { ContactListContainer } from '../containers/ContactListContainer';
import { ContactListContainerAux } from '../containers/ContactListContainerAux';
import { ChatListContainerAux } from '../containers/ChatListContainerAux';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum';
import { Actions } from '../core/models/enums/Actions.enum';
import { useMediaQuery } from '../core/hooks/useMediaQuery';
import { breakpoints } from '../ui/styles/maps/breakpoints';

export const MainPage = (): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const isMobile = useMediaQuery(breakpoints.mobile);
  const [contactSearchMode, setContactSearchMode] = useState(false);

  const clearContactSearch = (): void => {
    setContactSearchMode(false);
    dispatch({ type: Actions.SetSelectedContact, payload: null });
  };

  if (isMobile) {
    switch (state.app.mainState) {
      case MainComponentsEnum.ChatList:
        if (state.app.selectedChatId !== null) {
          return <ChatListContainerAux />;
        }
        return <ChatListContainer />;

      case MainComponentsEnum.ContactList:
        if (state.app.selectedContact?.contactId || contactSearchMode) {
          return <ContactListContainerAux onBack={clearContactSearch} />;
        }
        return (
          <ContactListContainer
            onSearchNew={() => setContactSearchMode(true)}
          />
        );

      case MainComponentsEnum.UserInfo:
      default:
        return <UserInfoContainerAux />;
    }
  }

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
