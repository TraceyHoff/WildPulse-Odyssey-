const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const logic = `
window.openJournalModal = function() {
    closeMenuModal();

    // Calculate unique Gen 1 and Gen 2 creatures
    const gen1Set = new Set();
    const gen2Set = new Set();

    collectedCreatures.forEach(c => {
        if (!c.generation || c.generation === 1) {
            // Uniquely identify base creatures by their name or baseId
            gen1Set.add(c.baseId || c.name);
        } else if (c.generation === 2) {
            // For gen 2, uniqueness is based on the combination of parents,
            // which results in their unique generated name.
            gen2Set.add(c.name);
        }
    });

    document.getElementById('journalGen1Count').innerText = gen1Set.size + ' / 50';
    document.getElementById('journalGen2Count').innerText = gen2Set.size;

    document.getElementById('journalModal').style.display = 'block';
};

window.closeJournalModal = function() {
    let _m_journalModal = document.getElementById('journalModal');
    _m_journalModal.children[0].classList.add('modal-fade-out');
    setTimeout(() => {
        _m_journalModal.style.display = 'none';
        _m_journalModal.children[0].classList.remove('modal-fade-out');
    }, 190);
};

window.openHelpModal = function() {`;

html = html.replace('window.openHelpModal = function() {', logic);
fs.writeFileSync('index.html', html);
