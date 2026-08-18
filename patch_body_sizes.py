import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    "} else if (bSize.includes('tiny') || bSize.includes('miniscule') || bSize.includes('diminutive') || bSize.includes('small') || bSize.includes('petite') || bSize.includes('microscopic') || bSize.includes('nano')) {",
    "} else if (bSize.includes('tiny') || bSize.includes('miniscule') || bSize.includes('diminutive') || bSize.includes('small') || bSize.includes('petite') || bSize.includes('microscopic') || bSize.includes('nano') || bSize.includes('medium') || bSize.includes('rotund')) {"
)

content = content.replace(
    "} else if (bSize.includes('slender') || bSize.includes('graceful')) {",
    "} else if (bSize.includes('slender') || bSize.includes('graceful') || bSize.includes('floating')) {"
)


with open('index.html', 'w') as f:
    f.write(content)

print("done")
