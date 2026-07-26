import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from '../../app/core/config/api.config';
import { findUserByUsername, findUserByToken, addUser } from '../data/db';
import { createFakeUser, getMockPassphrase } from '../data/factories';

const base = `${API_BASE_URL}/api/v1/auth`;

export const authHandlers = [
  http.post(`${base}/register`, async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      passphrase: string;
    };

    const existing = findUserByUsername(body.username);
    if (existing) {
      return HttpResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }

    const user = await createFakeUser(body.username);
    addUser(user);

    return HttpResponse.json(null, { status: 201 });
  }),

  http.post(`${base}/login`, async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      passphrase: string;
    };

    if (body.passphrase !== getMockPassphrase()) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = findUserByUsername(body.username);
    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return HttpResponse.json(user);
  }),

  http.get(`${base}/verify`, ({ request }) => {
    const auth = request.headers.get('Authorization');
    const token = auth?.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = findUserByToken(token);
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(user);
  }),
];
