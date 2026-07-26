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
- [Design System](#-design-system)
- [Cryptography Architecture](#-cryptography-architecture)
- [Application Architecture](#-application-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [State Management](#-state-management)
- [Routing & Guards](#-routing--guards)
- [Realtime](#-realtime)
- [Getting Started](#-getting-started)
- [Mock Backend (Development)](#-mock-backend-development)
- [Environment Variables](#-environment-variables)
- [Assets](#-assets)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📡 Overview

CryptoMessage is a **privacy-first, end-to-end encrypted messaging SPA** built with React and TypeScript. All cryptographic operations — key generation, message encryption, message decryption, and private key protection — run **exclusively in the browser** using the native [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). The server never sees plaintext, never touches private keys, and never participates in any cryptographic operation.

This repository contains the **client-side** of the CryptoMessage ecosystem. The Spring Boot backend lives in a [separate repository](#).

---

## 🎨 Design System

The UI follows a token-driven design system (`ui/styles/config/Themes.tsx`) rather than one-off hardcoded colors, so the whole app reads as one coherent product instead of a pile of individually-styled screens.

**Direction — "Quiet Vault":** a messenger that feels like a calm, low-glare secure room rather than a flashy chat app. One signature accent (lilac → deep violet) carries all emphasis; everything else is a small set of neutral surfaces at different elevations. The product's actual privacy mechanic — ciphertext that must be deliberately unsealed — gets its own monospace voice everywhere it appears, so it always reads as "encrypted data," not a rendering glitch.

| Token group | Purpose |
|---|---|
| `color.highlight` / `color.highlightDeep` | Signature accent (lilac → violet), used for the active nav state, sent-message bubbles, primary buttons, focus rings |
| `surface.canvas` / `surface.surface` / `surface.surfaceRaised` | Three elevation levels — page background, panels, cards/bubbles |
| `surface.textPrimary` / `surface.textMuted` | The only two text colors in the app |
| `font.mainFontFamily` / `displayFontFamily` / `monoFontFamily` | Inter (body/UI), Space Grotesk (headings/brand), JetBrains Mono (ciphertext, fingerprints, raw keys) |
| `darkGlassEffect` | The single mixin every panel (rail, chat list, chat window, cards, modals) derives from, so elevation reads consistently |

Both a dark theme (default) and a light theme are fully defined — toggle lives in the navigation rail (`SideRail`), backed by `ThemeProvider` / `useThemeContext` with the choice persisted to `localStorage`.

Fonts are self-hosted via `@fontsource` (Latin subset only) instead of pulled from Google Fonts at runtime — no third-party font CDN call on load, which fits an app whose whole premise is not phoning home.

### Layout

The authenticated shell is a Telegram Desktop–style structure: a narrow persistent icon rail on the far left (`SideRail` — Chats / Contacts / Profile, theme toggle, connection status), with each section rendering its own list-pane + detail-pane split to its right (`MainLayout` → `ChatListContainer` + `ChatListContainerAux`, etc.).

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
| Key fingerprint | SHA-256 | Shown on the Profile screen for out-of-band verification |

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

Because the key only lives in memory, a page reload needs the passphrase again to decrypt it. That prompt is a proper in-app modal (`PassphraseModal`) — not a native `window.prompt()` — with inline error feedback and a "cancel and log out" escape hatch.

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

In the chat window, ciphertext is shown by default (monospace) and only decrypted client-side when the person explicitly taps "Revelar" — the encryption isn't just infrastructure, it's visible in the UI.

---

## 🏛️ Application Architecture

The project follows a **container/component/page** separation pattern with a centralized `Context + Reducer` state:

```
src/app/
├── pages/          → Top-level route targets (thin — delegate to containers)
├── containers/     → Connect state/hooks to UI components
├── ui/
│   ├── components/ → Stateless presentational components
│   ├── elements/   → Atomic reusable UI primitives (Button, Avatar, Logo...)
│   ├── layouts/    → Page shell wrappers (MainLayout, StartLayout)
│   └── styles/     → Themes, keyframes, global reset, styled-components config
├── core/
│   ├── api/        → API layer (httpClient, per-domain API modules)
│   ├── services/   → Crypto services, WebSocket service, StorageService
│   ├── hooks/      → Feature hooks (useLogin, useSendMessage, useLoadChats...)
│   ├── state/      → AppContext + Reducer + ToastContext (global notifications)
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
| Realtime | STOMP over WebSocket (`@stomp/stompjs`) | 7 |
| Cryptography | Web Crypto API (`crypto.subtle`) | Native browser |
| Mocking | MSW (Mock Service Worker) | 2.15 |
| Fonts | Inter, Space Grotesk, JetBrains Mono (self-hosted via `@fontsource`) | 5.2 |
| Avatars | jdenticon | 3.3 |
| Icons | react-icons | 5.5 |
| Linting | ESLint (flat config) + typescript-eslint + eslint-plugin-react | 9.35 / 8.64 |
| Formatting | Prettier | 3.8 |

---

## 📁 Project Structure

```
src/
├── main.tsx                          # React entry point (conditionally loads MSW)
├── vite-env.d.ts                     # Typed import.meta.env
├── mocks/                            # Mock backend (MSW + WebSocket mock)
│   ├── browser.ts                    # MSW Service Worker setup
│   ├── ws.mock.ts                    # Mock WebSocket (STOMP simulation)
│   ├── data/
│   │   ├── factories.ts              # Fake data generators with real RSA keys
│   │   └── db.ts                     # In-memory database + seed data
│   └── handlers/
│       ├── index.ts                  # Barrel — all handlers aggregated
│       ├── auth.handlers.ts          # POST /auth/register, /auth/login, GET /auth/verify
│       ├── chats.handlers.ts         # GET/POST /chats, POST accept/block
│       ├── contacts.handlers.ts      # GET/POST/DELETE /contacts
│       └── messages.handlers.ts      # POST /messages, GET/PATCH mark-read
└── app/
    ├── index.tsx                     # ThemeProvider + ToastProvider + AppContextProvider + Router
    ├── pages/
    │   ├── MainPage.tsx              # Authenticated main view
    │   └── StartPage.tsx             # Login / Register view
    ├── containers/                   # State-connected wrappers
    │   ├── StartContainer.tsx
    │   ├── NavBarContainer.tsx       # Renders SideRail
    │   ├── ChatListContainer.tsx
    │   ├── ChatListContainerAux.tsx
    │   ├── ContactListContainer.tsx
    │   ├── ContactListContainerAux.tsx
    │   ├── UserInfoContainer.tsx
    │   └── UserInfoContainerAux.tsx
    ├── routes/
    │   ├── router.tsx                # createBrowserRouter — public + private trees
    │   ├── PrivateGuard.tsx          # Token verify + passphrase modal → key load
    │   └── PublicGuard.tsx           # Redirects authenticated users away from /login
    ├── core/
    │   ├── api/
    │   │   ├── http.client.ts        # Typed fetch wrapper with error classification
    │   │   ├── auth.api.ts
    │   │   ├── chats.api.ts
    │   │   ├── contacts.api.ts
    │   │   └── messages.api.ts
    │   ├── services/
    │   │   ├── crypto.service.ts     # RSA-OAEP key ops + key fingerprint helper
    │   │   ├── crypto-aes.service.ts # AES-GCM + PBKDF2 for private key protection
    │   │   ├── crypto.manager.ts     # In-memory key state + encryptMessage / decryptMessage
    │   │   ├── ws.service.ts         # STOMP/WebSocket connection manager
    │   │   └── storage.service.ts    # localStorage wrapper (APP_STATE — never stores keys)
    │   ├── hooks/
    │   │   ├── useLogin.ts           # Auth + key loading on sign-in
    │   │   ├── useRegister.ts        # Key generation + AES encryption + registration
    │   │   ├── useSendMessage.ts     # Per-recipient RSA encryption + API call
    │   │   ├── useRealtimeSync.ts    # WebSocket lifecycle + live state updates
    │   │   ├── useLoadMessages.ts
    │   │   ├── useLoadChats.ts
    │   │   ├── useCreateChat.ts
    │   │   ├── useAcceptChat.ts
    │   │   ├── useContactSearch.ts
    │   │   ├── useLoadContacts.ts
    │   │   ├── useDeleteContact.ts
    │   │   ├── useMarkAsRead.ts
    │   │   ├── useLogout.ts
    │   │   ├── useHandleInput.ts
    │   │   ├── useThemeContext.ts
    │   │   └── useFirendlyDateFormat.ts
    │   ├── state/
    │   │   ├── AppContext.tsx        # Context + localStorage persistence
    │   │   ├── ToastContext.tsx      # Global, non-blocking notification stack
    │   │   └── reducer.ts            # Pure reducer — all state transitions
    │   ├── models/                   # TypeScript interfaces + enums
    │   ├── mappers/                  # API response → IUser, IContact, etc.
    │   ├── errors/                   # ApiError, UnauthorizedError, ForbiddenError, ConflictError
    │   ├── config/
    │   │   └── api.config.ts
    │   └── resources/
    │       └── url.resource.ts
    └── ui/
        ├── components/
        │   ├── navbar/
        │   │   └── SideRail.tsx      # Persistent left icon rail (nav + theme + connection)
        │   ├── chatlist/             # Chat list, chat window, message bubbles, input
        │   ├── contactlist/          # Contact search, contact list, contact cards
        │   ├── userinfo/             # Profile + "Security & Keys" panel
        │   ├── welcome/              # Login/register form, marketing front page
        │   └── general/
        │       ├── Toast.tsx         # Stackable snackbar (renders the ToastContext queue)
        │       ├── LoadingScreen.tsx
        │       ├── PassphraseModal.tsx
        │       └── WavesBackground.tsx
        ├── elements/                 # Atoms: Button, Avatar, Logo, CopyToClipboardButton, font/*
        ├── layouts/                  # MainLayout, StartLayout, GenericContainer
        └── styles/                   # Themes (design tokens), keyframes, global reset, effects
```

---

## 🧠 State Management

The app uses a **React Context + `useReducer`** pattern. There are no external state libraries.

- `AppContext` provides `{ state, dispatch }` to the entire tree.
- `ToastContext` provides a separate, global `showToast(message, isDanger)` for non-blocking notifications — used by anything that previously failed silently (sending a message, creating a chat), not just the login form.
- The state is **persisted to `localStorage`** (`APP_STATE`) on every change.
- On page load, `AppContext` restores the last known state from storage.
- **Crypto keys are never included in the persisted state** — they live only in the `crypto.manager` module variables and are cleared on logout.

```
AppContextProvider
└── useReducer(reducer, loadInitialState())
    └── useEffect → localStorage.setItem('APP_STATE', state)
```

On tab refresh, `PrivateGuard` detects that the private key is absent (`hasPrivateKey() === false`), re-verifies the JWT token, and shows `PassphraseModal` to reload the key pair into memory.

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
3. If the in-memory private key is missing (e.g. page refresh), shows `PassphraseModal` and re-derives the key via `loadKeys()` — with inline retry on a wrong passphrase instead of a forced logout on the first mistake.
4. On an invalid token, or if the person cancels the passphrase prompt, clears crypto state and redirects to `/login`.

---

## 🔌 Realtime

New messages and chat updates (created / accepted) arrive live over a WebSocket — no polling, no manual reload:

- `ws.service.ts` owns the STOMP connection (raw WebSocket, JWT sent as a native header on the STOMP `CONNECT` frame).
- `useRealtimeSync` wires the connection lifecycle to `AppContext`, mounted once at the authenticated shell (`MainLayout`).
- Connection status is shown as a small dot at the bottom of the navigation rail (`SideRail`) — green when connected, amber while reconnecting.
- See the backend README's "Realtime" section for the wire protocol (`/user/queue/messages`, `/user/queue/chats`).

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
pnpm install

# Start the dev server
pnpm dev
```

### Build for production

```bash
pnpm build
pnpm preview   # preview the production build locally
```

### Lint & format

```bash
pnpm lint      # ESLint (includes Prettier)
pnpm format    # Prettier
```

---

## 🧪 Mock Backend (Development)

The project includes a full mock layer powered by [MSW (Mock Service Worker)](https://mswjs.io/) so you can develop and test the entire frontend **without the backend running**.

### How it works

- **MSW** intercepts `fetch()` at the Service Worker level — no code changes needed in the API modules.
- **REST endpoints** (`auth`, `chats`, `contacts`, `messages`) are fully mocked with realistic responses.
- **WebSocket** is replaced with a mock that simulates STOMP messages every 15 seconds.
- **Crypto is real** — RSA keys are generated with Web Crypto API, AES encryption works end-to-end.

### Quick start (mocked)

1. Ensure `.env` has:
   ```env
   VITE_MOCK_ENABLED=true
   VITE_MOCK_WS=true
   ```
2. Run `pnpm dev` — MSW activates automatically before the app renders.
3. Log in with one of the pre-seeded users below.

### Credentials

All users share the same passphrase: **`mock-passphrase-123`**

| User | Description |
|---|---|
| `alice` | Pre-created with real RSA keys |
| `bob` | Pre-created with real RSA keys |
| `charlie` | Pre-created with real RSA keys |

### Pre-seeded data

Two chats exist by default:
- **alice ↔ bob** (`ACCEPTED`) — 3 messages already exchanged
- **charlie → alice** (`PENDING`) — incoming chat request

Two contacts for `alice`: `bob` and `charlie`.

### Disabling mocks

Set the env variables to `false` or comment them out:

```env
#VITE_MOCK_ENABLED=true
#VITE_MOCK_WS=true
```

The app will connect to the backend at `VITE_API_URL` (`localhost:8080` by default).

### Mock file structure

```
src/mocks/
├── browser.ts                  # MSW browser setup (Service Worker)
├── ws.mock.ts                  # Mock WebSocket (simulates STOMP without a server)
├── data/
│   ├── factories.ts            # Generators for fake users, chats, contacts, messages
│   └── db.ts                   # In-memory database with seed data
└── handlers/
    ├── index.ts                # Barrel — aggregates all handlers
    ├── auth.handlers.ts        # POST /auth/register, /auth/login, GET /auth/verify
    ├── chats.handlers.ts       # GET/POST /chats, POST /chats/:id/accept|block
    ├── contacts.handlers.ts    # GET/POST/DELETE /contacts
    └── messages.handlers.ts    # POST /messages, GET/PATCH /messages/chat/:id
```

### Architecture note

The mock layer is completely isolated:

- **Zero code changes** to existing `api/`, `services/`, `hooks/`, or `components/` files.
- Controlled by two env variables — `VITE_MOCK_ENABLED` (REST) and `VITE_MOCK_WS` (WebSocket).
- In production builds without `VITE_MOCK_ENABLED=true`, the mocks are never loaded.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080
VITE_MOCK_ENABLED=true
VITE_MOCK_WS=true
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL for the CryptoMessage backend — REST calls append their own path (e.g. `/api/v1/chats`), and the WebSocket client derives its URL from this too (`http` → `ws`, `+ /ws`). |
| `VITE_MOCK_ENABLED` | When `true`, MSW intercepts all REST API calls and serves mock data. No backend needed. Defaults to `false` if absent. |
| `VITE_MOCK_WS` | When `true`, the real STOMP WebSocket client is replaced with a mock that simulates incoming messages. Requires `VITE_MOCK_ENABLED=true`. |

---

## 🎨 Assets

- `src/assets/logo.png`, `logo-big.png`, `logo-white.svg` — brand wordmark, used in the login screen and browser tab.
- `public/background.webm` — **not included in this repo.** The animated login-screen background video is a separate binary asset; if it's absent, `WavesBackground` degrades gracefully (no broken video, just no animation, falls back to the theme's canvas color). Drop your video at that exact path to restore it.

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
