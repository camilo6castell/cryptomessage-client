import { authHandlers } from './auth.handlers';
import { chatsHandlers } from './chats.handlers';
import { contactsHandlers } from './contacts.handlers';
import { messagesHandlers } from './messages.handlers';

export const handlers = [
  ...authHandlers,
  ...chatsHandlers,
  ...contactsHandlers,
  ...messagesHandlers,
];
