const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: Missing Furniture in Home Customization bounds
const boundsSearch = `
        const minC = playerNum === 2 ? 590 : 580;
        const maxC = playerNum === 2 ? 594 : 584;
        const minR = 580, maxR = 584;`;

const boundsReplace = `
        const minC = playerNum === 2 ? 583 : 573;
        const maxC = playerNum === 2 ? 595 : 585;
        const minR = playerNum === 2 ? 533 : 573;
        const maxR = playerNum === 2 ? 545 : 585;`;

if (html.includes(boundsSearch)) {
    html = html.replace(boundsSearch, boundsReplace);
    console.log("Successfully replaced bounds.");
} else {
    console.log("Could not find bounds to replace.");
}

fs.writeFileSync('index.html', html, 'utf8');
