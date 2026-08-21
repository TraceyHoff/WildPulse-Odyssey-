1. **Add new item icons for the tiered stat boosters in `itemIcons` dictionaries**
   - Locate the two `itemIcons` objects in `index.html`.
   - Add mappings for "Uncommon/Rare/Exquisite HP/Attack/Defense/Speed/Sp. Atk/Sp. Def Booster" using the same emojis as the base stat boosters (e.g., `Uncommon HP Booster: "💚"`).
2. **Update the procedural quest item generation pool in `window.generateProceduralQuest`**
   - Locate `window.generateProceduralQuest`.
   - Update `rewardItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];` to selectively return tiered boosters when "Stat Boosters" is selected from `itemsPool`, using weighted random chances (e.g., 50% base, 30% uncommon, 15% rare, 5% exquisite).
3. **Update item consumption logic for tiered boosters in `consumeItem` block of `useItem`**
   - The current code checks `item.name === "HP Booster"`, etc. Change this to check `.includes("HP Booster")`.
   - Make the boost amount scale based on the prefix: Base = 5 (HP=10), Uncommon = 10 (HP=20), Rare = 15 (HP=30), Exquisite = 25 (HP=50). Use `item.name.startsWith("Uncommon")`, etc., to calculate this dynamically.
4. **Update `window.getItemIconHTML` for tiered styling**
   - Ensure the new tiered boosters correctly generate SVG icons. The `if (itemName.includes("Booster"))` block handles this, but its theme color assignments use `.startsWith`. Change these to `.includes` to handle the new prefixes.
   - Inject dynamic `strokeColor` and `baseColor` logic based on rarity prefix (e.g., Uncommon=cyan, Rare=magenta, Exquisite=gold).
   - Ensure the `switch(itemName)` cases handle the new prefixed names using fallthrough cases or checking by suffix.
5. **Update Store Sell Prices for unpurchasable items**
   - Since tiered boosters are not sold in the store (meaning `item.price` is undefined), update the store's sell price calculation in `window.updateStoreUI` and `window.getItemSellPrice` (if added/used) to assign static fallback values for them (e.g., Uncommon=150, Rare=300, Exquisite=500).
6. **Execute Pre-commit Steps**
   - Ensure proper testing, verification, review, and reflection are done by calling the `pre_commit_instructions` tool.
7. **Submit the changes**
   - Submit the changes using the provided tool.
