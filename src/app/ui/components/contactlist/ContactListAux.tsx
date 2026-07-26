import { ReactElement, useContext } from 'react';
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
import { useMediaQuery } from '../../../core/hooks/useMediaQuery';
import { breakpoints } from '../../styles/maps/breakpoints';
import { AppContext } from '../../../core/state/AppContext';
import { Actions } from '../../../core/models/enums/Actions.enum';
import { RiErrorWarningLine, RiArrowLeftSLine } from 'react-icons/ri';

export const ContactListAux = ({
  form,
  handleInput,
  handleSearch,
  contact,
  message,
  createChat,
  isAlreadyAdded,
  onBack,
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
  onBack?: () => void;
}): ReactElement => {
  const { dispatch } = useContext(AppContext);
  const isMobile = useMediaQuery(breakpoints.mobile);

  const handleBack = (): void => {
    if (onBack) {
      onBack();
    } else {
      dispatch({ type: Actions.SetSelectedContact, payload: null });
    }
  };

  return (
    <StyledContactListAux>
      {isMobile && (
        <div className="contact-search__mobile-header">
          <button
            type="button"
            className="contact-search__back"
            onClick={handleBack}
            aria-label="Volver a la lista de contactos"
          >
            <RiArrowLeftSLine size={22} />
          </button>
          <span className="contact-search__mobile-title">Buscar usuario</span>
        </div>
      )}

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

  @media (${breakpoints.mobile}) {
    width: 100%;
    border-radius: 0;
    padding: 1.5rem 1.25rem;
  }

  .contact-search__mobile-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .contact-search__back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: 0.65rem;
    background-color: transparent;
    color: ${({ theme }) => theme.surface.textMuted};
    cursor: pointer;
    flex-shrink: 0;
    margin-left: -0.4rem;
    transition:
      background-color 0.15s ${({ theme }) => theme.animation.easing.default},
      color 0.15s ${({ theme }) => theme.animation.easing.default};

    &:hover {
      background-color: ${({ theme }) => theme.surface.interactiveHover};
      color: ${({ theme }) => theme.surface.textPrimary};
    }
  }

  .contact-search__mobile-title {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
  }

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
