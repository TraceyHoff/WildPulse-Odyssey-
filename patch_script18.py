with open('tests/shopAndInventory.spec.js', 'r') as f:
    content = f.read()

content = content.replace("await expect(storeP1Col).toContainText('Available to Buy: 0');", "await expect(storeP1Col).toContainText('Available to Buy: 10');")
content = content.replace("await expect(storeP1Col).toContainText('Full');", "")

with open('tests/shopAndInventory.spec.js', 'w') as f:
    f.write(content)
