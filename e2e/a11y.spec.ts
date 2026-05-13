import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const AXE_PATHS = [
  { path: '/', label: 'forside' },
  { path: '/side/bestill', label: 'bestill' },
  { path: '/side/kontakt', label: 'kontakt' },
] as const;

test.describe('Tilgjengelighet (axe)', () => {
  for (const { path, label } of AXE_PATHS) {
    test(`${label}: ingen alvorlige eller kritiske axe-feil`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const severe = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
    });
  }
});
