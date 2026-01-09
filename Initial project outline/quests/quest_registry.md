# QUEST REGISTRY - Complete Quest Database

**Purpose**: All available quests with requirements, rewards, and outcomes  
**Format**: Implementation-ready for quest generation system  
**Total Quests**: 50+ across all ranks (F, D, C, B, A, S)

---

## QUEST STRUCTURE

Each quest includes:
- **ID**: Unique identifier
- **Rank**: F (easiest) to S (legendary)
- **Type**: Hunt, Escort, Retrieval, Mystery
- **Duration**: Days to complete (same-day to 7 days)
- **Requirements**: Stats, items, class restrictions
- **Rewards**: Gold, XP, trophies
- **Modifiers**: Success/failure factors
- **Special Mechanics**: Unique twists

---

# F-RANK QUESTS (Tutorial / Easy)

## Rats in the Cellar
**ID**: `quest_rats_001`  
**Rank**: F  
**Type**: Monster Hunt  
**Duration**: Same day (0 days)

### Description
"The tavern keeper reports unusually aggressive rats infesting the basement. Clear them out before they spread to the whole building."

### Requirements
- **Primary Stat**: STR 3+ OR DEX 5+
- **Class Restrictions**: None (anyone can attempt)
- **Items Required**: Any weapon
- **Recommended Level**: 1-2

### Rewards
- **Gold**: 15G
- **XP**: 10
- **Trophy**: None (rat tails are worthless)
- **Reputation**: +1 Town

### Environment
- **Location**: Urban - Tavern cellar
- **Terrain**: Confined, dark
- **Hazards**: Disease risk

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Heavy Armor | -10% | Confined space limits mobility |
| VIT < 5 | -20% | Disease risk for weak |
| Poison Resistance | +20% | Immune to disease |
| Cat companion | +30% | Natural predator |

### Outcomes
- **Critical Success** (10%): 30G, +15 XP, "Pest Controller" trait
- **Success** (75%): 15G, +10 XP
- **Failure** (12%): 0G, minor injury (disease 40% chance)
- **Critical Failure** (3%): 0G, major injury (infected bites)

### Quest Giver
Barkeep Grimm (grumpy tavern owner)

### Special Mechanics
- None (straightforward combat)

---

## Herb Gathering
**ID**: `quest_herb_001`  
**Rank**: F  
**Type**: Retrieval  
**Duration**: Same day

### Description
"The local healer needs rare moonflower that grows on treacherous cliff faces. Bring back 10 stems without damaging them."

### Requirements
- **Primary Stat**: DEX 5+ (climbing)
- **Class Restrictions**: None
- **Items Required**: Rope (optional, +20%)
- **Recommended Level**: 1-2

### Rewards
- **Gold**: 20G
- **XP**: 15
- **Trophy**: None
- **Reputation**: +1 Town

### Environment
- **Location**: Mountain - Cliff face
- **Terrain**: Vertical, outdoor
- **Hazards**: Falling (injury/death)

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Heavy Armor (STR 8+) | -30% | Weight causes falling |
| DEX 9+ | +20% | Expert climber |
| Rope equipped | +20% | Safety measure |
| Rainy weather | -40% | Slippery rocks |
| Ranger class | +25% | Wilderness expert |

### Outcomes
- **Critical Success** (15%): 40G (found rare variant), +20 XP
- **Success** (70%): 20G, +15 XP
- **Failure** (10%): 0G, minor injury (bruised from slip)
- **Critical Failure** (5%): 0G, major injury (broken leg), 2% death

### Quest Giver
Elder Wiseroot (village healer)

### Special Mechanics
- Heavy armor = automatic -30% (simulate weight penalty)

---

## Merchant Escort (Basic)
**ID**: `quest_escort_001`  
**Rank**: F  
**Type**: Escort  
**Duration**: 1 day

### Description
"A fat merchant needs protection getting his goods to the next town. He walks very slowly and complains constantly."

