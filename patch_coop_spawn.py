import re

with open('index.html', 'r') as f:
    content = f.read()

# Player 2 needs to start either at saved position, or next to Player 1.
# Actually, the requirement asks "can they be in their home (or the same location they were at) when they get back on?"
# Currently, it saves position for Player 1, but doesn't seem to save Player 2's position when exiting? Wait, it says:
# "When players exit the game in their home can they be in their home (or the same location they were at) when they get back on?"

# Where is Player 2's position saved?
