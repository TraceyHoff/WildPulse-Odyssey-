Currently, the player and creatures share the exact same XP requirement curve (`window.getXpRequirement`). This causes the player to quickly outpace their party's level, since the player earns full XP for every battle while the party members only receive it individually or share it via ExPALL.

To balance this:
1.  **Define `window.getPlayerXpRequirement`**: Create a new function that increases the player's XP curve to be roughly 3x steeper than a creature's, or scales differently.
2.  **Update Player Leveling Logic**: Modify `window.gainPlayerXp` to use `window.getPlayerXpRequirement(window.p1Level)` and `window.getPlayerXpRequirement(window.p2Level)` instead of `window.getXpRequirement`.
3.  **Update Player UI**: If there are any UI elements showing player XP progress (like bars), update those to use `getPlayerXpRequirement`. Wait, is there player XP shown on the UI? Let's check `index.html` for `window.p1Xp` and `window.p2Xp`.

Let's check if player XP is rendered anywhere:
The player XP is NOT shown on the UI (no progress bar), just `window.p1Level` is shown in `updatePlayerLabels`.
So we just need to change the requirement function for players!

Let's propose:
```javascript
window.getPlayerXpRequirement = function(level) {
    const step = Math.floor((level - 1) / 2);
    // Base 75 -> 225, step 25 -> 75 (3x multiplier)
    const req = (75 + step * 25) * 3;
    return Math.min(req, 3000); // 3x the max of 1000
};
```

Let's check if the user likes this.
