import { ReactElement, useEffect, useRef, useContext, useState } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatBubbleMessage } from './ChatBubbleMessage';
import { MessageBubbleSkeleton } from '../../../elements/Skeleton';
import { ScrollToBottom } from './ScrollToBottom';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { useLoadMessages } from '../../../../core/hooks/useLoadMessages';
import { useMarkAsRead } from '../../../../core/hooks/useMarkAsRead';
import { AppContext } from '../../../../core/state/AppContext';
import { EmptyStateIllustration } from '../../general/EmptyStateIllustration';
import { fade } from '../../../styles/keyframes';

export const ChatWindow = ({ chat }: { chat: IChat }): ReactElement => {
  const { state } = useContext(AppContext);
  const { markAsRead } = useMarkAsRead();
  const { loading, error } = useLoadMessages();

  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const messages = chat.messages;

  const [showScrollButton, setShowScrollButton] = useState(false);

  /* ================= MARK AS READ ================= */

  useEffect(() => {
    if (!chat.chatId) return;
    if (!messages || messages.length === 0) return;

    const myUserId = state.user.userId;

    const hasUnread = messages.some(
      (m) => !m.isRead && m.senderId !== myUserId
    );

    if (!hasUnread) return;

    // Fire-and-forget: local state is already optimistic (SetMessages
    // marks lastMessage as read for the active chat), so we just need
    // to persist the read status on the server.
    markAsRead(chat.chatId).catch(console.error);
  }, [chat.chatId, messages, state.user.userId, markAsRead]);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    if (!chatWindowRef.current) return;
    if (!messages) return;

    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  /* ================= SCROLL DETECTION ================= */

  const handleScroll = (): void => {
    if (!chatWindowRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatWindowRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  const scrollToBottom = (): void => {
    if (!chatWindowRef.current) return;
    chatWindowRef.current.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  /* ================= STATES ================= */

  if (messages === undefined || loading) {
    return (
      <StyledChatWindow>
        <SkeletonWrap>
          {Array.from({ length: 4 }).map((_, i) => (
            <MessageBubbleSkeleton key={i} isSent={i % 2 === 0} />
          ))}
        </SkeletonWrap>
      </StyledChatWindow>
    );
  }

  if (error) {
    return (
      <StyledChatWindow>
        <StateMessage className="is-error">
          Error cargando mensajes
        </StateMessage>
      </StyledChatWindow>
    );
  }

  if (messages.length === 0) {
    return (
      <StyledChatWindow>
        <EmptyStateWrap>
          <EmptyStateIllustration type="no-messages" />
          <StateMessage>
            No hay mensajes todavia. Envia el primero.
          </StateMessage>
        </EmptyStateWrap>
      </StyledChatWindow>
    );
  }

  return (
    <StyledChatWindow ref={chatWindowRef} onScroll={handleScroll}>
      {messages.map((message) => (
        <ChatBubbleMessage key={message.messageId} message={message} />
      ))}
      <ScrollToBottom isVisible={showScrollButton} onClick={scrollToBottom} />
    </StyledChatWindow>
  );
};

const StyledChatWindow = styled(GenericContainer)`
  position: relative;
  justify-content: flex-start;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.02)'};
  padding: 1.25rem;
  overflow-y: auto;

  ${mainScrollBar}
`;

const SkeletonWrap = styled.div`
  width: 100%;
  padding: 0.5rem 0;
`;

const EmptyStateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: ${fade.fadeIn} 0.3s ${({ theme }) => theme.animation.easing.out}
    both;
`;

const StateMessage = styled.p`
  margin: auto;
  color: ${({ theme }) => theme.surface.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &.is-error {
    color: ${({ theme }) => theme.error.color};
  }
`;
