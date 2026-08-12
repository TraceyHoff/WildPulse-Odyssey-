import time
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Setup skip onboarding
    page.evaluate('''() => {
        localStorage.setItem('wildpulse_player_color', '#FFFFFF');
    }''')
    page.reload()
    page.wait_for_timeout(1000)

    # Start the game
    start_btn = page.locator("#startGameBtn")
    start_btn.wait_for(state="visible", timeout=30000)
    start_btn.click()
    page.wait_for_timeout(1000)

    # Wait for game to start
    page.wait_for_function("() => window.gameStarted")
    page.wait_for_timeout(1500)

    # Let's spawn a mock plant in the center of the viewport right in front of the player
    page.evaluate('''() => {
        const scene = window.game.scene.scenes[0];
        const pX = player.x;
        const pY = player.y - 120;

        // Shadow
        const shadow = scene.add.sprite(pX, pY, 'plant_cyber_fern');
        shadow.setTintFill(0x000000);
        shadow.setAlpha(0.2);
        shadow.setOrigin(0.5, 0.8);
        shadow.setScale(0.8, 0.45 * 0.8);
        shadow.setDepth(1);

        // Plant
        const plant = scene.add.sprite(pX, pY, 'plant_cyber_fern');
        plant.setOrigin(0.5, 0.8);
        plant.setScale(0.8);
        plant.setDepth(1000); // Put on top so it's super visible
        plant.isPlant = true;
        plant.plantType = 'plant_cyber_fern';
        plant.shadowSprite = shadow;

        // Make it a global reference for us to manipulate
        window.verificationPlant = plant;
    }''')
    page.wait_for_timeout(1000)

    # Let's capture the four seasons!

    # 1. Summer (Healthy)
    page.evaluate('''() => {
        window.currentSeason = 'Summer';
        window.wildpulse_inGameDays = 0;
        window.dayNightTime = 12.0; // Midday
        window.updatePlantVisualState(window.verificationPlant);
    }''')
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/1_summer.png")

    # 2. Fall (Rustic Orange Tint)
    page.evaluate('''() => {
        window.currentSeason = 'Fall';
        window.wildpulse_inGameDays = 0;
        window.dayNightTime = 12.0;
        window.updatePlantVisualState(window.verificationPlant);
    }''')
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/2_fall.png")

    # 3. Winter (Dying / Invisible)
    # Let's check mid-winter first when it is withered but partially visible (e.g., day 12)
    page.evaluate('''() => {
        window.currentSeason = 'Winter';
        window.wildpulse_inGameDays = 12;
        window.dayNightTime = 12.0;
        window.updatePlantVisualState(window.verificationPlant);
    }''')
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/3_winter_mid.png")

    # Now let's check late winter when it is completely dead / invisible
    page.evaluate('''() => {
        window.currentSeason = 'Winter';
        window.wildpulse_inGameDays = 25;
        window.dayNightTime = 12.0;
        window.updatePlantVisualState(window.verificationPlant);
    }''')
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/4_winter_dead.png")

    # 4. Spring (Regrowing!)
    # Let's check early spring (small scale, tinted)
    page.evaluate('''() => {
        window.currentSeason = 'Spring';
        window.wildpulse_inGameDays = 3;
        window.dayNightTime = 12.0;
        window.updatePlantVisualState(window.verificationPlant);
    }''')
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/5_spring_early.png")

    # Let's check late spring (almost fully grown)
    page.evaluate('''() => {
        window.currentSeason = 'Spring';
        window.wildpulse_inGameDays = 25;
        window.dayNightTime = 12.0;
        window.updatePlantVisualState(window.verificationPlant);
    }''')
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/screenshots/6_spring_late.png")

    # Keep a main verification screenshot
    page.screenshot(path="verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
