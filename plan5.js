const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const lines = html.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('if (window.currentSeason === \'Winter\' && window.snowflakeEmitter) {')) {
    console.log(lines.slice(Math.max(0, i - 5), i + 25).join('\n'));
    break;
  }
}
