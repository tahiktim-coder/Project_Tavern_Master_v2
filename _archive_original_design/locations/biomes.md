# WORLD BIOMES - Environmental Systems

**Purpose**: Define all quest locations with hazards and modifiers  
**Format**: Implementation-ready for quest environment system  
**Total Biomes**: 10 (covering all difficulty tiers)

---

## BIOME MECHANICS

Each biome affects quest success through:
- **Difficulty Multiplier**: Base challenge increase
- **Environmental Hazards**: Unique dangers
- **Equipment Penalties**: Armor/weapon restrictions
- **Class Affinities**: Some classes thrive/suffer

---

# TIER 1: SAFE ZONES (Starting Areas)

## Grassy Plains
**ID**: `biome_plains`  
**Difficulty Multiplier**: 1.0x (baseline)  
**Terrain**: Open fields, safe roads

### Hazards
- **Rain**: Rusts armor slightly (-5% durability per quest)
- Minimal danger

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Any class | 0% | Neutral terrain |
| Rainy weather | -10% | Slippery mud |
| Heavy armor | 0% | No penalty |

### Common Quests
- Merchant escorts
- Bandit patrols
- Beast hunting (low-level)

### Visual
Green grass, blue sky, dirt roads

**Note**: Tutorial zone, no special preparation needed

---

## Deep Forest
**ID**: `biome_forest`  
**Difficulty Multiplier**: 1.2x  
**Terrain**: Dense trees, limited vision

### Hazards
- **Ambush**: Party starts surrounded (wolf packs)
- Limited visibility
- Getting lost (WIS check)

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Ranger class | +40% | Home terrain |
| Druid class | +45% | Nature affinity |
| Heavy armor | -20% | Noisy in undergrowth |
| Stealth quest | +15% | Natural cover |
| Fire magic | -25% | Risk of forest fire |

### Common Quests
- Wolf hunts
- Herb gathering
- Bandit camp raids
- Treant encounters

### Visual
Green canopy, dappled sunlight, moss

**Special**: Parties can get lost (10% chance, quest fails)

---

## Old Ruins
**ID**: `biome_ruins`  
**Difficulty Multiplier**: 1.5x (trap danger)  
**Terrain**: Crumbling stone structures

### Hazards
- **Collapse**: Heavy armor risks falling damage
- **Trap Density**: 3x normal trap frequency
- Undead presence

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Rogue class | +35% | Trap detection |
| Treasure Hunter | +40% | Dungeon delving |
| Heavy armor | -25% | Collapse risk |
| DEX 7+ | +20% | Avoid traps |

### Common Quests
- Treasure hunting
- Undead purges
- Mystery solving
- Ancient artifact retrieval

### Visual
Crumbling walls, overgrown vegetation, eerie

---

# TIER 2: HAZARDOUS (Mid-Game)

## Poison Swamp
**ID**: `biome_swamp`  
**Difficulty Multiplier**: 2.0x vs low VIT  
**Terrain**: Murky water, toxic gas

### Hazards
- **Disease**: Adventurers return sick (unavailable 3 days)
- **Drowning**: Heavy armor = death trap
- **Poison Gas**: VIT check required
- Quicksand

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Heavy Armor | -50% | **CRITICAL** drowning risk |
| Medium Armor | -30% | Moderate drowning |
| Light/No Armor | 0% | Safe |
| Dwarf race | -40% | Short legs in deep water |
| Fire Magic | -40% | Wet environment weakens |
| Water Magic | +50% | Thrives in swamp |
| VIT 8+ | +20% | Disease resistance |
| Poison Resist item | +40% | Negates gas |

### Common Quests
- Swamp witch hunts
- Rare reagent gathering
- Undead zombies
- Missing person recovery

### Visual
Brown/green murk, mist, dead trees, bubbling water

**Special**: 40% disease rate on successful quests

---

## Frozen Peaks
**ID**: `biome_mountain`  
**Difficulty Multiplier**: 2.0x vs low STR  
**Terrain**: Snow, ice, extreme cold

### Hazards
- **Frostbite**: Reduces DEX permanently if failed
- **Avalanche**: Random (10% per quest)
- **Thin Air**: VIT checks required
- Slippery ice

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Cold Resist item | +40% | Negates frostbite |
| Fur armor | +25% | Insulation |
| STR 7+ | +20% | Muscle generates heat |
| Fire magic | +30% | Warmth |
| Ice magic | +35% | Affinity |
| Climbing skill | +25% | Navigate peaks |

### Common Quests
- Dragon lairs (high peaks)
- Ice elemental hunting
- Mountain rescue
- Frozen tomb raiding

### Visual
White snow, blue ice, howling wind

**Special**: Permanent DEX -1 on critical failures (frostbite)

---

## Scorched Desert
**ID**: `biome_desert`  
**Difficulty Multiplier**: 1.5x stamina drain  
**Terrain**: Endless sand, extreme heat

