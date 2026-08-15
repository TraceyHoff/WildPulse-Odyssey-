const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Move `emojiMap` before `switch (itemName)`
const startEmojiMap = html.indexOf('const emojiMap = {');
const endEmojiMap = html.indexOf('const emoji = emojiMap[itemName] || "📦";') + 'const emoji = emojiMap[itemName] || "📦";'.length;

const emojiMapCode = html.substring(startEmojiMap, endEmojiMap);

html = html.replace(emojiMapCode, ''); // Remove it from the bottom
html = html.replace('switch (itemName) {', emojiMapCode + '\n\n    switch (itemName) {'); // Insert it above the switch

fs.writeFileSync('index.html', html);
