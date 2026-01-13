/**
 * COMBAT TEXT POOLS
 * 
 * Modular text pools for dynamic combat generation.
 * Organized by weapon type, traits, and combat elements.
 * 
 * Architecture:
 * - Weapon-based verbs (not class-based) for flexibility
 * - Trait-driven style modifiers for personality
 * - Universal hit effects and reactions
 * - Easy to extend: just add to arrays
 * 
 * Usage: window.GAME_DATA.combatPools.weaponVerbs['blade']
 */

window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.combatPools = {

    // ═══════════════════════════════════════════════════════════════
    // WEAPON-SPECIFIC ATTACK VERBS
    // Each weapon type has its own vocabulary for attacks
    // ═══════════════════════════════════════════════════════════════

    weaponVerbs: {
        // Bladed weapons: swords, daggers, katanas, axes
        blade: [
            "slashes",
            "cuts",
            "thrusts",
            "parries and counter-strikes",
            "strikes",
            "carves"
        ],

        // Blunt weapons: maces, hammers, clubs, staves (melee)
        blunt: [
            "smashes",
            "bashes",
            "crushes",
            "slams",
            "hammers",
            "pounds"
        ],

        // Ranged weapons: bows, crossbows, throwing weapons
        ranged: [
            "fires",
            "looses an arrow",
            "shoots",
            "aims carefully and releases",
            "draws and looses",
            "lets fly"
        ],

        // Magical attacks: staves, wands, tomes, channeling
        magic: [
            "channels arcane energy",
            "unleashes a spell",
            "conjures magical force",
            "blasts with magic",
            "summons power",
            "casts destructive energy"
        ],

        // Unarmed combat: fists, kicks, grappling
        unarmed: [
            "punches",
            "kicks",
            "grapples",
            "strikes with fists",
            "throws",
            "slams with brutal force"
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TRAIT-BASED STYLE MODIFIERS
    // How characters fight based on their personality traits
    // ═══════════════════════════════════════════════════════════════

    styleAdverbs: {
        // Brave, Fearless traits
        brave: [
            "boldly",
            "fearlessly",
            "defiantly"
        ],

        // Reckless trait
        reckless: [
            "wildly",
            "recklessly",
            "without caution"
        ],

        // Disciplined trait
        disciplined: [
            "precisely",
            "methodically",
            "with deadly focus"
        ],

        // Cowardly trait
        cowardly: [
            "hesitantly",
            "nervously",
            "with shaking hands"
        ],

        // Bloodthirsty, Sadist traits
        bloodthirsty: [
            "savagely",
            "viciously",
            "with bloodlust"
        ],

        // Greedy, Pragmatic traits
        greedy: [
            "greedily eyeing the reward",
            "calculating every move",
            "pragmatically"
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // HIT EFFECTS
    // Universal descriptions of successful strikes
    // ═══════════════════════════════════════════════════════════════

    hitEffects: [
        // Original 8
        "The blade bites deep",
        "Blood sprays",
        "A solid hit",
        "The strike connects",
        "Armor cracks",
        "Bone crunches",
        "A devastating blow",
        "The enemy reels",
        // New additions for variety
        "A vicious wound opens",
        "Sparks fly from the impact",
        "A telling blow lands",
        "Flesh tears",
        "The strike finds its mark",
        "A punishing hit",
        "Steel meets bone",
        "A clean hit",
        "The attack cuts true",
        "The enemy staggers",
        "A perfect strike",
        "The blow lands hard"
    ],

    // ═══════════════════════════════════════════════════════════════
    // CRITICAL HIT INTROS
    // Dramatic openings for critical strikes
    // ═══════════════════════════════════════════════════════════════

    critIntros: [
        "Time slows!",
        "A perfect opening!",
        "The crowd gasps!",
        "Seizing the moment!",
        "With supernatural precision!"
    ],

    // ═══════════════════════════════════════════════════════════════
    // ENEMY REACTIONS
    // How enemies respond to being hit
    // ═══════════════════════════════════════════════════════════════

    enemyReactions: [
        "staggers back",
        "roars in pain",
        "stumbles",
        "recoils",
        "snarls defiantly",
        "barely catches itself"
    ],

    // ═══════════════════════════════════════════════════════════════
    // BODY PARTS (For targeting in combat)
    // Organized by enemy type for appropriate anatomy
    // ═══════════════════════════════════════════════════════════════

    bodyParts: {
        // Humanoid enemies: bandits, knights, cultists
        humanoid: [
            "head",
            "chest",
            "shoulder",
            "arm",
            "leg",
            "side"
        ],

        // Beast enemies: wolves, bears, giant spiders
        beast: [
            "flank",
            "hide",
            "maw",
            "haunch",
            "throat",
            "paw"
        ],

        // Monster/dragon enemies: dragons, golems, demons
        monster: [
            "scales",
            "hide",
            "core",
            "eye",
            "wing",
            "tail"
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // ENEMY-SPECIFIC ATTACK POOLS
    // Different enemy types have unique attack vocabularies
    // ═══════════════════════════════════════════════════════════════

    enemyAttacks: {
        dragon: [
            "breathes a torrent of flames",
            "sweeps its massive tail",
            "crushes down with ancient claws",
            "roars with deafening fury",
            "beats its wings, creating a shockwave"
        ],
        beast: [
            "lunges with savage claws",
            "snaps with powerful jaws",
            "pounces with feral fury",
            "rakes with razor-sharp talons",
            "charges with primal rage"
        ],
        stalker: [
            "phases through shadows to strike",
            "materializes and slashes",
            "strikes from nowhere",
            "extends razor tendrils",
            "vanishes and reappears behind"
        ],
        undead: [
            "claws with skeletal fingers",
            "drains life force",
            "unleashes a chilling touch",
            "strikes with unholy strength",
            "releases a necrotic blast"
        ],
        witch: [
            "hurls dark magic",
            "cackles and unleashes a curse",
            "summons shadow bolts",
            "channels corrupted energy",
            "weaves a painful hex"
        ],
        golem: [
            "slams with stone fists",
            "swings a crushing arm",
            "stomps with earthshaking force",
            "hurls chunks of rock",
            "brings down both fists"
        ],
        humanoid: [
            "swings with deadly intent",
            "attacks viciously",
            "presses the assault",
            "strikes with practiced skill",
            "launches a fierce combo"
        ],
        horde: [
            "swarms in from all sides",
            "attacks in coordinated waves",
            "overwhelms with sheer numbers",
            "strikes from multiple angles",
            "surges forward relentlessly"
        ],
        default: [
            "attacks viciously",
            "strikes with fury",
            "presses the assault",
            "lashes out dangerously"
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // HERO DEFENSE REACTIONS
    // How heroes respond when taking damage (based on quest outcome)
    // ═══════════════════════════════════════════════════════════════

    heroDefenses: {
        success: [
            "grits through the pain",
            "absorbs the blow and steadies",
            "staggers but recovers quickly",
            "blocks partially, taking a glancing hit",
            "rolls with the impact"
        ],
        failure: [
            "takes the full brunt of the attack",
            "cries out in pain",
            "is driven back by the force",
            "barely stays standing",
            "reels from the devastating blow"
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CLASS-SPECIFIC OPENING LINES
    // Each class has unique combat starters
    // ═══════════════════════════════════════════════════════════════

    openingLines: {
        'Mercenary': [
            "Greatsword raised, ready for blood and coin.",
            "Battle-scarred and eager for the fight.",
            "Experience guides every step forward."
        ],
        'Knight-Errant': [
            "For honor and glory!",
            "Shield raised, oath remembered.",
            "A knight's duty calls."
        ],
        'Ronin': [
            "Hand rests on the katana's hilt, ready.",
            "Eyes closed, breathing steady, the blade will speak.",
            "The way of the sword begins now."
        ],
        'Rogue': [
            "Slipping into the shadows, daggers drawn.",
            "Every weakness will be exploited.",
            "The hunt begins."
        ],
        'Battle Mage': [
            "Arcane energy crackles through the air.",
            "Staff raised, incantation ready.",
            "Magic answers the call."
        ],
        'Ranger': [
            "Arrow nocked, eyes scanning for targets.",
            "The wild has taught its lessons well.",
            "Bow drawn, patience honed."
        ],
        'Necromancer': [
            "The dead stir at the master's approach.",
            "Dark whispers guide the way.",
            "Death is but a tool."
        ],
        'Barbarian': [
            "A primal roar echoes through the chamber!",
            "Rage building, ready to unleash.",
            "No strategy needed. Only fury."
        ],
        'Pit Fighter': [
            "Fists raised, ready for blood.",
            "The arena has prepared for this moment.",
            "No weapon needed. Just will."
        ],
        'Cleric': [
            "Divine light illuminates the path.",
            "Faith guides the mace arm.",
            "In the name of the sacred order!"
        ],
        'Scholar': [
            "Knowledge is the greatest weapon.",
            "Ancient texts spoke of this moment.",
            "Mind sharpened, ready to apply theory."
        ],
        'Illusionist': [
            "Reality bends to the will.",
            "What is real? They shall soon wonder.",
            "Deception is the truest art."
        ],
        'Town Guard': [
            "For the people and the law!",
            "Training kicks in instinctively.",
            "Duty before glory."
        ],
        'default': [
            "Weapon drawn, ready for battle.",
            "Eyes focused, ready to strike.",
            "The fight begins."
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // RESOLUTION TEMPLATES
    // Multiple variants per outcome tier using {hero} and {enemy} placeholders
    // ═══════════════════════════════════════════════════════════════

    resolutions: {
        LEGENDARY: [
            "With a final, legendary strike, {hero} defeats {enemy} in spectacular fashion! Bards will sing of this day!",
            "{hero} delivers the killing blow with supernatural grace! A legend is born!",
            "Against all odds, {hero} achieves the impossible! {enemy} falls in a display of pure heroism!"
        ],
        GREAT: [
            "{hero} lands a decisive blow! {enemy} falls. A great victory is claimed!",
            "The final strike connects! {hero} stands triumphant over {enemy}!",
            "With skill and determination, {hero} brings {enemy} to its knees!"
        ],
        SUCCESS: [
            "After a fierce battle, {hero} emerges victorious. {enemy} is no more.",
            "The dust settles. {hero} has won. {enemy} lies defeated.",
            "{hero} delivers the final blow. Victory is achieved."
        ],
        PARTIAL: [
            "{hero} completes the objective, but {enemy} escapes wounded. A bittersweet victory.",
            "The mission succeeds, though {enemy} slips away. Not a clean win.",
            "{hero} achieves the goal, but {enemy} will return another day."
        ],
        FAILURE: [
            "Overwhelmed, {hero} is forced to retreat. {enemy} remains undefeated.",
            "The battle turns against {hero}. Retreat is the only option.",
            "{enemy} proves too powerful. {hero} must withdraw."
        ],
        DISASTER: [
            "{hero} collapses, grievously wounded. The quest ends in disaster...",
            "Everything goes wrong. {hero} barely escapes with their life.",
            "{enemy} claims victory. {hero} limps away, broken."
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    // CRITICAL COMBAT MOMENTS
    // Dramatic turning points that inject tension into combat logs
    // ═══════════════════════════════════════════════════════════════

    criticalMoments: {
        // When hero HP drops low but outcome is positive
        nearDeathRally: [
            "Bloodied but unbowed, {hero} finds a second wind!",
            "With a surge of desperate strength, {hero} refuses to fall!",
            "Through gritted teeth, {hero} rises once more!",
            "\"Not... yet...\" {hero} whispers, standing against all odds.",
            "Drawing on reserves of will, {hero} pushes through the pain!"
        ],

        // When both combatants are low HP
        lastStand: [
            "Both combatants bloodied, this next exchange will decide everything.",
            "The air grows still. One final clash approaches.",
            "Neither can take much more. The end draws near.",
            "{hero} and {enemy} lock eyes — only one will walk away.",
            "Steel meets steel one last time. Everything rides on this."
        ],

        // S-rank quests with LEGENDARY outcomes
        overwhelmingForce: [
            "The very air trembles as {hero} unleashes their true power!",
            "Legends speak of moments like this — and now {hero} lives one.",
            "With a roar that shakes the heavens, {hero} transcends mortal limits!",
            "Time itself seems to slow as {hero} delivers the perfect strike!",
            "This is the moment bards will sing of for generations!"
        ],

        // Boss Hunt mid-combat flavor
        villainMonologue: [
            "{enemy} laughs: \"You think you can defeat ME?\"",
            "\"Foolish mortal,\" {enemy} snarls, \"You have no idea what you face.\"",
            "{enemy} roars: \"I have crushed a THOUSAND of your kind!\"",
            "\"Your guild master sent you to DIE,\" {enemy} hisses.",
            "{enemy} pauses mid-combat: \"Impressive... but not enough.\""
        ],

        // Successful defense against heavy damage
        heroicBlock: [
            "{hero} barely deflects the killing blow!",
            "By sheer instinct, {hero} evades certain death!",
            "The attack that should have ended {hero} finds only air!",
            "{hero}'s armor holds against the devastating strike!",
            "A hair's breadth from death — but {hero} survives!"
        ],

        // Quest type specific flavor
        questMoments: {
            'Boss Hunt': [
                "The beast's lair trembles with ancient fury.",
                "This creature has slain countless adventurers before.",
                "The stench of death fills the chamber."
            ],
            'Escort': [
                "Bandits emerge from the treeline — ambush!",
                "The convoy is surrounded. {hero} must hold the line.",
                "Protect the cargo at all costs!"
            ],
            'Retrieval': [
                "The artifact pulses with forbidden power.",
                "Traps trigger as {hero} reaches for the prize.",
                "Something ancient stirs as the treasure is disturbed."
            ]
        }
    }
};


/**
 * HELPER FUNCTION: Pick random element from array
 * Utility function for NarrativeGenerator to use
 */
window.GAME_DATA.combatPools.pickRandom = function (array) {
    if (!array || array.length === 0) return '';
    return array[Math.floor(Math.random() * array.length)];
};
