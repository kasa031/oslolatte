/**
 * Leser Thereses gate-bilder fra:
 *   - public/Images/… (serveres direkte), eller
 *   - Images/… i prosjektroten (OneDrive-mappe som i utfolder — kopieres til public/Images/theresesgate).
 * Skriver src/generated/theresesgateSlides.ts — kjøres før dev/build.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sizeOf from 'image-size';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imagesRootPublic = path.join(root, 'public', 'Images');
const imagesRootProject = path.join(root, 'Images');
const destSynced = path.join(imagesRootPublic, 'theresesgate');

const candidates = [
  'theresesgate',
  'Theresesgate',
  'theresesGate',
  'THERESESGATE',
  'Thereses gate',
  'thereses gate',
];

const SKIP_EXT = new Set(['.heic', '.heif']);
const WEB_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp']);

function discoverLooseMatch(base) {
  if (!fs.existsSync(base)) return null;
  for (const e of fs.readdirSync(base, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const k = e.name.toLowerCase().replace(/[\s._-]+/g, '');
    if (k.includes('thereses') && k.includes('gate')) {
      return path.join(base, e.name);
    }
  }
  return null;
}

function findTheresesDir(base) {
  for (const name of candidates) {
    const p = path.join(base, name);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) return p;
  }
  return discoverLooseMatch(base);
}

/** Alle bildefiler under dir: absolutte stier */
function collectAbsoluteWebFiles(dirAbs) {
  const out = [];
  function walk(sub) {
    let entries;
    try {
      entries = fs.readdirSync(sub, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const full = path.join(sub, e.name);
      if (e.isDirectory()) {
        walk(full);
        continue;
      }
      if (!e.isFile()) continue;
      const ext = path.extname(e.name).toLowerCase();
      if (SKIP_EXT.has(ext)) {
        console.warn(`gen:slides — hopper over (nettleser-støtte): ${path.relative(root, full)}`);
        continue;
      }
      if (!WEB_EXT.has(ext)) continue;
      out.push(full);
    }
  }
  walk(dirAbs);
  return out;
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

/** Kopier filer fra kilde til public/Images/theresesgate (flatt navn; kollisjon → relativ sti med _). */
function syncProjectToPublic(sourceDir) {
  const files = collectAbsoluteWebFiles(sourceDir);
  emptyDir(destSynced);
  fs.mkdirSync(destSynced, { recursive: true });
  const used = new Set();
  for (const abs of files) {
    let baseName = path.basename(abs);
    if (used.has(baseName)) {
      const rel = path.relative(sourceDir, abs).split(path.sep).join('_');
      baseName = rel;
    }
    used.add(baseName);
    const dest = path.join(destSynced, baseName);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(abs, dest);
  }
  console.log(
    `gen:slides — synket ${files.length} bilde(r) fra ${path.relative(root, sourceDir)} → ${path.relative(root, destSynced)}`,
  );
  return files.length;
}

/** Relative paths from public/Images */
function collectRelativeFromPublicImages(dirAbs) {
  const absFiles = collectAbsoluteWebFiles(dirAbs);
  return absFiles
    .map((a) => path.relative(imagesRootPublic, a))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true }));
}

fs.mkdirSync(imagesRootPublic, { recursive: true });

const dirPublic = findTheresesDir(imagesRootPublic);
const dirProject = findTheresesDir(imagesRootProject);

const countPublic = dirPublic ? collectAbsoluteWebFiles(dirPublic).length : 0;
const countProject = dirProject ? collectAbsoluteWebFiles(dirProject).length : 0;

let dir = null;

if (countProject > 0) {
  syncProjectToPublic(dirProject);
  dir = destSynced;
} else if (countPublic > 0 && dirPublic) {
  dir = dirPublic;
} else if (dirPublic) {
  dir = dirPublic;
} else {
  fs.mkdirSync(destSynced, { recursive: true });
  dir = destSynced;
}

const relFiles = dir ? collectRelativeFromPublicImages(dir) : [];

/** Les bildestørrelse for width/height + srcset (fallback ved feil). */
function readDims(absPath) {
  const fallback = { width: 1600, height: 1067 };
  try {
    const buf = fs.readFileSync(absPath);
    const dim = sizeOf(buf);
    if (dim.width && dim.height) {
      return { width: dim.width, height: dim.height };
    }
  } catch {
    /* bruk fallback */
  }
  return fallback;
}

/** `/Images/a/b.jpeg` → `a/b.jpeg` (relativt `public/Images`). */
function slideSrcToRelFs(src) {
  const raw = src.replace(/^\/Images\//, '');
  return raw
    .split('/')
    .map((seg) => decodeURIComponent(seg))
    .join(path.sep);
}

const slides = relFiles.map((relFs) => {
  const abs = path.join(imagesRootPublic, relFs);
  const { width, height } = readDims(abs);
  const parts = relFs.split(path.sep).map((seg) => encodeURIComponent(seg));
  const src = `/Images/${parts.join('/')}`;
  return { src, width, height };
});

async function writeWebpDerivatives() {
  let sharpMod = null;
  try {
    sharpMod = (await import('sharp')).default;
  } catch (e) {
    console.warn('gen:slides — sharp utilgjengelig, hopper over webp:', e?.message || e);
    return;
  }
  let n = 0;
  for (const slide of slides) {
    const relFs = slideSrcToRelFs(slide.src);
    const ext = path.extname(relFs).toLowerCase();
    if (ext === '.webp' || ext === '.gif') continue;
    if (!['.jpg', '.jpeg', '.png', '.bmp', '.avif'].includes(ext)) continue;
    const webpRel = relFs.replace(/\.(jpe?g|png|bmp|avif)$/i, '.webp');
    if (webpRel === relFs) continue;
    const abs = path.join(imagesRootPublic, relFs);
    const webpAbs = path.join(imagesRootPublic, webpRel);
    try {
      await sharpMod(abs)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(webpAbs);
      const webpParts = webpRel.split(path.sep).map((seg) => encodeURIComponent(seg));
      slide.webp = `/Images/${webpParts.join('/')}`;
      n += 1;
    } catch (e) {
      console.warn(`gen:slides — webp feilet (${relFs}):`, e?.message || e);
    }
  }
  if (n > 0) {
    console.log(`gen:slides — skrev ${n} webp-derivat(er) (sharp, maks ~1920px kant)`);
  }
}

await writeWebpDerivatives();

const outDir = path.join(root, 'src', 'generated');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'theresesgateSlides.ts');
const body = `// Auto-generert av scripts/gen-theresesgate-slides.mjs — ikke rediger for hånd.
export type TheresesgateSlide = { readonly src: string; readonly width: number; readonly height: number; readonly webp?: string };

export const THERESESGATE_SLIDES: readonly TheresesgateSlide[] = ${JSON.stringify(slides, null, 2)};
`;
fs.writeFileSync(outPath, body, 'utf8');

if (slides.length) {
  console.log(
    `gen:slides — ${slides.length} bilde(r) i lysvisning → ${path.relative(root, outPath)}`,
  );
} else {
  console.log(
    `gen:slides — 0 bilder. Legg jpeg/png i «Images/Theresesgate» eller «public/Images/theresesgate». HEIC må eksporteres som JPG.`,
  );
}
