# CHARACTER CLASSES - Complete Registry

**Purpose**: All playable character class definitions with stats, progression, and mechanics  
**Format**: Implementation-ready data for character generation system  
**Total Classes**: 25 (covering all archetypes)

---

## CLASS CATEGORIES

- **Martial** (STR-focused): Tank, damage, versatility
- **Arcane** (INT-focused): Magic, AoE, debuffs
- **Cunning** (DEX-focused): Stealth, precision, utility
- **Divine/Nature** (VIT/INT hybrid): Support, healing, smiting

---

# MARTIAL CLASSES

## Knight-Errant
**ID**: `class_knight`  
**Category**: Martial  
**Archetype**: Tank / Leader

### Base Stats (Level 1)
- STR: 8/10
- INT: 3/10
- DEX: 3/10
- VIT: 7/10

### Stat Growth (Level Up Weights)
- STR: 50%
- VIT: 30%
- DEX: 10%
- INT: 10%

### Specialties
- **Tanking**: +20% survival vs melee enemies
- **Leadership**: +10% to all party members if present (future: party system)
- **Heavy Armor Master**: Can wear plate armor with no penalty

### Starting Traits (Probability)
- Honorbound (40%) - Refuses shady/immoral quests
- Arrogant (30%) - Refuses F-rank quests ("beneath me")
- Disciplined (20%) - No morale penalties
- Brave (10%)

### Visual Tells
- Shiny plate armor with minimal wear
- Heraldry/crest on shield
- Well-groomed, confident posture
- Longsword + kite shield combo

### Hire Cost Scaling
- Level 1-3: 100G
- Level 4-6: 150G
- Level 7-10: 200G + (50G per additional level)

### Daily Salary
- 20G base (full-time)

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Monster Hunts | +15% | Trained for combat |
| Escort (Noble) | +20% | Protection specialty |
| Stealth | -30% | Heavy armor is loud |
| Assassination | Refuses | Honorbound |

---

## Barbarian
**ID**: `class_barbarian`  
**Category**: Martial  
**Archetype**: Burst Damage / Berserker

### Base Stats (Level 1)
- STR: 10/10
- INT: 1/10
- DEX: 5/10
- VIT: 9/10

### Stat Growth
- STR: 60%
- VIT: 25%
- DEX: 10%
- INT: 5%

### Specialties
- **Battle Rage**: +30% damage, -20% defense (high risk/reward)
- **Beast Hunter**: +25% vs animal/beast enemies
- **Unarmored**: CANNOT wear heavy armor (restricts movement)

### Starting Traits
- Bloodthirsty (50%) - Kills hostages in escort missions 30% of time
- Fearless (25%) - Immune to fear effects
- Illiterate (15%) - Cannot do puzzle quests
- Reckless (10%) - +10% crit success, +10% crit failure

### Visual Tells
- Fur/leather armor, tribal tattoos
- Massive two-handed weapon
- Scars, war paint, wild hair
- Muscular build, aggressive stance

### Hire Cost
- Level 1-3: 80G (cheaper, less refined)
- Level 4-6: 120G
- Level 7-10: 180G

### Daily Salary
- 18G (slightly cheaper than knight)

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Beast Hunts | +30% | Natural terrain |
| Escort | -40% | Might kill client |
| Diplomacy | -50% | Scares townsfolk |
| Combat (any) | +20% | Born warrior |

---

## Mercenary
**ID**: `class_mercenary`  
**Category**: Martial  
**Archetype**: Versatile / Pragmatic

### Base Stats (Level 1)
- STR: 7/10
- INT: 4/10
- DEX: 5/10
- VIT: 8/10

### Stat Growth
- STR: 40%
- VIT: 30%
- DEX: 20%
- INT: 10%

### Specialties
- **Versatile**: No quest type penalties (generalist)
- **Pragmatic Retreat**: Will retreat at 30% HP (survival oriented)
- **Coin-Motivated**: +10% success if paid extra 20% (bribeable)

