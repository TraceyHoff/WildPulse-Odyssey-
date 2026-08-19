from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(500)

    # Bypass intro
    page.keyboard.press('Enter')
    page.wait_for_timeout(1000)

    # Execute custom setup to put player in home
    page.evaluate('''() => {
        window.playerVx = 0;
        window.playerVy = 0;
        window.p1x = 57900;
        window.p1y = 57900;
        window.isPlayerInsideHome = (playerNum) => true;
        window.p1HomeCenter = { x: 57900, y: 57900 };

        localStorage.clear();
        window.p1Inventory = [
            { name: 'HP Booster', quantity: 2 },
            { name: 'Attack Booster', quantity: 1 }
        ];

        document.getElementById('inventoryWheelModal').style.display = 'flex';
        window.updateInventoryWheelUI(1);
    }''')

    page.wait_for_timeout(1000)

    # Click Chest option on Wheel
    page.evaluate("window.useInventoryWheelOption(1, 'chest')")
    page.wait_for_timeout(1000)

    # Deposit an item
    page.evaluate("window.depositItemIntoChest(1, 0)")
    page.wait_for_timeout(1000)

    # Take screenshot of final state
    page.screenshot(path="/home/jules/verification/screenshots/home_chest_verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
