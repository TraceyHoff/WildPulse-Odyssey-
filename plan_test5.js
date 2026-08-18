const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('tSprite.getData(\'trainerId\');')) {
        let snippet = [];
        for (let j = i - 5; j <= i + 10; j++) {
            snippet.push(`Line ${j+1}: ${lines[j]}`);
        }
        console.log(snippet.join('\n'));
        console.log('---');
    }
}
