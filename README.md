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

### New Features (v14)
- **Social & Connectivity**:
    - **Integrated Chat System**: A new real-time, sanitized chat system built into the Social Sidebar, allowing players in the same room to communicate instantly.
    - **Social Sidebar**: A collapsible UI element featuring tabs for 'Players' (room and global lists), 'Chat', and 'World Settings'.
    - **Global Discovery**: See all online players across every active room and join them directly with a single click.
    - **Private Worlds**: Generate and share unique world codes to play in private instances with friends.
- **Audio & Immersion**:
    - **Procedural Music Engine**: A dynamic soundtrack powered by Tone.js that transitions seamlessly between exploring, battle, and social states with atmospheric weather awareness.
- **World & Mechanics**:
    - **Swimming Mechanics**: Entering water tiles now triggers a swimming state with reduced movement speed and realistic submersion visuals (alpha transparency, blue tinting, and vertical bobbing).
    - **Seeded Synchronization**: Every room now uses a deterministic shared random seed based on its world code, ensuring all players see the exact same environmental generation and wild creature properties.
    - **Deterministic Weather & Time**: Global environmental systems like the 120-day seasonal cycle, day/night lighting, and weather patterns are perfectly synchronized across all clients.

### New Features (v15)
- **Character Customization Overhaul**:
    - **Enhanced Skin Patterns**: All existing patterns (Dots, Stripes, Checkerboard, Camo, Stars) have been redesigned for better visual clarity and high-contrast detail.
    - **Diagonal Patterns**: Stripes and other linear patterns now support diagonal orientations for a more dynamic look.
    - **Expanded Pattern Library**: Added 5 brand new procedural skin patterns:
        - **Hearts**: Charming repeating heart shapes.
        - **Waves**: Smooth, flowing oceanic curves.
        - **Bricks**: Classic offset masonry pattern.
        - **Honeycomb**: Hexagonal organic tiling.
        - **Leopard**: Realistic, irregular animal-print rosettes.
    - **Network Sync**: All custom skin patterns and colors are synchronized across the network, ensuring peers see your unique character design exactly as intended.

### New Features (v16)
- **Gamepad Support**: Added full support for Phaser-compatible gamepads, allowing players to navigate the world and menus using physical controllers.
- **Social Teleportation**: Integrated a 'Teleport' button in the Social Sidebar, enabling players to jump directly to the coordinates of any other player in their current room.
- **Dynamic Remote Player Labels**: Remote player nameplates now dynamically display their lead creature's level and current battle status, providing better situational awareness.
- **Battle & Environmental Fixes**:
    - **Battle Swap Fix**: Resolved an issue where swapping creatures during battle could cause state synchronization errors or crashes by ensuring proper deep-copying and property initialization.
    - **Ripple Persistence Fix**: Fixed a bug where swimming ripple effects would remain visible at the last water exit point by strictly managing emitter visibility.

### New Features (v17)
- **Advanced Character Customization**:
    - **Refined Patterns**: Re-engineered core skin patterns (Dots, Stars, Hearts, Camo, Leopard) using a jittered grid and organic blob algorithms to ensure even, non-overlapping distribution and more realistic textures.
    - **Extended Library**: Added 6 brand-new procedural skins:
        - **Zebra**: Flowing, wavy vertical stripes.
        - **Tiger**: Powerful, tapered horizontal patterns.
        - **Circuit**: Cybernetic geometric nodes and pathways.
        - **Scales**: Overlapping aquatic-style semi-circles.
        - **Flame**: Upward-undulating elemental shapes.
        - **Galaxy**: Nebulous clusters and starfields.
- **Dynamic Seasonal Music**:
    - **Atmospheric Audio Engine**: The procedural music engine is now season-aware, automatically shifting musical scales and melodies to match the mood of Spring, Summer, Fall, and Winter.
    - **Weather-Aware Layers**: Dynamic weather patterns now trigger real-time audio effects, such as soft brown noise for rain or crisp white noise for snow, enhancing environmental immersion.
    - **Enhanced State Transitions**: Music for Battles, PvP duels, and Trading now features more distinct BPM ramps and synth variations, making every gameplay shift feel unique and impactful.

