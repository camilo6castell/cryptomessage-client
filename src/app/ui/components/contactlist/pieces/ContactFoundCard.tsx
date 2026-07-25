import { ReactElement } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IContact } from '../../../../core/models/main/IContact.model';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { Button } from '../../../elements/Button';
import { CopyToClipboardButton } from '../../../elements/CopyToClipboardButton';
import { darkGlassEffect } from '../../../styles/effects/DarkGlassEffect';
import { slideUp } from '../../../styles/keyframes';

export const ContactFoundCard = ({
  contact,
  createChat,
  isAlreadyAdded,
}: {
  contact: IContact;
  createChat: (contact: IContact) => Promise<void>;
  isAlreadyAdded: boolean;
}): ReactElement => {
  if (!(contact.username && contact.contactId && contact.publicKey)) {
    return <></>;
  }

  return (
    <StyledContactFoundCard>
      <Avatar username={contact.username} size={64} cssSide="4rem" />

      <div className="info-container">
        <span className="contact-found__name">{contact.username}</span>

        <CopyToClipboardButtonForContactFoundCard
          textToCopy={contact.publicKey}
          textButton="Copiar llave publica"
          variant="secondary"
          isSubmit={false}
        />

        <ButtonForContactFoundCard
          textButton={
            isAlreadyAdded ? 'Ya es tu contacto' : 'Invitar a chatear'
          }
          onClick={() => {
            void createChat(contact);
          }}
          disabled={isAlreadyAdded}
          isSubmit={false}
        />
      </div>
    </StyledContactFoundCard>
  );
};

const StyledContactFoundCard = styled(GenericContainer)`
  flex-direction: row;
  align-items: center;
  gap: 1.1rem;

  height: fit-content;
  width: 100%;
  max-width: 24rem;
  padding: 1.25rem;

  ${darkGlassEffect}

  animation: ${slideUp} 0.25s ${({ theme }) => theme.animation.easing.out} both;

  .info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.55rem;
    width: 100%;
  }

  .contact-found__name {
    font-family: ${({ theme }) => theme.font.displayFontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.surface.textPrimary};
  }
`;

const CopyToClipboardButtonForContactFoundCard = styled(CopyToClipboardButton)`
  margin: 0;
  width: 100%;
`;

const ButtonForContactFoundCard = styled(Button)`
  margin: 0;
  width: 100%;
`;
