import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace timeout durations
content = content.replace("}, 500);", "}, 1500);", 1)  # Change entry cinematic overlay timeout from 500 to 1500

# To make sure we replace the correct ones:
# We want to change the exit cinematic overlay timeout:
#   from 200 to 1200 for the start of opacity transition
#   from 400 to 1400 for setting display to none
content = content.replace("""
                            setTimeout(() => {
                                overlay.style.transition = 'opacity 0.2s ease';
                                overlay.style.opacity = '0';
                            }, 200);

                            setTimeout(() => {
                                overlay.style.display = 'none';
                                overlay.style.opacity = '1'; // reset for next time
                            }, 400);""", """
                            setTimeout(() => {
                                overlay.style.transition = 'opacity 0.2s ease';
                                overlay.style.opacity = '0';
                            }, 1200);

                            setTimeout(() => {
                                overlay.style.display = 'none';
                                overlay.style.opacity = '1'; // reset for next time
                            }, 1400);""")


with open('index.html', 'w') as f:
    f.write(content)
