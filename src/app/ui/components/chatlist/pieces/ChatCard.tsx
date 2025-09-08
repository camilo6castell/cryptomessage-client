import { ReactElement, useContext } from 'react';

import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { AppContext } from '../../../../core/state/AppContext';
import { Actions } from '../../../../core/models/enums/Actions.enum';

export const ChatCard = ({ chat }: { chat: IChat }): ReactElement => {
  const { dispatch, state } = useContext(AppContext);
  console.log(state);
  console.log(chat);

  const lastMessageStatusForUser = (): boolean => {
    if (!chat.lastMessage) {
      // No hay último mensaje, se considera como leído por defecto
      return true;
    }

    const isSender = chat.lastMessage.senderId === state.user.userId;

    // Si no es el remitente y el mensaje no ha sido leído, devolver false
    return isSender || chat.lastMessage.isRead;
  };

  return (
    <StyledChatCard
      $isRead={lastMessageStatusForUser()}
      onClick={() =>
        dispatch({ type: Actions.SetMainAuxChat, payload: chat.chatId })
      }
    >
      <Avatar
        username={
          chat.participants[1].contactId! === state.user.userId
            ? chat.participants[0].username!
            : chat.participants[1].username!
        }
        size={50}
        cssSide="5rem"
      />
      <div className="contact-card__details">
        <div className="contact-card__header">
          <span className="contact-card__name">
            {chat.participants[1].contactId! === state.user.userId
              ? chat.participants[0].username!
              : chat.participants[1].username!}
          </span>
          <span className="contact-card__time">10:45 AM</span>
        </div>
        <div className="contact-card__message">
          This is a preview of the last message...
        </div>
      </div>
    </StyledChatCard>
  );
};

const StyledChatCard = styled.div<{ $isRead: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 0.5rem;
  background-color: ${({ $isRead }): string =>
    $isRead ? '#201f1f' : '#a95b5b'};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  .contact-card__image {
    width: 50px;

    border-radius: 50%;
    margin-right: 10px;
    aspect-ratio: 1/1;
  }

  .contact-card__details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .contact-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .contact-card__name {
    font-weight: bold;
    font-size: 16px;
  }

  .contact-card__time {
    font-size: 12px;
    color: #999999;
  }

  .contact-card__message {
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
