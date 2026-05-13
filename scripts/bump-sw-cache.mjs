/**
 * Setter service worker sitt cache-navn fra package.json-versjon + valgfri git-SHA,
 * slik at nye deploys slipper gammel hashed JS/CSS i eldre caches.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const swPath = join(root, 'public', 'sw.js');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const version = typeof pkg.version === 'string' ? pkg.version : '0.0.0';

let hash = '';
try {
  hash = execSync('git rev-parse --short HEAD', { cwd: root, encoding: 'utf8' }).trim();
} catch {
  /* ikke git-repo eller git utilgjengelig */
}

const suffix = hash ? `${version}-${hash}` : version;
const cacheName = `oslolatte-assets-v${suffix}`;

let sw = readFileSync(swPath, 'utf8');
const lines = sw.split(/\r?\n/);
const cacheIdx = lines.findIndex((l) => l.trimStart().startsWith('const CACHE = '));
if (cacheIdx === -1) {
  console.warn('bump-sw-cache: fant ikke const CACHE-linje i public/sw.js — ingen endring');
  process.exit(0);
}
lines[cacheIdx] = `const CACHE = '${cacheName.replace(/'/g, '')}';`;
const next = lines.join('\n');
if (sw === next) {
  console.log(`bump-sw-cache: CACHE uendret (${cacheName})`);
  process.exit(0);
}
writeFileSync(swPath, next, 'utf8');
console.log(`bump-sw-cache: CACHE = ${cacheName}`);
