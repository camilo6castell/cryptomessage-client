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

export const hasPrivateKey = () => privateKey !== null;

/* ================= LOAD KEYS ================= */

export const loadKeys = async (
  publicKeyStr: string,
  encryptedPrivateKeyStr: string,
  passphrase: string
) => {
  console.log('🔥 LOADING KEYS...');

  const decryptedPrivateKeyBase64 = await decryptPrivateKeyAES(
    encryptedPrivateKeyStr,
    passphrase
  );

  console.log('🔓 PRIVATE KEY BASE64 OK');

  privateKey = await importPrivateKey(decryptedPrivateKeyBase64);

  console.log('✅ PRIVATE KEY IMPORTED', privateKey);
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
) => {
  const key = await getPublicKey(targetPublicKeyStr);
  return encrypt(key, message);
};

/* ================= DECRYPT ================= */

export const decryptMessage = async (encrypted: string) => {
  if (!privateKey) {
    throw new Error('Private key not loaded');
  }

  return decrypt(privateKey, encrypted);
};

/* ================= CLEAR KEYS ================= */

export const clearCrypto = () => {
  privateKey = null;
  publicKeyCache.clear();
};