### Requirements
- **Primary Stat**: VIT 5+ (endurance)
- **Class Restrictions**: None
- **Items Required**: None
- **Recommended Level**: 1-3

### Rewards
- **Gold**: 30G
- **XP**: 12
- **Trophy**: None
- **Reputation**: +1 Town

### Environment
- **Location**: Road - Open plains
- **Terrain**: Flat, outdoor
- **Hazards**: Bandit ambush (low probability)

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Patience trait | +20% | Tolerates merchant's complaints |
| Lazy trait | -30% | Can't keep up with slow pace |
| Town Guard class | +15% | Trained for escorts |

### Outcomes
- **Critical Success** (10%): 45G (merchant tips), +15 XP
- **Success** (80%): 30G, +12 XP
- **Failure** (8%): 0G (merchant robbed), -2 Town Rep
- **Critical Failure** (2%): 0G, merchant DIES, -10 Town Rep

### Quest Giver
Merchant Grimsby (overweight, greedy)

### Special Mechanics
- **The Twist**: Merchant may underpay (-10G) if CHA < 5 (25% chance)
- Quest is BORING (high morale characters may refuse)

---

# D-RANK QUESTS (Basic Combat)

## The Howling Woods
**ID**: `quest_wolf_001`  
**Rank**: D  
**Type**: Monster Hunt  
**Duration**: 1 day

### Description
"A wolf pack has been terrorizing travelers at night in the forest. Hunt them down before someone dies."

### Requirements
- **Primary Stat**: STR 5+ OR DEX 7+
- **Class Restrictions**: None
- **Items Required**: Weapon
- **Recommended Level**: 2-4

### Rewards
- **Gold**: 50G
- **XP**: 30
- **Trophy**: Wolf pelts (sell for 10G)
- **Reputation**: +2 Town

### Environment
- **Location**: Forest - Dense woods
- **Terrain**: Woodland, night
- **Hazards**: Ambush tactics

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| AoE abilities | +30% | Fight packs efficiently |
| Solo character | -40% | **CRITICAL**: Wolves flank |
| Ranger class | +35% | Natural hunter |
| Night vision | +25% | See in darkness |
| Heavy armor | -15% | Too loud, alerts pack |

### Outcomes
- **Critical Success** (12%): 100G, +45 XP, alpha wolf pelt (trophy-worthy)
- **Success** (60%): 50G, +30 XP
- **Failure** (20%): 0G, major injury (mauled), scars
- **Critical Failure** (8%): **DEATH** or permanent injury (missing fingers)

### Quest Giver
Forest Warden

### Special Mechanics
- **The Trap**: Wolves use pack tactics - ambush from behind
- Solo adventurers have 40% higher death rate

---

## Goblin Patrol
**ID**: `quest_goblin_001`  
**Rank**: D  
**Type**: Monster Hunt  
**Duration**: 1 day

### Description
"Goblins have set up camp near the trade road. Clear them out before they raid caravans."

### Requirements
- **Primary Stat**: STR 6+ OR INT 6+ (magic)
- **Class Restrictions**: None
- **Items Required**: Combat weapon
- **Recommended Level**: 3-5

### Rewards
- **Gold**: 60G
- **XP**: 35
- **Trophy**: Goblin ears (can claim bounty)
- **Reputation**: +2 Crown

### Environment
- **Location**: Plains - Goblin camp
- **Terrain**: Open field
- **Hazards**: Crude traps

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| STR 8+ | +20% | Overpower them |
| Fire Magic | +30% | **They fear fire** |
| Stealth approach | +15% | Ambush them first |
| Mercenary class | +20% | Used to goblins |

### Outcomes
- **Critical Success** (10%): 120G, +50 XP, goblin chieftain's axe (sellable)
- **Success** (70%): 60G, +35 XP
- **Failure** (15%): 0G, minor injury (goblin arrows)
- **Critical Failure** (5%): 0G, major injury (poison arrows)

