const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const insertTarget = 'case "Mini Challenge":';
const replacementStr = `
        case "Neon Couch":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <rect x="20" y="50" width="60" height="20" fill="#1e1e2e" stroke="#00ffd2" stroke-width="3" filter="url(#glow)"/>
                <rect x="15" y="45" width="70" height="15" fill="#181825" stroke="#00ffd2" stroke-width="3"/>
                <rect x="15" y="50" width="10" height="25" fill="#1e1e2e" stroke="#00ffd2" stroke-width="2"/>
                <rect x="75" y="50" width="10" height="25" fill="#1e1e2e" stroke="#00ffd2" stroke-width="2"/>\`;
            break;
        case "Cyber Desk":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <rect x="25" y="30" width="50" height="25" fill="#0a0a0a" stroke="#ff00ff" stroke-width="3" filter="url(#glow)"/>
                <rect x="20" y="55" width="60" height="10" fill="#111" stroke="#00ffd2" stroke-width="2"/>
                <rect x="35" y="60" width="30" height="5" fill="#00ffd2" filter="url(#glow)"/>
                <rect x="25" y="65" width="8" height="20" fill="#555"/>
                <rect x="67" y="65" width="8" height="20" fill="#555"/>\`;
            break;
        case "Glow Carpet":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#ff9f00" stroke-width="4"/>
                <rect x="20" y="20" width="60" height="60" fill="#000" stroke="#ff9f00" stroke-width="4" filter="url(#glow)"/>
                <rect x="35" y="35" width="30" height="30" fill="none" stroke="#00ffd2" stroke-width="3" filter="url(#glow)"/>
                <line x1="50" y1="20" x2="50" y2="80" stroke="#00ffd2" stroke-width="2"/>
                <line x1="20" y1="50" x2="80" y2="50" stroke="#00ffd2" stroke-width="2"/>\`;
            break;
        case "Holo Bed":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#ff00ff" stroke-width="4"/>
                <rect x="25" y="20" width="50" height="60" fill="#222" stroke="#ff00ff" stroke-width="3"/>
                <rect x="30" y="40" width="40" height="40" fill="rgba(0, 255, 255, 0.5)" filter="url(#glow)"/>
                <rect x="35" y="25" width="30" height="10" fill="#fff" stroke="#ff00ff" stroke-width="2"/>
                <circle cx="25" cy="20" r="4" fill="#00ffd2" filter="url(#glow)"/>
                <circle cx="75" cy="20" r="4" fill="#00ffd2" filter="url(#glow)"/>\`;
            break;
        case "Mini Challenge":`;

code = code.replace(insertTarget, replacementStr);
fs.writeFileSync('index.html', code);
console.log('Patched SVG icons');