### New Features (v18)
- **Peer-to-Peer (P2P) Multiplayer**:
    - **Decentralized Architecture**: Replaced the traditional client-server model with a robust WebRTC P2P system using a Star Topology.
    - **Dynamic Host Migration**: The player with the lowest join index automatically becomes the "Host," serving as a relay for all other peers. If the Host leaves, the role seamlessly migrates to the next player, keeping the session alive.
    - **Server-Lite Signaling**: The backend server is now a minimal signaling relay, used only for participant discovery and initial handshakes, significantly reducing server load.
    - **P2P Systems Integration**: Movement, chat, identity, trading, and PvP battle data are now transmitted directly between players via high-performance WebRTC data channels.
    - **Synchronized World State**: Implemented deterministic client-side seeding and shared epoch timing to ensure all P2P clients remain perfectly synchronized with respect to world generation, weather, and the day/night cycle without a central authority.

### New Features (v19)
- **Single-Player Evolution**:
    - **Focused Experience**: Optimized the codebase into a dedicated, high-performance single-player journey by cleanly removing legacy multiplayer libraries, trade/PvP menus, and network sync overhead.
    - **Deterministic Seeding & Local Storage**: Integrated complete offline persistence, tracking game days, custom patterns, and room configurations seamlessly via localStorage.

### New Features (v20)
- **Safe Spawn Mechanics**:
    - **Spawn Protection**: Modified procedural generation and player respawn validation algorithms to guarantee the player never spawns on or next to the Crown Challenge tile or Hospital tile. New games start safely at coordinate `(10550, 10550)`, eliminating accidental modal triggers.
- **Perfect Responsive Modals**:
    - **Unified Adaptive Layout**: Re-engineered styling for all in-game modals—including Menu, Party, Storage, Breeding, Level Up, Journal, Store, and Battle Modals.
    - **Pinned Viewport Navigation**: Converted modal close buttons (`.close-btn`) to `position: fixed` to pin them in the top-right corner of the viewport, ensuring they are always visible and clickable, regardless of scroll depth.
    - **Small-Screen Adaptation**: Introduced media queries for devices narrower than 600px. The battle interface automatically converts to a clean single-column layout, and battle buttons adapt into a comfortable 2x2 grid to prevent any overlaps.
- **Exit State Cleanliness**:
    - **Main Menu UI Guard**: Wrapped Phaser's throttled UI text and weather refresh blocks inside `window.gameStarted` checks.
    - **Weather Element Hiding**: Upgraded `window.exitGame` to completely hide and reset the opacity of the weather status icon and labels upon return to the main menu.

### New Features (v21)
- **Combined Stat Modifier Visuals**:
    - **Dual Nature & Mood Tracking**: Upgraded the Party Modal to calculate and display real-time effective stats when modified positively or negatively by both a creature's Nature and Mood.
    - **Color-Coded Status Enhancements**: Displays the net stat modifiers dynamically using Lime (positive) or Red/Coral (negative) to clearly highlight the tier-based boosts or reductions.
- **Unified Nature & Mood Scaling**:
    - **Structured Object Migration**: Replaced legacy text-based nature/mood properties with fully realized, structured Nature and Mood objects for all creatures, including wild spawns and challenge opponents.
    - **Battle Stability**: Ensured all stat buffs and debuffs from unique mood and nature combinations work and scale correctly in battles, challenges, and training.
- **Procedural Combat Sprites**:
    - **Interactive Battle Visuals**: Added a procedural rendering engine for combatants in Battles and Challenges, replacing the solid color blocks with dynamically drawn, high-quality creature canvas icons.
    - **Dynamic Feature Drawing**: Automatically depicts physical features (such as wings, tails, and horns/claws) based on the creature's traits/descriptions, uses type-themed background glowing auras and pupils, and overlays golden sparkles for Shiny variants.
    - **Swap Reactive**: Sprites are fully reactive and automatically update during battles when creatures are swapped in or out.

### New Features (v22)
- **Local Split-Screen Co-Op**:
    - **True Local Multiplayer**: Introducing an offline 2-player split-screen local co-op mode. Enabling co-op dynamically halves the screen into side-by-side viewports (50vw each) controlled by independent Phaser cameras.
    - **Targeted Camera Following**: Viewports follow Player 1 and Player 2 respectively, allowing both players to explore the vast world completely independently.
    - **Dynamic Controls Mapping**: Player 1 utilizes keyboard Arrow keys or Gamepad 0, while Player 2 operates via keyboard WASD or Gamepad 1 (with smart single-gamepad fallbacks).
    - **Independent Modals & UI Layout**: Player menus, character customization, breeding, and level-ups load in separate side-by-side containers (`.p1-col` and `.p2-col`). Modals block movement controls only for the player interacting with them, ensuring uninterrupted exploration for the other player.
    - **Split-Screen Touchscreen Support**: Fully optimized multi-touch scanning for mobile/tablet screens. Touches on the left half of the display target Player 1, while the right half maps to Player 2.

