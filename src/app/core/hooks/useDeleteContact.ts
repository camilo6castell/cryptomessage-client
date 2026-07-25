// src/app/core/hooks/useDeleteContact.ts
import { useContext } from 'react';
import { AppContext } from '../../core/state/AppContext';
import { contactsApi } from '../../core/api/contacts.api';
import { Actions } from '../../core/models/enums/Actions.enum';
import { IContact } from '../../core/models/main/IContact.model';

export const useDeleteContact = (): {
  deleteContact: (contact: IContact) => Promise<void>;
} => {
  const { dispatch } = useContext(AppContext);

  const deleteContact = async (contact: IContact): Promise<void> => {
    try {
      await contactsApi.remove(contact.contactId!);
      dispatch({ type: Actions.DeleteContact, payload: contact.contactId });
    } catch (err) {
      console.error('Error al eliminar contacto:', err);
    }
  };

  return { deleteContact };
};
