// src/app/containers/ContactListContainerAux.tsx
import { ReactElement } from 'react';
import { ContactListAux } from '../ui/components/contactlist/ContactListAux.tsx';
import { useContactSearch } from '../core/hooks/useContactSearch.ts';

export const ContactListContainerAux = (): ReactElement => {
  const {
    contact,
    message,
    handleAddContact,
    form,
    handleInput,
    handleSearch,
  } = useContactSearch();

  return (
    <ContactListAux
      isContact={contact}
      messageForm={message}
      handleAddContactSubmit={handleAddContact}
      form={form}
      handleInput={handleInput}
      handleSearch={handleSearch}
    />
  );
};
