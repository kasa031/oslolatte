import { test, expect } from '@playwright/test';

test.describe('Bestilling (mocket /api/order)', () => {
  test('POST-body inneholder navn, telefon og productId; suksess vises', async ({ page }) => {
    let postJson: Record<string, unknown> = {};

    await page.route('**/api/order', async (route) => {
      const req = route.request();
      if (req.method() === 'POST') {
        try {
          postJson = JSON.parse(req.postData() || '{}') as Record<string, unknown>;
        } catch {
          postJson = {};
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ ok: true }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/?e2eBypassPrelaunch=1');

    await page.getByLabel(/navn|name/i).fill('E2E Test');
    await page.getByLabel(/telefon|phone/i).fill('12345678');
    await page.getByLabel(/allergi/i).fill('Ingen');

    await new Promise((r) => setTimeout(r, 2100));

    await page.getByRole('button', { name: /send bestilling|send order/i }).click();

    await expect.poll(() => postJson.name, { timeout: 15_000 }).toBe('E2E Test');
    await expect(page.locator('.order-form__success')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('.order-form__success')).toContainText(/Telegram|telegram/i);

    expect(postJson.name).toBe('E2E Test');
    expect(postJson.phone).toBe('12345678');
    expect(postJson.productId).toBe('oslolatte-varm');
    expect(postJson.qty).toBe(1);
  });
});
