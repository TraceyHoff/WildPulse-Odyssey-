import re

with open('index.html', 'r') as f:
    content = f.read()

render_stats_tab_replacement = """window.renderStatsTab = function(playerNum = 1) {
    let years = Math.floor(wildpulse_inGameDays / 120);
    let months = Math.floor((wildpulse_inGameDays % 120) / 20);
    let days = wildpulse_inGameDays % 20;

    let hours = Math.floor(dayNightTime);
    let minutes = Math.floor((dayNightTime % 1) * 60);

    let period = hours >= 12 ? 'PM' : 'AM';
    let displayHours = hours % 12;
    if (displayHours === 0) displayHours = 12;

    let hStr = displayHours < 10 ? '0' + displayHours : displayHours.toString();
    let mStr = minutes < 10 ? '0' + minutes : minutes.toString();
    let timeStr = hStr + ":" + mStr + " " + period;

    const stats = playerNum === 2 ? window.gameStats2 : window.gameStats;
    const targetEl = playerNum === 2 ? document.getElementById('statsTabContent_P2') : (document.getElementById('statsTabContent_P1') || document.getElementById('statsTabContent'));

    let currentXp = playerNum === 2 ? (window.p2Xp || 0) : (window.p1Xp || 0);
    let currentLevel = playerNum === 2 ? (window.p2Level || 1) : (window.p1Level || 1);
    let reqXp = window.getPlayerXpRequirement(currentLevel);
    let xpPercent = Math.min(100, Math.max(0, Math.floor((currentXp / reqXp) * 100)));

    if (targetEl && stats) {
        targetEl.innerHTML = `
            <div style="padding: 10px; background: rgba(0,0,0,0.5); border-radius: 8px;">
                <p><strong>Time Played:</strong></p>
                <p>Years: <span style="color:#2196F3">${years}</span></p>
                <p>Months: <span style="color:#2196F3">${months}</span></p>
                <p>Days: <span style="color:#2196F3">${days}</span></p>
                <p><strong>Current Season:</strong> <span style="color:#ffb74d">${window.currentSeason}</span></p>
                <p><strong>Current Time:</strong> <span style="color:#ffb74d">${timeStr}</span></p>

                <p><strong>Game Stats (Player ${playerNum}):</strong></p>
                <div style="margin-bottom: 10px;">
                    <p style="margin-bottom: 5px;">Experience: <span style="color:#ffeb3b">${currentXp}</span> / <span style="color:#ffeb3b">${reqXp}</span> (Level <span style="color:#ffeb3b">${currentLevel}</span>)</p>
                    <div style="width: 100%; background: #333; border-radius: 4px; overflow: hidden; border: 1px solid #555;">
                        <div style="width: ${xpPercent}%; background: linear-gradient(90deg, #ff9800, #ffeb3b); height: 12px; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                <p>Battles Won: <span style="color:#4caf50">${stats.battlesWon || 0}</span></p>
                <p>Battles Lost: <span style="color:#f44336">${stats.battlesLost || 0}</span></p>
                <p>Creatures Traded: <span style="color:#2196F3">${stats.creaturesTraded || 0}</span></p>
                <p>PvP Battles Won: <span style="color:#4caf50">${stats.pvpBattlesWon || 0}</span></p>
                <p>PvP Battles Lost: <span style="color:#f44336">${stats.pvpBattlesLost || 0}</span></p>
                <p>Distance Traveled: <span style="color:#2196F3">${Math.floor(stats.distanceTraveled || 0)}</span> px</p>
            </div>
        `;
    }
};"""

# Use regex to replace the function definition
content = re.sub(r'window\.renderStatsTab = function\(playerNum = 1\) \{.*?\};\n', render_stats_tab_replacement + '\n', content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)
