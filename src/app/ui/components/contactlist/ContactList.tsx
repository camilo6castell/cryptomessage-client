import { ReactElement } from 'react';
import styled from 'styled-components';
import { IContact } from '../../../core/models/main/IContact.model';
import { ContactItem } from './pieces/ContactItem';
import { GenericContainer } from '../../layouts/GenericContainer';

export const ContactList = ({
  contacts,
  deleteContact,
}: {
  contacts: IContact[];
  deleteContact: (contact: IContact) => Promise<void>;
}): ReactElement => {
  return (
    <StyledContactList>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactItem
            key={contact.contactId}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      ) : (
        <div>No hay contactos</div>
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
