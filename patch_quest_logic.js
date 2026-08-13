const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const search = `    const detailContainer = document.getElementById(\`questDetailContainer_p\${playerNum}\`);
    const acceptBtn = document.getElementById(\`questAcceptBtn_p\${playerNum}\`);
    const completeBtn = document.getElementById(\`questCompleteBtn_p\${playerNum}\`);
    const cancelBtn = document.getElementById(\`questCancelBtn_p\${playerNum}\`);
    const closeBtn = document.getElementById(\`questCloseBtn_p\${playerNum}\`);`;

const replace = `    const detailContainer = document.getElementById(\`questDetailContainer_p\${playerNum}\`);
    const acceptBtn = document.getElementById(\`questAcceptBtn_p\${playerNum}\`);
    const completeBtn = document.getElementById(\`questCompleteBtn_p\${playerNum}\`);
    const cancelBtn = document.getElementById(\`questCancelBtn_p\${playerNum}\`);
    const closeBtn = document.getElementById(\`questCloseBtn_p\${playerNum}\`);
    const talkBtn = document.getElementById(\`questTalkBtn_p\${playerNum}\`);

    // Reset description and color on open
    if (descEl) {
        descEl.innerText = npcObj.desc;
        descEl.style.color = '#aaa';
    }

    if (talkBtn) {
        talkBtn.onclick = () => {
            if (descEl && window.getRandomLore) {
                descEl.innerText = '"' + window.getRandomLore() + '"';
                descEl.style.color = playerNum === 2 ? '#ff9800' : '#00ffcc';
            }
        };
    }`;

if (html.includes(search)) {
    html = html.replace(search, replace);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Quest logic patched.");
} else {
    console.log("Could not find quest logic string.");
}
