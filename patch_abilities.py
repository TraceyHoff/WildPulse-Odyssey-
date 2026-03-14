import re
import json

with open('index.html', 'r') as f:
    content = f.read()

with open('new_abilities.json', 'r') as f:
    new_abilities = json.load(f)

# Replace the window.abilities object
start_idx = content.find("window.abilities = {")
if start_idx != -1:
    end_idx = content.find("};\n\nwindow.natures", start_idx)

    # Check if we found the end
    if end_idx != -1:
        # Generate the new JS object string
        js_lines = ["window.abilities = {"]
        for t, ab_list in new_abilities.items():
            js_lines.append(f'    "{t}": [')
            for i, ab in enumerate(ab_list):
                val_str = "null" if ab['value'] is None else (f'"{ab["value"]}"' if isinstance(ab['value'], str) else str(ab['value']))
                line = f'        {{name: "{ab["name"]}", chance: {ab["chance"]}, type: "{ab["type"]}", value: {val_str}, message: "{ab["message"]}", color: "{ab["color"]}"}}'
                if i < len(ab_list) - 1:
                    line += ","
                js_lines.append(line)
            line_end = "    ]," if t != "Normal" else "    ]"
            js_lines.append(line_end)
        js_lines.append("};")

        new_str = "\n".join(js_lines)

        content = content[:start_idx] + new_str + content[end_idx + 2:]

        with open('index.html', 'w') as f:
            f.write(content)
        print("Updated window.abilities successfully.")
    else:
        print("Could not find end of window.abilities")
else:
    print("Could not find window.abilities")
