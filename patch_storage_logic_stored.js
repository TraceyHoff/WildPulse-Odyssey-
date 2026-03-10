const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The best way to do this is to fully rebuild the logic for renderPartyList and renderStorageList
// to filter by `!c.stored` and `c.stored` respectively.
const regexParty = /window\.renderPartyList = function\(\) \{[\s\S]*?list\.appendChild\(fragment\);\n\};/m;
const regexStorage = /window\.renderStorageList = function\(\) \{[\s\S]*?list\.appendChild\(fragment\);\n\};/m;

const newPartyLogic = `window.renderPartyList = function() {
    const list = document.getElementById('partyList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const activeParty = collectedCreatures.filter(c => !c.stored);

    if (activeParty.length === 0) {
        list.innerHTML = '<p>Your party is empty.</p>';
        return;
    }

    const partyHeader = document.createElement('h3');
    partyHeader.innerText = "Active Party (" + activeParty.length + "/6)";
    partyHeader.style.color = "#e0e0ff";
    partyHeader.style.marginTop = "0";
    fragment.appendChild(partyHeader);

    activeParty.forEach((c) => {
        // Find original index
        const index = collectedCreatures.findIndex(orig => orig.id === c.id);
        const card = document.createElement('div');
        card.className = 'party-card' + (c.isShiny ? ' shiny' : '');

        const statColors = {health: '#4caf50', attack: '#ff9800', defense: '#9c27b0', speed: '#ffeb3b', specialAttack: '#00bcd4', specialDefense: '#e91e63'};

        const statsHtml = ['health', 'attack', 'defense', 'speed', 'specialAttack', 'specialDefense'].map(stat => {
            let base = c.stats[stat] || 50;
            let eff = window.getEffectiveStat(c, stat).toFixed(1);
            let scaled = window.getScaledBaseStat(c, stat).toFixed(1);
            let effColor = parseFloat(eff) > parseFloat(scaled) ? 'green' : (parseFloat(eff) < parseFloat(scaled) ? 'red' : 'white');
            let statColor = statColors[stat] || 'white';
            return \`<div data-tooltip="\${stat} indicates the creature's combat capability. Base is \${base}, scaled by level to \${scaled}. Effective is \${eff} after Nature modifications."><span style="color:\${statColor};">\${stat}</span>: \${base} <span style="color:\${effColor}">(Eff: \${eff})</span></div>\`;
        }).join('');

        let parentsHtml = '';
        if (c.parents) {
            parentsHtml = \`<p><em>Parents: \${c.parents.name1} (\${c.parents.type1}) & \${c.parents.name2} (\${c.parents.type2})</em></p>\`;
        }

        let natureColor = 'white';
        if (c.nature) {
            if (c.nature.increase && !c.nature.decrease) {
                natureColor = '#4caf50';
            }
            else if (!c.nature.increase && c.nature.decrease) {
                natureColor = '#f44336';
            }
            else if (c.nature.increase && c.nature.decrease) {
                natureColor = '#ff9800';
            }
        }
        let natureHtml = c.nature ? \`<p data-tooltip="\${c.nature.name}: Increases \${c.nature.increase || 'Nothing'} and decreases \${c.nature.decrease || 'Nothing'}">Nature: <span style="color:\${natureColor};">\${c.nature.name}</span></p>\` : '<p>Nature: None</p>';
        let shinyPrefix = c.isShiny ? '<span class="shiny-star">⭐</span>' : '';

        card.innerHTML = \`
            <div>
                <h3 style="font-size: 1.2em; border-bottom: 1px solid #87CEEB; padding-bottom: 5px; margin-bottom: 10px;">\${shinyPrefix}<input class="creature-name" aria-label="Creature Name" value="\${c.nickname || c.name}" maxlength="20"> <button class="save-name-btn" data-index="\${index}">Save</button> - \${c.type}</h3>
                <p><strong>Level <span style="color:#2196F3">\${c.level || 1}</span></strong> (Gen \${c.generation}) | <span style="color:#2196F3">XP: \${Math.floor(c.xp || 0)} / \${window.getXpRequirement(c.level || 1)}</span></p>
                <div class="creature-description">
                    <p style="color: #ccc; font-style: italic;">\${c.description}</p>
                </div>
                \${natureHtml}
                \${parentsHtml}
                <div style="border-top: 1px solid #555; padding-top: 10px; margin-top: 10px;">
                    <h4 style="margin: 0 0 5px 0;">Base Stats</h4>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 0.9em;">
                        \${statsHtml}
                    </div>
                </div>
            </div>
            <div class="party-controls">
                <button class="move-up-btn" data-index="\${index}" aria-label="Move Up">▲</button>
                <button class="move-down-btn" data-index="\${index}" aria-label="Move Down">▼</button>
                <button class="store-btn" data-index="\${index}" style="background-color: #2196F3; color: white;">Store</button>
                <button class="release-btn" data-index="\${index}" style="background-color: #f44336; color: white;">Release</button>
            </div>
        \`;
        fragment.appendChild(card);
    });

    list.appendChild(fragment);
};`;

