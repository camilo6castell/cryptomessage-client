import { useContext, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { useHandleInput } from './useHandleInput';

import { contactsApi } from '../api/contacts.api';
import { ApiError } from '../errors/ApiError';

import { IContact, initialContact } from '../models/main/IContact.model';

import {
  IMessageForm,
  initialMessageForm,
} from '../models/ui/IMessageForm.model';

import { initialContactSearchForm } from '../models/ui/IContactSearchForm.model';
import { ElementStyles } from '../models/enums/ElementStyles.enum';
import { Actions } from '../models/enums/Actions.enum';

export const useContactSearch = () => {
  const { state, dispatch } = useContext(AppContext);

  const [contact, setContact] = useState<IContact>(initialContact);
  const [message, setMessage] = useState<IMessageForm>(initialMessageForm);

  const { form, handleInput, resetForm } = useHandleInput(
    initialContactSearchForm as unknown as Record<string, string>
  );

  // 🔍 Buscar contacto
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setContact(initialContact);
    setMessage(initialMessageForm);

    try {
      const data = await contactsApi.search(form.username);

      if (data.username === state.user.username) {
        setMessage({
          style: ElementStyles.Danger,
          message: 'No se encontraron resultados',
        });
        return;
      }

      const newContact: IContact = {
        contactId: data.contactId,
        username: data.username,
        publicKey: data.publicKey,
        addedAt: null,
      };

      setContact(newContact);

      setMessage({
        style: ElementStyles.Success,
        message: 'Se encontró el siguiente resultado',
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setMessage({
          style: ElementStyles.Danger,
          message: 'No se encontraron resultados',
        });
      } else {
        setMessage({
          style: ElementStyles.Danger,
          message: 'Error al buscar contacto',
        });
      }
    } finally {
      resetForm();
    }
  };

  // ➕ Agregar contacto
  const handleAddContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!contact.contactId) return;
      await contactsApi.add(contact.contactId);

      dispatch({
        type: Actions.AddContact,
        payload: contact,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(`Error agregando contacto: HTTP ${err.status}`, err.data);
      } else {
        console.error('Error agregando contacto:', err);
      }
    }
  };

  return {
    form,
    handleInput,
    contact,
    message,
    handleSearch,
    handleAddContact,
  };
};
