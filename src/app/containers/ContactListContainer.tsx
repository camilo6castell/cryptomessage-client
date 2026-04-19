import { ReactElement } from 'react';
import { ContactList } from '../ui/components/contactlist/ContactList';
import { useDeleteContact } from '../core/hooks/useDeleteContact';
import { useContacts } from '../core/hooks/useLoadContacts';

export const ContactListContainer = (): ReactElement => {
  const { contacts, loading, error } = useContacts();
  const { deleteContact } = useDeleteContact();

  if (loading) return <div>Cargando contactos...</div>;
  if (error) return <div>{error}</div>;

  return <ContactList contacts={contacts} deleteContact={deleteContact} />;
};
