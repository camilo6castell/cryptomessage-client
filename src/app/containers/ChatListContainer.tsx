import { ReactElement } from 'react';
import { ChatList } from '../ui/components/chatlist/ChatList';
import { useLoadChats } from '../core/hooks/useLoadChats';
import { useLoadMessages } from '../core/hooks/useLoadMessages';

export const ChatListContainer = (): ReactElement => {
  const { chatList, loadingChats, errorLoadingChats } = useLoadChats();
  const {} = useLoadMessages();
  return (
    <ChatList
      chatList={chatList}
      loadingChats={loadingChats}
      errorLoadingChats={errorLoadingChats}
    />
  );
};
