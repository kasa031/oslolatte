/**
 * Sjekker at domenet svarer på DNS, HTTP og HTTPS (fra din maskin).
 * Bruk: npm run domain:check
 *       DOMAIN=www.oslolatte.no npm run domain:check
 * Avslutter med kode 1 hvis STRICT_DOMAIN_CHECK=1 og HTTPS ikke gir 2xx/3xx.
 */
import * as dns from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';

const host = process.env.DOMAIN?.trim() || process.argv[2]?.trim() || 'oslolatte.no';

function head(hostname, useTls) {
  const lib = useTls ? https : http;
  const port = useTls ? 443 : 80;
  return new Promise((resolve) => {
    const req = lib.request(
      {
        method: 'HEAD',
        hostname,
        port,
        path: '/',
        timeout: 15_000,
        servername: hostname,
        rejectUnauthorized: true,
      },
      (res) => {
        resolve({
          ok: true,
          status: res.statusCode,
          server: res.headers.server,
          location: res.headers.location,
        });
        res.resume();
      },
    );
    req.on('error', (err) => {
      resolve({ ok: false, code: err.code, message: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, code: 'ETIMEDOUT', message: 'Tidsavbrudd' });
    });
    req.end();
  });
}

async function main() {
  console.log(`check-domain-live: ${host}\n`);

  /** `resolve4`/`resolve6` kan feile i noen nett/miljø — `lookup` all er mer robust. */
  let rows = [];
  try {
    const all = await dns.lookup(host, { all: true, verbatim: true });
    const list = Array.isArray(all) ? all : [all];
    for (const e of list) {
      rows.push({ fam: e.family === 6 ? 'AAAA' : 'A', addr: e.address });
    }
  } catch (e) {
    console.log('DNS lookup:', e.message);
  }
  if (rows.length === 0) {
    try {
      const v4 = await dns.resolve4(host);
      for (const a of v4) rows.push({ fam: 'A', addr: a });
    } catch {
      /* */
    }
    try {
      const v6 = await dns.resolve6(host);
      for (const a of v6) rows.push({ fam: 'AAAA', addr: a });
    } catch {
      /* */
    }
  }

  console.log('DNS:');
  if (rows.length === 0) {
    console.log('  Fant ingen adresser via lookup/resolve (sjekk staving eller nett).');
  } else {
    for (const { fam, addr } of rows) console.log(`  ${fam.padEnd(5)} ${addr}`);
  }

  const httpsR = await head(host, true);
  const httpR = await head(host, false);

  console.log('\nHTTPS (port 443):');
  if (httpsR.ok) {
    console.log(`  HTTP ${httpsR.status}  Server: ${httpsR.server || '—'}`);
    if (httpsR.location) console.log(`  Location: ${httpsR.location}`);
  } else {
    console.log(`  Feilet: ${httpsR.code || '—'} — ${httpsR.message}`);
  }

  console.log('\nHTTP (port 80):');
  if (httpR.ok) {
    console.log(`  HTTP ${httpR.status}  Server: ${httpR.server || '—'}`);
    if (httpR.location) console.log(`  Location: ${httpR.location}`);
  } else {
    console.log(`  Feilet: ${httpR.code || '—'} — ${httpR.message}`);
  }

  console.log('\n--- Tolking ---');
  if (httpsR.ok && httpsR.status >= 200 && httpsR.status < 400) {
    console.log(
      'HTTPS svarer med suksesskode — åpne https://' + host + '/ i nettleser og sjekk hengelås.',
    );
    const s = (httpsR.server || '').toLowerCase();
    if (s.includes('netlify') || s.includes('envoy')) {
      console.log('Server-header minner om Netlify — bra.');
    }
  } else if (!httpsR.ok && httpR.ok) {
    console.log(
      'Typisk mønster: HTTP svarer, men HTTPS ikke (ECONNREFUSED, tilkobling nektet, eller tidsavbrudd på 443). ' +
        'Da peker DNS ofte til en vert som ikke tilbyr TLS på 443 — f.eks. forhandler-parkering eller gamle A-poster.',
    );
    console.log(
      'Rettelse: Netlify → Domain management → kopier DNS-poster → lim inn i Domeneshop.',
    );
    console.log('Midlertidig: bruk https://…netlify.app til DNS er riktig.');
  } else if (!httpsR.ok && !httpR.ok) {
    console.log(
      'Verken HTTP eller HTTPS svarer — sjekk DNS, brannmur, eller at domenet er stavet riktig.',
    );
  } else if (httpsR.ok && (httpsR.status >= 400 || httpsR.status < 200)) {
    console.log(
      `HTTPS returnerte ${httpsR.status} — sjekk redirect/primary i Netlify og at siste deploy er publisert.`,
    );
  }

  const strict = process.env.STRICT_DOMAIN_CHECK === '1';
  const httpsGood =
    httpsR.ok && httpsR.status !== undefined && httpsR.status >= 200 && httpsR.status < 400;
  if (strict && !httpsGood) {
    console.log('\nSTRICT_DOMAIN_CHECK=1: avslutter med kode 1 (HTTPS ikke OK).');
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
