const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (html.includes('case "Neon Couch":')) {
    console.log("Success: SVG icons added successfully.");
} else {
    console.log("Error: SVG icons not added successfully.");
}
