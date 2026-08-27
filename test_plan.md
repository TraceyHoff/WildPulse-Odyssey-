1. We need to add items that players can use against other players in battle for a tactical advantage in the shop.
2. I will add 3 tactical PvP items in `window.getItemSellPrice` and `window.updateStoreUI` in `index.html`:
   - "Stun Grenade" (Price 400): Skips the opponent's next turn.
   - "Smoke Bomb" (Price 400): Decreases opponent's accuracy.
   - "Adrenaline Shot" (Price 400): Increases your attack for 3 turns.
3. Update `window.getItemIconHTML` to return unique SVG icons for these 3 items.
4. Update the Battle UI to include a new "Item" button in `battleControls` and `battleControls_p2`. I'll add `<button class="btn-item">Item</button>`.
5. I'll need a way for the player to select an item from their inventory. When the "Item" button is clicked, it should open a mini modal overlay on the battle screen listing available consumable battle items. Selecting one will execute the item use.
6. Alternatively, to keep it simple, I'll just use the existing `doPlayerAction` and add a new action type like `item:item_name`, and map the battle item button to trigger an item selection modal.

Wait, the instructions say "Can we add a variety of different types of items that players can use against other players to gain a tactical advantage in battles for sale in the shop each with its own highly detailed visually unique svg icon and can these items be sold for 400 coins?".
The requested sell price might be 400 coins. If they are sold *for* 400 coins, does it mean the sell price is 400 or the buy price is 400? The user said "sold for 400 coins", which usually means `price: 400` in the shop (buy price).

Is there any existing item that affects PvP battles?
