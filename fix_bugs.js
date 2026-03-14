const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// The regex replace in patch_colors deleted from baseCreatures.forEach to collectedCreatures.forEach.
// Since we used git restore, index.html is back to its original state BEFORE ANY PATCHES.
// Wait, I ran git restore index.html ! That means index.html lost all the patches!
// Let me verify this.
