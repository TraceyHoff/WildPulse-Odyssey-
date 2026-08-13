const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace flex layout and add TALK button for P1
const searchP1 = `<div style="display: flex; gap: 15px; justify-content: center;">
            <button class="btn" id="questAcceptBtn_p1" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(0, 255, 204, 0.15); border: 2px solid #00ffcc; border-radius: 12px; color: #00ffcc; cursor: pointer; transition: all 0.2s;">ACCEPT QUEST</button>
            <button class="btn" id="questCompleteBtn_p1" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 235, 59, 0.15); border: 2px solid #ffeb3b; border-radius: 12px; color: #ffeb3b; cursor: pointer; transition: all 0.2s; display: none;">CLAIM REWARDS</button>
            <button class="btn" id="questCancelBtn_p1" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 51, 102, 0.15); border: 2px solid #ff3366; border-radius: 12px; color: #ff3366; cursor: pointer; transition: all 0.2s;">ABANDON</button>
            <button class="btn" id="questCloseBtn_p1" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; color: white; cursor: pointer; transition: all 0.2s;">CLOSE</button>
        </div>`;

const replaceP1 = `<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
            <button class="btn" id="questAcceptBtn_p1" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(0, 255, 204, 0.15); border: 2px solid #00ffcc; border-radius: 12px; color: #00ffcc; cursor: pointer; transition: all 0.2s;">ACCEPT QUEST</button>
            <button class="btn" id="questTalkBtn_p1" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(33, 150, 243, 0.15); border: 2px solid #2196F3; border-radius: 12px; color: #2196F3; cursor: pointer; transition: all 0.2s;">TALK</button>
            <button class="btn" id="questCompleteBtn_p1" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 235, 59, 0.15); border: 2px solid #ffeb3b; border-radius: 12px; color: #ffeb3b; cursor: pointer; transition: all 0.2s; display: none;">CLAIM REWARDS</button>
            <button class="btn" id="questCancelBtn_p1" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 51, 102, 0.15); border: 2px solid #ff3366; border-radius: 12px; color: #ff3366; cursor: pointer; transition: all 0.2s;">ABANDON</button>
            <button class="btn" id="questCloseBtn_p1" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; color: white; cursor: pointer; transition: all 0.2s;">CLOSE</button>
        </div>`;

// Replace flex layout and add TALK button for P2
const searchP2 = `<div style="display: flex; gap: 15px; justify-content: center;">
            <button class="btn" id="questAcceptBtn_p2" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 152, 0, 0.15); border: 2px solid #ff9800; border-radius: 12px; color: #ff9800; cursor: pointer; transition: all 0.2s;">ACCEPT QUEST</button>
            <button class="btn" id="questCompleteBtn_p2" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 235, 59, 0.15); border: 2px solid #ffeb3b; border-radius: 12px; color: #ffeb3b; cursor: pointer; transition: all 0.2s; display: none;">CLAIM REWARDS</button>
            <button class="btn" id="questCancelBtn_p2" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 51, 102, 0.15); border: 2px solid #ff3366; border-radius: 12px; color: #ff3366; cursor: pointer; transition: all 0.2s;">ABANDON</button>
            <button class="btn" id="questCloseBtn_p2" style="flex: 1; padding: 12px; font-size: 15px; font-weight: bold; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; color: white; cursor: pointer; transition: all 0.2s;">CLOSE</button>
        </div>`;

const replaceP2 = `<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
            <button class="btn" id="questAcceptBtn_p2" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 152, 0, 0.15); border: 2px solid #ff9800; border-radius: 12px; color: #ff9800; cursor: pointer; transition: all 0.2s;">ACCEPT QUEST</button>
            <button class="btn" id="questTalkBtn_p2" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(33, 150, 243, 0.15); border: 2px solid #2196F3; border-radius: 12px; color: #2196F3; cursor: pointer; transition: all 0.2s;">TALK</button>
            <button class="btn" id="questCompleteBtn_p2" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 235, 59, 0.15); border: 2px solid #ffeb3b; border-radius: 12px; color: #ffeb3b; cursor: pointer; transition: all 0.2s; display: none;">CLAIM REWARDS</button>
            <button class="btn" id="questCancelBtn_p2" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 51, 102, 0.15); border: 2px solid #ff3366; border-radius: 12px; color: #ff3366; cursor: pointer; transition: all 0.2s;">ABANDON</button>
            <button class="btn" id="questCloseBtn_p2" style="flex: 1; min-width: 120px; padding: 10px; font-size: 14px; font-weight: bold; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(255,255,255,0.3); border-radius: 12px; color: white; cursor: pointer; transition: all 0.2s;">CLOSE</button>
        </div>`;

if (html.includes(searchP1)) {
    html = html.replace(searchP1, replaceP1);
} else {
    console.log("Could not find P1 quest modal buttons.");
}

if (html.includes(searchP2)) {
    html = html.replace(searchP2, replaceP2);
} else {
    console.log("Could not find P2 quest modal buttons.");
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Quest modal buttons patched.");
