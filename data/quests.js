window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.quests = [
    {
        "id": "quest_rats_001",
        "name": "Rats in the Cellar",
        "rank": "F",
        "type": "Monster Hunt",
        "duration": 0,
        "location": "town",
        "client": "Marta's Tavern",
        "description": "Old Marta's cellar has become infested with rats the size of cats. Her regulars have started complaining about the smell, and last week a rat bit a serving boy. Simple work, but someone has to do it.",
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
        "location": "cliffs",
        "client": "Healer's Guild",
        "description": "The Healer's Guild needs Moonpetal flowers from the Cliffside meadows. The flowers only grow on dangerous ledges, but experienced climbers should have no trouble.",
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
        "location": "village",
        "client": "Merchant's Guild",
        "description": "A nervous spice merchant needs protection for his cart on the road to Millbrook. Bandits have been active lately, but the real danger is the merchant's constant complaining.",
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
        "location": "forest",
        "client": "Town Council",
        "description": "A pack of dire wolves has moved into the Howling Woods. Three shepherds have gone missing this month. The council needs them dealt with before winter drives them closer to town.",
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
        "location": "mountains",
        "client": "Border Garrison",
        "description": "Goblin scouts have been spotted near the Eastern Road. The garrison commander suspects a larger warband is testing our defenses. Eliminate the patrol before they can report back.",
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
        "location": "quarry",
        "client": "Stonecutter's Union",
        "description": "An ancient quarry has been awakened by the miners. Stone golems now patrol the tunnels. The union's foreman begs for help - half their workers refuse to return until the constructs are destroyed.",
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
        "location": "swamp",
        "client": "Temple of Light",
        "description": "Mother Agatha of the Blackmire has been hexing travelers and kidnapping children for her 'experiments.' The Temple wants her stopped, but warns she can charm the weak-minded.",
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
        "location": "town",
        "client": "Royal Mage",
        "description": "Something from the Outer Planes has been summoned and now stalks the eastern district. Invisible, silent, and deadly. Three nobles are dead. The Royal Mage offers a bounty - but warns that killing what you cannot see requires cunning.",
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
        "location": "mountains",
        "client": "The Crown",
        "description": "Scarthax the Crimson has awakened from his century-long slumber. He has already burned two villages. The Crown offers land, titles, and a small fortune to whoever can bring back his head. Many have tried. None have returned.",
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
    },
    // === NEW REGULAR QUESTS ===
    {
        "id": "quest_thief_001",
        "name": "The Pickpocket Ring",
        "rank": "D",
        "type": "Stealth",
        "duration": 1,
        "location": "town",
        "client": "City Watch",
        "description": "A ring of pickpockets has been targeting merchants in the Market Quarter. The Watch lacks the subtlety to catch them. They need someone who can blend in and find their hideout.",
        "requirements": {
            "primary": "DEX 6"
        },
        "rewards": {
            "gold": 55,
            "xp": 25,
            "rep": 2
        },
        "modifiers": [
            { "condition": "Rogue", "value": 40 },
            { "condition": "Heavy Armor", "value": -50 },
            { "condition": "Observant trait", "value": 25 }
        ]
    },
    {
        "id": "quest_bandit_001",
        "name": "Bandit Camp Raid",
        "rank": "C",
        "type": "Monster Hunt",
        "duration": 2,
        "location": "cliffs",
        "client": "Caravan Masters",
        "description": "The Black Knives have been growing bold. Their camp is north of the Redstone Pass. The Caravan Masters' Guild wants them wiped out before the spring trading season.",
        "requirements": {
            "primary": "STR 6 OR DEX 7"
        },
        "rewards": {
            "gold": 100,
            "xp": 50,
            "rep": 3
        },
        "modifiers": [
            { "condition": "Ranger", "value": 30 },
            { "condition": "Stealth", "value": 20 },
            { "condition": "Loud personality", "value": -25 }
        ]
    },
    {
        "id": "quest_noble_escort",
        "name": "Noble's Carriage Guard",
        "rank": "C",
        "type": "Escort",
        "duration": 2,
        "location": "castle",
        "client": "House Valmont",
        "description": "Lady Valmont insists on traveling to her summer estate despite recent bandit activity. She requires a guard who can protect her AND tolerate her endless gossip about court intrigue.",
        "requirements": {
            "primary": "VIT 6"
        },
        "rewards": {
            "gold": 90,
            "xp": 45,
            "rep": 3
        },
        "modifiers": [
            { "condition": "Patience", "value": 30 },
            { "condition": "Rude trait", "value": -40 },
            { "condition": "Knight", "value": 25 }
        ]
    },
    {
        "id": "quest_relic_001",
        "name": "Temple Relic Recovery",
        "rank": "C",
        "type": "Retrieval",
        "duration": 2,
        "location": "temple",
        "client": "Temple of Dawn",
        "description": "The Chalice of St. Aldric was stolen decades ago. A scholar has traced it to a crypt now overrun by undead. The Temple needs someone to retrieve it before the Festival of Light.",
        "requirements": {
            "primary": "INT 5 OR DEX 6"
        },
        "rewards": {
            "gold": 110,
            "xp": 55,
            "rep": 3
        },
        "modifiers": [
            { "condition": "Divine magic", "value": 35 },
            { "condition": "Undead resistance", "value": 25 },
            { "condition": "Cursed trait", "value": -30 }
        ]
    },
    {
        "id": "quest_spider_001",
        "name": "Spider Nest Extermination",
        "rank": "D",
        "type": "Monster Hunt",
        "duration": 1,
        "location": "village",
        "client": "Farmer's Collective",
        "description": "Giant spiders have infested an abandoned barn. The eggs are due to hatch any day now. The farmers will lose their livestock if someone doesn't deal with it fast.",
        "requirements": {
            "primary": "VIT 5"
        },
        "rewards": {
            "gold": 45,
            "xp": 28,
            "rep": 2
        },
        "modifiers": [
            { "condition": "Fire Magic", "value": 40 },
            { "condition": "Arachnophobia", "value": -60 },
            { "condition": "Poison resistance", "value": 30 }
        ]
    },
    {
        "id": "quest_missing_001",
        "name": "The Missing Apprentice",
        "rank": "D",
        "type": "Retrieval",
        "duration": 1,
        "location": "forest",
        "client": "Archmage Thornwood",
        "description": "My apprentice wandered into the Whispering Woods five days ago. He was looking for moonshade mushrooms. He's either very lost or very dead. Bring back either him or his spellbook.",
        "requirements": {
            "primary": "INT 5 OR DEX 5"
        },
        "rewards": {
            "gold": 50,
            "xp": 30,
            "rep": 2
        },
        "modifiers": [
            { "condition": "Tracking", "value": 35 },
            { "condition": "Ranger", "value": 25 },
            { "condition": "City-born", "value": -15 }
        ]
    },
    {
        "id": "quest_artifact_001",
        "name": "Cursed Artifact Disposal",
        "rank": "B",
        "type": "Retrieval",
        "duration": 3,
        "location": "temple",
        "client": "Inquisitor Graves",
        "description": "The Dagger of Souls must be destroyed in the Sacred Flames of Mount Pyralis. It whispers to its carriers, tempting them to use its power. Only the strong-willed should attempt this.",
        "requirements": {
            "primary": "INT 7"
        },
        "rewards": {
            "gold": 180,
            "xp": 90,
            "rep": 4
        },
        "modifiers": [
            { "condition": "Holy magic", "value": 40 },
            { "condition": "Curse resistance", "value": 30 },
            { "condition": "Greedy trait", "value": -50 }
        ]
    },
    {
        "id": "quest_assassin_001",
        "name": "Shadow Guild Contract",
        "rank": "B",
        "type": "Stealth",
        "duration": 2,
        "location": "town",
        "client": "Anonymous",
        "description": "A sealed letter arrived at midnight. Inside: a name, an address, and a bag of gold. The Shadow Guild doesn't explain their contracts. They just expect results. Not for the faint of heart or the morally squeamish.",
        "requirements": {
            "primary": "DEX 8"
        },
        "rewards": {
            "gold": 220,
            "xp": 85,
            "rep": 4
        },
        "modifiers": [
            { "condition": "Assassin", "value": 50 },
            { "condition": "Rogue", "value": 35 },
            { "condition": "Heavy Armor", "value": -70 },
            { "condition": "Morally righteous", "value": -40 }
        ]
    }
];

