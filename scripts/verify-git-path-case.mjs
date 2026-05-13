/**
 * Feiler hvis git tracker to filer som bare skiller seg med store/små bokstaver
 * (vanlig feilkilde på Windows + case-sensitiv CI).
 */
import { execSync } from 'node:child_process';

let out;
try {
  out = execSync('git ls-files', { encoding: 'utf8' });
} catch (e) {
  console.error('verify-git-path-case: kunne ikke kjøre git ls-files', e?.message || e);
  process.exit(1);
}

const lines = out.split('\n').filter(Boolean);
const byLower = new Map();
for (const p of lines) {
  const key = p.toLowerCase();
  const existing = byLower.get(key);
  if (existing !== undefined && existing !== p) {
    console.error(`Case-kollisjon i git-indeks:\n  ${existing}\n  ${p}`);
    process.exit(1);
  }
  byLower.set(key, p);
}

console.log(`verify-git-path-case: OK (${lines.length} stier)`);
