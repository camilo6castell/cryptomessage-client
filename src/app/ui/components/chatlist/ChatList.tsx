import { ReactElement, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ChatCard } from './pieces/ChatCard';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { IChat } from '../../../core/models/main/IChat.model';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { TbMessageCircle } from 'react-icons/tb';
import { RiSearchLine } from 'react-icons/ri';

export const ChatList = ({
  chatList,
  loadingChats,
  errorLoadingChats,
}: {
  chatList: IChat[];
  loadingChats: boolean;
  errorLoadingChats: string | null;
}): ReactElement => {
  const [query, setQuery] = useState('');

  const filteredChats = useMemo(() => {
    if (!query.trim()) return chatList;
    const q = query.trim().toLowerCase();
    return chatList.filter((chat) =>
      chat.participant?.username?.toLowerCase().includes(q)
    );
  }, [chatList, query]);

  return (
    <StyledChatList>
      <header className="chat-list__header">
        <h1>Chats</h1>
        <div className="chat-list__search">
          <RiSearchLine size={15} />
          <input
            type="text"
            placeholder="Buscar conversación"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="chat-list__scroll">
        {loadingChats ? (
          <EmptyState>
            <p>Cargando conversaciones...</p>
          </EmptyState>
        ) : errorLoadingChats ? (
          <EmptyState>
            <p className="empty-state__error">Error: {errorLoadingChats}</p>
          </EmptyState>
        ) : chatList.length === 0 ? (
          <EmptyState>
            <TbMessageCircle size={32} />
            <p>Aún no tienes conversaciones</p>
            <span>
              Busca un contacto y empieza una — solo tú y ellos tienen la llave.
            </span>
          </EmptyState>
        ) : filteredChats.length === 0 ? (
          <EmptyState>
            <p>Ningún chat coincide con &ldquo;{query}&rdquo;</p>
          </EmptyState>
        ) : (
          <div className="list">
            {filteredChats.map((chat) => (
              <ChatCard key={chat.chatId} chat={chat} />
            ))}
          </div>
        )}
      </div>
    </StyledChatList>
  );
};

const StyledChatList = styled(GenericContainer)`
  position: relative;
  justify-content: flex-start;
  width: ${({ theme }) => theme.general.mainSectionWidth};
  height: 100%;

  ${darkGlassEffect}
  border-radius: 0;
  border-left: none;

  .chat-list__header {
    width: 100%;
    padding: 1.1rem 1.1rem 0.8rem;
    flex-shrink: 0;

    h1 {
      font-family: ${({ theme }) => theme.font.displayFontFamily};
      font-size: 1.35rem;
      font-weight: 700;
      color: ${({ theme }) => theme.surface.textPrimary};
      margin: 0 0 0.75rem;
    }
  }

  .chat-list__search {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.55rem 0.85rem;
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.surface.surfaceRaised};
    border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
    color: ${({ theme }) => theme.surface.textMuted};

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: ${({ theme }) => theme.surface.textPrimary};
      font-size: 0.85rem;

      &::placeholder {
        color: ${({ theme }) => theme.surface.textMuted};
      }
    }
  }

  .chat-list__scroll {
    position: relative;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    ${mainScrollBar}
  }

  .list {
    padding: 0.4rem 0.6rem 0.6rem;
    width: 100%;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  height: 100%;
  width: 100%;
  padding: 1.5rem;

  color: ${({ theme }) => theme.surface.textMuted};
  font-size: 0.9rem;
  text-align: center;

  span {
    font-size: 0.78rem;
    max-width: 15rem;
    opacity: 0.8;
  }

  .empty-state__error {
    color: ${({ theme }) => theme.error.color};
  }
`;
