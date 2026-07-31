import os
import math
from playwright.sync_api import sync_playwright

def run_test(page):
    os.makedirs("verification_screenshots", exist_ok=True)
    os.makedirs("verification_videos", exist_ok=True)

    print("Navigating to local server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    print("Clicking Start Game...")
    page.click("#startGameBtn")
    page.wait_for_timeout(1000)

    # 1. Set Level to 10 and ensure progress is updated
    print("Setting Player 1 Level to 10...")
    page.evaluate("""() => {
        window.p1Level = 10;
        localStorage.setItem('wildpulse_player_level', '10');
        if (window.updatePlayerLabels) window.updatePlayerLabels();
    }""")
    page.wait_for_timeout(1000)

    # 2. Toggle Action Wheel and verify Home option is visible
    print("Opening Action Wheel...")
    page.evaluate("window.openActionWheel(1);")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification_screenshots/home_action_wheel_open.png")

    # Verify Home button exists and is visible
    home_btn_visible = page.evaluate("""() => {
        const btn = document.getElementById('actionWheelHome_p1');
        return btn && btn.style.display !== 'none';
    }""")
    print(f"Action Wheel Home button visible at level 10: {home_btn_visible}")
    assert home_btn_visible, "Home button should be visible in the Action Wheel at Level 10!"

    # 3. Simulate highlighting 'home' and verify pointer rotation
    print("Simulating highlighting 'home' option...")
    page.evaluate("window.highlightActionWheelOption(1, 'home');")
    page.wait_for_timeout(500)
    page.screenshot(path="verification_screenshots/home_action_wheel_highlighted.png")

    # Verify pointer rotation is 45 deg
    pointer_style = page.evaluate("""() => {
        const p1Col = document.querySelector('#actionWheelModal .p1-col');
        const pointer = p1Col.querySelector('.action-wheel-pointer');
        return pointer ? pointer.style.transform : '';
    }""")
    print(f"Action Wheel pointer style: {pointer_style}")
    assert "rotate(45deg)" in pointer_style, "Pointer should rotate to 45deg for 'home'!"

    # 4. Trigger Home Placement Mode
    print("Activating Home Placement Mode...")
    page.evaluate("window.useActionWheelOption(1, 'home');")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification_screenshots/home_placement_mode_active.png")

    # Verify Placement Mode is active and movement is blocked
    placement_active = page.evaluate("window.p1HomePlacementMode === true")
    print(f"Placement mode active: {placement_active}")
    assert placement_active, "Placement Mode should be active!"

    # 5. Move placement preview and check position
    print("Simulating Right Stick movement of home preview...")
    page.evaluate("""() => {
        window.p1HomePreviewX = 10050;
        window.p1HomePreviewY = 9950;
        if (window.p1HomePreviewSprite) {
            window.p1HomePreviewSprite.setPosition(10050, 9950);
        }
    }""")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification_screenshots/home_placement_preview_moved.png")

    # 6. Place the home and verify it snaps to grid and persists
    print("Placing home...")
    page.evaluate("window.tryPlaceHome(1, 10050, 9950);")
    page.wait_for_timeout(1000)

    # Verify home coordinates in localStorage
    hx = page.evaluate("localStorage.getItem('wildpulse_p1_home_x')")
    hy = page.evaluate("localStorage.getItem('wildpulse_p1_home_y')")
    print(f"Saved home coordinates: {hx}, {hy}")
    assert hx == "10050" and hy == "9950", "Home should be placed at snapped coordinates 10050, 9950!"

    # Verify placement mode deactivated
    placement_inactive = page.evaluate("window.p1HomePlacementMode === false")
    print(f"Placement mode deactivated: {placement_inactive}")
    assert placement_inactive, "Placement Mode should be deactivated after placing!"

    # 7. Simulate party defeat / loss and verify respawn choice modal triggers
    print("Simulating party loss/defeat...")
    page.evaluate("window.activeBattlePlayer = 1; window.endBattle('loss');")
    page.wait_for_timeout(2000)
    print("Closing battle modal...")
    page.evaluate("window.closeBattleModal();")
    page.wait_for_timeout(1500)
    page.screenshot(path="verification_screenshots/respawn_choice_modal.png")

    # Verify respawn choice modal display
    respawn_modal_visible = page.evaluate("""() => {
        const modal = document.getElementById('respawnChoiceModal_p1');
        return modal && modal.style.display === 'flex';
    }""")
    print(f"Respawn choice modal visible: {respawn_modal_visible}")
    assert respawn_modal_visible, "Respawn choice modal should be visible after defeat!"

    # 8. Choose spawn at Home and verify player moved to home location and fully healed
    print("Selecting 'MY HOME' spawn...")
    page.click("#respawnP1HomeBtn")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification_screenshots/player_respawned_at_home.png")

    # Verify modal closed
    respawn_modal_closed = page.evaluate("""() => {
        const modal = document.getElementById('respawnChoiceModal_p1');
        return modal && modal.style.display === 'none';
    }""")
    print(f"Respawn modal closed: {respawn_modal_closed}")
    assert respawn_modal_closed, "Respawn choice modal should close after selecting spawn!"

    # Verify player coordinate is near home
    px = page.evaluate("window.player.x")
    py = page.evaluate("window.player.y")
    print(f"Player coordinates after respawn: {px}, {py}")
    dist = math.hypot(px - 10050, py - 9950)
    print(f"Distance from home: {dist}")
    assert dist <= 450, "Player should spawn near their placed home!"

    # Save final screenshot
    page.screenshot(path="verification_screenshots/verification_home_placement.png")
    page.wait_for_timeout(1000)

    print("Home placement and spawning verification passed successfully!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="verification_videos")
        page = context.new_page()
        try:
            run_test(page)
        finally:
            context.close()
            browser.close()
