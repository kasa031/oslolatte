/**
 * Leser TELEGRAM_BOT_TOKEN fra .env, henter getUpdates, setter TELEGRAM_CHAT_ID.
 * Kjør etter at boten er i gruppa og det er sendt minst én melding der.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadMergedEnv } from './load-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const envPath = path.join(root, '.env');

const merged = loadMergedEnv(root);

const token = merged.TELEGRAM_BOT_TOKEN?.trim();
if (!token) {
  console.error('Mangler TELEGRAM_BOT_TOKEN i .env');
  process.exit(1);
}

const meRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
const meData = await meRes.json();
if (meData.ok && meData.result?.can_read_all_group_messages === false) {
  console.log(
    'Merk: Boten har «personvern» på — den ser ikke vanlige gruppemeldinger før du har nevnt boten eller skrudd av personvern i @BotFather (/setprivacy → Disable).\n',
  );
}

const explicitChat = merged.TELEGRAM_PUBLIC_GROUP?.trim() || merged.TELEGRAM_GROUP_USERNAME?.trim();
if (explicitChat && explicitChat.startsWith('@')) {
  const gc = await fetch(
    `https://api.telegram.org/bot${token}/getChat?chat_id=${encodeURIComponent(explicitChat)}`,
  );
  const gcData = await gc.json();
  if (gcData.ok && gcData.result?.id != null) {
    const chosen = gcData.result.id;
    const meta = {
      type: gcData.result.type,
      title:
        gcData.result.title || gcData.result.username || gcData.result.first_name || String(chosen),
    };
    let rawEnv = fs.readFileSync(envPath, 'utf8');
    const lines = rawEnv.split(/\r?\n/);
    let replaced = false;
    const out = lines.map((line) => {
      if (/^TELEGRAM_CHAT_ID=/.test(line)) {
        replaced = true;
        return `TELEGRAM_CHAT_ID=${chosen}`;
      }
      return line;
    });
    if (!replaced) out.push(`TELEGRAM_CHAT_ID=${chosen}`);
    fs.writeFileSync(envPath, out.join('\n'), 'utf8');
    console.log(`OK — TELEGRAM_CHAT_ID=${chosen} (fra getChat ${explicitChat})`);
    console.log(`   type: ${meta.type}, navn: ${meta.title}`);
    console.log('   Neste: npm run dev:all og test bestilling på http://localhost:5173');
    process.exit(0);
  }
  console.warn('Kunne ikke bruke TELEGRAM_PUBLIC_GROUP:', gcData.description || gcData);
}

/* Webhook gjør at getUpdates er tom — slett den først */
const delHook = await fetch(
  `https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=false`,
);
const delData = await delHook.json();
if (!delData.ok) {
  console.warn('deleteWebhook:', delData.description || delData);
}

async function fetchUpdates(timeoutSec = 0) {
  const qs =
    timeoutSec > 0 ? `limit=100&timeout=${Math.min(Math.max(timeoutSec, 1), 50)}` : 'limit=100';
  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?${qs}`);
  const data = await res.json();
  if (!data.ok) {
    console.error('Telegram API:', data.description || JSON.stringify(data));
    process.exit(1);
  }
  return data.result || [];
}

let updates = await fetchUpdates(0);

const pollRaw = merged.TELEGRAM_POLL_SECONDS ?? process.env.TELEGRAM_POLL_SECONDS ?? '';
const pollSec = Number.parseInt(String(pollRaw).trim(), 10);
if (updates.length === 0 && Number.isFinite(pollSec) && pollSec > 0) {
  const t = Math.min(Math.max(pollSec, 1), 50);
  const uname = meData.ok ? meData.result?.username : null;
  console.log(
    `Venter ${t}s (long poll). Send nå i gruppa: ${uname ? `@${uname} test` : 'en melding som @nevner boten'}\n`,
  );
  updates = await fetchUpdates(t);
}
const byId = new Map();

function rememberChat(c) {
  if (!c?.id) return;
  byId.set(c.id, {
    type: c.type,
    title: c.title || c.username || c.first_name || String(c.id),
  });
}

for (const u of updates) {
  const msg = u.message || u.channel_post || u.edited_message || u.callback_query?.message;
  if (msg?.chat) rememberChat(msg.chat);
  if (u.my_chat_member?.chat) rememberChat(u.my_chat_member.chat);
  if (u.chat_member?.chat) rememberChat(u.chat_member.chat);
}

if (byId.size === 0) {
  console.log(`
Ingen meldinger i getUpdates ennå (webhook er nå slettet fra denne kjøringen).

I gruppa: send en melding som **nevner boten**, f.eks.:
  @oslolatte_bestill_bot test
(standard «personvern» for boter gjør at vanlig «hei» ikke alltid når API-et.)

Alternativ: @BotFather → /setprivacy → velg boten → **Disable** → send ny melding i gruppa.

Tips: legg TELEGRAM_POLL_SECONDS=45 i .env og kjør igjen — da venter scriptet mens du sender.
Har gruppa offentlig @brukernavn? Sett TELEGRAM_PUBLIC_GROUP=@… (unngår getUpdates).

Kjør deretter igjen: npm run telegram:chat-id
`);
  process.exit(2);
}

let chosen = null;
for (const [id, meta] of byId) {
  if (meta.type === 'supergroup' || meta.type === 'group') {
    chosen = id;
    break;
  }
}
if (chosen == null) {
  chosen = [...byId.keys()][0];
}

const meta = byId.get(chosen);
let rawEnv = fs.readFileSync(envPath, 'utf8');
const lines = rawEnv.split(/\r?\n/);
let replaced = false;
const out = lines.map((line) => {
  if (/^TELEGRAM_CHAT_ID=/.test(line)) {
    replaced = true;
    return `TELEGRAM_CHAT_ID=${chosen}`;
  }
  return line;
});
if (!replaced) {
  out.push(`TELEGRAM_CHAT_ID=${chosen}`);
}
fs.writeFileSync(envPath, out.join('\n'), 'utf8');

console.log(`OK — TELEGRAM_CHAT_ID=${chosen}`);
console.log(`   type: ${meta?.type}, navn: ${meta?.title}`);
console.log('   Neste: npm run dev:all og test bestilling på http://localhost:5173');
