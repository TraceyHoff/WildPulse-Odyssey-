# WildPulse-Odyssey-
WildPulse Odyssey Creature Collecting Game 

### New Features (v2)

- **Stats & Natures System**: Creatures now possess six base stats (HP, Attack, Defense, Speed, Special Attack, Special Defense) and one of 200 unique Natures that modify stats by ±10%.
- **Type Effectiveness**: Added a 10-type matchup system with modifiers (2x, 0.5x, 0x) affecting damage calculations during encounters.
- **Menu & Party UI**: Added a new Menu overlay accessible from the main screen. The Party window lets you view your collected creatures, their effective stats, natures, and lineage (parents).
- **Party Management**: Players can now reorder their party or release creatures back into the wild.
- **Data Wipe**: A "Delete Progress" option is available in the Menu to clear local storage and start fresh.

### New Features (v3)

- Removed capture count display to declutter the game interface.
- Moved the breeding center button to the main menu for better accessibility.
- Multiple creatures of the same species now have uniquely generated stats and natures when encountered.
- Expanded the world significantly to a 100x100 tile space (10000x10000 pixels), allowing for deeper exploration.
- Added the ability to rename captured creatures directly in the Party window.
- When a creature is caught, its replacement will now spawn far away from the player instead of nearby.
- Added an extremely rare Shiny mechanic (0.1% chance) granting +20% base stats, and shinies can pass down their rarity to offspring at a 25% rate.
- Added 50 new pure buff and 50 new pure debuff natures to the generation pool.
- Added a detailed Help window to the main menu explaining game mechanics and controls.

### New Features (v4)

- **Balanced Gameplay**: Halved player movement speed for better pacing.
- **Color-Coded Stats**: All stats including Health, XP, and Levels are now visually distinct with thematic colors to improve readability.
- **Enhanced Environment**: Replaced random water tiles with procedurally generated seamless lakes (2-8 tiles). Added realistic water rippling animations and seamless wind-swayed grass generation.
- **Professional UI**: Overhauled all menus, buttons, and modals with modern linear gradients, rounded corners, drop shadows, hover animations, and semi-transparent blur backdrops to fit the wild/nature theme.
- **Living World**: Creatures now possess wandering AI and slowly roam across the grass tiles organically over time.
- **Immersive Descriptions**: Replaced instant battle logs with an animated typewriter effect and added dynamic flavor text variations to wild encounters.

### New Features (v5)

- **Balanced Encounters**: Wild creature levels are now capped at your party's maximum level +2.
- **Improved Visuals**: Enhanced fluid grass and multi-layered wave/ripple animations. Removed dark pixel artifacts from grass generation.
- **Fantasy Natures & Names**: Replaced placeholder nature names with adjective-noun combinations and added copyright-safe fantasy-style creature name generation.
- **Enhanced UI Styling**: Full text colorization across UI elements, consistent modern button styling, and color-coded battle log entries for better readability.
- **Quality of Life**: Implemented a 5-second post-battle grace period to prevent immediate re-encounters.
- **Expanded Scope**: Doubled the world size to a 200x200 tile space (20000x20000 pixels) and increased the size of party/battle windows.

### New Features (v6)

- **Multiplayer Robustness**: Added automatic WebRTC lobby reconnection handling and implemented a ping/heartbeat system to gracefully detect and drop dead connections.
- **Latency Compensation**: Replaced simple linear interpolation with dead-reckoning movement extrapolation to keep remote players moving smoothly during lag spikes or dropped packets.
- **Data Optimization**: Optimized WebRTC payload sizes using delta compression and integer conversion for position synchronization.
- **Anti-Cheat Mechanics**: Added client-side sanity checks to prevent remote players from teleporting across the map during normal play.

### New Features (v7)

- **Collision Fixes**: Water tile collisions align perfectly with visual boundaries, preventing players from walking onto water.
- **Visual Enhancements**: Water tiles now feature rounded outer edges where they meet grass, smoothing out harsh corners.
- **Combat Rebalance**:
    - The combat system now uses an attacker ATK versus defender DEF scaling multiplier, with high stats seeing diminishing returns and capped values, ensuring balanced progression.
    - Added an initiative roll system relying on Speed to determine turn priority in combat.
    - Removed the Defend button and action to streamline battles.
