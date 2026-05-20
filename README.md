# OsloLatte

Offentlig nettside for **OsloLatte** (signaturkaffe og kakao) — drevet av **KoppStopp**.  
Produksjonsstack: React 19, TypeScript, Vite 6, Netlify (statisk hosting + serverless functions).

**Repository:** [github.com/kasa031/oslolatte](https://github.com/kasa031/oslolatte)  
**Produksjonsdomene:** [oslolatte.no](https://oslolatte.no)

## Funksjonalitet

- Responsiv nettside med panelruter (bestilling, meny, kalender, kontakt, om oss)
- Vinter/sommer-meny med 3D-flipp
- Åpningskalender og valgfritt «åpent nå»-banner (`src/data/opening.ts`)
- Nettbestilling via `POST /api/order` → Telegram (`netlify/functions/order.mjs`)
- Tospråklig innhold (nb/en), lys/mørk tema, PWA (service worker)
- Valgfri Vipps-blokk (`src/config/vipps.ts`)
- Automatisert CI: lint, build, Lighthouse, Playwright (Chromium + WebKit)

## Krav

- Node.js 22 (se `.nvmrc`)
- npm 10+
- Netlify-konto for produksjon (GitHub-integrasjon anbefales)

## Kom i gang

```bash
npm install
cp .env.example .env   # eller: npm run env:bootstrap
npm run dev:all          # Vite + Netlify Functions (Telegram)
```

Standard lokalt: frontend `http://localhost:5173`, API `http://localhost:9888` (proxy `/api/order`).

Kun frontend uten API:

```bash
npm run dev
```

Produksjonsbygg:

```bash
npm run build
```

## Miljøvariabler

Hemmeligheter committes **ikke**. Bruk `.env` lokalt (gitignored) og **Netlify → Environment variables** i produksjon. Mal: `.env.example`.

| Variabel | Kontekst | Beskrivelse |
|----------|----------|-------------|
| `VITE_ORDER_API_URL` | Build (Vite) | `/api/order` for aktivert bestillingsskjema |
| `VITE_SITE_URL` | Build (Vite) | Kanonisk URL uten trailing slash, f.eks. `https://oslolatte.no` (sitemap, canonical, QR) |
| `TELEGRAM_BOT_TOKEN` | Runtime (function) | Bot-token fra @BotFather |
| `TELEGRAM_CHAT_ID` | Runtime (function) | Målchat/gruppe for bestillinger |
| `VITE_OG_IMAGE_PATH` | Build (valgfri) | Delingsbilde, f.eks. `/Images/og-share.jpg` |
| `ORDER_PREVIEW_TELEGRAM` | Runtime (valgfri) | `1` for Telegram på deploy previews (kun test-bot) |
| `ORDER_CORS_ALLOW_ALL` | Runtime (valgfri) | `1` åpner CORS midlertidig — unngå i prod |

`VITE_*`-verdier injiseres ved **build**. Etter endring i Netlify: ny deploy (gjerne *Clear cache and deploy*).

Validering lokalt: `npm run order:check-env`

## Bestilling (Telegram)

Bestillinger sendes som meldinger til en konfigurert Telegram-chat — ikke som SMS. SMS-integrasjon er ikke implementert.

**Oppsett (engang):**

1. Opprett bot via @BotFather (`/newbot`) → `TELEGRAM_BOT_TOKEN`
2. Legg boten i målgruppe, send testmelding
3. Hent `chat.id` via `https://api.telegram.org/bot<TOKEN>/getUpdates` → `TELEGRAM_CHAT_ID`  
   (tom `getUpdates`: `/setprivacy` → Disable for boten)
4. Sett variabler i `.env` og Netlify; deploy på nytt

**API:** `netlify.toml` mapper `/api/order` til `netlify/functions/order.mjs`. CORS tillater konfigurerte origins (Netlify-URL, `*.netlify.app`, lokal Vite). Deploy previews returnerer `preview_disabled` (503) med mindre `ORDER_PREVIEW_TELEGRAM=1`.

Uten `VITE_ORDER_API_URL` er bestillingsskjemaet deaktivert (fallback: kontakt/telefon).

Kontaktdata: `src/config/contact.ts`

## Deploy (Netlify)

1. **Import** repository fra GitHub (`kasa031/oslolatte`)
2. Build: `npm run build` · Publish: `dist` (definert i `netlify.toml`)
3. Sett miljøvariabler (se tabell over)
4. Deploy og verifiser live URL

### Egendefinert domene (`oslolatte.no`)

1. Netlify → *Domain management* → legg til `oslolatte.no` (evt. `www`)
2. Oppdater DNS hos domeneleverandør i tråd med Netlify-panelet
3. Velg primary domain og redirect for alias
4. Sett `VITE_SITE_URL` til kanonisk HTTPS-URL (Production-kontekst)
5. Deploy; verifiser sitemap, QR og testbestilling til Telegram

`public/robots.txt` refererer til `https://oslolatte.no/sitemap.xml`. Ved `www` som primary: oppdater `robots.txt`, `VITE_SITE_URL` og deploy.

## Utviklerkommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run lint` | TypeScript, ESLint, `i18n:check`, enhetstester, git path-case |
| `npm run format:check` | Prettier (CI) |
| `npm run test:unit` | Vitest |
| `npm run test:e2e` | Playwright (lokal preview + functions) |
| `npm run test:e2e:url` | E2E mot deployet URL (`PLAYWRIGHT_BASE_URL`) |
| `npm run git:push-check` | Feiler ved sporet `.env` / hemmelighetsfiler |
| `npm run domain:check` | DNS/HTTP-sjekk for produksjonsdomene |
| `npm run build:analyze` | Bundle-rapport → `dist/stats.html` |
| `npm run dev:netlify` | Netlify Dev (samlet lokal stack) |

Etter `npm install`: `npx playwright install chromium webkit` (første gang, for E2E).

**Service worker:** ved breaking endringer i statiske assets, bump cache-navn i `public/sw.js` (`npm run build` kjører `bump-sw-cache.mjs`).

**Pre-lansering:** `preLaunch` i `src/data/opening.ts` stenger kalender og pauser bestilling til åpning.

## CI (GitHub Actions)

Ved push/PR til `main`: `npm ci`, `git:push-check`, `format:check`, `lint`, `build`, Lighthouse CI, Playwright (Chromium + WebKit). Workflow: `.github/workflows/ci.yml`.

Før push anbefales `npm run lint` og `npm run git:push-check` lokalt.

## Sikkerhet

- `.env` og `.env.*` er ignorert (unntatt `.env.example`)
- Telegram-token og tilsvarende nøkler skal kun ligge i lokalt miljø og Netlify
- Sårbarhetskontakt: `public/.well-known/security.txt`
- Intern dokumentasjon (`intern/`, `public/intern/`) er gitignored — se `docs/intern-lokalt.md`

## Personvern

Ingen analyse- eller markedsføringscookies. Språkvalg lagres lokalt i nettleseren. Personverntekst: `/side/kontakt` (personvern-seksjon).

## Lisens

Proprietær — se `LICENSE` («All Rights Reserved»).
