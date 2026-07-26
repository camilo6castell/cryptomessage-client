import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../app/core/config/api.config';
import {
  findUserByUsername,
  findUserByToken,
  getContactsForUser,
  addContact,
  removeContact,
} from '../data/db';
import { createFakeContact } from '../data/factories';

const base = `${API_BASE_URL}/api/v1/contacts`;

const getCurrentUser = (
  auth: string | null
): { userId: number; username: string } | null => {
  const token = auth?.replace('Bearer ', '');
  if (!token) return null;
  const user = findUserByToken(token);
  if (!user) return null;
  return { userId: user.userId, username: user.username };
};

export const contactsHandlers = [
  http.get(`${base}`, ({ request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(getContactsForUser());
  }),

  http.post(`${base}/search`, async ({ request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { username: string };
    const found = findUserByUsername(body.username);

    if (!found) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (found.username === user.username) {
      return HttpResponse.json(
        { message: 'Cannot add yourself' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      createFakeContact(found.username, found.publicKey)
    );
  }),

  http.post(`${base}`, async ({ request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as { contactId: number };

    const contacts = getContactsForUser();
    const alreadyAdded = contacts.some((c) => c.contactId === body.contactId);

    if (alreadyAdded) {
      return HttpResponse.json(
        { message: 'Contact already added' },
        { status: 409 }
      );
    }

    const contact = createFakeContact(
      `user-${body.contactId}`,
      'mock-public-key'
    );
    contact.contactId = body.contactId;

    addContact(contact);

    return HttpResponse.json(null, { status: 201 });
  }),

  http.delete(`${base}/:contactId`, ({ params, request }) => {
    const user = getCurrentUser(request.headers.get('Authorization'));
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const contactId = Number(params.contactId);
    const removed = removeContact(contactId);

    if (!removed) {
      return HttpResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(null, { status: 200 });
  }),
];