### Starting Traits
- Greedy (60%) - Demands +30G or refuses quest
- Pragmatic (30%) - Will retreat if quest is clearly failing
- Veteran (10%) - +1 all stats if high level

### Visual Tells
- Mismatched armor (practical, not pretty)
- Coin purse prominently displayed
- Well-maintained weapons
- Cynical expression, calculating eyes

### Hire Cost
- Level 1-3: 100G (standard)
- Level 4-6: 150G
- Level 7-10: 220G

### Daily Salary
- 20G (market rate)

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Any quest | 0% | True generalist |
| High reward (200G+) | +15% | Extra motivation |
| Low reward (<50G) | -15% | Not worth effort |

**Special**: If paid +30G bonus, removes all penalties

---

## Pit Fighter
**ID**: `class_pitfighter`  
**Category**: Martial  
**Archetype**: Duelist / Single Target

### Base Stats (Level 1)
- STR: 8/10
- INT: 2/10
- DEX: 7/10
- VIT: 6/10

### Stat Growth
- STR: 50%
- DEX: 30%
- VIT: 15%
- INT: 5%

### Specialties
- **Duelist**: +40% in 1v1 combat
- **Show-off**: +20% crit chance but takes unnecessary risks
- **Unarmored Fighter**: REFUSES armor (reduces DEX)

### Starting Traits
- Sadist (40%) - Unnecessarily cruel, -2 Town Rep per quest
- Showman (40%) - Takes risks for glory
- Brawler (20%) - Prefers fists/improvised weapons

### Visual Tells
- No armor, just leather wraps
- Brass knuckles, exotic weapons
- Cauliflower ear, broken nose
- Cocky swagger

### Hire Cost
- Level 1-3: 90G
- Level 4-6: 130G
- Level 7-10: 190G

### Daily Salary
- 17G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Assassination | +40% | Single target specialty |
| Monster Hunt (Boss) | +30% | 1v1 advantage |
| Group Combat | -25% | Poor tactics |
| Stealth | -15% | Too loud/showy |

---

## Town Guard
**ID**: `class_guard`  
**Category**: Martial  
**Archetype**: Defender / Lawful

### Base Stats (Level 1)
- STR: 5/10
- INT: 3/10
- DEX: 3/10
- VIT: 6/10

### Stat Growth
- VIT: 40%
- STR: 30%
- DEX: 20%
- INT: 10%

### Specialties
- **City Defense**: +25% in urban environments
- **Lazy**: -20% on quests >2 days duration
- **Corrupt**: Can be bribed to skip quests (30G)

### Starting Traits
- Lazy (70%) - Refuses long quests
- Corrupt (40%) - Accepts bribes
- Duty-Bound (10%) - +10% on lawful quests

### Visual Tells
- Generic town watch uniform
- Halberd/polearm
- Looks tired, bored expression
- Badge/insignia

### Hire Cost
- Level 1-3: 70G (cheap, lackluster)
- Level 4-6: 100G
- Level 7-10: 140G

### Daily Salary
- 15G (budget option)

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| City Patrol | +25% | Home terrain |
| Escort (Merchant) | +15% | Trained for this |
| Dungeon/Wilderness | -30% | Out of element |
| Multi-Day | -40% | Lazy trait |

---

## Ronin
**ID**: `class_ronin`  
**Category**: Martial  
**Archetype**: Burst Damage / Wanderer

### Base Stats (Level 1)
- STR: 7/10
- INT: 5/10
- DEX: 8/10
- VIT: 5/10

### Stat Growth
- DEX: 50%
- STR: 30%
- INT: 15%
- VIT: 5%

### Specialties
- **Critical Strike**: +30% crit chance
- **Katana Master**: +25% with slashing weapons
- **Wanderer**: Leaves town pool after 3 days if not hired

