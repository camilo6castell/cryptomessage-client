import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { IChat } from '../../../core/models/main/IChat.model';
import { ChatWindow } from './pieces/ChatWindow';
import { ChatWindowInput } from './pieces/ChatWindowInput';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { EmptyStateIllustration } from '../general/EmptyStateIllustration';
import { fade } from '../../styles/keyframes';
import { Avatar } from '../../elements/Avatar';
import { useMediaQuery } from '../../../core/hooks/useMediaQuery';
import { breakpoints } from '../../styles/maps/breakpoints';
import { AppContext } from '../../../core/state/AppContext';
import { Actions } from '../../../core/models/enums/Actions.enum';
import {
  RiShieldCheckLine,
  RiTimeLine,
  RiArrowLeftSLine,
} from 'react-icons/ri';
import { ChatStatus } from '../../../core/models/enums/ChatStatus.enum';

export const ChatListAux = ({
  selectedChat,
}: {
  selectedChat: IChat | null;
}): ReactElement => {
  const { dispatch } = useContext(AppContext);
  const isMobile = useMediaQuery(breakpoints.mobile);

  const handleBack = (): void => {
    dispatch({ type: Actions.SetSelectedChatId, payload: null });
  };

  if (!selectedChat || selectedChat.chatId === null) {
    return (
      <StyledChatListAux>
        <EmptyState>
          <EmptyStateIllustration type="select-chat" />
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
        {isMobile && (
          <button
            type="button"
            className="chat-header__back"
            onClick={handleBack}
            aria-label="Volver a la lista de chats"
          >
            <RiArrowLeftSLine size={22} />
          </button>
        )}

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

  @media (${breakpoints.mobile}) {
    width: 100%;
    border-radius: 0;
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    flex-shrink: 0;

    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.surface.borderSubtle};
    background: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(18, 21, 28, 0.60)'
        : 'rgba(255, 255, 255, 0.60)'};
    backdrop-filter: blur(1rem);
  }

  .chat-header__back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: 0.65rem;
    background-color: transparent;
    color: ${({ theme }) => theme.surface.textMuted};
    cursor: pointer;
    flex-shrink: 0;
    margin-left: -0.4rem;
    transition:
      background-color 0.15s ${({ theme }) => theme.animation.easing.default},
      color 0.15s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      background-color: ${({ theme }) => theme.surface.interactiveHover};
      color: ${({ theme }) => theme.surface.textPrimary};
    }
  }

  .chat-header__details {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .chat-header__name {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    color: ${({ theme }) => theme.surface.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chat-header__badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
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

  animation: ${fade.fadeIn} 0.3s ${({ theme }) => theme.animation.easing.out}
    both;

  h1 {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
    margin: 0.25rem 0 0;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    max-width: 20rem;
  }
`;
