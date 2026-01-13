window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.quests = [
    {
        "id": "quest_rats_001",
        "name": "Rats in the Cellar",
        "rank": "F",
        "type": "Monster Hunt",
        "duration": 0,
        "requirements": {
            "primary": "STR 3 OR DEX 5"
        },
        "rewards": {
            "gold": 15,
            "xp": 10,
            "rep": 1
        },
        "modifiers": [
            {
                "condition": "Heavy Armor",
                "value": -10
            },
            {
                "condition": "Cat companion",
                "value": 30
            }
        ]
    },
    {
        "id": "quest_herb_001",
        "name": "Herb Gathering",
        "rank": "F",
        "type": "Retrieval",
        "duration": 0,
        "requirements": {
            "primary": "DEX 5"
        },
        "rewards": {
            "gold": 20,
            "xp": 15,
            "rep": 1
        },
        "modifiers": [
            {
                "condition": "Heavy Armor",
                "value": -30
            },
            {
                "condition": "DEX 9+",
                "value": 20
            },
            {
                "condition": "Rope",
                "value": 20
            }
        ]
    },
    {
        "id": "quest_escort_001",
        "name": "Merchant Escort",
        "rank": "F",
        "type": "Escort",
        "duration": 1,
        "requirements": {
            "primary": "VIT 5"
        },
        "rewards": {
            "gold": 30,
            "xp": 12,
            "rep": 1
        },
        "modifiers": [
            {
                "condition": "Patience",
                "value": 20
            },
            {
                "condition": "Lazy",
                "value": -30
            }
        ]
    },
    {
        "id": "quest_wolf_001",
        "name": "The Howling Woods",
        "rank": "D",
        "type": "Monster Hunt",
        "duration": 1,
        "requirements": {
            "primary": "STR 5 OR DEX 7"
        },
        "rewards": {
            "gold": 50,
            "xp": 30,
            "rep": 2
        },
        "modifiers": [
            {
                "condition": "AoE abilities",
                "value": 30
            },
            {
                "condition": "Solo",
                "value": -40
            },
            {
                "condition": "Ranger",
                "value": 35
            }
        ]
    },
    {
        "id": "quest_goblin_001",
        "name": "Goblin Patrol",
        "rank": "D",
        "type": "Monster Hunt",
        "duration": 1,
        "requirements": {
            "primary": "STR 6 OR INT 6"
        },
        "rewards": {
            "gold": 60,
            "xp": 35,
            "rep": 2
        },
        "modifiers": [
            {
                "condition": "Fire Magic",
                "value": 30
            },
            {
                "condition": "Stealth",
                "value": 15
            }
        ]
    },
    {
        "id": "quest_golem_001",
        "name": "Golems of the Quarry",
        "rank": "C",
        "type": "Monster Hunt",
        "duration": 2,
        "requirements": {
            "primary": "STR 7",
            "weapon": "Blunt"
        },
        "rewards": {
            "gold": 120,
            "xp": 60,
            "rep": 3
        },
        "modifiers": [
            {
                "condition": "Blunt weapon",
                "value": 40
            },
            {
                "condition": "Edged weapon",
                "value": -80
            },
            {
                "condition": "Magic",
                "value": -60
            }
        ]
    },
    {
        "id": "quest_witch_001",
        "name": "The Swamp Witch",
        "rank": "B",
        "type": "Monster Hunt",
        "duration": 2,
        "requirements": {
            "primary": "INT 7 OR VIT 8"
        },
        "rewards": {
            "gold": 200,
            "xp": 100,
            "rep": 4
        },
        "modifiers": [
            {
                "condition": "Female character",
                "value": 50
            },
            {
                "condition": "Male + Low INT",
                "value": -60
            }
        ]
    },
    {
        "id": "quest_stalker_001",
        "name": "The Invisible Stalker",
        "rank": "A",
        "type": "Monster Hunt",
        "duration": 4,
        "requirements": {
            "primary": "INT 9"
        },
        "rewards": {
            "gold": 350,
            "xp": 200,
            "rep": 6
        },
        "modifiers": [
            {
                "condition": "True Sight",
                "value": 60
            },
            {
                "condition": "No detection",
                "value": -90
            }
        ]
    },
    {
        "id": "quest_dragon_001",
        "name": "Crimson Dragon",
        "rank": "S",
        "type": "Boss Hunt",
        "duration": 6,
        "requirements": {
            "primary": "STR 9 OR INT 9",
            "item": "Fire Immunity"
        },
        "rewards": {
            "gold": 1200,
            "xp": 500,
            "rep": 30
        },
        "modifiers": [
            {
                "condition": "No Immunity",
                "value": -999
            },
            {
                "condition": "Dragon Slayer",
                "value": 50
            }
        ]
    }
];

