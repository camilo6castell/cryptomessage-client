import { ReactElement, useContext } from 'react';

import { ChatListAux } from '../ui/components/chatlist/ChatListAux';
import { AppContext } from '../core/state/AppContext';

export const ChatListContainerAux = (): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <ChatListAux
      chatList={state.user.chats}
      chatChosen={state.app.mainAuxChat}
    />
  );
};
