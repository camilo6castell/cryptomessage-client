import { ReactElement, useContext, useEffect } from 'react';
import { ContactList } from '../ui/components/contactlist/ContactList';
import { AppContext } from '../core/state/AppContext';
import { useDeleteContact } from '../core/hooks/useDeleteContact';
import { Actions } from '../core/models/enums/Actions.enum';
import { contactsApi } from '../core/api/contacts.api';
import { mapContact } from '../core/mappers/loadUser.map';

export const ContactListContainer = (): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const { deleteContact } = useDeleteContact();

  useEffect(() => {
    if (state.user.contacts.length > 0) return;

    const loadContacts = async () => {
      try {
        const contacts = await contactsApi.list();

        console.log('Contactos cargados:', contacts); // 👈 log para verificar la respuesta

        dispatch({
          type: Actions.SetContacts, // 👈 mejor que múltiples dispatch
          payload: contacts.map(mapContact),
        });
      } catch (err) {
        console.error('Error cargando contactos', err);
      }
    };

    void loadContacts();
  }, [state.user.contacts.length]); // 👈 dependencia correcta

  return (
    <ContactList contacts={state.user.contacts} deleteContact={deleteContact} />
  );
};
