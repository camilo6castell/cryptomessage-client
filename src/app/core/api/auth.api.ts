import { httpClient } from './http.client';
import { API_BASE_URL } from '../config/api.config';
import { UserResponse } from '../models/auth.model';

const base = `${API_BASE_URL}/api/v1/auth`;

export interface RegisterPayload {
  username: string;
  passphrase: string;
  publicKey: string;
  encryptedPrivateKey: string;
}

export const authApi = {
  /* ================= REGISTER ================= */
  register: (payload: RegisterPayload) =>
    httpClient.post<void>(`${base}/register`, payload),

  /* ================= LOGIN ================= */
  login: (payload: { username: string; passphrase: string }) =>
    httpClient.post<UserResponse>(`${base}/login`, payload),

  /* ================= VERIFY ================= */
  verify: () => httpClient.get<UserResponse>(`${base}/verify`),
};
