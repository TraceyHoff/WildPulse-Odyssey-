from playwright.sync_api import sync_playwright
import time

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Click through start menu using keyboard interactions or evaluating javascript since UI buttons might not be simple DOM buttons or their IDs are different.
        time.sleep(3)
        page.evaluate("if(window.startGameSession) window.startGameSession();")
        time.sleep(1)
        page.evaluate("if(window.startGame) window.startGame(1);") # Start single player

        time.sleep(3)
        # spawn a creature right next to player to guarantee it's on screen
        page.evaluate("""
        if(window.currentPlayer) {
            let type = 'Fire'; // ensure it gets an icon
            let creature = {
                name: 'TestBurner',
                baseName: 'TestBurner',
                type: 'Fire',
                level: 5,
                maxHp: 20,
                hp: 20,
                attack: 10,
                defense: 10,
                speed: 10,
                baseCreatureInfo: window.baseCreatures['Ignis']
            };
            // force a spawn near player
            window.spawnCreature(window.currentPlayer.x + 50, window.currentPlayer.y + 50, false, false, creature);
        }
        """)
        time.sleep(1)
        page.screenshot(path="/home/jules/verification/screenshots/verification2.png")
        browser.close()

if __name__ == "__main__":
    verify()
