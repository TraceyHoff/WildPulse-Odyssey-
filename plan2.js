const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Draw branches extending into canopy')) {
    console.log(lines.slice(i, i + 100).join('\n'));
    break;
  }
}
