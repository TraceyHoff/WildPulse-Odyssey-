import os
from playwright.sync_api import sync_playwright

def run_verification():
    print("Starting Playwright verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Record video of verification
        context = browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir="verification_videos"
        )
        page = context.new_page()

        # Navigate to local server
        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)

        # 1. Take screenshot of Main Menu
        print("Capturing Main Menu...")
        os.makedirs("verification_screenshots", exist_ok=True)
        page.screenshot(path="verification_screenshots/inventory_wheel_main_menu.png")

        # 2. Click Start Game button
        print("Clicking 'Single Player' button to start game...")
        page.click("#startGameBtn")
        page.wait_for_timeout(2000)

        # Confirm player is loaded and active
        page.wait_for_function("typeof window.player !== 'undefined' && window.player && window.player.body")
        print("Game session started successfully! Player is active.")

        # 3. Verify screen-space inventory slot hiding
        print("Verifying screen-space inventory slots are hidden...")
        hidden = page.evaluate("const slots = document.querySelectorAll('.inventory-slot'); Array.from(slots).every(el => window.getComputedStyle(el).display === 'none')")
        print(f"Are all .inventory-slot elements hidden? {hidden}")
        assert hidden, "Expected .inventory-slot elements to be hidden on-screen!"

        # Capture gameplay screenshot showing hidden slots but visible HUD
        page.screenshot(path="verification_screenshots/inventory_wheel_gameplay_hidden_slots.png")

        # 4. Press and hold Key I
        print("Pressing and holding down Key 'I'...")
        page.keyboard.down("i")
        page.wait_for_timeout(1000)

        # Verify Inventory Wheel is visible
        wheel_visible = page.evaluate("window.getComputedStyle(document.getElementById('inventoryWheelModal')).display !== 'none'")
        print(f"Is inventoryWheelModal visible? {wheel_visible}")
        assert wheel_visible, "Expected inventoryWheelModal to be visible when 'I' is held!"

        # Capture screenshot showing Inventory Wheel open
        page.screenshot(path="verification_screenshots/inventory_wheel_modal_open.png")

        # 5. Release Key I
        print("Releasing Key 'I'...")
        page.keyboard.up("i")
        page.wait_for_timeout(1000)

        # Verify Inventory Wheel is hidden
        wheel_visible_after = page.evaluate("window.getComputedStyle(document.getElementById('inventoryWheelModal')).display !== 'none'")
        print(f"Is inventoryWheelModal visible after key release? {wheel_visible_after}")
        assert not wheel_visible_after, "Expected inventoryWheelModal to be hidden when 'I' is released!"

        # Capture final screenshot
        page.screenshot(path="verification_screenshots/inventory_wheel_modal_closed.png")

        context.close()
        browser.close()
    print("Verification completed successfully and passed all assertions!")

if __name__ == "__main__":
    run_verification()
