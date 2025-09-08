import { ReactElement, useContext } from 'react';
import { MainBar } from '../ui/components/shared/MainBar';
import { ChatListAux } from '../ui/components/chatlist/ChatListAux';
import { AppContext } from '../core/state/AppContext';

export const ChatListContainerAux = (): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <>
      <MainBar>
        <span> </span>
      </MainBar>
      <ChatListAux
        chatList={state.user.chats}
        chatChosen={state.app.mainAuxChat}
      />
    </>
  );
};