### Starting Traits
- Disciplined (60%) - No morale penalties
- Wanderer (40%) - Leaves pool quickly
- Honor-Bound (20%) - Refuses dishonorable quests

### Visual Tells
- Exotic eastern robes
- Curved blade (katana)
- Straw hat, stoic expression
- Minimal speech (language barrier)

### Hire Cost
- Level 1-3: 120G (exotic, rare)
- Level 4-6: 180G
- Level 7-10: 250G

### Daily Salary
- 22G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Assassination | +35% | Precision strikes |
| Duels | +40% | 1v1 mastery |
| Communication-heavy | -25% | Language barrier |

---

# ARCANE CLASSES

## Battle Mage
**ID**: `class_battlemage`  
**Category**: Arcane  
**Archetype**: AoE Damage / Evocation

### Base Stats (Level 1)
- STR: 2/10
- INT: 9/10
- DEX: 4/10
- VIT: 4/10

### Stat Growth
- INT: 60%
- VIT: 20%
- DEX: 15%
- STR: 5%

### Specialties
- **Area of Effect**: +40% vs groups/swarms
- **Elemental Master**: Chooses element at hire (Fire/Ice/Lightning)
- **Collateral Damage**: 20% chance to damage quest objectives

### Starting Traits
- Pyromaniac (40%) - Burns loot/buildings 20% of time
- Short-Tempered (30%) - May attack allies if insulted
- Volatile (30%) - Random spell backfires

### Visual Tells
- Burn-marked robes
- Staff crackling with energy
- Smell of ozone
- Singed eyebrows

### Hire Cost
- Level 1-3: 130G (powerful but risky)
- Level 4-6: 190G
- Level 7-10: 270G

### Daily Salary
- 25G (higher risk premium)

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Swarm Enemies | +50% | AoE specialty |
| Escort (Fragile) | -60% | Collateral damage |
| Stealth | -40% | Spells are loud |
| Boss (Single) | -20% | Overkill for one target |

---

## Scholar
**ID**: `class_scholar`  
**Category**: Arcane  
**Archetype**: Knowledge / Utility

### Base Stats (Level 1)
- STR: 1/10
- INT: 10/10
- DEX: 2/10
- VIT: 2/10

### Stat Growth
- INT: 70%
- VIT: 15%
- DEX: 10%
- STR: 5%

### Specialties
- **Puzzle Master**: +60% on puzzle/mystery quests
- **Lore Expert**: reveals hidden quest paths
- **Physically Weak**: Dies instantly if hit in combat

### Starting Traits
- Cowardly (70%) - Flees at first sign of danger
- Curious (50%) - Opens cursed chests (causes problems)
- Analytical (30%) - +15% on INT quests

### Visual Tells
- Thick glasses, ink-stained fingers
- Stack of books, no weapons
- Frail build, nervous demeanor
- Magnifying glass, journal

### Hire Cost
- Level 1-3: 90G (specialized use)
- Level 4-6: 140G
- Level 7-10: 200G

### Daily Salary
- 18G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Puzzles/Mysteries | +70% | Ultimate specialty |
| Library/Lore | +80% | Perfect match |
| Combat | -90% | Death sentence |
| Cursed Items | -40% | Curiosity kills |

---

## Necromancer
**ID**: `class_necromancer`  
**Category**: Arcane  
**Archetype**: Summoner / Attrition

### Base Stats (Level 1)
- STR: 3/10
- INT: 9/10
- DEX: 2/10
- VIT: 5/10

### Stat Growth
- INT: 65%
- VIT: 20%
- DEX: 10%
- STR: 5%

### Specialties
- **Summon Undead**: Skeletons fight for them (+30% in prolonged battles)
- **Attrition Master**: Better in long quests (multi-day)
- **Hated**: -5 Town Rep per quest (townfolk fear them)

### Starting Traits
- Outcast (80%) - Hated by priests, clerics refuse to work with them
- Creepy (60%) - NPCs uncomfortable
- Death-Obsessed (40%) - Interested in Crypt records

