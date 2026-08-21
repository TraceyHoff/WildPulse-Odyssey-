from playwright.sync_api import sync_playwright
import time

def test_storage_limit():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.add_init_script("""
            localStorage.setItem('wildpulse_has_seen_intro', 'true');
            localStorage.setItem('wildpulse_player_color', 'blue');
            localStorage.setItem('wildpulse_p1_level', '10');
            localStorage.setItem('wildpulse_p1_inventory', JSON.stringify([
                {name: "Storage Chest", quantity: 5}
            ]));
            localStorage.setItem('wildpulse_save_location', JSON.stringify({x: 58350, y: 58750}));
        """)

        page.goto("http://localhost:3000/")

        page.wait_for_selector("#startGameBtn", state="visible")
        page.click("#startGameBtn")

        page.wait_for_timeout(2000)

        # We need to manually set isPlayerInsideHome to avoid complex checks if possible, or actually enter home
        # We can just mock the notification to see if it's called

        # Open Home Design modal
        page.evaluate("""
            window.isPlayerInsideHome = () => true;
            window.isValidMiniTileLocation = () => true;
        """)

        page.evaluate("""
            window.p1MiniTilePlacementMode = "Storage Chest";
            window.p1MiniTileSlotIndex = 0;
            window.p1MiniTileRotation = 0;
            window.tryPlaceMiniTile(1, 58350, 58750);
        """)
        page.wait_for_timeout(1000)

        page.evaluate("""
            window.p1MiniTilePlacementMode = "Storage Chest";
            window.p1MiniTileSlotIndex = 0;
            window.p1MiniTileRotation = 0;
            window.tryPlaceMiniTile(1, 58350, 58850);
        """)
        page.wait_for_timeout(1000)

        page.evaluate("""
            window.p1MiniTilePlacementMode = "Storage Chest";
            window.p1MiniTileSlotIndex = 0;
            window.p1MiniTileRotation = 0;
            window.tryPlaceMiniTile(1, 58350, 58950);
        """)
        page.wait_for_timeout(1000)

        notification = page.evaluate("""
            document.getElementById('modernNotification').innerHTML;
        """)

        print("Notification HTML:", notification)

        count = page.evaluate("""
            JSON.parse(localStorage.getItem('wildpulse_p1_mini_tiles')).filter(t => t.type === 'storage_chest').length
        """)
        print("Storage Chest Count:", count)

        browser.close()

if __name__ == "__main__":
    test_storage_limit()
