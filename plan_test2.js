const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

// Looking for P2 swimming logic
const lines = code.split('\n');
for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('let p2InWater = (mapData[p2Row] && mapData[p2Row][p2Col] === \'obs\');')) {
        let snip = [];
        for (let j=i-5; j<=i+30; j++) {
            snip.push(`Line ${j+1}: ${lines[j]}`);
        }
        console.log(snip.join('\n'));
        break;
    }
}
