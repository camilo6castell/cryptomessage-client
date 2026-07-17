// src/app/ui/components/chatlist/pieces/ChatCard.tsx
import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { AppContext } from '../../../../core/state/AppContext';
import { Actions } from '../../../../core/models/enums/Actions.enum';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ChatStatus } from '../../../../core/models/enums/ChatStatus.enum';

export const ChatCard = ({ chat }: { chat: IChat }): ReactElement => {
  const { dispatch, state } = useContext(AppContext);

  const otherUsername = chat.participant?.username ?? 'Unknown';

  const isSelected = state.app.selectedChatId === chat.chatId;

  const isUnread =
    chat.lastMessage !== null &&
    chat.lastMessage.senderId !== state.user.userId &&
    !chat.lastMessage.isRead;

  const lastMessagePreview = chat.lastMessage
    ? 'Mensaje cifrado'
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
  };

  return (
    <StyledChatCard
      $isUnread={isUnread}
      $isSelected={isSelected}
      onClick={handleSelectChat}
    >
      <div className="card__avatar-wrap">
        <Avatar username={otherUsername} size={44} cssSide="2.75rem" />
        {isUnread && <span className="card__unread-dot" />}
      </div>

      <div className="card__details">
        <div className="card__header">
          <span className="card__name">{otherUsername}</span>
          {lastMessageTime && (
            <span className="card__time">{lastMessageTime}</span>
          )}
        </div>

        <div className="card__preview">
          <RiLockPasswordLine size={12} />
          <span>{lastMessagePreview}</span>
        </div>

        {chat.status === ChatStatus.PENDING && (
          <span className="card__status-badge">Pendiente</span>
        )}
      </div>
    </StyledChatCard>
  );
};

const StyledChatCard = styled(GenericContainer)<{
  $isUnread: boolean;
  $isSelected: boolean;
}>`
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  margin-bottom: 0.4rem;

  background-color: ${({ $isSelected }) =>
    $isSelected ? 'rgba(244, 190, 243, 0.1)' : 'transparent'};
  border: 1px solid
    ${({ $isSelected }) =>
      $isSelected ? 'rgba(244, 190, 243, 0.35)' : 'transparent'};
  border-radius: 0.85rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surface.borderSubtle};
  }

  .card__avatar-wrap {
    position: relative;
    flex-shrink: 0;
    width: 2.75rem;
  }

  .card__unread-dot {
    position: absolute;
    top: -1px;
    right: -1px;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.highlight};
    box-shadow: 0 0 6px ${({ theme }) => theme.color.highlight};
    border: 2px solid ${({ theme }) => theme.surface.surface};
  }

  .card__details {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 0.15rem;
  }

  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card__name {
    font-weight: ${({ $isUnread }) => ($isUnread ? 700 : 600)};
    font-size: 0.95rem;
    color: ${({ theme }) => theme.surface.textPrimary};
  }

  .card__time {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.surface.textMuted};
    white-space: nowrap;
  }

  .card__preview {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    font-size: 0.8rem;
    color: ${({ theme }) => theme.surface.textMuted};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card__status-badge {
    align-self: flex-start;
    margin-top: 0.15rem;
    padding: 0.05rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.65rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.warning};
    background-color: rgba(242, 184, 75, 0.12);
  }
`;
