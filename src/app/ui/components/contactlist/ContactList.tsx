import { ReactElement } from 'react';
import styled from 'styled-components';
import { IContact } from '../../../core/models/main/IContact.model';
import { ContactItem } from './pieces/ContactItem';
import { ContactItemSkeleton } from '../../elements/Skeleton';
import { GenericContainer } from '../../layouts/GenericContainer';
import { darkGlassEffect } from '../../styles/effects/DarkGlassEffect';
import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { EmptyStateIllustration } from '../general/EmptyStateIllustration';
import { fade } from '../../styles/keyframes';

export const ContactList = ({
  contacts,
  loadingContacts,
  error,
  deleteContact,
}: {
  contacts: IContact[];
  loadingContacts: boolean;
  error: string | null;
  deleteContact: (contact: IContact) => Promise<void>;
}): ReactElement => {
  return (
    <StyledContactList>
      <header className="contact-list__header">
        <h1>Contactos</h1>
      </header>

      <div className="contact-list__scroll">
        {loadingContacts ? (
          <SkeletonWrap>
            {Array.from({ length: 5 }).map((_, i) => (
              <ContactItemSkeleton key={i} />
            ))}
          </SkeletonWrap>
        ) : error ? (
          <EmptyState>
            <p className="empty-state__error">Error: {error}</p>
          </EmptyState>
        ) : contacts.length === 0 ? (
          <EmptyState>
            <EmptyStateIllustration type="no-contacts" />
            <p>Aun no tienes contactos</p>
            <span>Busalos por su usuario en el panel de la derecha.</span>
          </EmptyState>
        ) : (
          <div className="list">
            {contacts.map((contact) => (
              <ContactItem
                key={contact.contactId}
                contact={contact}
                deleteContact={deleteContact}
              />
            ))}
          </div>
        )}
      </div>
    </StyledContactList>
  );
};

const StyledContactList = styled(GenericContainer)`
  justify-content: flex-start;
  width: ${({ theme }) => theme.general.mainSectionWidth};
  height: 100%;

  ${darkGlassEffect}
  border-radius: 0;
  border-left: none;

  .contact-list__header {
    width: 100%;
    padding: 1.1rem 1.1rem 0.8rem;
    flex-shrink: 0;

    h1 {
      font-family: ${({ theme }) => theme.font.displayFontFamily};
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      color: ${({ theme }) => theme.surface.textPrimary};
      margin: 0;
    }
  }

  .contact-list__scroll {
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

const SkeletonWrap = styled.div`
  padding: 0.4rem 0.6rem 0.6rem;
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
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  text-align: center;

  animation: ${fade.fadeIn} 0.3s ${({ theme }) => theme.animation.easing.out}
    both;

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    max-width: 15rem;
    opacity: 0.8;
  }

  .empty-state__error {
    color: ${({ theme }) => theme.error.color};
  }
`;
