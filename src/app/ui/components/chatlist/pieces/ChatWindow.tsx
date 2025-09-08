import { ReactElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../../core/models/main/IChat.model';
import { ChatBubbleMessage } from './ChatBubbleMessage';

export const ChatWindow = ({ chat }: { chat: IChat }): ReactElement => {
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  // Scroll automático hacia abajo
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chat?.messages]); // Se actualiza cuando cambian los mensajes
  return (
    <StyledChatWindow ref={chatWindowRef}>
      {chat === null ? (
        <h1>Cargando</h1>
      ) : (
        chat.messages.map((message) => (
          <ChatBubbleMessage key={message.messageId} message={message} />
        ))
      )}
    </StyledChatWindow>
  );
};

const StyledChatWindow = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background-color: #1e1e1e;
  padding: 1rem;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  ${mainScrollBar}
`;
