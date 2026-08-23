const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
if (html.includes('if (tileType === "home_wall" || tileType === "home_holo_wall")')) {
    console.log("Already has fix");
}
