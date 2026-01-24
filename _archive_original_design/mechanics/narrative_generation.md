# NARRATIVE GENERATION SYSTEM

**Purpose**: Generate dynamic post-quest reports and combat logs  
**Format**: Story snippets based on character traits, equipment, and outcomes  
**Output**: Daily gazettes and combat summaries

---

## 🎯 SYSTEM OVERVIEW

After each day, the game generates a **"Daily Dossier"** containing:
1. **One-liner per quest** (1-2 sentences of flavor)
2. **Combat logs** (3-7 turn exchanges for B+ rank quests)
3. **Hidden trait reveals** (if conditions met)

---

## 📰 DAILY DOSSIER FORMAT

```
╔════════════════════════════════════════╗
║   GUILD REPORT - Day 12, Week 2        ║
╚════════════════════════════════════════╝

📜 QUEST OUTCOMES:

[SUCCESS] Goblin Patrol (D-rank)
├─ Adventurer: Marcus the Sellsword
├─ Reward: 80G (+20G bonus for speed)
└─ Report: "Marcus dispatched the goblins 
   efficiently, though he pocketed a few 
   extra silver coins when the merchant 
   wasn't looking."

[FAILURE] Dragon's Lair (S-rank)
├─ Adventurer: Aldric the Blind
├─ Injury: Major (Broken ribs, 7 days)
└─ Report: "Aldric's blindness proved 
   problematic when navigating the volcanic 
   caverns. He fell into a lava pit but was 
   rescued by a passing dwarf caravan. 
   Returned +2 days late, badly burned."

═════════════════════════════════════════
```

---

## 🎲 NARRATIVE GENERATION RULES

### Input Data Needed
```javascript
{
    character: {
        id: "char_aldric",
        name: "Aldric",
        classId: "ronin",
        level: 6,
        traits: ["blind", "disciplined"],
        equipment: {
            weapon: "katana_moonlight",
            armor: "cloth_robes",
            consumable: null
        }
    },
    quest: {
        id: "quest_dragon_001",
        rank: "S",
        type: "monster_hunt",
        environment: "volcano",
        enemy: { type: "dragon", name: "Ignis the Infernal" }
    },
    outcome: {
        result: "failure",
        finalChance: 0.45,
        roll: 0.87,
        injuries: ["major_burns"],
        daysDelayed: 2
    }
}
```

### Output Generation
```javascript
function generateNarrative(character, quest, outcome) {
    // 1. Select narrative template based on outcome
    const template = NARRATIVE_TEMPLATES[outcome.result];
    
    // 2. Add trait-specific flavor
    const traitFlavor = getTraitNarrative(character.traits, quest, outcome);
    
    // 3. Add equipment mentions
    const equipmentFlavor = getEquipmentNarrative(character.equipment, quest);
    
    // 4. Combine into 1-2 sentences
    return combineNarrative(template, traitFlavor, equipmentFlavor);
}
```

---

## 📚 NARRATIVE TEMPLATES

### Success Outcomes

#### Critical Success
```javascript
TEMPLATES.critical_success = [
    {
        condition: (char, quest) => char.traits.includes("arrogant"),
        text: "{name} returned victorious, bragging loudly about how '{enemy}' was barely a challenge. The townsfolk are annoyed but impressed."
    },
    {
        condition: (char, quest) => quest.rank >= "A",
        text: "{name} slayed {enemy} in a legendary duel. Bards are already composing songs about the feat."
    },
    {
        condition: (char, quest) => char.equipment.weapon.includes("holy"),
        text: "{name}'s {weapon} glowed brilliantly as it struck {enemy} down. The creature disintegrated into ash."
    },
    {
        default: true,
        text: "{name} completed the quest flawlessly. Double rewards earned."
    }
];
```

#### Standard Success
```javascript
TEMPLATES.success = [
    {
        condition: (char) => char.traits.includes("greedy"),
        text: "{name} completed the quest but was seen pocketing extra coins from the reward chest."
    },
    {
        condition: (char) => char.classId === "rogue",
        text: "{name} infiltrated {location} unseen and secured the objective. No witnesses."
    },
    {
        condition: (char) => char.traits.includes("bloodthirsty"),
        text: "{name} slaughtered {enemy} with excessive force. The quest giver looked disturbed."
    },
    {
        default: true,
        text: "{name} returned successfully. Quest objective achieved."
    }
];
```

### Failure Outcomes

