import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Make visuals more intense!
    # Update fire to have more particles and screen shake.

    vis_search = """    if (effectType === 'fire') {
        for (let i = 0; i < 12; i++) {"""

    vis_replace = """    window.triggerAnimation(isPlayerUser ? 'pSprite' : 'eSprite', 'shake', 200);
    if (effectType === 'fire') {
        for (let i = 0; i < 25; i++) {"""

    if vis_search in html:
        html = html.replace(vis_search, vis_replace)
        print("Patched fire visuals.")

    vis_search2 = """    } else if (effectType === 'water') {
        for (let i = 0; i < 8; i++) {"""

    vis_replace2 = """    } else if (effectType === 'water') {
        for (let i = 0; i < 20; i++) {"""

    if vis_search2 in html:
        html = html.replace(vis_search2, vis_replace2)
        print("Patched water visuals.")

    vis_search3 = """    } else if (effectType === 'nature') {
        const leaves = ['🍃', '🍂', '🌿', '🌱'];
        for (let i = 0; i < 6; i++) {"""

    vis_replace3 = """    } else if (effectType === 'nature') {
        const leaves = ['🍃', '🍂', '🌿', '🌱', '🌸', '🌻'];
        for (let i = 0; i < 15; i++) {"""

    if vis_search3 in html:
        html = html.replace(vis_search3, vis_replace3)
        print("Patched nature visuals.")

    vis_search4 = """    } else if (effectType === 'electric') {
        for (let i = 0; i < 3; i++) {"""

    vis_replace4 = """    } else if (effectType === 'electric') {
        for (let i = 0; i < 8; i++) {"""

    if vis_search4 in html:
        html = html.replace(vis_search4, vis_replace4)
        print("Patched electric visuals.")

    vis_search5 = """    } else {
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.top = '10%';"""

    vis_replace5 = """    } else {
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.top = '10%';
        pulse.style.left = '10%';
        pulse.style.width = '80%';
        pulse.style.height = '80%';
        pulse.style.borderRadius = '50%';
        pulse.style.border = `8px solid ${abilityColor}`;
        pulse.style.boxShadow = `0 0 25px ${abilityColor}, inset 0 0 25px ${abilityColor}`;
        pulse.style.animation = 'generalPulse 0.4s ease-out forwards';
        effectContainer.appendChild(pulse);

        const pulse2 = document.createElement('div');
        pulse2.style.position = 'absolute';
        pulse2.style.top = '0';"""

    if vis_search5 in html:
        html = html.replace(vis_search5, vis_replace5)
        print("Patched general pulse visuals.")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    main()
