const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add button to menu Modal
html = html.replace('<button id="breedBtn">Breeding Center</button>',
                    '<button id="breedBtn">Breeding Center</button>\n    <button id="menuJournalBtn">Creature Journal</button>');

// Add Journal Modal HTML right after trade modal
let journalHtml = `

<div id="journalModal" style="display:none; position:absolute; color:white; z-index:800; text-align:center;">
    <button class="close-btn close-journal-btn" aria-label="Close Journal">X</button>
    <h2>Creature Journal</h2>
    <div id="journalStats" style="font-size: 18px; margin: 20px 0;">
        <p>Gen 1 Creatures Collected: <span id="journalGen1Count" style="color:#4caf50;">0 / 50</span></p>
        <p>Gen 2 Unique Species Discovered: <span id="journalGen2Count" style="color:#2196F3;">0</span></p>
    </div>
    <button class="close-journal-btn">Close</button>
</div>
`;

html = html.replace('    <p id="tradeResult"></p>\n</div>', '    <p id="tradeResult"></p>\n</div>' + journalHtml);

// Add event listener bindings
html = html.replace("document.getElementById('menuHelpBtn')?.addEventListener('click', openHelpModal);",
                    "document.getElementById('menuHelpBtn')?.addEventListener('click', openHelpModal);\n    document.getElementById('menuJournalBtn')?.addEventListener('click', openJournalModal);");

html = html.replace("document.querySelectorAll('.close-help-btn').forEach(btn => btn.addEventListener('click', closeHelpModal));",
                    "document.querySelectorAll('.close-help-btn').forEach(btn => btn.addEventListener('click', closeHelpModal));\n    document.querySelectorAll('.close-journal-btn').forEach(btn => btn.addEventListener('click', closeJournalModal));");

fs.writeFileSync('index.html', html);
