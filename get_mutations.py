import re

with open("index.html") as f:
    text = f.read()

# find mutations
match = re.search(r'window\.mutations\s*=\s*\[(.*?)\];', text, re.DOTALL)
if match:
    print(match.group(0)[:500])
