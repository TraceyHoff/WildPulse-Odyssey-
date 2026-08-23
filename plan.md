1.  **Redesign Breeding Modal:**
    *   Find the `breedingModal` HTML in `index.html` (around line 8023-8060).
    *   Update styling to be modern, sci-fi/cyberpunk using `replace_with_git_merge_diff`. Modify the HTML structure of `#breedingModal` and its columns.
    *   Exact Replacement:
```javascript
<<<<<<< SEARCH
<div id="breedingModal">
    <button class="close-btn close-breeding-btn" aria-label="Close Breeding Center">X</button>
    <div class="coop-columns">
        <!-- Player 1 Column -->
        <div class="coop-column p1-col">
            <button class="close-btn close-breeding-btn" aria-label="Close Breeding Center">X</button>
            <h2 style="color: #4caf50; text-align: center; margin-top: 0; margin-bottom: 15px;">Player 1 Breeding</h2>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px;">Parent 1:</label>
                <button id="parent1Select" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #555; background: #222; color: white; box-sizing: border-box; text-align: left; cursor: pointer;">Select Parent</button>
            </div>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px;">Parent 2:</label>
                <button id="parent2Select" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #555; background: #222; color: white; box-sizing: border-box; text-align: left; cursor: pointer;">Select Parent</button>
            </div>
            <button id="doBreedBtn" onclick="window.doBreed(1)" style="width: 100%; padding: 10px; font-size: 16px;">Breed!</button>
            <p id="breedResult" style="min-height: 20px; font-weight: bold; margin-top: 15px; text-align: center; color: #4caf50;"></p>
        </div>

        <!-- Player 2 Column -->
        <div class="coop-column p2-col">
            <button class="close-btn close-breeding-btn" aria-label="Close Breeding Center">X</button>
            <h2 style="color: #ff9800; text-align: center; margin-top: 0; margin-bottom: 15px;">Player 2 Breeding</h2>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px;">Parent 1:</label>
                <button id="parent1Select_P2" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #555; background: #222; color: white; box-sizing: border-box; text-align: left; cursor: pointer;">Select Parent</button>
            </div>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px;">Parent 2:</label>
                <button id="parent2Select_P2" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #555; background: #222; color: white; box-sizing: border-box; text-align: left; cursor: pointer;">Select Parent</button>
            </div>
            <button id="doBreedBtn_P2" onclick="window.doBreed(2)" style="width: 100%; padding: 10px; font-size: 16px;">Breed!</button>
            <p id="breedResult_P2" style="min-height: 20px; font-weight: bold; margin-top: 15px; text-align: center; color: #ff9800;"></p>
        </div>
    </div>
    <button class="close-breeding-btn" style="display:block; width:100%; margin-top:15px; padding:10px; font-size:16px; cursor:pointer; background: linear-gradient(180deg, #555, #222); border-color: #777;">Close</button>
</div>
=======
<div id="breedingModal" style="display:none; position:absolute; z-index:800; background: rgba(10, 15, 25, 0.95); border: 2px solid #00ffcc; border-radius: 8px; box-shadow: 0 0 15px rgba(0,255,204,0.3); padding: 20px; text-align: center; color: white;">
    <button class="close-btn close-breeding-btn" aria-label="Close Breeding Center">X</button>
    <div class="coop-columns">
        <!-- Player 1 Column -->
        <div class="coop-column p1-col">
            <button class="close-btn close-breeding-btn" aria-label="Close Breeding Center">X</button>
            <h2 style="color: #00ffcc; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 8px #00ffcc; margin-top: 0; margin-bottom: 15px;">Player 1 Breeding</h2>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px; color: #00ffcc; font-family: 'Courier New', Courier, monospace;">Parent 1:</label>
                <button id="parent1Select" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #00ffcc; background: rgba(0,255,204,0.1); color: white; box-sizing: border-box; text-align: left; cursor: pointer; font-family: 'Courier New', Courier, monospace;">Select Parent</button>
            </div>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px; color: #00ffcc; font-family: 'Courier New', Courier, monospace;">Parent 2:</label>
                <button id="parent2Select" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #00ffcc; background: rgba(0,255,204,0.1); color: white; box-sizing: border-box; text-align: left; cursor: pointer; font-family: 'Courier New', Courier, monospace;">Select Parent</button>
            </div>
            <button id="doBreedBtn" onclick="window.doBreed(1)" style="width: 100%; padding: 10px; font-size: 16px;">Breed!</button>
            <p id="breedResult" style="min-height: 20px; font-weight: bold; margin-top: 15px; text-align: center; color: #00ffcc; text-shadow: 0 0 5px #00ffcc;"></p>
        </div>

        <!-- Player 2 Column -->
        <div class="coop-column p2-col">
            <button class="close-btn close-breeding-btn" aria-label="Close Breeding Center">X</button>
            <h2 style="color: #ff007f; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 8px #ff007f; margin-top: 0; margin-bottom: 15px;">Player 2 Breeding</h2>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px; color: #ff007f; font-family: 'Courier New', Courier, monospace;">Parent 1:</label>
                <button id="parent1Select_P2" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ff007f; background: rgba(255,0,127,0.1); color: white; box-sizing: border-box; text-align: left; cursor: pointer; font-family: 'Courier New', Courier, monospace;">Select Parent</button>
            </div>
            <div style="margin-bottom: 15px; text-align: left;">
                <label style="display: block; margin-bottom: 5px; color: #ff007f; font-family: 'Courier New', Courier, monospace;">Parent 2:</label>
                <button id="parent2Select_P2" data-id="" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ff007f; background: rgba(255,0,127,0.1); color: white; box-sizing: border-box; text-align: left; cursor: pointer; font-family: 'Courier New', Courier, monospace;">Select Parent</button>
            </div>
            <button id="doBreedBtn_P2" onclick="window.doBreed(2)" style="width: 100%; padding: 10px; font-size: 16px;">Breed!</button>
            <p id="breedResult_P2" style="min-height: 20px; font-weight: bold; margin-top: 15px; text-align: center; color: #ff007f; text-shadow: 0 0 5px #ff007f;"></p>
        </div>
    </div>
    <button class="close-breeding-btn" style="display:block; width:100%; margin-top:15px; padding:10px; font-size:16px; cursor:pointer;">Close</button>
</div>
>>>>>>> REPLACE
```

