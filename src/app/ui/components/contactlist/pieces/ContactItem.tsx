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
            <Button
              textButton="Ir al chat"
              variant="secondary"
              isSubmit={false}
              onClick={handleOpenChat}
            />
          ) : (
            <Button
              textButton="Crear chat"
              variant="secondary"
              isSubmit={false}
              onClick={handleCreateChat}
            />
          )}

          <Button
            textButton="Eliminar"
            variant="danger"
            isSubmit={false}
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
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;

  padding: 0.65rem 0.75rem;
  margin-bottom: 0.4rem;
  border-radius: 0.85rem;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surface.borderSubtle};
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    min-width: 0;
  }

  .contact-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({ theme }) => theme.surface.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .contact-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;

    button {
      padding: 0.35rem 0.8rem;
      font-size: 0.72rem;
    }
  }
`;
