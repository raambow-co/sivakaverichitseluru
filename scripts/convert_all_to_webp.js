import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

// Recursively find all image files
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.jfif'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

async function convertImage(filePath) {
  const ext = path.extname(filePath);
  const webpPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
  const originalSize = fs.statSync(filePath).size;

  const image = sharp(filePath);
  const metadata = await image.metadata();

  let pipeline = image;

  // If huge image (> 1920px wide/high), resize down for web display
  if (metadata.width > 1920 || metadata.height > 1920) {
    pipeline = pipeline.resize({
      width: metadata.width > 1920 ? 1920 : undefined,
      height: metadata.height > 1920 ? 1920 : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // If image has alpha transparency (like 3D coins, scheme cutouts, logos)
  if (metadata.hasAlpha) {
    pipeline = pipeline.webp({
      quality: 90,
      alphaQuality: 100,
      lossless: false,
      effort: 6,
    });
  } else {
    pipeline = pipeline.webp({
      quality: 85,
      effort: 6,
    });
  }

  await pipeline.toFile(webpPath);
  const newSize = fs.statSync(webpPath).size;

  const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
  const relPath = path.relative(PUBLIC_DIR, filePath);
  const relWebp = path.relative(PUBLIC_DIR, webpPath);

  console.log(`✓ ${relPath} (${(originalSize / 1024).toFixed(1)} KB) -> ${relWebp} (${(newSize / 1024).toFixed(1)} KB) [Saved ${savings}%]`);
}

async function run() {
  console.log('--- Starting Ultra WebP Image Optimization ---');
  const images = findImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to convert...\n`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const img of images) {
    totalOriginal += fs.statSync(img).size;
    await convertImage(img);
    const ext = path.extname(img);
    const webpPath = img.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
    totalWebp += fs.statSync(webpPath).size;
  }

  console.log('\n--- Summary ---');
  console.log(`Total Original Size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Optimized WebP Size: ${(totalWebp / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Bandwidth Saved: ${(((totalOriginal - totalWebp) / totalOriginal) * 100).toFixed(1)}%`);
}

run().catch(console.error);