const newStorageLogic = `window.renderStorageList = function() {
    const list = document.getElementById('storageList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const storageBox = collectedCreatures.filter(c => c.stored);

    if (storageBox.length === 0) {
        list.innerHTML = '<p>Your storage box is empty.</p>';
        return;
    }

    const storageGrid = document.createElement('div');
    storageGrid.style.display = 'grid';
    storageGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    storageGrid.style.gap = '15px';
    storageGrid.style.maxHeight = '60vh';
    storageGrid.style.overflowY = 'auto';
    storageGrid.style.padding = '10px';

    storageBox.forEach((c) => {
        const index = collectedCreatures.findIndex(orig => orig.id === c.id);
        const card = document.createElement('div');
        card.className = 'party-card' + (c.isShiny ? ' shiny' : '');

        const nameHtml = \`<h4>\${window.escapeHtml(c.name)} \${c.nickname ? \`("\${window.escapeHtml(c.nickname)}")\` : ''}</h4>\`;
        const typeHtml = \`<p>Lvl \${c.level} | Type: \${c.type} | Gen \${c.generation}</p>\`;

        let actionHtml = \`<div class="party-controls">\`;
        actionHtml += \`<button class="retrieve-btn" data-index="\${index}" style="background-color: #4CAF50; color: white;">Retrieve</button>\`;
        actionHtml += \`<button class="release-btn" data-index="\${index}" style="background-color: #f44336; color: white;">Release</button>\`;
        actionHtml += \`</div>\`;

        card.innerHTML = nameHtml + typeHtml + actionHtml;
        storageGrid.appendChild(card);
    });

    fragment.appendChild(storageGrid);
    list.appendChild(fragment);
};`;

content = content.replace(regexParty, newPartyLogic);
content = content.replace(regexStorage, newStorageLogic);

// Store and Retrieve Functions using .stored property
const storeRetrieveRegex = /window\.storeCreature = function[\s\S]*?window\.renderStorageList\(\);\n\};/m;
const newStoreRetrieve = `window.storeCreature = function(index) {
    if (index < 0 || index >= collectedCreatures.length) return;
    const activeParty = collectedCreatures.filter(c => !c.stored);

    if (activeParty.length <= 1) {
        alert("You cannot store your last active party creature!");
        return;
    }

    collectedCreatures[index].stored = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderPartyList();
};

window.retrieveCreature = function(index) {
    if (index < 0 || index >= collectedCreatures.length) return;

    const activeParty = collectedCreatures.filter(c => !c.stored);
    if (activeParty.length >= 6) {
        alert("Your party is full! Store a creature first.");
        return;
    }

    collectedCreatures[index].stored = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    window.renderStorageList();
};`;

content = content.replace(storeRetrieveRegex, newStoreRetrieve);

// We need to fix moveUp and moveDown to only swap within active party!
// If they swap by index, they might swap with a stored creature if stored and active are mixed.
// The easiest fix is to find the previous/next active creature.
const moveFixes = `window.moveUp = function(index) {
    // Find the previous active creature index
    let targetIndex = -1;
    for (let i = index - 1; i >= 0; i--) {
        if (!collectedCreatures[i].stored) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1 && !collectedCreatures[index].stored) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        window.renderPartyList();
    }
};

window.moveDown = function(index) {
    // Find the next active creature index
    let targetIndex = -1;
    for (let i = index + 1; i < collectedCreatures.length; i++) {
        if (!collectedCreatures[i].stored) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex !== -1 && !collectedCreatures[index].stored) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        window.renderPartyList();
    }
};`;

content = content.replace(/window\.moveUp = function\(index\) \{[\s\S]*?\}\n\};/m, `window.moveUp = function(index) {\n    // TO_REPLACE\n};`);
content = content.replace(/window\.moveDown = function\(index\) \{[\s\S]*?\}\n\};/m, `window.moveDown = function(index) {\n    // TO_REPLACE\n};`);
// Just inject them both into the first TO_REPLACE
content = content.replace(`window.moveUp = function(index) {\n    // TO_REPLACE\n};`, moveFixes);
content = content.replace(`window.moveDown = function(index) {\n    // TO_REPLACE\n};`, ``);

// saveCollected must handle .stored properly
// We append everything to collectedCreatures, and mark it .stored = true if activeParty is full.
const oldSaveCollected = `function saveCollected(creature) {
    if (!collectedCreaturesIds.has(creature.id)) {
        collectedCreaturesIds.add(creature.id);
        collectedCreatures.push(creature);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    }
}`;

const newSaveCollected = `function saveCollected(creature) {
    if (!collectedCreaturesIds.has(creature.id)) {
        const activeParty = collectedCreatures.filter(c => !c.stored);
        creature.stored = activeParty.length >= 6;

        collectedCreaturesIds.add(creature.id);
        collectedCreatures.push(creature);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
    }
}`;

content = content.replace(oldSaveCollected, newSaveCollected);

fs.writeFileSync('index.html', content);
console.log("Storage Logic Stored Prop applied to index.html");
