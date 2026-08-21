import re

with open('index.html', 'r') as f:
    content = f.read()

# p1 onboarding slide 3
search_p1 = """                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button id="introItemPrevBtn" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(0, 255, 204, 0.1); color: #00ffcc; border: 1px solid #00ffcc; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,255,204,0.2)'" onmouseout="this.style.background='rgba(0,255,204,0.1)'">&lt; PREV ITEM</button>
                        <button id="introItemNextBtn" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(0, 255, 204, 0.1); color: #00ffcc; border: 1px solid #00ffcc; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,255,204,0.2)'" onmouseout="this.style.background='rgba(0,255,204,0.1)'">NEXT ITEM &gt;</button>
                    </div>
                </div>
            </div>"""

replace_p1 = """                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button id="introItemPrevBtn" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(0, 255, 204, 0.1); color: #00ffcc; border: 1px solid #00ffcc; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,255,204,0.2)'" onmouseout="this.style.background='rgba(0,255,204,0.1)'">&lt; PREV ITEM</button>
                        <button id="introItemNextBtn" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(0, 255, 204, 0.1); color: #00ffcc; border: 1px solid #00ffcc; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,255,204,0.2)'" onmouseout="this.style.background='rgba(0,255,204,0.1)'">NEXT ITEM &gt;</button>
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); border: 1px solid #00ffcc; border-radius: 8px; padding: 12px; margin-top: 15px;">
                    <p style="color: #ffd700; font-weight: bold; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 0 5px rgba(255,215,0,0.4);">⭐ Item Tiers:</p>
                    <p style="color: #ccc; font-size: 12px; margin-top: 0;">Some items, like stat boosters, come in different tiers. Higher tiers offer stronger effects! You can earn them by completing procedural quests.</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 12px; color: #ddd;">
                        <div style="background: rgba(0,255,204,0.05); padding: 5px; border-radius: 4px; border: 1px solid rgba(0,255,204,0.1); text-align: center;"><strong style="color: #00ffcc;">Uncommon</strong></div>
                        <div style="background: rgba(0,255,204,0.05); padding: 5px; border-radius: 4px; border: 1px solid rgba(0,255,204,0.1); text-align: center;"><strong style="color: #00ffcc;">Rare</strong></div>
                        <div style="background: rgba(0,255,204,0.05); padding: 5px; border-radius: 4px; border: 1px solid rgba(0,255,204,0.1); text-align: center;"><strong style="color: #00ffcc;">Exquisite</strong></div>
                    </div>
                </div>
            </div>"""

content = content.replace(search_p1, replace_p1)

search_p2 = """                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button id="introItemPrevBtn_p2" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(255, 0, 255, 0.1); color: #ff00ff; border: 1px solid #ff00ff; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,0,255,0.2)'" onmouseout="this.style.background='rgba(255,0,255,0.1)'">&lt; PREV ITEM</button>
                        <button id="introItemNextBtn_p2" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(255, 0, 255, 0.1); color: #ff00ff; border: 1px solid #ff00ff; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,0,255,0.2)'" onmouseout="this.style.background='rgba(255,0,255,0.1)'">NEXT ITEM &gt;</button>
                    </div>
                </div>
            </div>"""

replace_p2 = """                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button id="introItemPrevBtn_p2" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(255, 0, 255, 0.1); color: #ff00ff; border: 1px solid #ff00ff; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,0,255,0.2)'" onmouseout="this.style.background='rgba(255,0,255,0.1)'">&lt; PREV ITEM</button>
                        <button id="introItemNextBtn_p2" style="padding: 6px 15px; font-family: 'Courier New', monospace; font-size: 12px; background: rgba(255, 0, 255, 0.1); color: #ff00ff; border: 1px solid #ff00ff; cursor: pointer; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,0,255,0.2)'" onmouseout="this.style.background='rgba(255,0,255,0.1)'">NEXT ITEM &gt;</button>
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); border: 1px solid #ff3366; border-radius: 8px; padding: 12px; margin-top: 15px;">
                    <p style="color: #ffd700; font-weight: bold; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 0 5px rgba(255,215,0,0.4);">⭐ Item Tiers:</p>
                    <p style="color: #ccc; font-size: 12px; margin-top: 0;">Some items, like stat boosters, come in different tiers. Higher tiers offer stronger effects! You can earn them by completing procedural quests.</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 12px; color: #ddd;">
                        <div style="background: rgba(255,51,102,0.05); padding: 5px; border-radius: 4px; border: 1px solid rgba(255,51,102,0.1); text-align: center;"><strong style="color: #ff3366;">Uncommon</strong></div>
                        <div style="background: rgba(255,51,102,0.05); padding: 5px; border-radius: 4px; border: 1px solid rgba(255,51,102,0.1); text-align: center;"><strong style="color: #ff3366;">Rare</strong></div>
                        <div style="background: rgba(255,51,102,0.05); padding: 5px; border-radius: 4px; border: 1px solid rgba(255,51,102,0.1); text-align: center;"><strong style="color: #ff3366;">Exquisite</strong></div>
                    </div>
                </div>
            </div>"""

content = content.replace(search_p2, replace_p2)

with open('index.html', 'w') as f:
    f.write(content)
