/*
 * Recolor the edge-connected lacquer-red background of menu photography.
 *
 * Usage:
 *   node scripts/recolor-menu-backgrounds.js <input-dir> <output-dir>
 *
 * The edge-connected mask prevents red ingredients inside a plate from being
 * recolored. Source assets remain untouched; optimized WebP files are written
 * to the output directory.
 */

const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const inputDir = path.resolve(process.argv[2] || 'assets/menu-red');
const outputDir = path.resolve(process.argv[3] || 'assets/menu-burgundy');

const SOURCE = [0xa6, 0x2b, 0x24];
const TARGET = [0x6f, 0x21, 0x1c];
const CHANNEL_SCALE = TARGET.map((value, index) => value / SOURCE[index]);

function isBackgroundRed(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max < 32 || max === min) return false;

  const saturation = (max - min) / max;
  let hue;
  if (max === r) hue = 60 * (((g - b) / (max - min)) % 6);
  else if (max === g) hue = 60 * ((b - r) / (max - min) + 2);
  else hue = 60 * ((r - g) / (max - min) + 4);
  if (hue < 0) hue += 360;

  return (
    (hue <= 28 || hue >= 334) &&
    saturation >= 0.25 &&
    r >= g * 1.16 &&
    r >= b * 1.1
  );
}

function edgeConnectedMask(data, width, height, channels) {
  const count = width * height;
  const eligible = new Uint8Array(count);
  const mask = new Uint8Array(count);
  const queue = new Int32Array(count);
  let head = 0;
  let tail = 0;

  for (let i = 0; i < count; i += 1) {
    const offset = i * channels;
    eligible[i] = isBackgroundRed(data[offset], data[offset + 1], data[offset + 2]) ? 1 : 0;
  }

  const enqueue = index => {
    if (!eligible[index] || mask[index]) return;
    mask[index] = 1;
    queue[tail++] = index;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) enqueue(index - 1);
    if (x + 1 < width) enqueue(index + 1);
    if (y > 0) enqueue(index - width);
    if (y + 1 < height) enqueue(index + width);
  }

  return mask;
}

async function recolorFile(filename) {
  const sourcePath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename);
  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mask = edgeConnectedMask(data, info.width, info.height, info.channels);
  let changed = 0;

  for (let i = 0; i < mask.length; i += 1) {
    if (!mask[i]) continue;
    const offset = i * info.channels;
    data[offset] = Math.round(data[offset] * CHANNEL_SCALE[0]);
    data[offset + 1] = Math.round(data[offset + 1] * CHANNEL_SCALE[1]);
    data[offset + 2] = Math.round(data[offset + 2] * CHANNEL_SCALE[2]);
    changed += 1;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .webp({ quality: 84, effort: 5 })
    .toFile(outputPath);

  return {
    file: filename,
    width: info.width,
    height: info.height,
    backgroundCoverage: Number((changed / mask.length).toFixed(4)),
  };
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const filenames = (await fs.readdir(inputDir))
    .filter(filename => filename.toLowerCase().endsWith('.webp'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  const results = [];
  for (const filename of filenames) results.push(await recolorFile(filename));

  const manifest = {
    collection: 'Hà Nội Quán wine-red menu photography',
    created: new Date().toISOString().slice(0, 10),
    sourceDirectory: path.relative(process.cwd(), inputDir).replaceAll('\\', '/'),
    outputDirectory: path.relative(process.cwd(), outputDir).replaceAll('\\', '/'),
    sourceColor: '#a62b24',
    targetColor: '#6f211c',
    method: 'Edge-connected red-background mask with texture-preserving channel remap',
    files: results,
  };

  await fs.writeFile(
    path.join(outputDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
  process.stdout.write(`Recolored ${results.length} menu images to ${outputDir}\n`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