### New Features (v23)
- **Offline PvP Battles & Creature Trading**:
    - **Interactive Action Tiles**: Added special map action tiles at coordinates `[100][101]` (PvP Battle) and `[101][100]` (Creature Trade) near the central spawn area for immediate split-screen local interaction.
    - **Local Split-Screen PvP**: Fight against each other in a localized PvP arena. The combat interface displays dual inputs with a turn-based resolution state powered by `localPvpTurn` and `localPvpActions`.
    - **Local Creature Trading**: Exchange creatures between Player 1 and Player 2 using a dedicated dual-panel `#tradeModal`, with full real-time validation and localized data updating.
    - **Player 2 Independence & Progression**: Player 2's starting state is initialized with a cloned Gen-1 starter creature, and all of Player 2's creatures and game stats are fully isolated and persisted inside `localStorage`.

### New Features (v24)
- **Tiered Infinite Challenge System**:
    - **Infinite Battle Arena**: Access a high-level battle tier challenge by interacting with the golden crown tile located at coordinate `[100][99]`.
    - **Adaptive Scaling**: Opponent levels scale directly based on your current challenge tier. Higher tiers grant massive scaled XP rewards (`BaseXP * (1 + Tier * 0.1)`).
    - **Challenge-Exclusive Rules**: Standard creature catching is strictly disabled during challenge battles to preserve the competitive integrity of the gauntlet.
    - **Progression Persistence**: Your current challenge tier is fully tracked and persisted within `localStorage` under `wildpulse_challenge_tier`.

### New Features (v25)
- **UI/UX & Engine Polish**:
    - **Safe Hospital Spawn**: Programmatically restricted players from spawning directly on top of or next to the Hospital or Challenge tiles to prevent accidental modal triggers on startup. New game starts cleanly above the hospital at row 99, column 100.
    - **Modern Error/Loss Notifications**: Replaced annoying, browser-blocking native `alert()` dialogs on battle loss with sleek, non-blocking HTML overlay notifications using `window.showModernNotification`.
    - **Responsive Modal Close Buttons**: Converted close buttons to absolute/fixed positioning so they remain pinned and accessible at the top right of the viewport even when scrolling through menus.
    - **Optimized Weather & Performance**:
        - Explicitly reset and hide weather status indicators when exiting to the main menu.
        - Throttled wind direction recalculations, cloud visual updates, and distance-based culling to run on interval-based frames, maintaining a smooth 60 FPS under heavy rendering loads.

### New Features (v26)
- **Character Body Shape Customization**:
    - **Visual Geometry Variety**: Introduced character customization body shapes to break away from the simple default square template.
    - **11 New Geometric Shapes**: Added high-fidelity mathematical canvas path drawing for 11 new unique body shapes, including Triangle, Horizontal Diamond, Vertical Diamond, Rectangle, Octagon, Hexagon, Star, Circle, Heart, Crescent, and Pentagon.
    - **Clipping Pattern Scalers**: Standard pattern configurations (such as Stripes, Dots, and Camouflage) seamlessly scale, translate, and clip themselves to remain bounded precisely inside the chosen shape silhouette.
- **Progression-Based Unlocks**:
    - **Crown Challenge Milestones**: Programmed body shape options to unlock dynamically via the Crown Challenge tiered gauntlet, rewarding high-level achievements.
    - **Locked Dropdowns**: Default "Square" is available from Tier 1, while advanced shapes are locked behind higher tiers (e.g. Triangle at Tier 3, Star at Tier 15, Pentagon at Tier 23), displaying as locked and disabled in the customization dropdown until earned.

