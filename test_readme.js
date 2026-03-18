const fs = require('fs');
const path = require('path');
const readme = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');

if (readme.includes('### New Features (v13)') && readme.includes('Realistic Willow Trees')) {
  console.log('README verified.');
} else {
  console.log('README missing.');
}
