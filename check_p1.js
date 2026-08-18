const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Also call updateIntroModalPlatformVisibility for showIntroModal since slide2 might not be shown right away, but we should make sure it calls it.
// Actually, `window.showIntroModal` shows slide 1 first. If we only show slide 1, we don't need to call updateIntroModalPlatformVisibility.
// However, the instructions say:
// "tailor the tutorial sections controls displayed to the player to the platform the player is playing on"

// Let's verify `introKeyboardSection` exists.
console.log(html.includes('introKeyboardSection'));
console.log(html.includes('introKeyboardSection_p2'));
console.log(html.includes('introGamepadSection'));
console.log(html.includes('introGamepadSection_p2'));
console.log(html.includes('introMobileSection'));
console.log(html.includes('introMobileSection_p2'));