// === STORY QUESTS ===
// These are NOT in the random pool. They appear when specific flags are set.
window.GAME_DATA.storyQuests = [
    {
        id: 'story_scout_woods',
        name: 'Scout the Dark Woods',
        rank: 'C',
        type: 'Stealth',
        duration: 1,
        isStoryQuest: true,
        storyIcon: '🌑',
        requiresFlag: 'cult_investigation_started',
        setsFlag: 'cult_camp_found',
        requirements: { stat: 'dex', min: 5 },
        rewards: { gold: 80, xp: 50, rep: 2 },
        description: 'Rumors of a cult operating in the Dark Woods have reached the guild. Scout the area and report back.'
    },
    {
        id: 'story_blood_ritual',
        name: 'Stop the Blood Ritual',
        rank: 'A',
        type: 'Boss Hunt',
        duration: 3,
        isStoryQuest: true,
        isInteractive: true, // Triggers daily decisions
        storyIcon: '🩸',
        requiresFlag: 'cult_camp_found',
        setsFlag: 'cult_defeated',
        requirements: { stat: 'str', min: 7 },
        rewards: { gold: 400, xp: 200 },
        description: 'The Cult of the Red Moon is preparing a blood ritual. Stop them before it\'s too late.'
    }
];

// === QUEST PROGRESS EVENTS ===
// These fire during startMorning() when an interactive quest is active
window.GAME_DATA.questProgressEvents = [
    // Day 1 of Blood Ritual
    {
        questId: 'story_blood_ritual',
        progressDay: 1,
        title: 'The Approach',
        description: 'Your scout has reached the cult\'s perimeter. A lone sentry stands guard—a young man, barely out of his teens. He wears the blood moon symbol, but his hands tremble.',
        choices: [
            {
                text: 'Slay him silently. (No witnesses)',
                effects: { successMod: 10, townRepOnSuccess: -2, addFlag: 'sentry_killed' }
            },
            {
                text: 'Take him prisoner. (Intel, but risky)',
                effects: { successMod: -5, addFlag: 'sentry_captured', intel: 1 }
            }
        ]
    },
    // Day 2 of Blood Ritual
    {
        questId: 'story_blood_ritual',
        progressDay: 2,
        title: 'The Infiltration',
        description: 'The cave entrance looms. Two robed figures chant in an unknown tongue. Your hero waits for your signal.',
        choices: [
            {
                text: 'Set a fire as distraction. (Combat advantage)',
                effects: { successMod: 10, addFlag: 'fire_distraction', deathModOnFail: 20 }
            },
            {
                text: 'Search for a back entrance. (Safer if intel known)',
                // Combo with Day 1 prisoner choice
                effects: { successModWithFlag: { flag: 'sentry_captured', bonus: 15 }, addFlag: 'back_entrance' }
            }
        ]
    },
    // Day 3 of Blood Ritual
    {
        questId: 'story_blood_ritual',
        progressDay: 3,
        title: 'The Blood Moon Rises',
        description: 'The ritual has begun. A villager screams on the altar. The cult leader raises the dagger. Your hero looks to you for orders.',
        choices: [
            {
                text: 'Rush in! Save the victim!',
                effects: { townRep: 5, crownRep: 0, addFlag: 'victim_saved', addFlag2: 'cult_leader_escaped' }
            },
            {
                text: 'Hold. Wait for the perfect moment to capture the leader.',
                effects: { townRep: -2, crownRep: 5, addFlag: 'leader_captured', addFlag2: 'victim_died', loot: 'sigil_blood_moon' }
            }
        ]
    }
];