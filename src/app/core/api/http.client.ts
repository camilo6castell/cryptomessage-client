import { StorageService } from '../services/storage.service';
import { ApiError } from '../errors/ApiError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ForbiddenError } from '../errors/ForbiddenError';
import { ConflictError } from '../errors/ConflictError';
import { IAppState } from '../models/context/IAppState.model';

const storage = new StorageService();

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(
  method: HttpMethod,
  url: string,
  body?: unknown
): Promise<T> {
  const token = storage.get<IAppState>('APP_STATE')?.user.token;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    /* no body */
  }

  if (!response.ok) {
    switch (response.status) {
      case 401: {
        // 🔥 Manejo global de sesión expirada
        storage.remove('APP_STATE');
        window.location.href = '/login';

        throw new UnauthorizedError(data);
      }

      case 403:
        throw new ForbiddenError(data);

      case 409:
        throw new ConflictError(data);

      default:
        throw new ApiError(response.status, 'Unexpected error', data);
    }
  }

  return data as T;
}

export const httpClient = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body?: unknown) => request<T>('POST', url, body),
  put: <T>(url: string, body?: unknown) => request<T>('PUT', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
};
