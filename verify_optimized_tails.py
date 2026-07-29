import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Create verification directories
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)

    # Goto app
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Clear local storage for a clean start
    page.evaluate("localStorage.clear();")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Render three different cute creatures with visible tails coming out of the back!
    page.evaluate("""
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.left = '20px';
        container.style.zIndex = '999999';
        container.style.display = 'flex';
        container.style.gap = '20px';
        container.style.background = 'rgba(0, 0, 0, 0.8)';
        container.style.padding = '20px';
        container.style.borderRadius = '15px';
        container.style.border = '2px solid #00FFFF';
        document.body.appendChild(container);

        const creatures = [
            {
                name: 'TailOne_Barbed',
                id: 'c1_barbed', // hash will determine side
                color: 0xff3d00,
                type: 'Fire',
                skinFurColor: '#ff9e80',
                tail: 'barbed',
                tailColor: '#ff3d00',
                bodySize: 'large',
                bodyType: 'rounded'
            },
            {
                name: 'TailTwo_Scorpion',
                id: 'c2_scorpion', // different hash
                color: 0x00e5ff,
                type: 'Water',
                skinFurColor: '#80deea',
                tail: 'scorpion',
                tailColor: '#00e5ff',
                bodySize: 'large',
                bodyType: 'rounded'
            },
            {
                name: 'TailThree_Classic',
                id: 'c3_classic',
                color: 0x4caf50,
                type: 'Nature',
                skinFurColor: '#a5d6a7',
                tail: 'classic',
                tailColor: '#4caf50',
                bodySize: 'large',
                bodyType: 'rounded'
            }
        ];

        creatures.forEach((c, idx) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.alignItems = 'center';

            const label = document.createElement('span');
            label.innerText = c.name;
            label.style.color = '#fff';
            label.style.fontFamily = 'monospace';
            label.style.marginBottom = '10px';

            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            canvas.style.border = '2px solid #fff';
            canvas.style.borderRadius = '10px';

            wrapper.appendChild(label);
            wrapper.appendChild(canvas);
            container.appendChild(wrapper);

            // Animate using requestAnimationFrame to show real-time, optimized, fluid rendering!
            const render = () => {
                window.renderCreatureCanvas(canvas, c, 150, true);
                requestAnimationFrame(render);
            };
            render();
        });
    """)
    page.wait_for_timeout(2000)

    # Take screenshot of the rendered creatures showing their beautiful tails emerging from their back
    screenshot_path = "/home/jules/verification/screenshots/optimized_tails_and_animations.png"
    page.screenshot(path=screenshot_path)
    print(f"Creature tails screenshot saved to {screenshot_path}")

    # Hold final state for the video
    page.wait_for_timeout(2000)

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
