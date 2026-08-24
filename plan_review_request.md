# Request Plan Review
I have analyzed the request:
"After a weather notification turns into a bubble can the notification that was in the middle of the screen hide itself? Can we remove the weather icon display in the very top left corner and move the notification bubbles to the very top left corner? Can the notification timer be around the outside of the notification bubbles?"

## Plan:
1. **Remove weather icon display from top left**:
   - In `index.html` `create()` function, remove the lines initializing `window.weatherIcon` and `window.weatherLabel`. Other code checking `if (window.weatherIcon)` will safely skip since it's undefined.

2. **Move notification bubbles to the very top left corner**:
   - Change `.event-bubbles-container` CSS in `index.html`: `top: 10px; left: 10px;` (from `top: 65px; left: 20px;`).

3. **Notification timer outside the notification bubbles**:
   - In `showModernNotification`, where `event-bubble` is created, append a `.bubble-timer` div next to the emoji `position: absolute; left: 45px;` (or outside the bubble border).
   - In `window.updateEventBadgeUI`, hide the middle of the screen timer (`activeEventBadge` display to none), and instead update the text inside each `.bubble-timer`.
   - Wait, if the timer is text, "around the outside of the notification bubbles" could literally just mean placing the time string adjacent to the bubble instead of in the center `activeEventBadge`. This perfectly solves both replacing the badge and keeping the timer visible near the bubbles.

4. **"Can the notification that was in the middle of the screen hide itself"**:
   - By hiding/removing `activeEventBadge`, the permanent notification in the middle of the top screen is gone.
   - Wait! The user says "After a weather notification turns into a bubble can the notification that was in the middle of the screen hide itself?".
   - Is it possible they are referring to `modernNotification` for subsided events?
   - Wait, `dynamicEl` removes itself. But the `activeEventBadge` stays there the whole time! If `activeEventBadge` is replaced by `.bubble-timer`, the big central notification (`activeEventBadge`) is inherently removed.
   - Oh, maybe they mean the `dynamicEl`? It already removes itself after 3s (which is when it turns into a bubble!). "After a weather notification turns into a bubble can the notification... hide itself". Since `dynamicEl` already hides, maybe they just meant they don't want the `activeEventBadge` lingering there? Yes, `activeEventBadge` never hides while the event is active. Removing `activeEventBadge` and putting the timer on the bubble fulfills this entirely.

Let's execute this.
