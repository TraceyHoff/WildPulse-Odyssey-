function drawTypeIcon(ctx, type) {
    ctx.clearRect(0, 0, 16, 16);
    ctx.beginPath();

    // Set styles based on type
    let fill = '#ffffff';
    let stroke = '#000000';

    if (type === 'Fire') {
        fill = '#ff4400';
        ctx.moveTo(8, 2);
        ctx.bezierCurveTo(2, 8, 2, 14, 8, 14);
        ctx.bezierCurveTo(14, 14, 14, 8, 8, 2);
        ctx.fill();
        // Inner flame
        ctx.beginPath();
        ctx.fillStyle = '#ffaa00';
        ctx.moveTo(8, 6);
        ctx.bezierCurveTo(5, 10, 5, 13, 8, 13);
        ctx.bezierCurveTo(11, 13, 11, 10, 8, 6);
        ctx.fill();
    } else if (type === 'Water') {
        fill = '#0088ff';
        ctx.moveTo(8, 2);
        ctx.bezierCurveTo(3, 8, 3, 14, 8, 14);
        ctx.bezierCurveTo(13, 14, 13, 8, 8, 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(6, 11, 1, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === 'Nature') {
        fill = '#00cc44';
        ctx.moveTo(8, 14);
        ctx.bezierCurveTo(0, 14, 0, 2, 8, 2);
        ctx.bezierCurveTo(16, 2, 16, 14, 8, 14);
        ctx.fill();
        ctx.strokeStyle = '#006622';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(8, 14);
        ctx.lineTo(8, 3);
        ctx.stroke();
    } else if (type === 'Electric') {
        fill = '#ffee00';
        ctx.moveTo(9, 1);
        ctx.lineTo(3, 8);
        ctx.lineTo(8, 8);
        ctx.lineTo(7, 15);
        ctx.lineTo(13, 7);
        ctx.lineTo(8, 7);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = '#cc9900';
        ctx.stroke();
    } else if (type === 'Ice') {
        fill = '#00ffff';
        ctx.strokeStyle = fill;
        ctx.lineWidth = 1.5;
        // Hexagon snowflake
        for (let i = 0; i < 6; i++) {
            ctx.moveTo(8, 8);
            ctx.lineTo(8 + Math.cos(i * Math.PI / 3) * 6, 8 + Math.sin(i * Math.PI / 3) * 6);
        }
        ctx.stroke();
    } else if (type === 'Earth') {
        fill = '#8b5a2b';
        ctx.moveTo(2, 14);
        ctx.lineTo(8, 4);
        ctx.lineTo(11, 9);
        ctx.lineTo(14, 14);
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = '#5c3a18';
        ctx.stroke();
    } else if (type === 'Wind') {
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(2, 4); ctx.lineTo(10, 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(4, 8); ctx.lineTo(14, 8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2, 12); ctx.lineTo(12, 12); ctx.stroke();
    } else if (type === 'Light') {
        fill = '#ffffcc';
        ctx.fillStyle = fill;
        ctx.arc(8, 8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 8; i++) {
            ctx.moveTo(8 + Math.cos(i * Math.PI / 4) * 5, 8 + Math.sin(i * Math.PI / 4) * 5);
            ctx.lineTo(8 + Math.cos(i * Math.PI / 4) * 7, 8 + Math.sin(i * Math.PI / 4) * 7);
        }
        ctx.stroke();
    } else if (type === 'Dark') {
        fill = '#440088';
        ctx.fillStyle = fill;
        ctx.arc(8, 8, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(10, 6, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    } else if (type === 'Cosmic') {
        fill = '#aa00ff';
        ctx.fillStyle = fill;
        ctx.arc(8, 8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(8, 8, 7, 3, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();
    } else if (type === 'Shiny') {
        fill = '#ffff00';
        ctx.fillStyle = fill;
        ctx.moveTo(8, 1);
        ctx.lineTo(10, 6);
        ctx.lineTo(15, 6);
        ctx.lineTo(11, 10);
        ctx.lineTo(12, 15);
        ctx.lineTo(8, 12);
        ctx.lineTo(4, 15);
        ctx.lineTo(5, 10);
        ctx.lineTo(1, 6);
        ctx.lineTo(6, 6);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#ccaa00';
        ctx.stroke();
    }
}
