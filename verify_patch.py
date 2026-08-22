import re

with open("index.html", "r") as f:
    content = f.read()

matches = re.finditer(r'if \(window\.isConsoleOrMobile && window\.isConsoleOrMobile\(\).*?\{', content)
for m in matches:
    print(m.group(0))
