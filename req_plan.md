# Request Plan Review
## 1. Add Realistic Shading (2.5D visual depth)
To apply realistic light shadowing on generated trees, plants, NPC quest givers, NPC trainers, and character sprites without causing game performance issues (by using offscreen canvases as described in AGENTS.md), I will add `ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; ctx.shadowBlur = 8; ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 4;` in the following texture generation functions right before they draw their primary content on their respective offscreen `canvas` contexts:
- `generateTreeTextures` (for Trees)
- `window.generatePlantTextures` (for Plants)
- `window.generatePlayerTexture` (for Character Sprites)
- `window.generateQuestNpcTexture` (for NPC Quest Givers)
- `window.renderCreatureCanvas` (for NPC Trainers/Creature world sprites when `drawBackground = false` which indicates world rendering)

## 2. Fix Stuttering at Start & Weather Transitions
Phaser physics delta time accumulation after backgrounding/heavy load can cause extreme speeds/stuttering.
AGENTS.md states: "To prevent Phaser Arcade Physics from accumulating massive delta times and causing extreme movement speeds after a browser tab is backgrounded, the Phaser configuration must include `fps: { panicMax: 120 }`." However, checking `index.html` shows it is already there.

The other source of stuttering at the start/weather transitions could be related to rapid Tone.js sounds being called with `Tone.now()` causing Audio Context queue build up. I will check for `Tone.now()` usage in the weather event sounds and use `undefined` instead, as outlined in AGENTS.md.

Also, when `window.weatherIntensity` changes (or right at game start), there might be unthrottled heavy loops or continuous rebuilds. I will check `generateTreeTextures` and weather cycle calculations to ensure `window.lastWeatherCalcUpdate = 0` correctly, or if there's any canvas being rebuilt dynamically in a loop.
