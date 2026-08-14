1. **Understand the problem**: Pressing 'B' on a gamepad should close the quest modal, just like it closes other modals.
2. **Examine the code**:
   - `handleGamepadInput` checks `justB` and when it is true, it processes the modal closure. If it's not a confirmation or creature select modal, it calls `window.closeAllModalsForPlayer(playerNum)`.
   - `window.closeAllModalsForPlayer` and `window.closeAllModals` maintain an explicit array of modal config objects (with `id` and `close` function callback).
   - Currently, `questModal_p1` and `questModal_p2` are missing from these arrays.
3. **Plan the changes**:
   - Update `window.closeAllModalsForPlayer` in `index.html`:
     - Add `{ id: 'questModal_p' + playerNum, close: (p) => { if (window.closeQuestModal) window.closeQuestModal(p); } }` to the `modals` array.
   - Update `window.closeAllModals` in `index.html`:
     - Add `{ id: 'questModal_p1', close: () => { if (window.closeQuestModal) window.closeQuestModal(1); } }` and `{ id: 'questModal_p2', close: () => { if (window.closeQuestModal) window.closeQuestModal(2); } }` to its `modals` array.
4. **Implementation details**:
   - Need to use `replace_with_git_merge_diff` on `index.html` for both functions.
