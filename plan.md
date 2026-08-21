1. **Limit storage furniture items to max 2 per type:**
   - In `window.tryPlaceMiniTile`, after the valid location check, count how many items of the current `tileType` are already in `miniTiles` for the player.
   - If the count is `>= 2` and the `tileType` is one of the storage furniture items (e.g., `storage_chest`, `furniture_filingcabinet`, `furniture_displaycabinet`, `furniture_shelf`, `furniture_wardrobe`), block placement and show a notification.
   - The notification should use the lock icon (`window.getLockIconHTML(16)`) and a message like: `❌ ${window.getLockIconHTML(16)} You can only place a maximum of 2 ${itemName}s in your home.`.

2. **Explain item tiers in onboarding slides:**
   - In `introModalSlide3` (for both `p1` and `p2`), add a new section explaining the item tiers: "Uncommon", "Rare", "Exquisite".
   - This should mention that tiered items have a stronger effect (e.g., higher stat boosts) and can be obtained from procedural quests.

3. **Pre-commit checks:**
   - Run verification and tests.
