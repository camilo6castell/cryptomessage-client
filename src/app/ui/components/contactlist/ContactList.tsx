import { ReactElement } from 'react';
import styled from 'styled-components';
import { IContact } from '../../../core/models/main/IContact.model';
import { ContactItem } from './pieces/ContactItem';
import { GenericContainer } from '../../layouts/GenericContainer';

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
      {loadingContacts ? (
        <p>Loading contacts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        contacts.map((contact) => (
          <ContactItem
            key={contact.contactId}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      )}
    </StyledContactList>
  );
};

const StyledContactList = styled(GenericContainer)`
  justify-content: flex-start;
  width: ${({ theme }) => theme.general.mainSectionWidth};

  border-radius: 0 0 0 ${({ theme }) => theme.general.borderRadius};
  border: 1px solid #ffffff;
`;
