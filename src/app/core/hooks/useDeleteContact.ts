import { useContext } from 'react';
import { AppContext } from '../../core/state/AppContext';
import httpService from '../../core/services/general/http.service';
import urls from '../../core/resources/url.resource.ts';
import { Actions } from '../../core/models/enums/Actions.enum.ts';
import { IContact } from '../../core/models/main/IContact.model';

export const useDeleteContact = (): {
  deleteContact: (contact: IContact) => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);

  const deleteContact = async (contact: IContact): Promise<void> => {
    try {
      const response = await httpService.delete(
        `${urls.deleteContact}/${state.user.userId}/contacts/${contact.contactId}`,
      );
      const { status } = response;
      if (status === 204) {
        dispatch({ type: Actions.DeleteContact, payload: contact.contactId });
      } else {
        console.error(`Error al eliminar contacto: ${status}`);
      }
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  };

  return { deleteContact };
};
