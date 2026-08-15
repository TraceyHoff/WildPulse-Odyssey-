const p1InsideX = 582 * 100 + 50;
const p1InsideY = 582 * 100 + 50;

console.log("P1 Start: ", p1InsideX, p1InsideY);

// For player 2, we want them out of view of player 1.
// They're 10 cols apart right now: 592 - 582 = 10 cols = 1000px.
// A typical game screen is maybe 800-1200px wide, maybe more?
// We should probably move player 2 much further away just to be safe.
// Say, row 560 for Player 2, or col 550? Or col 592 can go to 650? But max is 600?
// WORLD_SIZE is 60000. So cols = 60000 / 100 = 600.
// Maximum valid index is 599.
// Player 1 room: Walkable 5x5 at row 580 to 584, col 580 to 584
// Player 2 room: Walkable 5x5 at row 580 to 584, col 590 to 594

// Let's move Player 2's room to row 570 to 574? Or 560 to 564?
