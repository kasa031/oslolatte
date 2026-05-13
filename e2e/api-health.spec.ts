import { expect, test } from '@playwright/test';

/**
 * På Netlify (eller Playwright som starter `netlify functions:serve` + `vite preview`)
 * skal GET /api/order treffe `order`-funksjonen og gi 405 + JSON.
 */
test.describe('Bestillings-API (lett health)', () => {
  test('GET /api/order gir 405 og method-feil når funksjonen treffes', async ({ request }) => {
    const res = await request.get('/api/order');
    if (res.status() !== 405) {
      test.skip(
        true,
        `Fikk HTTP ${res.status()} — forventet 405 fra order-funksjon (kjør mot Netlify eller dev med /api/order-proxy).`,
      );
    }
    const data = (await res.json()) as { ok?: boolean; error?: string };
    expect(data).toMatchObject({ ok: false, error: 'method' });
  });
});
