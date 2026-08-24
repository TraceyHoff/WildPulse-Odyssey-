const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf-8');
const regex = /modernNotification/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Found at index ${match.index}`);
}
