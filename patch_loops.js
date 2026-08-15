const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace depth sort logic
const depthSortOld = `            const symbolText = c.getData('symbolText');
            if (symbolText) {
                symbolText.setDepth(c.depth + 1);
            }`;
const depthSortNew = `            const nameplate = c.getData('nameplate');
            if (nameplate) {
                nameplate.setDepth(c.depth + 1);
            }`;

if (content.includes(depthSortOld)) {
    content = content.replace(depthSortOld, depthSortNew);
    console.log("Replaced depth sort.");
}

// Replace position update logic
const posUpdateOld = `        const symbolText = creature.getData('symbolText');
        if (symbolText) {
            symbolText.setPosition(creature.x, creature.y - 24);
            symbolText.setVisible(isVisible);
            symbolText.setDepth(creature.depth + 1);
        }`;
const posUpdateNew = `        const nameplate = creature.getData('nameplate');
        if (nameplate) {
            nameplate.setPosition(creature.x, creature.y - 35);
            nameplate.setVisible(isVisible);
            nameplate.setDepth(creature.depth + 1);
        }`;

if (content.includes(posUpdateOld)) {
    content = content.replace(posUpdateOld, posUpdateNew);
    console.log("Replaced position update.");
}

fs.writeFileSync('index.html', content);
