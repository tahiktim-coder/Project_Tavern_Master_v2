const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'Initial project outline');
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Helper to ensure data dir
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function parseClasses() {
    console.log('Parsing Classes...');
    const content = fs.readFileSync(path.join(CONTENT_DIR, 'characters/classes.md'), 'utf-8');
    const lines = content.split('\n');
    
    const classes = {};
    let currentClass = null;
    let currentSection = null;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Class Start (H2)
        if (line.startsWith('## ')) {
            const className = line.replace('## ', '').trim();
            // Skip non-class headers
            if (['CLASS CATEGORIES', 'MARTIAL CLASSES', 'ARCANE CLASSES', 'CUNNING CLASSES', 'DIVINE', 'CLASS SUMMARY TABLE'].some(s => className.includes(s))) continue;

            currentClass = {
                name: className,
                stats: {},
                growth: {},
                specialties: [],
                traits: [], // starting traits
                visualTells: [],
                affinities: []
            };
            classes[className] = currentClass;
            currentSection = null;
            continue;
        }

        if (!currentClass) continue;

        // Sub-sections (H3)
        if (line.startsWith('### ')) {
            currentSection = line.replace('### ', '').trim().toLowerCase();
            continue;
        }

        // Key-Value pairs (**Key**: Value)
        const kvMatch = line.match(/^\*\*(.+?)\*\*:\s*(.+)/);
        if (kvMatch) {
            const key = kvMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');
            const value = kvMatch[2].trim();
            
            if (key === 'id') currentClass.id = value.replace(/`/g, '');
            else if (key === 'category') currentClass.category = value;
            else if (key === 'archetype') currentClass.archetype = value;
            // Add other keys as needed
            continue;
        }

        // List items
        if (line.startsWith('- ')) {
            const item = line.replace('- ', '').trim();
            
            if (currentSection) {
                if (currentSection.includes('base stats')) {
                    const [stat, val] = item.split(':');
                    if (val) currentClass.stats[stat.trim().toLowerCase()] = parseInt(val.split('/')[0]);
                } else if (currentSection.includes('stat growth')) {
                    const [stat, val] = item.split(':');
                    if (val) currentClass.growth[stat.trim().toLowerCase()] = parseInt(val.replace('%', ''));
                } else if (currentSection.includes('specialties')) {
                    currentClass.specialties.push(item);
                } else if (currentSection.includes('starting traits')) {
                    // Extract trait name and chance "Honorbound (40%)"
                    const traitMatch = item.match(/^(.+?)\s*\((\d+)%\)/);
                    if (traitMatch) {
                        currentClass.traits.push({ name: traitMatch[1], chance: parseInt(traitMatch[2]) });
                    } else {
                        currentClass.traits.push({ name: item, chance: 100 });
                    }
                } else if (currentSection.includes('visual')) {
                    currentClass.visualTells.push(item);
                }
            }
        }
        
        // Table parsing (Quest Affinities)
        if (line.startsWith('|') && !line.startsWith('|---')) {
            if (currentSection && currentSection.includes('affinities')) {
                 const cols = line.split('|').map(c => c.trim()).filter(c => c);
                 if (cols.length >= 2 && cols[0] !== 'Quest Type') {
                     currentClass.affinities.push({
                         type: cols[0],
                         modifier: cols[1],
                         reason: cols[2]
                     });
                 }
            }
        }
    }

    // Convert object to list for easier ID lookup if needed, or keep as map.
    // Let's keep as list for JSON.
    const classList = Object.values(classes);
    fs.writeFileSync(path.join(DATA_DIR, 'classes.json'), JSON.stringify(classList, null, 2));
    console.log(`Parsed ${classList.length} classes.`);
}

function parseTraits() {
    console.log('Parsing Traits...');
    const content = fs.readFileSync(path.join(CONTENT_DIR, 'characters/traits.md'), 'utf-8');
    const lines = content.split('\n');
    
    const traits = [];
    let currentTrait = null;
    let currentSection = null;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (line.startsWith('## ')) {
            const name = line.replace('## ', '').trim();
            if (['TRAIT CATEGORIES', 'POSITIVE TRAITS', 'NEGATIVE TRAITS', 'ACQUIRED TRAITS', 'CURSED TRAITS', 'UNIQUE TRAITS', 'TRAIT SUMMARY', 'TRAIT STACKING'].some(s => name.includes(s))) continue;

            currentTrait = {
                name: name,
                effects: [],
                visualTells: []
            };
            traits.push(currentTrait);
            currentSection = null;
            continue;
        }

        if (!currentTrait) continue;

        if (line.startsWith('### ')) {
            currentSection = line.replace('### ', '').toLowerCase();
            continue;
        }

        const kvMatch = line.match(/^\*\*(.+?)\*\*:\s*(.+)/);
        if (kvMatch) {
            const key = kvMatch[1].toLowerCase();
            const value = kvMatch[2].trim();
            if (key === 'id') currentTrait.id = value.replace(/`/g, '');
            else if (key === 'rarity') currentTrait.rarity = value;
            else if (key === 'category') currentTrait.category = value;
            continue;
        }

        if (line.startsWith('- ')) {
            const item = line.replace('- ', '').trim();
            if (currentSection && currentSection.includes('effect')) {
                currentTrait.effects.push(item);
            }
        }
        // Visual tells mostly not in bullets in traits.md, sometimes just text
        if (currentSection && currentSection.includes('visual') && !line.startsWith('#') && !line.startsWith('-')) {
             currentTrait.visualTells.push(line);
        }
    }

    fs.writeFileSync(path.join(DATA_DIR, 'traits.json'), JSON.stringify(traits, null, 2));
    console.log(`Parsed ${traits.length} traits.`);
}

// Main execution
try {
    parseClasses();
    parseTraits();
} catch (e) {
    console.error('Error parsing content:', e);
}
