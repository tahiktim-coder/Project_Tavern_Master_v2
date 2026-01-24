# ARMOR REGISTRY - Complete Protection System

**Purpose**: All armor types with protection, penalties, and environmental effects  
**Format**: Implementation-ready for equipment system  
**Total Armor Types**: 8 (Light → Heavy → Magical)

---

## ARMOR MECHANICS

- **Protection Value**: Damage reduction (0-10 scale)
- **DEX Penalty**: Movement restriction
- **Environmental Modifiers**: Terrain-specific effects
- **Weight Class**: Determines drowning/heat risks

---

# LIGHT ARMOR

## Padded Cloth
**ID**: `armor_cloth`  
**Weight Class**: Light  
**Protection**: 1/10  
**Value**: 15G

### Stats
- Base Defense: +1
- DEX Penalty: 0
- Durability: 50/100

### Requirements
- None (anyone can wear)

### Bonuses
- +10% stealth (quiet)
- +5% DEX-based quests
- No swimming penalty

### Penalties
- Minimal protection (physical attacks hurt)

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| All | 0% | Neutral |

### Visual
Simple tunic, dyed fabric, comfortable

**Note**: Cheapest option, preferred by mages/rogues

---

## Leather Armor
**ID**: `armor_leather`  
**Weight Class**: Light  
**Protection**: 3/10  
**Value**: 60G

### Stats
- Base Defense: +3
- DEX Penalty: -1
- Durability: 75/100

### Requirements
- STR 3+

### Bonuses
- +15% stealth
- +10% vs slashing attacks
- Good balance (protection + mobility)

### Penalties
- Weak vs piercing arrows

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| Forest | +5% | Natural camouflage |
| Desert | -10% | Heat absorption |
| Ocean | 0% | Does not sink |

### Visual
Brown/black leather, studded, practical

**Note**: Rogue/Ranger standard

---

# MEDIUM ARMOR

## Chainmail
**ID**: `armor_chainmail`  
**Weight Class**: Medium  
**Protection**: 5/10  
**Value**: 150G

### Stats
- Base Defense: +5
- DEX Penalty: -2
- Durability: 85/100

### Requirements
- STR 5+

### Bonuses
- +30% vs slashing attacks
- +20% vs piercing attacks
- Good all-rounder

### Penalties
- -15% stealth (rattles)
- Rusts in water

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| Plains | 0% | Neutral |
| Swamp | -20% | Rust + drowning risk |
| Ocean | -40% | Moderate sinking |
| Mountain | -10% | Cold metal |

### Visual
Metal rings, covering torso, underpadding

**Note**: Mercenary/Warrior standard

---

## Scale Armor
**ID**: `armor_scale`  
**Weight Class**: Medium  
**Protection**: 6/10  
**Value**: 200G

### Stats
- Base Defense: +6
- DEX Penalty: -2
- Durability: 90/100

### Requirements
- STR 6+

### Bonuses
- +25% vs slashing
- +30% vs piercing
- +15% vs fire (overlapping plates)

### Penalties
- -20% stealth
- -10% swimming

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| Dragon Lairs | +15% | Fire resistance |
| Swamp | -25% | Drowning risk |

### Visual
Overlapping metal scales, dragon-like

---

# HEAVY ARMOR

## Plate Armor
**ID**: `armor_plate`  
**Weight Class**: Heavy  
**Protection**: 8/10  
**Value**: 400G

### Stats
- Base Defense: +8
- DEX Penalty: -3
- Durability: 100/100

### Requirements
- STR 7+

### Bonuses
- +50% vs slashing
- +40% vs piercing
- +30% vs blunt
- Best physical protection

### Penalties
- -30% stealth (extremely loud)
- -40% DEX-based quests
- Slow movement

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| Plains/Urban | 0% | Designed for this |
| **Swamp** | **-50%** | **CRITICAL drowning risk** |
| **Desert** | **-60%** | **Heat stroke** (auto-fail without water) |
| Ocean | **-9999%** | **Instant drowning** |
| Confined Spaces | -25% | Mobility restricted |
| Forest | -20% | Noisy, caught on branches |

### Visual
Full metal suit, shiny, heraldry, impressive

**Note**: Knight/Paladin armor, massive penalties in wrong environment

---

## Dwarven Plate
**ID**: `armor_plate_dwarven`  
**Weight Class**: Heavy  
**Protection**: 9/10  
**Value**: 800G

### Stats
- Base Defense: +9
- DEX Penalty: -2 (better crafted)
- Durability: 100/100 (never breaks)

### Requirements
- STR 7+
- Dwarf race (optional, but +10% if dwarf)

### Bonuses
- +60% vs slashing/piercing/blunt
- Fire resistant (+20% vs fire)
- Masterwork (reduced penalties)