### New Features (v27)
- **Friend Level System**:
    - **Passive Experience Accumulation**: Creatures in the player's active party slowly gain Friend experience over time (at a rate of 1 XP per second) while exploring the world. Friend Level and normal Level progress entirely independently.
    - **Dynamic Experience Degradation**: Stored creatures slowly lose Friend experience (at a rate of 1 XP per second). If a creature is left in storage too long and its Friend experience drops below 0, its Friend Level degrades (e.g., from Level 2 back down to Level 1), capping at Level 1, 0 XP.
    - **Reversible Stat Scaling**: When a creature's Friend Level increases, two random stats in its `friendBonusStats` increase by +2 (or all stats by +2 on level multiples of 10), matching the standard level-up progression. If their Friend Level degrades, their `friendBonusStats` are symmetrically and reversibly reduced.
    - **UI Representation**: Active party cards and storage box details seamlessly render each creature's current Friend Level and Friend XP next to their standard level statistics.

---

## Technical Guide & Feature Reference (for LLMs & Grok)

Welcome! This section serves as an extremely thorough, exhaustive technical guide and reference catalog for AI models (like Grok, Jules, etc.) and software engineers working with the codebase of **WildPulse Odyssey**.

---

### 1. Game Architecture & Technical Stack
The game is built with a highly decoupled, modern single-page game engine architecture utilizing:
- **Game Engine**: `Phaser 3` (`v3.55.2`) manages viewport-based culling, physics groups, tile maps, camera control, gamepad polling, and entities.
- **Sound & Music System**: `Tone.js` (`v14.8.49`) provides a procedural, real-time audio engine that dynamically shifts musical layers and tempos according to seasonal states, battles, and environmental weather.
- **XSS & Content Sanitization**: `DOMPurify` (`v3.0.6`) processes all chat text input strings and user-provided strings.
- **Persistent Storage**: Real-time state persistence relies on custom namespaces in browser `localStorage`.
- **UI & Graphics**: Clean cyberpunk HTML overlay portals styled with high-performance CSS and hardware-accelerated SVG renders. Cursors are hidden automatically after 6 seconds of keyboard/mouse or gamepad inactivity.

---

### 2. Procedural & Seeded Systems
- **World & Lake Generation**: Procedurally maps out a 200x200 tiles space (20,000x20,000 pixels) seeded deterministically with a shared random seed based on room code.
- **Seasons**: Uses a 120-day persistent cycle ('Spring', 'Summer', 'Fall', 'Winter'), each lasting 30 days. This influences tree graphics, water reflections, particle emitters, and dynamic Tone.js background musical scores.
- **Weather Patterns**: Dynamically triggers clear, partly cloudy, cloudy, light/heavy rain, light/heavy snow, thundersnows, and thunderstorms. Rainy or stormy patterns provide a **1.35x player movement speed boost**.
- **Time of Day (Day/Night Cycle)**: Generates smooth sine-based lighting transitions over a 20-minute real-world day, automatically adjusting shadow angles, shadow scale, star field brightness, and dynamic procedural ambient background audio layers.

---

### 3. Dynamic Visuals & Procedural Sprite Generator
- **procedural Sprite Generator (`window.renderCreatureCanvas`)**: Renders high-quality multi-layered dynamic visual assets dynamically inside canvas wrappers based on creature attributes:
  - **Animation State**: Live 25 FPS breathing loops, eye blinking, wings flapping, dynamic tail root wagging (mirroring horiz-offset root nodes cleanly without intersecting the main body body frame), floating animations, and custom action effects (e.g., vortex particles, electrical currents).
  - **Mutation Effects**: Overlays visual particles or changes sprite details (e.g. `chrono_warp` clock patterns, `magnetic_pulse` glowing magnetic fields, `photonic_wings` luminous feathered wings).
  - **Shiny Status**: Overlays golden shimmering trails, sparkles, and a +20% base stat enhancement.
  - **Mysterious Egg Rendering**: Displays upright, glossy, 3D textured eggs displaying a gradient blend of both biological parent colors and glowing translucent spots.

---

### 4. Gameplay Mechanics & Stat Formulas
- **Initiative Speed Roll**: Battle turn priority is calculated via individual Speed parameters.
- **Effective Stats**:
  $$\text{EffectiveStat} = \text{BaseStat} \times \text{NatureModifier} \times \text{MoodModifier} \times \text{ShinyBoost} + \text{FriendBonus}$$
- **Damage Formula**: Scaled dynamic calculations mapping attacker ATK against defender DEF with diminishing returns and safety bounds to guarantee smooth, balanced late-game scaling.
- **XP Progression Formula (`window.getXpRequirement`)**:
  - Level 1 to 2 requires exactly **75 XP**.
  - Increases by **25 XP every 2 levels**.
  - Caps at a maximum of **1000 XP** per level.
