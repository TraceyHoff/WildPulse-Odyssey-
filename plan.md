1. **Update `window.abilities`**:
   - For each type (`Fire`, `Water`, `Nature`, `Electric`, `Ice`, `Earth`, `Rock`, `Normal`), replace the existing abilities with a new set that includes the new ability types:
     - `charge_attack`: Increased damage, but requires 1 turn to charge.
     - `shield`: Absorbs incoming damage for 2-3 turns.
     - `status_inflict`: Causes multi-turn status effects (e.g., Poison, Burn, Sleep, Paralyze, Freeze).
     - Keep one or two direct damage/healing abilities to maintain variety.

2. **Update Visual Effects**:
   - In `window.triggerAbilityVisualEffect`, enhance the existing visuals (fire, water, nature, electric) to make them "much more awesome, intense, and epic looking". Add more particles, stronger glows, scale animations, or shakes to make them feel impactful. Let's add scale pulse and maybe screen shake to the combatant.
   - Also add specific visual types for the new ability types, e.g., a shield dome for `shield` abilities, gathering energy particles for `charge_attack`.

3. **Update Ability Logic (`doPlayerAction` & `processEnemyTurn`)**:
   - Handle the new ability types in `doPlayerAction` and the equivalent enemy function.
   - For `shield`:
     - Set a `shieldTurns` counter on `battleStats` (e.g., `currentPlayer.battleStats.shieldTurns = ability.turns`).
     - When a combatant takes damage, if their `shieldTurns > 0`, reduce the damage (e.g., to 0 or 50%) and decrement `shieldTurns`.
   - For `charge_attack`:
     - Set a `chargeTurns` counter (e.g., `currentPlayer.battleStats.chargeTurns = ability.turns`) and store the power multiplier.
     - On the next turn, if `chargeTurns > 0`, decrement it. If it reaches 0, execute the massive attack. If not 0, skip the attack phase and log "Gathering energy...".
   - For `status_inflict`:
     - Call `applyStatusEffect(target, ability.value)` where `value` is the status (e.g., 'Poison', 'Burn').

4. **Ensure pre-commit steps are done**:
   - Run tests and verifications using `pre_commit_instructions`.

