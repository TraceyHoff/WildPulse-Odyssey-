const fs = require('fs');

function updateDamage(filename) {
    let content = fs.readFileSync(filename, 'utf-8');

    // We can increase default power from 50 to 70
    // window.calculateDamage = function(attacker, defender, power = 50) {
    const oldDef = "window.calculateDamage = function(attacker, defender, power = 50) {";
    const newDef = "window.calculateDamage = function(attacker, defender, power = 70) {"; // Buff base power

    // In `doPlayerAction` and `doEnemyAction`, the call might explicitly use `50`
    // e.g. `let damage = window.calculateDamage(currentPlayer, currentEnemy, 50);`
    const oldCall1 = "window.calculateDamage(currentPlayer, currentEnemy, 50);";
    const newCall1 = "window.calculateDamage(currentPlayer, currentEnemy, 70);";

    const oldCall2 = "window.calculateDamage(currentEnemy, currentPlayer, 50);";
    const newCall2 = "window.calculateDamage(currentEnemy, currentPlayer, 70);";

    if (content.includes(oldDef)) {
        content = content.replace(oldDef, newDef);
        content = content.replace(oldCall1, newCall1);
        content = content.replace(oldCall2, newCall2);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Did not find target in ${filename}`);
    }
}

['index.html', 'index_test.html', 'clean_script.js', 'extracted_script.js'].forEach(updateDamage);
