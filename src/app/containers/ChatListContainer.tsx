import { ReactElement } from 'react';
import { ChatList } from '../ui/components/chatlist/ChatList';
import { useLoadChats } from '../core/hooks/useLoadChats';

export const ChatListContainer = (): ReactElement => {
  const { chatList, loadingChats, errorLoadingChats } = useLoadChats();
  return (
    <ChatList
      chatList={chatList}
      loadingChats={loadingChats}
      errorLoadingChats={errorLoadingChats}
    />
  );
};
