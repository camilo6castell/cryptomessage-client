import { environment } from '../../../environment/environment';

export default {
  register: `${environment.apiUrl}/api/v1/auth/register`,
  authenticate: `${environment.apiUrl}/api/v1/auth/authenticate`,
  verifyToken: `${environment.apiUrl}/api/v1/auth/verify-token`,
  searchContact: `${environment.apiUrl}/api/v1/contact/search-contact`,
  addContact: `${environment.apiUrl}/api/v1/contact/add-contact`,
  deleteContact: `${environment.apiUrl}/api/v1/contact/delete-contact`,
  createChat: `${environment.apiUrl}/api/v1/chat/create-chat`,
  sendMessage: `${environment.apiUrl}/api/v1/message/send-message`,
  decryptMessage: `${environment.apiUrl}/api/v1/message/decrypt-message`,
};
