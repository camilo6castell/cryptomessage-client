// src/app/ui/components/contactlist/pieces/ContactItem.tsx
import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { IContact } from '../../../../core/models/main/IContact.model';
import { AppContext } from '../../../../core/state/AppContext';
import { useCreateChat } from '../../../../core/hooks/useCreateChat';
import { Avatar } from '../../../elements/Avatar';
import { Button } from '../../../elements/Button';
import { ElementStyles } from '../../../../core/models/enums/ElementStyles.enum';
import { Actions } from '../../../../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../../../../core/models/enums/MainComponents.enum';

export const ContactItem = ({
  contact,
  deleteContact,
}: {
  contact: IContact;
  deleteContact: (contact: IContact) => Promise<void>;
}): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const { createChat } = useCreateChat();

  // Buscar chat existente por participant.userId === contact.contactId
  const existingChat = state.user.chats.find(
    (c) => c.participant.userId === contact.contactId,
  );

  return (
    <StyledContactItem>
      <Avatar username={contact.username!} size={40} cssSide="2.5rem" />
      <div className="contact-info">
        <span className="contact-name">{contact.username}</span>
        <div className="contact-actions">
          {existingChat ? (
            <Button
              textButton="Ir al chat"
              style={ElementStyles.Primary}
              onClick={() => {
                dispatch({
                  type: Actions.SetMainAuxChat,
                  payload: existingChat.chatId,
                });
                dispatch({
                  type: Actions.SetMainState,
                  payload: MainComponentsEnum.ChatList,
                });
              }}
            />
          ) : (
            <Button
              textButton="Crear chat"
              style={ElementStyles.Success}
              onClick={() => {
                createChat(contact).catch(console.error);
              }}
            />
          )}
          <Button
            textButton="Eliminar"
            style={ElementStyles.Danger}
            onClick={() => {
              deleteContact(contact).catch(console.error);
            }}
          />
        </div>
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
