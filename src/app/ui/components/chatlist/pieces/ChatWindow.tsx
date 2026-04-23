import { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatBubbleMessage } from './ChatBubbleMessage';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { useLoadMessages } from '../../../../core/hooks/useLoadMessages';

export const ChatWindow = ({ chat }: { chat: IChat }): ReactElement => {
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const { loading, error, loadMessages } = useLoadMessages();

  const messages = chat.messages;

  // 🔥 CLAVE: recargar cuando cambia el chat
  useEffect(() => {
    if (!chat.chatId) return;

    loadMessages();
  }, [chat.chatId]);

  // 🔥 auto scroll
  useEffect(() => {
    if (!chatWindowRef.current) return;
    if (!messages) return;

    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  // ⏳
  if (messages === undefined || loading) {
    return <StyledChatWindow>Cargando mensajes...</StyledChatWindow>;
  }

  // ❌
  if (error) {
    return <StyledChatWindow>Error cargando mensajes</StyledChatWindow>;
  }

  // 📭
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
