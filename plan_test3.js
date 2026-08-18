const fs = require('fs');
const code = fs.readFileSync('index.html', 'utf8');

// looking for setTint(0x88ccff) for P2
const lines = code.split('\n');
for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('window.player2.setTint(0x88ccff);')) {
        let snip = [];
        for (let j=i-5; j<=i+30; j++) {
            snip.push(`Line ${j+1}: ${lines[j]}`);
        }
        console.log(snip.join('\n'));
        break;
    }
}
