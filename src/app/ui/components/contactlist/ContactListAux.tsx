import { ReactElement } from 'react';
import styled from 'styled-components';

import { IMessageForm } from '../../../core/models/ui/IMessageForm.model';

import { mainScrollBar } from '../../styles/scrollbar/mainScrollBar';
import { ElementStyles } from '../../../core/models/enums/ElementStyles.enum';
import { ContactFoundCard } from './pieces/ContactFoundCard';
import { IContact } from '../../../core/models/main/IContact.model';

export const ContactListAux = ({
  isContact,
  messageForm,
  handleAddContactSubmit,
}: {
  isContact: IContact;
  messageForm: IMessageForm;
  handleAddContactSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}): ReactElement => {
  const contentRenderer = (): ReactElement => {
    switch (messageForm.style) {
      case null:
        return (
          <>
            <h1>¡Busca un contacto!</h1>
            <p>
              ¡Ingresa el nombre de usuario de la persona que deseas buscar!
            </p>
          </>
        );
      case ElementStyles.Success: {
        if (!isContact.username) {
          return <h1>Error en el sistema, debería haber Contact</h1>;
        }
        return (
          <>
            <h1>¡Se encontró el siguiente resultado!</h1>
            <ContactFoundCard
              isContact={isContact}
              handleAddContactSubmit={handleAddContactSubmit}
            />
          </>
        );
      }
      case ElementStyles.Danger: {
        return (
          <>
            <h1>No se encontraron resultados.</h1>
            <p>¡Intenta con otro nombre de usuario!</p>
          </>
        );
      }

      default:
        return <h1>Error en el sistema</h1>;
    }
  };
  return <StyledUserInfoAux>{contentRenderer()}</StyledUserInfoAux>;
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
