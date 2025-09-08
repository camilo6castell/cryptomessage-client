import { ReactElement, useContext } from 'react';
import { MainBar } from '../ui/components/shared/MainBar';
import { Logo } from '../ui/elements/Logo';
import { BarButtons } from '../ui/components/shared/pieces/BarButtons';
import { ContactList } from '../ui/components/contactlist/ContactList';
import { AppContext } from '../core/state/AppContext';
import { useDeleteContact } from '../core/hooks/useDeleteContact';

export const ContactListContainer = (): ReactElement => {
  const { state } = useContext(AppContext);
  const { deleteContact } = useDeleteContact();
  return (
    <>
      <MainBar>
        <Logo />
        <BarButtons />
      </MainBar>
      <ContactList
        contacts={state.user.contacts}
        deleteContact={deleteContact}
      />
    </>
  );
};
