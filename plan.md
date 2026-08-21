1. **Add Utility Functions**:
   Add `window.getBaseItemName(itemName)` and `window.getItemRarityMultiplier(itemName)` to help parse strings like "Uncommon HP Booster" or "Rare Repellent".

2. **Update Quest Rewards Generation**:
   In `window.getQuestRewards()`, when returning an item from `itemsPool`, occasionally prepend a rarity like "Uncommon ", "Rare ", or "Exquisite ". Ensure furniture ignores this logic.

3. **Update Item Icon Rendering**:
   Everywhere `window.getItemIconHTML` or `itemIcons` are queried, make sure we use `window.getBaseItemName(item.name)` so the icons render correctly. The function `window.getItemIconHTML` itself should also parse the base name.

4. **Update Item Usage (`window.useInventoryItem`)**:
   - Extract `rarity` and multiplier before applying effects.
   - For healing, stats, buffs, multiply the values by the `rarityMultiplier` (e.g. 1.2, 1.5, 2.0).
   - Note: the prompt asks to make effects "slightly bigger". I'll use 1.25x for Uncommon, 1.5x for Rare, and 2.0x for Exquisite, applying `Math.ceil()` or `Math.floor()` depending on stat.

5. **Update Store Sell Prices (`window.updateStoreUI`)**:
   Instead of just showing the sell price for the base item in the main list, we need a way to sell the player's actual inventory items, including rarities.
   Actually, the simplest approach that seamlessly integrates with the existing UI is to iterate through the player's inventory *in addition* to the store items, and group them if needed, or simply render the inventory items that aren't in the store list separately so they can be sold.
   Or we can just update the `sellPrice` logic in `sellStoreItem` to take the actual inventory item's name. But wait, how do they click "Sell" for a Rare item if only the base item is listed in the store?
   The store currently lists `displayedItems` (which is hardcoded to base items), and adds a Sell button inline. If the player owns "Rare HP Booster" but the store only shows "HP Booster", the `ownedCount` check `invItem.name === item.name` won't match, so the player won't be able to sell the Rare version.
   To fix this, I will add a new "Inventory" tab or section inside the Store UI, or change the "Sell" button to a dropdown if they own multiple rarities.
   Wait, the store modal currently has tabs? "currentTab === 'home' ? homeItems : activeItems".
   Let's modify the loop in `updateStoreUI` to dynamically inject the player's owned items into the list of items being displayed if they are not already there.
   For example, if the player owns "Rare HP Booster", add it to a temporary `displayedItems` list in `updateStoreUI`, with `canBuy = false`, but showing the sell button.

6. **Pre-commit Checks & Submit**.
