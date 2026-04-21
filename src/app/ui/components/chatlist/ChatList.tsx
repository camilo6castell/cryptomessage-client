import { ReactElement } from 'react';
import styled from 'styled-components';
import { ChatCard } from './pieces/ChatCard';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../core/models/main/IChat.model';
import { GenericContainer } from '../../layouts/GenericContainer';

export const ChatList = ({
  chatList,
  loadingChats,
  errorLoadingChats,
}: {
  chatList: IChat[];
  loadingChats: boolean;
  errorLoadingChats: string | null;
}): ReactElement => {
  return (
    <StyledChatList>
      {loadingChats ? (
        <p>Loading chats...</p>
      ) : errorLoadingChats ? (
        <p>Error: {errorLoadingChats}</p>
      ) : chatList.length === 0 ? (
        <p>No chats available</p>
      ) : (
        <div className="list">
          {chatList.map((chat) => (
            <ChatCard key={chat.chatId} chat={chat} />
          ))}
        </div>
      )}
    </StyledChatList>
  );
};

const StyledChatList = styled(GenericContainer)`
  position: relative;
  width: ${({ theme }) => theme.general.mainSectionWidth};
  height: 100%;

  border-radius: 0 0 0 ${({ theme }) => theme.general.borderRadius};
  border: 1px solid #ffffff;

  overflow-y: scroll;

  .list {
    position: absolute;
    top: 0;

    padding: 0.5rem;

    width: 100%;
    height: fit-content;
  }

  ${mainScrollBar}
`;
