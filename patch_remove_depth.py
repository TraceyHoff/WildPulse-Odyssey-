import re

with open('index.html', 'r') as f:
    html = f.read()

# Remove add3DDepth for walls
html = html.replace('add3DDepth(ctx, 12); // Add blocky 3D depth to walls', '// add3DDepth(ctx, 12); // Add blocky 3D depth to walls')
html = html.replace('add3DDepth(wallDefaultCtx, 12);', '// add3DDepth(wallDefaultCtx, 12);')
html = html.replace('add3DDepth(holoWallCtx, 12);', '// add3DDepth(holoWallCtx, 12);')

with open('index.html', 'w') as f:
    f.write(html)
