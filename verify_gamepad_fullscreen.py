import time
from playwright.sync_api import sync_playwright

def run_test(page):
    # Print console logs
    page.on("console", lambda msg: print(f"BROWSER_LOG: {msg.text}"))

    # Go to the local server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Inject the gamepad mock script on page load
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

        // Instrument the handleFullscreenToggle
        window.fullscreenToggleCalled = false;
        const originalToggle = window.handleFullscreenToggle;
        window.handleFullscreenToggle = () => {
            window.fullscreenToggleCalled = true;
            if (originalToggle) {
                try {
                    originalToggle();
                } catch (e) {
                    // Ignore fullscreen permission errors in headless env
                }
            }
        };
    }""")

    page.wait_for_timeout(500)

    # Click start game button on the main menu
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # Add console logger in processGamepadInputForPlayer
    page.evaluate("""() => {
        const orig = window.processGamepadInputForPlayer;
        window.processGamepadInputForPlayer = function(playerNum, pad) {
            const stateKey = `gamepadPrevState_P${playerNum}`;
            const prev = window[stateKey];
            const currY = !!(pad.buttons[3] && pad.buttons[3].pressed);
            if (currY) {
                console.log("processGamepadInputForPlayer called: currY=true, prev.Y=" + (prev ? prev.Y : 'undefined') + ", elapsed=" + (prev ? (Date.now() - prev.YPressedTime) : 'N/A'));
            }
            orig(playerNum, pad);
        };
    }""")

    # 1. Verify tapping Y button (press and release under 1000ms) opens the menu modal
    print("Simulating button Y tap...")
    page.evaluate("() => window.pressMockButton(3)")
    page.wait_for_timeout(200) # held for 200ms
    page.evaluate("() => window.releaseMockButton(3)")
    page.wait_for_timeout(1000)

    # Check if menu modal is visible
    menu_visible = page.is_visible("#menuModal")
    print(f"Is menu modal open after tap? {menu_visible}")
    assert menu_visible, "Menu modal should be open after a tap on Y button!"

    # Close the menu modal to reset state
    page.click(".close-menu-btn")
    page.wait_for_timeout(500)
    assert not page.is_visible("#menuModal"), "Menu modal should be closed."

    # Reset toggle tracking flag
    page.evaluate("() => { window.fullscreenToggleCalled = false; }")

    # 2. Verify holding Y button down for >= 1000ms triggers fullscreen and does NOT open menu modal on release
    print("Simulating holding Y button down for 2.5 seconds...")
    page.evaluate("() => window.pressMockButton(3)")

    # Wait for 2.5 seconds while button remains pressed
    page.wait_for_timeout(2500)

    # Check if fullscreen toggle was called during hold
    fullscreen_called = page.evaluate("() => window.fullscreenToggleCalled")
    print(f"Was fullscreen toggle called during hold? {fullscreen_called}")
    assert fullscreen_called, "Fullscreen toggle should have been called after holding for >= 1000ms!"

    # Release the Y button now
    print("Releasing Y button after hold...")
    page.evaluate("() => window.releaseMockButton(3)")
    page.wait_for_timeout(1000)

    # Check if menu modal is open (it should NOT be)
    menu_visible_after_hold = page.is_visible("#menuModal")
    print(f"Is menu modal open after release? {menu_visible_after_hold}")
    assert not menu_visible_after_hold, "Menu modal should NOT be open after releasing a held Y button!"

    print("All gamepad hold-for-fullscreen assertions passed successfully!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_test(page)
        finally:
            context.close()
            browser.close()