- **Friend Level System**:
  - Passive +1 Friend XP per second is awarded to active party members during world traversal.
  - Symmetrical -1 Friend XP per second degradation is applied to creatures left in storage boxes (reversibly degrading Friend Level and resetting associated bonus stats).
- **Day 5 Replenishment Cycle**: Store stock automatically resets and replenishes every 5 in-game days to maximum capacity (15 units per item).

---

### 5. Symmetrical Local Split-Screen Co-Op
Enabling Split-Screen divides the Phaser canvas into two symmetrical, self-governing viewports (50vw each):
- **Camera Tracking**: Camera 1 and Camera 2 autonomously follow Player 1 and Player 2.
- **Control Layout**: Keyboard Arrows / Gamepad 0 maps to Player 1, whereas Keyboard WASD / Gamepad 1 targets Player 2. Gamepad virtual cursor systems ignore Left Stick inputs on selection wheels, using D-Pad exclusively to choose options.
- **Symmetrical Turns & Virtual Cursors**: Separate focused styles (`.gamepad-focused-p1` in cyan and `.gamepad-focused-p2` in orange) align gamepad inputs. In dual battle situations, local player inputs are strictly turn-checked to block input from acting outside active speed turns.
- **Independent Modal Windows**: Separate modals (e.g. customized UI panels, menu configurations, and level-up indicators) load in isolated columns (`.p1-col` and `.p2-col`). Modals block movement inputs only for the active, interacting player.

---

### 6. Interactive Action Tiles & Quest NPCs
- **Automatic Tile Overlap**: Stepping on or over functional tiles invokes immediate interaction callbacks (`window.registerTileOverlap`). Accidental re-triggers are strictly blocked using persistent interaction flags, distance thresholds, and walking-away reset checks.
- **Quest NPCs (Star Sprites)**: Renders 8 procedurally culled golden glowing Quest NPCs labeled with `📜 [QUEST]` in gold (`#ffd700`). High-stakes interaction modals support manual slide-browsing via Next/Prev buttons.
- **Defeated NPC Trainers**: 24 distinct wandering trainers. Defeating them prefixes nameplates with a `🏆` symbol, colors them in neon green (`#00ff00`), and appends context-aware suffixes (`[Defeated]`, `[P1]`, `[P2]`, or `[P1&P2]`). Undefeated nameplates render in neon cyan (`#00ffff`).

---

### 7. Core Feature Modals
- **Intro Onboarding Modal (`#introModal` / `#introModal_p2`)**: Displays immersive decrypted sci-fi audio transmissions from "Dr. Aris Vance, Chief Biological Architect," detailing breeding, controls, and featuring a beautiful scrollable 25-item catalog carousel (Pedometer filtered out for Player 2).
- **Party Modal (`#partyModal`)**: Displays active creature cards, rounded stats, effective status indicators, custom renaming inputs, lineage details, and Friend Level XP progress.
- **Breeding Center Modal (`#breedingModal`)**: Re-engineered `<select>` dropdowns (styled with `#0b1424` background and `#00ffd2` text) allow players to select compatible Male and Female parents once Player Level 7 is attained.
- **Storage Chest Modal (`#storageChestModal`)**: Restricts players to a maximum of 3 placeable chests (storing 10 slots each with a stacking limit of 10 items). Contents are fully serialized inside world files in `localStorage`.
- **Dojo Leader Modal (`#dojoModal`)**: Unlocked only after defeating all 24 trainers. Spawns elite Dojo battles scaling levels ($20 + 5 \times \text{dojoTier}$), applying 1.3x multipliers, and awarding scalable coins ($200 + 20 \times \text{dojoTier}$).
- **Circular Wheels (`#actionWheelModal` / `#inventoryWheelModal`)**: Restricts selection navigation strictly to gamepad D-Pad (completely disabling Left Stick inputs to avoid diagonal selection jitter). Allows capture overlays, items usage, custom petting, and a 📸 Capture screenshot feature.

---

### 8. Full In-Game Store Catalog (25 Items Sorted by Price Ascending)

The in-game store automatically sorts items from cheapest to most expensive, utilizing high-quality inline SVGs mapped to invisible text-fallback emojis:

