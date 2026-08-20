1. **Update Bird Sounds:** Change `this.synths.birds` from `Tone.Synth` to `Tone.FMSynth` to give more complex bird chirps. Update the `isDay` loop in `setupLoops` to play a variety of bird chirps (trills, swoop, high peeps) by randomly selecting from an array of chirp styles instead of playing simple sine wave notes.
2. **Update Cricket Sounds:** Adjust the `this.synths.crickets` volume and envelope parameters to sound more realistic, and change the noise type from 'white' to 'brown' and adjust the high-pass filter. Increase cricket volume and trigger rates at night.
3. **Add Frog Sounds:** Initialize a `Tone.MembraneSynth` (`this.synths.frogs`) during setup. Trigger it occasionally (e.g. low "C2" and "E2" notes) during the nighttime loop in `setupLoops` to create realistic night ambiences.
4. **Plant Rustling Sounds:**
   - Initialize `window.plantsGroup` as a physics group when setting up physics (around `window.spawnMiniTiles`).
   - Add newly spawned plants (in the chunk generation logic) to this group.
   - Set up overlap physics (`this.physics.add.overlap`) between `player`/`player2` and `window.plantsGroup`.
   - In the overlap callback, trigger `window.WildPulseMusic.synths.leaves.triggerAttackRelease` to play a rustling sound, limit with a cooldown (500ms), and visually wiggle the plant using a small tween.
5. **Complete pre commit steps**: Ensure proper testing, verification, review, and reflection are done.
6. **Submit**: Submit the changes with descriptive commit message.