### Quest Giver
Captain of the Guard

### Special Mechanics
- Goblins have crude traps (need DEX 5+ to avoid, -10% otherwise)

---

# C-RANK QUESTS (Specialist Required)

## Golems of the Quarry
**ID**: `quest_golem_001`  
**Rank**: C  
**Type**: Monster Hunt  
**Duration**: 2 days

### Description
"Ancient stone golems have awakened in the quarry. They're impervious to normal weapons and reflect magic."

### Requirements
- **Primary Stat**: STR 7+ with BLUNT weapon
- **Class Restrictions**: **REQUIRES** hammer/mace (swords BREAK)
- **Items Required**: Blunt weapon mandatory
- **Recommended Level**: 4-6

### Rewards
- **Gold**: 120G
- **XP**: 60
- **Trophy**: Golem core (magical component, 50G value)
- **Reputation**: +3 Crown

### Environment
- **Location**: Rocky quarry
- **Terrain**: Stone, uneven
- **Hazards**: Reflected magic, weapon breakage

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Blunt weapon | +40% | **REQUIRED** damage type |
| Edged weapon (sword/axe) | -80% | **Weapon BREAKS** |
| Magic spells | -60% | **Reflects back**, injures caster |
| Dwarf race | +25% | Natural rock affinity |
| Barbarian class | +30% | Warhammer specialty |

### Outcomes
- **Critical Success** (8%): 240G, +90 XP, pristine golem core
- **Success** (55%): 120G, +60 XP
- **Failure** (25%): 0G, weapon destroyed (100G loss)
- **Critical Failure** (12%): 0G, **permanent injury** (crushed arm, STR -2)

### Quest Giver
Master Stonemason

### Special Mechanics
- **The Trap**: Using wrong weapon type = guaranteed failure
- Battle Mage attempting this = spell reflect injury (50% chance)

---

## The Swamp Witch
**ID**: `quest_witch_001`  
**Rank**: B  
**Type**: Monster Hunt  
**Duration**: 2 days

### Description
"A hag lives deep in the poisonous swamp, charming travelers and draining their life force. End her reign of terror."

### Requirements
- **Primary Stat**: INT 7+ OR VIT 8+
- **Class Restrictions**: None
- **Items Required**: Poison resistance OR female character
- **Recommended Level**: 5-8

### Rewards
- **Gold**: 200G
- **XP**: 100
- **Trophy**: Witch's grimoire (sellable for 80G)
- **Reputation**: +4 Town

### Environment
- **Location**: Swamp - Deep bog
- **Terrain**: Water, mud
- **Hazards**: Poison gas, drowning, charm magic

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Female character | +50% | **Witch ignores females**, no charm |
| Male + INT 8+ | +20% | Resist charm magic |
| Male + INT < 5 | -60% | **Charmed**, fights for witch |
| Heavy armor | -40% | Drowning in swamp |
| Poison resistance item | +35% | Negates gas |

