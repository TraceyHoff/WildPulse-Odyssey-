1. **Fix Tutorial Order (Creature Sprite -> Creature Stats Tab)**
   - In `index.html`, modify `processMenuTutorial` logic.
   - Currently, it asks the user to switch to the "Stats Tab" (Step 2) and then click on a "Creature Sprite" (Step 3).
   - Change Step 2 to ask the user to click on a "Creature Sprite".
   - Change Step 3 to ask the user to switch to the "Creature Stats Tab".
   - Update string references from "Stats Tab" to "Creature Stats Tab".
   - Update the step tracking logic to ensure state progresses correctly (e.g., `largeCreatureOpen` before `isStatsTabOpen`).

2. **Make Tutorial Box More Noticeable**
   - In the CSS for `#tutorialBox` (around line 2674), adjust styles to make it pop more.
   - Increase `border-width` slightly, make background slightly more opaque or change colors. Increase `box-shadow`, font size, or animation intensity.

3. **Contextual Controls in Tutorial**
   - The user requested that the tutorial display only the controls relevant to the player's current device (Touch, PC/M&K, or Gamepad).
   - We will utilize `window.hasTouchControls()`, `window.isGamepadConnected()`, or similar checks from `index.html`.
   - Update `state.menuStep === 0` tutorial text to show specific text based on device.
   - We will need to check the exact variable name to determine if the player is using gamepad, touch, or keyboard. Based on earlier searches, there is a `const isTouch` and `const isGamepad` check inside an `isMobile` check, but no global state. Wait, is there a global state? Let's check `lastInputDevice` or similar. If not, I can calculate `isTouch` and `isGamepad` inline or store them globally when checking. Let me inspect how the game tracks input.
