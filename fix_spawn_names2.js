const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const search = `    if (!clonedData.generation || clonedData.generation === 1) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        clonedData.name = prefix + suffix;
    }`;

const replace = `    if (!clonedData.generation || clonedData.generation === 1) {
        const pList = typePrefixes[clonedData.type] || typePrefixes["Nature"];
        const p = pList[Math.floor(Math.random() * pList.length)];
        const s = suffixes[Math.floor(Math.random() * suffixes.length)];
        clonedData.name = p + s;
    }`;

if (html.includes(search)) {
    html = html.replace(search, replace);
    fs.writeFileSync('index.html', html);
    console.log("Fixed spawnCreature naming replacement.");
} else {
    console.log("Could not find block to replace.");
}