#### Standard Failure
```javascript
TEMPLATES.failure = [
    {
        condition: (char) => char.traits.includes("cowardly"),
        text: "{name} fled the moment {enemy} appeared. Returned empty-handed and shaking."
    },
    {
        condition: (char) => char.traits.includes("drunk"),
        text: "{name} got lost on the way to {location}, distracted by a tavern. Quest abandoned."
    },
    {
        condition: (outcome) => outcome.injuries.length > 0,
        text: "{name} fought bravely but was overpowered by {enemy}. Sustained {injury}."
    },
    {
        default: true,
        text: "{name} failed to complete the quest. No injuries sustained."
    }
];
```

#### Critical Failure
```javascript
TEMPLATES.critical_failure = [
    {
        condition: (char) => char.traits.includes("reckless"),
        text: "{name} charged {enemy} without a plan. Barely escaped with their life. {injury} sustained."
    },
    {
        condition: (char) => char.equipment.armor === "plate" && quest.environment === "swamp",
        text: "{name}'s heavy armor dragged them into the swamp. Nearly drowned. Rescued {daysDelayed} days later."
    },
    {
        condition: (outcome) => outcome.deathRoll < 0.3,
        text: "{name} was killed by {enemy}. Their body was recovered by a passing patrol."
    },
    {
        default: true,
        text: "{name} catastrophically failed. {injury} sustained. Morale shattered."
    }
];
```

---

## ⚔️ COMBAT LOG GENERATION

### When to Generate
- **Always**: S-rank quests
- **Sometimes**: A-B rank quests (50% chance)
- **Rarely**: C-D rank quests (10% chance)
- **Never**: F-rank quests (too mundane)

### Combat Log Structure (3-7 Turns)

```
╔════════════════════════════════════════╗
║   COMBAT LOG: Dragon's Lair            ║
╚════════════════════════════════════════╝

Turn 1: Aldric unsheathes his moonlight katana.
        The blade hums with arcane energy.
        
Turn 2: Ignis the dragon unleashes a torrent of flame!
        Aldric dodges left, his cloth robes singed.
        
Turn 3: Aldric counters with a Moonlight Slash.
        The dragon's scales deflect the strike. (-10% HP)
        
Turn 4: The dragon's tail sweeps! Aldric is struck.
        Ribs broken. Blood spills. (-60% HP)
        
Turn 5: Aldric attempts a desperate final strike.
        His slash misses as vision blurs from pain.
        
Turn 6: Ignis lunges for the killing blow!
        A dwarf caravan appears, firing ballistas.
        The dragon retreats. Aldric collapses.
        
OUTCOME: Failure (rescued by NPCs)
```

### Combat Turn Generator

```javascript
function generateCombatLog(character, quest, outcome) {
    const turns = [];
    const numTurns = rollTurns(quest.rank); // 3-7
    
    // Turn 1: Opening (always)
    turns.push(getOpeningTurn(character, quest));
    
    // Middle turns: Combat exchange
    for (let i = 2; i < numTurns - 1; i++) {
        const turn = i % 2 === 0 
            ? getPlayerTurn(character, quest, outcome)
            : getEnemyTurn(quest, outcome);
        turns.push(turn);
    }
    
    // Final turn: Resolution
    turns.push(getResolutionTurn(character, quest, outcome));
    
    return formatCombatLog(turns);
}
```

---

## 🎨 TRAIT-SPECIFIC NARRATIVES

### Trait Injection Rules
```javascript
TRAIT_NARRATIVES = {
    // POSITIVE TRAITS
    brave: {
        success: "Despite {enemy}'s terrifying roar, {name} stood firm.",
        failure: "{name} fought valiantly but was overwhelmed."
    },
    
    disciplined: {
        success: "{name} executed the plan with military precision.",
        combat: "maintains perfect form despite injuries"
    },
    
    lucky: {
        critical_success: "{name}'s blade struck a weak point purely by chance!",
        failure: "{name}'s luck ran out at the worst moment."
    },
    
    // NEGATIVE TRAITS
    arrogant: {
        success: "{name} returned bragging about how easy it was.",
        failure: "{name}'s overconfidence led to disaster."
    },
    
    cowardly: {
        failure: "{name} fled at first sight of {enemy}.",
        combat: "hesitates, trembling"
    },
    
    greedy: {
        success: "{name} pocketed extra treasure 'for safekeeping'.",
        combat: "eyes dart to glittering hoard mid-fight"
    },
    
    drunk: {
        failure: "{name} stumbled into a ditch, bottle in hand.",
        combat: "swings wildly, vision blurred"
    },
    
    // UNIQUE TRAITS
    blind: {
        success: "{name} navigated by sound alone, striking true.",
        failure: "{name} got lost in the {location}, unable to see landmarks.",
        combat: "misses visual cues but hears heartbeat"
    },
    
    undead: {
        combat: "ignores pain, shambling forward relentlessly"
    },
    
    pyromaniac: {
        success: "{name} burned {enemy} to ash... and the surrounding forest.",
        combat: "cackles maniacally while lobbing fireballs"
    }
};
```

