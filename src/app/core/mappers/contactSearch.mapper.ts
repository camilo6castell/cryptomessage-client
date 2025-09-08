import { IContact } from '../models/main/IContact.model';

export default {
  // toApi: (contact: Contact) => {
  //   return {
  //     username: contact.username,
  //     publicKey: contact.publicKey,
  //   };
  // },
  toModel: (contact: {
    id: number;
    username: string;
    publicKey: string;
    addedAt: string;
  }): IContact => {
    return {
      contactId: contact.id,
      username: contact.username,
      publicKey: contact.publicKey,
      addedAt: contact.addedAt,
    };
  },
};
