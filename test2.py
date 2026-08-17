import re
with open('index.html', 'r') as f:
    text = f.read()

match = re.search(r'function generateTileTextures\(scene\)\s*\{', text)
if match:
    start = match.start()
    open_braces = 0
    i = start
    while i < len(text):
        if text[i] == '{':
            open_braces += 1
        elif text[i] == '}':
            open_braces -= 1
            if open_braces == 0:
                print("Found end at", i)
                print("Extracting end of function:")
                print(text[i-500:i+10])
                break
        i += 1
