import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { parseNorwegianOrgNumberForJsonLd } from './src/config/norwegianOrgNumber';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Injiserer valgfri `identifier` (org.nr) i JSON-LD i `index.html` når `VITE_ORG_NUMBER` er gyldig. */
function jsonLdOrgIdentifierPlugin(orgRaw: string | undefined): Plugin {
  const digits = parseNorwegianOrgNumberForJsonLd(orgRaw);
  return {
    name: 'oslolatte-jsonld-orgnr',
    buildStart() {
      if (orgRaw?.trim() && !digits) {
        console.warn(
          '[vite] VITE_ORG_NUMBER er satt men ugyldig (9 siffer + norsk kontrollsiffer). Hopper over JSON-LD identifier.',
        );
      }
    },
    transformIndexHtml(html) {
      if (!digits || html.includes('"identifier"')) return html;
      const insert = `,\n        "identifier": {\n          "@type": "PropertyValue",\n          "name": "Organisasjonsnummer (Norge)",\n          "value": "${digits}",\n          "propertyID": "orgnr"\n        }`;
      return html.replace(
        /("servesCuisine": "Kaffe og kakao")(\s*\n\s*\}\s*\n\s*<\/script>)/,
        `$1${insert}$2`,
      );
    },
  };
}

/** Leser `SITE_CONTENT_UPDATED_ISO` fra `siteMeta.ts` for sitemap &lt;lastmod&gt;. */
function readSiteContentUpdatedIso(): string | undefined {
  try {
    const p = path.resolve(process.cwd(), 'src/config/siteMeta.ts');
    const s = fs.readFileSync(p, 'utf8');
    const m = /SITE_CONTENT_UPDATED_ISO\s*=\s*['"]([^'"]+)['"]/.exec(s);
    return m?.[1];
  } catch {
    return undefined;
  }
}

/** Valgfri meta for Google Search Console (kun når `VITE_GOOGLE_SITE_VERIFICATION` er satt ved build). */
function googleSiteVerificationPlugin(token: string | undefined): Plugin {
  const t = token?.trim();
  return {
    name: 'oslolatte-google-site-verification',
    transformIndexHtml(html) {
      if (!t) return html;
      if (/name=["']google-site-verification["']/.test(html)) return html;
      const tag = `<meta name="google-site-verification" content="${escapeXml(t)}" />`;
      return html.replace('<meta name="viewport"', `${tag}\n    <meta name="viewport"`);
    },
  };
}

/** Setter absolutt OG/Twitter-bilde i `index.html` ut fra kanonisk rot + valgfri bildesti (f.eks. 1200×630 i `public/Images/`). */
function ogShareMetaPlugin(siteRoot: string, imagePathRel: string): Plugin {
  const site = siteRoot.replace(/\/$/, '');
  const rel = imagePathRel.startsWith('/') ? imagePathRel : `/${imagePathRel}`;
  const full = `${site}${rel}`;
  return {
    name: 'oslolatte-og-share-meta',
    transformIndexHtml(html) {
      return html
        .replace(
          /<meta property="og:image" content="[^"]*"/,
          `<meta property="og:image" content="${escapeXml(full)}"`,
        )
        .replace(
          /<meta name="twitter:image" content="[^"]*"/,
          `<meta name="twitter:image" content="${escapeXml(full)}"`,
        );
    },
  };
}

/** Skriver `dist/sitemap.xml` når `VITE_SITE_URL` er satt (f.eks. i Netlify build). */
function sitemapPlugin(baseUrl: string | undefined): Plugin {
  return {
    name: 'oslolatte-sitemap',
    closeBundle() {
      const base = baseUrl?.replace(/\/$/, '');
      if (!base) {
        console.warn(
          '[vite] Hopper over sitemap.xml — sett VITE_SITE_URL (kanonisk https-URL) for produksjon.',
        );
        return;
      }
      const paths = [
        '/',
        '/side/om-oss',
        '/side/meny',
        '/side/kalender',
        '/side/bestill',
        '/side/kontakt',
      ];
      const lastmod = readSiteContentUpdatedIso();
      const inner = paths
        .map((p) => {
          const loc = escapeXml(base + (p === '/' ? '/' : p));
          if (lastmod) {
            return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`;
          }
          return `  <url><loc>${loc}</loc></url>`;
        })
        .join('\n');
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${inner}\n</urlset>\n`;
      const outDir = path.resolve(process.cwd(), 'dist');
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
    },
  };
}

/**
 * Lokalt: ren «vite» har ingen API — POST /api/order ga 404 uten proxy.
 *
 * Standard: proxy til `netlify functions:serve` (port 9888) med rewrite til
 * `/.netlify/functions/order`. Kjør i én terminal: `npm run dev:functions`
 * og i en annen: `npm run dev`, eller bruk bare `npm run dev:netlify`.
 *
 * Miljøvariabler (valgfritt i .env.local):
 * - VITE_PROXY_NETLIFY_DEV=1 → proxy til http://127.0.0.1:8888 uten rewrite (Netlify Dev).
 * - VITE_FUNCTIONS_SERVE_PORT → egen port for functions:serve og Vite-proxy (standard **9888**).
 *   Playwright (`npm run test:e2e`) setter **9991** for å unngå kollisjon med dev på 9888 (overstyres med E2E_FUNCTIONS_PORT).
 * - VITE_DEV_PROXY_TARGET=https://... → full kontroll (avansert).
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const analyze = mode === 'analyze';
  const explicit = env.VITE_DEV_PROXY_TARGET?.trim();
  const useNetlifyDev8888 = env.VITE_PROXY_NETLIFY_DEV === '1';

  let target: string;
  let rewrite: ((path: string) => string) | undefined;

  if (explicit) {
    target = explicit;
    rewrite =
      env.VITE_DEV_PROXY_REWRITE_TO_FUNCTION === '1'
        ? () => '/.netlify/functions/order'
        : undefined;
  } else if (useNetlifyDev8888) {
    target = 'http://127.0.0.1:8888';
    rewrite = undefined;
  } else {
    const port = env.VITE_FUNCTIONS_SERVE_PORT?.trim() || '9888';
    target = `http://127.0.0.1:${port}`;
    rewrite = () => '/.netlify/functions/order';
  }

  const siteForOg = (env.VITE_SITE_URL?.trim() || 'https://oslolatte.no').replace(/\/$/, '');
  const ogImageRelRaw = (env.VITE_OG_IMAGE_PATH || '/Images/Logo1.jpeg').trim();
  const ogImageRel = ogImageRelRaw.startsWith('/') ? ogImageRelRaw : `/${ogImageRelRaw}`;

  return {
    plugins: [
      react(),
      googleSiteVerificationPlugin(env.VITE_GOOGLE_SITE_VERIFICATION),
      ogShareMetaPlugin(siteForOg, ogImageRel),
      jsonLdOrgIdentifierPlugin(env.VITE_ORG_NUMBER),
      sitemapPlugin(env.VITE_SITE_URL?.trim()),
      ...(analyze
        ? [
            visualizer({
              filename: path.resolve(process.cwd(), 'dist/stats.html'),
              gzipSize: true,
              brotliSize: true,
              template: 'treemap',
            }) as Plugin,
          ]
        : []),
    ],
    server: {
      open: true,
      strictPort: false,
      port: 5173,
      proxy: {
        '/api/order': {
          target,
          changeOrigin: true,
          ...(rewrite ? { rewrite } : {}),
        },
      },
    },
  };
});
