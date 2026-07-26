import { ReactElement } from 'react';
import { ContactList } from '../ui/components/contactlist/ContactList';
import { useDeleteContact } from '../core/hooks/useDeleteContact';
import { useLoadContacts } from '../core/hooks/useLoadContacts';
import { useLoadChats } from '../core/hooks/useLoadChats';

export const ContactListContainer = ({
  onSearchNew,
}: {
  onSearchNew?: () => void;
}): ReactElement => {
  const { contacts, loadingContacts, error } = useLoadContacts();
  const { deleteContact } = useDeleteContact();
  void useLoadChats();

  return (
    <ContactList
      contacts={contacts}
      loadingContacts={loadingContacts}
      error={error}
      deleteContact={deleteContact}
      onSearchNew={onSearchNew}
    />
  );
};
