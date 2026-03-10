const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add #storageModal to CSS modal group
content = content.replace(
    /#breedingModal, #menuModal, #partyModal, #battleModal, #helpModal, #lobbyModal, #levelUpModal {/g,
    '#breedingModal, #menuModal, #partyModal, #storageModal, #battleModal, #helpModal, #lobbyModal, #levelUpModal {'
);

// 2. Add #storageModal button styling
content = content.replace(
    /#menuModal button, #partyModal > button, #breedingModal button, #helpModal button {/g,
    '#menuModal button, #partyModal > button, #storageModal > button, #breedingModal button, #helpModal button {'
);

content = content.replace(
    /#menuModal button:hover, #partyModal > button:hover, #breedingModal button:hover, #helpModal button:hover {/g,
    '#menuModal button:hover, #partyModal > button:hover, #storageModal > button:hover, #breedingModal button:hover, #helpModal button:hover {'
);

content = content.replace(
    /#partyModal > button, #breedingModal button:last-of-type, #helpModal button {/g,
    '#partyModal > button, #storageModal > button, #breedingModal button:last-of-type, #helpModal button {'
);

// 3. Add #storageModal HTML block after #partyModal
const partyModalHtml = `<div id="partyModal">
    <button class="close-btn close-party-btn" aria-label="Close Party">X</button>
    <h2>Party</h2>
    <div id="partyList"></div>
    <button class="close-party-btn">Close</button>
</div>`;

const storageModalHtml = `<div id="storageModal" style="display:none; position:absolute; color:white; z-index:350;">
    <button class="close-btn close-storage-btn" aria-label="Close Storage">X</button>
    <h2>Storage Box</h2>
    <div id="storageList"></div>
    <button class="close-storage-btn">Close</button>
</div>`;

content = content.replace(partyModalHtml, partyModalHtml + '\n\n' + storageModalHtml);

// 4. Add Storage Box button in #menuModal
const menuModalStart = `<div id="menuModal">
    <button class="close-btn close-menu-btn" aria-label="Close Menu">X</button>
    <h2>Menu</h2>
    <button id="menuPartyBtn">Party</button>`;

const menuModalReplacement = `<div id="menuModal">
    <button class="close-btn close-menu-btn" aria-label="Close Menu">X</button>
    <h2>Menu</h2>
    <button id="menuPartyBtn">Party</button>
    <button id="menuStorageBtn">Storage Box</button>`;

content = content.replace(menuModalStart, menuModalReplacement);

// 5. Add event listener for Storage Box button
const partyBtnListener = `document.getElementById('menuPartyBtn')?.addEventListener('click', openPartyModal);`;
const storageBtnListener = `document.getElementById('menuPartyBtn')?.addEventListener('click', openPartyModal);\n    document.getElementById('menuStorageBtn')?.addEventListener('click', openStorageModal);`;
content = content.replace(partyBtnListener, storageBtnListener);

// 6. Add close button listeners for Storage
const closePartyListener = `document.querySelectorAll('.close-party-btn').forEach(btn => btn.addEventListener('click', closePartyModal));`;
const closeStorageListener = `document.querySelectorAll('.close-party-btn').forEach(btn => btn.addEventListener('click', closePartyModal));\n    document.querySelectorAll('.close-storage-btn').forEach(btn => btn.addEventListener('click', closeStorageModal));`;
content = content.replace(closePartyListener, closeStorageListener);

// 7. Add openStorageModal and closeStorageModal functions
const openPartyFunc = `window.openPartyModal = function() {
    closeMenuModal();
    document.getElementById('partyModal').style.display = 'block';
    renderPartyList();
};`;

const storageFuncs = `window.openPartyModal = function() {
    closeMenuModal();
    document.getElementById('partyModal').style.display = 'block';
    renderPartyList();
};

window.openStorageModal = function() {
    closeMenuModal();
    document.getElementById('storageModal').style.display = 'block';
    renderStorageList();
};

window.closeStorageModal = function() {
    let _m_storageModal = document.getElementById('storageModal'); _m_storageModal.children[0].classList.add('modal-fade-out'); setTimeout(() => { _m_storageModal.style.display = 'none'; _m_storageModal.children[0].classList.remove('modal-fade-out'); }, 190);
};`;

content = content.replace(openPartyFunc, storageFuncs);

fs.writeFileSync('index.html', content);
console.log("Storage UI applied to index.html");
