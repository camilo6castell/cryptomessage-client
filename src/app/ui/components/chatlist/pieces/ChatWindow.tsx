import { ReactElement, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatBubbleMessage } from './ChatBubbleMessage';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { useLoadMessages } from '../../../../core/hooks/useLoadMessages';
import { useMarkAsRead } from '../../../../core/hooks/useMarkAsRead';
import { AppContext } from '../../../../core/state/AppContext';

export const ChatWindow = ({ chat }: { chat: IChat }): ReactElement => {
  const { state } = useContext(AppContext);
  const { markAsRead } = useMarkAsRead();
  const { loading, error } = useLoadMessages();

  const chatWindowRef = useRef<HTMLDivElement | null>(null);
  const messages = chat.messages;

  /* ================= MARK AS READ ================= */

  useEffect(() => {
    if (!chat.chatId) return;
    if (!messages || messages.length === 0) return;

    const myUserId = state.user.userId;

    const hasUnread = messages.some(
      (m) => !m.isRead && m.senderId !== myUserId
    );

    if (!hasUnread) return;

    void markAsRead(chat.chatId);
  }, [chat.chatId, messages, state.user.userId]);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    if (!chatWindowRef.current) return;
    if (!messages) return;

    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  /* ================= STATES ================= */

  if (messages === undefined || loading) {
    return (
      <StyledChatWindow>
        <StateMessage>Cargando mensajes...</StateMessage>
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
        <StateMessage>No hay mensajes todavía. Envía el primero.</StateMessage>
      </StyledChatWindow>
    );
  }

  return (
    <StyledChatWindow ref={chatWindowRef}>
      {messages.map((message) => (
        <ChatBubbleMessage key={message.messageId} message={message} />
      ))}
    </StyledChatWindow>
  );
};

const StyledChatWindow = styled(GenericContainer)`
  justify-content: flex-start;
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.02)'};
  padding: 1.25rem;
  overflow-y: auto;

  ${mainScrollBar}
`;

const StateMessage = styled.p`
  margin: auto;
  color: ${({ theme }) => theme.surface.textMuted};
  font-size: 0.9rem;

  &.is-error {
    color: ${({ theme }) => theme.error.color};
  }
`;
