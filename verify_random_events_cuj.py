import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Skip start modal
    page.add_init_script("""
        sessionStorage.setItem('wildpulse_skip_start_modal', 'true');
    """)
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Wait for Phaser to initialize
    page.wait_for_function("typeof window.getEventBoostedType === 'function'")
    page.wait_for_function("window.leafRedEmitter !== undefined")
    page.wait_for_timeout(1000)

    # 1. Force the "Aurora" celestial event
    page.evaluate("""
        window.totalElapsedMs = 650000; // past 10 mins
        window.activeRandomEvent = 'Aurora';
        window.activeRandomEventEndTime = window.totalElapsedMs + 90000; // 90 seconds remaining
        window.updateEventBadgeUI();
    """)
    page.wait_for_timeout(1500) # Wait for overlay color transition
    page.screenshot(path="/home/jules/verification/screenshots/verification_aurora.png")
    page.wait_for_timeout(1000)

    # 2. Force the "Heat Wave" event
    page.evaluate("""
        window.activeRandomEvent = 'Heat Wave';
        window.activeRandomEventEndTime = window.totalElapsedMs + 75000; // 75 seconds remaining
        window.updateEventBadgeUI();
    """)
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/verification_heatwave.png")
    page.wait_for_timeout(1000)

    # 3. Force the "Thunderstorm" event
    page.evaluate("""
        window.activeRandomEvent = 'Thunderstorm';
        window.activeRandomEventEndTime = window.totalElapsedMs + 115000;
        window.updateEventBadgeUI();
    """)
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/verification_thunderstorm.png")
    page.wait_for_timeout(1000)

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
        finally:
            context.close()
            browser.close()
    print("Verification script finished successfully!")
