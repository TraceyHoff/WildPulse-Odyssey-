const fs = require('fs');
let execSync = require('child_process').execSync;
execSync('git checkout -- index.html');

let html = fs.readFileSync('index.html', 'utf8');

// The git checkout seems to not be overwriting properly, maybe because we added it to git index?
// Wait, we didn't commit anything but maybe it was staged. Let's do git reset --hard and then checkout.
