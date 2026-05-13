/**
 * Synker statiske bestillings-ressurser fra prosjektmappa `Images/` til `public/Images/`
 * (det som faktisk lastes i nettleseren som /Images/…).
 *
 * Telegram-QR (OsloLatte):
 *   1. Bytt ut eller lagre ny fil som:  Images/QRkode_bestilling.png
 *   2. Kjør `npm run dev` eller `npm run build` — denne skriptet kopierer til public/Images/
 *   3. Manuelt: `npm run sync:order-assets`
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'Images');

/** @type {{ srcRel: string; destName: string }[]} */
const FILES = [
  { srcRel: path.join('Images', 'QRkode_bestilling.png'), destName: 'QRkode_bestilling.png' },
];

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  for (const { srcRel, destName } of FILES) {
    const src = path.join(root, srcRel);
    const dest = path.join(outDir, destName);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`sync-public-order-assets: kopiert ${srcRel} → public/Images/${destName}`);
    } else if (fs.existsSync(dest)) {
      console.warn(
        `sync-public-order-assets: fant ikke ${srcRel} — beholder eksisterende public/Images/${destName}`,
      );
    } else {
      console.warn(
        `sync-public-order-assets: mangler både ${srcRel} og public/Images/${destName} (legg QR-fila i Images/ og kjør på nytt).`,
      );
    }
  }
}

main();
