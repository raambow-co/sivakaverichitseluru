import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function removeBackground(inputPath, outputPath, options = {}) {
  const {
    tolerance = 28,
    feather = 2,
    samplePoints = [[0, 0], [10, 10], [500, 0], [1023, 0], [0, 1023], [1023, 1023]]
  } = options;

  console.log(`Processing: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels; // 4 (RGBA)
  const isBg = new Uint8Array(width * height); // 0 = fg, 1 = bg, 2 = visited

  // Sample background colors from corner/border areas
  const bgSamples = [];
  for (const [sx, sy] of samplePoints) {
    const clampedX = Math.min(Math.max(0, sx), width - 1);
    const clampedY = Math.min(Math.max(0, sy), height - 1);
    const idx = (clampedY * width + clampedX) * channels;
    bgSamples.push([data[idx], data[idx + 1], data[idx + 2]]);
  }

  function colorDist(r1, g1, b1, r2, g2, b2) {
    return Math.sqrt(
      (r1 - r2) ** 2 * 0.3 +
      (g1 - g2) ** 2 * 0.59 +
      (b1 - b2) ** 2 * 0.11
    );
  }

  function matchesBg(r, g, b, localBg) {
    for (const bg of bgSamples) {
      if (colorDist(r, g, b, bg[0], bg[1], bg[2]) < tolerance) {
        return true;
      }
    }
    if (localBg && colorDist(r, g, b, localBg[0], localBg[1], localBg[2]) < tolerance * 0.85) {
      return true;
    }
    return false;
  }

  // BFS Queue
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  // Initialize queue with image borders
  for (let x = 0; x < width; x++) {
    // Top border
    let idx = (0 * width + x) * channels;
    if (matchesBg(data[idx], data[idx + 1], data[idx + 2])) {
      isBg[0 * width + x] = 1;
      queue[tail++] = 0 * width + x;
    }
    // Bottom border
    idx = ((height - 1) * width + x) * channels;
    if (matchesBg(data[idx], data[idx + 1], data[idx + 2])) {
      isBg[(height - 1) * width + x] = 1;
      queue[tail++] = (height - 1) * width + x;
    }
  }

  for (let y = 0; y < height; y++) {
    // Left border
    let idx = (y * width + 0) * channels;
    if (!isBg[y * width + 0] && matchesBg(data[idx], data[idx + 1], data[idx + 2])) {
      isBg[y * width + 0] = 1;
      queue[tail++] = y * width + 0;
    }
    // Right border
    idx = (y * width + (width - 1)) * channels;
    if (!isBg[y * width + (width - 1)] && matchesBg(data[idx], data[idx + 1], data[idx + 2])) {
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
    const currIdx = curr * channels;
    const currR = data[currIdx];
    const currG = data[currIdx + 1];
    const currB = data[currIdx + 2];

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

          if (matchesBg(nr, ng, nb, [currR, currG, currB])) {
            isBg[npos] = 1;
            queue[tail++] = npos;
          }
        }
      }
    }
  }

  // Set alpha for background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos * channels;
      if (isBg[pos] === 1) {
        data[idx + 3] = 0; // Transparent
      }
    }
  }

  // Anti-alias / soften edges
  if (feather > 0) {
    const alphaCopy = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      alphaCopy[i] = data[i * channels + 3];
    }

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const pos = y * width + x;
        const idx = pos * channels;
        if (alphaCopy[pos] > 0) {
          // Check if adjacent to transparent pixel
          let transparentNeighbors = 0;
          let sum = 0;
          let count = 0;
          for (let dy = -feather; dy <= feather; dy++) {
            for (let dx = -feather; dx <= feather; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                const nAlpha = alphaCopy[ny * width + nx];
                sum += nAlpha;
                count++;
                if (nAlpha === 0) transparentNeighbors++;
              }
            }
          }
          if (transparentNeighbors > 0) {
            data[idx + 3] = Math.round(sum / count);
          }
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

  console.log(`Saved: ${outputPath}`);
}

async function main() {
  const schemesDir = path.join(__dirname, '..', 'public', 'assets', 'schemes');
  
  const files = [
    { input: 'gold_pot_3d.jpg', output: 'gold_pot_3d.png', tolerance: 30 },
    { input: 'business_store_3d.jpg', output: 'business_store_3d.png', tolerance: 26 },
    { input: 'education_books_3d.jpg', output: 'education_books_3d.png', tolerance: 28 },
    { input: 'luxury_car_3d.jpg', output: 'luxury_car_3d.png', tolerance: 28 },
    { input: 'large_business_3d.jpg', output: 'large_business_3d.png', tolerance: 30 }
  ];

  for (const f of files) {
    const inPath = path.join(schemesDir, f.input);
    const outPath = path.join(schemesDir, f.output);
    if (fs.existsSync(inPath)) {
      await removeBackground(inPath, outPath, { tolerance: f.tolerance });
    }
  }

  // Also process coins if needed
  const coinsDir = path.join(__dirname, '..', 'public', 'assets', 'coins');
  if (fs.existsSync(coinsDir)) {
    const coinFiles = [
      { input: 'coin_rupee.jpg', output: 'coin_rupee.png', tolerance: 35 },
      { input: 'coin_lakshmi.jpg', output: 'coin_lakshmi.png', tolerance: 35 }
    ];
    for (const c of coinFiles) {
      const inPath = path.join(coinsDir, c.input);
      const outPath = path.join(coinsDir, c.output);
      if (fs.existsSync(inPath)) {
        await removeBackground(inPath, outPath, { tolerance: c.tolerance });
      }
    }
  }
}

main().catch(console.error);
