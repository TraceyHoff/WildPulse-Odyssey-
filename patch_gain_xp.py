import re

with open('index.html', 'r') as f:
    content = f.read()

# For Player 2
p2_pattern = r'(if \(window\.evaluateActiveQuests\) window\.evaluateActiveQuests\(2\);\n\s*return leveledUp;)'
p2_replacement = r'if (window.evaluateActiveQuests) window.evaluateActiveQuests(2);\n        if (window.renderStatsTab) window.renderStatsTab(2);\n        return leveledUp;'

content = re.sub(p2_pattern, p2_replacement, content)

# For Player 1
p1_pattern = r'(if \(window\.evaluateActiveQuests\) window\.evaluateActiveQuests\(1\);\n\s*return leveledUp;)'
p1_replacement = r'if (window.evaluateActiveQuests) window.evaluateActiveQuests(1);\n        if (window.renderStatsTab) window.renderStatsTab(1);\n        return leveledUp;'

content = re.sub(p1_pattern, p1_replacement, content)

with open('index.html', 'w') as f:
    f.write(content)
