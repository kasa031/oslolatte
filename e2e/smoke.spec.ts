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
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Åpent|Opening|Kalender|Calendar/i,
    );
  });

  test('Kontakt: FAQ og personvern', async ({ page }) => {
    await page.goto('/side/kontakt');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Kontakt|Contact/i);
    await expect(page.getByRole('heading', { level: 2 })).toContainText(/FAQ|svar/i);
    await expect(page.locator('#personvern')).toBeVisible();
  });

  test('Meny: prisliste-bilde og anker #priser', async ({ page }) => {
    await page.goto('/side/meny#priser');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Meny|Menu/i);
    const priceImg = page.locator('#priser img');
    await expect(priceImg).toBeVisible();
    await expect(priceImg).toHaveAttribute('src', /priser\.png/);
  });

  test('Gammel /side/priser-URL videresendes til meny#priser', async ({ page }) => {
    await page.goto('/side/priser');
    await expect(page).toHaveURL(/\/side\/meny#priser/);
  });

  test('Bestill-side laster', async ({ page }) => {
    await page.goto('/side/bestill');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Bestilling|Order/i);
    await expect(page.getByRole('textbox', { name: /navn|name/i })).toBeVisible();
  });

  test('Forside: smal skjerm (røyk)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator('#bestill')).toBeVisible();
  });

  test('404: ukjent toppnivå-rute', async ({ page }) => {
    await page.goto('/denne-siden-finnes-ikke-test');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Siden finnes ikke|Page not found/i,
    );
    await expect(page).toHaveURL(/denne-siden-finnes-ikke-test/);
  });

  test('404: ukjent under /side/', async ({ page }) => {
    await page.goto('/side/ukjent-rute-e2e');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Siden finnes ikke|Page not found/i,
    );
    await expect(page).toHaveURL(/\/side\/ukjent-rute-e2e/);
  });
});
