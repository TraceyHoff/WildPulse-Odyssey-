const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add event delegation for store and retrieve buttons
const existingDelegation = `    } else if (e.target.matches('.release-btn')) {
        const index = e.target.getAttribute('data-index');
        window.releaseCreature(parseInt(index));
    }`;

const newDelegation = existingDelegation + ` else if (e.target.matches('.store-btn')) {
        const index = e.target.getAttribute('data-index');
        window.storeCreature(parseInt(index));
    } else if (e.target.matches('.retrieve-btn')) {
        const index = e.target.getAttribute('data-index');
        window.retrieveCreature(parseInt(index));
    }`;

content = content.replace(existingDelegation, newDelegation);

// 2. Modify renderPartyList to only show active party AND add Store button
const renderPartyStart = `window.renderPartyList = function() {`;
const renderPartyEnd = `list.appendChild(fragment);\n};`;

// We'll replace the entire renderPartyList to ensure it's clean and only renders party
let renderPartyReplacement = `window.renderPartyList = function() {
    const list = document.getElementById('partyList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();
    if (collectedCreatures.length === 0) {
        list.innerHTML = '<p>Your party is empty.</p>';
        return;
    }

    const activeParty = collectedCreatures.slice(0, 6);

    const partyHeader = document.createElement('h3');
    partyHeader.innerText = "Active Party";
    partyHeader.style.color = "#e0e0ff";
    partyHeader.style.marginTop = "0";
    fragment.appendChild(partyHeader);

    activeParty.forEach((c, index) => {
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
};

window.renderStorageList = function() {
    const list = document.getElementById('storageList');
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const storageBox = collectedCreatures.slice(6);

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

    storageBox.forEach((c, i) => {
        const index = i + 6;
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

// Use regex to replace the old renderPartyList function completely
// We know it ends with `list.appendChild(fragment);\n};`
const functionRegex = /window\.renderPartyList = function\(\) \{[\s\S]*?list\.appendChild\(fragment\);\n\};/m;
content = content.replace(functionRegex, renderPartyReplacement);

// 3. Implement storeCreature and retrieveCreature, replace moveToParty
const moveToPartyCode = `window.moveToParty = function(index) {
    if (index >= 6 && index < collectedCreatures.length) {
        // Swap with the 6th slot (index 5)
        let targetIndex = 5;
        let temp = collectedCreatures[targetIndex];
        collectedCreatures[targetIndex] = collectedCreatures[index];
        collectedCreatures[index] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        renderPartyList();
    }
};`;

const newStorageLogic = `window.storeCreature = function(index) {
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

content = content.replace(moveToPartyCode, newStorageLogic);

// 4. Update moveUp and moveDown to prevent swapping into/from storage
content = content.replace(/window\.moveDown = function\(index\) \{[\s\S]*?\n\};/,
`window.moveDown = function(index) {
    const maxIndex = Math.min(5, collectedCreatures.length - 1);
    if (index < maxIndex) {
        let temp = collectedCreatures[index];
        collectedCreatures[index] = collectedCreatures[index + 1];
        collectedCreatures[index + 1] = temp;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedCreatures));
        window.renderPartyList();
    }
};`);

// And release needs to update storage list too if released from storage
content = content.replace(/renderPartyList\(\);\n    \}\n\};/g,
`renderPartyList();
        if (document.getElementById('storageModal').style.display === 'block') {
            window.renderStorageList();
        }
    }
};`);

fs.writeFileSync('index.html', content);
console.log("Storage Logic applied to index.html");
