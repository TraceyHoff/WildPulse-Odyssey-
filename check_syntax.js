const fs = require('fs');
const acorn = require('acorn');

const code = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(code)) !== null) {
  const scriptContent = match[1];
  try {
    acorn.parse(scriptContent, { ecmaVersion: 2020 });
    console.log("Syntax is OK!");
  } catch (e) {
    console.error("Syntax Error at line:", e.loc.line, "col:", e.loc.column);
    console.error(e.message);
    const lines = scriptContent.split('\n');
    const errLine = lines[e.loc.line - 1];
    console.error(errLine);
    console.error(' '.repeat(e.loc.column) + '^');
  }
}
