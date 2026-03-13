const fs = require('fs');

function updateDamage2(filename) {
    let content = fs.readFileSync(filename, 'utf-8');

    // In index.html, `power` is passed as an argument to doPlayerAction and doEnemyAction.
    // e.g. `window.doPlayerAction = function(power = 50)`
    const oldDef1 = "window.doPlayerAction = function(power = 50) {";
    const newDef1 = "window.doPlayerAction = function(power = 70) {";

    const oldDef2 = "window.doEnemyAction = function(power = 50) {";
    const newDef2 = "window.doEnemyAction = function(power = 70) {";

    if (content.includes(oldDef1)) {
        content = content.replace(oldDef1, newDef1);
        content = content.replace(oldDef2, newDef2);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Did not find target in ${filename}`);
    }
}

['index.html', 'index_test.html'].forEach(updateDamage2);
