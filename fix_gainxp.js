const fs = require('fs');

function updateGainXp(filename) {
    let content = fs.readFileSync(filename, 'utf-8');

    // Check if `avail = allStats` exists in the code
    const findStr = "if (avail.length < 2) avail = allStats;";
    const repStr = "if (avail.length < 2) avail = [...allStats];";

    if (content.includes(findStr)) {
        content = content.replace(findStr, repStr);
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename} (fixed avail ref bug)`);
    } else {
        console.log(`Did not find target in ${filename}`);
    }
}
['index.html', 'index_test.html', 'clean_script.js', 'extracted_script.js'].forEach(updateGainXp);