### Penalties
- Still suffers environmental penalties (but less)

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| Mountain | +15% | Dwarf homeland |
| Volcano | +20% | Fire resist |
| Swamp | -40% | Better than regular plate |
| Desert | -50% | Better than regular plate |

### Visual
Geometric patterns, rune-inscribed, dark metal

**Note**: Superior version of plate armor

---

# MAGICAL ARMOR

## Mage Robes
**ID**: `armor_robes`  
**Weight Class**: None  
**Protection**: 0/10  
**Value**: 100G

### Stats
- Physical Defense: 0
- Magic Defense: +30%
- DEX Penalty: 0

### Requirements
- INT 6+ (mage only)

### Bonuses
- +20% spell power
- +30% magic resistance
- Mana regeneration (if system exists)

### Penalties
- **NO physical protection** (dies instantly if hit)

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| All | 0% | Magic transcends terrain |
| Void-Pit | +20% | Arcane synergy |

### Visual
Flowing fabric, runes, glowing threads

**Note**: Mage-only equipment

---

## Enchanted Leather
**ID**: `armor_leather_enchanted`  
**Weight Class**: Light  
**Protection**: 5/10  
**Value**: 600G

### Stats
- Physical Defense: +5
- Magic Defense: +15%
- DEX Penalty: 0 (magically weightless)

### Requirements
- DEX 6+ OR INT 6+

### Bonuses
- +20% stealth (magical silence)
- +15% magic resistance
- No environmental penalties (enchanted)

### Penalties
- None (perfect armor, but expensive)

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| **All** | 0% | **Immune to environment** |

### Visual
Shimmering leather, glowing runes, ethereal

**Note**: End-game stealth armor

---

## Dragon Scale Armor
**ID**: `armor_dragonscale`  
**Weight Class**: Medium  
**Protection**: 10/10  
**Value**: 2000G

### Stats
- Physical Defense: +10 (MAXIMUM)
- Fire Resistance: 100% (immune)
- DEX Penalty: -1

### Requirements
- STR 6+
- **Must slay dragon** to obtain scales

### Bonuses
- +100% fire resistance (immune)
- +50% vs dragons
- +30% vs all physical damage
- +20 Crown Reputation (prestige)

### Penalties
- None (legendary armor)

### Environmental Effects
| Environment | Modifier | Reason |
|-------------|----------|--------|
| Volcano | +60% | **Fire immunity** |
| Desert | +30% | Heat resistance |
| **All other** | 0% | Neutral |

### Visual
Crimson/gold scales, glowing with inner heat

**Note**: Crafted from S-rank dragon quest reward

---

# ARMOR SUMMARY TABLE

| Armor | Weight | Protection | DEX Penalty | Cost | Best For | Worst In |
|-------|--------|------------|-------------|------|----------|----------|
| Cloth | Light | 1 | 0 | 15G | Mages | Combat |
| Leather | Light | 3 | -1 | 60G | Rogues/Rangers | Heavy combat |
| Chainmail | Medium | 5 | -2 | 150G | Warriors | Swamps |
| Scale | Medium | 6 | -2 | 200G | Dragon fights | Swamps |
| Plate | Heavy | 8 | -3 | 400G | Knights | Swamp/Desert/Ocean |
| Dwarf Plate | Heavy | 9 | -2 | 800G | Dwarves | Still bad in swamps |
| Mage Robes | None | 0 | 0 | 100G | Spellcasters | Physical combat |
| Enchanted Leather | Light | 5 | 0 | 600G | Everything | Expensive |
| Dragon Scale | Medium | 10 | -1 | 2000G | Everything | None (perfection) |

---

## ENVIRONMENTAL HAZARD GUIDE

### Critical Failures (Auto-Fail Environments)

**Heavy Armor in Swamp**: -50%  
**Heavy Armor in Desert (no water)**: -60%  
**Heavy Armor in Ocean**: **INSTANT DEATH**

### Recommended Armor by Environment

| Environment | Recommended | Avoid |
|-------------|-------------|-------|
| Plains | Any | None |
| Forest | Light/Medium | Heavy plate |
| Swamp | **Light only** | Heavy (drowning) |
| Desert | **Light only** | Heavy (heat stroke) |
| Mountain | Medium/Heavy | None |
| Volcano | Scale/Dragon | Regular plate |
| Ocean | **Light + Water Breathing** | Any heavy |
| Ruins | Medium | Heavy (collapse risk) |
| Void-Pit | Robes/Magical | Physical armor useless |

---

**TOTAL ARMOR TYPES**: 9  
**Coverage**: All weight classes, all playstyles  
**Special Features**: Environmental hazards, magical variants, legendary crafting

**Implementation Notes**:
- Armor choice is CRITICAL for quest success
- Heavy armor = death sentence in swamps/ocean
- Magical armor bypasses penalties (expensive)
- Dragon Scale is ultimate reward (requires S-rank quest)
- DEX penalties stack with stat penalties (cumulative)
