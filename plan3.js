const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Weather only happens if cloudy and Summer/Fall')) {
    console.log(lines.slice(Math.max(0, i - 10), i + 20).join('\n'));
    break;
  }
}
