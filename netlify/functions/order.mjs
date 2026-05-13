/**
 * Mottar bestilling fra nettsiden og sender til Telegram (gratis bot-API).
 * Hemmeligheter via Netlify miljøvariabler: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
 * Deploy-preview / branch-deploy: POST returns preview_disabled (503) unless ORDER_PREVIEW_TELEGRAM=1.
 * Idempotency-Key / X-Idempotency-Key: optional replay protection (24 h, in-memory).
 * Valgfritt: RESEND_API_KEY + RESEND_ORDER_TO for e-postkopi (etter vellykket Telegram).
 *
 * Produksjon: ORDER_CORS_ALLOW_ALL=1 ignoreres når Netlify CONTEXT er «production» (tvungen eksplisitt CORS).
 *
 * Feltgrenser — hold i synk med `src/config/orderFieldLimits.ts`.
 */

import { randomUUID } from 'node:crypto';

function trimEnv(s) {
  if (s == null || typeof s !== 'string') return '';
  let v = s.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function headerGet(headers, name) {
  if (!headers || typeof headers !== 'object') return '';
  const want = name.toLowerCase();
  for (const k of Object.keys(headers)) {
    if (k.toLowerCase() === want) {
      const v = headers[k];
      return typeof v === 'string' ? v.trim() : '';
    }
  }
  return '';
}

function originLooksLikeNetlifyPreview(origin) {
  try {
    const u = new URL(origin);
    return u.protocol === 'https:' && u.hostname.endsWith('.netlify.app');
  } catch {
    return false;
  }
}

/** Lokal Vite / preview / Netlify Dev — samme opprinnelse som typisk brukt i repoet. */
function originLooksLikeLocalDev(origin) {
  try {
    const u = new URL(origin);
    if (u.protocol !== 'http:') return false;
    if (u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') return false;
    const port = u.port || '80';
    const localPorts = new Set(['4173', '5173', '5174', '5175', '5176', '5177', '5178', '8888', '9888', '9991']);
    return localPorts.has(port);
  } catch {
    return false;
  }
}

function collectExplicitOrigins() {
  const out = new Set();
  const extra = trimEnv(process.env.ORDER_ALLOWED_ORIGINS);
  if (extra) {
    for (const part of extra.split(',')) {
      const s = part.trim().replace(/\/$/, '');
      if (s) out.add(s);
    }
  }
  for (const key of ['URL', 'DEPLOY_PRIME_URL', 'DEPLOY_URL']) {
    const u = trimEnv(process.env[key]);
    if (u) out.add(u.replace(/\/$/, ''));
  }
  return out;
}

/**
 * @returns {'*'|string|null}  — null = ikke tillat (mangler Access-Control-Allow-Origin)
 */
function resolveCorsAllowOrigin(origin) {
  const allowAllRequested = trimEnv(process.env.ORDER_CORS_ALLOW_ALL) === '1';
  if (allowAllRequested && trimEnv(process.env.CONTEXT) === 'production') {
    const g = globalThis;
    if (!g.__oslolatteCorsAllowAllProdIgnoredLogged) {
      g.__oslolatteCorsAllowAllProdIgnoredLogged = true;
      console.log(
        JSON.stringify({
          ts: new Date().toISOString(),
          component: 'order',
          level: 'warn',
          msg: 'ORDER_CORS_ALLOW_ALL ignored_in_production',
        }),
      );
    }
  } else if (allowAllRequested) {
    return '*';
  }
  if (!origin) return '*';
  const o = origin.replace(/\/$/, '');
  const explicit = collectExplicitOrigins();
  if (explicit.has(o)) return origin;
  if (originLooksLikeNetlifyPreview(origin)) return origin;
  if (originLooksLikeLocalDev(origin)) return origin;
  return null;
}

function corsHeaders(event) {
  const origin = headerGet(event.headers, 'origin');
  const allow = resolveCorsAllowOrigin(origin);
  const h = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key, X-Idempotency-Key',
  };
  if (allow === '*') {
    h['Access-Control-Allow-Origin'] = '*';
  } else if (allow) {
    h['Access-Control-Allow-Origin'] = allow;
    h.Vary = 'Origin';
  }
  return h;
}

const PICKUP_KEYS = new Set(['none', 'weekday-am', 'weekday-pm', 'weekend', 'flex-call']);

const PICKUP_LINE_NB = {
  none: 'Henting: avtal i melding / Telegram',
  'weekday-am': 'Ønsket henting: ukedag formiddag (etter avtale)',
  'weekday-pm': 'Ønsket henting: ukedag ettermiddag/kveld (etter avtale)',
  weekend: 'Ønsket henting: helg (etter avtale)',
  'flex-call': 'Fleksibel — kunden ber om å bli ringt først',
};

const PICKUP_LINE_EN = {
  none: 'Pickup: agree in message / Telegram',
  'weekday-am': 'Preferred pickup: weekday morning (by appointment)',
  'weekday-pm': 'Preferred pickup: weekday afternoon/evening (by appointment)',
  weekend: 'Preferred pickup: weekend (by appointment)',
  'flex-call': 'Flexible — customer asks to be called first',
};

/** Telegram-/Resend-tekster per kundens locale (matcher nettsiden). */
const ORDER_STR = {
  nb: {
    tgTitle: 'Ny bestilling — OsloLatte',
    resendSubject: 'Kopi: Ny bestilling — OsloLatte',
    name: 'Navn',
    phone: 'Telefon',
    email: 'E-post',
    drink: 'Drikk',
    qty: 'Antall',
    pickup: 'Henting (veiledende)',
    allergies: 'Allergier',
    notes: 'Melding',
    langLine: 'Språk',
  },
  en: {
    tgTitle: 'New order — OsloLatte',
    resendSubject: 'Copy: New order — OsloLatte',
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    drink: 'Drink',
    qty: 'Quantity',
    pickup: 'Pickup (guidance)',
    allergies: 'Allergies',
    notes: 'Message',
    langLine: 'Site language',
  },
};

function effectiveOrderLocale(locale) {
  return String(locale || '')
    .trim()
    .toLowerCase() === 'en'
    ? 'en'
    : 'nb';
}

function pickupLine(slot, lang) {
  const map = lang === 'en' ? PICKUP_LINE_EN : PICKUP_LINE_NB;
  return map[slot] || map.none;
}

function formatTelegramMessage(payload) {
  const {
    name,
    phone,
    email,
    productLabel,
    qty,
    allergies,
    notes,
    locale,
    submittedAt,
    pickupSlot,
  } = payload;

  const lang = effectiveOrderLocale(locale);
  const L = ORDER_STR[lang];
  const slot = typeof pickupSlot === 'string' && PICKUP_KEYS.has(pickupSlot) ? pickupSlot : 'none';

  const lines = [
    `<b>${escapeHtml(L.tgTitle)}</b>`,
    '',
    `<b>${escapeHtml(L.name)}:</b> ${escapeHtml(name)}`,
    `<b>${escapeHtml(L.phone)}:</b> ${escapeHtml(phone)}`,
    `<b>${escapeHtml(L.email)}:</b> ${escapeHtml(email || '—')}`,
    `<b>${escapeHtml(L.drink)}:</b> ${escapeHtml(productLabel)}`,
    `<b>${escapeHtml(L.qty)}:</b> ${escapeHtml(String(qty))}`,
    `<b>${escapeHtml(L.pickup)}:</b> ${escapeHtml(pickupLine(slot, lang))}`,
    `<b>${escapeHtml(L.allergies)}:</b> ${escapeHtml(allergies)}`,
    `<b>${escapeHtml(L.notes)}:</b> ${escapeHtml(notes || '—')}`,
    '',
    `<i>${escapeHtml(L.langLine)}: ${escapeHtml(locale || '?')} · ${escapeHtml(submittedAt || '')}</i>`,
  ];

  return lines.join('\n');
}

function formatOrderPlainText(payload) {
  const {
    name,
    phone,
    email,
    productLabel,
    qty,
    allergies,
    notes,
    locale,
    submittedAt,
    pickupSlot,
  } = payload;
  const lang = effectiveOrderLocale(locale);
  const L = ORDER_STR[lang];
  const slot = typeof pickupSlot === 'string' && PICKUP_KEYS.has(pickupSlot) ? pickupSlot : 'none';
  const lines = [
    L.tgTitle,
    '',
    `${L.name}: ${String(name)}`,
    `${L.phone}: ${String(phone)}`,
    `${L.email}: ${String(email || '—')}`,
    `${L.drink}: ${String(productLabel)}`,
    `${L.qty}: ${String(qty)}`,
    `${L.pickup}: ${pickupLine(slot, lang)}`,
    `${L.allergies}: ${String(allergies)}`,
    `${L.notes}: ${String(notes || '—')}`,
    '',
    `${L.langLine}: ${String(locale || '?')} · ${String(submittedAt || '')}`,
  ];
  return lines.join('\n');
}

/** Valgfri e-postkopi via Resend (feiler stille — Telegram er primærkanal). */
async function tryResendOrderCopy(requestId, payload) {
  const key = trimEnv(process.env.RESEND_API_KEY);
  const toRaw = trimEnv(process.env.RESEND_ORDER_TO);
  if (!key || !toRaw) return;
  const from = trimEnv(process.env.RESEND_FROM) || 'OsloLatte <onboarding@resend.dev>';
  const to = toRaw
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);
  if (to.length === 0) return;
  const lang = effectiveOrderLocale(payload.locale);
  const subject = ORDER_STR[lang].resendSubject;
  const text = formatOrderPlainText(payload);
  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(12_000),
    });
  } catch (err) {
    logLine(requestId, 'warn', 'resend_copy_failed', { err: err?.name || String(err) });
    return;
  }
  if (!res.ok) {
    const errBody = await res.text();
    logLine(requestId, 'warn', 'resend_copy_http', { status: res.status, bodySnippet: errBody.slice(0, 200) });
  } else {
    logLine(requestId, 'info', 'resend_copy_ok');
  }
}

