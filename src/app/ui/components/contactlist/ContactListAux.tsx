import { ReactElement } from 'react';
import styled from 'styled-components';

import { IContact } from '../../../core/models/main/IContact.model';

import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { ContactFoundCard } from './pieces/ContactFoundCard';
import { SearchBox } from './pieces/SearchBox';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { EmptyStateIllustration } from '../general/EmptyStateIllustration';
import { IMessageForm } from '../../../core/models/ui/IMessageForm.model';
import { MessageStatus } from '../../../core/models/enums/MessageStatus.enum';
import { fade } from '../../styles/keyframes';
import { RiErrorWarningLine } from 'react-icons/ri';

export const ContactListAux = ({
  form,
  handleInput,
  handleSearch,
  contact,
  message,
  createChat,
  isAlreadyAdded,
}: {
  form: Record<string, string>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (
    event: React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  contact: IContact | null;
  message: IMessageForm;
  createChat: (contact: IContact) => Promise<void>;
  isAlreadyAdded: boolean;
}): ReactElement => {
  return (
    <StyledContactListAux>
      <div className="contact-search__intro">
        <EmptyStateIllustration type="no-contacts" size={80} />
        <h1>Buscar un usuario</h1>
        <p>
          Encuentra a alguien por su nombre de usuario y enviale una solicitud
          de chat.
        </p>
      </div>

      <SearchBox
        handleSearchContactSubmit={handleSearch}
        handleInput={handleInput}
        value={form.username}
      />

      {message.result === MessageStatus.Error && (
        <div className="contact-search__feedback is-error">
          <RiErrorWarningLine size={16} />
          <span>{message.message}</span>
        </div>
      )}

      {message.result === MessageStatus.Success && contact && (
        <ContactFoundCard
          contact={contact}
          createChat={createChat}
          isAlreadyAdded={isAlreadyAdded}
        />
      )}
    </StyledContactListAux>
  );
};

const StyledContactListAux = styled(GenericContainer)`
  justify-content: flex-start;
  width: ${({ theme }) => theme.general.auxSectionWidth};
  height: 100%;

  padding: 3rem 2.5rem;
  gap: 1.25rem;

  overflow-y: auto;

  ${darkGlassEffect}
  border-radius: 0 ${({ theme }) => theme.general.borderRadius}
    ${({ theme }) => theme.general.borderRadius} 0;

  ${mainScrollBar}

  .contact-search__intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    text-align: center;
    color: ${({ theme }) => theme.surface.textMuted};
    max-width: 24rem;

    animation: ${fade.fadeIn} 0.3s ${({ theme }) => theme.animation.easing.out}
      both;

    h1 {
      font-family: ${({ theme }) => theme.font.displayFontFamily};
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      color: ${({ theme }) => theme.surface.textPrimary};
      margin: 0;
    }

    p {
      font-size: ${({ theme }) => theme.typography.fontSize.base};
      margin: 0;
    }
  }

  .contact-search__feedback {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.error.color};
  }
`;
