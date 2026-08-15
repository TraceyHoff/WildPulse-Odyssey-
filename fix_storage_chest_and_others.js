const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I also need to add SVGs for "Storage Chest", "Mini Hospital", "Mini Store", "Mini Trade", "Mini PvP", "Mini Breeding Center".
const extraIcons = `
        case "Storage Chest":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#ff7f00" stroke-width="4"/>
                <rect x="25" y="35" width="50" height="40" rx="5" fill="#152238" stroke="#ff7f00" stroke-width="2" />
                <path d="M25,50 C25,40 75,40 75,50 Z" fill="rgba(255, 127, 0, 0.2)" stroke="#ff7f00" stroke-width="2" />
                <rect x="45" y="45" width="10" height="10" rx="2" fill="#ff007f" />
                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["Storage Chest"]}</span>\`;
            break;
        case "Mini Hospital":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <rect x="30" y="30" width="40" height="40" rx="5" fill="#152238" stroke="#00ffd2" stroke-width="2" />
                <rect x="45" y="40" width="10" height="20" fill="#00ff66" />
                <rect x="40" y="45" width="20" height="10" fill="#00ff66" />
                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["Mini Hospital"]}</span>\`;
            break;
        case "Mini Store":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <rect x="25" y="35" width="50" height="35" rx="2" fill="#152238" stroke="#00ffd2" stroke-width="2" />
                <path d="M20,35 L80,35 L75,25 L25,25 Z" fill="#ff007f" stroke="#00ffd2" stroke-width="1" />
                <rect x="35" y="45" width="30" height="15" fill="rgba(0, 255, 210, 0.2)" stroke="#00ffd2" stroke-width="1" />
                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["Mini Store"]}</span>\`;
            break;
        case "Mini Trade":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <circle cx="50" cy="50" r="25" fill="#152238" stroke="#00ffd2" stroke-width="2" />
                <path d="M40,35 L60,35 L55,45 L45,45 Z" fill="#ff007f" />
                <path d="M40,65 L60,65 L55,55 L45,55 Z" fill="#00ff66" />
                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["Mini Trade"]}</span>\`;
            break;
        case "Mini PvP":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <path d="M30,30 L70,70" stroke="#ff007f" stroke-width="4" />
                <path d="M30,70 L70,30" stroke="#ff007f" stroke-width="4" />
                <circle cx="50" cy="50" r="10" fill="#152238" stroke="#00ffd2" stroke-width="2" />
                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["Mini PvP"]}</span>\`;
            break;
        case "Mini Breeding Center":
            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>
                <ellipse cx="50" cy="55" rx="15" ry="20" fill="#152238" stroke="#ff007f" stroke-width="2" />
                <circle cx="50" cy="55" r="5" fill="#00ffd2" />
                <path d="M30,70 L70,70" stroke="#00ffd2" stroke-width="2" />
                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["Mini Breeding Center"]}</span>\`;
            break;
`;

html = html.replace('case "Mini Challenge":', extraIcons + '        case "Mini Challenge":');

fs.writeFileSync('index.html', html);