### Hazards
- **Heat Stroke**: Heavy armor wearers auto-fail
- **Dehydration**: Requires water skin
- **Sandstorms**: 20% quest disruption
- Mirages (false paths)

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Heavy Armor | -60% | **Heat stroke**, auto-fail if no water |
| Water Skin item | +30% | Hydration |
| Fire Resist | +15% | Heat tolerance |
| Light Armor | +10% | Breathable |
| Ranger | +25% | Survival skills |

### Common Quests
- Scorpion nests
- Bandit oases
- Ancient tomb raiding
- Caravan escorts

### Visual
Golden sand, blinding sun, heat shimmers

**Special**: MANDATORY water skin for heavy armor users

---

# TIER 3: DEATH ZONES (End-Game)

## Active Volcano
**ID**: `biome_volcano`  
**Difficulty Multiplier**: 3.0x damage  
**Terrain**: Lava rivers, toxic ash

### Hazards
- **Magma**: Instant death if character trips
- **Toxic Fumes**: VIT checks or suffocation
- **Extreme Heat**: Fire Immunity REQUIRED
- Eruption risk

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Fire Immunity | +60% | **MANDATORY** for survival |
| NO Fire Immunity | -90% | **Instant death** from heat |
| Heavy Armor | -50% | Heat stroke |
| Dwarf race | +25% | Underground tolerance |
| Ice Magic | -60% | Weakened by environment |
| Fire Elemental | +70% | Home environment |

### Common Quests
- Dragon lairs (S-rank)
- Fire elemental hunts
- Lava golem extermination
- Forge retrieval

### Visual
Orange lava, black rock, ash clouds

**Special**: Fire Immunity potion (200G) REQUIRED or instant death

---

## The Void-Pit
**ID**: `biome_void`  
**Difficulty Multiplier**: 5.0x sanity drain  
**Terrain**: Reality breaking, gravity wrong

### Hazards
- **Madness**: Adventurer betrays guild on return
- **Sanity Drain**: INT -2 permanently
- **Eldritch Horrors**: Unbeatable enemies
- Time dilation

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Iron Will trait | +40% | Mental fortitude |
| INT 10 | +30% | Rational mind |
| INT < 5 | -70% | Easily corrupted |
| Scholar class | -50% | Curiosity kills |
| Monk | +45% | Disciplined mind |

### Common Quests
- Eldritch artifact retrieval (S-rank)
- Void cultist hunting
- Dimensional seal quests
- Madness investigation

### Visual
Purple/black swirls, floating rocks, whispers

**Special**: 30% chance adventurer goes INSANE on return (becomes NPC enemy)

---

## Underwater Ruins
**ID**: `biome_ocean`  
**Difficulty Multiplier**: Special (requires magic)  
**Terrain**: Sunken city, deep ocean

### Hazards
- **Drowning**: Instant death without water breathing
- **Pressure**: Crushes unprotected divers
- **Sea Monsters**: Kraken, sharks
- Limited visibility

### Modifiers
| Condition | Modifier | Reason |
|-----------|----------|--------|
| Water Breathing | +60% | **MANDATORY** spell/potion |
| NO Water Breathing | **AUTO-FAIL** | Instant drowning |
| Water Mage | +70% | Natural affinity |
| Heavy Armor | **AUTO-FAIL** | Sinks immediately |
| Swimmer trait | +25% | Trained |

### Common Quests
- Sunken treasure retrieval
- Sea monster hunts
- Merfolk diplomacy
- Lost ship salvage

### Visual
Blue-green water, coral ruins, bioluminescence

**Special**: Water Breathing potion (150G) MANDATORY or instant death

---

# BIOME SUMMARY TABLE

| Biome | Difficulty | Main Hazard | Required Item | Death Risk |
|-------|------------|-------------|---------------|------------|
| Plains | 1.0x | None | None | 2% |
| Forest | 1.2x | Ambush | None | 8% |
| Ruins | 1.5x | Traps | None | 12% |
| Swamp | 2.0x | Disease/Drowning | Poison Resist | 18% |
| Mountain | 2.0x | Frostbite | Cold Resist | 20% |
| Desert | 1.5x | Heat Stroke | Water Skin | 15% |
| Volcano | 3.0x | Lava | Fire Immunity | 45% |
| Void-Pit | 5.0x | Madness | Iron Will | 60% |
| Ocean | Special | Drowning | Water Breathing | 35% |

---

**TOTAL BIOMES DEFINED**: 9  
**Coverage**: All difficulty tiers, all hazard types  
**Special Mechanics**: Mandatory items, environmental deaths, permanent injuries

**Implementation Notes**:
- Biome modifiers STACK with quest modifiers
- "Auto-fail" conditions override all bonuses
- Some biomes require specific items (fire immunity, water breathing)
- Environmental hazards can cause PERMANENT stat loss
- Death zones should be gated behind reputation/level requirements
