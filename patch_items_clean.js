const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Add to items in updateStoreUI
// Let's find updateStoreUI specifically
const storeUIReplacementStr = `
                { name: "Mini Challenge", icon: "👑", price: 770, desc: "A functional smaller version of the Challenge area. Place near your home." },
                { name: "Neon Couch", icon: "🛋️", price: 500, desc: "A comfortable neon-lit couch for your home. Place inside using mini-tile placement." },
                { name: "Cyber Desk", icon: "🖥️", price: 550, desc: "A high-tech cyber desk for your home. Place inside using mini-tile placement." },
                { name: "Glow Carpet", icon: "🔲", price: 300, desc: "A glowing cybernetic carpet. Place inside using mini-tile placement." },
                { name: "Holo Bed", icon: "🛏️", price: 800, desc: "A futuristic holographic bed. Place inside using mini-tile placement." }
`;

code = code.replace(
    /{ name: "Mini Challenge", icon: "👑", price: 770, desc: "A functional smaller version of the Challenge area. Place near your home." }/,
    storeUIReplacementStr.trim()
);


// 1b. Add to introCarouselItems
const introReplacementStr = `
        { name: "Mini Challenge", icon: "👑", desc: "A functional smaller version of the Challenge area. Place near your home. (Requires Lv 10)" },
        { name: "Neon Couch", icon: "🛋️", desc: "A comfortable neon-lit couch for your home. Place inside using mini-tile placement." },
        { name: "Cyber Desk", icon: "🖥️", desc: "A high-tech cyber desk for your home. Place inside using mini-tile placement." },
        { name: "Glow Carpet", icon: "🔲", desc: "A glowing cybernetic carpet. Place inside using mini-tile placement." },
        { name: "Holo Bed", icon: "🛏️", desc: "A futuristic holographic bed. Place inside using mini-tile placement." }
`;
code = code.replace(
    /{ name: "Mini Challenge", icon: "👑", desc: "A functional smaller version of the Challenge area. Place near your home. \\(Requires Lv 10\\)" }/,
    introReplacementStr.trim()
);


// 2. Add to itemIcons across the codebase
const itemIconsStr = `"Mini Challenge": "👑",
        "Neon Couch": "🛋️",
        "Cyber Desk": "🖥️",
        "Glow Carpet": "🔲",
        "Holo Bed": "🛏️",`;

code = code.replace(/"Mini Challenge": "👑",/g, itemIconsStr);

fs.writeFileSync('index.html', code);
console.log("Patched correctly!");
