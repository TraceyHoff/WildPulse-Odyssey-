const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const icons = fs.readFileSync('furniture_icons.txt', 'utf8');

// The replacement should be done before `default:` in the `switch (itemName)` inside `getItemIconHTML`
html = html.replace(/        default:\n            svgContent = `<rect width="100"/g, icons + '        default:\n            svgContent = `<rect width="100"');

fs.writeFileSync('index.html', html);
