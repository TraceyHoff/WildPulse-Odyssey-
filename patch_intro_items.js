const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

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

fs.writeFileSync('index.html', code);
console.log('Fixed introCarouselItems');
