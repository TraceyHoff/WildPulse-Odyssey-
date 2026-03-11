const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /window\.baseCreatures\s*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/;
const match = html.match(regex);
if (match) {
    const baseCreatures = JSON.parse(match[1]);
    baseCreatures.sort((a,b) => (b.stats.health + b.stats.attack) - (a.stats.health + a.stats.attack));
    console.log(baseCreatures.slice(0, 10).map(c => c.name + ': ' + (c.stats.health + c.stats.attack)));
} else {
    console.log("No match");
}
