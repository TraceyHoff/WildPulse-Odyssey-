1. **Remove 3D depth from walls**
   - The issue asks to make patterns line up perfectly and allow wall intersections to link seamlessly with surrounding patterns.
   - Currently, `add3DDepth(ctx, 12)` is called for walls inside `generateHomeInteriorTextures`.
   - This bakes a 12px 3D isometric bevel into the 100x100 texture itself. When the walls tile next to each other, the left/right/top/bottom bevels overlap and break the seamless repeating texture pattern. This also causes issues when walls are rotated (e.g. `wall.setAngle(90)`).
   - Removing `add3DDepth(ctx, 12)` for `wallStyles` textures, `home_wall_tile`, and `home_holo_wall_tile` will make the walls perfectly flat, allowing their 100x100 texture to tile seamlessly across the grid and through intersections.
   - We will still leave `add3DDepth` for `floorStyles` or `furniture` if they exist. Wait, `floorStyles` do not have `add3DDepth` applied in `generateHomeInteriorTextures`. Let's check.

2. **Wait, we can't just remove 3D depth if it's required for aesthetic...**
   - Is there another way? The issue says "When players have home customization options equipped can we make the patterns line up perfectly and can wall intersections still allow the pattern to link together seamlessly with the surrounding home wall patterns?"
   - Let's check `floorStyles` to see if they get `add3DDepth`.
   - No, they don't.
   - Let's check how we can verify the change.
