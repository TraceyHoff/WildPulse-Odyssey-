import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Go to the local game server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start button
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # Enable co-op
    page.evaluate("window.enableCoop(game.scene.scenes[0]);")
    page.wait_for_timeout(1000)

    # 1. Test Trade Modal
    print("Opening Local Trade Modal...")
    page.evaluate("window.openTradeModal();")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification_screenshots/verification_trade_modal.png")

    # Close Trade Modal
    page.evaluate("window.closeTradeModal();")
    page.wait_for_timeout(1000)

    # 2. Test PvP Battle
    print("Opening Local PvP Battle Modal...")
    page.evaluate("window.openPvpModal();")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification_screenshots/verification_pvp_battle.png")

    # Flee the battle to close cleanly
    page.evaluate("window.handlePlayerTurn('run');")
    page.wait_for_timeout(2000)
    page.screenshot(path="verification_screenshots/verification_battle_end.png")

if __name__ == "__main__":
    os.makedirs("verification_screenshots", exist_ok=True)
    os.makedirs("verification_videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification_videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
