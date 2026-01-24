# QUEST SUCCESS FORMULA - Complete Match Mechanics

**Purpose**: Define how quest outcomes are calculated  
**Format**: Implementation-ready algorithm for quest resolution  
**Complexity**: Full formula with all modifiers and edge cases

---

## FORMULA OVERVIEW

```javascript
function calculateQuestSuccess(character, quest, environment, gameState) {
    // === STEP 1: BASE SUCCESS RATE ===
    const requiredStat = quest.requirements.stat; // e.g., "str"
    const charStatValue = character.stats[requiredStat]; // e.g., 7
    const questMinStat = quest.requirements.min; // e.g., 6
    
    // Base formula: (Character Stat / Required Stat) × 60%
    let baseSuccess = (charStatValue / Math.max(questMinStat, 1)) * 0.6;
    baseSuccess = clamp(baseSuccess, 0.10, 0.90); // Min 10%, Max 90%
    
    // === STEP 2: CUMULATIVE MODIFIERS ===
    let totalModifier = 0;
    
    // 2a. Class Bonuses/Penalties
    totalModifier += getClassModifier(character.class, quest);
    
    // 2b. Trait Effects
    totalModifier += getTraitModifiers(character.traits, quest);
    
    // 2c. Equipment Bonuses
    totalModifier += getEquipmentModifiers(character.equipment, quest);
    
    // 2d. Environmental Penalties
    totalModifier += getEnvironmentModifiers(environment, character, quest);
    
    // 2e. Weather Effects
    if (gameState.weather && quest.environment.outdoor) {
        totalModifier += getWeatherModifiers(gameState.weather, character);
    }
    
    // 2f.  Injury Penalties
    totalModifier += getInjuryPenalties(character.injuries);
    
    // 2g. Morale Bonus/Penalty
    const moraleMod = (character.morale - 50) * 0.002; // ±10% range
    totalModifier += moraleMod;
    
    // 2h. Level Advantage
    const questLevel = rankToLevel(quest.rank); // F=1, D=2, C=3, etc.
    const levelDiff = character.level - questLevel;
    totalModifier += levelDiff * 0.05; // ±5% per level
    
    // === STEP 2.5: OFF-CLASS PENALTY ("Good Enough" Match) ===
    let offClassPenalty = 0;
    const primaryStat = quest.requirements.stat; // e.g. "str"
    const charPrimaryStat = character.stats[primaryStat];
    
    // Logic: If character is using a stat that is NOT their class primary
    if (charPrimaryStat < 4 && quest.rank >= 'D') { 
        // e.g. Mage (STR 2) trying STR quest
        offClassPenalty = -0.25; // -25% Success Cap
    }

    // === STEP 2.6: ITEM BUFFS (Gifting) ===
    if (character.giftedItem) {
        const item = character.giftedItem;
        
        // Stat Buffs
        if (item.buffStat === primaryStat) {
            const newStat = charPrimaryStat + item.buffValue;
            baseSuccess = (newStat / Math.max(questMinStat, 1)) * 0.6;
            baseSuccess = clamp(baseSuccess, 0.10, 0.90);
        }
        
        // Flat Modifiers
        if (item.modifier) {
            totalModifier += item.modifier;
        }
        
        // Cancel Off-Class Penalty?
        if (item.removesPenalty && offClassPenalty < 0) {
            offClassPenalty = 0; 
        }
    }

    // === STEP 3: FINAL SUCCESS RATE ===
    const finalSuccess = clamp(baseSuccess + totalModifier, 0.05, 0.95);
    
    // === STEP 4: OUTCOME ROLL ===
    const roll = Math.random();
    
    if (roll < 0.10) return { outcome: 'criticalSuccess', chance: finalSuccess };
    if (roll < finalSuccess) return { outcome: 'success', chance: finalSuccess };
    if (roll < finalSuccess + 0.15) return { outcome: 'failure', chance: finalSuccess };
    return { outcome: 'criticalFailure', chance: finalSuccess };
}
```

---

## DETAILED MODIFIER CALCULATIONS

### 2a. Class Modifiers

