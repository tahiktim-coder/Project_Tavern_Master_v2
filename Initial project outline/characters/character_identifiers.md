# CHARACTER IDENTIFIER SYSTEM

**Purpose**: Define all character data points needed for gameplay AND narratives  
**Format**: Complete character schema with equipment, traits, and narrative tags

---

## 📋 COMPLETE CHARACTER SCHEMA

```javascript
{
    // === CORE IDENTITY ===
    id: "char_unique_001",              // Unique identifier
    name: "Aldric",                      // Display name
    surname: "Moonblade",                // Optional surname
    title: "the Blind Swordsman",        // Optional title (earned or given)
    
    // === GAMEPLAY DATA ===
    classId: "ronin",                    // Links to classes.md
    level: 6,
    experience: 450,                     // Current XP
    
    baseStats: {
        str: 7,
        int: 9,
        dex: 10,
        vit: 6
    },
    
    // === TRAITS & PERSONALITY ===
    traits: [
        "blind",                         // Visible to player
        "disciplined"
    ],
    hiddenTraits: [
        "six_eyes"                       // Hidden until revealed
    ],
    acquiredTraits: [],                  // Gained through gameplay
    
    personalityTags: [
        "stoic",                         // For narrative generation
        "honorable",
        "mysterious"
    ],
    
    // === EQUIPMENT ===
    equipment: {
        weapon: {
            id: "katana_moonlight",
            type: "katana",              // sword, axe, bow, staff
            name: "Moonlight Blade",
            rarity: "legendary",
            tags: ["slashing", "magic", "glowing"],
            bonuses: {
                str: +2,
                critical_vs: ["undead", "cursed"]
            }
        },
        
        armor: {
            id: "cloth_robes_enchanted",
            type: "cloth",               // plate, chain, leather, cloth, none
            name: "Enchanted Robes",
            protection: 2,
            dexPenalty: 0,
            tags: ["light", "magic", "silent"],
            resistances: {
                magic: 0.3               // 30% magic damage reduction
            }
        },
        
        accessory: {
            id: "blindfold_insight",
            name: "Blindfold of True Sight",
            effect: "See magical auras despite blindness",
            tags: ["cursed", "perception"]
        },
        
        consumable: null                 // One slot for potions/charms
    },
    
    // === STATUS ===
    status: "idle",                      // idle, questing, injured, dead
    injuries: [],                        // Array of injury objects
    morale: 65,                          // 0-100
    
    currentHP: 100,                      // For combat tracking
    maxHP: 100,
    
    // === EMPLOYMENT ===
    hireType: "full_time",               // full_time, freelance, contract
    hireCost: 240,                       // Initial hire cost
    dailyWage: 25,                       // Daily salary
    daysEmployed: 0,                     // Track loyalty/bonuses
    
    // === NARRATIVE DATA ===
    appearance: {
        race: "human",                   // human, elf, dwarf, etc.
        age: "middle-aged",              // young, middle-aged, elderly
        gender: "male",
        height: "tall",
        build: "lean",                   // muscular, lean, stocky, frail
        skinTone: "pale",
        hairColor: "silver",
        hairStyle: "long, unkempt",
        eyeColor: "milky white",         // Blind = no iris color
        distinguishingFeatures: [
            "Permanent blindfold",
            "Facial scar across bridge of nose",
            "Hands constantly on sword hilt"
        ]
    },
    
    speechPattern: "formal",             // casual, formal, cryptic, silent, verbose
    voiceTone: "calm",                   // calm, aggressive, cheerful, monotone
    
    backstory: {
        origin: "Eastern mountains",
        priorOccupation: "Temple guardian",
        reason: "Seeking redemption for failure",
        secret: "Can actually see via magic, not truly blind"
    },
    
    dialogueSnippets: {
        hire: "My blade is yours... if the price is right.",
        questAccept: "I sense the path ahead. Let us proceed.",
        questSuccess: "The enemy fell as the moon rises.",
        questFail: "Forgive me. I have failed you.",
        injury: "A scratch. I've endured worse.",
        death: "At last... I can rest..."
    },
    
    // === SPECIAL FLAGS ===
    questPreferences: {
        likes: ["monster_hunt", "assassination"],
        dislikes: ["escort", "puzzle"],
        refuses: []                      // Auto-reject these quest types
    },
    
    synergies: {
        lovesWorkingWith: ["class_mage", "trait_honorable"],
        hatesWorkingWith: ["class_necromancer", "trait_cowardly"]
    },
    
    // === QUEST HISTORY ===
    questsCompleted: 0,
    questsSucceeded: 0,
    questsFailed: 0,
    killCount: {
        total: 0,
        dragons: 0,
        undead: 0
    },
    
    // === UNLOCK TRIGGERS ===
    availability: {
        week: 1,                         // Appears in Week 1
        day: 3,                          // Day 3 of the week
        unlockConditions: [
            // No special conditions
        ]
    },
    
    // === STORY FLAGS ===
    storyFlags: {
        "revealed_true_sight": false,
        "completed_personal_quest": false,
        "unlocked_ultimate_technique": false
    }
}
```

