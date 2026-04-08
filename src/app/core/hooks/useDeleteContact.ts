// src/app/core/hooks/useDeleteContact.ts
import { useContext } from 'react';
import { AppContext } from '../../core/state/AppContext';
import { httpClient } from '../../core/api/http.client';
import urls from '../../core/resources/url.resource.ts';
import { Actions } from '../../core/models/enums/Actions.enum.ts';
import { IContact } from '../../core/models/main/IContact.model';

export const useDeleteContact = (): {
  deleteContact: (contact: IContact) => Promise<void>;
} => {
  const { dispatch } = useContext(AppContext);
  // userId ya no se necesita — el backend lo extrae del JWT

  const deleteContact = async (contact: IContact): Promise<void> => {
    try {
      await httpClient.delete<void>(urls.contacts.remove(contact.contactId!));
      dispatch({ type: Actions.DeleteContact, payload: contact.contactId });
    } catch (err) {
      console.error('Error al eliminar contacto:', err);
    }
  };

  return { deleteContact };
};
