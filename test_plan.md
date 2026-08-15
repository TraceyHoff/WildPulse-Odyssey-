1.  **Add Rotation Support for Mini-Tiles**:
    *   Currently, mini-tiles are placed using `window.tryPlaceMiniTile` and spawn via `window.spawnMiniTiles`.
    *   We need to allow players to rotate the preview sprite before placing it.
    *   Let's use a specific key/button for rotation during placement mode. E.g., 'R' key on keyboard, or 'X' / 'Y' button on gamepad.
    *   Update `window.startMiniTilePlacement` to initialize a rotation state: `window['p' + playerNum + 'MiniTileRotation'] = 0;` (0, 90, 180, 270).
    *   Update the gamepad input logic in `window.processGamepadInputForPlayer` to handle rotation when `window['p' + playerNum + 'MiniTilePlacementMode']` is active.
    *   Update pointer/keyboard logic to handle rotation (e.g. 'R' key, or Right Click to rotate instead of cancel, but let's see how keyboard is handled for mini tile placement - actually, right click is used to place base. Let's add a simple 'R' key listener or similar, or just map it to Gamepad 'X' and a UI hint for PC).
    *   Update `window.tryPlaceMiniTile` to save the rotation angle in the `miniTiles` array: `miniTiles.push({ type: tileType, x: snappedX, y: snappedY, rotation: angle });`.
    *   Update `window.spawnMiniTiles` to read the `rotation` from the saved tile and apply it to the sprite: `mSprite.setAngle(tile.rotation || 0);`.
    *   Update `mSprite.body.setSize()` logic in `window.spawnMiniTiles`? If a sprite is rotated 90/270 degrees, its visual bounds change, but its physics body size might need to be swapped (width vs height) if it's rectangular. Currently all mini-tiles use `mSprite.body.setSize(60, 60);` which is square, so rotation might not affect the physics body size. We should keep it 60x60 or adjust if it looks weird, but let's start with just setting the visual angle. Wait, if it's 60x60 and we can place them "right up against walls, furniture, and other mini-tiles as long as they dont overlap onto each other", we need to adjust the collision logic or placement validation.

2.  **Allow placing furniture right up against walls/furniture/mini-tiles without overlap**:
    *   Currently, `window.isValidMiniTileLocation` checks:
        *   If inside home: must be on `home_floor`.
        *   Checks against player boundaries.
        *   Checks against other homes/structures.
        *   Checks against existing mini tiles by comparing their exact grid row/col (`tRow === row && tCol === col`).
    *   If we can place them right up against each other, the current grid-based check (`tRow === row && tCol === col`) actually allows placing them on adjacent tiles. Since grid tiles are 100x100, if we snap them to grid, they are placed at 100x100 intervals.
    *   Wait, the user said "Can we allow all furniture, and mini-tiles to be rotated to face different directions before being placed and can the sprite in the world change to match the rotation? Can furniture be placed right up against walls, furniture, and other mini-tiles as long as they dont overlap onto each other so players can decorate their homes?".
    *   Let's check if the current placement uses grid snapping.
        ```javascript
        let col = Math.floor(x / 100);
        let row = Math.floor(y / 100);
        let snappedX = col * 100 + 50;
        let snappedY = row * 100 + 50;
        ```
    *   Yes, they are currently snapped to a 100x100 grid. To allow placing them "right up against walls" or other furniture smoothly, we might need to change the snapping or validation. Or maybe the collision bodies are too large?
    *   If they want them "right up against walls, furniture", maybe we should remove the 100x100 grid snapping and instead use the exact coordinates (or a finer grid, like 10x10 or no grid), and use a collision check (e.g. `scene.physics.overlap` or checking rectangle intersections) to ensure they don't overlap with other furniture/walls?
    *   Let's check `isValidMiniTileLocation`. If we disable grid snapping, we'd need a bounding box intersection check instead of `tRow === row`.
    *   Let's look for how `tryPlaceMiniTile` is called. It uses `window['p' + playerNum + 'MiniTilePreviewX']`. If we remove `col = Math.floor(x/100)`, they can be placed exactly where the preview is.
    *   Wait, if we use a finer grid (e.g. 10x10) or no grid, we must check for overlaps with physics bodies or manually check bounding boxes.
    *   "as long as they dont overlap onto each other" -> implies a bounding box check.

Let's do some testing and analysis.
