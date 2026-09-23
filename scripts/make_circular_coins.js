import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createCircularCoin(inputPath, outputPath, size = 256) {
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="white"/></svg>`
  );

  await sharp(inputPath)
    .resize(size, size, { fit: 'cover' })
    .composite([
      {
        input: circleSvg,
        blend: 'dest-in'
      }
    ])
    .png()
    .toFile(outputPath);

  console.log(`Created circular transparent coin: ${outputPath}`);
}

async function main() {
  const coinsDir = path.join(__dirname, '..', 'public', 'assets', 'coins');
  await createCircularCoin(path.join(coinsDir, 'coin_rupee.jpg'), path.join(coinsDir, 'coin_rupee.png'), 256);
  await createCircularCoin(path.join(coinsDir, 'coin_lakshmi.jpg'), path.join(coinsDir, 'coin_lakshmi.png'), 256);
}

main().catch(console.error);
