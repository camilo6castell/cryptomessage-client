import { ReactElement } from 'react';
import styled from 'styled-components';

import { IMessageForm } from '../../../core/models/ui/IMessageForm.model';
import { IContact } from '../../../core/models/main/IContact.model';

import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { ContactFoundCard } from './pieces/ContactFoundCard';
import { SearchBox } from './pieces/SearchBox';

export const ContactListAux = ({
  form,
  handleInput,
  handleSearch,
  isContact,
  messageForm,
  handleAddContactSubmit,
}: {
  form: Record<string, string>;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  isContact: IContact;
  messageForm: IMessageForm;
  handleAddContactSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}): ReactElement => {
  const isIdle = messageForm.message === null;
  const isError = messageForm.message !== null && messageForm.isDanger;
  const isSuccess = messageForm.message !== null && !messageForm.isDanger;

  const renderContent = () => {
    if (isIdle) {
      return (
        <>
          <h1>¡Busca un contacto!</h1>
          <p>¡Ingresa el nombre de usuario de la persona que deseas buscar!</p>
          <SearchBox
            handleSearchContactSubmit={handleSearch}
            handleInput={handleInput}
            value={form.username}
          />
        </>
      );
    }

    if (isError) {
      return (
        <>
          <h1>{messageForm.message}</h1>
          <p>¡Intenta con otro nombre de usuario!</p>
        </>
      );
    }

    if (isSuccess) {
      // ⚠️ Protección extra
      if (!isContact.username) {
        return <h1>Error: contacto no definido</h1>;
      }

      return (
        <>
          <h1>{messageForm.message}</h1>
          <ContactFoundCard
            isContact={isContact}
            handleAddContactSubmit={handleAddContactSubmit}
          />
        </>
      );
    }

    return <h1>Error inesperado</h1>;
  };

  return <StyledUserInfoAux>{renderContent()}</StyledUserInfoAux>;
};

const StyledUserInfoAux = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  width: ${({ theme }) => theme.general.auxSectionWidth};
  height: 100%;

  padding: 2rem;

  overflow-y: scroll;

  background-color: var(--aux-background-color);

  border: 1px solid #ffff;
  border-radius: 0 0 ${({ theme }) => theme.general.borderRadius} 0;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  overflow: scroll;

  ${mainScrollBar}

  @media (width < 900px) {
    display: none;
  }
`;
