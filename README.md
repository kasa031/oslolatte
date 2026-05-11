# OsloLatte

Nettside for OsloLatte — React (Vite), TypeScript, Netlify.

## Git og GitHub

Prosjektet har **git lokalt** (`main`). Koble til GitHub slik:

1. Opprett et **nytt repository** på [github.com/new](https://github.com/new) (uten README om du vil unngå merge-konflikt — eller behold og bruk «pull» først).
2. I prosjektmappen:

```bash
git remote add origin https://github.com/DITTBRUKERNAVN/DITT-REPONAVN.git
git push -u origin main
```

Første gang ber Windows om innlogging: **Git Credential Manager** åpner nettleser, eller bruk **Personal Access Token** som «passord» om du blir spurt.

Etter push kjører **GitHub Actions** automatisk `npm ci`, `npm run lint` og `npm run build` (`.github/workflows/ci.yml`).

## Utvikling

```bash
npm install
npm run dev
```

Bygg:

```bash
npm run build
```

Automatiserte røyktester (Chromium — kjører `build` + `vite preview` lokalt):

```bash
npx playwright install chromium
npm run test:e2e
```

## Bestilling (Telegram eller e-post)

### SMS eller Telegram?

Nettsiden sender bestillinger til **Telegram** (app-melding til gruppa eller chatten din) — **ikke** som vanlig SMS til mobilnummer. Det er **gratis** å opprette en bot via Telegram.

**Ekte SMS** (f.eks. «varsling til telefon uten Telegram») krever vanligvis betaling (Twilio, GatewayAPI, osv.), egen konto og ny serverkode — det er **ikke** bygget inn i dette prosjektet ennå.

### Test bestilling fra forsiden — babysteg (hjemme / lokalt)

Målet: når du trykker «Send bestilling» på forsiden, skal en melding dukke opp i **Telegram-gruppa «Bestillinger»** (eller der du la boten).

1. **Installer avhengigheter** (én gang): `npm install`
2. **Lag en bot i Telegram:** åpne **@BotFather** → send `/newbot` → følg spørsmålene → **kopier token** (lang tekst). Det er `TELEGRAM_BOT_TOKEN`.
3. **Legg boten i gruppa:** åpne gruppa **Bestillinger** → legg til medlem → søk botnavnet → send en vanlig melding i gruppa (da vet Telegram at boten «hører til» gruppa).
4. **Finn chat-id:** i nettleser, åpne (bytt `DITT_TOKEN`):
   `https://api.telegram.org/botDITT_TOKEN/getUpdates`  
   Se etter `"chat":{"id": -1234567890 ...}` — tallet er `TELEGRAM_CHAT_ID`. Har gruppa offentlig lenke (f.eks. `@bestilling`), kan du i stedet prøve `TELEGRAM_CHAT_ID=@bestilling`.
   - Får du **tom** liste: i @BotFather → `/setprivacy` → velg boten → **Disable**. Send ny melding i gruppa og åpne lenken igjen.
5. **Opprett `.env` i prosjektmappen** (samme mappe som `package.json`): kopier innholdet fra `.env.example` og fyll inn **tre linjer**:
   - `VITE_ORDER_API_URL=/api/order`
   - `TELEGRAM_BOT_TOKEN=` … (fra punkt 2)
   - `TELEGRAM_CHAT_ID=` … (fra punkt 4)
6. **Start med Netlify Dev** (slik at `/api/order` finnes lokalt):

   ```bash
   npm run dev:netlify
   ```

7. **Åpne URL-en terminalen viser** — ofte `http://localhost:8888` (Netlify Dev). Bruk **den** adressen, ikke bare `5173`, når du tester full flyt.
8. Gå til **forsiden**, fyll ut bestillingsskjemaet, send. Du skal få grønn bekreftelse på siden og **ny melding i Telegram-gruppa**.

**Hurtigsjekk før du starter:** `npm run order:check-env` — skriptet leser `.env` / `.env.local` og sier fra om noe mangler.

**Feilsøking:** Kommer fortsatt Outlook/mailto? Da er `VITE_ORDER_API_URL` ikke med i miljøet som Vite bruker — sjekk at `.env` ligger i rotmappen og at du **startet på nytt** etter du lagret filen. Fungerer ikke Telegram? Sjekk Netlify-funksjonslogg eller at token/chat-id er riktig. Første gang du bruker Netlify CLI kan du måtte kjøre `npx netlify-cli login` i terminalen.

### Hvorfor åpnes Outlook i stedet for automatisk sending?

Nettsiden er laget slik: **uten** `VITE_ORDER_API_URL` brukes **mailto** (utkast i e-postprogrammet). Det er ikke en feil — da mangler miljøvariabelen i **det bygget du kjører**.

`VITE_*`-variabler settes inn **når Vite bygger**. Å legge dem bare inn i Netlify-nettleseren etterpå hjelper ikke før du **bygger og publiserer på nytt**.

### Slik får du automatisk sending (Telegram) på Netlify

1. **Site configuration → Environment variables** og legg inn:
   - `VITE_ORDER_API_URL` = `/api/order`
   - `TELEGRAM_BOT_TOKEN` og `TELEGRAM_CHAT_ID` (se `.env.example`)
2. **Deploys → Trigger deploy → Clear cache and deploy site** (eller ny push til repo).
3. Test på den **publiserte URL-en** — ikke `file://` eller ren `vite` uten API.

### Lokalt (kort)

- **`npm run dev`** — har vanligvis **ikke** `/api/order` → mailto.
- **`npm run dev:netlify`** — anbefalt for Telegram-test; legg **alle tre** variabler i **`.env`** i prosjektroten (se babysteg over).
- Alternativt: i `.env`, pek frontend mot allerede deployet API:  
  `VITE_ORDER_API_URL=https://ditt-prosjekt.netlify.app/api/order` og kjør `npm run dev`.

Teknisk: `netlify.toml` videresender `/api/order` til `netlify/functions/order.mjs`.

Kontaktinfo og valgfri WhatsApp: `src/config/contact.ts`.

## Gratis publisert URL (uten å kjøpe domene)

Du trenger **ikke** eget domene. Netlify gir en **gratis** adresse som `https://oslolatte-eller-noe-annet.netlify.app` (du velger delen før `.netlify.app` hvis den er ledig).

**Kort oppskrift**

1. **Kode på GitHub (gratis)**  
   - Opprett konto på [github.com](https://github.com) om du ikke har.  
   - Lag et **nytt repository** (kan være privat).  
   - Last opp prosjektfiler, eller bruk *Git* lokalt: `git init`, `git add .`, `git commit`, `git remote add origin …`, `git push`.  
   - Pass på at **`.env` ikke committes** (den står i `.gitignore`).

2. **Netlify (gratis lag)**  
   - Gå til [netlify.com](https://www.netlify.com) og logg inn — enklest med «Sign up with GitHub».  
   - **Add new site → Import an existing project → GitHub** → velg repoet.  
   - Bygg-innstillinger leses fra `netlify.toml`: **build** `npm run build`, **publish** `dist`.  
   - Trykk deploy. Etter noen minutter får du lenken som **Live URL**.

3. **Miljøvariabler på Netlify** (Telegram / ikke Outlook)  
   - Site configuration → **Environment variables**:  
     `VITE_ORDER_API_URL` = `/api/order`,  
     `TELEGRAM_BOT_TOKEN`,  
     `TELEGRAM_CHAT_ID`  
   - **Deploys → Trigger deploy** (med «Clear cache» om du vil være sikker), slik at nytt bygg får med `VITE_*`.

4. **QR-kode / plakat**  
   - Bruk den **ferdig publiserte** `https://….netlify.app`-adressen i QR-generator når du skal printe.

**Eget domene senere (valgfritt, koster vanligvis mer enn 30 kr/år)**  
Billige suffiks finnes (sjekk tilbud hos tilbyder), men **`.no`** og mange populære domener koster gjerne **flere hundre kroner per år**. Når du har kjøpt domene hos en registrar, kan du i Netlify under **Domain settings** koble det til samme site — Netlify hjelper med DNS-steg og **HTTPS er gratis**.

## Deploy (Netlify) — teknisk kort

1. Repo koblet til Netlify, build `npm run build`, publish `dist` (som over).
2. Miljøvariabler som over + ny deploy.
3. Valgfritt domene under *Domain settings*.

## Personvern

Ingen analyse-/markedsføringscookies (ingen Google Analytics el.l.); språkvalg lagres lokalt. Tekst på `/side/kontakt` under *Personvern*.

## Prosjektstatus (teknisk — i repo)

Dette er **ferdig satt opp i koden** (kjør `npm run lint`, `npm run build`, `npm run test:e2e` for bekreftelse):

| Område | Status |
|--------|--------|
| Nettside (forside, faner, kontakt, meny, kalender, Om oss) | Klart |
| Bestilling: mailto fallback + Netlify `/api/order` → Telegram | Klart (`netlify/functions/order.mjs`) |
| Miljø / testing | `npm run order:check-env`, `npm run dev:netlify`, `.env.example` |
| QR til nettside | Klart (`OrderQrAside`, bilde i `public/Images/`) |
| Vipps-blokk | Klart — fyll `src/config/vipps.ts` med betalingslenke fra portal |
| Intern oppstarts-/Vipps-dokumentasjon | `public/intern/forretning-start.html` |
| Automatiserte røyktester | Playwright — `npm run test:e2e` (5 tester) |

**Må gjøres utenfor repo (manuelt):** GitHub → Netlify deploy, miljøvariabler (`VITE_ORDER_API_URL`, Telegram), evt. eget domene. Se «Gratis publisert URL» og «Test bestilling» over.

## Før lansering (sjekkliste)

- **Automatisk:** `npm run test:e2e` skal vise grønt (bygg + kritisk navigasjon).
- Mobil og desktop: bestilling, meny (flipp), kalender, kontakt (manuelle klikk-test etter deploy).
- Nettlesere: Chrome, Safari/Edge, evt. Firefox.
- Tastatur: Tab gjennom skjema og menyknapp.
- **Plakat/QR:** QR-bilde ligger på siden — oppdater mål-URL i QR-generator når Netlify-adressen er endelig.
- **Telegram:** bekreft at testbestilling kommer i gruppa på **live** URL etter deploy.

