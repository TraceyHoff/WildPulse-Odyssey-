import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    "} else if (bType.includes('sleek') || bType.includes('lanky') || bType.includes('agile') || bType.includes('graceful')) {",
    "} else if (bType.includes('sleek') || bType.includes('lanky') || bType.includes('agile') || bType.includes('graceful') || bType.includes('slender') || bType.includes('ethereal') || bType.includes('divine') || bType.includes('floating') || bType.includes('radiant') || bType.includes('spindly') || bType.includes('sinuous')) {"
)

with open('index.html', 'w') as f:
    f.write(content)

print("done")
