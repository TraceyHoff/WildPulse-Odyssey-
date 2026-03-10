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
            console.log("collectedCreatures length:", collectedCreatures.length);

            const c1 = JSON.parse(JSON.stringify(collectedCreatures[0]));
            c1.id = "c1"; c1.stored = true;
            collectedCreatures.push(c1);

            const c2 = JSON.parse(JSON.stringify(collectedCreatures[0]));
            c2.id = "c2"; c2.stored = false;
            collectedCreatures.push(c2);

            window.openPartyModal();
            console.log("Party List has " + document.querySelectorAll('.party-card').length + " cards");

            window.openStorageModal();
            console.log("Storage List has " + document.querySelectorAll('#storageModal .party-card').length + " cards");
        }
    """)
    browser.close()