```javascript
const CLASS_QUEST_AFFINITIES = {
    knight: {
        monster_hunt: +0.15,
        escort: +0.20,
        stealth: -0.30,
        assassination: null // REFUSES quest
    },
    barbarian: {
        beast_hunt: +0.30,
        escort: -0.40,
        diplomacy: -0.50,
        combat: +0.20
    },
    scholar: {
        puzzle: +0.70,
        mystery: +0.80,
        combat: -0.90
    },
    rogue: {
        stealth: +0.55,
        infiltration: +0.50,
        open_combat: -0.45
    },
    cleric: {
        undead: +0.60,
        demons: +0.50,
        immoral: null // REFUSES
    },
    // ... see characters/classes.md for complete list
};

function getClassModifier(className, quest) {
    const affinities = CLASS_QUEST_AFFINITIES[className];
    if (!affinities) return 0;
    
    const mod = affinities[quest.type];
    if (mod === null) {
        quest.canAttempt = false; // Class refuses
        return -9999; // Impossible
    }
    
    return mod || 0;
}
```

---

### 2b. Trait Modifiers

```javascript
const TRAIT_EFFECTS = {
    // POSITIVE TRAITS
    brave: {
        condition: (quest) => quest.rank >= 'B',
        modifier: +0.10,
        description: "Brave characters excel at dangerous quests"
    },
    
    veteran: {
        condition: () => true, // Always active
        modifier: +0.10,
        additionalStats: { str: +1, dex: +1, int: +1, vit: +1 },
        description: "Experience bonus"
    },
    
    lucky: {
        condition: () => true,
        critChanceBonus: +0.05, // 15% base → 20%
        description: "Higher crit success rate"
    },
    
    disciplined: {
        condition: () => true,
        moraleImmune: true, // Morale always 50
        description: "No morale penalties"
    },
    
    // NEGATIVE TRAITS
    cowardly: {
        condition: (quest) => quest.rank >= 'B',
        modifier: -0.20,
        fleeChance: 0.40, // 40% flee on first injury
        description: "Terrified of danger"
    },
    
    greedy: {
        condition: () => true,
        payDemand: 30, // Demands +30G or refuses
        stealChance: 0.30, // 30% steal quest reward
        description: "Motivated by gold"
    },
    
    drunk: {
        condition: () => true,
        modifier: -0.15,
        statPenalty: { str: -1, dex: -1, int: -1, vit: -1 },
        description: "Intoxicated"
    },
    
    // ACQUIRED TRAITS
    dragon_slayer: {
        condition: (quest) => quest.enemy?.type === 'dragon',
        modifier: +0.20,
        description: "Experienced dragon killer"
    },
    
    fear_of_spiders: {
        condition: (quest) => quest.enemy?.type === 'spider',
        modifier: -0.50,
        fleeChance: 0.60,
        description: "Traumatized by spiders"
    },
    
    ptsd: {
        condition: () => true,
        moraleDrain: -2, // -2 morale per day
        description: "Witnessed party death"
    }
};

function getTraitModifiers(traits, quest) {
    let totalMod = 0;
    
    for (const traitId of traits) {
        const trait = TRAIT_EFFECTS[traitId];
        if (!trait) continue;
        
        if (trait.condition && trait.condition(quest)) {
            totalMod += trait.modifier || 0;
        }
    }
    
    return totalMod;
}
```

---

### 2c. Equipment Modifiers

```javascript
const EQUIPMENT_BONUSES = {
    // WEAPONS
    weapon_sword_holy: {
        bonusVs: ['undead', 'demon'],
        modifier: +0.70, // vs undead
        autoKill: (enemy) => enemy.rank === 'F' && enemy.type === 'undead'
    },
    
    weapon_hammer_war: {
        bonusVs: ['construct', 'armored'],
        modifier: +0.60,
        penaltyVs: ['fast'],
        penalty: -0.30
    },
    
    weapon_sword_cursed: {
        modifier: +0.50, // ALWAYS
        curse: { hpDrain: 10, moraleDrain: -2 }
    },
    
    weapon_bow_legendary: {
        specialAbility: 'silent_kill',
        assassinationBonus: +0.70,
        autoHit: true // First shot always hits
    },
    
    // ARMOR
    armor_plate: {
        protection: 8,
        dexPenalty: -3,
        environmentPenalty: {
            swamp: -0.50, // CRITICAL drowning
            desert: -0.60, // Heat stroke
            confined: -0.30
        }
    },
    
    armor_leather: {
        protection: 2,
        dexPenalty: 0,
        stealthBonus: +0.20
    },
    
    // CONSUMABLES
    item_fire_immunity: {
        resistance: { fire: 100 },
        modifier: +0.40, // vs fire enemies
        mandatory: ['quest_dragon_001'] // Required for dragon
    },
    
    item_holy_water: {
        bonusVs: ['undead'],
        modifier: +0.30,
        consumable: true // Single use
    }
};

function getEquipmentModifiers(equipment, quest) {
    let totalMod = 0;
    
    // Weapon bonus
    if (equipment.weapon) {
        const weapon = EQUIPMENT_BONUSES[equipment.weapon];
        if (weapon) {
            if (weapon.bonusVs?.includes(quest.enemy?.type)) {
                totalMod += weapon.modifier;
            }
            if (weapon.penaltyVs?.includes(quest.enemy?.trait)) {
                totalMod += weapon.penalty;
            }
        }
    }
    
    // Armor penalties (environmental)
    if (equipment.armor) {
        const armor = EQUIPMENT_BONUSES[equipment.armor];
        if (armor?.environmentPenalty) {
            const envPenalty = armor.environmentPenalty[quest.environment.location];
            if (envPenalty) {
                totalMod += envPenalty;
            }
        }
    }
    
    // Consumable bonuses
    if (equipment.consumables) {
        for (const itemId of equipment.consumables) {
            const item = EQUIPMENT_BONUSES[itemId];
            if (item?.bonusVs?.includes(quest.enemy?.type)) {
                totalMod += item.modifier;
            }
        }
    }
    
    return totalMod;
}
```

