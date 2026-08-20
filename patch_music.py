import re

with open("index.html", "r") as f:
    content = f.read()

# 1. Update birds
# change this.synths.birds to use FMSynth or more complex Tone.Synth
new_birds = """            this.synths.birds = new Tone.FMSynth({
                harmonicity: 3.0,
                modulationIndex: 10,
                oscillator: { type: "sine" },
                envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.5 },
                modulation: { type: "square" },
                modulationEnvelope: { attack: 0.05, decay: 0.1, sustain: 0, release: 0.1 }
            }).connect(this.reverb);
            this.synths.birds.volume.value = -15;"""
content = re.sub(
    r"this\.synths\.birds = new Tone\.Synth\(\{\s*oscillator: \{ type: \"sine\" \},\s*envelope: \{ attack: 0\.05, decay: 0\.1, sustain: 0\.1, release: 0\.5 \}\s*\}\)\.connect\(this\.reverb\);\s*this\.synths\.birds\.volume\.value = -10;",
    new_birds,
    content
)

# update bird loops for "different types of bird chirps and songs"
new_birds_loop = """            // Day: Birds
            if (isDay && (window.weatherPattern === 'none' || !window.weatherPattern) && Math.random() < 0.1) {
                const chirpType = Math.floor(Math.random() * 4);
                if (chirpType === 0) {
                    const note = ["C6", "E6", "G6", "C7"][Math.floor(Math.random() * 4)];
                    this.synths.birds.triggerAttackRelease(note, "16n", time, Math.random() * 0.5 + 0.5);
                    if (Math.random() < 0.5) {
                         this.synths.birds.triggerAttackRelease("E6", "16n", time + 0.1, Math.random() * 0.5 + 0.5);
                    }
                } else if (chirpType === 1) { // Trill
                    this.synths.birds.triggerAttackRelease("G6", "32n", time, 0.6);
                    this.synths.birds.triggerAttackRelease("A6", "32n", time + 0.05, 0.6);
                    this.synths.birds.triggerAttackRelease("G6", "32n", time + 0.1, 0.6);
                    this.synths.birds.triggerAttackRelease("A6", "32n", time + 0.15, 0.6);
                } else if (chirpType === 2) { // Long swoop
                    this.synths.birds.triggerAttackRelease("E6", "8n", time, 0.7);
                    this.synths.birds.triggerAttackRelease("C6", "8n", time + 0.2, 0.5);
                } else { // High peep
                    this.synths.birds.triggerAttackRelease("D7", "32n", time, 0.4);
                    this.synths.birds.triggerAttackRelease("D7", "32n", time + 0.2, 0.4);
                }
            }"""
content = re.sub(
    r"// Day: Birds.*?if \(Math\.random\(\) < 0\.5\) \{\s*this\.synths\.birds\.triggerAttackRelease\(\"E6\", \"16n\", time \+ 0\.1, Math\.random\(\) \* 0\.5 \+ 0\.5\);\s*\}\s*\}",
    new_birds_loop,
    content,
    flags=re.DOTALL
)

# 2. Update crickets for more realism
new_crickets = """            this.synths.crickets = new Tone.NoiseSynth({
                noise: { type: 'brown' },
                envelope: { attack: 0.01, decay: 0.02, sustain: 0, release: 0.02 }
            }).connect(new Tone.Filter(6000, "highpass").connect(this.reverb));
            this.synths.crickets.volume.value = -20;"""
content = re.sub(
    r"this\.synths\.crickets = new Tone\.NoiseSynth\(\{\s*noise: \{ type: 'white' \},\s*envelope: \{ attack: 0\.01, decay: 0\.05, sustain: 0, release: 0\.05 \}\s*\}\)\.connect\(new Tone\.Filter\(4000, \"highpass\"\)\.connect\(this\.reverb\)\);\s*this\.synths\.crickets\.volume\.value = -25;",
    new_crickets,
    content
)

# 3. Add Frogs (Nighttime)
new_frogs_setup = """            this.synths.owl = new Tone.Synth({
                oscillator: { type: "sine" },
                envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 1 }
            }).connect(this.reverb);
            this.synths.owl.volume.value = -15;

            // Frogs (Nighttime)
            this.synths.frogs = new Tone.MembraneSynth({
                pitchDecay: 0.02,
                octaves: 2,
                oscillator: { type: "sawtooth" },
                envelope: { attack: 0.05, decay: 0.1, sustain: 0.1, release: 0.5 }
            }).connect(new Tone.Filter(200, "lowpass").connect(this.reverb));
            this.synths.frogs.volume.value = -15;"""
content = re.sub(
    r"this\.synths\.owl = new Tone\.Synth\(\{\s*oscillator: \{ type: \"sine\" \},\s*envelope: \{ attack: 0\.1, decay: 0\.2, sustain: 0\.8, release: 1 \}\s*\}\)\.connect\(this\.reverb\);\s*this\.synths\.owl\.volume\.value = -15;",
    new_frogs_setup,
    content
)

new_night_loop = """            // Night: Crickets, Owls & Frogs
            if (isNight) {
                if (step % 2 === 0 && Math.random() < 0.8) {
                    this.synths.crickets.triggerAttackRelease("64n", time, 0.5);
                    if (Math.random() < 0.5) this.synths.crickets.triggerAttackRelease("64n", time + 0.05, 0.4);
                }

                if (step === 0 && Math.random() < 0.02) {
                    this.synths.owl.triggerAttackRelease("C4", "4n", time, 0.8);
                    this.synths.owl.triggerAttackRelease("G3", "2n", time + 0.5, 0.6);
                }

                if (step === 0 && Math.random() < 0.05) {
                    this.synths.frogs.triggerAttackRelease("C2", "8n", time, 0.7);
                    setTimeout(() => { if (this.synths.frogs) this.synths.frogs.triggerAttackRelease("E2", "8n", Tone.now(), 0.5); }, 200);
                }
            }"""
content = re.sub(
    r"// Night: Crickets & Owls\s*if \(isNight\) \{\s*if \(step % 2 === 0 && Math\.random\(\) < 0\.8\) \{\s*this\.synths\.crickets\.triggerAttackRelease\(\"32n\", time, 0\.5\);\s*\}\s*if \(step === 0 && Math\.random\(\) < 0\.02\) \{\s*this\.synths\.owl\.triggerAttackRelease\(\"C4\", \"4n\", time, 0\.8\);\s*this\.synths\.owl\.triggerAttackRelease\(\"G3\", \"2n\", time \+ 0\.5, 0\.6\);\s*\}\s*\}",
    new_night_loop,
    content,
    flags=re.DOTALL
)

with open("index.html", "w") as f:
    f.write(content)
