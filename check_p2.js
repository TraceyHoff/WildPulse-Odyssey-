const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I also want to make sure I call `updateIntroModalPlatformVisibility` in `showIntroModal` just in case the slides are rearranged or something, or just in case it is somehow shown first. Actually, it's safer to just run it when we show slide2.
// In advanceIntroModal:
// if (slide2) { slide2.style.display = 'block'; window.updateIntroModalPlatformVisibility(suffix); }
// In prevIntroModal:
// if (slide2) { slide2.style.display = 'block'; window.updateIntroModalPlatformVisibility(suffix); }

// Wait! In showIntroModal, slide2 is set to 'none'.
// We don't really need to set the visibility of the inner sections since they'll be properly updated when slide2 is made visible. But it's also fine to call it there if needed.
// Wait, one of the requirements is to test it properly.