const ORDER_LIMITS = {
  name: 120,
  phone: 40,
  email: 254,
  allergies: 2000,
  notes: 2000,
  productLabel: 200,
  locale: 12,
  pickupSlot: 24,
};

const PRODUCT_IDS = new Set(['oslolatte-varm', 'oslokakao-varm', 'oslolatte-is', 'oslokakao-is']);

function logLine(requestId, level, msg, extra = {}) {
  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      component: 'order',
      requestId,
      level,
      msg,
      ...extra,
    }),
  );
}

/** Enkel streng-hash for duplikat-POST (dobbeltklikk / retry). */
function hashBodySignature(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h, 33) ^ s.charCodeAt(i);
  }
  return String(h >>> 0);
}

function getClientIp(event) {
  const h = event.headers || {};
  const xf = h['x-forwarded-for'] || h['X-Forwarded-For'];
  if (typeof xf === 'string' && xf.trim()) {
    return xf.split(',')[0].trim().slice(0, 120);
  }
  const cip = h['client-ip'] || h['Client-IP'];
  if (typeof cip === 'string' && cip.trim()) {
    return cip.trim().slice(0, 120);
  }
  return 'unknown';
}

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 45;
/** Sekunder — brukes i Retry-After ved 429 (matcher rate-vinduet). */
const RATE_RETRY_AFTER_SEC = Math.ceil(RATE_WINDOW_MS / 1000);

