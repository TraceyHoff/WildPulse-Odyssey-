const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /case "(.*?)":\s*svgContent = `<rect/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[1]);
}