---

## 🎨 APPEARANCE GENERATION GUIDE

### Visual Tells (For Desk Inspection)
These are what the PLAYER sees before hiring:

```javascript
visualTells: [
    // PRIMARY (always visible)
    "Wears a permanent black blindfold",
    "Silver hair tied back",
    "Carries an ornate katana that glows faintly",
    
    // SECONDARY (inspection reveals)
    "Scar across bridge of nose",
    "Moves with perfect confidence despite blindness",
    "Fingers twitch toward sword hilt when stressed",
    
    // HIDDEN (only revealed after hiring/quests)
    "Eyes beneath blindfold glow with arcane light",
    "Can dodge attacks they shouldn't see coming"
]
```

### Tags for Narrative Injection
```javascript
appearanceTags: [
    "blind",
    "scarred",
    "armed",
    "mysterious",
    "elegant",
    "dangerous"
]
```

---

## ⚔️ EQUIPMENT CATALOG FORMAT

### Weapons
```javascript
{
    id: "katana_moonlight",
    type: "katana",
    subtype: "slashing",
    name: "Moonlight Blade",
    description: "A katana forged from moonstone that glows in darkness",
    rarity: "legendary",
    
    // GAMEPLAY STATS
    damage: 8,
    critical: 0.30,                      // +30% crit chance
    bonusVs: ["undead", "cursed"],       // +damage against these
    penaltyVs: ["construct"],            // -damage against these
    
    // NARRATIVE TAGS
    visualTags: ["glowing", "ornate", "humming"],
    combatDescriptors: [
        "slashes with moonlit steel",
        "the blade hums with power",
        "moonlight trails in the arc"
    ],
    
    // SPECIAL ABILITIES
    passive: "Glows brighter near cursed enemies (+10% detection)",
    active: "Moonblade Slash (3-turn cooldown, deals 2x damage)"
}
```

### Armor
```javascript
{
    id: "plate_dragon_scale",
    type: "plate",
    name: "Dragonscale Plate",
    description: "Forged from the scales of an ancient red dragon",
    rarity: "epic",
    
    // GAMEPLAY STATS
    protection: 9,
    dexPenalty: -3,
    resistances: {
        fire: 0.80,                      // 80% fire resistance
        physical: 0.40
    },
    
    // ENVIRONMENT PENALTIES
    environmentPenalties: {
        swamp: -0.50,                    // Drowning risk
        desert: -0.40,                   // Heat stroke
        volcano: +0.60                   // Fire protection helps
    },
    
    // NARRATIVE TAGS
    visualTags: ["red", "scaled", "imposing", "heavy"],
    combatDescriptors: [
        "flames wash over the dragon-scale armor harmlessly",
        "the heavy plate clangs with each step",
        "scales glimmer like rubies"
    ]
}
```

---

## 🏷️ TAG SYSTEM FOR NARRATIVES

### Character Tags
```javascript
personalityTags: {
    // EMOTIONAL TONE
    stoic: "remains expressionless",
    cheerful: "grins despite danger",
    aggressive: "snarls with bloodlust",
    fearful: "trembles visibly",
    
    // SOCIAL BEHAVIOR
    honorable: "refuses dishonorable tactics",
    pragmatic: "does whatever works",
    sadistic: "enjoys the suffering",
    protective: "shields weaker allies",
    
    // BACKGROUND
    noble: "carries themselves with aristocratic grace",
    streetSmart: "relies on cunning and tricks",
    scholarly: "analyzes every detail",
    mysterious: "speaks in riddles"
}
```

