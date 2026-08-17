const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Add to furniturePool
const furniturePoolReplacement = 'const furniturePool = ["Storage Chest", "Mini Hospital", "Mini Store", "Mini Trade", "Mini PvP", "Mini Breeding Center", "Mini Challenge", "Neon Couch", "L-Couch", "Love Seat", "Cyber Desk", "Office Chair", "Stool", "Coffee Table", "Dining Table", "Park Bench", "Cyber Bench", "Filing Cabinet", "Display Cabinet", "Nightstand", "Corner Table", "Bunk Bed", "King Bed", "Glow Carpet", "Star Carpet", "Round Cyber Carpet", "Hexagon Carpet", "Heart Carpet", "Diamond Carpet", "Holo Bed", "Neon Chair", "Holo Table", "Cyber Plant", "Crystal Bonsai", "Neon Fern", "Plasma Cactus", "Holo Orchid", "Neon Lamp", "Server Rack", "Arcade Machine", "Cyber TV", "Neon Shelf", "Tech Bin", "Neon Wardrobe", "Cyber Fridge", "Holo Display", "Lava Lamp", "Plasma Globe", "Cyber Poster", "Neon Sign", "Gaming PC", "Smart Mirror", "Potted Ficus", "Monstera Plant", "Cyber Bamboo", "Neon Succulent", "Holo Rose", "Bio Mushroom", "Digi Sunflower", "Zen Bonsai", "Lunar Lily", "Cyber Tree", "Neon Pine"];';
code = code.replace(/const furniturePool = \[.*?\];/, furniturePoolReplacement);

// 2. Add to introCarouselItems
const introReplacement = \`        { name: "Glow Carpet", icon: "🔲", desc: "A glowing cybernetic carpet. Place inside using mini-tile placement." },
        { name: "Star Carpet", icon: "⭐", desc: "A star-shaped cybernetic carpet. Place inside using mini-tile placement." },
        { name: "Round Cyber Carpet", icon: "🔵", desc: "A circular glowing carpet. Place inside using mini-tile placement." },
        { name: "Hexagon Carpet", icon: "💠", desc: "A hexagonal tech carpet. Place inside using mini-tile placement." },
        { name: "Heart Carpet", icon: "❤️", desc: "A heart-shaped cybernetic carpet. Place inside using mini-tile placement." },
        { name: "Diamond Carpet", icon: "♦️", desc: "A diamond-shaped glowing carpet. Place inside using mini-tile placement." },\`;
code = code.replace(/{ name: "Glow Carpet".*?},/, introReplacement);

// 3. Add to homeItems in updateStoreUI
const storeReplacement = \`            { name: "Glow Carpet", icon: "🔲", price: 300, desc: "A glowing cybernetic carpet. Place inside using mini-tile placement.", reqLevel: 10, type: "Decor" },
            { name: "Star Carpet", icon: "⭐", price: 300, desc: "A star-shaped cybernetic carpet. Place inside using mini-tile placement.", reqLevel: 10, type: "Decor" },
            { name: "Round Cyber Carpet", icon: "🔵", price: 300, desc: "A circular glowing carpet. Place inside using mini-tile placement.", reqLevel: 10, type: "Decor" },
            { name: "Hexagon Carpet", icon: "💠", price: 300, desc: "A hexagonal tech carpet. Place inside using mini-tile placement.", reqLevel: 10, type: "Decor" },
            { name: "Heart Carpet", icon: "❤️", price: 300, desc: "A heart-shaped cybernetic carpet. Place inside using mini-tile placement.", reqLevel: 10, type: "Decor" },
            { name: "Diamond Carpet", icon: "♦️", price: 300, desc: "A diamond-shaped glowing carpet. Place inside using mini-tile placement.", reqLevel: 10, type: "Decor" },\`;
code = code.replace(/{ name: "Glow Carpet".*?price: 300.*?},/, storeReplacement);

fs.writeFileSync('index.html', code);
console.log("Step 1 done");
