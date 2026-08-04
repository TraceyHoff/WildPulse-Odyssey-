# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/favoriteAndScroll.spec.js >> Favorite and Gamepad Scrolling Systems >> right stick vertical analog input should scroll description in party modal
- Location: tests/favoriteAndScroll.spec.js:116:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: null
```

# Page snapshot

```yaml
- generic:
  - button "Menu" [ref=e3] [cursor=pointer]
  - generic [ref=e4]:
    - button "Close Party" [ref=e5] [cursor=pointer]: X
    - generic [ref=e7]:
      - heading "Player 1 Party" [level=2] [ref=e8]
      - generic [ref=e9]:
        - heading "Party" [level=3] [ref=e10] [cursor=pointer]
        - heading "Stats" [level=3] [ref=e11] [cursor=pointer]
      - generic [ref=e13]:
        - heading "Active Party (1/6)" [level=3] [ref=e14]
        - generic [active] [ref=e15]:
          - generic [ref=e16]:
            - heading "Phoenix Save ♂ 🤍 Fire" [level=3] [ref=e17]:
              - generic [ref=e18]:
                - textbox "Creature Name" [ref=e19]: Phoenix
                - button "Save" [ref=e20] [cursor=pointer]
                - generic "Male" [ref=e21]: ♂
              - generic [ref=e22]:
                - button "🤍" [ref=e23] [cursor=pointer]
                - generic [ref=e24]: Fire
            - paragraph [ref=e25]:
              - strong [ref=e26]: Level 5
              - text: "(Gen 1) | XP: 0 / 2500 | Friend Lvl 1 (XP: 0/100)"
            - generic [ref=e27]:
              - generic [ref=e28]: "Happiness:"
              - generic [ref=e31]: 50/100
            - paragraph [ref=e36]: "Ability: None"
          - generic [ref=e37]:
            - button "Move Up" [ref=e38] [cursor=pointer]: ▲
            - button "Move Down" [ref=e39] [cursor=pointer]: ▼
            - button "Store" [ref=e40] [cursor=pointer]
            - button "Release" [ref=e41] [cursor=pointer]
    - button "Close" [ref=e42] [cursor=pointer]
