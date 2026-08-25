import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    status_search = """        let color = target === currentPlayer ? "#2196F3" : "#f44336";"""
    status_replace = """        let color = target === window.currentPlayer ? "#2196F3" : "#f44336";"""

    if status_search in html:
        html = html.replace(status_search, status_replace)
        print("Patched applyStatusEffect color logic.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
