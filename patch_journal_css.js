const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// #menuModal button... add #menuJournalBtn if needed, but it's already caught by #menuModal button

html = html.replace('#menuModal button#breedBtn { background: linear-gradient(180deg, #ffca28, #ff8f00); border-color: #ffe082; color: #333; text-shadow: none; }',
                    '#menuModal button#breedBtn { background: linear-gradient(180deg, #ffca28, #ff8f00); border-color: #ffe082; color: #333; text-shadow: none; }\n        #menuModal button#menuJournalBtn { background: linear-gradient(180deg, #9c27b0, #6a1b9a); border-color: #ba68c8; color: white; }');

html = html.replace('#partyModal > button, #storageModal > button, #breedingModal button:last-of-type, #helpModal button, #tradeModal button.close-trade-btn { background: linear-gradient(180deg, #555, #222); border-color: #777; }',
                    '#partyModal > button, #storageModal > button, #breedingModal button:last-of-type, #helpModal button, #tradeModal button.close-trade-btn, #journalModal button { background: linear-gradient(180deg, #555, #222); border-color: #777; }');

html = html.replace("#breedingModal, #menuModal, #partyModal, #storageModal, #helpModal, #lobbyModal, #levelUpModal, #tradeModal, #journalModal {",
                    "#breedingModal, #menuModal, #partyModal, #storageModal, #helpModal, #lobbyModal, #levelUpModal, #tradeModal, #journalModal {");

fs.writeFileSync('index.html', html);