```

# Test source

```ts
  49  |
  50  |     // Toggle favorite off first creature
  51  |     await favoriteButtons.nth(0).click();
  52  |     await expect(favoriteButtons.nth(0)).toHaveText('🤍');
  53  |
  54  |     // Toggle favorite on first 3 creatures
  55  |     await favoriteButtons.nth(0).click();
  56  |     await favoriteButtons.nth(1).click();
  57  |     await favoriteButtons.nth(2).click();
  58  |
  59  |     await expect(favoriteButtons.nth(0)).toHaveText('❤️');
  60  |     await expect(favoriteButtons.nth(1)).toHaveText('❤️');
  61  |     await expect(favoriteButtons.nth(2)).toHaveText('❤️');
  62  |
  63  |     // Try to favorite 4th creature
  64  |     await favoriteButtons.nth(3).click();
  65  |     // Should still be white heart because max limit is 3
  66  |     await expect(favoriteButtons.nth(3)).toHaveText('🤍');
  67  |
  68  |     // Verify notification text
  69  |     const notificationText = await page.locator('#modernNotification').innerText();
  70  |     expect(notificationText).toContain('You can only have up to 3 favorited creatures');
  71  |   });
  72  |
  73  |   test('favorited creatures should gain half XP when not in battle', async ({ page }) => {
  74  |     // 1. Set up collected creatures, one favorited
  75  |     await page.evaluate(() => {
  76  |         window.collectedCreatures = [
  77  |             { id: "test_c1", name: "Phoenix", level: 5, currentHp: 50, xp: 10, stats: { health: 100 }, generation: 1, type: "Fire", description: "Fire" },
  78  |             { id: "test_c2", name: "Aquaweaver", level: 5, currentHp: 50, xp: 10, stats: { health: 100 }, generation: 1, type: "Water", description: "Water", favorited: true }
  79  |         ];
  80  |         localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
  81  |         if (window.renderPartyList) window.renderPartyList();
  82  |     });
  83  |
  84  |     // 2. Simulate winning a battle
  85  |     await page.evaluate(() => {
  86  |         // Mock current player and current enemy
  87  |         window.currentPlayer = { id: "test_c1", currentHp: 50 };
  88  |         window.currentEnemy = { id: "enemy_1", level: 5, name: "Meteorhorn" };
  89  |         window.activeBattlePlayer = 1;
  90  |         window.inBattle = true;
  91  |
  92  |         // Trigger win
  93  |         if (window.endBattle) {
  94  |             window.endBattle('win');
  95  |         }
  96  |     });
  97  |
  98  |     // Wait for the endBattle timeout (1500ms in codebase) to complete and distribute XP
  99  |     await page.waitForTimeout(2000);
  100 |
  101 |     // 3. Verify XP gains
  102 |     const creatures = await page.evaluate(() => {
  103 |         return window.collectedCreatures;
  104 |     });
  105 |
  106 |     const activeCombatant = creatures.find(c => c.id === 'test_c1');
  107 |     const favoritedIdle = creatures.find(c => c.id === 'test_c2');
  108 |
  109 |     // xpGained = Math.floor(currentEnemy.level * 25) = 5 * 25 = 125
  110 |     // activeCombatant should gain 125 XP (initial 10 + 125 = 135)
  111 |     // favoritedIdle should gain half XP (Math.floor(125 / 2) = 62 XP) (initial 10 + 62 = 72 XP)
  112 |     expect(activeCombatant.xp).toBeGreaterThan(10);
  113 |     expect(favoritedIdle.xp).toBe(72);
  114 |   });
  115 |
  116 |   test('right stick vertical analog input should scroll description in party modal', async ({ page }) => {
  117 |     // 1. Set up a creature with a very long description to ensure scrollability
  118 |     await page.evaluate(() => {
  119 |         window.collectedCreatures = [
  120 |             { id: "test_c1", name: "Phoenix", level: 5, currentHp: 50, stats: { health: 100 }, generation: 1, type: "Fire", description: "This is a very long description. Phoenix is a legendary bird of fire that rises from its ashes. It has glowing golden feathers, beautiful blazing wings, a long trailing tail of sparks, and powerful flaming talons. It is incredibly swift and powerful, filling the room with intense heat and majestic light." }
  121 |         ];
  122 |         localStorage.setItem('wildpulse_collected_creatures', JSON.stringify(window.collectedCreatures));
  123 |         if (window.renderPartyList) window.renderPartyList();
  124 |     });
  125 |
  126 |     // Open Party Modal
  127 |     await page.evaluate(() => {
  128 |         if (window.openPartyModal) window.openPartyModal();
  129 |     });
  130 |
  131 |     const partyModal = page.locator('#partyModal');
  132 |     await expect(partyModal).toBeVisible();
  133 |
  134 |     // 2. Focus on the party card or any navigable element inside it
  135 |     await page.evaluate(() => {
  136 |         const card = document.querySelector('.party-card');
  137 |         if (card) {
  138 |             card.focus();
  139 |             // Mock gamepad-focused class
  140 |             card.classList.add('gamepad-focused-p1');
  141 |         }
  142 |     });
  143 |
  144 |     // Get initial scrollTop of description text
  145 |     const initialScrollTop = await page.evaluate(() => {
  146 |         const descText = document.querySelector('.creature-desc-text');
  147 |         return descText ? descText.scrollTop : null;
  148 |     });
> 149 |     expect(initialScrollTop).toBe(0);
      |                              ^ Error: expect(received).toBe(expected) // Object.is equality
  150 |
  151 |     // 3. Simulate processGamepadInputForPlayer with right stick vertical axis movement
  152 |     await page.evaluate(() => {
  153 |         const mockPad = {
  154 |             rightStick: { y: 1.0 },
  155 |             buttons: Array(16).fill({ pressed: false })
  156 |         };
  157 |         if (window.processGamepadInputForPlayer) {
  158 |             window.processGamepadInputForPlayer(1, mockPad);
  159 |         }
  160 |     });
  161 |
  162 |     // Get new scrollTop of description text after right stick input simulation
  163 |     const updatedScrollTop = await page.evaluate(() => {
  164 |         const descText = document.querySelector('.creature-desc-text');
  165 |         return descText ? descText.scrollTop : null;
  166 |     });
  167 |
  168 |     // ScrollTop should increase
  169 |     expect(updatedScrollTop).toBeGreaterThan(0);
  170 |   });
  171 | });
  172 |
```