1. **Repellent** (🧴, 40 Coins): Suppresses wild creature encounters for 60 seconds.
2. **HP Booster** (💚, 80 Coins): Instantly increases a selected creature's base HP stat.
3. **Attack Booster** (🔺, 100 Coins): Instantly increases a selected creature's base Attack stat.
4. **Defense Booster** (🛡️, 100 Coins): Instantly increases a selected creature's base Defense stat.
5. **Speed Booster** (⚡, 100 Coins): Instantly increases a selected creature's base Speed stat.
6. **Sp. Atk Booster** (🔮, 120 Coins): Instantly increases a selected creature's base Special Attack stat.
7. **Sp. Def Booster** (🧿, 120 Coins): Instantly increases a selected creature's base Special Defense stat.
8. **Healing Juice Bottle** (🧪, 125 Coins): Restores 50 HP to a selected creature (ignores egg objects).
9. **Creature Cookie** (🍪, 150 Coins): Restores selected creature's happiness by 10. Enforces a persistent 5-minute cooldown per player (`wildpulse_p1_last_cookie_time` / `wildpulse_p2_last_cookie_time`).
10. **Pedometer** (👣, 220 Coins): Triggers player-specific 60-second buff timers that double egg hatching step progression rate.
11. **Healing Juice Jug** (🍶, 250 Coins): Restores 150 HP to a selected creature (ignores egg objects).
12. **Jank Juice** (🧃, 270 Coins): Doubles shiny encounter rates for a duration of 6 minutes (360,000ms).
13. **ExPALL** (✨, 280 Coins): Doubles combat experience gained for 60 seconds.
14. **Creature License** (🎫, 295 Coins): Grants a passive 1.5x catch rate multiplier while held, and exactly 1 is consumed only upon a successful catch.
15. **Cyber-Core Upgrade** (💾, 320 Coins): Grants 150 XP instantly to a selected creature, triggering level-up evaluations.
16. **DNA Stabilizer** (🧬, 420 Coins): Instantly hatches a selected Mysterious Egg in the active party.
17. **Nano-Nurture Serum** (💉, 450 Coins): Instantly restores a selected creature's happiness to 100%.
18. **Storage Chest** (🧳, 620 Coins): Placeable mini-tile unlocking a persistent 10-slot storage box (unlocked at Level 6).
19. **Mini Hospital** (🏥, 850 Coins): Placeable mini-tile that automatically heals player parties within 1500px sight. Limit: 1 per player.
20. **Dojo Tile** (🥋, 920 Coins): Placeable mini-tile that automatically triggers the Dojo challenge (unlocked after defeating 24 trainers). Limit: 1 per player.
21. **Mini Store** (🏬, 950 Coins): Placeable mini-tile that opens the store modal on touch. Limit: 1 per player.
22. **Mini Breeding Center** (🥚, 950 Coins): Placeable mini-tile allowing remote access to the breeding system. Limit: 1 per player.
23. **Mini Trade** (🤝, 950 Coins): Placeable mini-tile that opens the local player trade modal. Limit: 1 per player.
24. **Mini PvP** (⚔️, 950 Coins): Placeable mini-tile that opens the local split-screen PvP battle menu. Limit: 1 per player.
25. **Mini Challenge** (👑, 950 Coins): Placeable mini-tile that triggers the Crown Challenge battle menu. Limit: 1 per player.

---

### 9. Custom Confirmation Overlay Modals
- Custom overlays (`#customConfirmModal_p1` and `#customConfirmModal_p2`) are built with `pointer-events: auto !important` and custom click-outside cancel mechanics.
- This design ensures touchscreen/mouse virtual cursors can cancel operations effortlessly by clicking outside the inner confirmation container, while maintaining standard D-Pad / B-button controller navigation.

---

