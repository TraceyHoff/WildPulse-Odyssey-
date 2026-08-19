1.  **Add `introModalSlide4` and `introModalSlide4_p2` in `index.html`:**
    *   Find where `introModalSlide3` and `introModalSlide3_p2` are located in `index.html`.
    *   Add new slides below them for Player 1 (`introModalSlide4`) and Player 2 (`introModalSlide4_p2`) that list the creature types.
    *   The slide will have a grid of creature types with their names and SVG icons.
    *   We will use the active types: `Fire`, `Water`, `Nature` (using the Grass SVG path), `Electric`, `Ice`, `Earth` (using the Ground SVG path), `Wind` (using the Flying SVG path), `Light` (using the Fairy SVG path), `Dark`, `Cosmic` (using the Psychic SVG path), `Normal`, and `Rock` as they appear in `window.typeChart` and `window.TYPE_COLORS`.

2.  **Update Navigation Logic (`advanceIntroModal`, `prevIntroModal`, `showIntroModal`):**
    *   Modify `window.advanceIntroModal` to handle advancing from slide 3 to slide 4, and from slide 4 to closing/customizing. Ensure the text on the "Next" button updates properly to "Configure Avatar 🧬" on slide 4 instead of slide 3. Update title to "[ CREATURE TYPES ]" or similar.
    *   Modify `window.prevIntroModal` to handle navigating back from slide 4 to slide 3.
    *   Update `window.showIntroModal` to initialize the display of `slide4` to `none`.

3.  **Generate the HTML structure:**
    *   Write a script to generate the HTML for `introModalSlide4` and `introModalSlide4_p2` and inject it into `index.html`. The HTML will be a CSS grid containing SVGs mapped to their corresponding types and colors, matching the sleek cyberpunk styling of the existing modal content.
    *   Verify the injection worked successfully by reading the file context and looking at the resulting DOM updates in Bash.

4.  **Complete Pre-commit and Final Testing:**
    *   Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
    *   Explicitly run `npm run test` or `npx playwright test` (using standard execution path in `.github/workflows` or standard local node command) as the final verification stage.
