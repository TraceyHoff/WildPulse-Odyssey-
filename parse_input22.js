const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// There is no pointer/keyboard handling for `MiniTilePlacementMode`!
// Which means mini tile placement doesn't currently work for PC mouse. Wait, the prompt string says: "press A (or click) to place close to your Home. Press B (or ESC) to cancel".
// So there must be a way to click... Let's search for `window[`p${playerNum}MiniTilePlacementMode`]` inside pointer events? Oh, wait! It's not `p1MiniTilePlacementMode`, it might use `window.p1MiniTilePlacementMode` dynamically if it evaluates `window["p1MiniTilePlacementMode"]`.
// Wait, when `window[`p${playerNum}MiniTilePlacementMode`]` is checked, what else uses it?
const regex = /p1MiniTilePlacementMode/g;
console.log(content.match(regex)); // null. Meaning the literal string 'p1MiniTilePlacementMode' doesn't exist in the file.

// Wait, let's search for "window[`p${clickedPlayerNum}MiniTilePlacementMode`]" or similar inside pointerdown.
const pointerDownIndex = content.indexOf("this.input.on('pointerdown', (pointer) => {");
if (pointerDownIndex !== -1) {
    console.log(content.substring(pointerDownIndex, pointerDownIndex + 3000));
}
