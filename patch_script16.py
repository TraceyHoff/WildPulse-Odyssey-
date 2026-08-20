with open('tests/shopAndInventory.spec.js', 'r') as f:
    content = f.read()

content = content.replace("await expect(repelLabel).toContainText('Available to Buy: 9');", "await expect(repelLabel).toContainText('Available to Buy: 19');")
content = content.replace("await expect(jankLabel).toContainText('Available to Buy: 0');", "await expect(jankLabel).toContainText('Available to Buy: 10');")
content = content.replace("await expect(buyJankBtn).toContainText('Full');", "await expect(buyJankBtn).toContainText('Buy 1 for');")

with open('tests/shopAndInventory.spec.js', 'w') as f:
    f.write(content)
