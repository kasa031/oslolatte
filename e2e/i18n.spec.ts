import { expect, test } from '@playwright/test';

test.describe('Språk (nb/en)', () => {
  test('kontakt: personvern bytter til engelsk etter ENG', async ({ page }) => {
    await page.goto('/side/kontakt');

    await expect(page.getByRole('heading', { name: 'Personvern' })).toBeVisible();

    await page.getByRole('button', { name: 'Vis engelsk' }).click();

    await expect(page.getByRole('heading', { name: 'Privacy' })).toBeVisible();
  });

  test('forside: hero-tittel bytter til engelsk etter ENG', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: /Bestill OsloLatte eller OsloKakao/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Vis engelsk' }).click();

    await expect(
      page.getByRole('heading', { level: 1, name: /Order OsloLatte or OsloKakao/i }),
    ).toBeVisible();
  });
});
