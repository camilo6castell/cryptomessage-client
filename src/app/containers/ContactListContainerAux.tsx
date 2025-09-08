import { ReactElement, useContext, useState } from 'react';
import { MainBar } from '../ui/components/shared/MainBar.tsx';
import { ContactListAux } from '../ui/components/contactlist/ContactListAux.tsx';
import { SearchBox } from '../ui/components/contactlist/pieces/SearchBox.tsx';
import { useHandleInput } from '../core/hooks/useHandleInput';
import httpService from '../core/services/general/http.service';
import urls from '../core/resources/url.resource.ts';
import {
  IContact,
  initialContact,
} from '../core/models/main/IContact.model.ts';
import { ElementStyles } from '../core/models/enums/ElementStyles.enum.ts';

import { AppContext } from '../core/state/AppContext.tsx';
import {
  IMessageForm,
  initialMessageForm,
} from '../core/models/ui/IMessageForm.model.ts';
import {
  IContactSearchFormResponse,
  initialContactSearchForm,
} from '../core/models/ui/IContactSearchForm.model.ts';
import { Actions } from '../core/models/enums/Actions.enum.ts';

export const ContactListContainerAux = (): ReactElement => {
  // CONTEXT
  const { state, dispatch } = useContext(AppContext);

  //SEARCH
  const [isContact, setIsContact] = useState<IContact>(initialContact);

  // SEARCH CONTACT FORM
  const { form, handleInput, resetForm } = useHandleInput(
    initialContactSearchForm as unknown as Record<string, string>,
  );

  // MESSAGE FORM
  const [messageForm, setMessageForm] =
    useState<IMessageForm>(initialMessageForm);

  // SEARCH CONTACT HANDLESUBMIT
  const handleSearchContactSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    setIsContact(initialContact);
    setMessageForm(initialMessageForm);
    console.log('form:', form);
    httpService
      .post(urls.searchContact, form)
      .then((response) => {
        console.log(response);
        const { status, data } = response as IContactSearchFormResponse;
        if (status === 200) {
          if (data!.username !== state.user.username) {
            setIsContact(data!);
            setMessageForm({
              style: ElementStyles.Success,
              message: 'Se encontró el siguiente resultado',
            });
          } else {
            setMessageForm({
              style: ElementStyles.Danger,
              message: 'No se encontraron resultados',
            });
          }
        } else if (status === 404) {
          setMessageForm({
            style: ElementStyles.Danger,
            message: 'No se encontraron resultados',
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    resetForm();
  };

  // // ADD CONTACT STATE

  // const [idContact, setIdContact] = useState<number | null>(isContact.contactId);

  // ADD CONTACT HANDLESUBMIT

  const handleAddContactSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    httpService
      .post(urls.addContact, {
        contactId: isContact.contactId,
        appUserId: state.user.userId,
      })
      .then((response) => {
        const { status } = response as IContactSearchFormResponse;
        if (status === 201) {
          dispatch({ type: Actions.AddContact, payload: isContact });
        } else {
          console.log('Error agregado contacto');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // END HANDLESUBMIT
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
