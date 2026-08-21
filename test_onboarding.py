from playwright.sync_api import sync_playwright
import time

def test_onboarding():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Reset local storage to see intro
        page.add_init_script("""
            localStorage.removeItem('wildpulse_has_seen_intro');
        """)

        page.goto("http://localhost:3000/")

        page.wait_for_timeout(2000)

        slide_3_html = page.evaluate("""
            document.getElementById('introModalSlide3').innerHTML
        """)

        print("Slide 3 contains '⭐ Item Tiers:':", '⭐ Item Tiers:' in slide_3_html)
        print("Slide 3 contains 'Exquisite':", 'Exquisite' in slide_3_html)

        browser.close()

if __name__ == "__main__":
    test_onboarding()
