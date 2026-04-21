import { useContext, useState } from 'react';
import { AppContext } from '../state/AppContext';
import { useHandleInput } from './useHandleInput';

import { contactsApi } from '../api/contacts.api';
import { ApiError } from '../errors/ApiError';

import {
  IMessageForm,
  initialMessageForm,
} from '../models/ui/IMessageForm.model';

import { initialContactSearchForm } from '../models/ui/IContactSearchForm.model';
import { Actions } from '../models/enums/Actions.enum';
import { MessageStatus } from '../models/enums/MessageStatus.enum';

export const useContactSearch = () => {
  const { state, dispatch } = useContext(AppContext);

  // const [contact, setNewContact] = useState<IContact>(initialContact);
  const [message, setMessage] = useState<IMessageForm>(initialMessageForm);
  const [loading, setLoading] = useState(false);

  const { form, handleInput, resetForm } = useHandleInput(
    initialContactSearchForm as unknown as Record<string, string>
  );

  // 🔍 Buscar contacto
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica
    if (!form.username.trim()) {
      setMessage({
        result: MessageStatus.Error,
        isDanger: true,
        message: 'Please enter a username to search',
      });
      return;
    }

    setLoading(true);

    try {
      const data = await contactsApi.search(form.username.trim());

      // Evitar agregarse a sí mismo
      if (data.contactId === state.user.userId) {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'You cannot add yourself',
        });
        return;
      }

      dispatch({
        type: Actions.SetSelectedContact,
        payload: {
          contactId: data.contactId,
          username: data.username,
          publicKey: data.publicKey,
        },
      });

      setMessage({
        result: MessageStatus.Success,
        isDanger: false,
        message: 'The following result was found',
      });

      resetForm();
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'No results found',
        });
      } else {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'Error searching for contact',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ➕ Agregar contacto
  const handleAddContact = async () => {
    if (!state.app.selectedContact?.contactId) {
      setMessage({
        result: MessageStatus.Error,
        isDanger: true,
        message: 'No contact to add',
      });
      return;
    }

    try {
      await contactsApi.add(state.app.selectedContact.contactId);

      dispatch({
        type: Actions.AddContact,
        payload: state.app.selectedContact,
      });

      setMessage({
        result: MessageStatus.Success,
        isDanger: false,
        message: 'Contact added successfully',
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: `Error: ${err.status}`,
        });
        console.error(`Error adding contact: HTTP ${err.status}`, err.data);
      } else {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'Error adding contact',
        });
        console.error('Error adding contact:', err);
      }
    }
  };

  return {
    form,
    handleInput,
    message,
    loading,
    handleSearch,
    handleAddContact,
  };
};
