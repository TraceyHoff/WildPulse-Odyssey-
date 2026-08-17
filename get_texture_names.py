import re
import sys

def main():
    with open("index.html", "r") as f:
        content = f.read()

    matches = re.findall(r"scene\.textures\.addCanvas\('([^']+)', ([^)]+)\);", content)
    for name, canvas in matches:
        if name.startswith("furniture_"):
            print(name)

if __name__ == "__main__":
    main()
