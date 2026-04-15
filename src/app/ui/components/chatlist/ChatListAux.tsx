import { ReactElement } from 'react';
import styled from 'styled-components';
import { IChat } from '../../../core/models/main/IChat.model';
import { ChatWindow } from './pieces/ChatWindow';
import { ChatWindowInput } from './pieces/ChatWindowInput';
import { GenericContainer } from '../../layouts/GenericContainer';

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

const StyledUserInfoAux = styled(GenericContainer)`
  width: ${({ theme }) => theme.general.auxSectionWidth};
  height: 100%;

  overflow-y: hidden;

  border: 1px solid #ffff;
  border-radius: 0 0 ${({ theme }) => theme.general.borderRadius} 0;
`;
