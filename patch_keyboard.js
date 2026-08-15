const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const anchor = `        if (window.p2HomePlacementMode) {
            const pointer = activeScene.input.activePointer;`;

const newCode = `        if (window.p1MiniTilePlacementMode) {
            const pointer = activeScene.input.activePointer;
            if (activeScene._lastP1MiniPointerX === undefined) {
                activeScene._lastP1MiniPointerX = pointer.x;
                activeScene._lastP1MiniPointerY = pointer.y;
            }
            if (pointer.x !== activeScene._lastP1MiniPointerX || pointer.y !== activeScene._lastP1MiniPointerY) {
                const cam = activeScene.cameras.main;
                const wp = cam.getWorldPoint(pointer.x, pointer.y);
                window.p1MiniTilePreviewX = wp.x;
                window.p1MiniTilePreviewY = wp.y;
                activeScene._lastP1MiniPointerX = pointer.x;
                activeScene._lastP1MiniPointerY = pointer.y;
            }

            if (window.p1MiniTilePreviewSprite) {
                window.p1MiniTilePreviewSprite.setPosition(window.p1MiniTilePreviewX, window.p1MiniTilePreviewY);
            }

            // Check for cancel and rotate keys
            const escKey = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            const cKey = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
            const rKey = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

            if (Phaser.Input.Keyboard.JustDown(escKey) || Phaser.Input.Keyboard.JustDown(cKey)) {
                window.cancelMiniTilePlacement(1);
            }
            if (Phaser.Input.Keyboard.JustDown(rKey)) {
                window.p1MiniTileRotation = (window.p1MiniTileRotation + 90) % 360;
                if (window.p1MiniTilePreviewSprite) {
                    window.p1MiniTilePreviewSprite.setAngle(window.p1MiniTileRotation);
                }
            }
        }

        if (window.p2MiniTilePlacementMode) {
            const pointer = activeScene.input.activePointer;
            if (activeScene._lastP2MiniPointerX === undefined) {
                activeScene._lastP2MiniPointerX = pointer.x;
                activeScene._lastP2MiniPointerY = pointer.y;
            }
            if (pointer.x !== activeScene._lastP2MiniPointerX || pointer.y !== activeScene._lastP2MiniPointerY) {
                const cam = (window.coopActive && window.camera2) ? window.camera2 : activeScene.cameras.main;
                const wp = cam.getWorldPoint(pointer.x, pointer.y);
                window.p2MiniTilePreviewX = wp.x;
                window.p2MiniTilePreviewY = wp.y;
                activeScene._lastP2MiniPointerX = pointer.x;
                activeScene._lastP2MiniPointerY = pointer.y;
            }

            if (window.p2MiniTilePreviewSprite) {
                window.p2MiniTilePreviewSprite.setPosition(window.p2MiniTilePreviewX, window.p2MiniTilePreviewY);
            }

            // Check for cancel and rotate keys
            const escKey = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            const cKey = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
            const rKey = activeScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

            if (Phaser.Input.Keyboard.JustDown(escKey) || Phaser.Input.Keyboard.JustDown(cKey)) {
                window.cancelMiniTilePlacement(2);
            }
            if (Phaser.Input.Keyboard.JustDown(rKey)) {
                window.p2MiniTileRotation = (window.p2MiniTileRotation + 90) % 360;
                if (window.p2MiniTilePreviewSprite) {
                    window.p2MiniTilePreviewSprite.setAngle(window.p2MiniTileRotation);
                }
            }
        }

`;

const splitContent = content.split(anchor);
if (splitContent.length === 2) {
    content = splitContent[0] + newCode + anchor + splitContent[1];
    fs.writeFileSync('index.html', content);
    console.log("Patched 4!");
} else {
    console.log("Could not find anchor.");
}
