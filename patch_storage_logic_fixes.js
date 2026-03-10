const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The retrieve logic I wrote had a bug where activePartyCount was always 6 if collectedCreatures.length > 6.
// Also, retrieve should just insert the creature to index 6, moving everything up, OR we can just swap it.
// Actually, if we use indices 0-5 as party, the party is full if there are 6 or more creatures in the array.
// If the array has >= 6 items, we cannot retrieve without storing first.
// If the array has < 6 items, there are no items in storage (index 6+), so retrieve is impossible.
// BUT wait, if we store a creature, it gets moved to the END of the array.
// For example, if we have 6 creatures: [0, 1, 2, 3, 4, 5]. Storage is empty.
// If we store creature at index 0, it becomes: [1, 2, 3, 4, 5, 0].
// Now active party is 5 creatures: [1, 2, 3, 4, 5]. Storage has 1: [0].
// If we retrieve from storage, we can take it and put it back into the active party (at index 5).

// Let's rewrite `storeCreature` and `retrieveCreature` using this logic.
const oldLogic = `window.storeCreature = function(index) {
    if (index < 0 || index >= Math.min(6, collectedCreatures.length)) return;
    if (collectedCreatures.length <= 1) {
        alert("You cannot store your last creature!");
        return;
    }
    const creature = collectedCreatures.splice(index, 1)[0];
    collectedCreatures.push(creature);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderPartyList();
};

window.retrieveCreature = function(index) {
    if (index < 6 || index >= collectedCreatures.length) return;
    if (collectedCreatures.length <= 6) {
        // Technically impossible, but just in case
        return;
    }

    const activePartyCount = Math.min(6, collectedCreatures.length - (collectedCreatures.length - 6));

    if (activePartyCount >= 6) {
        alert("Your party is full! Store a creature first.");
        return;
    }

    const creature = collectedCreatures.splice(index, 1)[0];
    // Since active party has less than 6, we can just insert it at the end of the active party
    collectedCreatures.splice(activePartyCount, 0, creature);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderStorageList();
};`;

const newLogic = `window.storeCreature = function(index) {
    if (index < 0 || index >= Math.min(6, collectedCreatures.length)) return;
    if (Math.min(6, collectedCreatures.length) <= 1) {
        alert("You cannot store your last active party creature!");
        return;
    }
    const creature = collectedCreatures.splice(index, 1)[0];
    collectedCreatures.push(creature);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderPartyList();
};

window.retrieveCreature = function(index) {
    if (index < 6 || index >= collectedCreatures.length) return;

    // We can only have a max of 6 creatures in the active party.
    // If the storage exists, collectedCreatures.length > 6.
    // However, if we've removed items from the active party, we might have empty slots.
    // Actually, because of how slice(0, 6) works, the first 6 are ALWAYS the active party.
    // If we have 7 creatures, [0..5] are active, [6] is storage.
    // If we store one, [0..4] are active, [5..6] are storage! Wait, no!
    // If we push to the end, and we have 7 creatures, slice(0, 6) will just grab the first 6!
    // This is a subtle flaw: The array is just ordered list.
    // If we have 7 items: [A, B, C, D, E, F, G]. Party is A..F. Storage is G.
    // If we store A, we splice it and push it: [B, C, D, E, F, G, A].
    // Now party is B..G! The storage item G just got pulled into the party!
    // This is because we use indices 0..5 as the definition of the party.

    // The requirement explicitly stated:
    // "In index.html, modify collectedCreatures logic to assign a .stored = false/true property to correctly distinguish party from storage instead of just relying on the first 6 indices."

    // Ah, the user instruction wants us to add a ".stored" property to creatures!
    // Okay, we need to completely overhaul this to use a .stored property.
};`;

// We need to revert what we did and implement the .stored property correctly.
