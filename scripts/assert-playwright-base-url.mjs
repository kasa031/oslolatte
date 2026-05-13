/**
 * Brukes av `npm run test:e2e:url` — krever PLAYWRIGHT_BASE_URL (https, uten avsluttende /).
 */
const raw = process.env.PLAYWRIGHT_BASE_URL?.trim();
if (!raw) {
  console.error(
    'Mangler PLAYWRIGHT_BASE_URL.\n' +
      '  PowerShell:  $env:PLAYWRIGHT_BASE_URL="https://oslolatte.no"; npm run test:e2e:url\n' +
      '  bash:        PLAYWRIGHT_BASE_URL=https://oslolatte.no npm run test:e2e:url\n' +
      'Bestillingstesten mocker fortsatt POST /api/order — ingen ekte Telegram fra denne kommandoen.',
  );
  process.exit(1);
}
if (!/^https:\/\//i.test(raw)) {
  console.error('PLAYWRIGHT_BASE_URL bør starte med https:// (fikk: ' + raw + ')');
  process.exit(1);
}
if (raw.endsWith('/')) {
  console.error('Fjern avsluttende / fra PLAYWRIGHT_BASE_URL (fikk: ' + raw + ')');
  process.exit(1);
}
