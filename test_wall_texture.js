const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const match = html.match(/const floorStyles = \{([\s\S]+?)function generateTileTextures/);
if (match) {
    const lines = match[1].split('\n');
    let lineNum = 0;
    for (const line of lines) {
        lineNum++;
        if (line.includes('stroke()') || line.includes('fill()') || line.includes('fillRect(')) {
            // console.log(lineNum, line);
        }
    }
}
