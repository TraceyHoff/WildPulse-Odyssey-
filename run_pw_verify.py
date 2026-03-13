import sys
from playwright.sync_api import sync_playwright

def verify(page):
    page.goto("file:///app/index.html")
    page.wait_for_timeout(500)

    # Bypass initial menu
    page.evaluate("""() => {
        let btn = document.getElementById('playOfflineBtn');
        if (btn) btn.click();
    }""")
    page.wait_for_timeout(1000)

    # We can evaluate to see the new abilities being populated.
    res = page.evaluate("window.abilities.Fire.map(a => a.name).join(', ')")
    print("Fire abilities:", res)

    # Open Journal
    page.evaluate("""() => {
        let btn = document.querySelector('button[onclick="window.openJournalModal()"]');
        if (btn) btn.click();
        else window.openJournalModal();
    }""")
    page.wait_for_timeout(1000)

    page.screenshot(path="/home/jules/verification/verification.png")
    page.wait_for_timeout(500)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/video", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="/home/jules/verification/video", viewport={"width": 1280, "height": 720})
        page = context.new_page()
        try:
            verify(page)
        finally:
            context.close()
            browser.close()
