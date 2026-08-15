const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// There's a duplicate insertion of Neon Couch in itemIcons and emojiMap
// And a syntax error in intro modal `},,` -> `},`
code = code.replace(/},,\n/g, '},\n');

code = code.replace(
    /        "Mini Challenge": "👑",\n        "Neon Couch": "🛋️",\n        "Cyber Desk": "🖥️",\n        "Glow Carpet": "🔲",\n        "Holo Bed": "🛏️",\n        "Neon Couch": "🛋️",\n        "Cyber Desk": "🖥️",\n        "Glow Carpet": "🔲",\n        "Holo Bed": "🛏️",/g,
    `        "Mini Challenge": "👑",\n        "Neon Couch": "🛋️",\n        "Cyber Desk": "🖥️",\n        "Glow Carpet": "🔲",\n        "Holo Bed": "🛏️",`
);

fs.writeFileSync('index.html', code);
console.log('Fixed syntax and duplicates in index.html');
