const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const ITERATIONS = 65536;

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
    ['decrypt']
  );
};

export const decryptPrivateKeyAES = async (
  encryptedBase64: string,
  passphrase: string
): Promise<string> => {
  const data = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));

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

  // 👉 esto es PKCS8 base64
  return btoa(String.fromCharCode(...new Uint8Array(decrypted)));
};
