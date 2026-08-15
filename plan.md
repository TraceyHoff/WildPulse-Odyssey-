# Plan to update creature nameplates
1. **Implement custom SVG/Canvas type icons**:
   - Write a helper function `createTypeIcon(scene, type)` to generate Phaser textures from drawn 2D canvas paths for all 10 types (`Fire`, `Water`, `Nature`, `Electric`, `Ice`, `Earth`, `Wind`, `Light`, `Dark`, `Cosmic`) and `Shiny`.
2. **Update `spawnCreature` in `index.html`**:
   - Remove the existing `symbolText` emoji code.
   - Create a `Phaser.GameObjects.Container` called `nameplate`.
   - Calculate nameplate dimensions based on the creature's name and level string (e.g. `const nameText = scene.add.text(...)`).
   - Add a `Phaser.GameObjects.Graphics` background matching the game's cyberpunk theme (dark background `0x0b1424`, neon border based on type/shiny).
   - Add the custom type icon sprite.
   - If shiny, add a shiny icon sprite.
   - Assemble text and icons side-by-side inside the container.
   - Set the container position to `y - 35` (above the creature).
   - Store it using `sprite.setData('nameplate', nameplate);`
   - Handle destruction `sprite.on('destroy', ... nameplate.destroy())`.
3. **Update game loops**:
   - In the update loop (where viewport visibility is checked, line 35216), update `nameplate.setPosition(creature.x, creature.y - 35)` and `nameplate.setVisible(isVisible)`, and manage depth.
   - In depth sorting (line 34125), adjust `nameplate` depth.
4. **Pre-commit and Test**:
   - Complete pre-commit instructions, run `npx playwright test tests/smokeTest.spec.js` and others. Check for any syntax errors or regressions.
