from playwright.sync_api import sync_playwright
import time
import os

def run_cuj(page):
    # Navigate to the game
    page.goto("http://localhost:3000")
    page.wait_for_timeout(500)

    # Bypass the start modal to reach the game directly
    page.evaluate("sessionStorage.setItem('wildpulse_skip_start_modal', 'true')")
    page.reload()
    page.wait_for_timeout(1000)

    # Click Menu Button
    page.wait_for_selector("#menuBtn")
    page.click("#menuBtn")
    page.wait_for_timeout(500)

    # Trigger Co-op toggle to show Player 1/Player 2 option
    page.click("#coopToggleBtn")
    page.wait_for_timeout(1000)

    # Open Menu again
    page.click("#menuBtn")
    page.wait_for_timeout(500)

    # Click Customize Button in Menu
    page.click("#menuCustomizeBtn")
    page.wait_for_timeout(1000)

    # Change Player 1 name
    page.fill("#playerNameInput", "P1_Hero")
    page.wait_for_timeout(500)

    # Click Player 2 Select Button
    page.click("#customSelectP2")
    page.wait_for_timeout(1000)

    # Change Player 2 name
    page.fill("#playerNameInput", "P2_Sidekick")
    page.wait_for_timeout(500)

    # Take screenshot of the customization modal with P2 selected
    page.screenshot(path="/home/jules/verification/screenshots/verification_customization.png")
    page.wait_for_timeout(500)

    # Save customization
    page.click("#saveCustomizationBtn")
    page.wait_for_timeout(1000)

    # Take screenshot of the game with the customized names/visuals active
    page.screenshot(path="/home/jules/verification/screenshots/verification_gameplay.png")
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
