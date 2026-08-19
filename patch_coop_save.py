import re

with open('index.html', 'r') as f:
    content = f.read()

old_code = """    // Periodically save player position (every ~1000ms)
    if (shouldSave) {
        localStorage.setItem('wildpulse_player_x', player.x);
        localStorage.setItem('wildpulse_player_y', player.y);
        window.lastSaveTime = now;
    }"""

new_code = """    // Periodically save player position (every ~1000ms)
    if (shouldSave) {
        localStorage.setItem('wildpulse_player_x', player.x);
        localStorage.setItem('wildpulse_player_y', player.y);
        if (window.coopActive && window.player2) {
            localStorage.setItem('wildpulse_player2_x', window.player2.x);
            localStorage.setItem('wildpulse_player2_y', window.player2.y);
        }
        window.lastSaveTime = now;
    }"""

if old_code in content:
    content = content.replace(old_code, new_code)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Patched saving P2 position successfully.")
else:
    print("Could not find the saving P2 position code.")


old_code_2 = """    // 1. Create Player 2 sprite next to Player 1 (or default spawning if player doesn't exist)
    const basePlayerX = isNewGame ? 10050 : ((player && typeof player.x === 'number') ? player.x : 10550);
    const basePlayerY = isNewGame ? 9950 : ((player && typeof player.y === 'number') ? player.y : 10550);
    const p2X = isNewGame ? 10050 : Phaser.Math.Clamp(basePlayerX + 50, 100, WORLD_SIZE - 100);
    const p2Y = isNewGame ? 9950 : Phaser.Math.Clamp(basePlayerY, 100, WORLD_SIZE - 100);"""

new_code_2 = """    // 1. Create Player 2 sprite next to Player 1 (or default spawning if player doesn't exist)
    const savedP2X = localStorage.getItem('wildpulse_player2_x');
    const savedP2Y = localStorage.getItem('wildpulse_player2_y');
    const basePlayerX = isNewGame ? 10050 : ((player && typeof player.x === 'number') ? player.x : 10550);
    const basePlayerY = isNewGame ? 9950 : ((player && typeof player.y === 'number') ? player.y : 10550);

    let p2X = isNewGame ? 10050 : Phaser.Math.Clamp(basePlayerX + 50, 100, WORLD_SIZE - 100);
    let p2Y = isNewGame ? 9950 : Phaser.Math.Clamp(basePlayerY, 100, WORLD_SIZE - 100);

    if (savedP2X && savedP2Y && !isNewGame) {
        let p2Col = Math.floor(parseFloat(savedP2X) / 100);
        let p2Row = Math.floor(parseFloat(savedP2Y) / 100);
        if (mapData[p2Row] && (mapData[p2Row][p2Col] === 'grass' || mapData[p2Row][p2Col] === 'home_floor' || mapData[p2Row][p2Col] === 'rift_floor')) {
            p2X = parseFloat(savedP2X);
            p2Y = parseFloat(savedP2Y);
        }
    }"""


if old_code_2 in content:
    content = content.replace(old_code_2, new_code_2)
    with open('index.html', 'w') as f:
        f.write(content)
    print("Patched loading P2 position successfully.")
else:
    print("Could not find the loading P2 position code.")
