# OsloLatte

**OsloLatte** er produktet (signaturkaffe / -kakao). **KoppStopp** er bedriften bak.  
Nettsiden er bygget med React (Vite), TypeScript og Netlify.

## Git og GitHub

Prosjektet **må** ligge i et Git-repo for at Netlify skal kunne hente kode derfra (vanligvis **GitHub**). Du trenger **ikke** å publisere hemmeligheter i GitHub — de ligger i **lokal `.env`** (som aldri committes) og i **Netlify → Environment variables**.

### Før du pusher til GitHub (sikkerhet)

1. Kjør **`npm run lint`** lokalt — samme type sjekk som CI (TypeScript, ESLint, i18n, enhetstester, git path-case). Fiks feil før push.
2. **`.env` finnes ikke i Git** — den er listet i `.gitignore` sammen med `.env.*` (unntatt `.env.example`, som bare er mal med plassholdere).
3. Kjør **`npm run git:push-check`**: den feiler hvis noe som ligner `.env` med hemmeligheter er blitt `git add`-et ved et uhell.
4. **Telegram-token, Resend-nøkkel, Sentry DSN** osv. settes **kun** i `.env` lokalt og i **Netlify** — aldri i commit-meldinger, issues eller kodefiler.
5. Netlify CLI-mappa **`.netlify/`** er ignorert (lokal state).
6. **Intern dokumentasjon** (`public/intern/`, rotmappa `intern/`): **standard** er at den **ikke** pushes til public GitHub — notater blir på **din maskin** (se **`docs/intern-lokalt.md`**). Netlify-bygg fra Git får da ikke `/intern/…` på live. Kjør `git rm -r --cached public/intern intern` om noe av dette tidligere ble committet ved et uhell.

