import time
from playwright.sync_api import sync_playwright

def run_test(page):
    # Print console logs
    page.on("console", lambda msg: print(f"BROWSER_LOG: {msg.text}"))

    # Go to the local server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Inject the gamepad mock script on page load and instrument fullscreen functions
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

        // Instrument requestFullscreen
        window.fullscreenCalledOnStart = false;
        if (typeof Element !== 'undefined' && Element.prototype) {
            const origRequest = Element.prototype.requestFullscreen;
            Element.prototype.requestFullscreen = function(...args) {
                window.fullscreenCalledOnStart = true;
                return Promise.resolve(); // Resolves directly in headless browser
            };
        }

        // Instrument exitFullscreen
        window.exitFullscreenCalled = false;
        if (typeof document !== 'undefined') {
            document.exitFullscreen = function() {
                window.exitFullscreenCalled = true;
                return Promise.resolve();
            };
        }

        // Instrument handleFullscreenToggle (legacy check)
        window.fullscreenToggleCalled = false;
        window.handleFullscreenToggle = () => {
            window.fullscreenToggleCalled = true;
        };
    }""")

    page.wait_for_timeout(500)

    # Click start game button on the main menu and verify it triggers automatic fullscreen!
    print("Clicking start game button...")
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # Assert that entering the game automatically requested fullscreen
    fullscreen_on_start = page.evaluate("() => window.fullscreenCalledOnStart")
    print(f"Was fullscreen automatically called on entering the game? {fullscreen_on_start}")
    assert fullscreen_on_start, "Entering the game must automatically put the game in fullscreen mode!"

    # Add console logger in processGamepadInputForPlayer
    page.evaluate("""() => {
        const orig = window.processGamepadInputForPlayer;
        window.processGamepadInputForPlayer = function(playerNum, pad) {
            const stateKey = `gamepadPrevState_P${playerNum}`;
            const prev = window[stateKey];
            const currY = !!(pad.buttons[3] && pad.buttons[3].pressed);
            if (currY) {
                console.log("processGamepadInputForPlayer called: currY=true, prev.Y=" + (prev ? prev.Y : 'undefined'));
            }
            orig(playerNum, pad);
        };
    }""")

    # 1. Verify tapping Start button (button 9) (press and release) opens the menu modal
    print("Simulating button Start tap...")
    page.evaluate("() => window.pressMockButton(9)")
    page.wait_for_timeout(200)
    page.evaluate("() => window.releaseMockButton(9)")
    page.wait_for_timeout(1000)

    # Check if menu modal is visible
    menu_visible = page.is_visible("#menuModal")
    print(f"Is menu modal open after Start tap? {menu_visible}")
    assert menu_visible, "Menu modal should be open after a tap on Start button!"

    # Verify B button (button 1) closes the menu modal
    print("Simulating button B tap to close menu...")
    page.evaluate("() => window.pressMockButton(1)")
    page.wait_for_timeout(200)
    page.evaluate("() => window.releaseMockButton(1)")
    page.wait_for_timeout(1000)
    assert not page.is_visible("#menuModal"), "Menu modal should be closed after pressing B button!"

    # Reset toggle tracking flag
    page.evaluate("() => { window.fullscreenToggleCalled = false; window.fullscreenCalledOnStart = false; }")

    # 2. Verify holding Y button down for >= 1000ms does NOT trigger fullscreen
    print("Simulating holding Y button down for 2.5 seconds...")
    page.evaluate("() => window.pressMockButton(3)")

    # Wait for 2.5 seconds while button remains pressed
    page.wait_for_timeout(2500)

    # Check that fullscreen toggle was NOT called during hold (since option is removed)
    fullscreen_called = page.evaluate("() => window.fullscreenToggleCalled || window.fullscreenCalledOnStart")
    print(f"Was fullscreen requested during Y hold? {fullscreen_called}")
    assert not fullscreen_called, "Holding Y button should NOT request fullscreen after removing the option!"

    # Release the Y button now
    print("Releasing Y button after hold...")
    page.evaluate("() => window.releaseMockButton(3)")
    page.wait_for_timeout(1000)

    # 3. Verify that exiting back to main menu automatically triggers exitFullscreen
    print("Opening menu to trigger exit...")
    page.evaluate("() => window.pressMockButton(9)")
    page.wait_for_timeout(200)
    page.evaluate("() => window.releaseMockButton(9)")
    page.wait_for_timeout(1000)

    # Intercept confirmation dialog
    page.on("dialog", lambda dialog: dialog.accept())

    print("Clicking Exit Game button...")
    page.click("#exitGameBtn")
    page.wait_for_timeout(1000)

    # Assert that exiting the game automatically exited fullscreen
    exit_called = page.evaluate("() => window.exitFullscreenCalled")
    print(f"Was exitFullscreen called automatically on exit game? {exit_called}")
    assert exit_called, "Exiting the game must automatically exit fullscreen mode!"

    print("All gamepad and automatic fullscreen assertions passed successfully!")

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
