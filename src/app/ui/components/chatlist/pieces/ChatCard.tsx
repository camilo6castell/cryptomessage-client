// src/app/ui/components/chatlist/pieces/ChatCard.tsx
import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { AppContext } from '../../../../core/state/AppContext';
import { Actions } from '../../../../core/models/enums/Actions.enum';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { MainComponentsEnum } from '../../../../core/models/enums/MainComponents.enum';

export const ChatCard = ({ chat }: { chat: IChat }): ReactElement => {
  const { dispatch, state } = useContext(AppContext);

  const otherUsername = chat.participant?.username ?? 'Unknown';

  const isUnread =
    chat.lastMessage !== null &&
    chat.lastMessage.senderId !== state.user.userId &&
    !chat.lastMessage.isRead;

  const lastMessagePreview = chat.lastMessage
    ? '🔒 Mensaje cifrado'
    : 'Sin mensajes aún';

  const lastMessageTime = chat.lastMessage?.sentAt
    ? new Date(chat.lastMessage.sentAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const handleSelectChat = () => {
    dispatch({
      type: Actions.SetSelectedChatId,
      payload: chat.chatId,
    });

    dispatch({
      type: Actions.SetMainState,
      payload: MainComponentsEnum.ChatList,
    });
  };

  return (
    <StyledChatCard $isUnread={isUnread} onClick={handleSelectChat}>
      <Avatar username={otherUsername} size={50} cssSide="3rem" />

      <div className="card__details">
        <div className="card__header">
          <span className="card__name">{otherUsername}</span>
          {lastMessageTime && (
            <span className="card__time">{lastMessageTime}</span>
          )}
        </div>

        <div className="card__preview">{lastMessagePreview}</div>

        {chat.status === 'PENDING' && (
          <span className="card__status-badge">Pendiente</span>
        )}
      </div>
    </StyledChatCard>
  );
};

const StyledChatCard = styled(GenericContainer)<{ $isUnread: boolean }>`
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.4rem;
  background-color: ${({ $isUnread }) => ($isUnread ? '#3a1f1f' : '#201f1f')};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a2a2a;
  }

  .card__details {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card__name {
    font-weight: 700;
    font-size: 0.95rem;
  }

  .card__time {
    font-size: 0.7rem;
    color: #999;
    white-space: nowrap;
  }

  .card__preview {
    font-size: 0.82rem;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 0.2rem;
  }

  .card__status-badge {
    font-size: 0.7rem;
    color: var(--warning-color);
    margin-top: 0.2rem;
  }
`;
