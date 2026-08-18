const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const tutorialFunc = `
window.triggerHomeTutorial = function(playerNum) {
    const isP2 = (playerNum === 2);
    const suffix = isP2 ? '_p2' : '';

    // We can use a custom overlay or just series of notifications.
    if (window.showModernNotification) {
        setTimeout(() => window.showModernNotification("🏠 HOME UNLOCKED! You can now teleport to your new personal home base!", 6000, playerNum), 1000);
        setTimeout(() => window.showModernNotification("💡 While inside or near your home, access the Home Design modal (H or Start button) to place furniture.", 7000, playerNum), 7000);
        setTimeout(() => window.showModernNotification("🛋️ You can rotate furniture before placing, and arrange your sanctuary to your liking!", 7000, playerNum), 14000);
    }
};
`;

const awardFunc = `
window.awardHomeFurniture = function(playerNum) {
    const furniturePool = ["Storage Chest", "Mini Hospital", "Mini Store", "Mini Trade", "Mini PvP", "Mini Breeding Center", "Mini Challenge", "Neon Couch", "L-Couch", "Love Seat", "Cyber Desk", "Office Chair", "Stool", "Coffee Table", "Dining Table", "Park Bench", "Cyber Bench", "Filing Cabinet", "Display Cabinet", "Nightstand", "Corner Table", "Bunk Bed", "King Bed", "Glow Carpet", "Star Carpet", "Round Cyber Carpet", "Hexagon Carpet", "Heart Carpet", "Diamond Carpet", "Holo Bed", "Neon Chair", "Holo Table", "Cyber Plant", "Crystal Bonsai", "Neon Fern", "Plasma Cactus", "Holo Orchid", "Neon Lamp", "Server Rack", "Arcade Machine", "Cyber TV", "Neon Shelf", "Tech Bin", "Neon Wardrobe", "Cyber Fridge", "Holo Display", "Lava Lamp", "Plasma Globe", "Cyber Poster", "Neon Sign", "Gaming PC", "Smart Mirror", "Potted Ficus", "Monstera Plant", "Cyber Bamboo", "Neon Succulent", "Holo Rose", "Bio Mushroom", "Digi Sunflower", "Zen Bonsai", "Lunar Lily", "Cyber Tree", "Neon Pine"];
    const randomItem = furniturePool[Math.floor(Math.random() * furniturePool.length)];
    if (window.addInventoryItem) {
        window.addInventoryItem(playerNum, randomItem);
        if (window.showModernNotification) {
            window.showModernNotification(\`🎉 Level 10 Reached! You received a free \${randomItem} to decorate your new home!\`, 8000, playerNum);
        }
    }
    window.triggerHomeTutorial(playerNum);
};
`;

content = content.replace("window.gainPlayerXp = function(playerNum, amount) {", tutorialFunc + "\n" + awardFunc + "\nwindow.gainPlayerXp = function(playerNum, amount) {");

content = content.replace(
    "window.p1Level = (window.p1Level || 1) + 1;",
    "window.p1Level = (window.p1Level || 1) + 1;\n            if (window.p1Level === 10) { window.awardHomeFurniture(1); }"
);

content = content.replace(
    "window.p2Level = (window.p2Level || 1) + 1;",
    "window.p2Level = (window.p2Level || 1) + 1;\n            if (window.p2Level === 10) { window.awardHomeFurniture(2); }"
);

const narrativeChange = `<li style="margin-bottom: 8px;"><strong style="color: #00ffcc;">🏠 Safe Haven</strong>: When your trainer clearance reaches Level 10, your Home Teleporter will unlock, granting you a personal home base! You can instantly travel to your home, and back to the hospital! While inside or near your home, press H or Start to access the Home Design modal, where you can freely place, rotate, and arrange furniture items acquired from quests or the Store to customize your sanctuary.</li>
                    <li style="margin-bottom: 8px;"><strong style="color: #00ffcc;">❤️ Mutual Symbiosis</strong>`;

content = content.replace(/<li style="margin-bottom: 8px;"><strong style="color: #00ffcc;">❤️ Mutual Symbiosis<\/strong>/g, narrativeChange);

fs.writeFileSync('index.html', content);
