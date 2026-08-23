const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Extract the whole function
const regex = /window\.getItemIconHTML = function\(itemName, size = 24\) \{([\s\S]*?)return/g;
let match = regex.exec(html);

const itemHtmlCode = `
window.getItemIconHTML = function(itemName, size = 24) {
${match[1]}
    return \`<svg width="\${size}" height="\${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="\${baseColor}" />
                    <stop offset="100%" stop-color="#050a12" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            \${svgContent}
        </svg>\`;
};
`;

const window = {};
eval(itemHtmlCode);

const itemHtml = window.getItemIconHTML("Neon Couch", 100);
const svgMatch = itemHtml.match(/<svg[^>]*>.*?<\/svg>/is);
let svgStr = svgMatch[0];
svgStr = svgStr.replace(/<span.*?>.*?<\/span>/gi, '');
svgStr = svgStr.replace(/<rect width="100" height="100" rx="20" fill="url\(#bgGrad\)" stroke=".*?" stroke-width="4"\/>/i, '');

console.log(svgStr);
