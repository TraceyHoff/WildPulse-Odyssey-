import re

with open('abilities.js', 'r') as f:
    content = f.read()

new_abilities = {
    "Fire": [
        {'name': "Flash", 'chance': 0.2, 'type': "speed", 'value': 1.3, 'message': "Flash blinded the opponent, increasing speed!", 'color': "#ff5722"},
        {'name': "Ember", 'chance': 0.25, 'type': "damage", 'value': 1.15, 'message': "Ember left a burning mark!", 'color': "#ff5722"},
        {'name': "Heat Wave", 'chance': 0.25, 'type': "status_enemy", 'value': "Burn", 'message': "Heat Wave enveloped the enemy!", 'color': "#ff5722"},
        {'name': "Lava Plume", 'chance': 0.2, 'type': "damage", 'value': 1.25, 'message': "Lava Plume erupted!", 'color': "#ff5722"},
        {'name': "Sunbathe", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Sunbathe absorbed energy to heal!", 'color': "#ff5722"},
        {'name': "Incinerate", 'chance': 0.25, 'type': "damage", 'value': 1.2, 'message': "Incinerate scorched the foe!", 'color': "#ff5722"}
    ],
    "Water": [
        {'name': "Aqua Ring", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Aqua Ring restored health over time!", 'color': "#2196f3"},
        {'name': "Tsunami", 'chance': 0.25, 'type': "damage", 'value': 1.3, 'message': "Tsunami crashed down on the enemy!", 'color': "#2196f3"},
        {'name': "Whirlpool", 'chance': 0.25, 'type': "status_enemy", 'value': "Confusion", 'message': "Whirlpool disoriented the opponent!", 'color': "#2196f3"},
        {'name': "Bubble Armor", 'chance': 0.2, 'type': "defense", 'value': 0.75, 'message': "Bubble Armor softened the blow!", 'color': "#2196f3"},
        {'name': "Streamline", 'chance': 0.25, 'type': "speed", 'value': 1.25, 'message': "Streamline increased speed!", 'color': "#2196f3"},
        {'name': "Geyser", 'chance': 0.2, 'type': "damage", 'value': 1.35, 'message': "Geyser launched the enemy into the air!", 'color': "#2196f3"}
    ],
    "Nature": [
        {'name': "Rooting", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Rooting absorbed nutrients to heal HP!", 'color': "#4caf50"},
        {'name': "Thorn Armor", 'chance': 0.25, 'type': "damage_recoil", 'value': 0.15, 'message': "Thorn Armor pricked the attacker!", 'color': "#4caf50"},
        {'name': "Photosynthesis", 'chance': 0.2, 'type': "clear_status", 'value': None, 'message': "Photosynthesis purged negative conditions!", 'color': "#4caf50"},
        {'name': "Vine Whip", 'chance': 0.25, 'type': "damage", 'value': 1.25, 'message': "Vine Whip struck hard!", 'color': "#4caf50"},
        {'name': "Pollen Puff", 'chance': 0.25, 'type': "status_enemy", 'value': "Sleep", 'message': "Pollen Puff put the enemy to sleep!", 'color': "#4caf50"},
        {'name': "Jungle Fury", 'chance': 0.25, 'type': "damage", 'value': 1.3, 'message': "Jungle Fury unleashed raw power!", 'color': "#4caf50"}
    ],
    "Electric": [
        {'name': "Thunderstorm", 'chance': 0.25, 'type': "damage", 'value': 1.3, 'message': "Thunderstorm rained down lightning!", 'color': "#ffeb3b"},
        {'name': "Overload", 'chance': 0.25, 'type': "status_enemy", 'value': "Paralyze", 'message': "Overload shocked the foe!", 'color': "#ffeb3b"},
        {'name': "Energy Sap", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Energy Sap drained power to heal!", 'color': "#ffeb3b"},
        {'name': "Volt Switch", 'chance': 0.25, 'type': "speed", 'value': 1.25, 'message': "Volt Switch enabled a quick maneuver!", 'color': "#ffeb3b"},
        {'name': "Faraday Cage", 'chance': 0.2, 'type': "defense", 'value': 0.75, 'message': "Faraday Cage blocked incoming damage!", 'color': "#ffeb3b"},
        {'name': "Spark", 'chance': 0.25, 'type': "damage", 'value': 1.2, 'message': "Spark ignited an extra hit!", 'color': "#ffeb3b"}
    ],
    "Ice": [
        {'name': "Blizzard", 'chance': 0.25, 'type': "damage", 'value': 1.3, 'message': "Blizzard summoned a freezing storm!", 'color': "#00bcd4"},
        {'name': "Frost Shield", 'chance': 0.2, 'type': "defense", 'value': 0.7, 'message': "Frost Shield mitigated the attack!", 'color': "#00bcd4"},
        {'name': "Ice Shard", 'chance': 0.25, 'type': "damage", 'value': 1.2, 'message': "Ice Shard pierced through!", 'color': "#00bcd4"},
        {'name': "Deep Freeze", 'chance': 0.2, 'type': "status_enemy", 'value': "Freeze", 'message': "Deep Freeze locked the opponent in ice!", 'color': "#00bcd4"},
        {'name': "Glacier", 'chance': 0.25, 'type': "damage_recoil", 'value': 0.1, 'message': "Glacier hurt the attacker on contact!", 'color': "#00bcd4"},
        {'name': "Cold Snap", 'chance': 0.25, 'type': "speed", 'value': 1.2, 'message': "Cold Snap caused a sudden chill!", 'color': "#00bcd4"}
    ],
    "Earth": [
        {'name': "Tremor", 'chance': 0.25, 'type': "damage", 'value': 1.25, 'message': "Tremor shook the ground beneath!", 'color': "#795548"},
        {'name': "Mud Slap", 'chance': 0.25, 'type': "status_enemy", 'value': "Confusion", 'message': "Mud Slap blinded the target!", 'color': "#795548"},
        {'name': "Clay Armor", 'chance': 0.2, 'type': "defense", 'value': 0.8, 'message': "Clay Armor absorbed some impact!", 'color': "#795548"},
        {'name': "Quake", 'chance': 0.2, 'type': "damage", 'value': 1.3, 'message': "Quake dealt massive damage!", 'color': "#795548"},
        {'name': "Burrow", 'chance': 0.25, 'type': "speed", 'value': 1.2, 'message': "Burrow increased evasion and speed!", 'color': "#795548"},
        {'name': "Fossilize", 'chance': 0.2, 'type': "heal", 'value': 0.1, 'message': "Fossilize restored ancient energy!", 'color': "#795548"}
    ],
    "Rock": [
        {'name': "Boulder Dash", 'chance': 0.25, 'type': "damage", 'value': 1.25, 'message': "Boulder Dash slammed the enemy!", 'color': "#9e9e9e"},
        {'name': "Granite Shield", 'chance': 0.2, 'type': "defense", 'value': 0.7, 'message': "Granite Shield held firm!", 'color': "#9e9e9e"},
        {'name': "Meteorite", 'chance': 0.25, 'type': "damage", 'value': 1.35, 'message': "Meteorite crashed with devastating force!", 'color': "#9e9e9e"},
        {'name': "Diamond Dust", 'chance': 0.2, 'type': "clear_status", 'value': None, 'message': "Diamond Dust cleared ailments!", 'color': "#9e9e9e"},
        {'name': "Pebble Storm", 'chance': 0.25, 'type': "status_enemy", 'value': "Confusion", 'message': "Pebble Storm disoriented the foe!", 'color': "#9e9e9e"},
        {'name': "Gemstone", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Gemstone radiated healing light!", 'color': "#9e9e9e"}
    ],
    "Wind": [
        {'name': "Tornado", 'chance': 0.25, 'type': "damage", 'value': 1.3, 'message': "Tornado swept the battlefield!", 'color': "#81d4fa"},
        {'name': "Draft", 'chance': 0.2, 'type': "speed", 'value': 1.35, 'message': "Draft provided a massive speed boost!", 'color': "#81d4fa"},
        {'name': "Air Pocket", 'chance': 0.25, 'type': "defense", 'value': 0.8, 'message': "Air Pocket cushioned the blow!", 'color': "#81d4fa"},
        {'name': "Zephyr", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Zephyr's gentle breeze restored HP!", 'color': "#81d4fa"},
        {'name': "Gust", 'chance': 0.25, 'type': "damage", 'value': 1.2, 'message': "Gust blew the opponent away!", 'color': "#81d4fa"},
        {'name': "Vortex", 'chance': 0.25, 'type': "status_enemy", 'value': "Confusion", 'message': "Vortex trapped the opponent!", 'color': "#81d4fa"}
    ],
    "Light": [
        {'name': "Sunbeam", 'chance': 0.25, 'type': "damage", 'value': 1.25, 'message': "Sunbeam pierced the darkness!", 'color': "#fff59d"},
        {'name': "Holy Aura", 'chance': 0.2, 'type': "clear_status", 'value': None, 'message': "Holy Aura purified the user!", 'color': "#fff59d"},
        {'name': "Flashbang", 'chance': 0.25, 'type': "status_enemy", 'value': "Confusion", 'message': "Flashbang temporarily blinded the foe!", 'color': "#fff59d"},
        {'name': "Radiance", 'chance': 0.2, 'type': "heal", 'value': 0.2, 'message': "Radiance healed severe wounds!", 'color': "#fff59d"},
        {'name': "Reflect", 'chance': 0.25, 'type': "defense", 'value': 0.75, 'message': "Reflect bounced back some force!", 'color': "#fff59d"},
        {'name': "Photon", 'chance': 0.25, 'type': "speed", 'value': 1.2, 'message': "Photon particles accelerated movement!", 'color': "#fff59d"}
    ],
    "Dark": [
        {'name': "Eclipse", 'chance': 0.25, 'type': "damage", 'value': 1.3, 'message': "Eclipse shadowed the battlefield!", 'color': "#616161"},
        {'name': "Leech", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Leech drained life from the enemy!", 'color': "#616161"},
        {'name': "Phantom", 'chance': 0.25, 'type': "speed", 'value': 1.3, 'message': "Phantom movements bewildered the foe!", 'color': "#616161"},
        {'name': "Terror", 'chance': 0.25, 'type': "status_enemy", 'value': "Paralyze", 'message': "Terror paralyzed the target!", 'color': "#616161"},
        {'name': "Void", 'chance': 0.2, 'type': "defense", 'value': 0.7, 'message': "Void absorbed the attack completely!", 'color': "#616161"},
        {'name': "Curse", 'chance': 0.25, 'type': "damage_recoil", 'value': 0.15, 'message': "Curse rebounded on the attacker!", 'color': "#616161"}
    ],
    "Cosmic": [
        {'name': "Supernova", 'chance': 0.25, 'type': "damage", 'value': 1.4, 'message': "Supernova exploded with immense energy!", 'color': "#ab47bc"},
        {'name': "Orbit", 'chance': 0.25, 'type': "speed", 'value': 1.25, 'message': "Orbit aligned, increasing speed!", 'color': "#ab47bc"},
        {'name': "Black Hole", 'chance': 0.2, 'type': "damage_recoil", 'value': 0.2, 'message': "Black Hole pulled the attacker in!", 'color': "#ab47bc"},
        {'name': "Gravity", 'chance': 0.25, 'type': "status_enemy", 'value': "Paralyze", 'message': "Gravity crushed the opponent!", 'color': "#ab47bc"},
        {'name': "Nebula", 'chance': 0.2, 'type': "clear_status", 'value': None, 'message': "Nebula wiped away all ailments!", 'color': "#ab47bc"},
        {'name': "Astral Projection", 'chance': 0.25, 'type': "defense", 'value': 0.75, 'message': "Astral Projection minimized physical harm!", 'color': "#ab47bc"}
    ],
    "Normal": [
        {'name': "Grit", 'chance': 0.25, 'type': "defense", 'value': 0.8, 'message': "Grit allowed enduring the blow!", 'color': "#9e9e9e"},
        {'name': "Fury", 'chance': 0.25, 'type': "damage", 'value': 1.25, 'message': "Fury unleashed a flurry of strikes!", 'color': "#9e9e9e"},
        {'name': "Quick Step", 'chance': 0.2, 'type': "speed", 'value': 1.3, 'message': "Quick Step dodged the worst of it!", 'color': "#9e9e9e"},
        {'name': "Recovery", 'chance': 0.2, 'type': "heal", 'value': 0.15, 'message': "Recovery slowly mended wounds!", 'color': "#9e9e9e"},
        {'name': "Yawn", 'chance': 0.25, 'type': "status_enemy", 'value': "Sleep", 'message': "Yawn made the enemy drowsy!", 'color': "#9e9e9e"},
        {'name': "Double Strike", 'chance': 0.25, 'type': "damage", 'value': 1.2, 'message': "Double Strike hit twice as hard!", 'color': "#9e9e9e"}
    ]
}

def dict_to_js(d):
    def format_val(v):
        if v is None: return "null"
        if isinstance(v, str): return f'"{v}"'
        return str(v)

    js = "{\n"
    for k, v in d.items():
        js += f'        {{name: "{v["name"]}", chance: {v["chance"]}, type: "{v["type"]}", value: {format_val(v["value"])}, message: "{v["message"]}", color: "{v["color"]}"}},\n'
    return js

for type_name, abilities in new_abilities.items():
    # find where to insert
    # insert at the end of the list for each type

    # We can match `    "Type": [\n...    ],\n`
    pattern = r'(\s*"' + type_name + r'":\s*\[)(.*?)(\s*\])'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_list = match.group(2)
        if not old_list.endswith(','):
            old_list += ','

        new_items = ""
        for v in abilities:
            val_str = "null" if v['value'] is None else (f'"{v["value"]}"' if isinstance(v['value'], str) else str(v['value']))
            new_items += f'\n        {{name: "{v["name"]}", chance: {v["chance"]}, type: "{v["type"]}", value: {val_str}, message: "{v["message"]}", color: "{v["color"]}"}},'

        new_items = new_items.rstrip(',')

        replacement = match.group(1) + old_list + new_items + match.group(3)
        content = content[:match.start()] + replacement + content[match.end():]


with open('abilities.js', 'w') as f:
    f.write(content)
