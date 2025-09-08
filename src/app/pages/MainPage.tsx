import { ReactElement, useContext } from 'react';

import { MainSection } from '../ui/elements/sections/MainSection';
import { AuxSection } from '../ui/elements/sections/AuxSection';
import { AppContext } from '../core/state/AppContext';

import { UserInfoContainer } from '../containers/UserInfoContainer';
import { ChatListContainer } from '../containers/ChatListContainer';
import { UserInfoContainerAux } from '../containers/UserInfoContainerAux';
import { ContactListContainer } from '../containers/ContactListContainer';
import { ContactListContainerAux } from '../containers/ContactListContainerAux';
import { ChatListContainerAux } from '../containers/ChatListContainerAux';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum';

export const MainPage = (): ReactElement => {
  // CONTEXT
  const { state } = useContext(AppContext);
  // END CONTEXT

  const mainRenderContainer = (): ReactElement => {
    switch (state.app.mainState) {
      case MainComponentsEnum.UserInfo:
        return <UserInfoContainer />;
      case MainComponentsEnum.ChatList:
        return <ChatListContainer />;
      case MainComponentsEnum.ContactList:
        return <ContactListContainer />;
      default:
        return <div> Error </div>;
    }
  };

  const auxRenderContainer = (): ReactElement => {
    switch (state.app.mainState) {
      case MainComponentsEnum.UserInfo:
        return <UserInfoContainerAux />;
      case MainComponentsEnum.ChatList:
        return <ChatListContainerAux />;
      case MainComponentsEnum.ContactList:
        return <ContactListContainerAux />;
      default:
        return <div>Error</div>;
    }
  };

  return (
    <>
      <MainSection>{mainRenderContainer()}</MainSection>
      <AuxSection> {auxRenderContainer()}</AuxSection>
    </>
  );
};

// another way to get this but using a map
// export const MainPage = (): ReactElement => {
//   // CONTEXT
//   const { state } = useContext(AppContext);
//   // END CONTEXT
//   const mainComponentMap = {
//     [MainComponents.Login]: <LoginContainer />,
//     [MainComponents.Register]: <RegisterContainer />,
//     [MainComponents.UserInfo]: <UserInfoContainer />,
//     [MainComponents.ChatList]: <ChatList />,
//     [MainComponents.ContactList]: <div>Chat</div>,
//   };
//   return (
//     <>
//       <MainSection>
//         {mainComponentMap[state.mainState] || <div>This is an error</div>}
//       </MainSection>
//       <AuxSection>
//         <AuxContainer />
//       </AuxSection>
//     </>
//   );
// };
