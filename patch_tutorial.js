const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The user wants to:
// 1. explain to players how to use their item and action wheels in the beginning tutorial.
// 2. tailor the tutorial sections controls displayed to the player to the platform the player is playing on.

// Looking at index.html, `introModalSlide2` contains control information.
// We can dynamically show/hide the control sections based on the platform.

// In `window.showIntroModal`, we can add logic to detect the platform and hide irrelevant sections.
