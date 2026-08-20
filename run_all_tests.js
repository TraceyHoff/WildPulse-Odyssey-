const { execSync } = require('child_process');

try {
  execSync('npx playwright test tests/customization.spec.js tests/homeCustomization.spec.js', { stdio: 'inherit' });
} catch (e) {
  console.log("Tests failed");
}
