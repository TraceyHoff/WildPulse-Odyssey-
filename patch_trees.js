const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace tree shadow creation
code = code.replace(
    /let treeShadow = scene\.add\.sprite\(posX, posY, seasonKey\);\n\s*treeShadow\.setTintFill\(0x000000\);\n\s*treeShadow\.setAlpha\(0\.3\);\n\s*treeShadow\.setOrigin\(0\.5, 1\.0\);/g,
    `let treeShadow = scene.add.sprite(posX, posY, seasonKey);
            treeShadow.setScale(2.5);
            treeShadow.setTintFill(0x000000);
            treeShadow.setAlpha(0.3);
            treeShadow.setOrigin(0.5, 1.0);`
);

// Replace tree creation
code = code.replace(
    /let tree = window\.treesGroup\.create\(posX, posY, seasonKey\);\n\s*tree\.baseTreeType = treeType;\n\s*tree\.setOrigin\(0\.5, 1\.0\);/g,
    `let tree = window.treesGroup.create(posX, posY, seasonKey);
            tree.setScale(2.5);
            tree.baseTreeType = treeType;
            tree.setOrigin(0.5, 1.0);`
);

fs.writeFileSync('index.html', code);
