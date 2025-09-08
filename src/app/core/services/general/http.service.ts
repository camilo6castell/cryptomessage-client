/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { StorageService } from './storage.service.ts';

const storageService = new StorageService();

const getHeaders = (): HeadersInit => {
  const token = storageService.get<string>('TOKEN') || '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async <T>(
  response: Response,
): Promise<{ status: number; data: T }> => {
  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  return { status: response.status, data };
};

export default {
  post: async <T, B>(
    url: string,
    body: B,
  ): Promise<{ status: number; data: T }> => {
    const response = await fetch(url, {
      headers: getHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  get: async <T>(url: string): Promise<{ status: number; data: T }> => {
    const response = await fetch(url, { headers: getHeaders(), method: 'GET' });
    return handleResponse<T>(response);
  },

  put: async <T, B>(
    url: string,
    body: B,
  ): Promise<{ status: number; data: T }> => {
    const response = await fetch(url, {
      headers: getHeaders(),
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(url: string): Promise<{ status: number; data: T }> => {
    const response = await fetch(url, {
      headers: getHeaders(),
      method: 'DELETE',
    });
    return handleResponse<T>(response);
  },
};

// import { StorageService } from './storage.service.ts';

// const storageService = new StorageService();

// const isToken = (): string | null => {
//   return storageService.get<string>('TOKEN')
//     ? storageService.get<string>('TOKEN')
//     : '';
// };

// const headers: HeadersInit = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${isToken()}`,
// };

// const handleResponse = async <T>(
//   response: Response,
// ): Promise<{ status: number; data: T }> => {
//   let data;
//   try {
//     data = await response.json();
//   } catch {
//     data = {};
//   }
//   return { status: response.status, data };
// };

// export default {
//   post: async <T, B>(
//     url: string,
//     body: B,
//   ): Promise<{ status: number; data: T }> => {
//     const response = await fetch(url, {
//       headers,
//       method: 'POST',
//       body: JSON.stringify(body),
//     });
//     return handleResponse<T>(response);
//   },

//   get: async <T>(url: string): Promise<{ status: number; data: T }> => {
//     const response = await fetch(url, { headers, method: 'GET' });
//     return handleResponse<T>(response);
//   },

//   put: async <T, B>(
//     url: string,
//     body: B,
//   ): Promise<{ status: number; data: T }> => {
//     const response = await fetch(url, {
//       headers,
//       method: 'PUT',
//       body: JSON.stringify(body),
//     });

//     return handleResponse<T>(response);
//   },

//   delete: async <T>(url: string): Promise<{ status: number; data: T }> => {
//     const response = await fetch(url, { headers, method: 'DELETE' });
//     return handleResponse<T>(response);
//   },
// };
