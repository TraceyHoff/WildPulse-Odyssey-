const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

if (html.includes('Center drooping branches overlapping trunk')) {
  console.log('Willow tree changes verified.');
} else {
  console.log('Willow tree changes missing.');
}
