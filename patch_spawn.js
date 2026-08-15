const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace the old symbolEmoji logic with nameplate logic
const oldLogicStart = `    // Create element symbol text above creature
    const emojiMap = {
        "Fire": "🔥",
        "Water": "💧",
        "Nature": "🍃",
        "Electric": "⚡",
        "Ice": "❄️",
        "Earth": "🪨",
        "Wind": "💨",
        "Light": "☀️",
        "Dark": "🌙",
        "Cosmic": "🪐"
    };
    let symbolEmoji = emojiMap[clonedData.type] || "❓";
    if (clonedData.isShiny) {
        symbolEmoji = "⭐" + symbolEmoji;
    }
    const symbolText = scene.add.text(x, y - 24, symbolEmoji, {
        fontSize: '12px',
        stroke: '#000000',
        strokeThickness: 3
    }).setOrigin(0.5);
    symbolText.setDepth(11);
    sprite.setData('symbolText', symbolText);

    // Ensure symbol text is destroyed when creature sprite is destroyed
    sprite.on('destroy', () => {
        if (symbolText) {
            symbolText.destroy();
        }
    });`;

const newLogic = `    // Create sleek cyberpunk nameplate above creature
    const nameplate = scene.add.container(x, y - 35);
    nameplate.setDepth(11);

    // Ensure type textures exist
    const typeTexture = window.createTypeIconTexture(scene, clonedData.type);

    // Create text elements
    const nameLevelStr = \`Lv \${clonedData.level} \${clonedData.name}\`;
    const textEl = scene.add.text(0, 0, nameLevelStr, {
        fontFamily: 'Courier New',
        fontSize: '10px',
        color: clonedData.isShiny ? '#ffea00' : '#00ffd2',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0, 0.5);

    // Create type icon sprite
    const typeSprite = scene.add.sprite(0, 0, typeTexture);
    typeSprite.setDisplaySize(12, 12);
    typeSprite.setOrigin(0, 0.5);

    let shinySprite = null;
    if (clonedData.isShiny) {
        const shinyTexture = window.createTypeIconTexture(scene, 'Shiny');
        shinySprite = scene.add.sprite(0, 0, shinyTexture);
        shinySprite.setDisplaySize(12, 12);
        shinySprite.setOrigin(0, 0.5);
    }

    // Calculate layout
    const padding = 4;
    const iconSpacing = 2;
    const textSpacing = 4;

    let totalWidth = padding * 2 + typeSprite.displayWidth + textSpacing + textEl.width;
    if (shinySprite) {
        totalWidth += iconSpacing + shinySprite.displayWidth;
    }
    const height = 18;

    // Create background graphics
    const bg = scene.add.graphics();
    bg.fillStyle(0x0b1424, 0.85); // Dark blue/black background
    const strokeColor = clonedData.isShiny ? 0xffea00 : 0x00ffd2;
    bg.lineStyle(1, strokeColor, 1);

    // Center the background around (0,0)
    bg.fillRoundedRect(-totalWidth / 2, -height / 2, totalWidth, height, 4);
    bg.strokeRoundedRect(-totalWidth / 2, -height / 2, totalWidth, height, 4);

    // Position elements relative to the center
    let currentX = -totalWidth / 2 + padding;

    if (shinySprite) {
        shinySprite.setPosition(currentX, 0);
        currentX += shinySprite.displayWidth + iconSpacing;
        nameplate.add(shinySprite);
    }

    typeSprite.setPosition(currentX, 0);
    currentX += typeSprite.displayWidth + textSpacing;
    nameplate.add(typeSprite);

    textEl.setPosition(currentX, 0);
    nameplate.add(textEl);

    // Add background first so it's behind the text/icons
    nameplate.addAt(bg, 0);

    sprite.setData('nameplate', nameplate);

    // Ensure nameplate is destroyed when creature sprite is destroyed
    sprite.on('destroy', () => {
        if (nameplate) {
            nameplate.destroy();
        }
    });`;

if (content.includes(oldLogicStart)) {
    content = content.replace(oldLogicStart, newLogic);
    fs.writeFileSync('index.html', content);
    console.log("Replaced spawnCreature nameplate logic.");
} else {
    console.log("Could not find old logic to replace.");
}
