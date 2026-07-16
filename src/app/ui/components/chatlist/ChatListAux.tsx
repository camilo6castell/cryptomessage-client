import { ReactElement } from 'react';
import styled from 'styled-components';
import { IChat } from '../../../core/models/main/IChat.model';
import { ChatWindow } from './pieces/ChatWindow';
import { ChatWindowInput } from './pieces/ChatWindowInput';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { TbLockSquareRounded } from 'react-icons/tb';

export const ChatListAux = ({
  selectedChat,
}: {
  selectedChat: IChat | null;
}): ReactElement => {
  if (!selectedChat || selectedChat.chatId === null) {
    return (
      <StyledUserInfoAux>
        <EmptyState>
          <TbLockSquareRounded size={40} />
          <h1>Selecciona un chat</h1>
          <p>Tus mensajes viajan cifrados de extremo a extremo.</p>
        </EmptyState>
      </StyledUserInfoAux>
    );
  }

  return (
    <StyledUserInfoAux>
      <ChatWindow chat={selectedChat} />
      <ChatWindowInput chat={selectedChat} />
    </StyledUserInfoAux>
  );
};

const StyledUserInfoAux = styled(GenericContainer)`
  width: ${({ theme }) => theme.general.auxSectionWidth};
  height: 100%;

  overflow-y: hidden;

  ${darkGlassEffect}
  border-radius: 0 0 ${({ theme }) => theme.general.borderRadius} 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: 100%;
  color: #8f8f8f;
  text-align: center;

  h1 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #d9faff;
    margin: 0.25rem 0 0;
  }

  p {
    font-size: 0.85rem;
    max-width: 20rem;
  }
`;