---

### 2d. Environmental Modifiers

```javascript
const BIOME_MODIFIERS = {
    swamp: {
        heavy_armor: -0.50,
        medium_armor: -0.30,
        race_dwarf: -0.40,
        fire_magic: -0.40,
        water_magic: +0.50,
        vit_8_plus: +0.20
    },
    
    volcano: {
        fire_immunity: +0.60,
        no_fire_immunity: -0.90, // CRITICAL
        heavy_armor: -0.50,
        race_dwarf: +0.25,
        ice_magic: -0.60
    },
    
    ocean: {
        water_breathing: +0.60,
        no_water_breathing: -9999, // AUTO-FAIL
        heavy_armor: -9999, // Drowns
        class_water_mage: +0.70
    },
    
    forest: {
        class_ranger: +0.40,
        class_druid: +0.45,
        heavy_armor: -0.20,
        fire_magic: -0.25
    }
};

function getEnvironmentModifiers(environment, character, quest) {
    const biome = environment.location;
    const modifiers = BIOME_MODIFIERS[biome];
    if (!modifiers) return 0;
    
    let totalMod = 0;
    
    // Check armor type
    if (character.equipment.armor === 'plate') {
        totalMod += modifiers.heavy_armor || 0;
    }
    
    // Check race
    const raceKey = `race_${character.race}`;
    totalMod += modifiers[raceKey] || 0;
    
    // Check class
    const classKey = `class_${character.class}`;
    totalMod += modifiers[classKey] || 0;
    
    // Check mandatory items
    if (modifiers.fire_immunity !== undefined) {
        const hasFireImmunity = character.equipment.consumables?.includes('item_fire_immunity');
        totalMod += hasFireImmunity ? modifiers.fire_immunity : modifiers.no_fire_immunity;
    }
    
    return totalMod;
}
```

---

### 2e. Weather Modifiers

```javascript
const WEATHER_EFFECTS = {
    rain: {
        heavy_armor: -0.10, // Slippery
        stealth: +0.10, // Noise covered
        fire_magic: -0.20
    },
    
    storm: {
        outdoor: -0.20,
        flying_enemies: -0.40, // Grounded
        lightning_weapon: +0.30
    },
    
    heat_wave: {
        heavy_armor: -0.30,
        desert: -0.40, // Stacks with biome
        fire_resist: +0.15
    },
    
    snow: {
        heavy_armor: -0.15,
        cold_resist: +0.20,
        stealth: -0.20 // Footprints visible
    }
};

function getWeatherModifiers(weather, character) {
    const effects = WEATHER_EFFECTS[weather.condition];
    if (!effects) return 0;
    
    let totalMod = 0;
    
    if (effects.heavy_armor && character.equipment.armor === 'plate') {
        totalMod += effects.heavy_armor;
    }
    
    return totalMod;
}
```

---

### 2f. Injury Penalties

```javascript
const INJURY_PENALTIES = {
    minor: -0.10, // Bruises, sprains
    major: -0.20, // Broken bones, poison
    permanent: -0.30 // Lost limbs, permanent damage
};

function getInjuryPenalties(injuries) {
    if (!injuries || injuries.length === 0) return 0;
    
    let worstPenalty = 0;
    
    for (const injury of injuries) {
        const penalty = INJURY_PENALTIES[injury.tier] || 0;
        worstPenalty = Math.min(worstPenalty, penalty);
    }
    
    return worstPenalty; // Only worst injury counts
}
```

---

## SPECIAL CASES

### Auto-Fail Conditions

