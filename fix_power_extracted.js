const fs = require('fs');
['extracted_script.js', 'clean_script.js'].forEach(filename => {
    let content = fs.readFileSync(filename, 'utf-8');
    if (content.includes("let power = 50;")) {
        content = content.replace(/let power = 50;/g, "let power = 70;");
        fs.writeFileSync(filename, content);
        console.log(`Updated ${filename}`);
    }
});
