import { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatBubbleMessage } from './ChatBubbleMessage';
import { GenericContainer } from '../../../layouts/GenericContainer';

export const ChatWindow = ({ chat }: { chat: IChat }): ReactElement => {
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const messages = chat.messages ?? []; // 👈 clave

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  if (chat.messages === null) {
    return <StyledChatWindow>Loading...</StyledChatWindow>;
  }

  if (chat.messages.length === 0) {
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
