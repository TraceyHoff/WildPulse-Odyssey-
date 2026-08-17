Plan:
1. Add 5 new carpets to the `furniturePool` in `index.html`.
  - Star Carpet
  - Round Cyber Carpet
  - Hexagon Carpet
  - Heart Carpet
  - Diamond Carpet
2. Add these 5 new carpets to the store `homeItems` list, `introCarouselItems` list, `emojiMap`, and `typeMap`.
3. Add SVGs for their icons in `getItemIconHTML`.
4. Add their canvas-drawn sprites in `generateTileTextures`.
5. For the `isValidMiniTileLocation` function, do NOT add them to the `flatTopItems` or `smallItems` lists, because they are regular furniture.
6. Crucially, they need to be on the bottom layer when placed. I'll modify the `spawnMiniTiles` logic to set their depth to a lower value than other furniture, but higher than the floor (e.g. `mSprite.setDepth(8.5);` while regular is 9, floor is -1). Or perhaps even `mSprite.setDepth(-0.5);`. Currently floor is -1, grass is -1.1. Wait, inside home, floor is `-1` and `grass` outside is `-1` too. The mini tiles are at `depth = 9`. Let me check home floor depth.
7. Home floor depth is `-1.1` and `-1.0` in different parts? Let me re-verify. `home_floor` is depth `-1`.
8. So setting depth of carpets to `0.5` or `1` or `8` should put them under standard mini tiles (`9`) but over the floor (`-1`). Let's use `8.5` just in case, wait, let me check the existing `Glow Carpet`.

I'll check what depth `Glow Carpet` is using.
