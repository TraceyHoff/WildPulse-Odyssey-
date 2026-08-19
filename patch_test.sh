cat << 'INNER_EOF' > my_patch.diff
<<<<<<< SEARCH
            // Player Steps
            this.stepFilter = new Tone.Filter({ type: "lowpass", frequency: 1200 }).connect(this.reverb);
            this.synths.steps = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } }).connect(this.stepFilter);
            this.synths.steps.volume.value = -30;
=======
            // Player Steps
            this.stepFilter = new Tone.Filter({ type: "lowpass", frequency: 1200 }).connect(this.reverb);
            this.synths.steps = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } }).connect(this.stepFilter);
            this.synths.steps.volume.value = -20;
>>>>>>> REPLACE
INNER_EOF
