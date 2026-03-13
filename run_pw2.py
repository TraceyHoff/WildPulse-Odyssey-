from playwright.sync_api import sync_playwright

def verify(page):
    page.goto("file:///app/index.html")
    page.wait_for_timeout(500)

    level_up_res = page.evaluate("""() => {
        let testC = { level: 9, xp: 0, bonusStats: {health:0, attack:0, defense:0, speed:0, specialAttack:0, specialDefense:0} };
        window.gainXp(testC, window.getXpRequirement(9)); // Levels up to 10
        let stats10 = JSON.parse(JSON.stringify(testC.bonusStats));

        window.gainXp(testC, window.getXpRequirement(10)); // Levels up to 11
        let stats11 = JSON.parse(JSON.stringify(testC.bonusStats));

        let diff = {};
        for(let s in stats11) {
            diff[s] = stats11[s] - stats10[s];
        }

        return { lvl10: stats10, diff10to11: diff, final_level: testC.level };
    }""")
    print("Level Up Result index.html:", level_up_res)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    verify(page)
    browser.close()
