import { ReactElement } from 'react';
import styled from 'styled-components';
import { ChatCard } from './pieces/ChatCard';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../core/models/main/IChat.model';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { TbMessageCircle } from 'react-icons/tb';

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
        <EmptyState>
          <p>Cargando conversaciones...</p>
        </EmptyState>
      ) : errorLoadingChats ? (
        <EmptyState>
          <p className="empty-state__error">Error: {errorLoadingChats}</p>
        </EmptyState>
      ) : chatList.length === 0 ? (
        <EmptyState>
          <TbMessageCircle size={32} />
          <p>Aún no tienes conversaciones</p>
        </EmptyState>
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

  ${darkGlassEffect}
  border-radius: 0 0 0 ${({ theme }) => theme.general.borderRadius};

  overflow-y: scroll;

  .list {
    position: absolute;
    top: 0;

    padding: 0.6rem;

    width: 100%;
    height: fit-content;
  }

  ${mainScrollBar}
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  height: 100%;
  width: 100%;
  padding: 1.5rem;

  color: #9b9b9b;
  font-size: 0.9rem;
  text-align: center;

  .empty-state__error {
    color: ${({ theme }) => theme.error.color};
  }
`;
