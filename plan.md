1. **Change Tutorial State Machine Logic:**
   - Modify `processMenuTutorial` in `index.html`.
   - Update Step 2: Request the user click on a **Creature Sprite** to view the full details/large portrait. Track if `fullSizeImageModal` / `fullSizeImageModal_p2` is open to progress to Step 3.
   - Update Step 3: Request the user to switch to the **Creature Stats Tab**. Track if `isStatsTabOpen` is true to progress to Step 4.
   - Update Step 4: Request user to close Party (since they are now on Stats Tab, or large modal, logic will adjust).
   - We will need to make sure we accurately detect which part they are on. Currently:
     - menuStep 0: Start -> Menu (saves 1)
     - menuStep 1: Menu -> Party (saves 2)
     - menuStep 2 (NEW): Party -> Click Sprite (largeCreatureOpen) (saves 3)
     - menuStep 3 (NEW): Sprite open -> Stats Tab (isStatsTabOpen) (saves 4)
     - wait, if Sprite is open, it blocks clicking the Stats tab. They have to close the Sprite first.
     - So Step 2: "Click a Creature Sprite". (Save 3 when large creature opens).
     - Step 3: (Wait, if they close it, do we go back to step 2? We can just say "Awesome! Close the preview, then switch to the Creature Stats Tab.")
     - Let's make Step 3: "Awesome! Now close the preview and switch to the Creature Stats Tab".
       - Condition to go to 4: `isStatsTabOpen` and `!largeCreatureOpen`.
     - Step 4: "Here are your detailed stats! Now Close your Party."
       - Condition to go to 5: `!isPartyOpen`.

2. **Refine Device Context in Tutorial:**
   - Create local helper inside `processMenuTutorial` to determine the controls to show based on device.
     - `const isTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window);`
     - `const isGamepad = (navigator.getGamepads && Array.from(navigator.getGamepads()).some(gp => gp !== null));`
     - Text for touch: `Open your Menu by tapping the on-screen menu button.`
     - Text for gamepad: `Open your Menu by pressing Start / Options.`
     - Text for PC/keyboard: `Open your Menu by pressing ESC or M.`
   - Ensure the introductory text in `menuStep === 0` uses this dynamically.

3. **Make Tutorial Box More Noticeable:**
   - Update `#tutorialBox` CSS styles.
   - Change border to `3px solid #00ffcc`.
   - Add a brighter background or strong `box-shadow` to make it stand out.
   - Example: `box-shadow: 0 0 30px rgba(0, 255, 204, 0.8), inset 0 0 15px rgba(0, 255, 204, 0.4);`
   - Increase text size from `16px` to `18px`.

4. **Pre-commit Checks**
   - Run verification, test code changes in Playwright, verify manually.
