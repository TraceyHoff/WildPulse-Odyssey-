# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/coinsReward.spec.js >> Coins Reward System >> should award 80 coins correctly in local PvP battles
- Location: tests/coinsReward.spec.js:119:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 82
Received: 80
```

# Page snapshot

```yaml
- generic [active]:
  - generic [ref=e3]:
    - heading "WildPulse Odyssey" [level=1] [ref=e4]
    - button "Single Player" [ref=e5] [cursor=pointer]
    - button "Split Screen" [ref=e6] [cursor=pointer]
    - button "Customize Character" [ref=e7] [cursor=pointer]
  - generic: 🎉 Player 1 leveled up to Level 2! 🎉
```

# Test source

```ts
  59  |         // Let's test a Level 150 wild creature win for P1 (should cap at 260)
  60  |         window.currentEnemy = { id: 'e3', level: 150, currentHp: 0, stats: { health: 100 } };
  61  |         window.endBattle('win');
  62  |         await new Promise(resolve => setTimeout(resolve, 1600));
  63  |         const coinsLvl150 = window.gameStats.coins - coinsLvl1 - coinsLvl50; // min(260, 20 + 2*150 = 320) = 260
  64  |
  65  |         // Let's test wild creature win for Player 2
  66  |         window.activeBattlePlayer = 2;
  67  |         window.currentEnemy = { id: 'e4', level: 10, currentHp: 0, stats: { health: 100 } };
  68  |         window.endBattle('win');
  69  |         await new Promise(resolve => setTimeout(resolve, 1600));
  70  |         const p2CoinsLvl10 = window.gameStats2.coins; // 20 + 2*10 = 40
  71  |
  72  |         return {
  73  |           coinsLvl1,
  74  |           coinsLvl50,
  75  |           coinsLvl150,
  76  |           p2CoinsLvl10,
  77  |           p1CoinsTotal: window.gameStats.coins,
  78  |           p2CoinsTotal: window.gameStats2.coins
  79  |         };
  80  |       } catch (e) {
  81  |         console.error('ERROR IN EVALUATE:', e.message, e.stack);
  82  |         throw e;
  83  |       }
  84  |     });
  85  |
  86  |     expect(results.coinsLvl1).toBe(22);
  87  |     expect(results.coinsLvl50).toBe(120);
  88  |     expect(results.coinsLvl150).toBe(260);
  89  |     expect(results.p2CoinsLvl10).toBe(40);
  90  |     expect(results.p1CoinsTotal).toBe(22 + 120 + 260);
  91  |     expect(results.p2CoinsTotal).toBe(40);
  92  |
  93  |     // Verify UI displays have been updated
  94  |     const p1CoinsText = await page.locator('#p1CoinsCount').innerText();
  95  |     const p2CoinsText = await page.locator('#p2CoinsCount').innerText();
  96  |     expect(parseInt(p1CoinsText, 10)).toBe(22 + 120 + 260);
  97  |     expect(parseInt(p2CoinsText, 10)).toBe(40);
  98  |   });
  99  |
  100 |   test('should award 80 coins to Player 1 on online PvP battle win', async ({ page }) => {
  101 |     const p1Coins = await page.evaluate(async () => {
  102 |       try {
  103 |         window.gameStats.coins = 0;
  104 |         window.isPvpBattle = true;
  105 |         window.currentPlayer = { id: 'p1_1', currentHp: 50, stats: { health: 100 } };
  106 |         window.currentEnemy = { id: 'e1', level: 10, currentHp: 0, stats: { health: 100 } };
  107 |         window.collectedCreatures = [{ id: 'p1_1', currentHp: 50, stats: { health: 100 } }];
  108 |         window.endBattle('win');
  109 |         await new Promise(resolve => setTimeout(resolve, 1600));
  110 |         return window.gameStats.coins;
  111 |       } catch (e) {
  112 |         console.error('ERROR IN EVALUATE:', e.message);
  113 |         throw e;
  114 |       }
  115 |     });
  116 |     expect(p1Coins).toBe(80);
  117 |   });
  118 |
  119 |   test('should award 80 coins correctly in local PvP battles', async ({ page }) => {
  120 |     const results = await page.evaluate(async () => {
  121 |       try {
  122 |         window.gameStats.coins = 0;
  123 |         window.gameStats2.coins = 0;
  124 |         window.collectedCreatures = [{ id: 'p1_1', currentHp: 50, stats: { health: 100 } }];
  125 |         window.collectedCreatures2 = [{ id: 'p2_1', currentHp: 50, stats: { health: 100 } }];
  126 |
  127 |         // Player 1 wins
  128 |         window.isLocalPvp = true;
  129 |         window.currentPlayer = { id: 'p1_1', currentHp: 50, stats: { health: 100 } };
  130 |         window.currentEnemy = { id: 'e1', level: 10, currentHp: 0, stats: { health: 100 } };
  131 |         window.endBattle('win');
  132 |         await new Promise(resolve => setTimeout(resolve, 1600));
  133 |         const firstWinCoinsP1 = window.gameStats.coins;
  134 |         const firstWinCoinsP2 = window.gameStats2.coins;
  135 |
  136 |         // Player 2 wins (loss for battle actor Player 1)
  137 |         window.isLocalPvp = true;
  138 |         window.currentPlayer = { id: 'p1_1', currentHp: 0, stats: { health: 100 } };
  139 |         window.currentEnemy = { id: 'e1', level: 10, currentHp: 50, stats: { health: 100 } };
  140 |         window.endBattle('loss');
  141 |         await new Promise(resolve => setTimeout(resolve, 1600));
  142 |         const secondWinCoinsP1 = window.gameStats.coins;
  143 |         const secondWinCoinsP2 = window.gameStats2.coins;
  144 |
  145 |         return {
  146 |           firstWinCoinsP1,
  147 |           firstWinCoinsP2,
  148 |           secondWinCoinsP1,
  149 |           secondWinCoinsP2
  150 |         };
  151 |       } catch (e) {
  152 |         console.error('ERROR IN EVALUATE:', e.message);
  153 |         throw e;
  154 |       }
  155 |     });
  156 |
  157 |     expect(results.firstWinCoinsP1).toBe(80);
  158 |     expect(results.firstWinCoinsP2).toBe(2);
> 159 |     expect(results.secondWinCoinsP1).toBe(82);
      |                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  160 |     expect(results.secondWinCoinsP2).toBe(82);
  161 |   });
  162 | });
  163 |
```