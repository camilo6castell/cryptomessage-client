import { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { contactsApi } from '../api/contacts.api';
import { mapContact } from '../mappers/loadUser.map';
import { Actions } from '../models/enums/Actions.enum';
import { IContact } from '../models/main/IContact.model';

export const useLoadContacts = (): {
  contacts: IContact[];
  loadingContacts: boolean;
  error: string | null;
  loadContacts: () => Promise<void>;
} => {
  const { state, dispatch } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContacts = useCallback(async (): Promise<void> => {
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
  }, [dispatch]);

  useEffect(() => {
    if (state.user.contacts.length > 0) return;

    void loadContacts();
  }, [state.user.contacts.length, loadContacts]);

  return {
    contacts: state.user.contacts,
    loadingContacts: loading,
    error,
    loadContacts,
  };
};
