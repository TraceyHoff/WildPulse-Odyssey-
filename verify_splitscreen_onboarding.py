import os
import glob
from playwright.sync_api import sync_playwright

def run_splitscreen_verification(page):
    # Setup page error and log hooks
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
    page.on("console", lambda msg: print(f"PAGE LOG: {msg.text}"))

    # Force onboarding
    page.add_init_script("window.__test_onboarding = true;")

    # Navigate to the page
    print("Navigating to game server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click Split Screen starting button
    print("Clicking 'Split Screen' starting button...")
    page.wait_for_selector("#startSplitScreenBtn", state="visible")
    page.click("#startSplitScreenBtn")
    page.wait_for_timeout(1500)

    # Both intro modals should be visible side-by-side
    print("Checking for dual side-by-side onboarding modals...")
    page.wait_for_selector("#introModal", state="visible")
    page.wait_for_selector("#introModal_p2", state="visible")
    page.screenshot(path="/home/jules/verification/screenshots/splitscreen_onboarding_slide1.png")
    page.wait_for_timeout(500)

    # Advance Player 1 slide
    print("Advancing Player 1 onboarding slide...")
    page.click("#introNextBtn")
    page.wait_for_timeout(500)

    # Advance Player 2 slide
    print("Advancing Player 2 onboarding slide...")
    page.click("#introNextBtn_p2")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/splitscreen_onboarding_slide2.png")
    page.wait_for_timeout(500)

    # Move both players to character customization
    print("Moving both players to character customization...")
    page.click("#introNextBtn")
    page.click("#introNextBtn_p2")
    page.wait_for_timeout(1500)

    # Both customization modals should be visible side-by-side
    print("Checking for dual side-by-side character customization modals...")
    page.wait_for_selector("#customizationModal", state="visible")
    page.wait_for_selector("#customizationModal_p2", state="visible")

    # Fill names
    print("Filling character names...")
    page.fill("#playerNameInput", "Neon_P1")
    page.fill("#playerNameInput_p2", "Pulse_P2")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/splitscreen_customization_simultaneous.png")
    page.wait_for_timeout(500)

    # Save both players customization via Player 1's save button
    print("Saving both player configurations using Player 1 save button...")
    page.click("#saveCustomizationBtn")
    page.wait_for_timeout(2000)

    # Check that game has started and split screen viewport is active
    print("Verifying game has started in split screen co-op mode...")
    page.wait_for_selector("#p1InventorySlots", state="visible")
    page.wait_for_selector("#p2InventorySlots", state="visible")
    page.screenshot(path="/home/jules/verification/screenshots/splitscreen_gameplay_started.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Ensure we use a clean, new browser context (no old local storage or session storage)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_splitscreen_verification(page)
        finally:
            context.close()
            browser.close()
    print("Splitscreen onboarding verification script finished successfully!")
