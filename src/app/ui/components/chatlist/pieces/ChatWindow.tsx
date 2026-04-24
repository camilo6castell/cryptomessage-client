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

    markAsRead(chat.chatId);
  }, [chat.chatId, messages, state.user.userId]);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    if (!chatWindowRef.current) return;
    if (!messages) return;

    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  /* ================= STATES ================= */

  if (messages === undefined || loading) {
    return <StyledChatWindow>Cargando mensajes...</StyledChatWindow>;
  }

  if (error) {
    return <StyledChatWindow>Error cargando mensajes</StyledChatWindow>;
  }

  if (messages.length === 0) {
    return <StyledChatWindow>No hay mensajes</StyledChatWindow>;
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
  background-color: #1e1e1e;
  padding: 1rem;
  overflow-y: auto;

  ${mainScrollBar}
`;
