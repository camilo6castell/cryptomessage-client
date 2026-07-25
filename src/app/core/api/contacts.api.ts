import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';

const base = `${API_BASE_URL}/api/v1/contacts`;

export interface ContactApiResponse {
  contactId: number;
  username: string;
  publicKey: string;
}

export const contactsApi = {
  list: (): Promise<ContactApiResponse[]> =>
    httpClient.get<ContactApiResponse[]>(base),

  search: (username: string): Promise<ContactApiResponse> =>
    httpClient.post<ContactApiResponse>(`${base}/search`, { username }),

  add: (contactId: number): Promise<void> =>
    httpClient.post<void>(base, { contactId }),

  remove: (contactId: number): Promise<void> =>
    httpClient.delete<void>(`${base}/${contactId}`),
};
