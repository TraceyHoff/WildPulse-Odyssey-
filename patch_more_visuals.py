import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Need to make sure css animations match the new visual intensity if we want.
    # We can also dynamically inject better CSS for generalPulse, fireSparkle, etc.
    # Currently generalPulse is already there.

    vis_search6 = """        pulse2.style.top = '0';"""
    vis_replace6 = """        pulse2.style.top = '20%';
        pulse2.style.left = '20%';
        pulse2.style.width = '60%';
        pulse2.style.height = '60%';
        pulse2.style.borderRadius = '50%';
        pulse2.style.border = `4px solid ${abilityColor}`;
        pulse2.style.boxShadow = `0 0 20px ${abilityColor}`;
        pulse2.style.animation = 'generalPulse 0.6s ease-out forwards';
        pulse2.style.animationDelay = '0.1s';
        effectContainer.appendChild(pulse2);"""

    if vis_search6 in html:
        html = html.replace(vis_search6, vis_replace6)
        print("Patched pulse2.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
