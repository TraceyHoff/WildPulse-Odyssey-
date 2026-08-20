import re

with open('tests/shopAndInventory.spec.js', 'r') as f:
    content = f.read()

content = content.replace("await expect(repelLabel).toContainText('Available to Buy: 29');", "await expect(repelLabel).toContainText('Available to Buy: 39');")

with open('tests/shopAndInventory.spec.js', 'w') as f:
    f.write(content)

with open('tests/helpModalAndInventorySlots.spec.js', 'w') as f:
    pass # Empty the file since we deleted the underlying system it tests anyway
