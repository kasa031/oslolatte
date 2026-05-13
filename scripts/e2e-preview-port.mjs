/**
 * Én kilde for vite preview-port under Playwright (strictPort).
 * Shell overstyrer .env: E2E_PREVIEW_PORT (1–65535), standard 4173.
 */
import path from 'node:path';
import { loadMergedEnv } from './load-env.mjs';

const DEFAULT = '4173';

function isValidPort(p) {
  if (!/^\d+$/.test(p)) return false;
  const n = Number(p);
  return n >= 1 && n <= 65535;
}

/**
 * @param {string} rootDir Prosjektrot (mappa der .env ligger)
 * @returns {{ port: string; origin: string }}
 */
export function getE2ePreviewEndpoint(rootDir) {
  const merged = loadMergedEnv(path.resolve(rootDir));
  const fromShell = process.env.E2E_PREVIEW_PORT?.trim();
  const fromFile = merged.E2E_PREVIEW_PORT?.trim();
  let port = DEFAULT;
  if (fromShell && isValidPort(fromShell)) port = fromShell;
  else if (fromFile && isValidPort(fromFile)) port = fromFile;
  return { port, origin: `http://127.0.0.1:${port}` };
}
