const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// I also need to update the logic for `moveDown` and `moveUp` inside the DOM. I overwrote them weirdly.
// Let's check `window.moveDown = function(index) {` and make sure it has the body.
const regexMoveDown = /window\.moveDown = function\(index\) \{[\s\S]*?\}\n\};/m;
content = content.replace(regexMoveDown, `window.moveDown = function(index) {
    // Find the next active creature index
    let targetIndex = -1;
    for (let i = index + 1; i < collectedCreatures.length; i++) {
        if (!collectedCreatures[i].stored) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1 && !collectedCreatures[index].stored) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        window.renderPartyList();
    }
};`);

fs.writeFileSync('index.html', content);
