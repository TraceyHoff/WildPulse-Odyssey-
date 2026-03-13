const fs = require('fs');

function updateBreedFunction(filename) {
    let content = fs.readFileSync(filename, 'utf-8');

    const oldBreedFunc = `window.breed = function(parent1, parent2) {
    let p1Prefix = parent1.name.substring(0, Math.ceil(parent1.name.length / 2));
    let p2Suffix = parent2.name.substring(Math.floor(parent2.name.length / 2));
    let childName = p1Prefix + p2Suffix;

    // Prevent duplicate names
    if (childName === parent1.name || childName === parent2.name) {
        childName = parent1.name.substring(0, 3) + parent2.name.substring(parent2.name.length - 3);
    }`;

    const newBreedFunc = `window.breed = function(parent1, parent2) {
    function splitName(name) {
        const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
        let splitIdx = Math.ceil(name.length / 2);
        // Try to find a vowel near the middle to split cleanly
        for (let i = 1; i < name.length - 1; i++) {
            if (vowels.includes(name[i].toLowerCase())) {
                splitIdx = i + 1;
                if (i >= name.length / 3) break; // Don't split too early
            }
        }
        return {
            prefix: name.substring(0, splitIdx),
            suffix: name.substring(splitIdx)
        };
    }

    let p1Parts = splitName(parent1.name);
    let p2Parts = splitName(parent2.name);

    let childName = p1Parts.prefix + p2Parts.suffix;

    // Capitalize first letter and lowercase the rest
    childName = childName.charAt(0).toUpperCase() + childName.slice(1).toLowerCase();

    // Prevent duplicate or too short names
    if (childName === parent1.name || childName === parent2.name || childName.length < 3) {
        childName = parent1.name.substring(0, Math.max(3, Math.floor(parent1.name.length/2))) +
                    parent2.name.substring(Math.min(parent2.name.length - 3, Math.floor(parent2.name.length/2)));
        childName = childName.charAt(0).toUpperCase() + childName.slice(1).toLowerCase();
    }`;

    if (content.includes(oldBreedFunc)) {
        content = content.replace(oldBreedFunc, newBreedFunc);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    } else {
        console.log(`Could not find old breed function in ${filename}`);
    }
}

['index.html', 'index_test.html', 'clean_script.js', 'extracted_script.js'].forEach(updateBreedFunction);

