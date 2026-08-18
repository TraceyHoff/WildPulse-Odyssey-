const fs = require('fs');

const svgs = JSON.parse(fs.readFileSync('extracted_svgs.json', 'utf8'));

// Map SVG names to Phaser texture keys
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

let output = '';

for (const name in svgs) {
    if (!furnitureMap[name]) continue;

    let svg = svgs[name];
    let match = svg.match(/<rect width="100" height="100" rx="20" fill="url\(#bgGrad\)"[^>]*>([\s\S]*?)(<span|<\/svg>)/);
    if (!match) continue;

    let inner = match[1];

    output += `    {\n`;
    output += `        const canvas = document.createElement('canvas');\n`;
    output += `        canvas.width = 100;\n`;
    output += `        canvas.height = 100;\n`;
    output += `        const ctx = canvas.getContext('2d');\n`;
    output += `        \n`;

    // Parse SVG elements
    const elements = inner.split(/<(rect|path|circle|ellipse|line|polygon|polyline) /g);
    for (let i = 1; i < elements.length; i += 2) {
        const type = elements[i];
        const attrStr = elements[i+1].split('>')[0];

        output += `    ctx.save();\n`;

        // Extract attributes
        const fillMatch = attrStr.match(/fill="([^"]+)"/);
        const strokeMatch = attrStr.match(/stroke="([^"]+)"/);
        const strokeWidthMatch = attrStr.match(/stroke-width="([^"]+)"/);
        const opacityMatch = attrStr.match(/opacity="([^"]+)"/);

        if (opacityMatch) {
            output += `    ctx.globalAlpha = ${opacityMatch[1]};\n`;
        } else {
            output += `    ctx.globalAlpha = 1;\n`;
        }

        if (fillMatch && fillMatch[1] !== 'none') {
            output += `    ctx.fillStyle = '${fillMatch[1]}';\n`;
        } else {
            output += `    ctx.fillStyle = 'transparent';\n`;
        }

        if (strokeMatch && strokeMatch[1] !== 'none') {
            output += `    ctx.strokeStyle = '${strokeMatch[1]}';\n`;
        }

        if (strokeWidthMatch) {
            output += `    ctx.lineWidth = ${strokeWidthMatch[1]};\n`;
        }

        if (type === 'rect') {
            const xMatch = attrStr.match(/x="([^"]+)"/) || [0, 0];
            const yMatch = attrStr.match(/y="([^"]+)"/) || [0, 0];
            const wMatch = attrStr.match(/width="([^"]+)"/) || [0, 0];
            const hMatch = attrStr.match(/height="([^"]+)"/) || [0, 0];
            const rxMatch = attrStr.match(/rx="([^"]+)"/) || null;

            if (rxMatch) {
                output += `    ctx.beginPath();\n`;
                output += `    ctx.roundRect(${xMatch[1] || 0}, ${yMatch[1] || 0}, ${wMatch[1] || 0}, ${hMatch[1] || 0}, ${rxMatch[1]});\n`;
                if (fillMatch && fillMatch[1] !== 'none') output += `    ctx.fill();\n`;
                if (strokeMatch && strokeMatch[1] !== 'none') output += `    ctx.stroke();\n`;
            } else {
                if (fillMatch && fillMatch[1] !== 'none') output += `    ctx.fillRect(${xMatch[1] || 0}, ${yMatch[1] || 0}, ${wMatch[1] || 0}, ${hMatch[1] || 0});\n`;
                if (strokeMatch && strokeMatch[1] !== 'none') output += `    ctx.strokeRect(${xMatch[1] || 0}, ${yMatch[1] || 0}, ${wMatch[1] || 0}, ${hMatch[1] || 0});\n`;
            }
        } else if (type === 'path') {
            const dMatch = attrStr.match(/d="([^"]+)"/);
            if (dMatch) {
                output += `    var path = new Path2D('${dMatch[1]}');\n`;
                if (fillMatch && fillMatch[1] !== 'none') output += `    ctx.fill(path);\n`;
                if (strokeMatch && strokeMatch[1] !== 'none') output += `    ctx.stroke(path);\n`;
            }
        } else if (type === 'circle') {
            const cxMatch = attrStr.match(/cx="([^"]+)"/);
            const cyMatch = attrStr.match(/cy="([^"]+)"/);
            const rMatch = attrStr.match(/r="([^"]+)"/);
            if (cxMatch && cyMatch && rMatch) {
                output += `    ctx.beginPath();\n`;
                output += `    ctx.arc(${cxMatch[1]}, ${cyMatch[1]}, ${rMatch[1]}, 0, Math.PI * 2);\n`;
                if (fillMatch && fillMatch[1] !== 'none') output += `    ctx.fill();\n`;
                if (strokeMatch && strokeMatch[1] !== 'none') output += `    ctx.stroke();\n`;
            }
        } else if (type === 'ellipse') {
            const cxMatch = attrStr.match(/cx="([^"]+)"/);
            const cyMatch = attrStr.match(/cy="([^"]+)"/);
            const rxMatch = attrStr.match(/rx="([^"]+)"/);
            const ryMatch = attrStr.match(/ry="([^"]+)"/);
            if (cxMatch && cyMatch && rxMatch && ryMatch) {
                output += `    ctx.beginPath();\n`;
                output += `    ctx.ellipse(${cxMatch[1]}, ${cyMatch[1]}, ${rxMatch[1]}, ${ryMatch[1]}, 0, 0, Math.PI * 2);\n`;
                if (fillMatch && fillMatch[1] !== 'none') output += `    ctx.fill();\n`;
                if (strokeMatch && strokeMatch[1] !== 'none') output += `    ctx.stroke();\n`;
            }
        }

        output += `    ctx.restore();\n`;
    }

    output += `        if (window.add3DDepth) window.add3DDepth(ctx, 0, 0, 100, 100);\n`;
    output += `        window.finalizeFurnitureTexture(scene, '${furnitureMap[name]}', canvas);\n`;

    if (name === "Floor Lamp") {
        output += `        if (window.add3DDepth) window.add3DDepth(ctx, 0, 0, 100, 100);\n`;
        output += `        if ('${name}' === 'Floor Lamp') {\n`;
        output += `            window.finalizeFurnitureTexture(scene, 'furniture_lamp_off_tile', canvas);\n`;
        output += `            window.finalizeFurnitureTexture(scene, 'furniture_lamp_on_tile', canvas);\n`;
        output += `        }\n`;
    }

    output += `    }\n`;
}

fs.writeFileSync('generated_canvas_code.js', output);
console.log("Done");
