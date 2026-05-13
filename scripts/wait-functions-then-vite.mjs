/**
 * Vent til Netlify functions lytter, deretter start Vite (brukes av dev:all / dev:serve).
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import waitOn from 'wait-on';
import { getFunctionsServePort, loadMergedEnv } from './load-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const merged = loadMergedEnv(root);
const port = getFunctionsServePort(merged);

await waitOn({
  resources: [`tcp:127.0.0.1:${port}`],
  timeout: 300_000,
  interval: 250,
});

const child = spawn('npm', ['run', 'dev'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => process.exit(code ?? 0));
