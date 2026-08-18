const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Function to add swimming visuals to NPC trainers
let npcLoopStr = `
            // Update overhead name text
            const nameText = tSprite.getData('nameText');
            if (nameText) {
                nameText.setPosition(tSprite.x, tSprite.y - 30);
                nameText.setVisible(isVisible);
            }
`;

let npcSwimmingStr = `
            // Swimming Visuals for NPC Trainers
            let tCol = Math.floor(tSprite.x / 100);
            let tRow = Math.floor(tSprite.y / 100);
            let tInWater = (mapData[tRow] && mapData[tRow][tCol] === 'obs');
            if (tInWater && window.currentSeason !== 'Winter') {
                tSprite.setTint(0x88ccff);
                tSprite.setAlpha(0.7);
                let bob = Math.sin(this.time.now / 200) * 4;
                tSprite.setCrop(0, 0, tSprite.width, tSprite.height * 0.625 + bob);
                tSprite.setOrigin(0.5, 0.4);
            } else {
                tSprite.setTint(0xffffff);
                tSprite.setAlpha(1.0);
                if (tSprite.isCropped) tSprite.setCrop();
                tSprite.setOrigin(0.5, 0.5);
            }
`;

content = content.replace(npcLoopStr, npcLoopStr + npcSwimmingStr);

// Function to add swimming visuals to wild creatures
let creatureLoopStr = `
        // Sync symbol text position and visibility
        const symbolText = creature.getData('symbolText');
        if (symbolText) {
            symbolText.setPosition(creature.x, creature.y - 35);
            symbolText.setVisible(isVisible);
            symbolText.setDepth(creature.depth + 1);
        }
`;

let creatureSwimmingStr = `
        // Swimming Visuals for Wild Creatures
        let cCol = Math.floor(creature.x / 100);
        let cRow = Math.floor(creature.y / 100);
        let cInWater = (mapData[cRow] && mapData[cRow][cCol] === 'obs');
        if (cInWater && window.currentSeason !== 'Winter') {
            creature.setTint(0x88ccff);
            creature.setAlpha(0.7);
            let bob = Math.sin(this.time.now / 200) * 4;
            creature.setCrop(0, 0, creature.width, creature.height * 0.625 + bob);
            creature.setOrigin(0.5, 0.4);
        } else {
            const cData = creature.getData('creatureData');
            if (!cData || !cData.isShiny) {
                creature.setTint(0xffffff);
            }
            creature.setAlpha(1.0);
            if (creature.isCropped) creature.setCrop();
            creature.setOrigin(0.5, 0.5);
        }
`;

content = content.replace(creatureLoopStr, creatureLoopStr + creatureSwimmingStr);

fs.writeFileSync('index.html', content);
