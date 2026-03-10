const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/window\.escapeHtml/g, 'escapeHtml');

// Check if escapeHtml even exists in the codebase!
if (!content.includes('function escapeHtml')) {
    const escFn = `
function escapeHtml(unsafe) {
    return (unsafe || '').toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
`;
    // Add it to the top of the script tag
    content = content.replace('<script>', '<script>' + escFn);
}
fs.writeFileSync('index.html', content);
console.log("escapeHtml fixed");
