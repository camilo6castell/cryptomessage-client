import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { IContact } from '../../../../core/models/main/IContact.model';
import { AppContext } from '../../../../core/state/AppContext';
import { useCreateChat } from '../../../../core/hooks/useCreateChat';
import { Avatar } from '../../../elements/Avatar';
import { Button } from '../../../elements/Button';
import { Actions } from '../../../../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../../../../core/models/enums/MainComponents.enum';
import { GenericContainer } from '../../../layouts/GenericContainer';

export const ContactItem = ({
  contact,
  deleteContact,
}: {
  contact: IContact;
  deleteContact: (contact: IContact) => Promise<void>;
}): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const { createChat } = useCreateChat();

  // ✅ usar chats del estado global
  const existingChat = state.user.chats.find(
    (c) => c.participant?.userId === contact.contactId
  );

  const handleOpenChat = () => {
    if (!existingChat) return;

    dispatch({
      type: Actions.SetSelectedChatId,
      payload: existingChat.chatId,
    });

    dispatch({
      type: Actions.SetMainState,
      payload: MainComponentsEnum.ChatList,
    });
  };

  const handleCreateChat = () => {
    createChat(contact).catch(console.error);
  };

  return (
    <StyledContactItem>
      <Avatar username={contact.username!} size={40} cssSide="2.5rem" />

      <div className="contact-info">
        <span className="contact-name">{contact.username}</span>

        <div className="contact-actions">
          {existingChat ? (
            <Button textButton="Ir al chat" onClick={handleOpenChat} />
          ) : (
            <Button textButton="Crear chat" onClick={handleCreateChat} />
          )}

          <Button
            textButton="Eliminar"
            onClick={() => {
              deleteContact(contact).catch(console.error);
            }}
          />
        </div>
      </div>
    </StyledContactItem>
  );
};

const StyledContactItem = styled(GenericContainer)`
  padding: 10px;
  border-bottom: 1px solid #3b3b3b;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;
  }

  .contact-name {
    font-size: 16px;
    color: #e0e0e0;
    margin-bottom: 5px;
  }

  .contact-actions {
    display: flex;
    gap: 0.5rem;
  }
`;
