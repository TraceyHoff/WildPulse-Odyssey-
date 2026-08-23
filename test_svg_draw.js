const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let getItemIconHTML_code = html.match(/window\.getItemIconHTML = function\(.*?};/s)[0];

const window = {};
eval(getItemIconHTML_code);

const itemHtml = window.getItemIconHTML("Neon Couch", 100);
const svgMatch = itemHtml.match(/<svg[^>]*>.*?<\/svg>/is);
let svgStr = svgMatch[0];
svgStr = svgStr.replace(/<span.*?>.*?<\/span>/gi, '');
svgStr = svgStr.replace(/<rect width="100" height="100" rx="20" fill="url\(#bgGrad\)" stroke=".*?" stroke-width="4"\/>/i, '');

console.log(svgStr);
