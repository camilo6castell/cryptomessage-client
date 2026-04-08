import { environment } from '../../../environment/environment';

const base = environment.apiUrl;

export default {
  auth: {
    register: `${base}/api/v1/auth/register`,
    login: `${base}/api/v1/auth/login`,
    verify: `${base}/api/v1/auth/verify`,
  },
  contacts: {
    search: `${base}/api/v1/contacts/search`,
    list: `${base}/api/v1/contacts`,
    add: `${base}/api/v1/contacts`,
    remove: (contactId: number) => `${base}/api/v1/contacts/${contactId}`,
  },
  chats: {
    create: `${base}/api/v1/chats`,
    list: `${base}/api/v1/chats`,
    accept: (chatId: number) => `${base}/api/v1/chats/${chatId}/accept`,
    block: (chatId: number) => `${base}/api/v1/chats/${chatId}/block`,
  },
  messages: {
    send: `${base}/api/v1/messages`,
    byChat: (chatId: number) => `${base}/api/v1/messages/chat/${chatId}`,
  },
};
