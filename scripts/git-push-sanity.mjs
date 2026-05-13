/**
 * Kjør før du pusher til GitHub: sjekker at ingen .env-lignende hemmelighetsfiler er sporet av git.
 * Bruk: npm run git:push-check
 */
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gitDir = path.join(root, '.git');

if (!existsSync(gitDir)) {
  console.log(
    'git:push-check: ingen .git-mappe her — hopp over (kjør fra prosjektroten etter git init).',
  );
  process.exit(0);
}

let tracked;
try {
  tracked = execSync('git ls-files', { cwd: root, encoding: 'utf8' })
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
} catch (e) {
  console.error('git:push-check: kunne ikke kjøre git ls-files', e?.message || e);
  process.exit(1);
}

/** True = skal aldri committes (unntak: .env.example). */
function isForbiddenEnvFile(f) {
  if (f === '.env.example') return false;
  if (f === '.env') return true;
  if (f.endsWith('/.env')) return true;
  if (/^\.env\./.test(path.basename(f))) return true;
  if (/\/\.env$/.test(f)) return true;
  if (/\/\.env\./.test(f)) return true;
  return false;
}

const bad = tracked.filter(isForbiddenEnvFile);
if (bad.length > 0) {
  console.error(
    'git:push-check: FEIL — disse filene er sporet av git og ser ut som miljø/hemmeligheter:',
  );
  for (const f of bad) console.error('  ', f);
  console.error(
    '\nFjern dem fra git-indeksen (git rm --cached …), behold kun .env.example i repo.',
  );
  console.error(
    'Hemmeligheter hører hjemme i lokal .env (gitignored) og Netlify Environment variables.',
  );
  process.exit(1);
}

console.log('git:push-check: OK — ingen sporet .env/-hemmelighetsfiler (kun trygge filnavn).');
console.log('Tips: lim aldri inn token i kildekode; bruk .env lokalt og Netlify for prod.');