/** Minnebasert rate limit per IP (warm Lambda / samme instans). */
function checkRateLimit(ip, requestId) {
  const g = globalThis;
  if (!g.__oslolatteRateLimit) g.__oslolatteRateLimit = new Map();
  const map = g.__oslolatteRateLimit;
  const now = Date.now();
  for (const [key, stamps] of map) {
    const pruned = stamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (pruned.length === 0) map.delete(key);
    else map.set(key, pruned);
  }
  let stamps = map.get(ip) || [];
  stamps = stamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (stamps.length >= RATE_MAX) {
    logLine(requestId, 'warn', 'rate_limit', { ip: ip.slice(0, 24) });
    return false;
  }
  stamps.push(now);
  map.set(ip, stamps);
  return true;
}

export async function handler(event) {
  const origin = headerGet(event.headers, 'origin');

  if (event.httpMethod === 'OPTIONS') {
    if (origin && resolveCorsAllowOrigin(origin) === null) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
        body: 'Forbidden',
      };
    }
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }

  const headers = corsHeaders(event);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'method' }) };
  }

  const requestId = randomUUID();

  if (origin && resolveCorsAllowOrigin(origin) === null) {
    logLine(requestId, 'warn', 'cors_post_denied', { origin: origin.slice(0, 120) });
    return {
      statusCode: 403,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff' },
      body: JSON.stringify({ ok: false, error: 'cors' }),
    };
  }

  /** Unngå at PR-previews sender til produksjons-Telegram når samme Netlify-env arves. */
  const netlifyContext = trimEnv(process.env.CONTEXT);
  if (
    (netlifyContext === 'deploy-preview' || netlifyContext === 'branch-deploy') &&
    trimEnv(process.env.ORDER_PREVIEW_TELEGRAM) !== '1'
  ) {
    logLine(requestId, 'info', 'preview_orders_disabled', { context: netlifyContext });
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'preview_disabled',
        message:
          'Orders disabled on deploy previews. Set ORDER_PREVIEW_TELEGRAM=1 for a test chat only, or test with npm run dev:all.',
      }),
    };
  }

  const clientIp = getClientIp(event);
  if (!checkRateLimit(clientIp, requestId)) {
    return {
      statusCode: 429,
      headers: { ...headers, 'Retry-After': String(RATE_RETRY_AFTER_SEC) },
      body: JSON.stringify({ ok: false, error: 'rate_limit' }),
    };
  }

  const rawBody = event.body ?? '';
  if (typeof rawBody === 'string' && rawBody.length > 24_000) {
    logLine(requestId, 'warn', 'payload_too_large', { len: rawBody.length });
    return { statusCode: 413, headers, body: JSON.stringify({ ok: false, error: 'payload_too_large' }) };
  }

  const token = trimEnv(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = trimEnv(process.env.TELEGRAM_CHAT_ID);

  if (!token || !chatId) {
    logLine(requestId, 'error', 'missing_env');
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ ok: false, error: 'missing_env' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(rawBody || '{}');
  } catch {
    logLine(requestId, 'warn', 'json_parse_error');
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'json' }) };
  }

  const hp =
    typeof payload.company === 'string'
      ? payload.company.trim()
      : typeof payload.website === 'string'
        ? payload.website.trim()
        : '';
  if (hp) {
    logLine(requestId, 'info', 'honeypot_discard');
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const allergies = typeof payload.allergies === 'string' ? payload.allergies.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const notes = typeof payload.notes === 'string' ? payload.notes.trim() : '';
  const productLabel = typeof payload.productLabel === 'string' ? payload.productLabel.trim() : '';
  const locale = typeof payload.locale === 'string' ? payload.locale.trim() : '';
  const productId = typeof payload.productId === 'string' ? payload.productId.trim() : '';
  const submittedAt = typeof payload.submittedAt === 'string' ? payload.submittedAt.trim() : '';
  const pickupSlot = typeof payload.pickupSlot === 'string' ? payload.pickupSlot.trim() : 'none';

  if (
    name.length > ORDER_LIMITS.name ||
    phone.length > ORDER_LIMITS.phone ||
    email.length > ORDER_LIMITS.email ||
    allergies.length > ORDER_LIMITS.allergies ||
    notes.length > ORDER_LIMITS.notes ||
    productLabel.length > ORDER_LIMITS.productLabel ||
    locale.length > ORDER_LIMITS.locale ||
    pickupSlot.length > ORDER_LIMITS.pickupSlot ||
    submittedAt.length > 40
  ) {
    logLine(requestId, 'warn', 'field_too_long');
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'field_too_long' }) };
  }

  if (!PRODUCT_IDS.has(productId)) {
    logLine(requestId, 'warn', 'invalid_product', { productId });
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'product' }) };
  }

  if (!PICKUP_KEYS.has(pickupSlot)) {
    logLine(requestId, 'warn', 'invalid_pickup', { pickupSlot });
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'pickup' }) };
  }

  if (!name || !phone || !allergies) {
    logLine(requestId, 'warn', 'required_missing');
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'required' }) };
  }

  const qty = Number(payload.qty);
  if (!Number.isFinite(qty) || qty < 1 || qty > 50) {
    logLine(requestId, 'warn', 'invalid_qty', { qty: payload.qty });
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'qty' }) };
  }

  payload.pickupSlot = pickupSlot;

  const rawBodyStr = typeof rawBody === 'string' ? rawBody : '';
  const bodySig = hashBodySignature(rawBodyStr);

  const idemRaw =
    headerGet(event.headers, 'idempotency-key') || headerGet(event.headers, 'x-idempotency-key');
  const idemKey = typeof idemRaw === 'string' && idemRaw.trim() ? idemRaw.trim().slice(0, 128) : '';

  const IDEM_TTL_MS = 86_400_000;
  if (idemKey) {
    const gId = globalThis;
    if (!gId.__oslolatteIdempotency) gId.__oslolatteIdempotency = new Map();
    const idemMap = gId.__oslolatteIdempotency;
    const nowId = Date.now();
    for (const [k, v] of idemMap) {
      if (nowId - v.ts > IDEM_TTL_MS) idemMap.delete(k);
    }
    const existing = idemMap.get(idemKey);
    if (existing) {
      if (existing.bodySig === bodySig) {
        logLine(requestId, 'info', 'idempotency_replay');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ ok: true, idempotent: true }),
        };
      }
      logLine(requestId, 'warn', 'idempotency_conflict', { idemKey: idemKey.slice(0, 24) });
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ ok: false, error: 'idempotency_conflict' }),
      };
    }
  }

  const g = globalThis;
  if (!g.__oslolatteOrderDedup) g.__oslolatteOrderDedup = new Map();
  const dedupMap = g.__oslolatteOrderDedup;
  const nowMs = Date.now();
  for (const [sig, t] of dedupMap) {
    if (nowMs - t > 120_000) dedupMap.delete(sig);
  }
  const prev = dedupMap.get(bodySig);
  if (prev !== undefined && nowMs - prev < 15_000) {
    logLine(requestId, 'info', 'duplicate_body_skip');
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, duplicate: true }) };
  }
  dedupMap.set(bodySig, nowMs);

  logLine(requestId, 'info', 'telegram_send_start', { qty });
  let text = formatTelegramMessage(payload);
  const maxTelegramText = 3900;
  if (text.length > maxTelegramText) {
    text =
      text.slice(0, maxTelegramText - 80) +
      '\n\n<i>… (kortet ned — Telegram har grense på meldingslengde)</i>';
  }

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  let tgRes;
  try {
    tgRes = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    logLine(requestId, 'error', 'telegram_timeout', { err: err?.name || String(err) });
    return {
      statusCode: 504,
      headers,
      body: JSON.stringify({ ok: false, error: 'telegram_timeout' }),
    };
  }

  if (!tgRes.ok) {
    const errText = await tgRes.text();
    logLine(requestId, 'error', 'telegram_http_error', { status: tgRes.status, bodySnippet: errText.slice(0, 200) });

    let telegramCode = 'unknown';
    try {
      const j = JSON.parse(errText);
      const desc = String(j.description || '').toLowerCase();
      if (desc.includes('chat not found') || desc.includes('chat_id is empty')) {
        telegramCode = 'chat_not_found';
      } else if (desc.includes('bot was blocked') || desc.includes('forbidden')) {
        telegramCode = 'blocked';
      } else if (desc.includes('kicked') || desc.includes('left')) {
        telegramCode = 'kicked';
      } else if (desc.includes('message is too long')) {
        telegramCode = 'too_long';
      }
    } catch {
      /* body not json */
    }

    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ ok: false, error: 'telegram', telegramCode }),
    };
  }

  logLine(requestId, 'info', 'telegram_ok');
  await tryResendOrderCopy(requestId, payload);
  if (idemKey) {
    const gId = globalThis;
    if (!gId.__oslolatteIdempotency) gId.__oslolatteIdempotency = new Map();
    gId.__oslolatteIdempotency.set(idemKey, { bodySig, ts: Date.now() });
  }
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true }),
  };
}
