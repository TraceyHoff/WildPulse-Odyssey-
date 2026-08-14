from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    print("Page loaded")
    page.wait_for_timeout(1000)

    # Seed stats and progress to instantly load game
    page.evaluate("""
      localStorage.setItem('wildpulse_player_color', '#FFFFFF');
      localStorage.setItem('wildpulse_p1_level', '7');
      localStorage.setItem('wildpulse_narrative_progress', JSON.stringify({
        unlockedTransmissions: ['vance_level7', 'vance_first_hatch'],
        completedQuests: [],
        journalEntries: [
            { id: 'vance_level7', title: '*** [ TRANSMISSION DECRYPTED: DNA RESONANCE PROTOCOL ] ***', body: 'Operative, Level 7 clearance confirmed. The DNA Breeding Program is now online. Combine male and female specimens at the Breeding Center. Walk the resulting Mysterious Egg 1,000 steps so its structure can attune to the Pulse. Stored eggs remain dormant.' },
            { id: 'vance_first_hatch', title: '*** [ TRANSMISSION DECRYPTED: THE FIRST ECHO ] ***', body: 'Remarkable... the structural integrity of the genome holds. The pulse anomaly didn\\'t reject the hybridization. Keep nurturing these lifeforms. Their mutations may hold the key to stabilizing the grid.' }
        ],
        sectorCleared: false,
        firstHatchDone: true
      }));
    """)
    page.reload()
    print("Page reloaded with seeded localStorage")

    start_btn = page.locator('#startGameBtn')
    print("Waiting for start game button...")
    start_btn.wait_for(state='visible', timeout=90000)
    print("Clicking start game button...")
    start_btn.click()
    page.wait_for_timeout(2000)

    print("Opening journal...")
    page.evaluate("window.openJournalModal(1)")
    page.wait_for_timeout(2000)

    print("Switching to data tab...")
    page.evaluate("window.switchJournalTab(1, 'data')")
    page.wait_for_timeout(2000)

    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/screenshots/narrative.png", full_page=True)
    page.wait_for_timeout(2000)
    print("Done")

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
