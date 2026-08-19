const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const searchStr = `        } else if (currDown && currLeft) {
            option = "screenshot";
        } else if (currUp) {
            option = "pet";
        } else if (currDown) {
            option = "close";
        } else if (currLeft) {
            option = "help";
        } else if (currRight) {
            option = "party";
        }`;

const replaceStr = `        } else if (currDown && currLeft) {
            option = "screenshot";
        } else if (currDown && currRight) {
            option = "switch_bag";
        } else if (currUp) {
            option = "pet";
        } else if (currDown) {
            option = "close";
        } else if (currLeft) {
            option = "help";
        } else if (currRight) {
            option = "party";
        }`;

if (content.includes(searchStr)) {
    content = content.replace(searchStr, replaceStr);
}

content = content.replace(
    'window.canOpenWheels = function() {',
    'window.canOpenWheels = function(ignoreCooldown = false) {'
);
content = content.replace(
    'if (window.lastModalCloseTime && Date.now() - window.lastModalCloseTime < 2000) return false;',
    'if (!ignoreCooldown && window.lastModalCloseTime && Date.now() - window.lastModalCloseTime < 2000) return false;'
);

content = content.replace(
    'window.openInventoryWheel = function(playerNum) {',
    'window.openInventoryWheel = function(playerNum, ignoreCooldown = false) {'
);

const searchInventory = `    if (window.canOpenWheels && !window.canOpenWheels()) return;
    if (window.isAnyModalOpen && window.isAnyModalOpen() && window.p1ActiveModal !== 'inventoryWheelModal' && window.p2ActiveModal !== 'inventoryWheelModal') return;`;
const replaceInventory = `    if (window.canOpenWheels && !window.canOpenWheels(ignoreCooldown)) return;
    if (window.isAnyModalOpen && window.isAnyModalOpen() && window.p1ActiveModal !== 'inventoryWheelModal' && window.p2ActiveModal !== 'inventoryWheelModal') return;`;
content = content.replace(searchInventory, replaceInventory);

content = content.replace(
    /if \(optionName === 'switch_bag'\) \{\s*window.openInventoryWheel\(playerNum\);\s*return;\s*\}/,
    `if (optionName === 'switch_bag') {\n        window.openInventoryWheel(playerNum, true);\n        return;\n    }`
);

fs.writeFileSync('index.html', content);
console.log("Successfully patched index.html");
