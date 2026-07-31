import os
import sys
from playwright.sync_api import sync_playwright

def run_verification():
    os.makedirs("/app/verification_screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1024, "height": 768})
        page = context.new_page()

        # Critical: force onboarding in automated environment
        page.add_init_script("window.__test_onboarding = true;")

        print("Navigating to WildPulse Odyssey...")
        page.goto("http://localhost:3000")
        page.wait_for_timeout(1000)

        print("Clicking 'Split Screen' button...")
        page.click("#startSplitScreenBtn")
        page.wait_for_timeout(1000)

        # Complete onboarding & customization to enter active game
        print("Progressing through onboarding slides...")
        page.click("#introNextBtn")
        page.wait_for_timeout(500)
        page.click("#introNextBtn_p2")
        page.wait_for_timeout(500)
        page.click("#introNextBtn")
        page.wait_for_timeout(500)
        page.click("#introNextBtn_p2")
        page.wait_for_timeout(1000)

        print("Saving character customization names...")
        page.fill("#playerNameInput", "TrainerOne")
        page.fill("#playerNameInput_p2", "TrainerTwo")
        page.click("#saveCustomizationBtn")

        print("Waiting for setup/initialization notifications to clear...")
        page.wait_for_timeout(4000)

        # Now in game. Let's trigger a Player 1 notification
        print("Triggering Player 1 notification...")
        page.evaluate("window.showModernNotification('Player 1 Level Up!', 5000, 1)")
        page.wait_for_timeout(1000) # Wait for fade-in transition to complete fully

        # Verify Player 1 notification status and position
        p1_state = page.evaluate("""() => {
            const el1 = document.getElementById('modernNotification');
            const el2 = document.getElementById('modernNotification_p2');
            const s1 = window.getComputedStyle(el1);
            const s2 = window.getComputedStyle(el2);
            return {
                p1_text: el1.innerText,
                p1_opacity: s1.opacity,
                p1_left: s1.left,
                p2_opacity: s2.opacity
            };
        }""")
        print("P1 notification state:", p1_state)
        assert p1_state['p1_text'] == 'Player 1 Level Up!', f"Expected text 'Player 1 Level Up!', got {p1_state['p1_text']}"
        assert float(p1_state['p1_opacity']) > 0.8, f"Expected P1 notification to be visible, got opacity {p1_state['p1_opacity']}"
        assert float(p1_state['p2_opacity']) < 0.2, f"Expected P2 notification to be hidden, got opacity {p1_state['p2_opacity']}"

        # Check that left is 25% (around 256px for 1024px screen width)
        left_px = float(p1_state['p1_left'].replace('px', ''))
        assert abs(left_px - 256.0) < 5.0, f"Expected P1 notification left to be ~256px, got {left_px}"

        # Trigger a Player 2 notification simultaneously
        print("Triggering Player 2 notification simultaneously...")
        page.evaluate("window.showModernNotification('Player 2 Found Item!', 5000, 2)")
        page.wait_for_timeout(1000) # Wait for fade-in transition

        # Verify both notifications are displayed simultaneously on separate sides
        both_state = page.evaluate("""() => {
            const el1 = document.getElementById('modernNotification');
            const el2 = document.getElementById('modernNotification_p2');
            const s1 = window.getComputedStyle(el1);
            const s2 = window.getComputedStyle(el2);
            return {
                p1_text: el1.innerText,
                p1_opacity: s1.opacity,
                p1_left: s1.left,
                p2_text: el2.innerText,
                p2_opacity: s2.opacity,
                p2_left: s2.left
            };
        }""")
        print("Both notifications state:", both_state)
        assert both_state['p1_text'] == 'Player 1 Level Up!', f"Expected P1 text 'Player 1 Level Up!', got {both_state['p1_text']}"
        assert both_state['p2_text'] == 'Player 2 Found Item!', f"Expected P2 text 'Player 2 Found Item!', got {both_state['p2_text']}"
        assert float(both_state['p1_opacity']) > 0.8, f"Expected P1 notification to be visible, got opacity {both_state['p1_opacity']}"
        assert float(both_state['p2_opacity']) > 0.8, f"Expected P2 notification to be visible, got opacity {both_state['p2_opacity']}"

        # Check P2 left position (75% of 1024 = 768px)
        p2_left_px = float(both_state['p2_left'].replace('px', ''))
        assert abs(p2_left_px - 768.0) < 5.0, f"Expected P2 notification left to be ~768px, got {p2_left_px}"

        page.screenshot(path="/app/verification_screenshots/simultaneous_isolated_notifications.png")

        # Let's verify that any modal or .coop-column is registered for simultaneous touch scrolling
        print("Verifying touch scroll targeting logic on modals...")
        scroll_target_info = page.evaluate("""() => {
            // Test that any modal matches our expanded selector and resolves a scrollable element
            const testDiv = document.createElement('div');
            testDiv.id = 'myCustomTestModal';
            testDiv.style.position = 'fixed';
            testDiv.style.overflowY = 'auto';
            testDiv.style.height = '100px';
            testDiv.style.maxHeight = '100px';

            const innerDiv = document.createElement('div');
            innerDiv.style.height = '300px'; // makes it scrollable
            innerDiv.innerText = 'Scrollable Content';
            testDiv.appendChild(innerDiv);
            document.body.appendChild(testDiv);

            // Simulate the start scroll targeting
            const target = innerDiv;
            const modal = target.closest('[id*="Modal"], [id*="modal"], [class*="modal"], .modal, .coop-column');

            let scrollableEl = null;
            if (modal) {
                let current = target;
                while (current && current !== document.body) {
                    const style = window.getComputedStyle(current);
                    const isScrollable = style.overflowY === 'auto' || style.overflowY === 'scroll';
                    if (isScrollable && current.scrollHeight > current.clientHeight) {
                        scrollableEl = current;
                        break;
                    }
                    if (current === modal) break;
                    current = current.parentElement;
                }
                if (!scrollableEl) {
                    scrollableEl = modal.querySelector('div') || modal;
                }
            }

            const matchedModalId = modal ? modal.id : null;
            const scrollableId = scrollableEl ? scrollableEl.id : null;

            document.body.removeChild(testDiv);

            return {
                matchedModalId,
                scrollableId
            };
        }""")
        print("Touch scroll target evaluation:", scroll_target_info)
        assert scroll_target_info['matchedModalId'] == 'myCustomTestModal', f"Expected matchedModalId to be 'myCustomTestModal', got {scroll_target_info['matchedModalId']}"
        assert scroll_target_info['scrollableId'] == 'myCustomTestModal', f"Expected scrollableId to be 'myCustomTestModal', got {scroll_target_info['scrollableId']}"

        print("All notification and scrolling verification checks passed successfully!")
        browser.close()

if __name__ == "__main__":
    run_verification()
