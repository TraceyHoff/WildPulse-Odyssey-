const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// There must be a pointerdown or keyboard handling for PC users.
// We know `window['p1MiniTilePlacementMode']` is checked somewhere? Wait, if we checked `window.p1MiniTilePlacementMode`, we didn't find anything except `p${playerNum}MiniTilePlacementMode`.
const regex = /p1MiniTilePlacementMode/g;
console.log(content.match(regex));
