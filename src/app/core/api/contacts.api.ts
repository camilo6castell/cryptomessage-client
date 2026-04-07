// src/app/core/api/contacts.api.ts
import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';

const base = `${API_BASE_URL}/api/v1/contacts`;

export interface ContactApiResponse {
    contactId: number;
    username: string;
    publicKey: string;
}

export const contactsApi = {
    list: () =>
        httpClient.get<ContactApiResponse[]>(base),

    search: (username: string) =>
        httpClient.post<ContactApiResponse>(`${base}/search`, { username }),

    add: (contactId: number) =>
        httpClient.post<void>(base, { contactId }),

    remove: (contactId: number) =>
        httpClient.delete<void>(`${base}/${contactId}`),
};