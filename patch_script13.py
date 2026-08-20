import re

with open('tests/helpModalAndInventorySlots.spec.js', 'r') as f:
    content = f.read()

# Since we removed the onscreen inventory slots, the first test should be removed entirely, or we just remove the test file entirely, but it also tests "help modal close in co-op". Let's just remove the first test and the isPointerOverButton test.
content = re.sub(r"test\('should correctly show/hide inventory slots in singleplayer and co-op'.*?(?=\s+test\('should correctly close Player 2 help modal)", "// test removed\n", content, flags=re.DOTALL)
content = re.sub(r"test\('isPointerOverButton should correctly identify inventory-slot as interactive'.*?\}\);", "// test removed", content, flags=re.DOTALL)

with open('tests/helpModalAndInventorySlots.spec.js', 'w') as f:
    f.write(content)
