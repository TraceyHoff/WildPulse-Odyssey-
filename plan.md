# Execution Plan

1. **Update `useBattleItemAction` in `index.html`:**
   - Modify the signature to `window.useBattleItemAction = function(actorNum, itemName, targetId)`.
   - `actorNum` can be 1, 2, or `'npc'`.
   - Look up the `actorCombatant` and `targetCombatant` based on `actorNum` and `targetId`.
   - `targetId` can be `'ally1'` (`currentPlayer`), `'ally2'` (`currentPlayer2`), `'enemy1'` (`currentEnemy`), `'enemy2'` (`currentEnemy2`).
   - If `actorNum === 'npc'`, deduct from `window.npcInventory`. Apply effects as usual.

2. **Add `promptItemTarget` function:**
   - Create a UI modal similar to `promptDualBattleTarget` but lists valid targets based on whether the item is offensive or defensive.
   - Offensive items: `["Stun Grenade", "Smoke Bomb", "EMP Grenade", "Nanite Swarm"]` -> Target Enemies.
   - Defensive items: `["Adrenaline Shot", "Holo-Decoy", "Mirror Shield", "Tactical Analyzer"]` -> Target Allies.
   - Pass the chosen `targetId` to a callback.

3. **Update `openBattleItemModal`:**
   - When the "Use" button is clicked, determine if the item is offensive or defensive.
   - Determine available targets.
     - Single battle: `ally1`, `enemy1`.
     - Dual battle: `ally1`, `ally2`, `enemy1`, `enemy2`.
     - Local PVP: P1 sees `ally1` (self), `enemy1` (p2). P2 sees `ally1` (p2 self), `enemy1` (p1). Note: for P2, `currentPlayer` is P1 and `currentEnemy` is P2. Wait, in Local PVP, P2's creature is `currentEnemy`. So for P1, `ally1` = `currentPlayer`, `enemy1` = `currentEnemy`. For P2, `ally1` = `currentEnemy`, `enemy1` = `currentPlayer`. We must handle this carefully.
   - Call `window.promptItemTarget` which shows the available targets and their HP. When selected, it triggers `window.handlePlayerTurn('item:' + item.name + ':' + targetId)`.

4. **Update `handlePlayerTurn`:**
   - Update the action parsing to handle `item:ItemName:targetId`.
   - In Dual Battle Logic and Local PVP Logic, ensure `item` actions are stored and executed properly. Wait, in Local PVP, we just execute `useBattleItemAction` immediately. Let's make sure it parses the target.

5. **Update NPC Battle Initialization:**
   - In `startNpcBattle`, `startNpcDualBattle`, `startDojoBattle`, `startChallengeBattle`, initialize `window.npcInventory` with a selection of tactical items. For example, give them 2 Random offensive items and 2 random defensive items.

6. **Update `doEnemyAction` for NPCs:**
   - At the beginning of `doEnemyAction`, if `window.isNpcBattle` (or Dojo/Challenge), check if the NPC wants to use an item.
   - Tactical logic: evaluate current conditions (e.g., if NPC HP < max, if player has no nanites, etc.).
   - If the NPC decides to use an item, select the target (e.g., `enemy1` for their own buff, `ally1` for the player debuff - wait, from NPC perspective, player is enemy1. Target IDs should map correctly in `useBattleItemAction`).
   - Call `window.useBattleItemAction('npc', itemName, targetId)`.
   - After using the item, call the `callback` to end the turn, skipping the attack phase!

7. **Pre-commit checks**: Include pre-commit steps to ensure changes are validated.
