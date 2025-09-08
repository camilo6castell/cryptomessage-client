import { ReactElement, useContext } from 'react';
import { MainBar } from '../ui/components/shared/MainBar';
import { Logo } from '../ui/elements/Logo';
import { BarButtons } from '../ui/components/shared/pieces/BarButtons';
import { ChatList } from '../ui/components/chatlist/ChatList';
import { AppContext } from '../core/state/AppContext';

export const ChatListContainer = (): ReactElement => {
  const { state } = useContext(AppContext);
  return (
    <>
      <MainBar>
        <Logo />
        <BarButtons />
      </MainBar>
      <ChatList chatList={state.user.chats} />
    </>
  );
};
