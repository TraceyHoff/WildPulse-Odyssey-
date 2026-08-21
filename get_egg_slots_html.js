const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const start = content.indexOf('const updatePlayerSlots = (playerNum, containerId) => {');
const end = content.indexOf('updatePlayerSlots(1, \'p1InventoryEggSlots\');', start);

console.log(content.substring(start, end));
