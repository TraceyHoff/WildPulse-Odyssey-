const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The logic should be injected when a slide is displayed.
// When showing the slide, it checks the platform.
// This happens in showIntroModal (shows slide 1 by default, but wait, it might show slide 2 later),
// advanceIntroModal, prevIntroModal.
// Or we can just create a function updateIntroModalPlatformVisibility(suffix) and call it whenever slide 2 is displayed.

let updateFunction = `
    window.updateIntroModalPlatformVisibility = function(suffix) {
        const kbSection = document.getElementById('introKeyboardSection' + suffix);
        const gpSection = document.getElementById('introGamepadSection' + suffix);
        const mbSection = document.getElementById('introMobileSection' + suffix);

        if (kbSection) kbSection.style.display = 'none';
        if (gpSection) gpSection.style.display = 'none';
        if (mbSection) mbSection.style.display = 'none';

        if (window.isConsoleOrMobile && window.isConsoleOrMobile()) {
            if (mbSection) mbSection.style.display = 'block';
        } else if (navigator.getGamepads && Array.from(navigator.getGamepads()).some(gp => gp !== null)) {
            if (gpSection) gpSection.style.display = 'block';
        } else {
            if (kbSection) kbSection.style.display = 'block';
        }
    };
`;

// Insert the new function into index.html near showIntroModal
html = html.replace('window.showIntroModal = function(playerNum = 1) {', updateFunction + '\n    window.showIntroModal = function(playerNum = 1) {');

// Call updateIntroModalPlatformVisibility(suffix) wherever slide 2 is made visible.
// 1. showIntroModal: slide 2 is hidden initially, but what if they reopen? Just call it anyway to be safe.
// Actually, in showIntroModal, slide 2 is set to 'none', so we don't necessarily need it, but let's call it when slide 2 is shown.
// 2. advanceIntroModal
html = html.replace(/if \(slide2\) slide2.style.display = 'block';/g, "if (slide2) { slide2.style.display = 'block'; window.updateIntroModalPlatformVisibility(suffix); }");

fs.writeFileSync('index.html', html);
