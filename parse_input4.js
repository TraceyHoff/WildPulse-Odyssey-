const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Search for mouse movement update for minitile placement mode
const index = content.indexOf("pointermove");
if (index !== -1) {
    const block = content.substring(index - 500, index + 2000);
    console.log(block);
} else {
    console.log("not found pointermove");
}
