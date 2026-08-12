import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Ensure directories exist
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    # 1. Go to homepage
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Click Single Player
    start_btn = page.locator('#startGameBtn')
    start_btn.wait_for(state="visible", timeout=30000)
    start_btn.click()
    page.wait_for_timeout(1000)

    # Wait for game to start
    page.wait_for_function("window.gameStarted === true", timeout=15000)
    page.wait_for_timeout(1000)

    # 2. Enable co-op and force portal active
    page.evaluate("""() => {
        window.forcePortalActive = true;
        const scene = window.game.scene.scenes[0];
        if (window.enableCoop) {
            window.enableCoop(scene);
        }
    }""")
    page.wait_for_timeout(1000)

    # 3. Get portal coords and teleport Player 1 onto it
    portal_coords = page.evaluate("window.portalCoords")
    if not portal_coords or len(portal_coords) == 0:
        print("No portal coordinates generated!")
        return

    first_portal = portal_coords[0]
    portal_x = first_portal['c'] * 100 + 50
    portal_y = first_portal['r'] * 100 + 50

    print(f"Teleporting Player 1 to portal at x={portal_x}, y={portal_y}")
    page.evaluate(f"""() => {{
        window.pointerTarget = null;
        if (window.player.body) {{
            window.player.body.setVelocity(0, 0);
        }}
        window.player.setPosition({portal_x}, {portal_y});
        if (window.player.body) {{
            window.player.body.updateFromGameObject();
        }}
    }}""")
    page.wait_for_timeout(1000)

    # Take screenshot of Player 1's portal confirmation modal
    page.screenshot(path="/home/jules/verification/screenshots/p1_confirm.png")
    print("Saved screenshot of Player 1 confirmation")

    # Click YES on Player 1's confirmation modal
    page.locator("#customConfirmYesBtn_p1").click()
    page.wait_for_timeout(1000)

    # Take screenshot of Player 2's JOIN confirmation modal
    page.screenshot(path="/home/jules/verification/screenshots/p2_join_confirm.png")
    print("Saved screenshot of Player 2 JOIN confirmation")

    # Click YES on Player 2's JOIN confirmation modal
    page.locator("#customConfirmYesBtn_p2").click()
    page.wait_for_timeout(1500)

    # Take screenshot of both players inside the Hidden Grove Portal World
    page.screenshot(path="/home/jules/verification/screenshots/both_in_hidden_grove.png")
    print("Saved final screenshot of both players in the Hidden Grove Portal World")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        # Seed preferences to bypass onboarding
        context.add_init_script("""() => {
            localStorage.setItem('wildpulse_player_color', '#FFFFFF');
            localStorage.setItem('wildpulse_player_pattern', 'None');
        }""")
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
