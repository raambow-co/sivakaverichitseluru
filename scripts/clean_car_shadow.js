import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cleanCarShadow() {
  const carPath = path.join(__dirname, '..', 'public', 'assets', 'schemes', 'luxury_car_3d.png');
  const image = sharp(carPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;

  // Let's analyze pixels below y = 680
  // The key fob is on the left: roughly x in [0, 250], y in [550, 780]
  // The car wheels are at:
  // Front wheel: roughly x in [450, 620], y in [500, 720]
  // Rear wheel: roughly x in [820, 950], y in [450, 620]
  // Anything below y = 730 is either the bottom tip of key fob (around x < 250) or pure shadow!
  // Furthermore, shadow pixels are characterized by low saturation (R ~= G ~= B) and light grey color (R > 160, G > 160, B > 160)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const alpha = data[idx + 3];

      if (alpha === 0) continue;

      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;
      const brightness = (r + g + b) / 3;

      // Below y = 700:
      // If it's not the key fob (x > 240) and it's below the front wheel (y > 720), or it's a desaturated grey smudge
      if (y > 715) {
        // Only keep if it's the golden key fob (x < 220 and y < 780 with gold color)
        if (x < 230 && y < 780 && (r > g && g > b)) {
          // Keep key fob
        } else {
          // Remove shadow
          data[idx + 3] = 0;
        }
      } else if (y > 670) {
        // Between y = 670 and y = 715: check for blurry grey shadow (low saturation and light/mid grey)
        // Car tires and rims have high contrast or deep black/gold; shadow has low saturation and brightness > 150
        if (x > 220 && saturation < 0.15 && brightness > 160) {
          data[idx + 3] = 0;
        }
      }
    }
  }

  // Soften remaining boundary
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .png({ quality: 95 })
  .toFile(carPath);

  console.log('Successfully cleaned car shadow from luxury_car_3d.png!');
}

cleanCarShadow().catch(console.error);
