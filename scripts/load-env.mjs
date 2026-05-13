/**
 * Felles parsing av .env / .env.local (samme semantikk som Vite loadEnv + trim av siterte verdier).
 */
import fs from 'fs';
import path from 'path';

export function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

/** Slår .env og .env.local (.local vinner ved konflikt), deretter VITE_* fra prosess-miljø (siste vinner). */
export function loadMergedEnv(rootDir) {
  const base = path.resolve(rootDir);
  const fromFiles = {
    ...parseEnvFile(path.join(base, '.env')),
    ...parseEnvFile(path.join(base, '.env.local')),
  };
  const fromShell = {};
  for (const key of Object.keys(process.env)) {
    const v = process.env[key];
    if (v === undefined || v === '') continue;
    if (key.startsWith('VITE_')) fromShell[key] = v;
  }
  return { ...fromFiles, ...fromShell };
}

/** Samme port som vite.config.ts (proxy til functions:serve). */
export function getFunctionsServePort(merged) {
  const p = merged.VITE_FUNCTIONS_SERVE_PORT?.trim();
  if (p && /^\d+$/.test(p)) return p;
  return '9888';
}
