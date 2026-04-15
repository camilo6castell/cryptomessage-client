import { ReactElement, useContext } from 'react';
import { ChatList } from '../ui/components/chatlist/ChatList';
import { AppContext } from '../core/state/AppContext';

export const ChatListContainer = (): ReactElement => {
  const { state } = useContext(AppContext);
  return <ChatList chatList={state.user.chats} />;
};
