const fs = require('fs');

let readme = fs.readFileSync('README.md', 'utf8');

readme += `
### New Features (v7)

- **Collision Fixes**: Water tile collisions align perfectly with visual boundaries, preventing players from walking onto water.
- **Visual Enhancements**: Water tiles now feature rounded outer edges where they meet grass, smoothing out harsh corners.
- **Combat Rebalance**:
    - The combat system now uses an attacker ATK versus defender DEF scaling multiplier, with high stats seeing diminishing returns and capped values, ensuring balanced progression.
    - Added an initiative roll system relying on Speed to determine turn priority in combat.
    - Removed the Defend button and action to streamline battles.
- **Dynamic Capture Mechanics**: The chance to capture wild creatures now inverse-scales linearly with their current HP percent. Full health creatures will be difficult to catch, while low-health creatures are much easier.
- **Spawn Logic Updates**: Both the player and newly spawned creatures are strictly forced to spawn on dry land, completely removing the issue of getting stuck or starting inside water tiles.
`;

fs.writeFileSync('README.md', readme);
console.log("Updated README.md");
