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
import { breakpoints } from '../../../styles/maps/breakpoints';

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

  const handleOpenChat = (): void => {
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

  const handleCreateChat = (): void => {
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

  padding: 0.7rem 0.85rem;
  margin-bottom: 0.35rem;
  border-radius: 0.7rem;
  border: 1px solid ${({ theme }) => theme.surface.borderSubtle};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'};
  cursor: pointer;

  transition:
    background-color 0.15s ${({ theme }) => theme.animation.easing.default},
    box-shadow 0.15s ${({ theme }) => theme.animation.easing.default},
    border-color 0.15s ${({ theme }) => theme.animation.easing.default};

  @media (${breakpoints.mobile}) {
    padding: 0.85rem 0.9rem;
    min-height: 3.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.surface.interactiveHover};
    border-color: ${({ theme }) => theme.color.highlightTint10};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    flex: 1;
    min-width: 0;
  }

  .contact-name {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
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
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
    }
  }
`;
