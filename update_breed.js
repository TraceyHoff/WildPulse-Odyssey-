const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const breedSearch = `    const childFeatures = uniqueFeatures.slice(0, Math.min(4, Math.max(2, Math.floor(uniqueFeatures.length / 2))));

    const descTemplates = [
        \`Born of \${parent1.name} and \${parent2.name}, \${childName} is a rare marvel. It beautifully blends the \${parent1.features.length ? parent1.features.join(' and ') : 'majestic form'} of its \${parent1.type} parent with the distinctive \${parent2.features.length ? parent2.features.join(' and ') : 'elegant traits'} of its \${parent2.type} lineage. The result is a striking hybrid whose unique \${childFeatures.join(', ')} create a powerful, one-of-a-kind silhouette that commands respect.\`,
        \`A stunning fusion of \${parent1.name}'s robust qualities and \${parent2.name}'s agile essence, \${childName} showcases a breathtaking mixed appearance. Its \${parent1.type} heritage infuses textured strength and glowing accents, while its \${parent2.type} lineage adds flowing lines and vibrant markings. Proudly displaying \${childFeatures.join(', ')}, this creature paints a vivid picture of evolutionary synergy and formidable presence.\`,
        \`\${childName} moves with the grace of \${parent1.name} blended with the raw power of \${parent2.name}. The convergence of \${parent1.type} and \${parent2.type} energies has produced a wholly unique aura and hybrid physique. Distinctive \${childFeatures.join(' and ')} mark its body, giving it an unpredictable yet harmonious look that makes it truly formidable.\`
    ];
    let childDesc = descTemplates[Math.floor(Math.random() * descTemplates.length)];`;

const breedReplace = `    const childFeatures = uniqueFeatures.slice(0, Math.min(4, Math.max(2, Math.floor(uniqueFeatures.length / 2))));

    // Inherit the 11 visual characteristics
    const inheritedTraits = {
        bodySize: Math.random() < 0.5 ? parent1.bodySize : parent2.bodySize,
        bodyType: Math.random() < 0.5 ? parent1.bodyType : parent2.bodyType,
        uniqueFeature: Math.random() < 0.5 ? parent1.uniqueFeature : parent2.uniqueFeature,
        eyes: Math.random() < 0.5 ? parent1.eyes : parent2.eyes,
        skinFurType: Math.random() < 0.5 ? parent1.skinFurType : parent2.skinFurType,
        pattern: Math.random() < 0.5 ? parent1.pattern : parent2.pattern,
        wings: Math.random() < 0.5 ? parent1.wings : parent2.wings,
        clawHorn: Math.random() < 0.5 ? parent1.clawHorn : parent2.clawHorn,
        teeth: Math.random() < 0.5 ? parent1.teeth : parent2.teeth,
        limbs: Math.random() < 0.5 ? parent1.limbs : parent2.limbs,
        tail: Math.random() < 0.5 ? parent1.tail : parent2.tail
    };

    const childGeneration = Math.max(parent1.generation, parent2.generation) + 1;
    const childType = (parent1.type === parent2.type) ? parent1.type : \`\${parent1.type}-\${parent2.type}\`;

    // Advanced description blending
    let childDesc = \`A generation \${childGeneration} marvel, \${childName} beautifully blends the traits of its parents, \${parent1.name} (\${parent1.type}) and \${parent2.name} (\${parent2.type}). \`;
    childDesc += \`It has inherited a \${inheritedTraits.bodySize}, \${inheritedTraits.bodyType} \${childType}-type body. \`;
    childDesc += \`Its form is covered in \${inheritedTraits.skinFurType} skin exhibiting distinct \${inheritedTraits.pattern}. \`;
    childDesc += \`\${inheritedTraits.eyes} eyes gaze out with an ancestral intelligence. \`;

    if (inheritedTraits.wings !== 'none') childDesc += \`It soars gracefully on \${inheritedTraits.wings}. \`;
    if (inheritedTraits.clawHorn !== 'none') childDesc += \`It brandishes \${inheritedTraits.clawHorn} with striking confidence. \`;
    if (inheritedTraits.teeth !== 'none') childDesc += \`It bears \${inheritedTraits.teeth} inherited from its lineage. \`;

    childDesc += \`It moves adeptly on \${inheritedTraits.limbs}. \`;
    if (inheritedTraits.tail !== 'none') childDesc += \`A \${inheritedTraits.tail} follows its every motion. \`;

    childDesc += \`Most stunningly, it manifests \${inheritedTraits.uniqueFeature}, a perfect synergy of its parents' extraordinary qualities.\`;`;

const returnSearch = `        type: childType,
        stats: childStats,
        generation: childGeneration,
        color: childColor,`;

const returnReplace = `        ...inheritedTraits,
        type: childType,
        stats: childStats,
        generation: childGeneration,
        color: childColor,`;

html = html.replace(breedSearch, breedReplace);
html = html.replace(returnSearch, returnReplace);

// Also need to remove the duplicate "childGeneration =" and "childType =" lines since I moved them up
const duplicateSearch = `    const childType = (parent1.type === parent2.type) ? parent1.type : \`\${parent1.type}-\${parent2.type}\`;

    const childStats = {`;

const duplicateReplace = `    const childStats = {`;

html = html.replace(duplicateSearch, duplicateReplace);

const duplicateSearch2 = `        specialDefense: Math.floor(((parent1.stats.specialDefense || 50) + (parent2.stats.specialDefense || 50)) / 2)
    };

    const childGeneration = Math.max(parent1.generation, parent2.generation) + 1;

    // Unique ID combining parent IDs and timestamp to avoid collisions`;

const duplicateReplace2 = `        specialDefense: Math.floor(((parent1.stats.specialDefense || 50) + (parent2.stats.specialDefense || 50)) / 2)
    };

    // Unique ID combining parent IDs and timestamp to avoid collisions`;

html = html.replace(duplicateSearch2, duplicateReplace2);

fs.writeFileSync('index.html', html);
console.log("Updated breed function in index.html");
