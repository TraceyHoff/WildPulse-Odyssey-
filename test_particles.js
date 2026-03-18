const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

if (html.includes("if (window.snowflakeEmitter && window.currentSeason === 'Winter') {") && html.includes("window.snowflakeEmitter.setQuantity(snowCount + 15)")) {
  console.log('Particle logic verified.');
} else {
  console.log('Particle logic missing.');
}
