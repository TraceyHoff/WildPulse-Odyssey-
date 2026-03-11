const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// There are duplicates. Let's reset the file and apply our patches cleanly.