### Equipment Tags
```javascript
weaponTags: {
    // VISUAL
    glowing: "radiates {color} light",
    ornate: "covered in intricate engravings",
    crude: "rough and unpolished",
    bloodstained: "caked with dried blood",
    
    // SOUND
    humming: "hums with power",
    rattling: "chains rattle ominously",
    silent: "makes no sound",
    
    // EFFECT
    flaming: "wreathed in flames",
    icy: "frost forms along the blade",
    cursed: "whispers dark promises"
}
```

---

## 📊 EXAMPLE CHARACTER (SUBTLER VERSION)

```javascript
{
    id: "char_aldric_001",
    name: "Aldric",
    surname: "of the Eastern Peaks",
    title: null,                         // Earned later
    
    classId: "ronin",
    level: 6,
    
    baseStats: { str: 7, int: 9, dex: 10, vit: 6 },
    
    traits: ["disciplined", "loner"],
    hiddenTraits: ["true_sight"],        // INSTEAD of "six_eyes" (subtler)
    
    personalityTags: ["stoic", "honorable", "haunted"],
    
    equipment: {
        weapon: {
            id: "katana_whisper",
            type: "katana",
            name: "Whispering Wind",      // INSTEAD of "moonlight" (subtler)
            tags: ["slashing", "enchanted", "humming"]
        },
        armor: {
            id: "traveler_robes",
            type: "cloth",
            name: "Traveler's Robes",
            tags: ["worn", "practical"]
        },
        accessory: {
            id: "silk_blindfold",
            name: "Silk Blindfold",       // Just a blindfold, not "True Sight"
            tags: ["mysterious"]
        }
    },
    
    appearance: {
        race: "human",
        age: "early 30s",
        gender: "male",
        height: "tall",
        build: "lean, athletic",
        hairColor: "dark brown with silver streaks",
        hairStyle: "tied in warrior's knot",
        eyeColor: "covered (blindfolded)",
        distinguishingFeatures: [
            "Permanent blindfold of dark silk",
            "Old burn scar on left cheek",
            "Walks with measured, careful steps",
            "Tilts head when 'looking' at people"
        ]
    },
    
    speechPattern: "formal",
    voiceTone: "soft but deliberate",
    
    visualTells: [
        "Wears a blindfold but moves with eerie precision",
        "Carries a katana that hums softly",
        "Silver streaks in hair despite young age",
        "????: Sometimes turns to look at things... he shouldn't be able to see"
    ],
    
    dialogueSnippets: {
        hire: "I walk the path of atonement. Let me serve.",
        questAccept: "I hear you. I will go.",
        questSuccess: "It is done. The blade remembers.",
        questFail: "Forgive me. I was... insufficient."
    },
    
    backstory: {
        origin: "Eastern mountain monastery",
        priorOccupation: "Temple guardian",
        reason: "Atoning for unnamed failure",
        secret: "Lost his sight protecting something precious. Gained something else in return."
    },
    
    availability: {
        week: 1,
        day: 4
    }
}
```

**Key differences from obvious version:**
- ❌ NOT "Satoru" → ✅ "Aldric"
- ❌ NOT "Six Eyes" → ✅ "True Sight" (hidden)
- ❌ NOT obvious JJK reference → ✅ Inspired but unique
- ✅ Mysterious backstory (what did he protect?)
- ✅ Visual tells hint at secret without revealing

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1: Core IDs (MVP)
- `id`, `name`, `classId`, `level`, `baseStats`
- `equipment.weapon.id`, `equipment.armor.id`
- `traits[]`
- `status`, `hireType`, `dailyWage`

### Phase 2: Narrative Support
- `personalityTags[]`
- `appearance{}`
- `speechPattern`, `voiceTone`
- `dialogueSnippets{}`
- Equipment `tags[]` and `combatDescriptors[]`

### Phase 3: Deep Systems
- `hiddenTraits[]`, `storyFlags{}`
- `synergies{}`, `questPreferences{}`
- `killCount{}`, quest history
- Unlock conditions

---

**This schema supports BOTH gameplay mechanics AND rich storytelling!** 📖⚔️
