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

export const generateKeyPair = async (): Promise<CryptoKeyPair> => {
  return crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
};

export const encrypt = async (
  publicKey: CryptoKey,
  data: string
): Promise<string> => {
  const encoded = new TextEncoder().encode(data);

  const encrypted = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    encoded
  );

  return arrayBufferToBase64(encrypted);
};

export const decrypt = async (
  privateKey: CryptoKey,
  encrypted: string
): Promise<string> => {
  const buffer = base64ToArrayBuffer(encrypted);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    privateKey,
    buffer
  );

  return new TextDecoder().decode(decrypted);
};

export const importPublicKey = async (
  base64Key: string
): Promise<CryptoKey> => {
  const buffer = base64ToArrayBuffer(base64Key);

  return crypto.subtle.importKey(
    'spki',
    buffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    true,
    ['encrypt']
  );
};

export const importPrivateKey = async (
  base64Key: string
): Promise<CryptoKey> => {
  const buffer = base64ToArrayBuffer(base64Key);

  return crypto.subtle.importKey(
    'pkcs8',
    buffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    true,
    ['decrypt']
  );
};

export const exportPublicKey = async (key: CryptoKey): Promise<string> => {
  const buffer = await crypto.subtle.exportKey('spki', key);
  return arrayBufferToBase64(buffer);
};

export const exportPrivateKey = async (key: CryptoKey): Promise<string> => {
  const buffer = await crypto.subtle.exportKey('pkcs8', key);
  return arrayBufferToBase64(buffer);
};

/**
 * Short, human-shareable fingerprint of a public key (SHA-256, formatted in
 * 4-char groups). Meant to be glanced at or compared out-of-band — not a
 * substitute for the full key, just an easier way to eyeball "is this the
 * same key I had before".
 */
export const getKeyFingerprint = async (
  publicKeyBase64: string
): Promise<string> => {
  const buffer = base64ToArrayBuffer(publicKeyBase64);
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

  return hex
    .slice(0, 20)
    .match(/.{1,4}/g)!
    .join(' ');
};
