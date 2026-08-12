from playwright.sync_api import sync_playwright
import time

def run_cuj(page):
    # Seed player preferences to bypass initial character customization screen
    page.add_init_script("""
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
        localStorage.setItem('wildpulse_player_pattern', 'None');
    """)

    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Click Single Player
    page.locator("#startGameBtn").click()
    page.wait_for_timeout(1000)

    # Wait for game to start
    page.wait_for_function("window.gameStarted === true")
    page.wait_for_timeout(1000)

    # 1. Force the portal system to be active
    page.evaluate("window.forcePortalActive = true")
    page.wait_for_timeout(500)

    # 2. Get first portal coordinates
    portal_coords = page.evaluate("window.portalCoords")
    if portal_coords and len(portal_coords) > 0:
        first_portal = portal_coords[0]
        portal_x = first_portal['c'] * 100 + 50
        portal_y = first_portal['r'] * 100 + 50

        print(f"Teleporting player near portal at Row: {first_portal['r']}, Col: {first_portal['c']}")

        # Move player close to but not on top of portal to show it first
        page.evaluate(f"""
            window.pointerTarget = null;
            if (window.player.body) {{
                window.player.body.setVelocity(0, 0);
            }}
            window.player.setPosition({portal_x - 120}, {portal_y});
            if (window.player.body) {{
                window.player.body.reset(window.player.x, window.player.y);
                window.player.body.updateFromGameObject();
            }}
        """)
        page.wait_for_timeout(2000)  # Wait for camera to pan and draw portal

        # Take screenshot of portal on main map
        page.screenshot(path="/home/jules/verification/screenshots/portal_on_map.png")
        page.wait_for_timeout(1000)

        print("Stepping onto the portal...")
        # Move player directly onto the portal to trigger teleportation
        page.evaluate(f"""
            window.pointerTarget = null;
            if (window.player.body) {{
                window.player.body.setVelocity(0, 0);
            }}
            window.player.setPosition({portal_x}, {portal_y});
            if (window.player.body) {{
                window.player.body.reset(window.player.x, window.player.y);
                window.player.body.updateFromGameObject();
            }}
        """)
        page.wait_for_timeout(2000)  # Wait for teleportation and map load

        # Take screenshot inside the Void Rift
        page.screenshot(path="/home/jules/verification/screenshots/inside_void_rift.png")
        print("Captured screenshot inside the Void Rift!")
        page.wait_for_timeout(1000)

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
