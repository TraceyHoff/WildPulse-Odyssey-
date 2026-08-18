const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('if (mapData[row] && mapData[row][col] === \'grass\') {') || lines[i].includes('if (mapData[row] && mapData[row][col] === \'grass\' && (!window.isWithinSightOfHospital')) {
        console.log(`Line ${i + 1}: ${lines[i]}`);
    }
}
