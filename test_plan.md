1. **Define `window.updateCreatureNameplate(scene, nameplateContainer, creatureData)`**
   - Extract the nameplate updating logic (used in `updatePetFollow`) into a globally accessible helper function.
   - This function will check if `lastText`, `lastShiny`, or `lastType` have changed, and if so, dynamically resize the background, re-center the elements, update text, icons, and apply the appropriate happiness dot color.

2. **Refactor `spawnCreature`**
   - In `spawnCreature` (approx line 32022), replace the verbose nameplate building logic with a call to `window.updateCreatureNameplate(scene, nameplateContainer, clonedData)`.

3. **Refactor `updatePetFollow`**
   - In `updatePetFollow` (approx line 32163), replace the inline caching and updating logic for the nameplate with a call to `window.updateCreatureNameplate(scene, nameplateContainer, followCreature)`.

4. **Update `window.adjustWildCreatureLevels`**
   - Inside `window.adjustWildCreatureLevels` (approx line 31728), when a wild creature's level changes (`data.level = targetLevel`), also call `window.updateCreatureNameplate(scene, sprite.getData('symbolText'), data)` so that the change propagates to the actual UI nameplate visually. Wait, `scene` can be grabbed from `sprite.scene`.

5. **Pre-commit Instructions**
   - Complete pre-commit steps to make sure proper testing, verifications, reviews and reflections are done.
