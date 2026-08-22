const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add `place_furniture` to `types` when `pLevel >= 10`
content = content.replace(
    "const types = ['catch', 'breed', 'defeat_trainer', 'challenge_tier', 'player_level', 'creature_level'];",
    "const types = ['catch', 'breed', 'defeat_trainer', 'challenge_tier', 'player_level', 'creature_level'];\n    if (pLevel >= 10) { types.push('place_furniture'); }"
);

// 2. Add quest generation logic for `place_furniture`
const targetCondition = "    } else if (questType === 'creature_level') {";
const questLogicReplacement = `    } else if (questType === 'place_furniture') {
        const targetFurniture = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
        title = \`Decorate Home: \${targetFurniture}\`;
        description = \`Acquire and place a \${targetFurniture} in your home territory tiles.\`;
        targetValue = targetFurniture;
    } else if (questType === 'creature_level') {`;

content = content.replace(targetCondition, questLogicReplacement);

// 3. Prevent `rewardItem` from matching the target furniture
const rewardCondition = `    if (pLevel >= 10 && Math.random() < 0.15) {
        rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];`;

const rewardReplacement = `    if (pLevel >= 10 && Math.random() < 0.15) {
        do {
            rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
        } while (questType === 'place_furniture' && rewardItem === targetValue);`;

content = content.replace(rewardCondition, rewardReplacement);

fs.writeFileSync('index.html', content);
console.log('Successfully patched generateProceduralQuest');
