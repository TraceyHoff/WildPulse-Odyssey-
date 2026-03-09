1. **Redesign Modals and CSS**:
   - Add a `.modal` class to all window divs (`#lobbyModal`, `#battleModal`, etc.).
   - Update the CSS to use a `.modal` class with `max-width: 600px`, `max-height: 90vh`, tighter padding (`15px`), sleek glowing borders, glassmorphism (`backdrop-filter`), and rounded corners (`border-radius: 12px`).
   - Remove the old `100vw !important` override so they can be actual modals again, or adjust it so they are responsive but compact.
   - Update `.close-btn` to be `top: 0; right: 0; margin: 0; padding: 0; border-radius: 0 12px 0 8px;` so it hugs the corner tightly with no extra space.
   - Restyle all buttons with vibrant colors, hover states, and tight padding.

2. **Wild Spawn Level 1 at Start**:
   - In `spawnCreature()`, calculate the max player level. If `maxPlayerLevel === 1` (which is true at the very start of a new game), set all spawned creatures' levels to exactly 1. Otherwise, use the existing scaling logic.

3. **Increase Spawn Frequency**:
   - In `create()`, increase the initial spawn count multiplier from `1.5` to `3.0`.
   - In `spawnCreature()`, increase the hard cap on `creaturesGroup.getChildren().length` from `100` to `200`.

4. **Add Tooltips Everywhere**:
   - Inject a hidden `#tooltip` div into the DOM via JS or HTML.
   - Add `mousemove`/`mouseover`/`mouseout` event listeners to update and position the tooltip based on `data-tooltip` attributes.
   - Add `data-tooltip` to buttons in the Menu, Battle, and Party windows.
   - Add `data-tooltip` to stats, natures, and other UI elements dynamically rendered in `renderPartyList()`.
   - Ensure tooltips have a clean, modern aesthetic that fits the game.

5. **Tighten Padding & Spacing**:
   - Reduce padding on `.party-card`, `.combatant`, and other containers.
   - Ensure `overflow-y: auto;` on elements that might grow.
   - Use flex/grid with small gaps (`gap: 8px`).

6. **Pre-commit checks**:
   - Run `pre_commit_instructions` to test, lint, and verify.

7. **Submit**:
   - Commit and submit changes on branch `multiplayer-upgrade-YYYYMMDD-ui-refresh`.
