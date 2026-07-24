import time
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Go to the local server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Inject the gamepad mock script on page load before starting the game
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

        // Dispatch the connection event
        const event = new Event('gamepadconnected');
        event.gamepad = window.mockGamepad;
        window.dispatchEvent(event);
    }""")

    page.wait_for_timeout(500)

    # Click start game button on the main menu
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # 1. Simulate Y button press to open the menu modal (button index 3)
    # Press
    page.evaluate("() => window.pressMockButton(3)")
    page.wait_for_timeout(100)
    # Release
    page.evaluate("() => window.releaseMockButton(3)")
    page.wait_for_timeout(1000)

    # 2. Simulate Dpad Down press to highlight the first element (button index 13)
    # Press
    page.evaluate("() => window.pressMockButton(13)")
    page.wait_for_timeout(100)
    # Release
    page.evaluate("() => window.releaseMockButton(13)")
    page.wait_for_timeout(1000)

    # Take screenshot 1: First item focused (Party)
    page.screenshot(path="/home/jules/verification/screenshots/gamepad_focused_party.png")

    # 3. Simulate Dpad Down again to highlight the second element (Storage Box)
    # Press
    page.evaluate("() => window.pressMockButton(13)")
    page.wait_for_timeout(100)
    # Release
    page.evaluate("() => window.releaseMockButton(13)")
    page.wait_for_timeout(1000)

    # Take screenshot 2: Second item focused (Storage)
    page.screenshot(path="/home/jules/verification/screenshots/gamepad_focused_storage.png")

    # 4. Simulate A button press (button index 0) to select Storage Box
    # Press
    page.evaluate("() => window.pressMockButton(0)")
    page.wait_for_timeout(100)
    # Release
    page.evaluate("() => window.releaseMockButton(0)")
    page.wait_for_timeout(1000)

    # Take screenshot 3: Storage Modal open
    page.screenshot(path="/home/jules/verification/screenshots/storage_modal_open.png")

    # 5. Simulate X button press (button index 2) to exit/close the Storage modal
    # Press
    page.evaluate("() => window.pressMockButton(2)")
    page.wait_for_timeout(100)
    # Release
    page.evaluate("() => window.releaseMockButton(2)")
    page.wait_for_timeout(1000)

    # Take screenshot 4: Back to game
    page.screenshot(path="/home/jules/verification/screenshots/back_to_game.png")

if __name__ == "__main__":
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
