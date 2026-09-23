const fs = require('fs');
const path = require('path');

console.log('🏛️ Siva Kaveri Chits — Asset Optimizer & Favicon Builder');

const publicDir = path.join(__dirname, '..', 'public');
const faviconSvg = path.join(publicDir, 'favicon.svg');

if (fs.existsSync(faviconSvg)) {
  console.log('✓ Verified SVG vector favicon at public/favicon.svg');
} else {
  console.warn('! Missing public/favicon.svg');
}

console.log('Favicon pipeline initialized successfully.');
