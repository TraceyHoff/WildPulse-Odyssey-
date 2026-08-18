const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

// we want to search for mapData[row] && mapData[row][col] === 'grass'
const lines = code.split('\n');
lines.forEach((line, index) => {
    if (line.includes("mapData[row] && mapData[row][col] === 'grass'")) {
        console.log(`Line ${index+1}: ${line.trim()}`);
    }
});
