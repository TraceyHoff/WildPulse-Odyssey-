1. **Update `itemsPool`**:
    - In `index.html`, add `"EMP Grenade", "Nanite Swarm", "Holo-Decoy", "Mirror Shield", "Tactical Analyzer", "EM Scrambler"` to `itemsPool`.
2. **Update store UI/prices**:
    - Add to `items` array in `window.getItemSellPrice` and `window.updateStoreUI`. Ensure `price` is 400 for all new tactical items.
3. **Update icons**:
    - Update `getItemIconHTML` logic to handle the new items (assign `glowColor`).
    - Add them to `emojiMap`.
    - Create SVG representations in the `switch (itemName)` statement for the new items.
4. **Update `tacticalItems` array**:
    - Add them to `tacticalItems` in `window.openBattleItemModal`.
5. **Implement `useBattleItemAction`**:
    - In `useBattleItemAction`, before applying an effect to the target, check if the target has an "EM Scrambler" in their inventory.
    - If they do:
        - Decrement the target's "EM Scrambler" quantity (and remove if 0, save to localStorage).
        - Log a message: `<span style="color:#00ffd2;">EM Scrambler negated the effects of ${itemName}!</span>`
        - Do *not* apply the item's effects. The item is still consumed from the user, and the turn is taken.
    - Else (or for self-buffs), apply the item's effects by setting `battleStats` flags:
        - `EMP Grenade`: `targetCombatant.battleStats.empDamage = true;`
        - `Nanite Swarm`: `targetCombatant.battleStats.naniteTurns = 3;`
        - `Holo-Decoy`: `actorCombatant.battleStats.holoDecoy = true;`
        - `Mirror Shield`: `actorCombatant.battleStats.mirrorShield = true;`
        - `Tactical Analyzer`: `actorCombatant.battleStats.guaranteedCrit = true;`
6. **Implement battle logic hooks**:
    - **EMP Grenade**: Wait, tactical items take up a turn, so when you *use* the EMP Grenade, it should just deal the damage immediately during `useBattleItemAction` rather than modifying `battleStats`. Let me check if `useBattleItemAction` handles damage. It modifies `battleStats`. But to show floating text and shake, maybe I should apply damage directly in `useBattleItemAction`. Wait, `doPlayerAction` and `doEnemyAction` execute attacks. If EMP Grenade is used, the turn is skiped? No, in `runLocalPvpAction`, using an item takes the turn, then calls `callback()`. So I can apply damage directly in `useBattleItemAction`. "Bypasses opponent's shields and deals a small amount of guaranteed damage."
    - **Nanite Swarm**: Hook into the end of `doPlayerAction`/`doEnemyAction` (or start) to apply DoT. Let's add a function to process turn end effects, or just process it after damage. Wait, `runLocalPvpAction` calls `callback` after `doPlayerAction`. We need to be careful with dual battle/pvp.
    - Actually, maybe Nanites do damage right before the affected player attacks. In `doPlayerAction`/`doEnemyAction`, if `naniteTurns > 0`, deal damage.
    - **Holo-Decoy**: "Significantly boosts your evasion for the next attack." In `doPlayerAction` (and `doEnemyAction`), when calculating hit chance, if the target has `holoDecoy`, boost their evasion significantly, then remove `holoDecoy`.
    - **Mirror Shield**: "Reflects the opponent's next attack back at them." In `doPlayerAction`/`doEnemyAction`, when applying damage to `currentEnemy`, if `currentEnemy.battleStats.mirrorShield`, reflect it back to `currentPlayer` and remove `mirrorShield`.
    - **Tactical Analyzer**: "Guarantees your next attack will be a critical hit." In `doPlayerAction`/`doEnemyAction`, check `guaranteedCrit`. If true, set damage multiplier for crit, log it, and remove `guaranteedCrit`.
