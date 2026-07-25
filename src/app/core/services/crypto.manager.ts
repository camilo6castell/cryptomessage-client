let privateKey: CryptoKey | null = null;
const publicKeyCache = new Map<string, CryptoKey>();

import {
  importPublicKey,
  importPrivateKey,
  encrypt,
  decrypt,
} from './crypto.service';

import { decryptPrivateKeyAES } from './crypto-aes.service';

/* ================= CHECK PRIVATE KEY ================= */

export const hasPrivateKey = (): boolean => privateKey !== null;

/* ================= LOAD KEYS ================= */

export const loadKeys = async (
  publicKeyStr: string,
  encryptedPrivateKeyStr: string,
  passphrase: string
): Promise<void> => {
  if (!publicKeyStr || !encryptedPrivateKeyStr) {
    throw new Error('Missing key data');
  }

  const decryptedPrivateKeyBase64 = await decryptPrivateKeyAES(
    encryptedPrivateKeyStr,
    passphrase
  );

  privateKey = await importPrivateKey(decryptedPrivateKeyBase64);

  if (!publicKeyCache.has(publicKeyStr)) {
    const importedPublicKey = await importPublicKey(publicKeyStr);
    publicKeyCache.set(publicKeyStr, importedPublicKey);
  }
};
/* ================= GET PUBLIC KEY ================= */

const getPublicKey = async (publicKeyStr: string): Promise<CryptoKey> => {
  if (publicKeyCache.has(publicKeyStr)) {
    return publicKeyCache.get(publicKeyStr)!;
  }

  const imported = await importPublicKey(publicKeyStr);
  publicKeyCache.set(publicKeyStr, imported);
  return imported;
};

/* ================= ENCRYPT ================= */

export const encryptMessage = async (
  targetPublicKeyStr: string,
  message: string
): Promise<string> => {
  const key = await getPublicKey(targetPublicKeyStr);
  return encrypt(key, message);
};

/* ================= DECRYPT ================= */

export const decryptMessage = async (encrypted: string): Promise<string> => {
  if (!privateKey) {
    throw new Error('Private key not loaded');
  }

  return decrypt(privateKey, encrypted);
};

/* ================= CLEAR KEYS ================= */

export const clearCrypto = (): void => {
  privateKey = null;
  publicKeyCache.clear();
};
