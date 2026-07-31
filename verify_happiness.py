import os
from playwright.sync_api import sync_playwright

def run_verification(page):
    # Go to the local game server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the single player game start button
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # Reset happiness to 50 for predictable testing
    page.evaluate("window.collectedCreatures[0].happiness = 50;")

    # 1. Verify that the starter creature has a happiness of 50 (approximate due to background ticks)
    initial_happiness = page.evaluate("window.collectedCreatures[0].happiness")
    print(f"Initial starter happiness: {initial_happiness}")
    assert abs(initial_happiness - 50) < 0.5, f"Expected around 50, got {initial_happiness}"

    # 2. Test window.adjustHappiness function directly
    print("Testing window.adjustHappiness(+20)...")
    page.evaluate("window.adjustHappiness(window.collectedCreatures[0], 20, 1);")
    updated_happiness = page.evaluate("window.collectedCreatures[0].happiness")
    print(f"Updated happiness (+20): {updated_happiness}")
    assert abs(updated_happiness - 70) < 0.5, f"Expected around 70, got {updated_happiness}"

    # Test clamping high (100)
    print("Testing clamping high (+50)...")
    page.evaluate("window.adjustHappiness(window.collectedCreatures[0], 50, 1);")
    high_clamped = page.evaluate("window.collectedCreatures[0].happiness")
    print(f"High clamped happiness: {high_clamped}")
    assert abs(high_clamped - 100) < 0.5, f"Expected around 100, got {high_clamped}"

    # Test clamping low (0)
    print("Testing clamping low (-120)...")
    page.evaluate("window.adjustHappiness(window.collectedCreatures[0], -120, 1);")
    low_clamped = page.evaluate("window.collectedCreatures[0].happiness")
    print(f"Low clamped happiness: {low_clamped}")
    assert abs(low_clamped - 0) < 0.5, f"Expected around 0, got {low_clamped}"

    # Reset happiness back to 50
    page.evaluate("window.collectedCreatures[0].happiness = 50;")

    # 3. Test passive happiness increment when in active party (non-stored)
    print("Simulating 30 seconds of exploration tick (dt = 30000ms)...")
    page.evaluate("window.updateFriendExperience(30000);")
    party_happiness = page.evaluate("window.collectedCreatures[0].happiness")
    print(f"Happiness after 30s in party: {party_happiness}")
    # Rate is 1 point per 30 seconds, so happiness should have increased by ~1.0
    assert party_happiness > 50, f"Expected happiness to increase from 50, got {party_happiness}"

    # 4. Test passive happiness decrement when stored
    print("Storing starter creature...")
    page.evaluate("window.collectedCreatures[0].stored = true;")
    page.evaluate("window.collectedCreatures[0].happiness = 50;")
    print("Simulating 180 seconds of stored tick (dt = 180000ms)...")
    page.evaluate("window.updateFriendExperience(180000);")
    stored_happiness = page.evaluate("window.collectedCreatures[0].happiness")
    print(f"Happiness after 180s in storage: {stored_happiness}")
    # Rate is -1 point per 180 seconds, so happiness should have decreased
    assert stored_happiness < 50, f"Expected happiness to decrease from 50, got {stored_happiness}"

    # Unstore starter creature
    page.evaluate("window.collectedCreatures[0].stored = false;")
    page.evaluate("window.collectedCreatures[0].happiness = 85;")

    # 5. Open Party Modal directly
    print("Opening Party Modal...")
    page.evaluate("window.openPartyModal(1);")
    page.wait_for_timeout(1500)

    # Check for Happiness text inside party list
    party_content = page.inner_html("#partyList")
    print("Checking for 'Happiness' in Party List HTML...")
    assert "Happiness" in party_content, "Happiness meter text not found in Party List UI"
    assert "85/100" in party_content, "Happiness value '85/100' not found in Party List UI"

    # Take screenshot of the Party Modal displaying the neon happiness progress bar
    page.screenshot(path="verification_screenshots/verification_happiness_party_modal.png")
    print("Party Modal screenshot saved successfully.")

    # 6. Click on starter creature canvas to open full-size image modal and verify happiness meter
    print("Opening full-size image modal via direct JS click...")
    page.evaluate("document.querySelector('#partyList canvas').click();")
    page.wait_for_timeout(1500)

    # Check for Happiness text inside full-size modal description
    preview_content = page.inner_html("#fullSizeImageDesc")
    print("Checking for 'Happiness' in Full-size Preview HTML...")
    assert "Happiness" in preview_content, "Happiness meter text not found in Full-size Preview UI"
    assert "85/100" in preview_content, "Happiness value '85/100' not found in Full-size Preview UI"

    # Take screenshot of the Full-size Preview Modal displaying the happiness progress bar
    page.screenshot(path="verification_screenshots/verification_happiness_preview_modal.png")
    print("Full-size Preview Modal screenshot saved successfully.")

    # Close modal
    page.click("#closeFullSizeImageBtn", force=True)
    page.wait_for_timeout(1000)
    print("Verification successfully completed!")

if __name__ == "__main__":
    os.makedirs("verification_screenshots", exist_ok=True)
    os.makedirs("verification_videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification_videos"
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
