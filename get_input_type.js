const isTouch = (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
const isGamepad = (navigator.getGamepads && Array.from(navigator.getGamepads()).some(gp => gp !== null));
console.log("Touch: " + isTouch);
console.log("Gamepad: " + isGamepad);
