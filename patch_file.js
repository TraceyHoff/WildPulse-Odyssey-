const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove collider for creaturesGroup and obstaclesGroup
content = content.replace("this.physics.add.collider(creaturesGroup, obstaclesGroup);", "// this.physics.add.collider(creaturesGroup, obstaclesGroup);");

// 2. Change grass checks to allow obs
content = content.replace("if (mapData[row] && mapData[row][col] === 'grass' && (!window.isWithinSightOfHospital || !window.isWithinSightOfHospital(tryX, tryY)) && (!window.isWithinHomeArea || !window.isWithinHomeArea(tryX, tryY))) {", "if (mapData[row] && (mapData[row][col] === 'grass' || mapData[row][col] === 'obs') && (!window.isWithinSightOfHospital || !window.isWithinSightOfHospital(tryX, tryY)) && (!window.isWithinHomeArea || !window.isWithinHomeArea(tryX, tryY))) {");

content = content.replace("if (mapData[row] && mapData[row][col] === 'grass') {", "if (mapData[row] && (mapData[row][col] === 'grass' || mapData[row][col] === 'obs')) {");
content = content.replace("if (mapData[row] && mapData[row][col] === 'grass') {", "if (mapData[row] && (mapData[row][col] === 'grass' || mapData[row][col] === 'obs')) {");

content = content.replace("if (mapData[row] && mapData[row][col] === 'grass' && (!window.isWithinSightOfHospital || !window.isWithinSightOfHospital(targetX, targetY)) && (!window.isWithinHomeArea || !window.isWithinHomeArea(targetX, targetY))) {", "if (mapData[row] && (mapData[row][col] === 'grass' || mapData[row][col] === 'obs') && (!window.isWithinSightOfHospital || !window.isWithinSightOfHospital(targetX, targetY)) && (!window.isWithinHomeArea || !window.isWithinHomeArea(targetX, targetY))) {");

content = content.replace("if (mapData[row] && mapData[row][col] === 'grass' && (!window.isWithinSightOfHospital || !window.isWithinSightOfHospital(targetX, targetY)) && (!window.isWithinHomeArea || !window.isWithinHomeArea(targetX, targetY))) {", "if (mapData[row] && (mapData[row][col] === 'grass' || mapData[row][col] === 'obs') && (!window.isWithinSightOfHospital || !window.isWithinSightOfHospital(targetX, targetY)) && (!window.isWithinHomeArea || !window.isWithinHomeArea(targetX, targetY))) {");

fs.writeFileSync('index.html', content);
