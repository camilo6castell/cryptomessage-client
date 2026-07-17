import { ReactElement } from 'react';
import styled from 'styled-components';
import { IChat } from '../../../core/models/main/IChat.model';
import { ChatWindow } from './pieces/ChatWindow';
import { ChatWindowInput } from './pieces/ChatWindowInput';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { Avatar } from '../../elements/Avatar';
import { TbLockSquareRounded } from 'react-icons/tb';
import { RiShieldCheckLine, RiTimeLine } from 'react-icons/ri';
import { ChatStatus } from '../../../core/models/enums/ChatStatus.enum';

export const ChatListAux = ({
  selectedChat,
}: {
  selectedChat: IChat | null;
}): ReactElement => {
  if (!selectedChat || selectedChat.chatId === null) {
    return (
      <StyledChatListAux>
        <EmptyState>
          <TbLockSquareRounded size={40} />
          <h1>Selecciona un chat</h1>
          <p>Tus mensajes viajan cifrados de extremo a extremo.</p>
        </EmptyState>
      </StyledChatListAux>
    );
  }

  const otherUsername = selectedChat.participant?.username ?? 'Desconocido';
  const isPending = selectedChat.status === ChatStatus.PENDING;

  return (
    <StyledChatListAux>
      <header className="chat-header">
        <Avatar username={otherUsername} size={38} cssSide="2.4rem" />

        <div className="chat-header__details">
          <span className="chat-header__name">{otherUsername}</span>
          <span className="chat-header__badge">
            {isPending ? (
              <>
                <RiTimeLine size={12} /> Solicitud pendiente
              </>
            ) : (
              <>
                <RiShieldCheckLine size={12} /> Cifrado de extremo a extremo
              </>
            )}
          </span>
        </div>
      </header>

      <ChatWindow chat={selectedChat} />
      <ChatWindowInput chat={selectedChat} />
    </StyledChatListAux>
  );
};

const StyledChatListAux = styled(GenericContainer)`
  justify-content: flex-start;
  width: ${({ theme }) => theme.general.auxSectionWidth};
  height: 100%;

  overflow-y: hidden;

  ${darkGlassEffect}
  border-radius: 0 ${({ theme }) => theme.general.borderRadius}
    ${({ theme }) => theme.general.borderRadius} 0;

  .chat-header {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    flex-shrink: 0;

    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  }

  .chat-header__details {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .chat-header__name {
    font-weight: 700;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.surface.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chat-header__badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.color.success};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.surface.textMuted};
  text-align: center;

  h1 {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({ theme }) => theme.surface.textPrimary};
    margin: 0.25rem 0 0;
  }

  p {
    font-size: 0.85rem;
    max-width: 20rem;
  }
`;
