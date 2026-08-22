1. **Modify `window.updatePlayerSlots` in `index.html` to highlight egg slots:**
   Change the border styling of the `.egg-slot` elements to `#ffeb3b` (yellow) to make them distinct from regular slots, except when an egg is ready to hatch (at which point `egg-hatch-glow` handles it). Specifically, when an egg is present but not ready, `slot.style.border = 'none'` should be changed to `slot.style.border = '2px solid #ffeb3b'` and `padding` to `0px`. At line 20694, the default border is `slot.style.border = '2px solid #555';`. I will change this default to `slot.style.border = '2px solid #ffeb3b';` so both empty and non-ready egg slots are distinct.
2. **Modify `updateInventoryList` in `index.html` to display all inventory slots:**
   In `index.html`, `window.canAddInventoryItem` specifies that `inv.length < 4` is the limit for adding new unique items. This means there are a maximum of 4 inventory slots. We will change the rendering logic to always display 4 slots. If the item exists in the `inv` array at that index, render the item card as usual. If it is empty, render a placeholder empty slot with an empty appearance `<div class="party-card empty-slot" style="background: rgba(10, 15, 30, 0.4); border: 1px dashed #555; height: 60px; display: flex; align-items: center; justify-content: center; color: #888; font-style: italic;">Empty Slot</div>`. Remove the early return `if (!inv || inv.length === 0)` condition.
3. **Modify `window.generateProceduralQuest` in `index.html`:**
   Around line 4852, `const types = ['catch', 'breed', 'defeat_trainer', 'challenge_tier', 'player_level', 'creature_level'];` is defined. Add `if (pLevel >= 10) { types.push('place_furniture'); }` just below it.
   Then, add logic for `questType === 'place_furniture'`:
   ```javascript
   else if (questType === 'place_furniture') {
       const targetFurniture = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
       title = `Decorate Home: ${targetFurniture}`;
       description = `Acquire and place a ${targetFurniture} in your home territory tiles.`;
       targetValue = targetFurniture;
   }
   ```
   To ensure the `rewardItem` does not match the `targetValue`, I will modify the reward logic around line 4875:
   ```javascript
   if (pLevel >= 10 && Math.random() < 0.15) {
       do {
           rewardItem = window.furniturePool[Math.floor(Math.random() * window.furniturePool.length)];
       } while (questType === 'place_furniture' && rewardItem === targetValue);
   }
   ```
4. **Modify `window.evaluateActiveQuests` in `index.html`:**
   In `index.html` around line 30080, `typeMapLocal` is declared as a local constant. Change `const typeMapLocal = {` to `window.typeMapLocal = {` to expose it to the global scope. Add logic for `q.type === 'place_furniture'` in `evaluateActiveQuests`. The target is the furniture name (e.g., `Neon Couch`). To match it to a placed tile, parse `localStorage.getItem('wildpulse_p' + playerNum + '_mini_tiles')`. Look up `window.typeMapLocal[q.target]`. If any placed tile in the user's home has a `type` matching this mapped value, increment `q.progress` to `q.targetCount` and mark as completed. Ensure we call `window.saveQuests();`.
5. **Verify Changes:**
   Read the modified sections of `index.html` using `grep` to verify they were written correctly. Then perform the frontend visual verification:
     a) Start the local server by running `python3 -m http.server 3000 &` in the sandbox.
     b) Create a Playwright script `test-quests.spec.js` that navigates to the localhost application, opens the inventory, visually verifies the yellow egg slot border and the 4 slots. Then forces a quest generation of type `place_furniture` to verify the quest updates, places a matching furniture piece using mocked data, checks that the quest evaluates as complete, and takes screenshots and videos for visual verification.
     c) Ensure screenshots/videos are stored in the correct directory.
     d) Call `frontend_verification_complete`.
6. **Run tests**: Run Playwright tests (e.g., `npx playwright test`).
7. **Pre-commit instructions:** Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
8. **Submit:** Run `submit` with a descriptive commit message.
