import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';
import { VerifyApiResponse, LoginApiResponse } from '../models/auth.model';

const base = `${API_BASE_URL}/api/v1/auth`;

export const authApi = {
  register: (payload: { username: string; passphrase: string }) =>
    httpClient.post<void>(`${base}/register`, payload),

  login: (payload: { username: string; passphrase: string }) =>
    httpClient.post<LoginApiResponse>(`${base}/login`, payload),

  verify: () => httpClient.get<VerifyApiResponse>(`${base}/verify`),
};
