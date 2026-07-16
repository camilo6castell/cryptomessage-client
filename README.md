<div align="center">

<img src="https://img.shields.io/badge/CryptoMessage-Frontend-0d1117?style=for-the-badge&logo=lock&logoColor=white" alt="CryptoMessage" height="60"/>

# CryptoMessage — Frontend

**End-to-end encrypted messaging. Your keys never leave your device.**

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Styled Components](https://img.shields.io/badge/Styled_Components_6-DB7093?style=flat-square&logo=styledcomponents&logoColor=white)](https://styled-components.com/)
[![Web Crypto API](https://img.shields.io/badge/Web_Crypto_API-RSA--OAEP_%2B_AES--GCM-2ea44f?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Cryptography Architecture](#-cryptography-architecture)
- [Application Architecture](#-application-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [State Management](#-state-management)
- [Routing & Guards](#-routing--guards)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📡 Overview

CryptoMessage is a **privacy-first, end-to-end encrypted messaging SPA** built with React and TypeScript. All cryptographic operations — key generation, message encryption, message decryption, and private key protection — run **exclusively in the browser** using the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). The server never sees plaintext, never touches private keys, and never participates in any cryptographic operation.

This repository contains the **client-side** of the CryptoMessage ecosystem. The Spring Boot backend lives in a [separate repository](#).

---

## 🔐 Cryptography Architecture

This is the core of the application. The entire crypto layer is built on the browser's native `crypto.subtle` API — no third-party crypto libraries involved.

### Primitives

| Operation | Algorithm | Details |
|---|---|---|
| Key pair generation | RSA-OAEP | 2048-bit modulus, SHA-256, public exponent 65537 |
| Message encryption | RSA-OAEP | Per-recipient, produces base64 ciphertext |
| Message decryption | RSA-OAEP | Uses the session-loaded private key |
| Private key protection | AES-GCM | 256-bit key, derived via PBKDF2 (65,536 iterations, SHA-256) |
| Key serialization | SPKI / PKCS#8 | Standard formats, exported as base64 |

### Registration flow

When a user registers, the entire key lifecycle happens on the client before anything is sent to the server:

```typescript
// useRegister.ts
const keyPair = await generateKeyPair();                            // RSA-OAEP 2048
const publicKeyStr = await exportPublicKey(keyPair.publicKey);      // SPKI → base64
const privateKeyStr = await exportPrivateKey(keyPair.privateKey);   // PKCS#8 → base64
const encryptedPrivateKey = await encryptPrivateKeyAES(             // AES-GCM, passphrase-derived
  privateKeyStr,
  registerForm.passphrase
);

// Server receives: username, bcrypt-ready passphrase, publicKey, encryptedPrivateKey
// Server NEVER receives: the raw private key or the plaintext passphrase content
await authApi.register({ username, passphrase, publicKey: publicKeyStr, encryptedPrivateKey });
```

### Private key encryption (AES-GCM + PBKDF2)

The private key is encrypted client-side using a key derived from the user's passphrase. The binary blob sent to the server is `salt (16B) || iv (12B) || ciphertext`:

```typescript
// crypto-aes.service.ts
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv   = crypto.getRandomValues(new Uint8Array(12));
const key  = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 65536, hash: 'SHA-256' },
  baseKey,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt', 'decrypt']
);
// Result stored as: base64(salt + iv + AES-GCM(privateKey))
```

### Login & key loading

On login, the private key is decrypted in-memory and held in a module-scoped variable — never stored in `localStorage` or any persistent medium:

```typescript
// crypto.manager.ts
let privateKey: CryptoKey | null = null;             // lives only in JS memory
const publicKeyCache = new Map<string, CryptoKey>(); // imported public keys, by base64

export const loadKeys = async (publicKeyStr, encryptedPrivateKeyStr, passphrase) => {
  const decryptedPrivateKeyBase64 = await decryptPrivateKeyAES(encryptedPrivateKeyStr, passphrase);
  privateKey = await importPrivateKey(decryptedPrivateKeyBase64);
  // ...
};

export const clearCrypto = () => {
  privateKey = null;
  publicKeyCache.clear();
};
```

### Message encryption (per-recipient)

Every message is encrypted **twice** — once with the sender's public key, once with the recipient's public key — so both parties can decrypt their own copy:

```typescript
// useSendMessage.ts
const encryptedForMe    = await encryptMessage(myPublicKey,    messageContent);
const encryptedForOther = await encryptMessage(otherPublicKey, messageContent);

await messagesApi.send(chatId, {
  [String(myId)]:    encryptedForMe,
  [String(otherId)]: encryptedForOther,
});
// The server stores Map<userId, ciphertext> — it cannot read either copy.
```

---

## 🏛️ Application Architecture

The project follows a **container/component/page** separation pattern with a centralized `Context + Reducer` state:

```
src/app/
├── pages/          → Top-level route targets (thin — delegate to containers)
├── containers/     → Connect state/hooks to UI components
├── ui/
│   ├── components/ → Stateless presentational components
│   ├── elements/   → Atomic reusable UI primitives (Button, Avatar, Toast...)
│   ├── layouts/    → Page shell wrappers (MainLayout, StartLayout)
│   └── styles/     → Themes, keyframes, global reset, styled-components config
├── core/
│   ├── api/        → API layer (httpClient, per-domain API modules)
│   ├── services/   → Crypto services, StorageService
│   ├── hooks/      → Feature hooks (useLogin, useSendMessage, useLoadChats...)
│   ├── state/      → AppContext + Reducer
│   ├── models/     → TypeScript interfaces and enums
│   ├── mappers/    → API response → domain model transforms
│   ├── errors/     → Typed HTTP error classes
│   └── config/     → API base URL config
└── routes/         → React Router config, PrivateGuard, PublicGuard
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Language | TypeScript | 5.5 |
| Framework | React | 18.3 |
| Build tool | Vite (SWC) | 7 |
| Routing | React Router DOM | 6.26 |
| Styling | Styled Components | 6.1 |
| Cryptography | Web Crypto API (`crypto.subtle`) | Native browser |
| Avatars | jdenticon | 3.3 |
| Icons | react-icons | 5.5 |
| Node polyfills | vite-plugin-node-polyfills | 0.24 |
| Linting | ESLint + eslint-plugin-react | 9.10 |
| Formatting | Prettier | 3.8 |

---

## 📁 Project Structure

```
src/
├── main.tsx                          # React entry point
├── vite-env.d.ts
├── environment/
│   └── environment.ts                # VITE_API_URL + isProduction flag
└── app/
    ├── index.tsx                     # AppContextProvider + RouterProvider
    ├── pages/
    │   ├── MainPage.tsx              # Authenticated main view
    │   └── StartPage.tsx             # Login / Register view
    ├── containers/                   # State-connected wrappers
    │   ├── StartContainer.tsx
    │   ├── NavBarContainer.tsx
    │   ├── ChatListContainer.tsx
    │   ├── ChatListContainerAux.tsx
    │   ├── ContactListContainer.tsx
    │   ├── ContactListContainerAux.tsx
    │   ├── UserInfoContainer.tsx
    │   └── UserInfoContainerAux.tsx
    ├── routes/
    │   ├── router.tsx                # createBrowserRouter — public + private trees
    │   ├── PrivateGuard.tsx          # Token verify + passphrase prompt → key load
    │   └── PublicGuard.tsx           # Redirects authenticated users away from /login
    ├── core/
    │   ├── api/
    │   │   ├── http.client.ts        # Typed fetch wrapper with error classification
    │   │   ├── auth.api.ts
    │   │   ├── chats.api.ts
    │   │   ├── contacts.api.ts
    │   │   └── messages.api.ts
    │   ├── services/
    │   │   ├── crypto.service.ts     # RSA-OAEP key ops (generateKeyPair, encrypt, decrypt, import/export)
    │   │   ├── crypto-aes.service.ts # AES-GCM + PBKDF2 for private key protection
    │   │   ├── crypto.manager.ts     # In-memory key state + encryptMessage / decryptMessage
    │   │   └── storage.service.ts   # localStorage wrapper (APP_STATE — never stores keys)
    │   ├── hooks/
    │   │   ├── useLogin.ts           # Auth + key loading on sign-in
    │   │   ├── useRegister.ts        # Key generation + AES encryption + registration
    │   │   ├── useSendMessage.ts     # Per-recipient RSA encryption + API call
    │   │   ├── useLoadMessages.ts
    │   │   ├── useLoadChats.ts
    │   │   ├── useCreateChat.ts
    │   │   ├── useAcceptChat.ts
    │   │   ├── useContactSearch.ts
    │   │   ├── useLoadContacts.ts
    │   │   ├── useDeleteContact.ts
    │   │   ├── useMarkAsRead.ts
    │   │   ├── useLogout.ts
    │   │   ├── useToast.tsx
    │   │   ├── useHandleInput.ts
    │   │   ├── useThemeContext.ts
    │   │   ├── useFirendlyDateFormat.ts
    │   │   └── useDynamicHeightFontSize.ts
    │   ├── state/
    │   │   ├── AppContext.tsx         # Context + localStorage persistence
    │   │   └── reducer.ts            # Pure reducer — all state transitions
    │   ├── models/                   # TypeScript interfaces + enums
    │   ├── mappers/                  # API response → IUser, IContact, etc.
    │   ├── errors/                   # ApiError, UnauthorizedError, ForbiddenError, ConflictError
    │   ├── config/
    │   │   └── api.config.ts
    │   └── resources/
    │       └── url.resource.ts
    └── ui/
        ├── components/               # Feature components (chat, contact, welcome, navbar)
        ├── elements/                 # Atoms: Button, Avatar, Toast, Logo, CopyToClipboard...
        ├── layouts/                  # MainLayout, StartLayout, GenericContainer
        └── styles/                   # Themes, keyframes, global reset, effects
```

---

## 🧠 State Management

The app uses a **React Context + `useReducer`** pattern. There are no external state libraries.

- `AppContext` provides `{ state, dispatch }` to the entire tree.
- The state is **persisted to `localStorage`** (`APP_STATE`) on every change.
- On page load, `AppContext` restores the last known state from storage.
- **Crypto keys are never included in the persisted state** — they live only in the `crypto.manager` module variables and are cleared on logout.

```
AppContextProvider
└── useReducer(reducer, loadInitialState())
    └── useEffect → localStorage.setItem('APP_STATE', state)
```

On tab refresh, `PrivateGuard` detects that the private key is absent (`hasPrivateKey() === false`), re-verifies the JWT token, and prompts the user for their passphrase to reload the key pair into memory.

---

## 🛡️ Routing & Guards

The router is built with `createBrowserRouter` (React Router v6) and enforces two route trees:

```
/login    → PublicGuard  → StartLayout → StartPage  (redirects away if already authenticated)
/register → PublicGuard  → StartLayout → StartPage
/         → PrivateGuard → MainLayout  → MainPage   (redirects to /login if not authenticated)
```

**`PrivateGuard`** on every navigation to a protected route:
1. Reads `APP_STATE` from localStorage and checks for a JWT token.
2. Calls `GET /auth/verify` to confirm the token is still valid.
3. If the in-memory private key is missing (e.g. page refresh), prompts the user for their passphrase and re-derives the key via `loadKeys()`.
4. On any failure (invalid token, wrong passphrase), clears crypto state and redirects to `/login`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- The [CryptoMessage backend](#) running (or a reachable API URL)

### Install & run

```bash
# Clone the repository
git clone https://github.com/your-username/cryptomessage-frontend.git
cd cryptomessage-frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint & format

```bash
npm run lint      # ESLint
npm run format    # Prettier
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL for the CryptoMessage backend — REST calls append their own path (e.g. `/api/v1/chats`), and the WebSocket client derives its URL from this too (`http` → `ws`, `+ /ws`). |

---

## 🔌 Realtime

New messages and chat updates arrive live over a WebSocket (`ws.service.ts` + `useRealtimeSync`),
mounted once at the authenticated shell (`MainLayout`). A small status dot in the bottom-right
corner reflects the connection state. See the backend README's "Realtime" section for the wire
protocol.

---

## 🎨 Placeholder assets

Two binary assets aren't tracked in this bundle and ship as lightweight placeholders so the
project builds out of the box:

- `public/background.webm` — the animated background video. Not included; if the file is
  missing, `WavesBackground` degrades gracefully (no broken video, just no animation). Drop
  your video at that path to restore it.
- `src/assets/logo-white.svg` — a minimal placeholder logo. Replace with your real brand asset.

---

## 🤝 Contributing

Contributions are welcome. Please open an issue before submitting a pull request to discuss the proposed change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m 'feat: add your feature'`
4. Push and open a pull request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

Copyright © 2025 Camilo Andres Castellanos Herrera

---

<div align="center">

*Your keys. Your messages. Your browser.*

</div>
