import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanImageEdges(filePath) {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const { data } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = 4;

  // Clear 2-pixel outer perimeter completely to avoid any compression artifacts
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < 3; y++) {
      data[(y * width + x) * channels + 3] = 0;
      data[((height - 1 - y) * width + x) * channels + 3] = 0;
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < 3; x++) {
      data[(y * width + x) * channels + 3] = 0;
      data[(y * width + (width - 1 - x)) * channels + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width, height, channels: 4 }
  })
  .png({ quality: 95 })
  .toFile(filePath);

  console.log(`Cleaned edges: ${path.basename(filePath)}`);
}

async function main() {
  const dir = path.join(__dirname, '..', 'public', 'assets', 'schemes');
  const files = ['gold_pot_3d.png', 'business_store_3d.png', 'education_books_3d.png', 'luxury_car_3d.png', 'large_business_3d.png'];
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.existsSync(p)) {
      await cleanImageEdges(p);
    }
  }
}

main().catch(console.error);
