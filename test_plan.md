1. Add `window.finalizeFurnitureTexture` method that creates 90, 180, and 270 degree rotated variations of canvas for a given texture.
2. In `generateTileTextures` function, replace `scene.textures.addCanvas('furniture_...', canvas)` with `window.finalizeFurnitureTexture(scene, 'furniture_...', canvas)` calls.
3. When loading mini tiles in `window.spawnMiniTiles`, if it's a `furniture_` tile, use the appropriate texture variation (e.g. `textureKey + '_' + tile.rotation`) instead of `setAngle(tile.rotation)`.
4. During placement preview updates (gamepad and keyboard handling), update the preview sprite's texture to the rotated variant if it's a `furniture_` tile, instead of rotating the sprite itself.
