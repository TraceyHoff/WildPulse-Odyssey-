1. **Fix battle lockup on encounter without healthy creatures:**
   In `collectCreature()`, when `window.currentBattleParty.length === 0` is true (all creatures have 0 HP), it displays a message and bounces the player off. However, right before this, `inBattle = true` and `playerCollider.body.moves = false` are set. The function `return`s early without reverting these variables, which permanently locks the player in the "inBattle = true" state where they cannot move or do anything. We must add `inBattle = false;` and `playerCollider.body.moves = true;` inside that `if` block, or move `inBattle = true` until after we check if we have a valid party.

2. **Change respawn location on defeat:**
   Currently, in `window.endBattle` when the result is `'loss'`, the code calculates a safe dry land spawn based on the enemy sprite, and sets `player.x` and `player.y` to that position. We will change this to spawn the player directly near the hospital. The hospital tile is at `[101][100]`? In memory, it says "party healing is implemented via a 'hospital tile'... permanently hardcoded at map coordinates [100][100]". The tile coordinates [100][100] corresponds to pixel coordinates (100 * 30 + 15, 100 * 30 + 15). Actually, the user asked "can they spawn by at tile 101,100 close by the hospital tile". We can set `player.x = 101 * 30 + 15` and `player.y = 100 * 30 + 15`.

3. **Rebalance damage formula:**
   Currently, the damage formula in `calculateDamage` uses:
   ```javascript
    let statDiff = atk - def;
    let diffMultiplier = 1 + (statDiff > 0 ? Math.pow(statDiff, 0.8) : -Math.pow(Math.abs(statDiff), 0.8)) / 100;
    diffMultiplier = Math.max(0.1, diffMultiplier); // Floor multiplier at 0.1x
    let damage = power * diffMultiplier * typeMod;
   ```
   For level 1 creatures with 50 power and 1x multiplier, the output is almost exactly 50 damage (statDiff is usually around 0). Level 1 creatures have max health around 30-40, making combat consist almost entirely of OHKOs (if super effective cap kicks in, or just regular attacks). The user asked to "fix this". We will introduce a level scaling factor similar to Pokemon's standard damage formula or significantly scale down the base damage at low levels.
   ```javascript
    let level = attacker.level || 1;
    let damage = (((2 * level / 5 + 2) * power * (atk / def)) / 50 + 2) * typeMod;
   ```
   Or a simpler scaling factor that maintains the current formula but just divides by some constant?
   Actually, the user states "creatures able to inflict 40-50 damage to opponents this is too strong for a level 1 can we fix this".
   If we change it to the classic formula, a level 1 attack 50 will do `( (2/5 + 2) * 50 * 1 ) / 50 + 2 = 2.4 * 50 / 50 + 2 = 4.4` damage, which is much more reasonable for level 1!
   At level 100 it does `(42 * 50 * 1) / 50 + 2 = 44` damage (to an equal def opponent).
   Wait, if we use the classic formula: `damage = (((2 * level / 5 + 2) * power * (atk / def)) / 50 + 2) * typeMod`.
   Let's replace the inner workings of `calculateDamage` with this formula.

4. **Complete pre-commit steps:**
   Ensure proper testing, verifications, reviews and reflections are done.