### Visual Tells
- Pale skin, dark robes
- Bone jewelry, skull staff
- Smell of earth/decay
- Undead familiar (rat, raven)

### Hire Cost
- Level 1-3: 110G
- Level 4-6: 170G
- Level 7-10: 240G

### Daily Salary
- 20G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Undead (fighting) | +25% | Knows their weaknesses |
| Attrition/Siege | +35% | Skeleton army |
| Holy Quests | Refuses | Incompatible |
| Social/Escort | -40% | Terrifying presence |

**Special**: -5 Town Rep penalty per quest completed (cumulative reputation loss)

---

[... continuing with more classes ...]

## Illusionist
**ID**: `class_illusionist`  
**Category**: Arcane  
**Archetype**: Trickster / Deception

### Base Stats (Level 1)
- STR: 2/10
- INT: 8/10
- DEX: 7/10
- VIT: 3/10

### Stat Growth
- INT: 50%
- DEX: 35%
- VIT: 10%
- STR: 5%

### Specialties
- **Illusion Master**: +40% on stealth/trickery quests
- **Liar**: 30% chance to fake quest success (caught = -10 Rep)
- **Useless vs Undead**: Illusions don't work on mindless enemies

### Starting Traits
- Kleptomaniac (60%) - Steals 30% of quest reward
- Deceptive (50%) - Cannot trust reports
- Charming (30%) - +10% on social quests

### Visual Tells
- Colorful, flashy clothes
- Deck of cards, rings
- Constant grin, shifty eyes
- Never stands still

### Hire Cost
- Level 1-3: 100G
- Level 4-6: 150G
- Level 7-10: 210G

### Daily Salary
- 19G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Stealth | +45% | Invisibility spells |
| Social/Persuasion | +35% | Charm magic |
| Undead | -80% | Illusions useless |
| Straightforward Combat | -30% | Tricks don't work |

---

# CUNNING CLASSES

## Rogue
**ID**: `class_rogue`  
**Category**: Cunning  
**Archetype**: Stealth / Infiltration

### Base Stats (Level 1)
- STR: 3/10
- INT: 5/10
- DEX: 9/10
- VIT: 3/10

### Stat Growth
- DEX: 60%
- INT: 20%
- VIT: 15%
- STR: 5%

### Specialties
- **Stealth Master**: +50% on infiltration quests
- **Trap Finder**: +30% vs trap-heavy dungeons
- **Backstab**: +40% damage vs unaware enemies

### Starting Traits
- Greedy (70%) - Steals quest item 30% chance
- Traitor (40%) - May defect to rival guild if underpaid
- Sneaky (30%) - +15% stealth

### Visual Tells
- Dark hooded cloak
- Twin daggers, lockpicks visible
- Silent footsteps
- Nervous eyes, scanning room

### Hire Cost
- Level 1-3: 90G
- Level 4-6: 140G
- Level 7-10: 200G

### Daily Salary
- 19G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Stealth/Infiltration | +55% | Perfect specialty |
| Trap Dungeons | +35% | Lockpicking |
| Open Combat | -45% | Fragile |
| Trustworthy Escort | -50% | May rob client |

---

## Ranger
**ID**: `class_ranger`  
**Category**: Cunning  
**Archetype**: Tracker / Wilderness

### Base Stats (Level 1)
- STR: 5/10
- INT: 4/10
- DEX: 9/10
- VIT: 6/10

### Stat Growth
- DEX: 55%
- VIT: 25%
- INT: 12%
- STR: 8%

### Specialties
- **Wilderness Expert**: +40% in forest/mountain/plains
- **Animal Companion**: Wolf/Hawk provides scouting (+15%)
- **City-Averse**: -30% in urban environments

### Starting Traits
- Loner (60%) - Refuses party quests (solo only)
- Nature Lover (50%) - Won't kill rare beasts
- Tracker (40%) - +25% pursuit quests

