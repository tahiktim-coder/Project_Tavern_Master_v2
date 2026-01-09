window.GAME_DATA = window.GAME_DATA || {};
window.GAME_DATA.classes = [
  {
    "id": "class_knight",
    "name": "Knight-Errant",
    "category": "Martial",
    "notes": "Tank / Leader",
    "stats": { "str": 8, "int": 3, "dex": 3, "vit": 7 },
    "growth": { "str": 50, "vit": 30, "dex": 10, "int": 10 },
    "specialties": ["Tanking", "Leadership", "Heavy Armor Master"],
    "startingTraits": [
      { "name": "Honorbound", "chance": 40 },
      { "name": "Arrogant", "chance": 30 },
      { "name": "Disciplined", "chance": 20 },
      { "name": "Brave", "chance": 10 }
    ],
    "affinities": [
      { "type": "Monster Hunts", "modifier": 15 },
      { "type": "Escort (Noble)", "modifier": 20 },
      { "type": "Stealth", "modifier": -30 },
      { "type": "Assassination", "modifier": -999 }
    ]
  },
  {
    "id": "class_barbarian",
    "name": "Barbarian",
    "category": "Martial",
    "notes": "Burst Damage / Berserker",
    "stats": { "str": 10, "int": 1, "dex": 5, "vit": 9 },
    "growth": { "str": 60, "vit": 25, "dex": 10, "int": 5 },
    "specialties": ["Battle Rage", "Beast Hunter", "Unarmored"],
    "startingTraits": [
      { "name": "Bloodthirsty", "chance": 50 },
      { "name": "Fearless", "chance": 25 },
      { "name": "Illiterate", "chance": 15 },
      { "name": "Reckless", "chance": 10 }
    ],
    "affinities": [
      { "type": "Beast Hunts", "modifier": 30 },
      { "type": "Escort", "modifier": -40 },
      { "type": "Diplomacy", "modifier": -50 },
      { "type": "Combat", "modifier": 20 }
    ]
  },
  {
    "id": "class_mercenary",
    "name": "Mercenary",
    "category": "Martial",
    "notes": "Versatile / Pragmatic",
    "stats": { "str": 7, "int": 4, "dex": 5, "vit": 8 },
    "growth": { "str": 40, "vit": 30, "dex": 20, "int": 10 },
    "specialties": ["Versatile", "Pragmatic Retreat", "Coin-Motivated"],
    "startingTraits": [
      { "name": "Greedy", "chance": 60 },
      { "name": "Pragmatic", "chance": 30 },
      { "name": "Veteran", "chance": 10 }
    ],
    "affinities": [
      { "type": "Any", "modifier": 0 },
      { "type": "High Reward", "modifier": 15 },
      { "type": "Low Reward", "modifier": -15 }
    ]
  },
  {
    "id": "class_rogue",
    "name": "Rogue",
    "category": "Cunning",
    "notes": "Stealth / Infiltration",
    "stats": { "str": 3, "int": 5, "dex": 9, "vit": 3 },
    "growth": { "dex": 60, "int": 20, "vit": 15, "str": 5 },
    "specialties": ["Stealth Master", "Trap Finder", "Backstab"],
    "startingTraits": [
      { "name": "Greedy", "chance": 70 },
      { "name": "Traitor", "chance": 40 },
      { "name": "Sneaky", "chance": 30 }
    ],
    "affinities": [
      { "type": "Stealth", "modifier": 55 },
      { "type": "Trap Dungeons", "modifier": 35 },
      { "type": "Open Combat", "modifier": -45 },
      { "type": "Trustworthy Escort", "modifier": -50 }
    ]
  },
  {
    "id": "class_battlemage",
    "name": "Battle Mage",
    "category": "Arcane",
    "notes": "AoE Damage",
    "stats": { "str": 2, "int": 9, "dex": 4, "vit": 4 },
    "growth": { "int": 60, "vit": 20, "dex": 15, "str": 5 },
    "specialties": ["Area of Effect", "Elemental Master", "Collateral Damage"],
    "startingTraits": [
      { "name": "Pyromaniac", "chance": 40 },
      { "name": "Short-Tempered", "chance": 30 },
      { "name": "Volatile", "chance": 30 }
    ],
    "affinities": [
      { "type": "Swarm Enemies", "modifier": 50 },
      { "type": "Escort (Fragile)", "modifier": -60 },
      { "type": "Stealth", "modifier": -40 }
    ]
  },
  {
    "id": "class_cleric",
    "name": "Cleric",
    "category": "Divine",
    "notes": "Healer / Undead Hunter",
    "stats": { "str": 4, "int": 8, "dex": 2, "vit": 7 },
    "growth": { "int": 50, "vit": 30, "str": 15, "dex": 5 },
    "specialties": ["Healing", "Undead Slayer", "Holy Smite"],
    "startingTraits": [
      { "name": "Zealot", "chance": 60 },
      { "name": "Faithful", "chance": 40 },
      { "name": "Pacifist", "chance": 30 }
    ],
    "affinities": [
      { "type": "Undead", "modifier": 60 },
      { "type": "Demons", "modifier": 50 },
      { "type": "Stealth", "modifier": -40 },
      { "type": "Immoral", "modifier": -999 }
    ]
  },
  {
    "id": "class_ranger",
    "name": "Ranger",
    "category": "Cunning",
    "stats": { "str": 5, "int": 4, "dex": 9, "vit": 6 },
    "growth": { "dex": 55, "vit": 25, "int": 12, "str": 8 },
    "specialties": ["Wilderness Expert", "Animal Companion", "City-Averse"],
    "startingTraits": [
      { "name": "Loner", "chance": 60 },
      { "name": "Nature Lover", "chance": 50 },
      { "name": "Tracker", "chance": 40 }
    ],
    "affinities": [
      { "type": "Wilderness", "modifier": 45 },
      { "type": "Tracking", "modifier": 40 },
      { "type": "Urban", "modifier": -35 }
    ]
  },
  {
    "id": "class_necromancer",
    "name": "Necromancer",
    "category": "Arcane",
    "stats": { "str": 3, "int": 9, "dex": 2, "vit": 5 },
    "growth": { "int": 65, "vit": 20, "dex": 10, "str": 5 },
    "specialties": ["Summon Undead", "Attrition Master", "Hated"],
    "startingTraits": [{ "name": "Outcast", "chance": 80 }, { "name": "Creepy", "chance": 60 }],
    "affinities": [{ "type": "Undead", "modifier": 25 }, { "type": "Holy", "modifier": -999 }]
  },
  {
    "id": "class_pitfighter",
    "name": "Pit Fighter",
    "category": "Martial",
    "stats": { "str": 8, "int": 2, "dex": 7, "vit": 6 },
    "growth": { "str": 50, "dex": 30, "vit": 15, "int": 5 },
    "specialties": ["Duelist", "Show-off", "Unarmored Fighter"],
    "startingTraits": [{ "name": "Sadist", "chance": 40 }, { "name": "Showman", "chance": 40 }],
    "affinities": [{ "type": "Duels", "modifier": 40 }, { "type": "Group Combat", "modifier": -25 }]
  },
  {
    "id": "class_scholar",
    "name": "Scholar",
    "category": "Arcane",
    "stats": { "str": 1, "int": 10, "dex": 2, "vit": 2 },
    "growth": { "int": 70, "vit": 15, "dex": 10, "str": 5 },
    "specialties": ["Puzzle Master", "Lore Expert", "Physically Weak"],
    "startingTraits": [{ "name": "Cowardly", "chance": 70 }, { "name": "Curious", "chance": 50 }],
    "affinities": [{ "type": "Puzzles", "modifier": 70 }, { "type": "Combat", "modifier": -90 }]
  },
  {
    "id": "class_ronin",
    "name": "Ronin",
    "category": "Martial",
    "stats": { "str": 7, "int": 5, "dex": 8, "vit": 5 },
    "growth": { "dex": 50, "str": 30, "int": 15, "vit": 5 },
    "specialties": ["Critical Strike", "Katana Master", "Wanderer"],
    "startingTraits": [{ "name": "Disciplined", "chance": 60 }, { "name": "Wanderer", "chance": 40 }],
    "affinities": [{ "type": "Duels", "modifier": 40 }, { "type": "Communication", "modifier": -25 }]
  },
  {
    "id": "class_illusionist",
    "name": "Illusionist",
    "category": "Arcane",
    "stats": { "str": 2, "int": 8, "dex": 7, "vit": 3 },
    "growth": { "int": 50, "dex": 35, "vit": 10, "str": 5 },
    "specialties": ["Illusion Master", "Liar", "Useless vs Undead"],
    "startingTraits": [{ "name": "Kleptomaniac", "chance": 60 }, { "name": "Deceptive", "chance": 50 }],
    "affinities": [{ "type": "Stealth", "modifier": 45 }, { "type": "Undead", "modifier": -80 }]
  },
  {
    "id": "class_guard",
    "name": "Town Guard",
    "category": "Martial",
    "stats": { "str": 5, "int": 3, "dex": 3, "vit": 6 },
    "growth": { "vit": 40, "str": 30, "dex": 20, "int": 10 },
    "specialties": ["City Defense", "Lazy", "Corrupt"],
    "startingTraits": [{ "name": "Lazy", "chance": 70 }, { "name": "Corrupt", "chance": 40 }],
    "affinities": [{ "type": "City Patrol", "modifier": 25 }, { "type": "Multi-Day", "modifier": -40 }]
  }
]
