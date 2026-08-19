const fs = require('fs');

let code = `
window.createTypeIconTexture = function(scene, type) {
    const key = 'type_icon_' + type;
    if (scene.textures.exists(key)) return key;

    const dCanvas = document.createElement('canvas');
    dCanvas.width = 16;
    dCanvas.height = 16;
    const ctx = dCanvas.getContext('2d');

    // Temporary placeholder (just a black transparent box, or the old circle)
    const typeColors = {
        'Fire': '#FF4500', 'Water': '#1E90FF', 'Grass': '#32CD32',
        'Electric': '#FFD700', 'Ice': '#00BFFF', 'Fighting': '#C22E28',
        'Poison': '#A040A0', 'Ground': '#E0C068', 'Flying': '#A890F0',
        'Psychic': '#F85888', 'Bug': '#A8B820', 'Rock': '#B8A038',
        'Ghost': '#705898', 'Dragon': '#7038F8', 'Dark': '#705848',
        'Steel': '#B8B8D0', 'Fairy': '#EE99AC', 'Normal': '#A8A878'
    };
    const color = typeColors[type] || '#A8A878';

    // Initial draw (optional, can just be transparent)
    // ctx.fillStyle = color;
    // ctx.beginPath(); ctx.arc(8, 8, 8, 0, 2 * Math.PI); ctx.fill();

    scene.textures.addCanvas(key, dCanvas);

    const svgString = window.getTypeIconSVG(type, color);
    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, 16, 16);
        ctx.drawImage(img, 0, 0, 16, 16);
        if (scene.textures.exists(key)) {
            let tex = scene.textures.get(key);
            if (tex && tex.source && tex.source[0]) {
                tex.source[0].update();
            }
        }
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

    return key;
};

window.getTypeIconSVG = function(type, color) {
    let path = '';
    if (type === 'Fire') {
        path = '<path d="M8 1 C8 1 3 5 3 10 C3 14 5 15 8 15 C11 15 13 14 13 10 C13 5 8 1 8 1 Z" fill="' + color + '" />';
    } else {
        path = '<circle cx="8" cy="8" r="7" fill="' + color + '" />';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' + path + '</svg>';
};
`;

console.log('Script written');
