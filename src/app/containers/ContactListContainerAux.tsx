import { ReactElement, useContext } from 'react';
import { ContactListAux } from '../ui/components/contactlist/ContactListAux';
import { useContactSearch } from '../core/hooks/useContactSearch';
import { AppContext } from '../core/state/AppContext';

// type ViewState = 'idle' | 'error' | 'success';

export const ContactListContainerAux = (): ReactElement => {
  const { state } = useContext(AppContext);

  const {
    contact,
    message,
    handleAddContact,
    form,
    handleInput,
    handleSearch,
  } = useContactSearch();

  // let viewState: ViewState = 'idle';

  // if (message.message !== null) {
  //   viewState = message.isDanger ? 'error' : 'success';
  // }

  const isAlreadyAdded = state.user.contacts.some(
    (c) => c.contactId === contact.contactId
  );

  return (
    <ContactListAux
      message={message}
      contact={contact}
      form={form}
      handleInput={handleInput}
      handleSearch={handleSearch}
      handleAddContact={handleAddContact}
      isAlreadyAdded={isAlreadyAdded}
    />
  );
};
