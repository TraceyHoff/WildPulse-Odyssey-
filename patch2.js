const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
    /window\.weatherIntensity = 0;/g,
    `window.weatherIntensity = 0;\nwindow.lastWeatherCalcUpdate = 0;`
);

content = content.replace(
    /this\.synths\.frogs\.triggerAttackRelease\("E2", "8n", Tone\.now\(\), 0\.5\);/g,
    `this.synths.frogs.triggerAttackRelease("E2", "8n", undefined, 0.5);`
);

fs.writeFileSync('index.html', content);
