import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { IContact } from '../../../../core/models/main/IContact.model';
import { AppContext } from '../../../../core/state/AppContext';
import { useCreateChat } from '../../../../core/hooks/useCreateChat';
import { Avatar } from '../../../elements/Avatar';
import { Button } from '../../../elements/Button';
import { ElementStyles } from '../../../../core/models/enums/ElementStyles.enum';

export const ContactItem = ({
  contact,
  deleteContact,
}: {
  contact: IContact;
  deleteContact: (contact: IContact) => Promise<void>;
}): ReactElement => {
  const { state } = useContext(AppContext);
  const { createChat } = useCreateChat();
  return (
    <StyledContactItem>
      <Avatar username={contact.username!} size={30} cssSide="2rem" />
      <div className="contact-info">
        <span className="contact-name">{contact.username!}</span>

        {state.user.chats.find((c) => c.participants.includes(contact)) ? (
          <Button
            textButton="Ir a chat"
            style={ElementStyles.Primary}
            onClick={() => {}}
          />
        ) : (
          <Button
            textButton="Crear chat"
            style={ElementStyles.Success}
            onClick={() => {
              createChat(contact)
                .then(() => {})
                .catch(() => {});
            }}
          />
        )}

        <Button
          textButton="Eliminar contacto"
          style={ElementStyles.Danger}
          onClick={() => {
            deleteContact(contact)
              .then(() => {})
              .catch(() => {});
          }}
        />
      </div>
    </StyledContactItem>
  );
};

const StyledContactItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #3b3b3b;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  .contact-img {
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;

    aspect-ratio: 1/1;
  }

  .contact-info {
    display: flex;
  }

  .contact-name {
    font-size: 16px;
    color: #e0e0e0;
  }

  .contact-status {
    font-size: 12px;
    color: #b3b3b3;
  }
`;