// === STORY QUESTS ===
// These are NOT in the random pool. They appear when specific flags are set.
window.GAME_DATA.storyQuests = [
    // === RED MOON CULT ARC ===
    {
        id: 'story_scout_woods',
        name: 'Scout the Dark Woods',
        rank: 'C',
        type: 'Stealth',
        duration: 1,
        location: 'forest',
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
        location: 'forest',
        isStoryQuest: true,
        isInteractive: true,
        storyIcon: '🩸',
        requiresFlag: 'cult_camp_found',
        setsFlag: 'cult_defeated',
        requirements: { stat: 'str', min: 7 },
        rewards: { gold: 400, xp: 200 },
        description: 'The Cult of the Red Moon is preparing a blood ritual. Stop them before it\'s too late.'
    },
    {
        id: 'story_cult_remnants',
        name: 'Hunt the Remnants',
        rank: 'B',
        type: 'Monster Hunt',
        duration: 2,
        location: 'forest',
        isStoryQuest: true,
        storyIcon: '🌑',
        requiresFlag: 'cult_defeated',
        requiresNotFlag: 'leader_captured',
        setsFlag: 'cult_purged',
        requirements: { stat: 'str', min: 6 },
        rewards: { gold: 180, xp: 100, crownRep: 2 },
        description: 'The cult leader escaped during the raid. Survivors have scattered. Hunt them down before they regroup.'
    },

    // === NOBLE'S CONSPIRACY ARC ===
    {
        id: 'story_noble_whispers',
        name: 'The Lord\'s Secret',
        rank: 'D',
        type: 'Stealth',
        duration: 1,
        location: 'castle',
        isStoryQuest: true,
        storyIcon: '👑',
        requiresFlag: 'noble_rumors_heard',
        setsFlag: 'noble_plot_discovered',
        requirements: { stat: 'dex', min: 5 },
        rewards: { gold: 60, xp: 40 },
        description: 'Lord Ashford has been acting strangely. Investigate his manor and discover what he\'s hiding.'
    },
    {
        id: 'story_noble_evidence',
        name: 'Gather Evidence',
        rank: 'C',
        type: 'Retrieval',
        duration: 2,
        location: 'castle',
        isStoryQuest: true,
        isInteractive: true,
        storyIcon: '📜',
        requiresFlag: 'noble_plot_discovered',
        setsFlag: 'noble_evidence_gathered',
        requirements: { stat: 'int', min: 5 },
        rewards: { gold: 100, xp: 60 },
        description: 'You know Lord Ashford is plotting against the Crown. Now you need proof to bring him to justice.'
    },
    {
        id: 'story_noble_arrest',
        name: 'Arrest Lord Ashford',
        rank: 'B',
        type: 'Escort',
        duration: 2,
        location: 'castle',
        isStoryQuest: true,
        storyIcon: '⚖️',
        requiresFlag: 'noble_evidence_gathered',
        setsFlag: 'noble_arrested',
        requirements: { stat: 'vit', min: 6 },
        rewards: { gold: 200, xp: 100, crownRep: 5 },
        description: 'With the Crown\'s warrant in hand, bring Lord Ashford to justice. His personal guard will not make this easy.'
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
    },

    // === NOBLE'S EVIDENCE INTERACTIVE QUEST ===
    // Day 1 of Gather Evidence
    {
        questId: 'story_noble_evidence',
        progressDay: 1,
        title: 'Inside the Manor',
        description: 'Your hero has slipped into Lord Ashford\'s study. Two drawers are locked—one marked with the family crest, another hidden behind a painting. There\'s only time to search one before the patrol returns.',
        choices: [
            {
                text: 'Search the family drawer. (Official documents)',
                effects: { successMod: 5, addFlag: 'found_family_letters' }
            },
            {
                text: 'Check behind the painting. (Hidden secrets)',
                effects: { successMod: 0, addFlag: 'found_secret_cache', crownRepOnSuccess: 2 }
            }
        ]
    },
    // Day 2 of Gather Evidence
    {
        questId: 'story_noble_evidence',
        progressDay: 2,
        title: 'The Witness',
        description: 'A maid saw your hero searching. She trembles in the corner. \"Please... I have a family. I\'ll tell no one, I swear!\"',
        choices: [
            {
                text: 'Let her go. (Mercy)',
                effects: { townRep: 1, successMod: -10 }
            },
            {
                text: 'Bring her as a witness. (She might talk to guards otherwise)',
                effects: { successMod: 10, addFlag: 'witness_secured', townRep: -1 }
            }
        ]
    }
];