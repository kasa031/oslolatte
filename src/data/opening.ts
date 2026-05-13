/**
 * Oppdater denne filen når dere åpner/stenger eller har spesielle dager.
 * `open` = ordinær åpningsdag, `closed` = stengt, `special` = kort åpent / ekstra tid – tilpass tekst på siden ved behov.
 *
 * HELGEAPNING (anbefalt rutine):
 * - Legg inn kommende helgers lør/søn som `open` når dere vet at dere holder åpent.
 * - Bruk `closed` på helligdager eller helger dere ikke kan ha åpent.
 * - Flagg i vinduet = ekstra signal; sett flagOpenNowOverride til true samtidig om dere vil vise banner på forsiden.
 */
export type DayStatus = 'open' | 'closed' | 'special';

/** YYYY-MM-DD → status. Uten `preLaunch`: manglende dato = nøytral celle. Med `preLaunch`: manglende dato = stengt. */
export const openingSchedule: Record<string, DayStatus> = {
  // Eksempel helg:
  // '2026-05-17': 'open',
  // '2026-05-18': 'open',
  // '2026-05-24': 'closed',
};

/**
 * Ekstra synlighet på forsiden når dere har åpent nå (grønt banner).
 */
export const flagOpenNowOverride = false;

/**
 * Pre-lansering: alle kalenderdager uten eksplisitt rad i `openingSchedule` vises som stengt;
 * forsiden og undersider viser varsel; bestillingsskjemaet er stengt.
 * Sett til `false` når dere åpner og tar imot bestilling.
 *
 * Playwright (order-mock): bruk `?e2eBypassPrelaunch=1` på URL slik at skjema fortsatt kan testes.
 */
export const preLaunch = true;
