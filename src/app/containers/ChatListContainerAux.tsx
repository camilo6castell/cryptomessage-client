import { ReactElement, useContext } from 'react';
import { ChatListAux } from '../ui/components/chatlist/ChatListAux';
import { AppContext } from '../core/state/AppContext';
import { useLoadMessages } from '../core/hooks/useLoadMessages';

export const ChatListContainerAux = (): ReactElement => {
  const { state } = useContext(AppContext);

  const selectedChat =
    state.user.chats.find((c) => c.chatId === state.app.selectedChatId) ?? null;

  // ✅ SIEMPRE se llama
  useLoadMessages(selectedChat?.chatId ?? null);

  return <ChatListAux selectedChat={selectedChat} />;
};
