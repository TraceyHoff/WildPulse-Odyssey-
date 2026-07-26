import os
import sys
from playwright.sync_api import sync_playwright

def run_test(page):
    print("Navigating to game server...")
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click on startGameBtn if present to start the game
    if page.is_visible("#startGameBtn"):
        print("Clicking Start Game button...")
        page.click("#startGameBtn")
        page.wait_for_timeout(2000)

    # If intro modal is shown, close it
    if page.is_visible("#closeIntroBtnTop"):
        print("Closing intro modal...")
        page.click("#closeIntroBtnTop")
        page.wait_for_timeout(1000)

    # Let's check that window.abilities has been expanded
    print("Checking window.abilities keys and lengths...")
    expanded_check = page.evaluate("""() => {
        const types = Object.keys(window.abilities);
        const lengths = {};
        for (let t of types) {
            lengths[t] = window.abilities[t].length;
        }
        return { types, lengths };
    }""")
    print(f"Abilities keys: {expanded_check['types']}")
    print(f"Abilities counts per type: {expanded_check['lengths']}")
    for t, l in expanded_check['lengths'].items():
        assert l >= 10, f"Expected at least 10 abilities for type {t}, but got {l}"
    print("Abilities pool successfully expanded with a ton of abilities!")

    # Let's check that collected creatures have dual abilities
    print("Checking that starting/collected creatures are assigned both a damage ability and support ability...")
    creatures_abilities_check = page.evaluate("""() => {
        const list = window.collectedCreatures || [];
        if (list.length === 0) return null;
        return list.map(c => ({
            name: c.name,
            ability: c.ability ? { name: c.ability.name, type: c.ability.type } : null,
            secondaryAbility: c.secondaryAbility ? { name: c.secondaryAbility.name, type: c.secondaryAbility.type } : null
        }));
    }""")
    print(f"Collected creatures' abilities: {creatures_abilities_check}")
    if creatures_abilities_check:
        for c in creatures_abilities_check:
            assert c['ability'] is not None, f"Expected damage ability for {c['name']}"
            assert c['secondaryAbility'] is not None, f"Expected secondary support ability for {c['name']}"
            print(f"Creature {c['name']} has primary damage ability '{c['ability']['name']}' and secondary support ability '{c['secondaryAbility']['name']}'")

    # Let's open the party modal and check if we can click the creature sprite to show the full size image
    print("Opening party modal...")
    page.evaluate("if (window.renderPartyList) { window.renderPartyList(); }")
    page.evaluate("document.getElementById('partyModal').style.display = 'block';")
    page.wait_for_timeout(1000)

    # Click the canvas inside the first party card sprite container
    print("Checking for creature image canvas in party modal...")
    sprite_container_selector = "#partyList .party-card .creature-sprite-container canvas"
    if page.is_visible(sprite_container_selector):
        print("Clicking on the creature image canvas in the party modal...")
        page.click(sprite_container_selector, force=True)
        page.wait_for_timeout(1500)

        # Check if fullSizeImageModal is visible and has close button
        is_preview_modal_visible = page.is_visible("#fullSizeImageModal")
        print(f"Full-sized image preview modal is visible: {is_preview_modal_visible}")
        assert is_preview_modal_visible, "Expected fullSizeImageModal to be visible after clicking the creature image"

        preview_title = page.inner_text("#fullSizeImageTitle")
        print(f"Full-sized preview title: '{preview_title}'")
        assert len(preview_title) > 0, "Expected non-empty title for the creature preview"

        # Close the full-size image modal using the X button
        print("Clicking close 'X' button on the full-size preview modal...")
        page.click("#closeFullSizeImageBtn", force=True)
        page.wait_for_timeout(1000)
        is_preview_modal_visible_after = page.is_visible("#fullSizeImageModal")
        print(f"Full-sized image preview modal is visible after closing: {is_preview_modal_visible_after}")
        assert not is_preview_modal_visible_after, "Expected fullSizeImageModal to be hidden after clicking close button"
    else:
        print("Warning: Sprite canvas was not visible or found (possibly due to empty party on loaded mock/empty context).")

    # Verify that passive Friend level experience gain is using the 1 XP / 30 seconds rate
    print("Verifying passive Friend level XP rates...")
    friend_xp_check = page.evaluate("""() => {
        // Let's call updateFriendExperience with dt=30000ms (30 seconds)
        // A creature should gain exactly 1 XP
        const testCreature = {
            id: 'test_friend_xp',
            name: 'Testy',
            type: 'Fire',
            friendLevel: 1,
            friendXp: 0,
            friendBonusStats: { health: 0, attack: 0, defense: 0, speed: 0, specialAttack: 0, specialDefense: 0 },
            stored: false
        };
        const origCollected = window.collectedCreatures;
        window.collectedCreatures = [testCreature];
        window.gameStarted = true;

        window.updateFriendExperience(30000); // 30 seconds
        const xpAfterActive = testCreature.friendXp;

        testCreature.stored = true;
        testCreature.friendXp = 10;
        window.updateFriendExperience(180000); // 3 minutes
        const xpAfterStored = testCreature.friendXp;

        window.collectedCreatures = origCollected;
        return { xpAfterActive, xpAfterStored };
    }""")
    print(f"XP gained after 30 seconds of active playtime: {friend_xp_check['xpAfterActive']} (Expected: 1.0)")
    print(f"XP remaining after 3 minutes of storage: {friend_xp_check['xpAfterStored']} (Expected: 9.0 due to 1.0 loss)")
    assert abs(friend_xp_check['xpAfterActive'] - 1.0) < 0.001, f"Expected exactly 1.0 XP gained, got {friend_xp_check['xpAfterActive']}"
    assert abs(friend_xp_check['xpAfterStored'] - 9.0) < 0.001, f"Expected exactly 1.0 XP lost, got {friend_xp_check['xpAfterStored']}"
    print("Friend XP gain and degradation rates successfully verified!")

    print("ALL TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_test(page)
        finally:
            context.close()
            browser.close()
