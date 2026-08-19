const fs = require('fs');

let code = fs.readFileSync('index.html', 'utf8');

const searchCode = `window.createTypeIconTexture = function(scene, type) {
    const key = \`type_icon_\${type}\`;
    if (scene.textures.exists(key)) return key;

    const dCanvas = document.createElement('canvas');
    dCanvas.width = 16;
    dCanvas.height = 16;
    const ctx = dCanvas.getContext('2d');

    const typeColors = {
        'Fire': '#FF4500', 'Water': '#1E90FF', 'Grass': '#32CD32',
        'Electric': '#FFD700', 'Ice': '#00BFFF', 'Fighting': '#C22E28',
        'Poison': '#A040A0', 'Ground': '#E0C068', 'Flying': '#A890F0',
        'Psychic': '#F85888', 'Bug': '#A8B820', 'Rock': '#B8A038',
        'Ghost': '#705898', 'Dragon': '#7038F8', 'Dark': '#705848',
        'Steel': '#B8B8D0', 'Fairy': '#EE99AC', 'Normal': '#A8A878'
    };

    const color = typeColors[type] || '#A8A878';
    const initial = (type && type.length > 0) ? type.charAt(0).toUpperCase() : '?';

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "Courier New", Courier, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, 8, 8);

    scene.textures.addCanvas(key, dCanvas);
    return key;
};`;

const replaceCode = `window.createTypeIconTexture = function(scene, type) {
    const key = \`type_icon_\${type}\`;
    if (scene.textures.exists(key)) return key;

    const dCanvas = document.createElement('canvas');
    dCanvas.width = 16;
    dCanvas.height = 16;
    const ctx = dCanvas.getContext('2d');

    const typeColors = {
        'Fire': '#FF4500', 'Water': '#1E90FF', 'Grass': '#32CD32',
        'Electric': '#FFD700', 'Ice': '#00BFFF', 'Fighting': '#C22E28',
        'Poison': '#A040A0', 'Ground': '#E0C068', 'Flying': '#A890F0',
        'Psychic': '#F85888', 'Bug': '#A8B820', 'Rock': '#B8A038',
        'Ghost': '#705898', 'Dragon': '#7038F8', 'Dark': '#705848',
        'Steel': '#B8B8D0', 'Fairy': '#EE99AC', 'Normal': '#A8A878'
    };
    const color = typeColors[type] || '#A8A878';

    const typePaths = {
        'Fire': '<path d="M8 1 C10 1 12 5 12 9 C12 12 10 15 8 15 C5 15 3 12 3 9 C3 5 6 1 8 1 Z" fill="' + color + '"/>',
        'Water': '<path d="M8 2 C10 6 13 9 13 12 C13 14.5 11 16 8 16 C5 16 3 14.5 3 12 C3 9 6 6 8 2 Z" fill="' + color + '"/>',
        'Grass': '<path d="M8 2 C12 2 14 5 14 9 C14 13 10 15 8 15 C5 15 2 12 2 8 C2 4 5 2 8 2 Z" fill="' + color + '"/>',
        'Electric': '<path d="M9 1 L3 9 L8 9 L7 15 L13 7 L8 7 Z" fill="' + color + '"/>',
        'Ice': '<path d="M8 2 L9 5 L12 4 L10 7 L14 8 L10 9 L12 12 L9 11 L8 14 L7 11 L4 12 L6 9 L2 8 L6 7 L4 4 L7 5 Z" fill="' + color + '"/>',
        'Fighting': '<path d="M3 5 C3 3 5 3 5 5 L5 11 C5 13 3 13 3 11 Z M7 5 C7 3 9 3 9 5 L9 11 C9 13 7 13 7 11 Z M11 5 C11 3 13 3 13 5 L13 11 C13 13 11 13 11 11 Z" fill="' + color + '"/>',
        'Poison': '<path d="M8 2 C11 2 13 5 13 8 C13 11 10 12 10 14 L6 14 C6 12 3 11 3 8 C3 5 5 2 8 2 Z M6 9 A1 1 0 1 0 6 7 A1 1 0 1 0 6 9 Z M10 9 A1 1 0 1 0 10 7 A1 1 0 1 0 10 9 Z" fill="' + color + '"/>',
        'Ground': '<path d="M2 14 L7 6 L10 11 L12 8 L15 14 Z" fill="' + color + '"/>',
        'Flying': '<path d="M2 8 C5 4 10 4 14 2 C12 6 10 10 8 12 C6 10 4 10 2 8 Z" fill="' + color + '"/>',
        'Psychic': '<path d="M8 4 C3 4 1 8 1 8 C1 8 3 12 8 12 C13 12 15 8 15 8 C15 8 13 4 8 4 Z M8 10 C6.9 10 6 9.1 6 8 C6 6.9 6.9 6 8 6 C9.1 6 10 6.9 10 8 C10 9.1 9.1 10 8 10 Z" fill="' + color + '"/>',
        'Bug': '<path d="M8 2 C10 2 11 4 11 6 C11 7 10 8 10 8 C12 10 12 13 10 14 C8 15 8 15 6 14 C4 13 4 10 6 8 C6 8 5 7 5 6 C5 4 6 2 8 2 Z" fill="' + color + '"/>',
        'Rock': '<path d="M8 2 L13 5 L14 10 L10 14 L5 13 L2 9 L4 4 Z" fill="' + color + '"/>',
        'Ghost': '<path d="M8 2 C4 2 3 6 3 9 L3 14 L5 12 L8 14 L11 12 L13 14 L13 9 C13 6 12 2 8 2 Z" fill="' + color + '"/>',
        'Dragon': '<path d="M3 14 C3 14 2 8 6 5 C9 3 13 2 13 2 C13 2 12 6 9 9 C7 11 5 12 3 14 Z" fill="' + color + '"/>',
        'Dark': '<path d="M10 2 C6 2 3 6 3 10 C3 13 6 15 8 15 C6 13 6 10 8 8 C10 6 13 6 15 8 C15 6 13 2 10 2 Z" fill="' + color + '"/>',
        'Steel': '<path d="M8 2 L14 6 L14 10 L8 14 L2 10 L2 6 Z M8 5 L11 7 L11 9 L8 11 L5 9 L5 7 Z" fill="' + color + '"/>',
        'Fairy': '<path d="M8 2 L9 6 L13 7 L9 8 L8 12 L7 8 L3 7 L7 6 Z M13 3 L14 5 L16 5 L14 6 L15 8 L13 7 L11 8 L12 6 L10 5 L12 5 Z" fill="' + color + '"/>',
        'Normal': '<circle cx="8" cy="8" r="6" fill="none" stroke="' + color + '" stroke-width="2"/><circle cx="8" cy="8" r="2" fill="' + color + '"/>'
    };

    const svgPath = typePaths[type] || typePaths['Normal'];
    const svgString = \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\${svgPath}</svg>\`;

    // Initially transparent or simple circle before SVG loads
    ctx.clearRect(0, 0, 16, 16);
    scene.textures.addCanvas(key, dCanvas);

    const img = new Image();
    img.onload = () => {
        ctx.clearRect(0, 0, 16, 16);
        ctx.drawImage(img, 0, 0, 16, 16);
        if (scene && scene.textures && scene.textures.exists(key)) {
            const tex = scene.textures.get(key);
            if (tex && tex.source && tex.source[0]) {
                tex.source[0].update();
            }
        }
    };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);

    return key;
};`;

if(code.includes(searchCode)){
  code = code.replace(searchCode, replaceCode);
  fs.writeFileSync('index.html', code);
  console.log('Success');
} else {
  console.log('Search code not found');
}
