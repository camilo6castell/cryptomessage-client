import { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatBubbleMessage } from './ChatBubbleMessage';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { useLoadMessages } from '../../../../core/hooks/useLoadMessages';

export const ChatWindow = ({ chat }: { chat: IChat }): ReactElement => {
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  // 👇 NO uses fallback aquí
  const messages = chat.messages;

  // 🔥 dispara carga (pero no controla render)
  const { loading, error } = useLoadMessages(chat.chatId);

  // 🔥 auto scroll SOLO cuando ya hay mensajes
  useEffect(() => {
    if (!chatWindowRef.current) return;
    if (!messages) return;

    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  /**
   * 🔥 ESTADOS CORRECTOS
   */

  // ⏳ aún no cargados
  if (messages === undefined) {
    return <StyledChatWindow>Cargando mensajes...</StyledChatWindow>;
  }

  // ❌ error (opcional mostrarlo encima de mensajes)
  if (error) {
    return <StyledChatWindow>Error cargando mensajes</StyledChatWindow>;
  }

  // 📭 cargado pero vacío
  if (messages.length === 0) {
    return <StyledChatWindow>No hay mensajes</StyledChatWindow>;
  }

  // 💬 render normal
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
