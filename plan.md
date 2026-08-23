1. **HTML & CSS Updates**:
   - In `index.html`, add `<div id="eventBubblesContainer" class="event-bubbles-container"></div>` just below `<div id="modernNotification_p2" class="notification-popup"></div>`.
   - Add CSS for `.event-bubbles-container` and `.event-bubble` in the `<style>` block.

2. **Refactor `window.showModernNotification`**:
   - First, check if `isWeatherOrEventNotification` is true.
   - If it is a "subsided" notification (`lowerTextForTop.includes('subsided')`), handle clearing the appropriate bubbles:
     - `atmospheric event has subsided` clears random event bubbles.
     - `weather event has subsided` clears weather pattern bubbles (Rain, Thunderstorm, Flash Freeze).
     - Then, show the "subsided" message using the standard `#modernNotification` logic so it displays centrally and fades out.
   - If it is a NEW weather/event notification:
     - Determine its source (`weatherPattern` vs `randomEvent`) based on the text.
     - Determine its emoji and a short label or just use the emoji.
     - Dynamically create a full notification element (`div.notification-popup.dynamic-event-notification`).
     - Set its `innerHTML`, `style` (border color, box shadow, `top: 150px`, `left: 50%` or depending on player, though events are usually global, we'll just put it at 50% for P1 and optionally create one for P2 if needed, but since it shrinks to the left, maybe just one is enough? The prompt doesn't specify splitscreen behavior for bubbles, I'll put it at 50% initially). Wait, the existing code creates a central one AND a P2 one if `playerNum === 2`. Event notifications usually have `playerNum = null` which defaults to `1` (or active player). The current code puts it at `150px` top and `left: 50%`. If `coopActive`, maybe 25% and 75%. Let's just follow the existing positioning logic for the dynamic full element.
     - After `duration` (3000ms by default):
       - Fade out the dynamic full notification element and remove it from the DOM.
       - Create a new `div.event-bubble` and append it to `#eventBubblesContainer`.
       - Assign it `dataset.source` so it can be cleared later.
     - Skip the rest of the standard `showModernNotification` logic for these specific new event notifications by using `return;`

This strategy perfectly supports simultaneous events because each new event notification is a dynamically created element that fades into its own bubble in a flex container.

Wait, if multiple dynamic full notifications trigger at the EXACT same time, they will overlap at `top: 150px`.
To fix overlap, we can offset `top` based on how many `.dynamic-event-notification` are currently on screen.
`const activeDynamic = document.querySelectorAll('.dynamic-event-notification').length;`
`el.style.top = (150 + activeDynamic * 80) + 'px';`

Let's test this logic!