---

## 🛡️ EQUIPMENT-BASED NARRATIVES

### Weapon Narratives
```javascript
WEAPON_NARRATIVES = {
    katana: {
        combat: "{name} draws the katana in a flash of steel",
        critical: "The katana glows as it cleaves through {enemy}"
    },
    
    greatsword: {
        combat: "{name} swings the massive blade overhead",
        miss: "The greatsword's weight throws {name} off balance"
    },
    
    bow: {
        combat: "{name} nocks an arrow and fires from cover",
        critical: "The arrow pierces {enemy}'s eye!"
    },
    
    staff: {
        combat: "{name}'s staff crackles with arcane energy",
        failure: "The spell fizzles, the staff dims"
    },
    
    holy_sword: {
        vs_undead: "The holy blade burns the undead on contact!",
        glow: "radiates divine light in the darkness"
    }
};
```

### Armor Narratives
```javascript
ARMOR_NARRATIVES = {
    plate: {
        hit: "{enemy}'s attack clangs harmlessly off the plate armor",
        environment_penalty: "The heavy armor slows {name} in the {terrain}",
        swamp: "{name} sinks into the mud, armor deadweight"
    },
    
    leather: {
        hit: "{enemy}'s claws tear through the leather",
        stealth: "{name} moves silently in the light armor"
    },
    
    robes: {
        magic: "The enchanted robes shimmer with protective wards",
        hit: "{enemy}'s blade cuts deep through the cloth"
    },
    
    none: {
        hit: "{enemy} strikes flesh directly!",
        dodge: "Unencumbered, {name} dodges with ease"
    }
};
```

---

## 📋 COMPLETE EXAMPLE

### Input
```javascript
{
    character: {
        name: "Aldric",
        classId: "ronin",
        traits: ["blind", "disciplined"],
        equipment: {
            weapon: "katana_moonlight",
            armor: "cloth_robes"
        }
    },
    quest: {
        rank: "S",
        enemy: { type: "dragon", name: "Ignis" },
        environment: "volcano"
    },
    outcome: {
        result: "failure",
        injuries: ["broken_ribs"],
        daysDelayed: 2
    }
}
```

### Generated Narrative (One-liner)
> "Aldric's blindness proved disastrous when navigating the volcanic caverns. He fell into a lava pit but was rescued by a passing dwarf caravan. Returned +2 days late, broken ribs mending."

### Generated Combat Log
```
╔════════════════════════════════════════╗
║   COMBAT LOG: Dragon's Lair            ║
╚════════════════════════════════════════╝

Turn 1: Aldric enters the volcano, moonlight katana 
        drawn. The blade hums softly in the heat.
        
Turn 2: Ignis roars! A wall of flame erupts!
        Aldric senses the heat, dodges right.
        
Turn 3: Aldric strikes with Moonblade Slash!
        The attack glances off dragon scales. (-8% HP)
        
Turn 4: Ignis's tail sweeps low! Aldric, unable to see 
        it coming, is struck hard. Ribs crack. (-65% HP)
        
Turn 5: Aldric, bleeding badly, attempts one final strike.
        His blade cuts air. Pain clouds his senses.
        
Turn 6: The ground crumbles beneath him!
        Aldric falls toward molten lava!
        
Turn 7: A dwarf ballista bolt distracts the dragon!
        Dwarves rappel down, pulling Aldric to safety.
        "Got ye, lad! Ye picked a bad day to be blind!"
        
OUTCOME: FAILURE (Rescued by NPC intervention)
INJURIES: Broken ribs (Major, 7 days recovery)
DELAY: +2 days (carried back by dwarves)
```

---

## 🔧 IMPLEMENTATION PSEUDOCODE

