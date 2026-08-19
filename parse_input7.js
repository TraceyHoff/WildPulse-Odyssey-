const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// The issue asks to "replace the canvas creature type images in the creature nameplates with custom svg icons that match the theme"
// The icons should probably be thematic but generic enough to look good (since there are 18 types).
// Could we just define a set of SVG paths for each type?
