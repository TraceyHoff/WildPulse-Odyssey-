1. **Define new items**: Add 3 tactical PvP items in `window.getItemSellPrice` and `window.updateStoreUI` in `index.html`.
   - "Stun Grenade" (Price 400): "Skip the opponent's next turn in PvP battles."
   - "Smoke Bomb" (Price 400): "Decreases opponent's accuracy in PvP battles."
   - "Adrenaline Shot" (Price 400): "Increases your attack for 3 turns in PvP battles."
   These items will be sold for 400 coins.

2. **Add SVG icons**: Update `window.getItemIconHTML` to return unique, highly detailed SVG icons for these 3 items.

3. **Battle UI Update**:
   - Add a `<button class="btn-item">Item</button>` to the `.battle-controls` sections (`#battleControls` and `#battleControls_p2`) in `index.html`.

4. **Item Modal in Battle**:
   - Add a UI modal (`#battleItemModal` and `#battleItemModal_p2`) that opens when the new "Item" button is clicked. This modal lists the player's available tactical items (from `window.p1Inventory` and `window.p2Inventory`).
   - Selecting an item from the modal triggers `window.useBattleItem(playerNum, itemName)`.

5. **Action Logic**:
   - Create `window.useBattleItem(playerNum, itemName)` to handle the item usage logic. It will deduct the item from the player's inventory, display a battle log message, and apply a buff/debuff.
   - For "Stun Grenade": Set a flag like `currentEnemy.battleStats.skipTurn = true`.
   - For "Smoke Bomb": Set a flag like `currentEnemy.battleStats.accuracyDecrease = true`.
   - For "Adrenaline Shot": Set a flag like `currentPlayer.battleStats.adrenalineTurns = 3`.
   - Update `window.doPlayerAction` and `window.doEnemyAction` (or the top-level turn processing logic inside `window.handlePlayerTurn` / `window.executeLocalPvpRound`) to respect these new statuses. For example, if `skipTurn` is true, the player/enemy cannot attack that turn. If `accuracyDecrease` is true, there is a chance their attack misses. If `adrenalineTurns` > 0, their attack does extra damage.

6. **Verification**:
   - Use `read_file` or `run_in_bash_session` with `cat index.html` to confirm that the new items, UI modals, and battle logic were correctly added.

7. **Test the changes**: Start the local server and run the tests using `npx playwright test` to ensure the changes are correct and no regressions were introduced.

8. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
