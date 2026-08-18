const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// The logic inside getItemIconHTML starts around line 18381
const match = html.match(/window\.getItemIconHTML = function\(itemName, size = 24\)\s*\{([\s\S]*?)return\s*`\s*<div/);
if (match) {
    const body = match[1];
    let count = 0;
    // We want to find each case "Name": svgContent = `<rect... > ... `;
    // Actually the string template inside svgContent is what we want.
    const regex = /case\s+"([^"]+)":\s+svgContent\s*=\s*`<rect[^>]+>([\s\S]*?)`;/g;
    let m;
    let items = {};
    while ((m = regex.exec(body)) !== null) {
        items[m[1]] = m[2].trim();
        count++;
    }
    console.log("Found", count, "items.");
    fs.writeFileSync('extracted_svgs.json', JSON.stringify(items, null, 2));
} else {
    console.log("Not found.");
}
