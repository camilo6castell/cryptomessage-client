export interface IContact {
  contactId: number | null;
  username: string | null;
  publicKey: string | null;
}

export const initialContact: IContact = {
  contactId: null,
  username: null,
  publicKey: null,
};
