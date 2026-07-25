import os
import time
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Navigate to local server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Inject gamepad mock script on page load before starting the game
    page.evaluate("""() => {
        window.mockGamepad = {
            id: "Standard Gamepad",
            index: 0,
            connected: true,
            mapping: "standard",
            buttons: Array.from({ length: 17 }, () => ({ pressed: false, touched: false, value: 0 })),
            axes: [0, 0, 0, 0],
            leftStick: { x: 0, y: 0 },
            rightStick: { x: 0, y: 0 }
        };

        navigator.getGamepads = () => [window.mockGamepad];

        window.pressMockButton = (index) => {
            window.mockGamepad.buttons[index].pressed = true;
            window.mockGamepad.buttons[index].value = 1.0;
        };

        window.releaseMockButton = (index) => {
            window.mockGamepad.buttons[index].pressed = false;
            window.mockGamepad.buttons[index].value = 0.0;
        };

        // Dispatch connection event
        const event = new Event('gamepadconnected');
        event.gamepad = window.mockGamepad;
        window.dispatchEvent(event);
    }""")
    page.wait_for_timeout(500)

    # 1. StartModal Gamepad Navigation (Main Menu)
    print("Main menu dpad down press...")
    page.evaluate("() => window.pressMockButton(13)") # Dpad Down
    page.wait_for_timeout(100)
    page.evaluate("() => window.releaseMockButton(13)")
    page.wait_for_timeout(500)

    # Take screenshot of first main menu button highlighted
    page.screenshot(path="/home/jules/verification/screenshots/menu_gamepad_highlight_1.png")
    page.wait_for_timeout(500)

    print("Main menu dpad down press again...")
    page.evaluate("() => window.pressMockButton(13)") # Dpad Down again
    page.wait_for_timeout(100)
    page.evaluate("() => window.releaseMockButton(13)")
    page.wait_for_timeout(500)

    # Take screenshot of second main menu button highlighted
    page.screenshot(path="/home/jules/verification/screenshots/menu_gamepad_highlight_2.png")
    page.wait_for_timeout(500)

    # Click start game to enter gameplay
    print("Clicking Start Game button...")
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # Ensure inventory has some items to show focus
    page.evaluate("""() => {
        window.p1Inventory = [
            { name: "Repellent", quantity: 3 },
            { name: "Jank Juice", quantity: 5 }
        ];
        window.saveInventory();
        if (window.updateInventoryUI) window.updateInventoryUI();
    }""")
    page.wait_for_timeout(500)

    # Take screenshot of gameplay with inventory slots visible
    page.screenshot(path="/home/jules/verification/screenshots/gameplay_normal_inventory.png")
    page.wait_for_timeout(500)

    # 2. Simulate holding Left Bumper (button index 4)
    print("Holding Left Bumper...")
    page.evaluate("() => window.pressMockButton(4)")
    page.wait_for_timeout(1000)

    # Take screenshot showing Left Bumper focus (slots highlighted)
    page.screenshot(path="/home/jules/verification/screenshots/gameplay_lb_held_focused.png")
    page.wait_for_timeout(500)

    # 3. Simulate Dpad Right to select the second slot
    print("Pressing Dpad Right while holding LB...")
    page.evaluate("() => window.pressMockButton(15)") # Dpad Right
    page.wait_for_timeout(100)
    page.evaluate("() => window.releaseMockButton(15)")
    page.wait_for_timeout(1000)

    # Take screenshot showing second slot highlighted
    page.screenshot(path="/home/jules/verification/screenshots/gameplay_lb_held_slot_2.png")
    page.wait_for_timeout(500)

    # 4. Simulate A button press (button index 0) to use Jank Juice in second slot
    print("Pressing A to use item...")
    page.evaluate("() => window.pressMockButton(0)") # A button
    page.wait_for_timeout(100)
    page.evaluate("() => window.releaseMockButton(0)")
    page.wait_for_timeout(1000)

    # Take screenshot showing item usage notification
    page.screenshot(path="/home/jules/verification/screenshots/gameplay_item_used.png")
    page.wait_for_timeout(500)

    # 5. Release Left Bumper
    print("Releasing Left Bumper...")
    page.evaluate("() => window.releaseMockButton(4)")
    page.wait_for_timeout(1000)

    # Take final screenshot showing focus outline cleared
    page.screenshot(path="/home/jules/verification/screenshots/gameplay_lb_released.png")
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
    print("Verification script run complete!")
