import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { contactsApi } from '../api/contacts.api';
import { mapContact } from '../mappers/loadUser.map';
import { Actions } from '../models/enums/Actions.enum';

export const useLoadContacts = () => {
  const { state, dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const contacts = await contactsApi.list();

      dispatch({
        type: Actions.SetContacts,
        payload: contacts.map(mapContact),
      });
    } catch (err) {
      console.error('Error cargando contactos', err);
      setError('Error cargando contactos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user.contacts.length > 0) return;

    void loadContacts();
  }, [state.user.contacts.length]);

  return {
    contacts: state.user.contacts,
    loadingContacts: loading,
    error,
    loadContacts,
  };
};
