const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

// 1. Add CSS
const css = `
    .notification-popup {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, rgba(10, 40, 20, 0.95), rgba(0, 20, 40, 0.95));
        backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 40px rgba(0, 255, 150, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1);
        padding: 15px 30px;
        border-radius: 12px;
        color: white;
        font-family: sans-serif;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        z-index: 200000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
    }
</style>
`;
code = code.replace(/<\/style>/g, css);

// 2. Add HTML & JS
const js = `
<div id="modernNotification" class="notification-popup"></div>

<script>
window.notificationTimeout = null;
window.showModernNotification = function(text, duration = 3000) {
    const el = document.getElementById('modernNotification');
    if (!el) return;
    el.innerText = text;
    el.style.opacity = '1';

    if (window.notificationTimeout) clearTimeout(window.notificationTimeout);
    window.notificationTimeout = setTimeout(() => {
        el.style.opacity = '0';
    }, duration);
};
`;
code = code.replace(/<script>/, js);


// 3. Remove popupText / popupBackground logic from create
code = code.replace(/\/\/ Popup Layer[\s\S]*?popupText\.setVisible\(false\);/g, '');
code = code.replace(/popupBackground\.setPosition[\s\S]*?popupText\.setPosition\(gameSize\.width \/ 2, 40\);/g, '');

// 4. Update healParty
code = code.replace(/popupText\.setText\("Your party has been fully healed!"\);\s*popupBackground\.setVisible\(true\);\s*popupText\.setVisible\(true\);\s*if \(popupTimer\) popupTimer\.remove\(\);\s*popupTimer = this\.time\.delayedCall\(3000, \(\) => \{\s*popupBackground\.setVisible\(false\);\s*popupText\.setVisible\(false\);\s*\}\);/g, `window.showModernNotification("Your party has been fully healed!");`);

// 5. Update collectCreature "all dead"
code = code.replace(/popupText\.setText\("You have no healthy creatures! Follow the arrow to the hospital\."\);\s*popupBackground\.setVisible\(true\);\s*popupText\.setVisible\(true\);\s*if \(popupTimer\) popupTimer\.remove\(\);\s*popupTimer = this\.time\.delayedCall\(3000, \(\) => \{\s*popupBackground\.setVisible\(false\);\s*popupText\.setVisible\(false\);\s*\}\);/g, `window.showModernNotification("You have no healthy creatures! Find a hospital to heal them.");`);


// 6. Update season change
code = code.replace(/if \(popupText && popupBackground\) \{[\s\S]*?popupText\.setText\(\`The season has changed to \$\{window\.currentSeason\}\!\`\);[\s\S]*?popupBackground\.setVisible\(true\);[\s\S]*?popupText\.setVisible\(true\);[\s\S]*?if \(popupTimer\) popupTimer\.remove\(\);[\s\S]*?popupTimer = this\.time\.delayedCall\(4000, \(\) => \{[\s\S]*?popupBackground\.setVisible\(false\);[\s\S]*?popupText\.setVisible\(false\);[\s\S]*?\}\);[\s\S]*?\}/g, `window.showModernNotification(\`The season has changed to \${window.currentSeason}!\`, 4000);`);

fs.writeFileSync('index.html', code, 'utf8');
