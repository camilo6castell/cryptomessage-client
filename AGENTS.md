# AGENTS.md — CryptoMessage Client

## What this is

React + TypeScript SPA for E2E encrypted messaging. All crypto runs in-browser via Web Crypto API — the server never sees plaintext or private keys.

## Commands

```bash
pnpm install          # install deps (pnpm-lock.yaml is the source of truth, not package-lock.json)
pnpm dev              # Vite dev server
pnpm build            # tsc -b && vite build
pnpm lint             # ESLint (flat config, type-checked)
pnpm format           # Prettier
```

**No test suite exists.** There is no test script, no test framework, and no test files. Do not attempt to run tests.

## Verification order

`lint` → `build` (which includes `tsc -b`)

## Code style — enforced, not optional

- **Prettier runs inside ESLint** via `eslint-plugin-prettier`. Do not run Prettier separately; just run `pnpm lint`.
- Config: 2-space indent, single quotes, semicolons, trailing commas (es5), 80-char print width.
- **Strict TypeScript**: explicit function return types required (`@typescript-eslint/explicit-function-return-type`), no `any`, no inferrable types. The ESLint config will fail builds on these.
- Self-closing components/HTML enforced (`react/self-closing-comp`).

## Architecture

```
src/app/
  pages/          → thin route targets (MainPage, StartPage)
  containers/     → state-connected wrappers (bind hooks/context to components)
  ui/components/  → presentational components by feature (chatlist/, contactlist/, userinfo/, navbar/)
  ui/elements/    → atomic primitives (Button, Avatar, Logo, etc.)
  ui/layouts/     → shell wrappers (MainLayout, StartLayout)
  ui/styles/      → Themes.tsx (design tokens), keyframes, global reset
  core/api/       → http.client.ts + per-domain API modules (auth, chats, contacts, messages)
  core/services/  → crypto.service.ts, crypto-aes.service.ts, crypto.manager.ts, ws.service.ts, storage.service.ts
  core/hooks/     → feature hooks (useLogin, useSendMessage, useLoadChats, etc.)
  core/state/     → AppContext (Context + useReducer), ToastContext
  core/models/    → TS interfaces and enums
  core/mappers/   → API response → domain model transforms
  core/errors/    → typed HTTP error classes (ApiError, UnauthorizedError, etc.)
routes/           → router.tsx, PrivateGuard, PublicGuard
```

**Key rule**: new UI logic goes in `containers/` (state + hooks) → `components/` (rendering). Pages stay thin.

## Crypto — what NOT to touch carelessly

- Private key lives **only in module scope** (`crypto.manager.ts`). Never persisted to localStorage or any storage.
- On page refresh, `PrivateGuard` detects missing key and shows `PassphraseModal` to reload it.
- Messages are encrypted **twice** (once per recipient) — both parties can decrypt their own copy.
- AES-GCM blob format: `base64(salt[16] + iv[12] + ciphertext)`.
- **Never log or store crypto keys, passphrases, or plaintext.**

## State management

- `AppContext` = Context + `useReducer` + localStorage persistence (`APP_STATE` key).
- `ToastContext` = global non-blocking notifications.
- No Redux, Zustand, or other state libraries.

## Routing

- `createBrowserRouter` (React Router v6).
- `/login`, `/register` → `PublicGuard` → `StartLayout`.
- `/` → `PrivateGuard` → `MainLayout` (checks JWT, re-derives key from passphrase if needed).

## Environment

- `VITE_API_URL` (in `.env`) — base URL for REST and WebSocket. WebSocket URL is derived by replacing `http` → `ws` and appending `/ws`.
- `src/environment/environment.ts` wraps `import.meta.env.VITE_API_URL`.

## Theming

- Token-driven design system in `ui/styles/config/Themes.tsx`.
- Dark (default) + light themes. Toggle in `SideRail`. Persisted to localStorage.
- Fonts: Inter (body), Space Grotesk (headings), JetBrains Mono (ciphertext/fingerprints) — self-hosted via `@fontsource`.
- `styled.d.ts` at root declares the `DefaultTheme` type — update `Themes.tsx` if adding tokens.

## Gotchas

- `pnpm-workspace.yaml` exists but this is a single-package repo (not a monorepo).
- Both `pnpm-lock.yaml` and `package-lock.json` exist — use pnpm.
- `public/background.webm` is git-ignored. `WavesBackground` degrades gracefully without it.
- ESLint uses **type-checked** rules (`recommendedTypeChecked` + `strictTypeChecked`) — requires `parserOptions.project` pointing to both tsconfigs.
- The `dist/` output is git-ignored.
