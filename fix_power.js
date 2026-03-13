const fs = require('fs');

function updatePower(filename) {
    let content = fs.readFileSync(filename, 'utf-8');

    // In doPlayerAction, there is `let power = 50;`
    // In doEnemyAction, there is `let power = 50;`
    const findStr = "let power = 50;";
    const repStr = "let power = 70;";

    if (content.includes(findStr)) {
        content = content.replace(new RegExp("let power = 50;", "g"), repStr);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Did not find target in ${filename}`);
    }
}
['index.html', 'index_test.html'].forEach(updatePower);
