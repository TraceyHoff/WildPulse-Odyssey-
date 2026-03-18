# We need to implement:
- Weather States: Cloud coverage (Clear, Partly Cloudy, Cloudy). Only update slowly.
- Precipitation (Light rain, heavy rain, thunderstorms). Only happens when cloudy.
- Only happens in Summer and Fall.
- Removes pollen and leaf particles when raining.
- Rain particles as realistic as possible.
- Thunderstorms have lightning flashes.
- Tie weather patterns realistically to cloud patterns.

First, define the states and global variables:
`window.cloudPattern = 'clear'` (clear, partly_cloudy, cloudy)
`window.weatherPattern = 'none'` (none, light_rain, heavy_rain, thunderstorm)
`window.weatherTimer = 0` (update weather slowly over time)

In `create()`:
- Create `rainEmitter`. Realistic rain -> long narrow lines moving fast down and slightly sideways.
- Create `lightningOverlay` -> `this.add.rectangle(0,0, window.innerWidth, window.innerHeight, 0xFFFFFF)` set depth high, alpha 0.

In `update()`:
- Update weather timer.
- Randomly shift cloud patterns and weather patterns.
- Modify the `cloudGlobalAlphaMod` or individual cloud alphas/scales based on `window.cloudPattern`.
- If cloudy, chance to start rain/storm.
- Adjust `rainEmitter` quantity/speed based on weather pattern.
- If raining, set leaf and pollen emitters to 0 quantity.
- Lightning flash logic when `thunderstorm`.