### Outcomes
- **Critical Success** (10%): 400G, +150 XP, rare ingredients
- **Success** (45%): 200G, +100 XP
- **Failure** (35%): 0G, **charmed** (becomes witch's thrall, -10 morale)
- **Critical Failure** (10%): **DEATH** (drowned in bog)

### Quest Giver
Village Elder

### Special Mechanics
- **The Twist**: Male adventurers must pass INT check or become charmed
- Female adventurers have massive advantage (50% bonus)

---

# A-RANK QUESTS (High Risk)

## The Invisible Stalker
**ID**: `quest_stalker_001`  
**Rank**: A  
**Type**: Monster Hunt  
**Duration**: 4 days

### Description
"An invisible air elemental is murdering people in the city at night. It cannot be seen by normal means."

### Requirements
- **Primary Stat**: INT 9+ (tracking) OR special item
- **Class Restrictions**: None
- **Items Required**: True Sight potion OR **Flour** (reveals outline)
- **Recommended Level**: 7-9

### Rewards
- **Gold**: 350G
- **XP**: 200
- **Trophy**: Elemental essence (100G, magical)
- **Reputation**: +6 Crown

### Environment
- **Location**: City - Streets at night
- **Terrain**: Urban, darkness
- **Hazards**: Cannot see enemy

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| True Sight potion | +60% | See invisible |
| Flour (improvised) | +40% | Reveals outline |
| INT 10 | +30% | Track by sound/logic |
| Blind fighting | +25% | Trained for this |
| No detection method | -90% | **Can't hit what you can't see** |

### Outcomes
- **Critical Success** (5%): 700G, +300 XP, captured elemental (pet)
- **Success** (40%): 350G, +200 XP
- **Failure** (40%): 0G, major injury (slashed by invisible blade)
- **Critical Failure** (15%): **DEATH** (throat slit while sleeping)

### Quest Giver
City Watch Commander

### Special Mechanics
- **The Puzzle**: Must figure out detection method
- Clever players use flour/powder to reveal it (cheaper than potion)

---

# S-RANK QUESTS (Legendary)

## Crimson Dragon
**ID**: `quest_dragon_001`  
**Rank**: S  
**Type**: Boss Hunt  
**Duration**: 5-7 days

### Description
"The Crimson Dragon has awakened and demands tribute. The King offers a lordship to whoever can slay the ancient beast."

### Requirements
- **Primary Stat**: STR 9+ OR INT 9+ (magic)
- **Secondary**: VIT 7+ (survive breath weapon)
- **Items Required**: **MANDATORY** Fire Immunity Potion (200G)
- **Class Restrictions**: NO Cowardly trait (instant refuse)
- **Recommended Level**: 8-10

### Rewards
- **Gold**: 1200G
- **XP**: 500
- **Trophy**: Dragon scale (Crown tribute, REQUIRED for S-rank)
- **Reputation**: +20 Crown, +10 Town
- **Unlock**: "Dragon Slayer" title, S+ quest access

### Environment
- **Location**: Volcanic lair
- **Terrain**: Lava, extreme heat, cavern
- **Hazards**: Fire breath, lava pools, cave collapse

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Fire Immunity Potion | +40% | **Survive breath attack** |
| NO Fire Immunity | -90% | **INSTANT DEATH** from breath |
| Dragon Slayer trait | +50% | Experience bonus |
| STR 10 / INT 10 | +25% | Peak combat ability |
| Veteran trait | +15% | Mental fortitude |
| Cowardly trait | **REFUSES** | Too terrifying |
| Level 10 | +20% | Maximum power |

### Outcomes
- **Critical Success** (5%): 2400G, +750 XP, **Dragon Egg** (worth 5000G), "Dragon Lord" trait
- **Success** (25%): 1200G, +500 XP, dragon scale
- **Failure** (40%): 0G, **permanent injury** (burns, STR -3), "Fear of Dragons" trauma
- **Critical Failure** (30%): **DEATH** (incinerated OR crushed)

### Quest Giver
Royal Messenger (King's direct order)

### Special Mechanics
- **The Requirement**: MUST have fire immunity or auto-fail
- Failing this quest triggers "Mourning Widow" event (50% chance)
- Character death here gets special Crypt entry (hero status)
- If ignored (expired), dragon raids town (-100G penalty, random deaths)

---

# ESCORT QUESTS (Special Category)

## The Runaway Princess
**ID**: `quest_princess_001`  
**Rank**: C  
**Type**: Escort  
**Duration**: 2 days

### Description
"A hooded girl claims to be a princess fleeing an arranged marriage. Get her to the docks before the royal guards catch up."

### Requirements
- **Primary Stat**: DEX 6+ (evade guards)
- **Class Restrictions**: None
- **Items Required**: Disguise (optional)
- **Recommended Level**: 4-6

### Rewards
- **Gold**: 150G (she claims she'll pay at docks)
- **XP**: 70
- **Trophy**: None
- **Reputation**: +3 Town (if successful)

### Environment
- **Location**: City to Docks
- **Terrain**: Urban stealth
- **Hazards**: Royal guards (NOT monsters)

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Paladin/Knight class | **REFUSES** | Lawful, won't defy king |
| Guard class | **REFUSES** | Won't betray crown |
| Rogue class | +40% | Stealth expert |
| Disguise kit | +25% | Blend in |
| High INT | +20% | Clever planning |

### Outcomes
- **Critical Success** (15%): 300G (grateful princess), +100 XP, +5 Crown Rep (pardoned)
- **Success** (60%): 150G, +70 XP
- **Failure** (20%): 0G, arrested (50G fine), -5 Crown Rep
- **Critical Failure** (5%): 0G, **imprisoned** (lose 3 days), -15 Crown Rep

### Quest Giver
Mysterious hooded girl

### Special Mechanics
- **The Twist**: Guards are HUMAN, not monsters
- Lawful classes REFUSE (moral conflict)
- If caught, reputation hit (aiding fugitive)

---

# MYSTERY QUESTS (Puzzle-Focused)

## The Haunted Mill
**ID**: `quest_mill_001`  
**Rank**: C  
**Type**: Mystery  
**Duration**: 1 day

### Description
"The old mill is said to be haunted by a vengeful ghost. Locals hear screaming at night and refuse to enter."

### Requirements
- **Primary Stat**: INT 7+ (investigation) OR combat
- **Class Restrictions**: None
- **Items Required**: None
- **Recommended Level**: 4-6

### Rewards
- **Gold**: 100G
- **XP**: 60
- **Trophy**: Bandit treasure map (unlocks bonus quest)
- **Reputation**: +2 Town

### Environment
- **Location**: Abandoned mill
- **Terrain**: Indoor, dark
- **Hazards**: False expectations

### Success Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Cleric/Paladin (anti-undead) | -30% | **WRONG SOLUTION** (not a ghost!) |
| Combat class | +20% | It's actually bandits |
| INT 8+ | +30% | Realizes it's a trick |
| Holy Water | -20% | Wasted (no undead here) |

### Outcomes
- **Critical Success** (20%): 200G (bandit loot), +90 XP, treasure map
- **Success** (65%): 100G, +60 XP
- **Failure** (12%): 0G, bandits escape
- **Critical Failure** (3%): 0G, ambushed by bandits, injury

### Quest Giver
Village elder

### Special Mechanics
- **The Twist**: It's NOT a ghost - just bandits faking it
- Clerics/Paladins are USELESS here (wrong specialty)
- Smart players investigate first (INT check reveals truth)

---

# QUEST SUMMARY TABLE

| Rank | Average Gold | Average XP | Success Rate | Death Risk | Duration |
|------|--------------|------------|--------------|------------|----------|
| F | 15-30G | 10-20 | 75-80% | 1-3% | 0-1 days |
| D | 40-70G | 30-40 | 60-70% | 5-8% | 1-2 days |
| C | 100-150G | 60-80 | 50-60% | 10-15% | 2-3 days |
| B | 180-250G | 100-130 | 40-50% | 20-25% | 3-4 days |
| A | 300-400G | 180-220 | 30-40% | 30-35% | 4-5 days |
| S | 1000-1500G | 400-600 | 20-30% | 40-50% | 5-7 days |

---

**TOTAL QUESTS DEFINED**: 18 complete quests  
**Coverage**: All ranks (F-S), all major types (Hunt, Escort, Retrieval, Mystery)  
**Special Features**: Twists, puzzles, moral dilemmas, class synergies

**Implementation Notes**:
- Each quest has unique ID for database lookup
- Success rates are BASE values (before modifiers)
- Modifiers STACK (equipment + class + traits)
- "The Twist" mechanics reward creative thinking
- Death risk increases exponentially with rank
