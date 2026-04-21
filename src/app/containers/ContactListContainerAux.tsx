import { ReactElement, useContext } from 'react';
import { ContactListAux } from '../ui/components/contactlist/ContactListAux';
import { useContactSearch } from '../core/hooks/useContactSearch';
import { AppContext } from '../core/state/AppContext';

export const ContactListContainerAux = (): ReactElement => {
  const { state } = useContext(AppContext);

  const { message, handleAddContact, form, handleInput, handleSearch } =
    useContactSearch();

  const isAlreadyAdded = state.user.contacts.some(
    (c) => c.contactId === state.app.selectedContact?.contactId
  );

  return (
    <ContactListAux
      message={message}
      contact={state.app.selectedContact}
      form={form}
      handleInput={handleInput}
      handleSearch={handleSearch}
      handleAddContact={handleAddContact}
      isAlreadyAdded={isAlreadyAdded}
    />
  );
};
