const fs = require('fs');

let svgPaths = {
    'Fire': '<path d="M8 1 C8 1 3 5 3 10 C3 14 5 15 8 15 C11 15 13 14 13 10 C13 5 8 1 8 1 Z" fill="currentColor" />',
    'Water': '<path d="M8 2 C8 2 4 7 4 11 C4 13 6 15 8 15 C10 15 12 13 12 11 C12 7 8 2 8 2 Z" fill="currentColor" />',
    'Grass': '<path d="M8 2 C8 2 5 8 5 11 C5 14 6 15 8 15 C10 15 11 14 11 11 C11 8 8 2 8 2 Z" fill="currentColor" />', // wait I can do better
};

// I will just use standard simple svgs, or maybe I can draw them on canvas directly. Wait, the prompt says "custom svg icons". So rendering the SVG string to an image and drawing it is exactly what we need to do.

// Wait, I can generate beautiful SVGs.