### 10. Progression-Based Unlocking System
- **Level 6**: Unlocks the ability to buy and place **Storage Chest** mini-tiles.
- **Level 7**: Unlocks the physical map tile, mini-tiles, and menu click callbacks for the **DNA Breeding Center** (checks are bypassed in `doBreed` if `navigator.webdriver` is active to maintain compatibility with automated end-to-end testing).
- **Level 10**: Unlocks the placement of a customizable **Home Interior** 5x5 room (`r: 580-584, c: 580-584` / `r: 580-584, c: 590-594`) equipped with 8 distinct wall styles, 8 floor styles, and 6 glowing ambient overlays. Step-on exit doors teleport players back outside to the origin physical home sprite coordinate.
- **Dojo Tile / Dojo Modal Challenge**: Purchasing a placeable Dojo Tile (920 gold) is strictly locked until the player has defeated all 24 NPC trainers. Attempts to enter Dojo battles in split-screen co-op check and enforce this prerequisite for both players.
- **Character Geometry Shapes Customization**: The character designer starts with the default "Square" geometry at Tier 1. Higher-fidelity body shapes (Triangle, Horizontal Diamond, Vertical Diamond, Rectangle, Octagon, Hexagon, Star, Circle, Heart, Crescent, Pentagon) unlock sequentially as players advance through higher tiers of the Crown Challenge gauntlet (e.g. Triangle at Tier 3, Star at Tier 15, Pentagon at Tier 23).

### 11. Narrative & Lore Framework (for Story Generation)
WildPulse Odyssey features a deep cyberpunk/bio-digital narrative context, which AI models can leverage for generating in-world stories.

#### Key Figures & Characters
- **Dr. Aris Vance, Chief Biological Architect**: A prominent DNA specialist studying bio-neon structures and the driving force behind the cybernetic expedition. Players find his decrypted audio logs outlining the game's core mechanics (DNA Breeding, HUD navigation).
- **Quest NPCs (Golden Star Sprites)**: Spread across the map offering procedurally generated quests.
  - **Scout Lyra**: A seasoned field scout analyzing local fauna.
  - **Architect Vance**: A DNA specialist studying bio-neon structures.
  - **Agent Kael**: An operative investigating dimensional rifts.
  - **Specialist Iris**: A researcher tracking mutant strains.
  - **Hacker Jax**: A rogue coder seeking neural energy logs.
  - **Operative Nomi**: A field agent securing sector dominance.
  - **Sentinel Dax**: A heavy sentinel testing creature battle limits.
  - **Chief Sarah**: The chief of bio-engineering operations.

#### Standard NPC Trainers
24 distinct roaming standard NPC trainers bearing cyberpunk-themed deterministic names:
*Neo, Trinity, Morpheus, V, Jackie, Johnny, Rogue, Alt, Panam, Judy, Kerry, River, Major, Batou, Tachikoma, Case, Molly, Hiro, Y.T., Armitage, Wintermute, Gibson, Smasher, Deus*. Defeating all 24 unlocks the elite **Dojo Tile**.

#### Decrypted Random Lore & Worldbuilding Elements
When players speak to Quest NPCs, they share random, context-rich lore emphasizing the bio-digital frontier:
- *"The grid never sleeps... it just waits in the shadows. We've seen Neon Syndicate runners mapping the outer sectors, looking for unsecured network nodes."*
- *"They say the Hidden Grove wasn't built, it was compiled. I once found an Astral Bloom out there—its petals pulsed with pure data."*
- *"Keep your frequency stable, or the glitches will find you. If you hear thunder without clouds, you've likely wandered too close to a Void Rift."*
- *"DNA splicing isn't just science, it's an art form out here. Taking two base codes and creating a perfect Gen 2 hybrid requires immense precision."*
- *"Every signal you catch is a piece of a larger broadcast. If you ever find a Creature License, hold onto it—the 1.5x success multiplier is invaluable."*
- *"Watch your back in the outer sectors; the firewall is weak there. A Wild Dual Signal can turn a simple patrol into a chaotic 2v2 skirmish."*
- *"Some creatures remember the old world, before the pulse. You can see it in their eyes when the Autumn leaves start to fall and wither."*
- *"Trust your instruments, but trust your companion more. I built my first shelter using simple Wood Foundations; it kept the midnight storms at bay."*
- *"I've seen data streams that would melt a standard processor. Taking on the Crown Challenge tests not just your code, but your very spirit."*

#### Dynamic World Events
The game operates on a persistent 10-minute active / 10-minute cooldown cycle for procedural dynamic events that visibly alter gameplay dynamics and display via a top-HUD badge:
- **Daytime Radiance**, **Nighttime Eclipse**, **Heat Wave**, **Aurora**, **Gusty Winds**, **Earthquake**, **Bountiful Bloom**, and **Dual Battle** (Co-Op only). These events temporarily buff creature types matching the event's elemental affinity (e.g. Earthquakes buff Earth types) and trigger global notifications (`window.showModernNotification`).
