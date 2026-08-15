const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// The replacement was in the wrong place, it modified window.introCarouselItems instead of window.updateStoreUI!
// Let's restore the backup and do it correctly.
