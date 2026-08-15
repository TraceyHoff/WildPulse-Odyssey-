const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Add to items in updateStoreUI
code = code.replace(
    /({ name: "Mini Challenge".*)/,
    `$1,
                { name: "Neon Couch", icon: "🛋️", price: 500, desc: "A comfortable neon-lit couch for your home. Place inside using mini-tile placement." },
                { name: "Cyber Desk", icon: "🖥️", price: 550, desc: "A high-tech cyber desk for your home. Place inside using mini-tile placement." },
                { name: "Glow Carpet", icon: "🔲", price: 300, desc: "A glowing cybernetic carpet. Place inside using mini-tile placement." },
                { name: "Holo Bed", icon: "🛏️", price: 800, desc: "A futuristic holographic bed. Place inside using mini-tile placement." }`
);

// 2. Add to itemIcons (globally used in various places)
const regexItemIcons = /"Mini Challenge": "👑",/g;
code = code.replace(regexItemIcons, `"Mini Challenge": "👑",
        "Neon Couch": "🛋️",
        "Cyber Desk": "🖥️",
        "Glow Carpet": "🔲",
        "Holo Bed": "🛏️",`);

// 3. Add to emojiMap inside getItemIconHTML
code = code.replace(
    /("Mini Challenge": "👑",)/g,
    `$1
        "Neon Couch": "🛋️",
        "Cyber Desk": "🖥️",
        "Glow Carpet": "🔲",
        "Holo Bed": "🛏️",`
);

fs.writeFileSync('index.html', code);
console.log('Patched index.html for store items, itemIcons, and emojiMap');
