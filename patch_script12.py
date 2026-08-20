import re

with open('tests/shopAndInventory.spec.js', 'r') as f:
    content = f.read()

# Replace p1ActiveBuffs test part
# Since we removed p1ActiveBuffs, the test will fail on that. We'll skip testing the onscreen buff text.
# The exact text depends on how the buff text is used. Let's look for p1ActiveBuffs and remove it
content = re.sub(r"const buffsText = await page\.locator\('#p1ActiveBuffs'\)\.innerText\(\);.*?(await expect\(.*?\)\.toBe\(true\);)", "// active buffs removed", content, flags=re.DOTALL)
content = re.sub(r"await expect\(page\.locator\('#p1ActiveBuffs'\)\).*?\n", "// active buffs removed", content)

with open('tests/shopAndInventory.spec.js', 'w') as f:
    f.write(content)