### Visual Tells
- Green/brown cloak
- Longbow, quiver
- Animal companion (wolf/hawk)
- Weathered face, calm demeanor

### Hire Cost
- Level 1-3: 95G
- Level 4-6: 145G
- Level 7-10: 210G

### Daily Salary
- 18G

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Wilderness | +45% | Home terrain |
| Tracking/Pursuit | +40% | Natural skill |
| Urban/City | -35% | Hates cities |
| Dungeon (enclosed) | -25% | Prefers open air |

---

[Continuing with remaining classes: Bard, Assassin, Treasure Hunter, Spy, Cleric, Paladin, Druid, Monk, Cultist...]

---

# DIVINE & NATURE CLASSES

## Cleric
**ID**: `class_cleric`  
**Category**: Divine  
**Archetype**: Healer / Undead Hunter

### Base Stats (Level 1)
- STR: 4/10
- INT: 8/10
- DEX: 2/10
- VIT: 7/10

### Stat Growth
- INT: 50%
- VIT: 30%
- STR: 15%
- DEX: 5%

### Specialties
- **Healing**: Reduces injury severity by 1 tier (permanent→major→minor)
- **Undead Slayer**: +50% vs undead enemies
- **Holy Smite**: +30% vs demons/evil

### Starting Traits
- Zealot (60%) - Refuses immoral quests, may purge "sinners"
- Pacifist (30%) - -20% in pure combat quests
- Faithful (40%) - +2 morale permanently

### Visual Tells
- White/gold robes
- Holy symbol (sun, cross)
- Mace (no bladed weapons)
- Radiant aura, kind expression

### Hire Cost
- Level 1-3: 150G (high demand)
- Level 4-6: 220G
- Level 7-10: 320G

### Daily Salary
- 25G (valuable support)

### Quest Affinities
| Quest Type | Modifier | Reason |
|-----------|----------|--------|
| Undead | +60% | Holy specialty |
| Demons | +50% | Divine power |
| Stealth | -40% | Armor is loud |
| Immoral (theft/assassin) | Refuses | Zealot |

**Special**: Automatically reduces one injury per week for guild members (passive ability)

---

# CLASS SUMMARY TABLE

| Class | Primary Stat | Cost (L1) | Salary | Best For | Worst For |
|-------|--------------|-----------|--------|----------|-----------|
| Knight | STR | 100G | 20G | Tank/Escort | Stealth |
| Barbarian | STR | 80G | 18G | Beast Combat | Diplomacy |
| Mercenary | STR | 100G | 20G | Versatile | Nothing |
| Pit Fighter | STR/DEX | 90G | 17G | Duels | Group Combat |
| Town Guard | VIT | 70G | 15G | City Patrol | Adventure |
| Ronin | DEX | 120G | 22G | Assassination | Communication |
| Battle Mage | INT | 130G | 25G | AoE/Swarms | Escort |
| Scholar | INT | 90G | 18G | Puzzles | Combat |
| Necromancer | INT | 110G | 20G | Attrition | Holy quests |
| Illusionist | INT/DEX | 100G | 19G | Stealth/Social | Undead |
| Rogue | DEX | 90G | 19G | Infiltration | Trustworthy tasks |
| Ranger | DEX | 95G | 18G | Wilderness | Urban |
| Cleric | INT | 150G | 25G | Undead/Healing | Immoral quests |

---

**TOTAL CLASSES DEFINED**: 13 (MVP set)  
**Additional classes to add**: Paladin, Druid, Monk, Cultist, Bard, Assassin, Treasure Hunter, Spy, Elementalist, Hedge Wizard, Town Militia, Gladiator

---

**Implementation Notes**:
- Each class has unique ID for database
- Hire cost scales with level (formula: baseCost + (level-1) × 30G)
- Salary is fixed regardless of level
- Traits probabilities can stack (e.g., Greedy + Pragmatic mercenary)
- Quest affinity modifiers stack with other bonuses
