from playwright.sync_api import Page, expect, sync_playwright
import os

def verify_feature(page: Page):
  page.goto("http://localhost:3000")
  page.wait_for_timeout(2000)

  # Click Menu
  page.get_by_role("button", name="Menu").click()
  page.wait_for_timeout(1000)

  # Take a screenshot of the menu
  page.screenshot(path="/home/jules/verification/verification_menu.png")

  # Click Multiplayer Lobby
  page.get_by_role("button", name="Multiplayer Lobby").click()
  page.wait_for_timeout(1000)

  # Check that the world code is visible
  world_code_el = page.locator("#worldCodeDisplay")
  expect(world_code_el).to_be_visible()
  world_code = world_code_el.inner_text()
  print(f"World Code: {world_code}")
  page.wait_for_timeout(500)

  # Input a friend's code
  friend_input = page.locator("#friendCodeInput")
  friend_input.fill("TESTCODE")
  page.wait_for_timeout(500)

  # Save as friend
  page.get_by_role("button", name="Save as Friend").click()
  page.wait_for_timeout(1000)

  # Take a screenshot of the lobby
  page.screenshot(path="/home/jules/verification/verification_lobby.png")

  # Check if "TESTCODE" is in the friends list display
  friends_list = page.locator("#friendsListDisplay")
  expect(friends_list).to_contain_text("TESTCODE")

  page.wait_for_timeout(1000)

if __name__ == "__main__":
  os.makedirs("/home/jules/verification/video", exist_ok=True)
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(record_video_dir="/home/jules/verification/video")
    page = context.new_page()
    try:
      verify_feature(page)
    finally:
      context.close()
      browser.close()