import { ReactElement } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IContact } from '../../../../core/models/main/IContact.model';

export const ContactFoundCard = ({
  isContact,
  handleAddContactSubmit,
}: {
  isContact: IContact;
  handleAddContactSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}): ReactElement => {
  return (
    <StyledContactFoundCard onSubmit={handleAddContactSubmit}>
      <div className="contact-avatar">
        <Avatar username={isContact.username!} size={300} cssSide={'5rem'} />
      </div>
      <input type="hidden" value={isContact.contactId!} />
      <h2>{isContact.username}</h2>
      <p>{isContact.publicKey}</p>
      <button type="submit">Agregar contacto</button>
    </StyledContactFoundCard>
  );
};

const StyledContactFoundCard = styled.form`
  .contact-avatar {
    display: flex;
    width: 300px;
    height: 300px;
  }
`;
