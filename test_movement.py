from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})

        page.on("console", lambda msg: print(f"Browser Console [{msg.type}]: {msg.text}"))

        page.goto("file:///app/index.html")
        page.wait_for_timeout(2000)

        page.evaluate('''
            window.io = function() {
                return { on: function() {}, emit: function() {} };
            };
            document.getElementById('lobbyModal').style.display = 'none';
            if (window.startGame) window.startGame();
        ''')
        page.wait_for_timeout(2000)

        # Let's move the player and see if grass and water load
        page.evaluate('''
            () => {
                // Move player far away
                player.x = 2000;
                player.y = 2000;
            }
        ''')

        page.wait_for_timeout(500)

        page.screenshot(path="screenshot_movement.png")
        print("Screenshot saved to screenshot_movement.png")

        # Let's check the mapData at the new location
        val = page.evaluate('''
            () => {
                let r = Math.floor(player.y / 100);
                let c = Math.floor(player.x / 100);
                let tiles = [];
                for(let i=r-2; i<=r+2; i++) {
                    for(let j=c-2; j<=c+2; j++) {
                        if (mapData[i] && mapData[i][j]) {
                            tiles.push(i+","+j+":"+mapData[i][j]);
                        }
                    }
                }
                return "Tiles near 2000,2000: " + tiles.join(" | ");
            }
        ''')
        print("Map check:", val)

        browser.close()

if __name__ == "__main__":
    run()