2.  **Redesign Egg Hatching Modal/Overlay:**
    *   Find `window.hatchEgg` in `index.html` (around line 25101).
    *   Update the `overlay.innerHTML` string using `replace_with_git_merge_diff`.
    *   Exact Replacement:
```javascript
<<<<<<< SEARCH
    overlay.innerHTML = `
        <h2 id="hatchTitle_p${playerNum}" style="font-size: 28px; color: #00ffcc; text-shadow: 0 0 10px #00ffcc; margin: 0 0 10px 0; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Oh?</h2>
        <p id="hatchSub_p${playerNum}" style="font-size: 15px; color: #aaa; margin: 0 0 20px 0; min-height: 20px; text-align: center; font-style: italic;">Your Mysterious Egg is trembling...</p>
        <div id="eggContainer_p${playerNum}" style="position: relative; width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <canvas id="hatchCanvas_p${playerNum}" width="220" height="220" style="display: block; border-radius: 50%; box-shadow: 0 0 20px rgba(0,0,0,0.8); background: #050a12; border: 2px solid rgba(255,255,255,0.1);"></canvas>
            <div id="hatchFlash_p${playerNum}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #ffffff; opacity: 0; pointer-events: none; transition: opacity 0.1s ease-out; border-radius: 50%;"></div>
        </div>
        <div id="hatchStats_p${playerNum}" style="display: none; margin-top: 10px; font-size: 14px; text-align: left; background: rgba(255,255,255,0.06); padding: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); width: 100%; max-width: 280px; box-shadow: inset 0 0 15px rgba(0,0,0,0.6);"></div>
        <div id="hatchBtnContainer_p${playerNum}" style="display: none; margin-top: 20px; width: 100%; text-align: center;"></div>
    `;
=======
    overlay.style.border = '2px solid #00ffcc';
    overlay.style.boxShadow = 'inset 0 0 30px rgba(0,255,204,0.2)';

    overlay.innerHTML = `
        <h2 id="hatchTitle_p${playerNum}" style="font-size: 32px; color: #00ffcc; text-shadow: 0 0 15px #00ffcc; margin: 0 0 10px 0; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 3px; font-family: 'Courier New', Courier, monospace;">SYSTEM // EGG ACTIVITY</h2>
        <p id="hatchSub_p${playerNum}" style="font-size: 16px; color: #00ffcc; margin: 0 0 25px 0; min-height: 22px; text-align: center; text-transform: uppercase; letter-spacing: 1px; font-family: 'Courier New', Courier, monospace;">[ STATUS: VITAL SIGNS DETECTED ]</p>
        <div id="eggContainer_p${playerNum}" style="position: relative; width: 220px; height: 220px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <canvas id="hatchCanvas_p${playerNum}" width="220" height="220" style="display: block; border-radius: 50%; box-shadow: 0 0 30px rgba(0,255,204,0.4); background: rgba(10, 15, 25, 0.95); border: 2px solid #00ffcc;"></canvas>
            <div id="hatchFlash_p${playerNum}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #ffffff; opacity: 0; pointer-events: none; transition: opacity 0.1s ease-out; border-radius: 50%;"></div>
        </div>
        <div id="hatchStats_p${playerNum}" style="display: none; margin-top: 10px; font-size: 14px; text-align: left; background: rgba(10, 15, 25, 0.95); padding: 15px; border-radius: 12px; border: 1px solid #00ffcc; width: 100%; max-width: 280px; box-shadow: 0 0 15px rgba(0,255,204,0.3), inset 0 0 15px rgba(0,255,204,0.1); color: #00ffcc; font-family: 'Courier New', Courier, monospace;"></div>
        <div id="hatchBtnContainer_p${playerNum}" style="display: none; margin-top: 20px; width: 100%; text-align: center;"></div>
    `;
>>>>>>> REPLACE
```

