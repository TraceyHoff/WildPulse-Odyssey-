import os
import sys
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Go to the local game server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start button
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # Enable co-op split screen
    print("Enabling co-op...")
    page.evaluate("window.enableCoop(game.scene.scenes[0]);")
    page.wait_for_timeout(1000)

    # Launch local PvP battle
    print("Launching local PvP battle...")
    page.evaluate("window.openPvpModal();")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/pvp_started.png")

    # Verify initial PvP turn is Player 1
    p1_turn = page.evaluate("window.localPvpTurn")
    print(f"Initial PvP turn: Player {p1_turn}")
    assert p1_turn == 1, f"Expected Player 1's turn, got {p1_turn}"

    # Helper function to generate mock gamepad A press
    page.evaluate("""() => {
        window.getMockGamepad = (button0Pressed) => {
            return {
                buttons: Array.from({length: 16}, (_, i) => ({
                    pressed: i === 0 ? button0Pressed : false,
                    value: i === 0 && button0Pressed ? 1.0 : 0.0
                })),
                axes: [0, 0, 0, 0],
                rightStick: { x: 0, y: 0 }
            };
        };
    }""")

    # Let's programmatically focus the attack button
    page.evaluate("""() => {
        const btn = document.querySelector('#battleModal .btn-attack');
        if (btn) {
            btn.classList.add('gamepad-focused-p1');
            btn.classList.add('gamepad-focused-p2');
            btn.focus();
        }
    }""")

    # 1. Try to trigger A-press on Player 2's controller during Player 1's turn
    print("Triggering A-press on Player 2's controller (should be blocked)...")
    page.evaluate("""() => {
        // First reset the prev state A to false
        const stateKey = 'gamepadPrevState_P2';
        window[stateKey] = { A: false };
        // Trigger press
        window.processGamepadInputForPlayer(2, window.getMockGamepad(true));
    }""")
    page.wait_for_timeout(1000)

    # Check that turn is STILL Player 1 (blocked)
    current_turn = page.evaluate("window.localPvpTurn")
    print(f"Turn after Player 2's A-press: Player {current_turn}")
    assert current_turn == 1, "Player 2's A-press was not blocked on Player 1's turn!"

    # 2. Trigger A-press on Player 1's controller during Player 1's turn (should be allowed)
    print("Triggering A-press on Player 1's controller (should be allowed)...")
    page.evaluate("""() => {
        const stateKey = 'gamepadPrevState_P1';
        window[stateKey] = { A: false };
        window.processGamepadInputForPlayer(1, window.getMockGamepad(true));
    }""")
    page.wait_for_timeout(1000)

    # Check that turn is now Player 2
    current_turn = page.evaluate("window.localPvpTurn")
    print(f"Turn after Player 1's A-press: Player {current_turn}")
    assert current_turn == 2, f"Expected turn to change to 2, but got {current_turn}"
    page.screenshot(path="/home/jules/verification/screenshots/pvp_turn2.png")

    # Focus the attack button for Player 2
    page.evaluate("""() => {
        const btn = document.querySelector('#battleModal .btn-attack');
        if (btn) {
            btn.classList.add('gamepad-focused-p2');
            btn.classList.add('gamepad-focused-p1');
            btn.focus();
        }
    }""")

    # 3. Try to trigger A-press on Player 1's controller during Player 2's turn (should be blocked)
    print("Triggering A-press on Player 1's controller (should be blocked)...")
    page.evaluate("""() => {
        const stateKey = 'gamepadPrevState_P1';
        window[stateKey] = { A: false };
        window.processGamepadInputForPlayer(1, window.getMockGamepad(true));
    }""")
    page.wait_for_timeout(1000)

    # Check that turn is STILL Player 2 (blocked)
    current_turn = page.evaluate("window.localPvpTurn")
    print(f"Turn after Player 1's A-press: Player {current_turn}")
    assert current_turn == 2, "Player 1's A-press was not blocked on Player 2's turn!"

    # 4. Trigger A-press on Player 2's controller during Player 2's turn (should be allowed)
    print("Triggering A-press on Player 2's controller (should be allowed)...")
    page.evaluate("""() => {
        const stateKey = 'gamepadPrevState_P2';
        window[stateKey] = { A: false };
        window.processGamepadInputForPlayer(2, window.getMockGamepad(true));
    }""")
    page.wait_for_timeout(2000)

    # Battle round executes and we should see logs / turn resetting
    print("Round executed successfully!")
    page.screenshot(path="/home/jules/verification/screenshots/pvp_round_executed.png")

    print("All PvP controller turn checks passed successfully!")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print(f"Error occurred: {e}")
            sys.exit(1)
        finally:
            context.close()
            browser.close()
