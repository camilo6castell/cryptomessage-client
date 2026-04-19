import { ReactElement } from 'react';
import styled from 'styled-components';

import { IContact } from '../../../core/models/main/IContact.model';

import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { ContactFoundCard } from './pieces/ContactFoundCard';
import { SearchBox } from './pieces/SearchBox';
import { GenericContainer } from '../../layouts/GenericContainer';
import { IMessageForm } from '../../../core/models/ui/IMessageForm.model';
import { MessageStatus } from '../../../core/models/enums/MessageStatus.enum';
import { H1, P1 } from '../../elements/font';

export const ContactListAux = ({
  form,
  handleInput,
  handleSearch,
  contact,
  message,
  handleAddContact,
  isAlreadyAdded,
}: {
  form: Record<string, string>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  contact: IContact;
  message: IMessageForm;
  handleAddContact: () => void;
  isAlreadyAdded: boolean;
}): ReactElement => {
  return (
    <StyledUserInfoAux>
      {message.result === MessageStatus.Idle && (
        <>
          <H1>Search an user</H1>
          <P1>Here you can search for a user to add as a contact:</P1>
          <SearchBox
            handleSearchContactSubmit={handleSearch}
            handleInput={handleInput}
            value={form.username}
          />
        </>
      )}
      {message.result === MessageStatus.Error && (
        <>
          <H1>Error</H1>
          <P1>{message.message}</P1>
        </>
      )}
      {message.result === MessageStatus.Success && (
        <>
          <H1>Success</H1>
          <P1>{message.message}</P1>
          <ContactFoundCard
            contact={contact}
            handleAddContact={handleAddContact}
            isAlreadyAdded={isAlreadyAdded}
          />
        </>
      )}
    </StyledUserInfoAux>
  );
};

const StyledUserInfoAux = styled(GenericContainer)`
  width: ${({ theme }) => theme.general.auxSectionWidth};

  padding: 2rem;

  overflow-y: scroll;

  background-color: var(--aux-background-color);

  border: 1px solid #ffff;
  border-radius: 0 0 ${({ theme }) => theme.general.borderRadius} 0;

  overflow: scroll;

  ${mainScrollBar}

  @media (width < 900px) {
    display: none;
  }
`;
