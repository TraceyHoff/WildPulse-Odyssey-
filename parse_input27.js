const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const str = `if (window.p1HomePlacementMode) {`;
const idx = content.indexOf(str);
console.log(content.substring(idx - 200, idx + 500));
