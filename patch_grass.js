const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Step 1.1: Remove grass animation play from spawnTile
content = content.replace(
    /grass\.anims\.play\('grass_anim', true\);/g,
    "// grass.anims.play('grass_anim', true);"
);

// Step 1.2: Remove water animation play from spawnTile
content = content.replace(
    /obs\.anims\.play\('water_anim', true\);/g,
    "// obs.anims.play('water_anim', true);"
);

// Step 1.3: Remove foam animation play from spawnTile
content = content.replace(
    /foam\.anims\.play\('foam_anim', true\);/g,
    "// foam.anims.play('foam_anim', true);"
);

// Step 1.4: Remove corner animation play from spawnTile
content = content.replace(
    /corner\.anims\.play\('grass_corner_anim_tl', true\);/g,
    "// corner.anims.play('grass_corner_anim_tl', true);"
);
content = content.replace(
    /corner\.anims\.play\('grass_corner_anim_tr', true\);/g,
    "// corner.anims.play('grass_corner_anim_tr', true);"
);
content = content.replace(
    /corner\.anims\.play\('grass_corner_anim_br', true\);/g,
    "// corner.anims.play('grass_corner_anim_br', true);"
);
content = content.replace(
    /corner\.anims\.play\('grass_corner_anim_bl', true\);/g,
    "// corner.anims.play('grass_corner_anim_bl', true);"
);

fs.writeFileSync('index.html', content, 'utf8');
