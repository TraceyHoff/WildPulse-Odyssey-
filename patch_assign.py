import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    assign_search = """    const dmgAbilities = typeAbilities.filter(a => a.type === 'direct_damage' || a.type === 'damage' || a.type === 'damage_recoil');
    const supportAbilities = typeAbilities.filter(a => a.type !== 'direct_damage' && a.type !== 'damage' && a.type !== 'damage_recoil');"""

    assign_replace = """    const dmgAbilities = typeAbilities.filter(a => ['direct_damage', 'damage', 'damage_recoil', 'charge_attack', 'status_inflict'].includes(a.type));
    const supportAbilities = typeAbilities.filter(a => !['direct_damage', 'damage', 'damage_recoil', 'charge_attack', 'status_inflict'].includes(a.type));"""

    if assign_search in html:
        html = html.replace(assign_search, assign_replace)
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Successfully patched assign abilities.")
    else:
        print("Could not find assign abilities logic to patch.")

if __name__ == '__main__':
    main()
