from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    def on_console(msg):
        print("PAGE LOG:", msg.text)

    def on_page_error(err):
        print("PAGE ERROR:", err)

    page.on("console", on_console)
    page.on("pageerror", on_page_error)

    page.goto("file:///app/index.html")

    page.evaluate("""
        () => {
            console.log("Map Rows:", mapData.length);
            console.log("Map Cols:", mapData[0].length);
            let waterCount = 0;
            for(let r=0; r<mapData.length; r++) {
                for(let c=0; c<mapData[r].length; c++) {
                    if (mapData[r][c] === 'obs') waterCount++;
                }
            }
            console.log("Total Water Tiles:", waterCount);
        }
    """)
    browser.close()
