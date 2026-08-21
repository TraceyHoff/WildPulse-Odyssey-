To solve this, we will add support for tiered items and modify the game to respect their tier levels for effects, sell prices, and UI representation.

1. **Utility Functions (Global Scope):**
   Add `window.getBaseItemName(name)` and `window.getItemTier(name)` to extract the base name and the tier.
   A tiered item will have ` (Tier X)` appended to its name, for example: `"Healing Juice Bottle (Tier 3)"`.

2. **Modifying `generateProceduralQuest` (Quests Reward):**
   When pulling an item from `itemsPool`, randomly roll for a tier (e.g., Tier 1-5).
   If Tier > 1, append `(Tier X)` to `rewardItem`. The prompt says: "can only be acquired as a quest reward". So they only come from here. Furniture will be ignored.

3. **Modifying Item Usage (`window.useInventoryItem`):**
   Extract the `baseName` and `tier` for the selected item.
   Use the `baseName` in the `if/else if` blocks.
   Multiply effects by the `tier`. E.g., Repellent time: `60000 * tier`. HP Booster amount: `10 * tier`. Healing Juice Bottle: `0.5 + (0.1 * tier)`. Update notifications to reflect the scaled values.

4. **Modifying Icons (`window.getItemIconHTML`):**
   Extract the `baseName` and `tier`.
   Use the `baseName` for the switch statement.
   Adjust colors based on the tier.
   - Tier 1: Original color.
   - Tier 2: `#00ff66` (Green / Uncommon)
   - Tier 3: `#0066ff` (Blue / Rare)
   - Tier 4: `#ff00ff` (Purple / Epic)
   - Tier 5: `#ffd700` (Gold / Legendary)
   Update the `glowColor`, `baseColor`, and stroke colors inside the SVG templates dynamically where possible. If a specific color is hardcoded (like `#00ffd2`), replace it with the dynamic `glowColor`.

5. **Modifying Store / Selling (`window.renderStoreUI`, `window.sellStoreItem`):**
   In `renderStoreUI`, the list of items to sell currently only shows items from the `items` array. Since the player might have tiered items, we need a way to sell them.
   Currently, the UI shows a "Sell" button right next to the "Buy" button for each store item, driven by `ownedCount > 0`.
   We will update `ownedCount` and the "Sell" button logic. Since there's one row per base item, we can make the "Sell" button sell the HIGHEST tier of that item the player owns, or we can iterate through all matching base items in the inventory and show multiple "Sell" buttons or just aggregate them.
   Actually, it's simpler to append any tiered items the player owns into the `displayedItems` list at the end so they get their own row in the store, or modify `renderStoreUI` to include player inventory items that are variants of the store items.
   Let's just inject the player's tiered items into the `activeItems` list before rendering, so they appear in the store! Then they can be sold normally.
   - For `activeItems`, append items from the player's inventory that have a tier > 1, setting their `name` to the tiered name, `price` to `basePrice * tier * 2` (so `sellPrice = Math.floor(basePrice * tier * 2 * 0.55)` or we can just adjust `item.price = baseItem.price * tier`).
   - The store will show them as "Too Expensive" to buy (or we can just set stock to 0 so they can't be bought, only sold). "Sold Out" works well.

6. **Pre-commit Instructions:**
   Execute pre-commit instructions before submitting.
