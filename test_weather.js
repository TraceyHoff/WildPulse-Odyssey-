const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

if (html.includes("window.weatherPattern = 'thundersnow'") && html.includes("window.weatherPattern === 'thunderstorm' || window.weatherPattern === 'thundersnow'")) {
  console.log('Weather conditions logic verified.');
} else {
  console.log('Weather conditions logic missing.');
}
