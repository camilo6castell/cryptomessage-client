// src/app/containers/ContactListContainerAux.tsx
import { ReactElement, useContext, useState } from 'react';
import { MainBar } from '../ui/components/shared/MainBar.tsx';
import { ContactListAux } from '../ui/components/contactlist/ContactListAux.tsx';
import { SearchBox } from '../ui/components/contactlist/pieces/SearchBox.tsx';
import { useHandleInput } from '../core/hooks/useHandleInput';

import { IContact, initialContact } from '../core/models/main/IContact.model.ts';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';
import { AppContext } from '../core/state/AppContext.tsx';
import { IMessageForm, initialMessageForm } from '../core/models/ui/IMessageForm.model.ts';
import { initialContactSearchForm } from '../core/models/ui/IContactSearchForm.model.ts';
import { Actions } from '../core/models/enums/Actions.enum.ts';
import { ApiError } from '../core/errors/ApiError.ts';
import { contactsApi } from '../core/api/contacts.api.ts';

export const ContactListContainerAux = (): ReactElement => {
  const { state, dispatch } = useContext(AppContext);
  const [isContact, setIsContact] = useState<IContact>(initialContact);
  const [messageForm, setMessageForm] = useState<IMessageForm>(initialMessageForm);
  const { form, handleInput, resetForm } = useHandleInput(
    initialContactSearchForm as unknown as Record<string, string>,
  );

  // ── Buscar contacto ──────────────────────────────────────────
  const handleSearchContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsContact(initialContact);
    setMessageForm(initialMessageForm);

    try {
      const data = await contactsApi.search(form.username);

      if (data.username === state.user.username) {
        setMessageForm({ style: ElementStyles.Danger, message: 'No se encontraron resultados' });
      } else {
        setIsContact({ contactId: data.contactId, username: data.username, publicKey: data.publicKey, addedAt: null });
        setMessageForm({ style: ElementStyles.Success, message: 'Se encontró el siguiente resultado' });
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setMessageForm({ style: ElementStyles.Danger, message: 'No se encontraron resultados' });
      } else {
        setMessageForm({ style: ElementStyles.Danger, message: 'Error al buscar contacto' });
      }
    } finally {
      resetForm();
    }
  };

  // ── Agregar contacto ─────────────────────────────────────────
  const handleAddContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      await contactsApi.add(isContact.contactId!);
      dispatch({ type: Actions.AddContact, payload: isContact });
    } catch (err) {
      if (err instanceof ApiError) {
        console.error(`Error agregando contacto: HTTP ${err.status}`, err.data);
      } else {
        console.error('Error agregando contacto:', err);
      }
    }
  };

  return (
    <>
      <MainBar>
        <SearchBox
          handleSearchContactSubmit={handleSearchContactSubmit}
          handleInput={handleInput}
          value={form.username}
        />
      </MainBar>
      <ContactListAux
        isContact={isContact}
        messageForm={messageForm}
        handleAddContactSubmit={handleAddContactSubmit}
      />
    </>
  );
};