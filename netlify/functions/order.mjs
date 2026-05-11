/**
 * Mottar bestilling fra nettsiden og sender til Telegram (gratis bot-API).
 * Hemmeligheter kun via Netlify miljøvariabler: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

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
  } = payload;

  const lines = [
    '<b>Ny bestilling — OsloLatte</b>',
    '',
    `<b>Navn:</b> ${escapeHtml(name)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    `<b>E-post:</b> ${escapeHtml(email || '—')}`,
    `<b>Drikk:</b> ${escapeHtml(productLabel)}`,
    `<b>Antall:</b> ${escapeHtml(String(qty))}`,
    `<b>Allergier:</b> ${escapeHtml(allergies)}`,
    `<b>Melding:</b> ${escapeHtml(notes || '—')}`,
    '',
    `<i>Språk: ${escapeHtml(locale || '?')} · ${escapeHtml(submittedAt || '')}</i>`,
  ];

  return lines.join('\n');
}

export async function handler(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'method' }) };
  }

  const token = trimEnv(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = trimEnv(process.env.TELEGRAM_CHAT_ID);

  if (!token || !chatId) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ ok: false, error: 'missing_env' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'json' }) };
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const phone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  const allergies = typeof payload.allergies === 'string' ? payload.allergies.trim() : '';

  if (!name || !phone || !allergies) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'required' }) };
  }

  const qty = Number(payload.qty);
  if (!Number.isFinite(qty) || qty < 1 || qty > 50) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'qty' }) };
  }

  const text = formatTelegramMessage(payload);

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const tgRes = await fetch(tgUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!tgRes.ok) {
    const errText = await tgRes.text();
    console.error('Telegram send failed:', tgRes.status, errText);

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

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true }),
  };
}