- **Dynamic Capture Mechanics**: The chance to capture wild creatures now inverse-scales linearly with their current HP percent. Full health creatures will be difficult to catch, while low-health creatures are much easier.
- **Spawn Logic Updates**: Both the player and newly spawned creatures are strictly forced to spawn on dry land, completely removing the issue of getting stuck or starting inside water tiles.

### New Features (v8)

- **Water Tile Polish**: Both inner and outer corners of water tiles are now consistently rounded. They also share the modern linear-gradient button style and drop-shadows seen in the UI.
- **Detailed Descriptions**: Creature generation descriptions are much more vivid, detailing fur/feather texture, specific colors, eye shapes, and distinctive markings while maintaining exact stat and generation parameters.
- **Increased Spawns**: The maximum number of simultaneous wild creatures allowed in the world has been increased by 50%.
- **Safe Player Respawn**: Following a battle loss, players are now guaranteed to respawn safely on dry land at least 10 tiles away from the enemy and 8 tiles from any water.
- **Responsive UI Overhaul**: All game modals are now fully responsive to gracefully fit smaller screens. The 'X' close buttons have been resized and repositioned to the absolute top-right to prevent overlap with header text or content. Tooltips have been completely removed across the entire application for a cleaner interface.
- **Modern Window Design**: Completely redesigned all menus and modals (Menu, Party, Breeding, Help, Battle, Lobby) to feature enhanced glassmorphism (`backdrop-filter: blur`), deeper layered nature-themed gradients, larger 20px rounded corners, neon-accented drop shadows, and smooth 200ms fade-in/out animations. Button styling has been refined with bolder gradients and a 1.05x hover lift effect with a brighter glow.

### New Features (v9)

- **Rendering Optimizations**: Implemented a dynamic camera culling system (viewport-based rendering).
  - The game no longer instantiates the entire 200x200 tile world upfront, saving massive amounts of memory and preventing initial load hanging.
  - Background tiles, animated water, corners, and drop shadows are dynamically created and destroyed in real-time as the player moves.
  - Off-screen creatures and remote multiplayer entities are culled from rendering while preserving their background AI and wandering behaviors, leading to substantially improved framerates on large maps.
### New Features (v10)

- **Lake Optimization**: Lake generation is significantly smaller and more circular, replacing the large blocky shapes. Collision is updated to match.
- **Visual Fixes**: Resolved seams within water tiles by removing overlays and adjusting corner radiuses to 50px for smooth integration. Fixed an issue where the grass texture on water edge corners was rotated incorrectly by generating specific directional cutouts instead of rotating the canvas.
- **Smooth Movement**: Disabled `roundPixels` in the rendering configuration to fix ground tile jittering during player movement.
- **Battle Flow**: Removed the close button from the battle interface, preventing players from fleeing active encounters.
- **Progression Tuning**: Reduced base experience gained from winning battles by 50% to improve pacing.

### New Features (v11)
- **Breeding Flexibility**: Removed type compatibility restrictions for Generation 1 creatures, allowing any two Gen 1 creatures to breed regardless of their elements.
- **Dual-Type Combat Expansion**: Programmatically generated strengths and weaknesses for all possible Generation 2 dual-type combinations.
- **Expanded Help Modal**: Updated the "How to Play" section to feature two distinct, scrollable type matchup charts—one for single types (Gen 1) and a new expanded chart covering all dual-type combinations (Gen 2).

### New Features (v12)
- **Rendering & Visual Fixes**: Migrated grass tiles to use dynamic viewport culling instead of a single static background `TileSprite`, successfully stopping them from shaking/jittering when the player moves.
- **UI Enhancements**: Changed the text color of positive stat modifiers (Effects) on creature cards from standard green to a more visible lime to improve contrast and readability against the dark backgrounds.

### New Features (v13)
- **Environment & Immersion**:
    - **Realistic Willow Trees**: Redesigned weeping willow tree generation to include more layered and specific explicit coordinates for dropping branches and leaves, creating a more realistic and natural drooping canopy effect.
    - **Dynamic Winter Weather**: The dynamic weather system is now enabled during the Winter season, introducing unique `light snow`, `heavy snow`, and `thundersnow` weather patterns tied realistically to cloud coverage and lightning logic.
