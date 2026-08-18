const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the start of the manual furniture drawing block
const startComment = '// Neon Couch';
const startIndex = html.indexOf(startComment);

// Find the end of the manual furniture drawing block
const endComment = 'function generateMiscTextures';
const endIndex = html.indexOf(endComment);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find the block to replace.");
    process.exit(1);
}

// Ensure the start of the block is correctly scoped inside `generateHomeInteriorTextures`
const replacementCode = `    // Generate furniture textures dynamically from their SVGs
    const furnitureMap = {
        "Neon Couch": "furniture_couch_tile",
        "L-Couch": "furniture_lcouch_tile",
        "Love Seat": "furniture_loveseat_tile",
        "Office Chair": "furniture_officechair_tile",
        "Stool": "furniture_stool_tile",
        "Coffee Table": "furniture_coffeetable_tile",
        "Dining Table": "furniture_diningtable_tile",
        "Park Bench": "furniture_parkbench_tile",
        "Cyber Bench": "furniture_cyberbench_tile",
        "Filing Cabinet": "furniture_filingcabinet_tile",
        "Display Cabinet": "furniture_displaycabinet_tile",
        "Nightstand": "furniture_nightstand_tile",
        "Corner Table": "furniture_cornertable_tile",
        "Bunk Bed": "furniture_bunkbed_tile",
        "King Bed": "furniture_kingbed_tile",
        "Desk": "furniture_desk_tile",
        "Carpet": "furniture_carpet_tile",
        "Star Carpet": "furniture_starcarpet_tile",
        "Round Carpet": "furniture_roundcarpet_tile",
        "Hex Carpet": "furniture_hexcarpet_tile",
        "Heart Carpet": "furniture_heartcarpet_tile",
        "Diamond Carpet": "furniture_diamondcarpet_tile",
        "Basic Bed": "furniture_bed_tile",
        "Chair": "furniture_chair_tile",
        "Table": "furniture_table_tile",
        "Crystal Bonsai": "furniture_crystal_bonsai_tile",
        "Neon Fern": "furniture_neon_fern_tile",
        "Plasma Cactus": "furniture_plasma_cactus_tile",
        "Holo Orchid": "furniture_holo_orchid_tile",
        "House Plant": "furniture_plant_tile",
        "Floor Lamp": "furniture_lamp_tile",
        "Ficus": "furniture_ficus_tile",
        "Monstera": "furniture_monstera_tile",
        "Bamboo": "furniture_bamboo_tile",
        "Succulent": "furniture_succulent_tile",
        "Holo-Rose": "furniture_holorose_tile",
        "Glowing Mushroom": "furniture_mushroom_tile",
        "Cyber Sunflower": "furniture_sunflower_tile",
        "Zen Bonsai": "furniture_zenbonsai_tile",
        "Lunar Lily": "furniture_lunarlily_tile",
        "Cyber Tree": "furniture_cybertree_tile",
        "Neon Pine": "furniture_neonpine_tile",
        "Server Rack": "furniture_server_tile",
        "Arcade Machine": "furniture_arcade_tile",
        "Cyber TV": "furniture_tv_tile",
        "Neon Shelf": "furniture_shelf_tile",
        "Tech Bin": "furniture_bin_tile",
        "Neon Wardrobe": "furniture_wardrobe_tile",
        "Cyber Fridge": "furniture_fridge_tile",
        "Holo Display": "furniture_display_tile",
        "Lava Lamp": "furniture_lavalamp_tile",
        "Plasma Globe": "furniture_plasmaglobe_tile",
        "Cyber Poster": "furniture_cyberposter_tile",
        "Neon Sign": "furniture_neonsign_tile",
        "Gaming PC": "furniture_gamingpc_tile",
        "Smart Mirror": "furniture_smartmirror_tile"
    };

    Object.keys(furnitureMap).forEach(itemName => {
        const key = furnitureMap[itemName];

        let svgStr = window.getItemIconHTML(itemName, 100);
        let match = svgStr.match(/<rect[^>]+fill="url\\(#bgGrad\\)"[^>]*>([\\s\\S]*?)<span/);

        // If the regex above fails, we fallback to a simpler match for the inner content
        if(!match) {
            match = svgStr.match(/<rect[^>]+fill="url\\(#bgGrad\\)"[^>]*>([\\s\\S]*?)(<span|\\/div>)/);
        }

        if (match) {
            let inner = match[1];

            // Re-wrap the extracted shapes in a fresh SVG container
            let cleanSvg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                \${inner}
            </svg>\`;

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 100;
                canvas.height = 100;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                if (window.add3DDepth) window.add3DDepth(ctx, 0, 0, 100, 100);

                window.finalizeFurnitureTexture(scene, key, canvas);

                // Floor lamp specific logic
                if (itemName === "Floor Lamp") {
                    window.finalizeFurnitureTexture(scene, 'furniture_lamp_off_tile', canvas);
                    window.finalizeFurnitureTexture(scene, 'furniture_lamp_on_tile', canvas);
                }
            };
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cleanSvg);
        } else {
            console.warn("Could not extract SVG paths for " + itemName);
        }
    });
}

`;

html = html.substring(0, startIndex) + replacementCode + html.substring(endIndex);
fs.writeFileSync('index.html', html);
console.log("Replaced successfully.");
