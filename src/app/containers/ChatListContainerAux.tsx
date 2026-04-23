import { ReactElement, useContext } from 'react';
import { ChatListAux } from '../ui/components/chatlist/ChatListAux';
import { AppContext } from '../core/state/AppContext';

export const ChatListContainerAux = (): ReactElement => {
  const { state } = useContext(AppContext);

  const selectedChat =
    state.user.chats.find((c) => c.chatId === state.app.selectedChatId) ?? null;

  return <ChatListAux selectedChat={selectedChat} />;
};
