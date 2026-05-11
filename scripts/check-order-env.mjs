/**
 * Sjekker at .env / .env.local har det som trengs for Telegram-bestilling.
 * Kjør: npm run order:check-env
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const envPath = path.join(root, '.env');
const localPath = path.join(root, '.env.local');
const merged = { ...parseEnvFile(envPath), ...parseEnvFile(localPath) };

const viteUrl = merged.VITE_ORDER_API_URL?.trim();
const token = merged.TELEGRAM_BOT_TOKEN?.trim();
const chatId = merged.TELEGRAM_CHAT_ID?.trim();

console.log('\n=== OsloLatte — sjekk av bestilling (Telegram) ===\n');

let ok = true;

if (!viteUrl) {
  console.log('❌ VITE_ORDER_API_URL er ikke satt.');
  console.log('   → Da bruker siden mailto (Outlook), ikke Telegram.');
  console.log('   → Legg til i .env: VITE_ORDER_API_URL=/api/order\n');
  ok = false;
} else {
  console.log(`✓ VITE_ORDER_API_URL=${viteUrl}`);
}

if (!token) {
  console.log('❌ TELEGRAM_BOT_TOKEN mangler (fra @BotFather).');
  ok = false;
} else {
  console.log(`✓ TELEGRAM_BOT_TOKEN er satt (${token.length} tegn)`);
}

if (!chatId) {
  console.log('❌ TELEGRAM_CHAT_ID mangler (gruppe-id eller @brukernavn).');
  ok = false;
} else {
  console.log(`✓ TELEGRAM_CHAT_ID er satt`);
}

if (!fs.existsSync(envPath) && !fs.existsSync(localPath)) {
  console.log('\n⚠ Fant verken .env eller .env.local i prosjektmappen.');
  console.log('  Kopier .env.example til .env og fyll inn verdiene.\n');
  ok = false;
}

if (ok && viteUrl) {
  console.log(
    '\n→ Neste steg: kjør  npm run dev:netlify  og åpne URL-en terminalen viser.\n',
  );
} else {
  console.log('\n→ Rett opp over, lagre filen, og kjør denne sjekken igjen.\n');
}

process.exit(0);
