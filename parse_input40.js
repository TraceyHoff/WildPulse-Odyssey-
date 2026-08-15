const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const str3 = `        if (window.p2HomePlacementMode) {`;
const idx3 = content.indexOf(str3);
console.log(content.substring(idx3, idx3 + 1200));
