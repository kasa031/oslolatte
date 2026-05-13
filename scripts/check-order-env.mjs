/**
 * Sjekker at .env / .env.local har det som trengs for Telegram-bestilling.
 * Kjør: npm run order:check-env
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadMergedEnv } from './load-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const envPath = path.join(root, '.env');
const localPath = path.join(root, '.env.local');
const merged = loadMergedEnv(root);

const viteUrl = merged.VITE_ORDER_API_URL?.trim();
const token = merged.TELEGRAM_BOT_TOKEN?.trim();
const chatId = merged.TELEGRAM_CHAT_ID?.trim();
const publicGroup = merged.TELEGRAM_PUBLIC_GROUP?.trim();

console.log('\n=== OsloLatte — sjekk av bestilling (Telegram) ===\n');

let ok = true;

if (!viteUrl) {
  console.log('❌ VITE_ORDER_API_URL er ikke satt.');
  console.log('   → Da er nettbestilling skrudd av i grensesnittet (kun ring oss-lenke).');
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
  if (token && publicGroup?.startsWith('@')) {
    console.log('❌ TELEGRAM_CHAT_ID mangler — du har TELEGRAM_PUBLIC_GROUP satt.');
    console.log(
      '   → Kjør: npm run telegram:chat-id   (fyller TELEGRAM_CHAT_ID fra gruppenavnet)\n',
    );
  } else {
    console.log('❌ TELEGRAM_CHAT_ID mangler (gruppe-id eller offentlig @gruppe).');
    console.log(
      '   → Sett TELEGRAM_PUBLIC_GROUP=@ditt_gruppebrukernavn og kjør: npm run telegram:chat-id\n',
    );
  }
  ok = false;
} else {
  console.log(`✓ TELEGRAM_CHAT_ID er satt`);
}

if (!fs.existsSync(envPath) && !fs.existsSync(localPath)) {
  console.log('\n⚠ Fant verken .env eller .env.local.');
  console.log('  Kjør: npm run env:bootstrap\n');
  ok = false;
}

if (ok && viteUrl) {
  console.log(
    '\n→ Lokalt (anbefalt):  npm run dev:all   — starter API på :9888 og Vite på :5173 (eller neste ledige).\n' +
      '   Alternativ:          npm run dev:netlify  — én URL (ofte :8888).\n',
  );
} else {
  console.log(
    '\n→ Rett opp over (kopier .env.example → .env), lagre, kjør  npm run order:check-env  igjen.\n',
  );
}

process.exit(ok ? 0 : 1);