```javascript
// Conditions that make quest impossible
const AUTO_FAIL_CONDITIONS = {
    // Mandatory items missing
    no_fire_immunity_vs_dragon: (char, quest) => {
        if (quest.id === 'quest_dragon_001') {
            return !char.equipment.consumables?.includes('item_fire_immunity');
        }
        return false;
    },
    
    // Wrong weapon type
    edged_weapon_vs_golem: (char, quest) => {
        if (quest.enemy?.type === 'construct') {
            const weaponType = char.equipment.weapon?.split('_')[1]; // e.g., 'sword'
            return weaponType === 'sword' || weaponType === 'axe';
        }
        return false;
    },
    
    // Class refuses
    lawful_refuses_immoral: (char, quest) => {
        const lawfulClasses = ['paladin', 'cleric', 'knight'];
        if (lawfulClasses.includes(char.class) && quest.type === 'assassination') {
            return true;
        }
        return false;
    }
};

function checkAutoFail(character, quest) {
    for (const [key, condition] of Object.entries(AUTO_FAIL_CONDITIONS)) {
        if (condition(character, quest)) {
            return { autoFail: true, reason: key };
        }
    }
    return { autoFail: false };
}
```

---

## OUTCOME DISTRIBUTION

```javascript
function rollOutcome(finalSuccessRate) {
    const roll = Math.random();
    
    // Critical Success: Always 10% of success rate
    const critSuccessThreshold = 0.10;
    
    // Success: Remaining success chance
    const successThreshold = finalSuccessRate;
    
    // Failure: 15% window
    const failureThreshold = finalSuccessRate + 0.15;
    
    // Critical Failure: Everything else
    
    if (roll < critSuccessThreshold) {
        return {
            type: 'criticalSuccess',
            goldMultiplier: 2.0,
            xpMultiplier: 1.5,
            lootBonus: true
        };
    } else if (roll < successThreshold) {
        return {
            type: 'success',
            goldMultiplier: 1.0,
            xpMultiplier: 1.0
        };
    } else if (roll < failureThreshold) {
        return {
            type: 'failure',
            goldMultiplier: 0,
            injuryRoll: 'minor_or_major'
        };
    } else {
        return {
            type: 'criticalFailure',
            goldMultiplier: 0,
            injuryRoll: 'major_or_permanent_or_death',
            deathChance: getDeathChance(quest.rank)
        };
    }
}

function getDeathChance(rank) {
    const DEATH_RATES = {
        F: 0.01,
        D: 0.05,
        C: 0.10,
        B: 0.20,
        A: 0.30,
        S: 0.40
    };
    return DEATH_RATES[rank] || 0.05;
}
```

---

## EXAMPLE CALCULATION

```javascript
// CHARACTER: Marcus (Mercenary, Level 4)
const marcus = {
    class: 'mercenary',
    level: 4,
    stats: { str: 7, int: 4, dex: 5, vit: 8 },
    traits: ['pragmatic', 'greedy'],
    equipment: {
        weapon: 'weapon_sword_standard',
        armor: 'armor_chainmail',
        consumables: []
    },
    injuries: [],
    morale: 60
};

// QUEST: Goblin Patrol (D-rank)
const quest = {
    id: 'quest_goblin_001',
    rank: 'D',
    type: 'monster_hunt',
    enemy: { type: 'humanoid' },
    requirements: { stat: 'str', min: 6 },
    environment: { location: 'plains', outdoor: true }
};

// CALCULATION
baseSuccess = (7 / 6) × 0.6 = 0.70 (70%)

modifiers:
+ Class (mercenary): 0% (no bonus vs humanoids)
+ Traits: 0% (pragmatic/greedy don't apply)
+ Equipment: 0% (standard sword, no bonuses)
+ Environment: 0% (plains is neutral)
+ Weather: 0% (assume clear)
+ Injuries: 0% (none)
+ Morale: (60 - 50) × 0.002 = +0.02 (+2%)
+ Level: (4 - 2) × 0.05 = +0.10 (+10%)

finalSuccess = 0.70 + 0.12 = 0.82 (82%)

// OUTCOME: 82% success rate
// Roll 0-0.10: Critical Success (10%)
// Roll 0.10-0.82: Success (72%)
// Roll 0.82-0.97: Failure (15%)
// Roll 0.97-1.00: Critical Failure (3%)
```

---

**Implementation Notes**:
- All modifiers are ADDITIVE (stack together)
- Final success clamped between 5-95% (nothing is impossible/guaranteed)
- Auto-fail conditions override all bonuses
- Critical success is always 10% (not affected by success rate)
- Death chance increases with quest rank exponentially
