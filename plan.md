1. **Remove stat caps in `getEffectiveStat`:**
   Modify `window.getEffectiveStat` to not use the 500 soft cap or the 999 hard cap. Change to simply return `scaledBase`.

2. **Update `getRawScaledStat` to include bonus stats:**
   Add logic to include `creature.bonusStats[statName]`.
   ```javascript
   window.getRawScaledStat = function(creature, statName) {
       if (!creature.stats) creature.stats = {};
       let base = creature.stats[statName] || 50;
       let lvl = creature.level || 1;
       let val = 0;
       if (statName === 'health') {
           val = (base * 0.4) + (base * lvl * 0.05);
       } else {
           val = base + (base * (lvl - 1) * 0.05);
       }
       let bonus = creature.bonusStats ? (creature.bonusStats[statName] || 0) : 0;
       return val + bonus;
   };
   ```

3. **Update `gainXp` logic:**
   ```javascript
   window.gainXp = function(creature, amount) {
       creature.xp = (creature.xp || 0) + amount;
       let leveledUp = false;
       while (creature.xp >= window.getXpRequirement(creature.level || 1)) {
           creature.xp -= window.getXpRequirement(creature.level || 1);
           creature.level = (creature.level || 1) + 1;
           leveledUp = true;

           if (!creature.bonusStats) {
               creature.bonusStats = { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 };
           }
           if (!creature.lastLeveledStats) {
               creature.lastLeveledStats = [];
           }

           let allStats = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'];

           if (creature.level % 10 === 0) {
               allStats.forEach(s => creature.bonusStats[s] += 2);
               creature.growthSpurtThisLevel = true;
               creature.lastLeveledStats = []; // Reset restrictions after growth spurt
           } else {
               let avail = allStats.filter(s => !creature.lastLeveledStats.includes(s));
               if (avail.length < 2) avail = allStats;

               let p1 = avail.splice(Math.floor(Math.random() * avail.length), 1)[0];
               let p2 = avail.splice(Math.floor(Math.random() * avail.length), 1)[0];

               creature.bonusStats[p1] += 2;
               creature.bonusStats[p2] += 2;
               creature.lastLeveledStats = [p1, p2];
           }
       }
       return leveledUp;
   };
   ```

4. **Update `endBattle` logic to display the special notification:**
   Modify the UI block for `leveledUp`:
   ```javascript
   if (leveledUp) {
       document.getElementById('levelUpTitle').innerText = `${collectedCreatures[0].nickname || collectedCreatures[0].name} reached Level ${collectedCreatures[0].level}!`;
       let statsHtml = '';

       if (collectedCreatures[0].growthSpurtThisLevel) {
           statsHtml += `<div style="color: #ffeb3b; font-weight: bold; margin-bottom: 15px; font-size: 1.1em;">✨ Growth Spurt! All stats increased! ✨</div>`;
           collectedCreatures[0].growthSpurtThisLevel = false;
       }

       const statColors = {health: '#4caf50', attack: '#ff9800', defense: '#9c27b0', speed: '#ffeb3b', specialAttack: '#00bcd4', specialDefense: '#e91e63'};
   ...
   ```

5. **Complete pre commit steps**
   Ensure proper testing, verification, review, and reflection are done.

6. **Submit.**
   Commit and request review.
