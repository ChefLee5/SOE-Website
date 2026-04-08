import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_ASSETS = './public/assets';
const SIZE_THRESHOLD_MB = 2; // Compress anything over 2MB
const JPEG_QUALITY = 88;

async function findLargeFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findLargeFiles(full));
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      const { size } = await stat(full);
      if (size > SIZE_THRESHOLD_MB * 1024 * 1024) {
        results.push({ path: full, name: entry.name, sizeMB: (size / 1024 / 1024).toFixed(1) });
      }
    }
  }
  return results;
}

const files = await findLargeFiles(PUBLIC_ASSETS);
console.log(`\nFound ${files.length} files over ${SIZE_THRESHOLD_MB}MB:\n`);

let savedTotal = 0;
for (const file of files) {
  const isPng = extname(file.name).toLowerCase() === '.png';
  const outPath = file.path.replace(/\.(png|PNG)$/, '.jpg');
  
  try {
    const before = parseFloat(file.sizeMB);
    await sharp(file.path)
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(outPath);
    
    const { size: afterSize } = await stat(outPath);
    const after = (afterSize / 1024 / 1024).toFixed(1);
    const saved = (before - after).toFixed(1);
    savedTotal += parseFloat(saved);

    // Remove original PNG if output is different file
    if (isPng && outPath !== file.path) {
      await rename(file.path, file.path + '.bak');
      console.log(`✓ ${file.name}: ${before}MB → ${after}MB (saved ${saved}MB) → .jpg`);
    } else {
      console.log(`✓ ${file.name}: ${before}MB → ${after}MB (saved ${saved}MB)`);
    }
  } catch (err) {
    console.error(`✗ ${file.name}: ${err.message}`);
  }
}

console.log(`\n${'-'.repeat(50)}`);
console.log(`Total saved: ~${savedTotal.toFixed(0)}MB`);
console.log(`\nNOTE: Original PNGs renamed to .bak — delete them after verifying JPEGs look correct.`);
