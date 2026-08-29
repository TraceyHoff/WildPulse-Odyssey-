const fs = require('fs');

let content = fs.readFileSync('AGENTS.md', 'utf-8');

const newBulletPoints = `
- **Bird Audio & Sprites:** Bird sprites in \`birdCanvas\` generate 5 frames per species (4 side-view flap frames and 1 top-down back frame). The \`BirdManager\` dynamically switches to the 5th frame (\`baseFrame + 4\`) when a bird's vertical velocity dictates it is primarily flying north or south. Ambient bird audio is spatially tied to visible birds on the screen via the \`BirdManager\` update loop. Sounds are triggered based on the specific bird's \`species\` using \`window.WildPulseMusic.synths\`, rather than relying on a global random ambient timer.
- **Strict Water Plants:** Cattails (\`plant_cattail\`) strictly spawn only on tiles immediately adjacent to water (\`isVeryCloseToWater\`), while other water plants like pampas grass have more lenient spawn boundaries.`;

content += newBulletPoints;

fs.writeFileSync('AGENTS.md', content);
console.log("Updated AGENTS.md");
