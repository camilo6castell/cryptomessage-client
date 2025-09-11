import { ReactElement } from 'react';
import styled from 'styled-components';
import { ChatCard } from './pieces/ChatCard';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../core/models/main/IChat.model';

export const ChatList = ({ chatList }: { chatList: IChat[] }): ReactElement => {
  return (
    <StyledChatList>
      {chatList.length === 0 ? (
        <p>No hay chats</p>
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

const StyledChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100%;
  height: var(--section-under-mainbar);

  border-radius: 1rem 0 0 0;
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