Prosjektet har **git lokalt** (`main`). **GitHub-repo:** [github.com/kasa031/oslolatte](https://github.com/kasa031/oslolatte) (HTTPS: `https://github.com/kasa031/oslolatte.git`).

Opprett repoet på [github.com/new](https://github.com/new) om det ikke finnes (repo-navn **oslolatte**, bruker **kasa031**). I prosjektmappen:

```bash
git remote add origin https://github.com/kasa031/oslolatte.git
# Har du allerede origin med feil URL?
# git remote set-url origin https://github.com/kasa031/oslolatte.git
git push -u origin main
```

Første gang ber Windows om innlogging: **Git Credential Manager** åpner nettleser, eller bruk **Personal Access Token** som «passord» om du blir spurt.

Etter push kjører **GitHub Actions** automatisk `npm ci`, informativ `npm audit --audit-level=high` (feiler ikke bygget), `npm run format:check`, `npm run lint` (TypeScript, ESLint, `i18n:check`, Vitest, git path-case-sjekk), `npm run build`, Lighthouse, og **Playwright på Chromium og WebKit** (`.github/workflows/ci.yml`).

## Utvikling

```bash
npm install
npm run dev
```

### Mer for utviklere (repo)

| Kommando / fil | Hva |
|----------------|-----|
| `npm run dev:all` | Lokal bestilling: Vite + Netlify functions (Telegram). |
| `.env.example` | Mal for `VITE_ORDER_API_URL`, Telegram, `VITE_SITE_URL`, valgfri `VITE_OG_IMAGE_PATH` (delingsbilde), `VITE_GOOGLE_SITE_VERIFICATION`, CORS (`ORDER_*`, `ORDER_PREVIEW_TELEGRAM`). |
| `npm run git:push-check` | Før push til GitHub: feiler hvis `.env` / `.env.*` (unntatt `.env.example`) er sporet av git. |
| `npm run test:unit` | Vitest — i dag `orderFieldLimits` (grenser mot backend); kjører som del av `npm run lint`. |
| `npm run verify:git-paths` | Avslører case-kollisjoner i `git ls-files` (Windows/Linux); kjører som del av `npm run lint`. |
| `npm run test:e2e` | Playwright: `e2e:web` starter functions (standard **9991** for å ikke kollidere med **9888** under `dev:all`) + `vite preview` (standard **4173**, styrt av `scripts/e2e-preview-port.mjs`). Overstyr med **E2E_FUNCTIONS_PORT** og valgfritt **E2E_PREVIEW_PORT** (må da også tillates i CORS-lista i `order.mjs` om den ikke allerede er der). Røyk, axe, mocket bestilling, API-health. **WebKit:** `serviceWorkers: 'block'`. |
| `npm run test:e2e:url` | Samme E2E mot **allerede deployet** URL: sett `PLAYWRIGHT_BASE_URL=https://oslolatte.no` (uten `/` til slutt), deretter kommandoen. Starter **ikke** lokal preview. Bestillings-testen **mocker** fortsatt `POST /api/order` (ingen ekte Telegram). Krever at prod-siden er tilgjengelig. |
| `npm run domain:check` | Sjekker `oslolatte.no` (eller `DOMAIN=www.oslolatte.no …`): DNS A/AAAA, HTTP/HTTPS-svar, kort tolkning ved f.eks. ERR_CONNECTION_REFUSED. Detaljert DNS-følger du i **Domeneshop** og **Netlify → Domain management**. |
| Skrifter (`@fontsource-*` i `src/main.tsx`) | Cormorant Garamond, DM Sans, Fraunces, Newsreader og Great Vibes **self-hostes** (OFL) — ingen Google Fonts-forespørsel i nettleseren. |
| `npm run i18n:check` | Sjekker at `translations.ts` har samme streng-nøkler for nb og en (kjører også som del av `npm run lint`). |
| `npm run build:analyze` | TypeScript-bygg + Vite med `rollup-plugin-visualizer` → åpne `dist/stats.html` etter kjøring (bundel/treemap). |
| `src/config/siteMeta.ts` | Manuell «siste oppdatert»-dato i footer og **sitemap `<lastmod>`** ved produksjonsbygg. |
| `public/.well-known/security.txt` | Kontakt for sårbarhetsrapportering (RFC 9116). |
| `docs/intern-lokalt.md` | Standard: internnotat på **maskinen**, ikke på public GitHub; hvorfor mappene er gitignored. |
| `LICENSE` | Proprietær («All Rights Reserved»). Bytt til f.eks. MIT om dere vil tillate gjenbruk av kildekode av andre. |

Etter første `npm install`: `npx playwright install chromium webkit` (én gang per maskin) før `npm run test:e2e`.

**Service worker** (`public/sw.js`): ved store CSS-/JS-endringer som brukere ikke får med seg, bump cache-navnet i filen og deploy på nytt.

Bygg:

```bash
npm run build
```

## Bestilling (Telegram)

### SMS eller Telegram?

Nettsiden sender bestillinger til **Telegram** (app-melding til gruppa eller chatten din) — **ikke** som vanlig SMS til mobilnummer. Det er **gratis** å opprette en bot via Telegram.

**Ekte SMS** (f.eks. «varsling til telefon uten Telegram») krever vanligvis betaling (Twilio, GatewayAPI, osv.), egen konto og ny serverkode — det er **ikke** bygget inn i dette prosjektet ennå.

### Hva som er automatisert vs. hva bare du kan gjøre

**Allerede i repo / kommandoer** (ingen manuell kopiering av `.env.example` nødvendig):

```bash
npm run env:bootstrap   # oppretter .env fra mal, sørger for VITE_ORDER_API_URL=/api/order
npm run dev:all         # sjekker miljø, starter API + nettside — åpne http://localhost:5173
```

**Strengt talt bare du kan** — jeg kan ikke gjøre dette fra kode (hemmeligheter og din konto):

| Oppgave | Hvorfor |
|--------|---------|
| **Hente token** fra @BotFather (`/newbot`) og lime inn som `TELEGRAM_BOT_TOKEN` i `.env` | Hemmelig som bare Telegram gir deg |
| **Finne chat-id** for gruppa (f.eks. via `getUpdates`) og lime inn som `TELEGRAM_CHAT_ID` | Kun synlig for din gruppe/bot |
| **Logge inn på Netlify** og legge inn de tre variablene under Environment variables + **ny deploy** | Krever din Netlify-bruker |

### Telegram-trinn (én gang)

1. **@BotFather** → `/newbot` → kopier **token** til `TELEGRAM_BOT_TOKEN=` i `.env`.
2. Legg **boten i gruppa**, send en melding i gruppa.
3. Åpne `https://api.telegram.org/botDITT_TOKEN/getUpdates` og finn `"chat":{"id":…}` → det er **TELEGRAM_CHAT_ID** (eller bruk `@gruppenavn` om gruppa er offentlig).
   - Tom liste: @BotFather → `/setprivacy` → **Disable** for boten, send ny melding i gruppa.
4. `npm run order:check-env` skal vise grønt før du tester.

**Alternativ lokalt:** `npm run dev:netlify` — bruk URL fra terminalen (ofte `:8888`).

**Feilsøking · 503 «mangler Telegram»:** Da kjører du **`npm run dev`** uten **`npm run dev:functions`**, eller `.env` mangler token/chat-id. Bruk **`npm run dev:all`** i stedet for å huske begge deler. Etter endring i `.env`: stopp terminalen (Ctrl+C) og start `dev:all` på nytt.

**Feilsøking · grått skjema:** `VITE_ORDER_API_URL` mangler i miljøet Vite leser — `.env` i rotmappen og restart av dev-server.

**Netlify:** Samme tre variabler under Site → Environment variables + **ny deploy**. Sjekk funksjonslogg ved feil.

### Hvorfor virker ikke «Send bestilling»?

Uten `VITE_ORDER_API_URL` er **skjemaet deaktivert** og det vises beskjed om å ringe. Nettbestilling krever at variabelen er satt i **det bygget du kjører** (lokalt i `.env`, på Netlify under Environment variables + ny deploy).

`VITE_*`-variabler settes inn **når Vite bygger**. Å legge dem bare inn i Netlify-nettleseren etterpå hjelper ikke før du **bygger og publiserer på nytt**.

### Slik får du automatisk sending (Telegram) på Netlify

1. **Site configuration → Environment variables** og legg inn:
   - `VITE_ORDER_API_URL` = `/api/order`
   - `TELEGRAM_BOT_TOKEN` og `TELEGRAM_CHAT_ID` (se `.env.example`)
2. **Deploys → Trigger deploy → Clear cache and deploy site** (eller ny push til repo).
3. Test på den **publiserte URL-en** — ikke `file://` eller ren `vite` uten API.

### Lokalt (kort)

- **`npm run dev:all`** — **bruk denne** til Telegram-test: starter API (:9888) + Vite (:5173 eller neste ledige), med miljøsjekk først.
- **`npm run dev`** alene — kun frontend; `/api/order` finnes ikke uten `dev:functions` → 404/503.
- **`npm run dev:netlify`** — alt i én prosess (URL ofte :8888).
- Uten lokal API: i `.env` kan du sette `VITE_ORDER_API_URL=https://oslolatte.no/api/order` (når prod er oppe) eller midlertidig `https://….netlify.app/api/order`, og kjøre bare `npm run dev`.

Teknisk: `netlify.toml` videresender `/api/order` til `netlify/functions/order.mjs`. **CORS:** funksjonen svarer bare med `Access-Control-Allow-Origin` for tillatte Origins (Netlify-URL-er, `*.netlify.app`, lokal Vite — se `.env.example`); `Access-Control-Allow-Headers` inkluderer `Idempotency-Key` for skjemaet. Midlertidig åpning: `ORDER_CORS_ALLOW_ALL=1` (unngå i prod). **Deploy previews:** `POST /api/order` returnerer `preview_disabled` (503) på Netlify `deploy-preview` / `branch-deploy` med mindre `ORDER_PREVIEW_TELEGRAM=1` er satt (kun med test-bot og test-chat).

Kontaktinfo og valgfri WhatsApp: `src/config/contact.ts`.

## Gratis publisert URL (uten å kjøpe domene)

**Kanonisk adresse:** `https://oslolatte.no` (egen .no-domene). Inntil DNS peker dit kan Netlify gi en **gratis** mellom-URL som `https://….netlify.app` (du velger delen før `.netlify.app` hvis den er ledig).

**Kort oppskrift**

1. **Kode på GitHub (gratis)**  
   - Opprett konto på [github.com](https://github.com) om du ikke har.  
   - Repo for denne koden: **[kasa031/oslolatte](https://github.com/kasa031/oslolatte)** (`git remote` → `https://github.com/kasa031/oslolatte.git`).  
   - Last opp med *Git* lokalt: `git init`, `git add .`, `git commit`, `git remote add origin https://github.com/kasa031/oslolatte.git`, `git push -u origin main` (se også avsnittet [Git og GitHub](#git-og-github) over).  
   - Pass på at **`.env` ikke committes** (den står i `.gitignore`).

2. **Netlify (gratis lag)**  
   - Gå til [netlify.com](https://www.netlify.com) og logg inn — enklest med «Sign up with GitHub».  
   - **Add new site → Import an existing project → GitHub** → velg repoet.  
   - Bygg-innstillinger leses fra `netlify.toml`: **build** `npm run build`, **publish** `dist`.  
   - Trykk deploy. Etter noen minutter får du lenken som **Live URL**.

3. **Miljøvariabler på Netlify** (Telegram / nettbestilling)  
   - Site configuration → **Environment variables**:  
     `VITE_ORDER_API_URL` = `/api/order`,  
     `TELEGRAM_BOT_TOKEN`,  
     `TELEGRAM_CHAT_ID`  
   - **Deploys → Trigger deploy** (med «Clear cache» om du vil være sikker), slik at nytt bygg får med `VITE_*`.

4. **QR-kode / plakat**  
   - Bruk den **ferdig publiserte** adressen i QR-generator når du skal printe — målet er `https://oslolatte.no`; inntil DNS er aktiv, bruk Netlify-URL-en.

**Eget domene** — se avsnittet [Lansering med oslolatte.no](#lansering-med-oslolatteno) under når Norid/Domeneshop har aktivert domenet.

## Lansering med oslolatte.no

**Sjekkliste:** følg **Netlify** (domene + DNS som panelet viser) og **Domeneshop** (legg inn postene nøyaktig som Netlify ber om). Du kan evt. ha et eget notat **utenfor** repo (eller i den gitignored `public/intern/` — se `docs/intern-lokalt.md`).

Når domenet er **betalt og aktivt** hos forhandler (Domeneshop), og Netlify-siden allerede fungerer på `*.netlify.app`:

1. **Netlify** → *Domain management* → **Add domain** → skriv `oslolatte.no` (og eventuelt `www.oslolatte.no` om dere vil bruke begge).
2. **DNS hos Domeneshop** — legg inn nøyaktig de postene Netlify viser (ofte **CNAME** for `www`, og for **apex** (`@`) A- eller ALIAS-poster mot Netlify — følg panelet; «vent på DNS» er normalt til propagering er ferdig).
3. **Primary domain** — i Netlify, velg én kanonisk adresse (f.eks. bare `https://oslolatte.no` eller bare `https://www.oslolatte.no`). Slå på redirect fra den andre om dere har begge.
4. **Miljøvariabel** — under *Environment variables*, sett `VITE_SITE_URL` til **den kanoniske URL-en uten slash til slutt**, f.eks. `https://oslolatte.no`. Sett den gjerne kun for **Production**-kontekst, så PR-previews ikke får feil canonical/sitemap. **Trigger deploy** (gjerne *Clear cache and deploy*).
5. **Valgfritt delingsbilde** — for bedre «link preview» (ca. 1200×630 px): legg fil i `public/Images/` (f.eks. `og-share.jpg`) og sett `VITE_OG_IMAGE_PATH=/Images/og-share.jpg` i samme Netlify-miljø, deretter ny deploy.
6. **robots.txt** — `public/robots.txt` inneholder allerede `Sitemap: https://oslolatte.no/sitemap.xml`. Hvis dere velger **www** som primary, oppdater den linjen + `VITE_SITE_URL` tilsvarende og deploy.
7. **Test** — åpne `https://oslolatte.no` (eller www), send testbestilling til Telegram, sjekk at QR og deling bruker riktig rot.

Egne domene-/DNS-notater kan du holde **utenfor public Git** (f.eks. Domeneshop, passordmanager, eller valgfritt under gitignored `public/intern/` — `docs/intern-lokalt.md`).

## Deploy (Netlify) — teknisk kort

1. Repo koblet til Netlify, build `npm run build`, publish `dist` (som over).
2. Miljøvariabler som over + ny deploy.
3. Valgfritt domene under *Domain settings*.

## Personvern

Ingen analyse-/markedsføringscookies (ingen Google Analytics el.l.); språkvalg lagres lokalt. Tekst på `/side/kontakt` under *Personvern*.

## Prosjektstatus (teknisk — i repo)

Dette er **ferdig satt opp i koden** (kjør `npm run lint`, `npm run build`, `npm run test:e2e` for bekreftelse — `lint` inkluderer enhetstester og git path-sjekk):

| Område | Status |
|--------|--------|
| Nettside (forside, faner, kontakt, meny, kalender, Om oss) | Klart |
| Bestilling: Netlify `/api/order` → Telegram (uten URL: skjema av + ring oss) | Klart (`netlify/functions/order.mjs`) |
| Miljø / testing | `npm run order:check-env`, `npm run dev:all`, `npm run dev:netlify`, `.env.example` |
| QR til nettside | Klart (`OrderQrAside`, bilde i `public/Images/`) |
| Vipps-blokk | Klart — fyll `src/config/vipps.ts` med betalingslenke fra portal |
| Intern oppstarts-/Vipps-notater | **Valgfritt lokalt:** gitignored `public/intern/` eller egen privat lagring (`docs/intern-lokalt.md`) |
| Automatiserte røyktester | Playwright — `npm run test:e2e` (Chromium + WebKit: røyk, axe, mocket bestilling) |

**Må gjøres utenfor repo (manuelt):** GitHub → Netlify deploy, miljøvariabler (`VITE_ORDER_API_URL`, Telegram), `VITE_SITE_URL` når eget domene er klart. Se «Gratis publisert URL», [Lansering med oslolatte.no](#lansering-med-oslolatteno) og «Test bestilling» over.

## Før lansering (sjekkliste)

- **Domene:** Når `oslolatte.no` er aktivt: DNS → Netlify, `VITE_SITE_URL` — se [Lansering med oslolatte.no](#lansering-med-oslolatteno). `robots.txt` peker allerede på sitemap for oslolatte.no.
- **Automatisk:** `npm run test:e2e` skal vise grønt (bygg + kritisk navigasjon).
- Mobil og desktop: bestilling, meny (flipp), kalender, kontakt (manuelle klikk-test etter deploy).
- Nettlesere: Chrome, Safari/Edge, evt. Firefox.
- Tastatur: Tab gjennom skjema og menyknapp.
- **Plakat/QR:** På nettsiden genereres QR dynamisk fra `VITE_SITE_URL`; fallback er `public/Images/QRkode_bestilling.png` for plakat uten nett.
- **Telegram:** bekreft at testbestilling kommer i gruppa på **live** URL etter deploy.

