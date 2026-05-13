/**
 * Verifiserer at nb og en har samme nøkkel-stier (unngår manglende oversettelse i prod).
 * Leser `src/i18n/translations.ts` (som slår sammen `locales/nb.ts` og `locales/en.ts`).
 * Kjøres med: node --experimental-strip-types scripts/check-translations-keys.ts
 */
import { translations } from '../src/i18n/translations.ts';

function collectStringPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') {
    return [];
  }
  const out: string[] = [];
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      out.push(path);
    } else {
      out.push(...collectStringPaths(v, path));
    }
  }
  return out;
}

const nb = collectStringPaths(translations.nb).sort();
const en = collectStringPaths(translations.en).sort();

const onlyNb = nb.filter((k) => !en.includes(k));
const onlyEn = en.filter((k) => !nb.includes(k));

if (onlyNb.length || onlyEn.length) {
  console.error('translations.ts: nb og en har ikke samme nøkkelsett.\n');
  if (onlyNb.length) {
    console.error('Kun i nb:', onlyNb.join(', '));
  }
  if (onlyEn.length) {
    console.error('Kun i en:', onlyEn.join(', '));
  }
  process.exit(1);
}

console.log(`translations.ts: OK — ${nb.length} felles streng-nøkler (nb/en).`);
