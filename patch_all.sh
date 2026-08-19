cat << 'INNER_EOF' > my_patch.diff
<<<<<<< SEARCH
            // Birds (Daytime)
            this.synths.birds = new Tone.Synth({
                oscillator: { type: "sine" },
                envelope: { attack: 0.05, decay: 0.1, sustain: 0.1, release: 0.5 }
            }).connect(this.reverb);
            this.synths.birds.volume.value = -20;
=======
            // Birds (Daytime)
            this.synths.birds = new Tone.Synth({
                oscillator: { type: "sine" },
                envelope: { attack: 0.05, decay: 0.1, sustain: 0.1, release: 0.5 }
            }).connect(this.reverb);
            this.synths.birds.volume.value = -10;
>>>>>>> REPLACE
<<<<<<< SEARCH
            // Player Steps
            this.stepFilter = new Tone.Filter({ type: "lowpass", frequency: 1200 }).connect(this.reverb);
            this.synths.steps = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } }).connect(this.stepFilter);
            this.synths.steps.volume.value = -30;
=======
            // Player Steps
            this.stepFilter = new Tone.Filter({ type: "lowpass", frequency: 1200 }).connect(this.reverb);
            this.synths.steps = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } }).connect(this.stepFilter);
            this.synths.steps.volume.value = -12;
>>>>>>> REPLACE
<<<<<<< SEARCH
            // Day: Birds
            if (isDay && (window.weatherPattern === 'none' || !window.weatherPattern) && Math.random() < 0.05) {
=======
            // Day: Birds
            if (isDay && (window.weatherPattern === 'none' || !window.weatherPattern) && Math.random() < 0.1) {
>>>>>>> REPLACE
<<<<<<< SEARCH
        const now = Date.now();
        if (this.lastMusicUpdate && now - this.lastMusicUpdate < 200) return;
        this.lastMusicUpdate = now;

        const isInsideHome = window.isPlayerInsideHome ? window.isPlayerInsideHome(1) : false;
        // Sound effects
        if (!isInsideHome) {
            let p1Moving = (typeof window.playerVx !== 'undefined' && (window.playerVx !== 0 || window.playerVy !== 0));
            if (p1Moving && this.synths.steps && Math.random() < 0.2) {
                this.synths.steps.triggerAttackRelease("16n", Tone.now(), Math.random() * 0.2 + 0.1);
            }

            if (this.synths.leaves && window.windSpeed > 100 && Math.random() < (window.windSpeed / 2000)) {
                this.synths.leaves.triggerAttackRelease("8n", Tone.now(), Math.random() * 0.3 + 0.2);
            }
        }
=======
        const now = Date.now();
        const isInsideHome = window.isPlayerInsideHome ? window.isPlayerInsideHome(1) : false;

        // Fast-update precise sound effects
        if (!isInsideHome) {
            let p1Moving = (typeof window.playerVx !== 'undefined' && (window.playerVx !== 0 || window.playerVy !== 0));
            if (p1Moving) {
                if (!this.lastStepTime || now - this.lastStepTime > 250) {
                    if (this.synths.steps) {
                        this.synths.steps.triggerAttackRelease("16n", Tone.now(), 0.5);
                    }
                    this.lastStepTime = now;
                }
            } else {
                this.lastStepTime = 0;
            }
        }

        if (this.lastMusicUpdate && now - this.lastMusicUpdate < 200) return;
        this.lastMusicUpdate = now;

        // Sound effects
        if (!isInsideHome) {
            if (this.synths.leaves && window.windSpeed > 100 && Math.random() < (window.windSpeed / 2000)) {
                this.synths.leaves.triggerAttackRelease("8n", Tone.now(), Math.random() * 0.3 + 0.2);
            }
        }
>>>>>>> REPLACE
INNER_EOF
node -e "
const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
const patch = fs.readFileSync('my_patch.diff', 'utf8');
const blocks = patch.split('<<<<<<< SEARCH\n').slice(1);
blocks.forEach(block => {
    const parts = block.split('=======\n');
    const search = parts[0];
    const replace = parts[1].split('>>>>>>> REPLACE')[0];
    if (code.includes(search)) {
        code = code.replace(search, replace);
        console.log('Patched a block successfully.');
    } else {
        console.error('COULD NOT FIND BLOCK:\n', search);
    }
});
fs.writeFileSync('index.html', code);
"
