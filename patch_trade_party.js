const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldTradeModal = `window.openTradeModal = function() {
    if (inBattle) return;
    const s1 = document.getElementById('tradeCreatureSelect');
    populateSelect(s1);`;

const newTradeModal = `window.openTradeModal = function() {
    if (inBattle) return;
    const s1 = document.getElementById('tradeCreatureSelect');
    s1.innerHTML = '';
    collectedCreatures.filter(c => !c.stored).forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.text = \`\${c.name} (Gen \${c.generation})\`;
        s1.appendChild(option);
    });`;

html = html.replace(oldTradeModal, newTradeModal);
fs.writeFileSync('index.html', html);
