1. **Define Furniture Items & Add to Store**
   - Add new furniture items (e.g., "Neon Couch", "Cyber Desk", "Glow Carpet", "Holo Bed") to the items list in `window.updateStoreUI` (`items` array), `itemIcons` object, and `emojiMap` in `window.getItemIconHTML`.
   - Adjust requirements (e.g., player level >= 10) for these items to appear in the store.
2. **Generate Sprites in `generateTileTextures`**
   - Create canvas drawing logic for the new furniture tiles (e.g., `furniture_couch_tile`, `furniture_desk_tile`, `furniture_carpet_tile`, `furniture_bed_tile`).
   - Register them with `scene.textures.addCanvas('furniture_couch_tile', ...)` and similar.
3. **Generate Icons in `window.getItemIconHTML`**
   - Add new custom SVG definitions for the furniture items within `window.getItemIconHTML`.
4. **Verify Canvas and SVG Logic**
   - After updating `index.html` with the new canvases and SVG strings, use `read_file` to ensure they were written correctly.
5. **Update Mini-Tile Placement Logic**
   - In `window.startMiniTilePlacement`, add the new items to the `textureMap` (mapping item names to tile texture keys).
   - In `window.tryPlaceMiniTile`, add them to the `typeMap` (mapping item names to internal tile types).
   - Furniture items will follow the same placement rules as existing mini tiles (which are currently verified via `window.isPlayerInsideHome`).
6. **Run Tests**
   - Run `npx playwright test` to check for regressions.
   - Run specific tests like `tests/homeInterior.spec.js` and `tests/homeCustomization.spec.js` if available to ensure home building works.
7. **Pre-commit Steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
8. **Submit Changes**
   - Commit and push changes using the submit tool.
