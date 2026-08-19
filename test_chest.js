console.log("Checking if functions exist...");
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
console.log(html.includes('window.depositItemIntoChest'));
console.log(html.includes('window.withdrawItemFromChest'));
