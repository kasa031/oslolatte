import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';
import { getE2ePreviewEndpoint } from './scripts/e2e-preview-port.mjs';

const configDir = path.dirname(fileURLToPath(import.meta.url));

/** Når satt: E2E kjører mot denne URL-en uten lokal `vite preview` (f.eks. etter DNS til prod). */
const remoteBaseURL = process.env.PLAYWRIGHT_BASE_URL?.trim();
const { origin: localPreviewURL, port: e2ePreviewPort } = getE2ePreviewEndpoint(configDir);

export default defineConfig({
  testDir: 'e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: remoteBaseURL || localPreviewURL,
    trace: 'on-first-retry',
    /** PROD-build registrerer SW; ellers fanger ikke page.route POST (WebKit aktiverer SW ofte raskere enn Chromium). */
    serviceWorkers: 'block',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  ...(remoteBaseURL
    ? {}
    : {
        webServer: {
          command: 'npm run e2e:web',
          url: localPreviewURL,
          reuseExistingServer: !process.env.CI,
          timeout: 300_000,
          env: {
            ...process.env,
            /** Samme port som `localPreviewURL` (vite preview, strictPort). */
            E2E_PREVIEW_PORT: e2ePreviewPort,
            /** Unngå kollisjon med `npm run dev:functions` på 9888 under e2e. */
            VITE_FUNCTIONS_SERVE_PORT: process.env.E2E_FUNCTIONS_PORT?.trim() || '9991',
            VITE_ORDER_API_URL: process.env.VITE_ORDER_API_URL?.trim() || '/api/order',
          },
        },
      }),
});
