import { ReactElement } from 'react';
import styled from 'styled-components';
import { IChat } from '../../../core/models/main/IChat.model';
import { ChatWindow } from './pieces/ChatWindow';
import { ChatWindowInput } from './pieces/ChatWindowInput';

export const ChatListAux = ({
  chatList,
  chatChosen,
}: {
  chatList: IChat[];
  chatChosen: number | null;
}): ReactElement => {
  const selectedChat = chatList.find((chat) => chat.chatId === chatChosen);
  return (
    <StyledUserInfoAux>
      {selectedChat ? (
        <>
          <ChatWindow chat={selectedChat} />
          <ChatWindowInput chatId={selectedChat.chatId} />
        </>
      ) : (
        <h1>No hay chats</h1>
      )}
    </StyledUserInfoAux>
  );
};

const StyledUserInfoAux = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: var(--section-under-mainbar);

  overflow-y: hidden;

  background-color: var(--aux-background-color);

  border: 1px solid #ffff;
  border-radius: 0 1rem 0 0;
`;
