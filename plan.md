1. **Gamepad Reconnection Issue**:
   - The issue where gamepad controls stop working after turning off and on is because Phaser 3 `GamepadPlugin` handles connections, but `index.html` hardcodes `getPad(0)` and `getPad(1)`. When a gamepad reconnects, its native index might increment (e.g. it becomes pad 1 or 2 instead of 0).
   - Solution: In all 4 places where `this.input.gamepad && this.input.gamepad.total > 0` is checked in the update loop (lines 37368, 38839, 39011, 39206), replace the specific `getPad(0)` and `getPad(1)` logic with:
     ```javascript
     const activePads = this.input.gamepad.getAll();
     ```
     And then assign `p1Pad = activePads[0]` and `p2Pad = activePads[1]` instead of relying on the specific hardcoded indexes.

     Example substitution block:
     ```javascript
<<<<<<< SEARCH
        if (this.input.gamepad.total > 1) {
            p1Pad = this.input.gamepad.getPad(0);
        } else if (this.input.gamepad.total === 1) {
            if (p2KeyboardActive || !p1KeyboardActive) {
                p1Pad = this.input.gamepad.getPad(0);
            }
        }

        let p2Pad = null;
        if (window.coopActive) {
            if (this.input.gamepad.total > 1) {
                p2Pad = this.input.gamepad.getPad(1);
            } else if (this.input.gamepad.total === 1 && p1KeyboardActive) {
                p2Pad = this.input.gamepad.getPad(0);
            }
        }
=======
        const activePads = this.input.gamepad.getAll();
        if (activePads.length > 1) {
            p1Pad = activePads[0];
        } else if (activePads.length === 1) {
            if (p2KeyboardActive || !p1KeyboardActive) {
                p1Pad = activePads[0];
            }
        }

        let p2Pad = null;
        if (window.coopActive) {
            if (activePads.length > 1) {
                p2Pad = activePads[1];
            } else if (activePads.length === 1 && p1KeyboardActive) {
                p2Pad = activePads[0];
            }
        }
>>>>>>> REPLACE
     ```
     (Note: Need to adapt this block for all 4 instances, as some have slightly different formatting/variables like the ones in the movement logic).

2. **Furniture Preview Color & Error Notification**:
   - Update `window.isValidMiniTileLocation` to return an object: `{ valid: boolean, reason: string }` instead of a boolean.
   - Adjust `tryPlaceMiniTile` to check `.valid` and display `.reason`.
   - Create a new function `window.updateMiniTilePreviewVisuals(playerNum)` that:
     1. Creates a floating text label (`p1MiniTilePreviewText`) if it doesn't exist, above the sprite.
     2. Checks `isValidMiniTileLocation`.
     3. If valid, `sprite.clearTint()` and `text.setVisible(false)`.
     4. If invalid, `sprite.setTint(0xff0000)` and `text.setText(reason).setVisible(true).setPosition(sprite.x, sprite.y - (sprite.displayHeight/2) - 10)`.
   - Call `window.updateMiniTilePreviewVisuals(1)` and `(2)` inside `updateFurnitureDetails()` or at the end of the `update()` loop if the respective preview sprite exists and is visible.
   - Clean up the text object inside `window.cancelMiniTilePlacement(playerNum)` and `tryPlaceMiniTile`.

