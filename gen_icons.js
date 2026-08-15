const names = [
    "Neon Couch", "Cyber Desk", "Glow Carpet", "Holo Bed",
    "Neon Chair", "Holo Table", "Cyber Plant", "Neon Lamp",
    "Server Rack", "Arcade Machine", "Cyber TV", "Neon Shelf",
    "Tech Bin", "Neon Wardrobe", "Cyber Fridge", "Holo Display"
];

names.forEach(name => {
    let code = `        case "${name}":\n`;
    code += `            svgContent = \`<rect width="100" height="100" rx="20" fill="url(#bgGrad)" stroke="#00ffd2" stroke-width="4"/>\n`;

    // Create distinct SVGs instead of emojis
    if (name === "Neon Couch") {
        code += `                <path d="M20,60 L20,40 C20,35 25,30 30,30 L70,30 C75,30 80,35 80,40 L80,60 L85,60 C87.76,60 90,62.24 90,65 L90,75 C90,77.76 87.76,80 85,80 L15,80 C12.24,80 10,77.76 10,75 L10,65 C10,62.24 12.24,60 15,60 Z" fill="#ff007f" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="25" y="60" width="50" height="10" fill="#00ffd2" opacity="0.8" />\n`;
    } else if (name === "Cyber Desk") {
        code += `                <path d="M15,70 L85,70 L80,85 L20,85 Z" fill="#333" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="35" y="25" width="30" height="20" rx="2" fill="#0b1424" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="48" y="45" width="4" height="25" fill="#00ffd2" />\n`;
        code += `                <line x1="38" y1="35" x2="62" y2="35" stroke="#00ffd2" stroke-width="2" opacity="0.5" />\n`;
    } else if (name === "Glow Carpet") {
        code += `                <rect x="15" y="40" width="70" height="40" rx="5" fill="#182d4d" stroke="#00ffd2" stroke-width="3" transform="skewX(-20)" />\n`;
        code += `                <line x1="25" y1="50" x2="75" y2="50" stroke="#00ffd2" stroke-width="1.5" opacity="0.6" transform="skewX(-20)" />\n`;
        code += `                <line x1="20" y1="65" x2="80" y2="65" stroke="#00ffd2" stroke-width="1.5" opacity="0.6" transform="skewX(-20)" />\n`;
    } else if (name === "Holo Bed") {
        code += `                <rect x="20" y="55" width="60" height="20" rx="3" fill="#152238" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <path d="M20,55 L80,55 L80,45 C80,35 20,35 20,45 Z" fill="rgba(0, 255, 210, 0.3)" />\n`;
        code += `                <rect x="25" y="45" width="20" height="10" rx="5" fill="#ff007f" opacity="0.8" />\n`;
    } else if (name === "Neon Chair") {
        code += `                <path d="M35,35 L65,35 L65,55 L35,55 Z" fill="#ff007f" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="35" y="55" width="30" height="10" rx="3" fill="#00ffd2" />\n`;
        code += `                <line x1="40" y1="65" x2="35" y2="85" stroke="#00ffd2" stroke-width="3" />\n`;
        code += `                <line x1="60" y1="65" x2="65" y2="85" stroke="#00ffd2" stroke-width="3" />\n`;
    } else if (name === "Holo Table") {
        code += `                <ellipse cx="50" cy="45" rx="35" ry="15" fill="#152238" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <ellipse cx="50" cy="40" rx="30" ry="10" fill="rgba(0, 255, 210, 0.4)" />\n`;
        code += `                <line x1="30" y1="55" x2="30" y2="80" stroke="#00ffd2" stroke-width="3" />\n`;
        code += `                <line x1="70" y1="55" x2="70" y2="80" stroke="#00ffd2" stroke-width="3" />\n`;
    } else if (name === "Cyber Plant") {
        code += `                <path d="M40,65 L60,65 L55,85 L45,85 Z" fill="#ff007f" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <path d="M50,65 C40,45 25,35 45,25 C45,45 50,55 50,65 Z" fill="#00ff66" opacity="0.8" />\n`;
        code += `                <path d="M50,65 C60,45 75,35 55,25 C55,45 50,55 50,65 Z" fill="#00ff66" opacity="0.8" />\n`;
        code += `                <path d="M50,65 C50,40 50,20 50,15 C45,20 55,20 50,65 Z" fill="#00ff66" />\n`;
    } else if (name === "Neon Lamp") {
        code += `                <path d="M35,80 L65,80 L60,75 L40,75 Z" fill="#333" stroke="#00ffd2" stroke-width="1.5" />\n`;
        code += `                <line x1="50" y1="75" x2="50" y2="30" stroke="#00ffd2" stroke-width="3" />\n`;
        code += `                <circle cx="50" cy="20" r="10" fill="#fff" filter="url(#glow)" />\n`;
        code += `                <path d="M40,25 L60,25 L55,10 L45,10 Z" fill="none" stroke="#ff007f" stroke-width="2" />\n`;
    } else if (name === "Server Rack") {
        code += `                <rect x="30" y="20" width="40" height="65" rx="2" fill="#152238" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <line x1="35" y1="30" x2="65" y2="30" stroke="#ff007f" stroke-width="3" stroke-dasharray="4 2" />\n`;
        code += `                <line x1="35" y1="45" x2="65" y2="45" stroke="#00ff66" stroke-width="3" stroke-dasharray="2 4 6 2" />\n`;
        code += `                <line x1="35" y1="60" x2="65" y2="60" stroke="#00ffd2" stroke-width="3" stroke-dasharray="5 2 2 2" />\n`;
        code += `                <line x1="35" y1="75" x2="65" y2="75" stroke="#ff007f" stroke-width="3" stroke-dasharray="1 1 1 5" />\n`;
    } else if (name === "Arcade Machine") {
        code += `                <path d="M35,20 L65,20 L65,40 L70,45 L70,85 L30,85 L30,45 L35,40 Z" fill="#333" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="40" y="25" width="20" height="15" fill="#0b1424" stroke="#ff007f" stroke-width="1.5" />\n`;
        code += `                <circle cx="45" cy="42" r="2" fill="#ff007f" />\n`;
        code += `                <rect x="52" y="41" width="8" height="3" fill="#00ff66" />\n`;
        code += `                <rect x="35" y="55" width="30" height="25" fill="#152238" stroke="#00ffd2" stroke-width="1" />\n`;
    } else if (name === "Cyber TV") {
        code += `                <rect x="15" y="25" width="70" height="40" rx="2" fill="#0b1424" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="20" y="30" width="60" height="30" fill="rgba(0, 255, 210, 0.2)" />\n`;
        code += `                <path d="M25,45 Q50,25 75,45 T75,45 Q50,65 25,45 Z" fill="none" stroke="#ff007f" stroke-width="1.5" opacity="0.8" />\n`;
        code += `                <line x1="45" y1="65" x2="45" y2="80" stroke="#00ffd2" stroke-width="3" />\n`;
        code += `                <line x1="55" y1="65" x2="55" y2="80" stroke="#00ffd2" stroke-width="3" />\n`;
        code += `                <line x1="35" y1="80" x2="65" y2="80" stroke="#00ffd2" stroke-width="2" />\n`;
    } else if (name === "Neon Shelf") {
        code += `                <rect x="25" y="15" width="50" height="70" rx="2" fill="none" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <line x1="25" y1="35" x2="75" y2="35" stroke="#ff007f" stroke-width="2" />\n`;
        code += `                <line x1="25" y1="55" x2="75" y2="55" stroke="#00ff66" stroke-width="2" />\n`;
        code += `                <line x1="25" y1="75" x2="75" y2="75" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="30" y="20" width="10" height="15" fill="#ff007f" opacity="0.6" />\n`;
        code += `                <rect x="45" y="40" width="15" height="15" fill="#00ff66" opacity="0.6" />\n`;
        code += `                <rect x="60" y="60" width="8" height="15" fill="#00ffd2" opacity="0.6" />\n`;
    } else if (name === "Tech Bin") {
        code += `                <path d="M35,25 L65,25 L60,80 L40,80 Z" fill="#152238" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <path d="M30,25 L70,25 L70,30 L30,30 Z" fill="#ff007f" />\n`;
        code += `                <line x1="45" y1="40" x2="45" y2="70" stroke="#00ffd2" stroke-width="1.5" stroke-dasharray="4 2" />\n`;
        code += `                <line x1="55" y1="40" x2="55" y2="70" stroke="#00ffd2" stroke-width="1.5" stroke-dasharray="4 2" />\n`;
    } else if (name === "Neon Wardrobe") {
        code += `                <rect x="25" y="20" width="50" height="65" rx="2" fill="#152238" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <line x1="50" y1="20" x2="50" y2="85" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="40" y="50" width="5" height="15" fill="#ff007f" rx="1" />\n`;
        code += `                <rect x="55" y="50" width="5" height="15" fill="#ff007f" rx="1" />\n`;
        code += `                <line x1="25" y1="30" x2="75" y2="30" stroke="#00ffd2" stroke-width="1" opacity="0.5" />\n`;
    } else if (name === "Cyber Fridge") {
        code += `                <rect x="30" y="15" width="40" height="70" rx="3" fill="#152238" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <line x1="30" y1="45" x2="70" y2="45" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <rect x="35" y="25" width="4" height="15" fill="#00ff66" rx="1" />\n`;
        code += `                <rect x="35" y="55" width="4" height="20" fill="#00ff66" rx="1" />\n`;
        code += `                <rect x="50" y="25" width="15" height="10" fill="none" stroke="#ff007f" stroke-width="1.5" opacity="0.8" />\n`;
    } else if (name === "Holo Display") {
        code += `                <path d="M30,85 L70,85 L65,75 L35,75 Z" fill="#333" stroke="#00ffd2" stroke-width="2" />\n`;
        code += `                <path d="M20,25 L80,25 L65,75 L35,75 Z" fill="rgba(0, 255, 210, 0.15)" stroke="rgba(0, 255, 210, 0.5)" stroke-width="1" stroke-dasharray="3 3" />\n`;
        code += `                <circle cx="50" cy="45" r="15" fill="none" stroke="#ff007f" stroke-width="2" opacity="0.8" />\n`;
        code += `                <circle cx="50" cy="45" r="5" fill="#00ffd2" />\n`;
        code += `                <line x1="35" y1="45" x2="65" y2="45" stroke="#00ff66" stroke-width="1" opacity="0.8" />\n`;
    }

    code += `\n                <span style="position: absolute; left: -9999px; opacity: 0.001; font-size: 1px; pointer-events: none;">\${emojiMap["${name}"]}</span>\`;\n`;
    code += `            break;`;
    console.log(code);
});
