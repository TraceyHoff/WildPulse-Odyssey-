const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');
const match = content.match(/window\.gainXp = function\([\s\S]*?return leveledUp;\n};/);
if (match) {
    console.log(match[0]);
}