```javascript
class NarrativeGenerator {
    
    generateDailyDossier(completedQuests, currentDay) {
        let dossier = `╔════════════════════════════════════════╗\n`;
        dossier += `║   GUILD REPORT - Day ${currentDay}   ║\n`;
        dossier += `╚════════════════════════════════════════╝\n\n`;
        
        for (const quest of completedQuests) {
            const narrative = this.generateQuestNarrative(quest);
            const combatLog = quest.rank >= 'B' 
                ? this.generateCombatLog(quest) 
                : null;
                
            dossier += this.formatQuestReport(quest, narrative, combatLog);
        }
        
        return dossier;
    }
    
    generateQuestNarrative(quest) {
        // 1. Select template based on outcome
        const template = this.selectTemplate(quest.outcome.result, quest);
        
        // 2. Inject trait-specific flavor
        const traitFlavor = this.getTraitFlavor(quest.character.traits, quest);
        
        // 3. Inject equipment flavor
        const equipFlavor = this.getEquipmentFlavor(quest.character.equipment, quest);
        
        // 4. Replace placeholders
        return this.replacePlaceholders(template, {
            name: quest.character.name,
            enemy: quest.enemy.name,
            location: quest.environment,
            injury: quest.outcome.injuries[0],
            daysDelayed: quest.outcome.daysDelayed,
            ...traitFlavor,
            ...equipFlavor
        });
    }
    
    generateCombatLog(quest) {
        const numTurns = this.rollTurns(quest.rank); // 3-7
        const turns = [];
        
        // Opening
        turns.push(this.getOpeningTurn(quest.character, quest));
        
        // Combat exchanges
        let playerHP = 100;
        let enemyHP = 100;
        
        for (let i = 1; i < numTurns - 1; i++) {
            if (i % 2 === 1) {
                // Player turn
                const dmg = this.calculateDamageNarrative(quest.character, quest);
                enemyHP -= dmg;
                turns.push(this.getPlayerAttack(quest.character, dmg));
            } else {
                // Enemy turn
                const dmg = this.calculateEnemyDamage(quest);
                playerHP -= dmg;
                turns.push(this.getEnemyAttack(quest, dmg));
            }
        }
        
        // Resolution
        turns.push(this.getResolution(quest.outcome, playerHP, enemyHP));
        
        return this.formatCombatLog(turns, quest);
    }
}
```

---

## 🎯 SPECIAL INTERACTIONS

### Hidden Trait Reveals
```javascript
// If character has hidden trait AND specific condition met
if (character.hiddenTraits.includes("six_eyes") && 
    quest.enemy.type === "cursed") {
    
    additionalText = `
    ⚠️ SPECIAL OBSERVATION:
    ${character.name}'s eyes glowed with unnatural light 
    as they faced the cursed spirit. They seem to perceive 
    something others cannot...
    `;
}
```

### Multi-Character Synergy
```javascript
// If 2+ characters on same quest
if (quest.party.length > 1) {
    const synergy = checkSynergy(quest.party);
    if (synergy) {
        additionalText = `
        ${char1.name} and ${char2.name} worked in perfect 
        harmony, their skills complementing each other.
        `;
    }
}
```

---

## 💾 DATA STORAGE

### Character Identifiers Needed
```javascript
{
    id: "char_aldric_001",
    name: "Aldric",
    title: "the Blind Swordsman", // Optional
    classId: "ronin",
    level: 6,
    
    // IDENTIFIERS FOR NARRATIVES
    equipment: {
        weapon: {
            id: "katana_moonlight",
            type: "katana",
            name: "Moonlight Blade",
            tags: ["slashing", "magic", "legendary"]
        },
        armor: {
            id: "cloth_robes",
            type: "cloth",
            protection: 1,
            tags: ["light", "magic"]
        },
        consumable: null
    },
    
    traits: ["blind", "disciplined"],
    hiddenTraits: ["six_eyes"], // Not shown to player initially
    
    // NARRATIVE FLAGS
    personalityTags: ["stoic", "honorable", "mysterious"],
    speechPattern: "formal", // casual, formal, cryptic, silent
    appearance: {
        race: "human",
        age: "middle-aged",
        build: "lean",
        distinguishingFeatures: ["milky white eyes", "facial scar"]
    }
}
```

---

## 🎬 NARRATIVE VARIETY

### Randomization
- Each template has 3-5 variations
- Traits add 2-3 more variations
- Equipment adds 1-2 variations
- Total possible narratives per quest: **50-100 unique outputs**

### Tone Shifts
- **F-D rank**: Casual, brief (1 sentence)
- **C-B rank**: Professional, detailed (2 sentences)
- **A-S rank**: Epic, dramatic (2-3 sentences + optional combat log)

---

**This system makes every quest feel like a mini-story!** 📖⚔️
