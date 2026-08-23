const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

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

const itemHtml = window.getItemIconHTML("Potted Ficus", 100);
console.log(itemHtml);
