import { test, expect } from '@playwright/test';

test.describe('OsloLatte — røyktester', () => {
  test('forside: topfelt og bestill-seksjon', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('banner')).toContainText('OsloLatte');
    await expect(page.locator('#bestill')).toBeVisible();
    await expect(page.getByRole('textbox', { name: /navn|name/i })).toBeVisible();
  });

  test('Om oss laster', async ({ page }) => {
    await page.goto('/side/om-oss');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Om oss|About/i);
  });

  test('Meny: flipp-knapp kan trykkes', async ({ page }) => {
    await page.goto('/side/meny');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Meny|Menu/i);
    const flip = page.locator('.menu-flip-scene');
    await expect(flip).toBeVisible();
    await flip.click();
    await flip.click();
  });

  test('Kalender laster', async ({ page }) => {
    await page.goto('/side/kalender');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Åpent|Opening|Kalender|Calendar/i);
  });

  test('Kontakt: personvern-seksjon', async ({ page }) => {
    await page.goto('/side/kontakt');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Kontakt|Contact/i);
    await expect(page.locator('#personvern')).toBeVisible();
  });
});
