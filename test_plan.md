1. **Fix Quest Modal Triggering Instantly After Close**:
   - The issue occurs because the `playerCollider.hasQuestModalOpened[questNpcId]` flag is unset when the player's distance to the NPC is `> 150`.
   - The function `window.getQuestNpcPixelPos(npcId)` returns the top-left coordinate `x: pos.c * 100 + 50`, `y: pos.r * 100 + 50` for the NPC, where `pos.c` and `pos.r` come from `window.getQuestNpcPos(npc)`.
   - If the tile is not a grass tile (but maybe a `quest_npc_1` tile, which it becomes after generation), `window.getQuestNpcPos` searches for a nearby grass tile and returns *that* tile's coords. This causes `window.getQuestNpcPixelPos` to return the wrong coordinate (e.g. 400, 400 instead of 500, 500), so the distance is calculated incorrectly.
   - When the distance is calculated incorrectly, the player is immediately considered "far away" from the NPC as soon as the modal is closed, unsetting the `hasQuestModalOpened` flag, which allows the modal to reopen immediately on the very next frame due to the overlap.
   - Fix `window.getQuestNpcPos(npc)`: The condition `window.mapData[r][c] !== 'grass'` should also check if it is not a `quest_npc` tile (`&& !window.mapData[r][c].startsWith('quest_npc')`). If it's already a quest NPC tile, then its current coordinates are correct!

2. **Fix Quest Modal Prev/Next Buttons Blinking Blue**:
   - The `button` tag has a global CSS rule `animation: neonBorderPulsate 4s ease-in-out infinite !important;` which causes the border to cycle colors (including blue).
   - In `index.html` where `questPrevBtn_p1`/`p2` and `questNextBtn_p1`/`p2` are generated dynamically, we can override the `animation` property to `none !important;` inline: `animation: none !important;` inside the inline `style=""` for those specific buttons.

3. **Pre Commit Steps**:
   - Follow instructions from `pre_commit_instructions` tool to perform required tests/checks.

4. **Submit**:
   - Request review and submit the changes.
