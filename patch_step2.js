const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const regex = /(const updateInventoryList = \(playerNum, containerId\) => \{.*?container\.innerHTML = "";\s*const inv = playerNum === 2 \? window\.p2Inventory : window\.p1Inventory;).*?(inv\.forEach\(\(item, index\) => \{.*?container\.appendChild\(card\);\s*\}\);)/is;

const match = content.match(regex);
if (match) {
    let replacedBlock = match[1] + `
        const inventorySlots = 4;
        for (let index = 0; index < inventorySlots; index++) {
            const item = inv && index < inv.length ? inv[index] : null;

            if (!item) {
                const emptyCard = document.createElement('div');
                emptyCard.className = 'party-card empty-slot';
                emptyCard.style.display = 'flex';
                emptyCard.style.alignItems = 'center';
                emptyCard.style.justifyContent = 'center';
                emptyCard.style.background = 'rgba(10, 15, 30, 0.4)';
                emptyCard.style.border = '1px dashed #555';
                emptyCard.style.borderRadius = '8px';
                emptyCard.style.padding = '10px';
                emptyCard.style.height = '60px';
                emptyCard.style.color = '#888';
                emptyCard.style.fontStyle = 'italic';
                emptyCard.innerHTML = 'Empty Slot';
                container.appendChild(emptyCard);
                continue;
            }

            const card = document.createElement('div');
            card.className = 'party-card';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.background = 'rgba(10, 15, 30, 0.9)';
            card.style.border = '1px solid #00ffcc';
            card.style.borderRadius = '8px';
            card.style.padding = '10px';
            card.style.boxShadow = '0 0 10px rgba(0,255,204,0.1)';

            const iconStr = itemIcons[item.name] || '📦';
            const iconHtml = window.getItemIconHTML ? window.getItemIconHTML(item.name, 32) : iconStr;

            card.innerHTML = \`
                <div style="font-size: 32px; margin-right: 15px; width: 40px; text-align: center;">\${iconHtml}</div>
                <div style="flex-grow: 1;">
                    <div style="color: #00ffcc; font-weight: bold; font-size: 14px;">\${item.name}</div>
                    <div style="color: #aaa; font-size: 12px;">Quantity: <span style="color: #fff;">\${item.quantity}</span></div>
                </div>
                <button class="inv-use-btn" style="background: linear-gradient(180deg, #4caf50, #2e7d32); border: 1px solid #a5d6a7; color: white; padding: 5px 15px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">Use</button>
            \`;

            const useBtn = card.querySelector('.inv-use-btn');
            useBtn.onclick = () => {
                window.useInventoryItem(playerNum, index);
                if (window.updateInventoryUI) window.updateInventoryUI();
            };

            container.appendChild(card);
        }`;

    content = content.replace(match[0], replacedBlock);
    fs.writeFileSync('index.html', content);
    console.log('Successfully patched updateInventoryList');
} else {
    console.log('Regex match failed.');
}
