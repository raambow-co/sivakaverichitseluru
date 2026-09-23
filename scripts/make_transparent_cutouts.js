import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertWhiteToTransparent(inputPath, outputPath, options = {}) {
  const {
    threshold = 246, // Pixels brighter than this in all RGB channels are considered white background
    feather = 2
  } = options;

  console.log(`Converting to transparent PNG: ${inputPath}`);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // 4 (RGBA)
  const isBg = new Uint8Array(width * height);

  // Flood fill from outer boundary pixels that are near white
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function isWhitePixel(r, g, b) {
    return r >= threshold && g >= threshold && b >= threshold;
  }

  // Check top and bottom rows
  for (let x = 0; x < width; x++) {
    const topIdx = (0 * width + x) * channels;
    if (isWhitePixel(data[topIdx], data[topIdx + 1], data[topIdx + 2])) {
      isBg[0 * width + x] = 1;
      queue[tail++] = 0 * width + x;
    }
    const btmIdx = ((height - 1) * width + x) * channels;
    if (isWhitePixel(data[btmIdx], data[btmIdx + 1], data[btmIdx + 2])) {
      isBg[(height - 1) * width + x] = 1;
      queue[tail++] = (height - 1) * width + x;
    }
  }

  // Check left and right columns
  for (let y = 0; y < height; y++) {
    const leftIdx = (y * width + 0) * channels;
    if (!isBg[y * width + 0] && isWhitePixel(data[leftIdx], data[leftIdx + 1], data[leftIdx + 2])) {
      isBg[y * width + 0] = 1;
      queue[tail++] = y * width + 0;
    }
    const rightIdx = (y * width + (width - 1)) * channels;
    if (!isBg[y * width + (width - 1)] && isWhitePixel(data[rightIdx], data[rightIdx + 1], data[rightIdx + 2])) {
      isBg[y * width + (width - 1)] = 1;
      queue[tail++] = y * width + (width - 1);
    }
  }

  // BFS flood fill
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const npos = ny * width + nx;
        if (isBg[npos] === 0) {
          const nidx = npos * channels;
          const nr = data[nidx];
          const ng = data[nidx + 1];
          const nb = data[nidx + 2];

          // If adjacent pixel is white-ish, it's background
          if (isWhitePixel(nr, ng, nb)) {
            isBg[npos] = 1;
            queue[tail++] = npos;
          }
        }
      }
    }
  }

  // Set alpha for background & calculate partial alpha for edge transition
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * channels;
      if (isBg[pos] === 1) {
        data[idx + 3] = 0; // Fully transparent
      } else {
        // Linear fade for near-white boundary pixels
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const minVal = Math.min(r, g, b);
        if (minVal > 240) {
          const factor = (255 - minVal) / 15;
          data[idx + 3] = Math.max(0, Math.min(255, Math.round(factor * 255)));
        }
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(outputPath);

  console.log(`Successfully generated transparent PNG: ${outputPath}`);
}

async function run() {
  const brainDir = 'C:\\Users\\RAJESH\\.gemini\\antigravity-ide\\brain\\50b194c5-60a2-402a-a22e-9f968661034f';
  const outDir = path.join(__dirname, '..', 'public', 'assets', 'schemes');

  const files = [
    { in: 'gold_kalash_3d_1790176600108.jpg', out: 'gold_pot_3d.png', threshold: 244 },
    { in: 'business_store_3d_1790176647532.jpg', out: 'business_store_3d.png', threshold: 245 },
    { in: 'education_books_3d_1790176865538.jpg', out: 'education_books_3d.png', threshold: 242 },
    { in: 'luxury_car_3d_1790177010252.jpg', out: 'luxury_car_3d.png', threshold: 243 },
    { in: 'large_business_3d_1790177057224.jpg', out: 'large_business_3d.png', threshold: 244 }
  ];

  for (const f of files) {
    const inPath = path.join(brainDir, f.in);
    const outPath = path.join(outDir, f.out);
    if (fs.existsSync(inPath)) {
      await convertWhiteToTransparent(inPath, outPath, { threshold: f.threshold });
    } else {
      console.warn(`File not found: ${inPath}`);
    }
  }
}

run().catch(console.error);
