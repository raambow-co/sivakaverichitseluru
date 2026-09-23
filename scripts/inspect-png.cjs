const fs = require('fs');
const path = require('path');

console.log('🏛️ Siva Kaveri Chits — PNG Asset Inspector');
const assetsDir = path.join(__dirname, '..', 'public', 'assets', 'images');

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  console.log(`Found ${files.length} asset entries in public/assets/images:`, files);
} else {
  console.log('Images folder will be populated dynamically.');
}
