import { ReactElement } from 'react';
import styled from 'styled-components';
import { Avatar } from '../../../elements/Avatar';
import { IContact } from '../../../../core/models/main/IContact.model';
import { GenericContainer } from '../../../layouts/GenericContainer';
import { H2, P1 } from '../../../elements/font';
import { Button } from '../../../elements/Button';
import { mainScrollBar } from '../../../styles/scrollbar/mainScrollBar';
import { CopyToClipboardButton } from '../../../elements/CopyToClipboardButton';

export const ContactFoundCard = ({
  contact,
  handleAddContact,
  isAlreadyAdded,
}: {
  contact: IContact;
  handleAddContact: () => void;
  isAlreadyAdded: boolean;
}): ReactElement => {
  return (
    <StyledContactFoundCard>
      {contact.username && contact.contactId && contact.publicKey && (
        <>
          <div className="contact-avatar">
            <Avatar username={contact.username} size={300} cssSide={'5rem'} />
          </div>

          <div className="info-container">
            <H2>{contact.username}</H2>
            <CopyToClipboardButtonForContactFoundCard
              textToCopy={contact.publicKey}
              textButton="Copy public key"
            />

            <ButtonForContactFoundCard
              textButton={isAlreadyAdded ? 'Already a contact' : 'Add contact'}
              onClick={handleAddContact}
              disabled={isAlreadyAdded}
            />
          </div>
        </>
      )}
    </StyledContactFoundCard>
  );
};

const StyledContactFoundCard = styled(GenericContainer)`
  height: fit-content;
  flex-direction: row;
  border: 1px solid #ffffff;

  .contact-avatar {
    display: flex;
    width: 5rem;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    padding: 1rem;
  }
`;

const StyledP1 = styled(P1)`
  width: 100%;
  height: 4rem;
  overflow: scroll;
  ${mainScrollBar};
`;

const CopyToClipboardButtonForContactFoundCard = styled(CopyToClipboardButton)`
  margin: 0;
`;

const ButtonForContactFoundCard = styled(Button)`
  margin: 0;
`;
