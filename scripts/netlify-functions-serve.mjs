/**
 * Starter netlify functions:serve på samme port som Vite-proxy forventer (VITE_FUNCTIONS_SERVE_PORT eller 9888).
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getFunctionsServePort, loadMergedEnv } from './load-env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const merged = loadMergedEnv(root);
const port = getFunctionsServePort(merged);

const child = spawn('npx', ['--yes', 'netlify-cli', 'functions:serve', '-p', port, '-o'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env },
});

child.on('exit', (code, sig) => {
  process.exit(code ?? (sig ? 1 : 0));
});
