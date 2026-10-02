import fs from 'fs';
import path from 'path';

const uploadedFiles = [
  'media_1790935264113.jpg',
  'media_1790935264120.jpg',
  'media_1790935264123.jpg',
  'media_1790935264124.jpg',
  'media_1790935264128.jpg',
];

const userUploadedDir = 'C:\\Users\\RAJESH\\.gemini\\antigravity-ide\\brain\\ba3bcf61-c60e-4a88-9883-9f81ac6ca958\\.user_uploaded';
const publicDir = path.resolve('./public');

uploadedFiles.forEach((file, index) => {
  const src = path.join(userUploadedDir, file);
  const subscriberNum = index + 4; // subscriber_4 to subscriber_8
  
  const destJpg = path.join(publicDir, `subscriber_${subscriberNum}.jpg`);
  const destWebp = path.join(publicDir, `subscriber_${subscriberNum}.webp`);
  
  fs.copyFileSync(src, destJpg);
  fs.copyFileSync(src, destWebp);
  console.log(`Copied ${file} -> subscriber_${subscriberNum}.jpg & subscriber_${subscriberNum}.webp`);
});

// Create subscriber 9 and 10 from images 0 and 1
fs.copyFileSync(path.join(userUploadedDir, uploadedFiles[0]), path.join(publicDir, 'subscriber_9.jpg'));
fs.copyFileSync(path.join(userUploadedDir, uploadedFiles[0]), path.join(publicDir, 'subscriber_9.webp'));
fs.copyFileSync(path.join(userUploadedDir, uploadedFiles[1]), path.join(publicDir, 'subscriber_10.jpg'));
fs.copyFileSync(path.join(userUploadedDir, uploadedFiles[1]), path.join(publicDir, 'subscriber_10.webp'));

console.log('Successfully copied all 10 subscriber images!');
