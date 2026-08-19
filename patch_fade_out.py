import re

with open('index.html', 'r') as f:
    content = f.read()

# Add modalFadeOut
keyframes_fade_out = """
        @keyframes modalFadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }

        .modal-fade-out {
            animation: modalFadeOut 0.2s ease-out forwards !important;
        }
"""

if "modalFadeOut" not in content:
    content = content.replace("@keyframes modalFadeIn {", keyframes_fade_out + "\n        @keyframes modalFadeIn {")

with open('index.html', 'w') as f:
    f.write(content)
