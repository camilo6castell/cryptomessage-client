const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const ITERATIONS = 65536;

/* ================= UTILS ================= */

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const subarray = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...subarray);
  }

  return btoa(binary);
};

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
};

/* ================= KEY DERIVATION ================= */

const deriveKey = async (passphrase: string, salt: Uint8Array) => {
  const encoder = new TextEncoder();

  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    {
      name: 'AES-GCM',
      length: 256,
    },
    false,
    ['encrypt', 'decrypt'] // 🔥 IMPORTANTE
  );
};

/* ================= ENCRYPT ================= */

export const encryptPrivateKeyAES = async (
  privateKeyBase64: string,
  passphrase: string
): Promise<string> => {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const key = await deriveKey(passphrase, salt);

  const dataBuffer = base64ToArrayBuffer(privateKeyBase64);

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    dataBuffer
  );

  // 🔗 Concatenar: salt + iv + encrypted
  const result = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength);

  result.set(salt, 0);
  result.set(iv, SALT_LENGTH);
  result.set(new Uint8Array(encrypted), SALT_LENGTH + IV_LENGTH);

  return arrayBufferToBase64(result.buffer);
};

/* ================= DECRYPT ================= */

export const decryptPrivateKeyAES = async (
  encryptedBase64: string,
  passphrase: string
): Promise<string> => {
  const data = new Uint8Array(base64ToArrayBuffer(encryptedBase64));

  const salt = data.slice(0, SALT_LENGTH);
  const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const encrypted = data.slice(SALT_LENGTH + IV_LENGTH);

  const key = await deriveKey(passphrase, salt);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encrypted
  );

  return arrayBufferToBase64(decrypted);
};
