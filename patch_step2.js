const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const updateFromSlidersSearch = `
            sSlider.style.background = \`linear-gradient(to right, \${hslToHex(h, 0, l)}, \${hslToHex(h, 100, l)})\`;
            lSlider.style.background = \`linear-gradient(to right, #000, \${hslToHex(h, s, 50)}, #fff)\`;

            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
            hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        };

        [hSlider, sSlider, lSlider].forEach(slider => {
            slider.addEventListener('input', updateFromSliders);
            slider.addEventListener('change', updateFromSliders);
        });
    };`;

const updateFromSlidersReplace = `
            hSlider.style.background = \`linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)\`;
            sSlider.style.background = \`linear-gradient(to right, \${hslToHex(h, 0, l)}, \${hslToHex(h, 100, l)})\`;
            lSlider.style.background = \`linear-gradient(to right, #000, \${hslToHex(h, s, 50)}, #fff)\`;

            hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
            hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        };

        const updateFromSlidersInit = () => {
            const h = parseInt(hSlider.value);
            const s = parseInt(sSlider.value);
            const l = parseInt(lSlider.value);

            if (hVal) hVal.innerText = h + '°';
            if (sVal) sVal.innerText = s + '%';
            if (lVal) lVal.innerText = l + '%';

            hSlider.style.background = \`linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)\`;
            sSlider.style.background = \`linear-gradient(to right, \${hslToHex(h, 0, l)}, \${hslToHex(h, 100, l)})\`;
            lSlider.style.background = \`linear-gradient(to right, #000, \${hslToHex(h, s, 50)}, #fff)\`;
        };

        [hSlider, sSlider, lSlider].forEach(slider => {
            slider.addEventListener('input', updateFromSliders);
            slider.addEventListener('change', updateFromSliders);
        });
        updateFromSlidersInit();
    };`;

if (html.includes(updateFromSlidersSearch)) {
    html = html.replace(updateFromSlidersSearch, updateFromSlidersReplace);
    console.log("Successfully patched updateFromSliders.");
} else {
    console.log("Could not find updateFromSliders to patch.");
}

fs.writeFileSync('index.html', html, 'utf8');
