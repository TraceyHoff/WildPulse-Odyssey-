import re
with open('index.html', 'r') as f:
    text = f.read()

# find where generateTileTextures ends
match = re.search(r'function generateTileTextures\(scene\)\s*\{', text)
if match:
    start = match.start()
    open_braces = 0
    in_string = False
    string_char = ''
    i = start
    while i < len(text):
        if text[i] == '{' and not in_string:
            open_braces += 1
        elif text[i] == '}' and not in_string:
            open_braces -= 1
            if open_braces == 0:
                print("Found end of generateTileTextures at", i)
                break
        elif text[i] in ['"', "'", '`']:
            if not in_string:
                in_string = True
                string_char = text[i]
            elif text[i] == string_char and text[i-1] != '\\':
                in_string = False
        i += 1
