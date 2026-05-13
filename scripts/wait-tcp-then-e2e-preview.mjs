/**
 * Brukes av Playwright webServer: vent til Netlify functions:serve lytter,
 * bygg (valgfritt), deretter vite preview (port fra scripts/e2e-preview-port.mjs).
 */
import { spawn } from 'node:child_process';
import path from 'path';
import { fileURLToPath } from 'node:url';
import waitOn from 'wait-on';
import { getFunctionsServePort, loadMergedEnv } from './load-env.mjs';
import { getE2ePreviewEndpoint } from './e2e-preview-port.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const merged = loadMergedEnv(root);
const port = getFunctionsServePort(merged);
const { port: previewPort } = getE2ePreviewEndpoint(root);

await waitOn({
  resources: [`tcp:127.0.0.1:${port}`],
  timeout: 300_000,
  interval: 250,
});

const skipBuild = process.env.PLAYWRIGHT_SKIP_WEB_BUILD === '1';

if (!skipBuild) {
  const code = await new Promise((resolve) => {
    const b = spawn('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: true });
    b.on('exit', (c) => resolve(c ?? 1));
  });
  if (code !== 0) process.exit(code);
}

const preview = spawn(
  'npx',
  [
    'vite',
    'preview',
    '--config',
    'vite.config.ts',
    '--host',
    '127.0.0.1',
    '--port',
    previewPort,
    '--strictPort',
  ],
  { cwd: root, stdio: 'inherit', shell: true },
);

preview.on('exit', (c) => process.exit(c ?? 0));
