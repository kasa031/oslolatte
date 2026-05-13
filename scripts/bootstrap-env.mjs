/**
 * Oppretter .env fra .env.example hvis den mangler.
 * Setter VITE_ORDER_API_URL=/api/order når linjen er tom.
 * TELEGRAM_* må du lime inn selv (hemmeligheter).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');
const examplePath = path.join(root, '.env.example');

if (!fs.existsSync(examplePath)) {
  console.error('Fant ikke .env.example');
  process.exit(1);
}

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(examplePath, envPath);
  console.log('Opprettet .env fra .env.example');
}

let raw = fs.readFileSync(envPath, 'utf8');

if (/^VITE_ORDER_API_URL=\s*$/m.test(raw)) {
  raw = raw.replace(/^VITE_ORDER_API_URL=\s*$/m, 'VITE_ORDER_API_URL=/api/order');
  fs.writeFileSync(envPath, raw, 'utf8');
  console.log('Satt VITE_ORDER_API_URL=/api/order');
}

console.log(
  '\nDu må fortsatt selv lime inn TELEGRAM_BOT_TOKEN og TELEGRAM_CHAT_ID i .env (fra BotFather og gruppa).',
);
console.log('Deretter: npm run dev:all\n');
