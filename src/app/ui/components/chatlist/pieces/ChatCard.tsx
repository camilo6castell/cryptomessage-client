// src/app/ui/components/chatlist/pieces/ChatCard.tsx
import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { AppContext } from '../../../../core/state/AppContext';
import { Actions } from '../../../../core/models/enums/Actions.enum';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { breakpoints } from '../../../styles/maps/breakpoints';
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
    ? 'Encrypted message'
    : 'No messages yet';

  const lastMessageTime = chat.lastMessage?.sentAt
    ? new Date(chat.lastMessage.sentAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const handleSelectChat = (): void => {
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
          <span className="card__status-badge">Pending</span>
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

  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.highlightTint10 : 'transparent'};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.color.highlightTint30 : 'transparent'};
  border-radius: 0.85rem;
  cursor: pointer;
  transition:
    background-color 0.15s ${({ theme }) => theme.animation.easing.default},
    border-color 0.15s ${({ theme }) => theme.animation.easing.default},
    box-shadow 0.15s ${({ theme }) => theme.animation.easing.default},
    transform 0.1s ease;

  @media (${breakpoints.mobile}) {
    padding: 0.75rem 0.85rem;
    min-height: 3.5rem;
  }

  &:hover {
    background-color: ${({ $isSelected, theme }) =>
      $isSelected
        ? theme.color.highlightTint14
        : theme.surface.interactiveHover};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  &:active {
    transform: scale(0.99);
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
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: ${({ theme }) => theme.surface.textPrimary};
  }

  .card__time {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.surface.textMuted};
    white-space: nowrap;
  }

  .card__preview {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    font-size: ${({ theme }) => theme.typography.fontSize.sm};
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
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.color.warning};
    background-color: ${({ theme }) => theme.color.warningTint12};
  }
`;
