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
import { Actions } from '../models/enums/Actions.enum';
import { MessageStatus } from '../models/enums/MessageStatus.enum';

export const useContactSearch = () => {
  const { state, dispatch } = useContext(AppContext);

  const [contact, setNewContact] = useState<IContact>(initialContact);
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
        message: 'Ingresa un nombre de usuario',
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
          message: 'No puedes agregarte a ti mismo',
        });
        return;
      }

      const newContact: IContact = {
        contactId: data.contactId,
        username: data.username,
        publicKey: data.publicKey,
      };

      setNewContact(newContact);

      setMessage({
        result: MessageStatus.Success,
        isDanger: false,
        message: 'Se encontró el siguiente resultado',
      });

      resetForm();
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'No se encontraron resultados',
        });
      } else {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'Error al buscar contacto',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // ➕ Agregar contacto
  const handleAddContact = async () => {
    if (!contact.contactId) {
      setMessage({
        result: MessageStatus.Error,
        isDanger: true,
        message: 'No hay contacto para agregar',
      });
      return;
    }

    try {
      await contactsApi.add(contact.contactId);

      dispatch({
        type: Actions.AddContact,
        payload: contact,
      });

      setMessage({
        result: MessageStatus.Success,
        isDanger: false,
        message: 'Contacto agregado correctamente',
      });

      setNewContact(initialContact);
    } catch (err) {
      if (err instanceof ApiError) {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: `Error: ${err.status}`,
        });
        console.error(`Error agregando contacto: HTTP ${err.status}`, err.data);
      } else {
        setMessage({
          result: MessageStatus.Error,
          isDanger: true,
          message: 'Error al agregar contacto',
        });
        console.error('Error agregando contacto:', err);
      }
    }
  };

  return {
    form,
    handleInput,
    contact,
    message,
    loading,
    handleSearch,
    handleAddContact,
  };
};
