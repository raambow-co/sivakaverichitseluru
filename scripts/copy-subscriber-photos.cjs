const fs = require('fs');
const path = require('path');

const srcFiles = [
  'download (4).jfif',
  'download (5).jfif',
  'download (6).jfif'
];

srcFiles.forEach((file, idx) => {
  const num = idx + 1;
  const src = path.resolve(__dirname, '..', file);
  const dstDir1 = path.resolve(__dirname, '..', 'public', 'assets', 'images');
  const dstDir2 = path.resolve(__dirname, '..', 'public');
  
  fs.copyFileSync(src, path.join(dstDir1, `subscriber_${num}.jpg`));
  fs.copyFileSync(src, path.join(dstDir1, `subscriber_${num}.jfif`));
  fs.copyFileSync(src, path.join(dstDir2, `subscriber_${num}.jpg`));
  fs.copyFileSync(src, path.join(dstDir2, `subscriber_${num}.jfif`));
  console.log(`Successfully copied ${file} -> subscriber_${num}`);
});
