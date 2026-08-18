from playwright.sync_api import sync_playwright
import time

def verify_level_up_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:3000')

        # Try to start the game directly, bypassing login if possible
        try:
            # wait for ready
            page.wait_for_selector('#startScreen', state='visible', timeout=5000)
            page.click('#startBtn')
        except Exception as e:
            print("login err:", e)

        time.sleep(5)

        # Force the level up modal to display with our mock text
        page.evaluate('''() => {
            const levelUpModal = document.getElementById('levelUpModal');
            const levelUpTitle = document.getElementById('levelUpTitle');
            const levelUpStats = document.getElementById('levelUpStats');

            levelUpModal.style.display = 'block';
            levelUpModal.style.zIndex = '9999999';
            levelUpTitle.innerText = "Flamepup Leveled Up!";

            const statsHtml = "<div style='color: #00ffcc; text-shadow: 0 0 5px #00ffcc; margin-bottom: 10px;'>Player 1 leveled up to Level 5!</div>" +
                              "HP: 10 -> 12<br>" +
                              "Attack: 5 -> 6<br>";

            levelUpStats.innerHTML = statsHtml;
        }''')

        # Take a screenshot
        page.screenshot(path='/home/jules/verification/screenshots/level_up_modal3.png')
        browser.close()

if __name__ == "__main__":
    verify_level_up_modal()