3.  **Egg Seamless Blend (Canvas & Slot):**
    *   **Canvas (`window.renderCreatureCanvas`):** In `window.renderCreatureCanvas` in `index.html` (around line 13540).
    *   Exact String Replacement:
```javascript
<<<<<<< SEARCH
        const eggGrad = ctx.createLinearGradient(50, 22, 50, 78);
        eggGrad.addColorStop(0, color1);
        eggGrad.addColorStop(1, color2);
        ctx.fillStyle = eggGrad;
=======
        const eggGrad = ctx.createLinearGradient(50, 22, 50, 78);
        eggGrad.addColorStop(0, color1);
        eggGrad.addColorStop(0.4, color1);
        eggGrad.addColorStop(0.6, color2);
        eggGrad.addColorStop(1, color2);
        ctx.fillStyle = eggGrad;
>>>>>>> REPLACE
```
    *   **Inventory Slot (`updatePlayerSlots` / `#p1InventoryEggSlots`):** Find where `.egg-slot` is rendered (around line 20732).
    *   Exact String Replacement for icon generation:
```javascript
<<<<<<< SEARCH
            if (egg) {
                const progressPct = Math.min(100, Math.floor((egg.eggProgress || 0) / (egg.eggHatchSteps || 1000) * 100));
                const ready = progressPct >= 100;
                const icon = window.getItemIconHTML ? window.getItemIconHTML("Mysterious Egg", 32) : "🥚";

                slot.style.border = 'none';
=======
            if (egg) {
                const progressPct = Math.min(100, Math.floor((egg.eggProgress || 0) / (egg.eggHatchSteps || 1000) * 100));
                const ready = progressPct >= 100;

                const type1 = egg.parentTypes ? egg.parentTypes[0] : 'Normal';
                const type2 = egg.parentTypes ? egg.parentTypes[1] : (egg.parentTypes ? egg.parentTypes[0] : 'Normal');
                const color1 = window.TYPE_COLORS ? (window.TYPE_COLORS[type1] || '#aaa') : '#aaa';
                const color2 = window.TYPE_COLORS ? (window.TYPE_COLORS[type2] || color1) : color1;
                const icon = `<svg viewBox="0 0 100 100" width="32" height="32"><defs><linearGradient id="eggGrad_${egg.id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="${color1}"/><stop offset="40%" stop-color="${color1}"/><stop offset="60%" stop-color="${color2}"/><stop offset="100%" stop-color="${color2}"/></linearGradient></defs><path d="M50 15 C 75 15, 85 45, 85 65 C 85 85, 70 95, 50 95 C 30 95, 15 85, 15 65 C 15 45, 25 15, 50 15 Z" fill="url(#eggGrad_${egg.id})" stroke="#111" stroke-width="4"/><circle cx="40" cy="35" r="6" fill="rgba(255,255,255,0.3)"/><circle cx="60" cy="55" r="4" fill="rgba(255,255,255,0.2)"/></svg>`;

                slot.style.border = 'none';
>>>>>>> REPLACE
```

4.  **Verify UI changes:**
    *   Start the local server.
    *   Write a Playwright script to open the game, open the breeding modal, breed an egg, and view the egg slot and hatching modal.
    *   Generate a screenshot/video and call `frontend_verification_complete`.

5.  **Run Tests:**
    *   Run `npm run test` or relevant test commands to ensure no regressions were introduced.

6.  **Complete pre-commit steps:**
    *   Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

7.  **Submit the change.**
    *   Once all tests pass, I will submit the change with a descriptive commit message.
