from playwright.sync_api import sync_playwright

def test_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('file:///app/index.html')
        page.wait_for_timeout(2000)

        # Click Join Room to dismiss lobby
        page.click('id=joinBtn')
        page.wait_for_timeout(1000)

        # Force a season change to fall (months = 2, so days = 40)
        page.evaluate('''() => {
            window.wildpulse_inGameDays = 40;
            localStorage.setItem("wildpulse_inGameDays", 40);
            window.dayNightTime = 23.99;
        }''')

        page.wait_for_timeout(2000)

        # Take screenshot of the game world with Fall colors and leaf particles
        page.screenshot(path='/app/gameplay.png')

        # Open party modal
        page.evaluate('window.openPartyModal()')
        page.wait_for_timeout(1000)
        page.screenshot(path='/app/party_modal.png')

        # Click stats tab
        page.evaluate('window.switchPartyTab("stats")')
        page.wait_for_timeout(1000)
        page.screenshot(path='/app/stats_tab.png')

        browser.close()

if __name__ == '__main__':
    test_ui()
