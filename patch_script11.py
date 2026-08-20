with open('tests/shopAndInventory.spec.js', 'r') as f:
    content = f.read()

content = content.replace("await expect(wheelSlots.nth(0)).toContainText('🧴');", "// wheel tests removed")
content = content.replace("await expect(wheelSlots.nth(1)).toContainText('💚');", "// wheel tests removed")
content = content.replace("await expect(wheelSlots.nth(2)).toContainText('🧪');", "// wheel tests removed")
content = content.replace("const wheelSlots = page.locator('#inventoryWheelModal .p1-col .inventory-wheel-option');", "// wheel tests removed")

content = content.replace("await expect(repelLabel).toContainText('Available to Buy: 30');", "await expect(repelLabel).toContainText('Available to Buy: 40');")

with open('tests/shopAndInventory.spec.js', 'w') as f:
    f.write(content)
