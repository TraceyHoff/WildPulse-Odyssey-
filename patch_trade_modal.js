const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update modal selectors
html = html.replace('#breedingModal, #menuModal, #partyModal, #storageModal, #helpModal, #lobbyModal, #levelUpModal {',
                    '#breedingModal, #menuModal, #partyModal, #storageModal, #helpModal, #lobbyModal, #levelUpModal, #tradeModal, #journalModal {');

// Remove existing #tradeModal specific styling that overrides the global .modal style
html = html.replace(/\s*#tradeModal \{\s*display: none;\s*position: absolute;\s*color: white;\s*z-index: 700;\s*text-align: center;\s*\}/, '');

fs.writeFileSync('index.html', html);
