/**
 * import-assets.mjs
 *
 * Pulls all SOE image assets from the designated source folder,
 * converts them to WebP at web-appropriate sizes, and writes them
 * into the correct public/assets/ subfolders.
 *
 * Source: C:\Users\ldmur\Downloads\The Sound of Essentials Image Assets
 * Dest:   ./public/assets/
 *
 * Run from the /web directory:
 *   node scripts/import-assets.mjs
 */

import sharp from 'sharp';
import { mkdir, copyFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const SRC = 'C:\\Users\\ldmur\\Downloads\\The Sound of Essentials Image Assets';
const DEST = './public/assets';

// ── Output quality settings ──────────────────────────────────────
const WEBP_QUALITY = 88;

// ── Asset manifest ────────────────────────────────────────────────
// Maps: source filename → { dest path, max width in px }
// Width is the max dimension — sharp preserves aspect ratio automatically.
const MANIFEST = [

  // ── Individual character portraits ──────────────────────────────
  // Used in /characters and /universe duo cards
  { src: 'KENJI.png',    dest: 'characters/KENJI.webp',    width: 800 },
  { src: 'AIKO.png',     dest: 'characters/AIKO.webp',     width: 800 },
  { src: 'KWAME.png',    dest: 'characters/KWAME.webp',    width: 800 },
  { src: 'OCTAVIA.png',  dest: 'characters/OCTAVIA.webp',  width: 800 },
  { src: 'FELIX.png',    dest: 'characters/FELIX.webp',    width: 800 },
  { src: 'AMARA.png',    dest: 'characters/AMARA.webp',    width: 800 },
  { src: 'ELIAS.png',    dest: 'characters/ELIAS.webp',    width: 800 },
  { src: 'SELENE.png',   dest: 'characters/SELENE.webp',   width: 800 },
  { src: 'RONAN.png',    dest: 'characters/RONAN.webp',    width: 800 },
  { src: 'NERISSA.png',  dest: 'characters/NERISSA.webp',  width: 800 },
  { src: 'SILAS.png',    dest: 'characters/SILAS.webp',    width: 800 },
  { src: 'VESTA.png',    dest: 'characters/VESTA.webp',    width: 800 },
  { src: 'EZRA.png',     dest: 'characters/EZRA.webp',     width: 800 },
  { src: 'ATHENA.png',   dest: 'characters/ATHENA.webp',   width: 800 },
  { src: 'SERIPHIA.png', dest: 'characters/SERIPHIA.webp', width: 900 },

  // ── Group / duo scene shots ──────────────────────────────────────
  // Used in /universe Featured Duos section
  { src: 'Aquaria_Ronan_Nerissa.png',    dest: 'duos/Aquaria_Ronan_Nerissa.webp',    width: 1000 },
  { src: 'Celestia_Elias_Selene.png',    dest: 'duos/Celestia_Elias_Selene.webp',    width: 1000 },
  { src: 'Luminosity_Athena_Ezra.png',   dest: 'duos/Luminosity_Athena_Ezra.webp',   width: 1000 },

  // ── Book cover ───────────────────────────────────────────────────
  // Used in Media Room / hero sections
  { src: 'SOE_RQ_COVER.png', dest: 'cover.webp', width: 1200 },

  // ── Background / environment images ─────────────────────────────
  { src: 'SOE background.png',  dest: 'backgrounds/soe-bg-1.webp',  width: 1920 },
  { src: 'SOE background2.png', dest: 'backgrounds/soe-bg-2.webp',  width: 1920 },
  { src: 'SOE background3.png', dest: 'backgrounds/soe-bg-3.webp',  width: 1920 },

  // ── Scene / B-roll illustrations ────────────────────────────────
  { src: 'Wildflower Path.png',   dest: 'scenes/wildflower-path.webp',   width: 1400 },
  { src: 'Drums.png',             dest: 'scenes/drums.webp',             width: 1200 },
  { src: 'Climb Numeria.png',     dest: 'scenes/climb-numeria.webp',     width: 1200 },
  { src: 'Touch your toes.png',   dest: 'scenes/touch-your-toes.webp',   width: 1000 },
  { src: 'Wave.png',              dest: 'scenes/wave.webp',              width: 1000 },
  { src: 'B roll boats.png',      dest: 'scenes/b-roll-boats.webp',      width: 1400 },
  { src: 'B roll flowers.png',    dest: 'scenes/b-roll-flowers.webp',    width: 1400 },
  { src: 'Seriphia in Celestia.png', dest: 'scenes/seriphia-in-celestia.webp', width: 1400 },
  { src: 'Donkey.png',            dest: 'scenes/donkey.webp',            width: 1000 },

  // ── Media Room shots (Shot 1–11) ─────────────────────────────────
  { src: 'Shot 1.jpeg',   dest: 'media/shot-01.webp', width: 1200 },
  { src: 'Shot 2.jpeg',   dest: 'media/shot-02.webp', width: 1200 },
  { src: 'Shot 3.png',    dest: 'media/shot-03.webp', width: 1200 },
  { src: 'Shot 4.jpeg',   dest: 'media/shot-04.webp', width: 1200 },
  { src: 'Shot 5.jpeg',   dest: 'media/shot-05.webp', width: 1200 },
  { src: 'Shot 6.jpeg',   dest: 'media/shot-06.webp', width: 1200 },
  { src: 'Shot 7.jpeg',   dest: 'media/shot-07.webp', width: 1200 },
  { src: 'Shot 8.jpeg',   dest: 'media/shot-08.webp', width: 1200 },
  { src: 'Shot 9.jpeg',   dest: 'media/shot-09.webp', width: 1200 },
  { src: 'Shot 10.jpeg',  dest: 'media/shot-10.webp', width: 1200 },
  { src: 'Shot 11.jpeg',  dest: 'media/shot-11.webp', width: 1200 },

  // ── Numbered pages (dictionary / media room panels) ──────────────
  { src: '1.png',  dest: 'pages/page-01.webp', width: 1600 },
  { src: '2.png',  dest: 'pages/page-02.webp', width: 1600 },
  { src: '3.png',  dest: 'pages/page-03.webp', width: 1600 },
  { src: '4.png',  dest: 'pages/page-04.webp', width: 1600 },
  { src: '5.png',  dest: 'pages/page-05.webp', width: 1600 },
  { src: '6.png',  dest: 'pages/page-06.webp', width: 1600 },
  { src: '7.png',  dest: 'pages/page-07.webp', width: 1600 },
  { src: '8.png',  dest: 'pages/page-08.webp', width: 1600 },
  { src: '9.png',  dest: 'pages/page-09.webp', width: 1600 },
  { src: '10.png', dest: 'pages/page-10.webp', width: 1600 },
  { src: '11.png', dest: 'pages/page-11.webp', width: 1600 },
  { src: '12.png', dest: 'pages/page-12.webp', width: 1600 },
  { src: '13.png', dest: 'pages/page-13.webp', width: 1600 },
  { src: '14.png', dest: 'pages/page-14.webp', width: 1600 },
  { src: 'Page 3.1.png', dest: 'pages/page-03-1.webp', width: 1600 },
  { src: 'Page 7.1.png', dest: 'pages/page-07-1.webp', width: 1600 },
];

// ── Runner ────────────────────────────────────────────────────────
let processed = 0;
let skipped = 0;
let failed = 0;
let totalSavedMB = 0;

console.log('\n🖼️  SOE Asset Import Pipeline\n' + '─'.repeat(50));

for (const item of MANIFEST) {
  const srcPath  = join(SRC, item.src);
  const destPath = join(DEST, item.dest);
  const destDir  = destPath.substring(0, destPath.lastIndexOf('\\'));

  // Ensure destination directory exists
  if (!existsSync(destDir)) {
    await mkdir(destDir, { recursive: true });
  }

  // Check source exists
  if (!existsSync(srcPath)) {
    console.warn(`⚠  MISSING source: ${item.src}`);
    skipped++;
    continue;
  }

  try {
    const { size: srcSize } = await stat(srcPath);
    const srcMB = (srcSize / 1024 / 1024).toFixed(1);

    await sharp(srcPath)
      .resize({ width: item.width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(destPath);

    const { size: destSize } = await stat(destPath);
    const destMB  = (destSize / 1024 / 1024).toFixed(1);
    const savedMB = (srcSize - destSize) / 1024 / 1024;
    totalSavedMB += savedMB;

    console.log(`✓  ${item.src.padEnd(35)} ${srcMB}MB → ${destMB}MB  →  ${item.dest}`);
    processed++;
  } catch (err) {
    console.error(`✗  ${item.src}: ${err.message}`);
    failed++;
  }
}

console.log('\n' + '─'.repeat(50));
console.log(`✅  Processed : ${processed}`);
console.log(`⚠   Skipped  : ${skipped}`);
console.log(`✗   Failed   : ${failed}`);
console.log(`📦  Total saved: ~${totalSavedMB.toFixed(0)}MB`);
console.log('\nAll assets ready in public/assets/\n');
