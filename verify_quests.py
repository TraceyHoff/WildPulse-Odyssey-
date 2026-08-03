import os
import sys
from playwright.sync_api import sync_playwright

def run_quest_tests(page):
    # Go to local game server
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)

    # Click the start button to initialize
    page.click("#startGameBtn")
    page.wait_for_timeout(2000)

    # 1. Verify Quest Givers metadata existence
    quest_npcs_length = page.evaluate("window.questNpcList.length")
    print(f"Verified Quest NPCs Length: {quest_npcs_length}")
    assert quest_npcs_length == 8, "There should be exactly 8 Quest NPCs"

    # 2. Verify getQuestNpcPos returns row/col coordinate structure
    npc_pos = page.evaluate("window.getQuestNpcPos(window.questNpcList[0])")
    print(f"Verified Quest NPC 1 position: {npc_pos}")
    assert 'r' in npc_pos and 'c' in npc_pos, "Position should have 'r' and 'c'"

    # 3. Verify questNpcGroup exists
    group_exists = page.evaluate("!!window.questNpcGroup")
    print(f"Quest NPC Physics Group Exists: {group_exists}")
    assert group_exists == True, "Physics group window.questNpcGroup should exist"

    # 4. Verify procedural quest generation
    quest = page.evaluate("window.generateProceduralQuest('quest_npc_1', 1)")
    print(f"Generated Procedural Quest: {quest}")
    assert quest['npcId'] == 'quest_npc_1', "Quest NPC ID should match"
    assert quest['status'] == 'active', "Newly generated quest should have active status"
    assert 'rewards' in quest, "Quest should have rewards structure"
    assert 'coins' in quest['rewards'], "Rewards should have coins"
    assert 'xp' in quest['rewards'], "Rewards should have player XP"
    assert 'item' in quest['rewards'], "Rewards should have item reward"

    # 5. Clear quests list and simulate overlap/openQuestModal
    page.evaluate("window.p1Quests = []; window.saveQuests();")
    page.evaluate("window.openQuestModal(1, 'quest_npc_1');")
    page.wait_for_timeout(500)

    # Click Accept Quest Button
    page.click("#questAcceptBtn_p1")
    page.wait_for_timeout(500)

    # Check if quest modal is open and visible
    is_modal_visible = page.is_visible("#questModal_p1")
    print(f"Quest Modal visible: {is_modal_visible}")
    assert is_modal_visible == True, "Quest Modal should be visible after opening"

    # Capture the accepted quest title
    active_quest_title = page.evaluate("window.p1Quests[0].title")
    active_quest_type = page.evaluate("window.p1Quests[0].type")
    active_quest_target = page.evaluate("window.p1Quests[0].target")
    print(f"Accepted Quest Title: {active_quest_title} (Type: {active_quest_type}, Target: {active_quest_target})")
    assert len(active_quest_title) > 0, "Quest title should not be empty"

    # 6. Test Quest update mechanism (simulate action matching the quest type)
    if active_quest_type == 'catch':
        # Simulate catching the target creature
        print(f"Simulating catching creature: {active_quest_target}")
        page.evaluate(f"window.saveCollected({{ id: 'test_c_quest', name: '{active_quest_target}', level: 1, currentHp: 50, stats: {{ health: 50 }} }}, 1);")
    elif active_quest_type == 'breed':
        # Simulate breeding the correct types
        t1 = active_quest_target['type1']
        t2 = active_quest_target['type2']
        print(f"Simulating breeding parent types: {t1} and {t2}")
        page.evaluate(f"""
        const p1 = {{ id: 'test_bp1', name: 'Parent1', type: '{t1}', gender: 'Male', currentHp: 50, stats: {{ health: 50 }} }};
        const p2 = {{ id: 'test_bp2', name: 'Parent2', type: '{t2}', gender: 'Female', currentHp: 50, stats: {{ health: 50 }} }};
        window.collectedCreatures = [p1, p2];
        document.getElementById('parent1Select').innerHTML = '<option value="test_bp1">Parent1</option>';
        document.getElementById('parent2Select').innerHTML = '<option value="test_bp2">Parent2</option>';
        document.getElementById('parent1Select').value = 'test_bp1';
        document.getElementById('parent2Select').value = 'test_bp2';
        window.doBreed(1);
        """)
    elif active_quest_type == 'defeat_trainer':
        # Simulate defeating the target trainer
        print(f"Simulating defeating trainer: {active_quest_target}")
        page.evaluate(f"""
        window.isNpcBattle = true;
        window.activeNpcTrainerId = 'npc_trainer_1';
        window.getNpcTrainerName = () => '{active_quest_target}';
        window.endBattle('win');
        """)
    elif active_quest_type == 'player_level':
        # Simulate gaining player XP to level up to target
        target_lvl = active_quest_target
        print(f"Simulating reaching player level: {target_lvl}")
        page.evaluate(f"window.p1Level = {target_lvl}; window.savePlayerLevels(); window.gainPlayerXp(1, 0);")
    elif active_quest_type == 'creature_level':
        # Simulate reaching creature level
        target_lvl = active_quest_target
        print(f"Simulating reaching creature level: {target_lvl}")
        page.evaluate(f"window.collectedCreatures = [{{ id: 'test_c1', name: 'EmberBear', level: {target_lvl}, currentHp: 50, stored: false, stats: {{ health: 50 }} }}]; window.evaluateActiveQuests(1);")
    elif active_quest_type == 'challenge_tier':
        # Simulate reaching challenge tier
        target_tier = active_quest_target
        print(f"Simulating reaching challenge tier: {target_tier}")
        page.evaluate(f"window.challengeTier = {target_tier}; window.evaluateActiveQuests(1);")

    page.wait_for_timeout(1000)

    # Check if progress has advanced
    q_progress = page.evaluate("window.p1Quests[0].progress")
    q_target_count = page.evaluate("window.p1Quests[0].targetCount")
    print(f"Quest Progress: {q_progress} / {q_target_count}")
    assert q_progress >= q_target_count, f"Quest progress should be completed. Progress: {q_progress}/{q_target_count}"

    # 7. Complete the Quest and claim rewards
    page.evaluate("window.coins = 100; window.p1Level = 1; window.p1Xp = 0; window.inventory = [];")
    page.evaluate("window.openQuestModal(1, 'quest_npc_1');")
    page.wait_for_timeout(500)

    # Click claim rewards button (which should be visible since it is completed)
    claim_btn_visible = page.is_visible("#questCompleteBtn_p1")
    print(f"Claim Rewards Button Visible: {claim_btn_visible}")
    assert claim_btn_visible == True, "Complete button should be visible"

    page.click("#questCompleteBtn_p1")
    page.wait_for_timeout(1000)

    # Verify rewards claimed
    p_coins = page.evaluate("window.coins")
    p_xp = page.evaluate("window.p1Xp")
    p_inventory = page.evaluate("window.inventory || []")
    print(f"Player State after reward: Coins: {p_coins}, XP: {p_xp}, Inventory: {p_inventory}")
    assert p_coins > 100, "Should have received coins reward"
    assert p_xp > 0, "Should have received XP reward"
    assert len(p_inventory) > 0 or p_coins > 100, "Should have received an item or coin reward"

    print("ALL QUEST INTEGRATION AND LIFECYCLE TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    os.makedirs("verification_screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_quest_tests(page)
        finally:
            context.close()
            browser.close()
