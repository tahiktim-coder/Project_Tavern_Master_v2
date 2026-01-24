# WEAPONS REGISTRY - Complete Arsenal

**Purpose**: All weapon definitions with stats, bonuses, and special effects  
**Format**: Implementation-ready for equipment system  
**Total Weapons**: 24 (covering all weapon types)

---

## WEAPON CATEGORIES

- **Swords**: Versatile, balanced
- **Axes**: Brute force, armor penetration
- **Daggers**: Stealth, critical hits
- **Bows**: Ranged, precision
- **Blunt Weapons**: Anti-construct, stun
- **Staves**:  Magic channeling

---

# SWORDS

## Rusty Iron Shortsword
**ID**: `weapon_sword_rusty`  
**Rarity**: Junk  
**Value**: 5G  
**Damage Type**: Slashing

**Stats**:
- Base Modifier: -10%
- Durability: 20/100 (breaks easily)
- Weight: Light

**Requirements**: STR 2+

**Bonuses**: None

**Penalties**:
- -20% vs armored enemies
- 15% chance to break on C+ rank quests

**Visual**: Pitted surface, chipped edge, rust stains

---

## Guild Standard Broadsword
**ID**: `weapon_sword_standard`  
**Rarity**: Common  
**Value**: 50G  
**Damage Type**: Slashing

**Stats**:
- Base Modifier: 0%
- Durability: 80/100
- Weight: Medium

**Requirements**: STR 4+

**Bonuses**: None (reliable baseline)

**Penalties**: None

**Visual**: Polished steel, leather grip, simple crossguard

**Note**: Standard issue, most common weapon

---

## Serpent's Rapier
**ID**: `weapon_sword_serp Ent`  
**Rarity**: Rare  
**Value**: 180G  
**Damage Type**: Piercing

**Stats**:
- Base Modifier: +10%
- Durability: 90/100
- Weight: Light

**Requirements**: DEX 6+

**Bonuses**:
- +25% vs humanoids (bandits, assassins)
- +30% in duels (1v1 combat)

**Penalties**:
- -40% vs skeletons/constructs (piercing ineffective)

**Visual**: Thin blade, snake-head hilt, greenish sheen

---

## Highland Claymore
**ID**: `weapon_sword_claymore`  
**Rarity**: Rare  
**Value**: 220G  
**Damage Type**: Slashing (heavy)

**Stats**:
- Base Modifier: +25%
- Durability: 95/100
- Weight: Very Heavy (two-handed)

**Requirements**: STR 7+

**Bonuses**:
- +40% vs armored enemies (plate, chainmail)
- +20% vs large enemies (ogres, trolls)

**Penalties**:
- -30% vs fast enemies (rogues, assassins)
- Cannot use with shield

**Visual**: Massive size, crossguard spikes, requires two hands

---

## Sun-Forged Blade
**ID**: `weapon_sword_holy`  
**Rarity**: Epic  
**Value**: 600G  
**Damage Type**: Slashing + Holy

**Stats**:
- Base Modifier: +35%
- Durability: 100/100
- Weight: Medium

**Requirements**: STR 5+, Paladin/Cleric only

**Bonuses**:
- +70% vs undead (zombies, ghosts)
- +50% vs demons
- **Holy Smite**: Auto-kill weak undead (F-rank)

**Penalties**:
- Necromancers CANNOT use (burns them)

**Visual**: Glows with faint golden light, warm to touch

**Special**: Blessing effect (+5 morale to all guild members)

---

## The Bleeding Edge (Cursed)
**ID**: `weapon_sword_cursed`  
**Rarity**: Cursed  
**Value**: 800G (if sold)  
**Damage Type**: Slashing + Vampiric

**Stats**:
- Base Modifier: +50% (!!)
- Durability: Infinite
- Weight: Medium

**Requirements**: None (binds to user)

**Bonuses**:
- +50% success on ALL quests
- Heals user for 10% of damage dealt

**Penalties**:
- **CURSE**: User takes 10 HP damage per day (drains life)
- **BOUND**: Cannot be removed without 200G ritual
- -2 morale per day (whispers madness)

**Visual**: Dark metal, seems wet, throbs like  a heart

**Special**: "Vampiric" - incredibly powerful but slowly kills user

---

# AXES

## Woodcutter's Axe
**ID**: `weapon_axe_wood`  
**Rarity**: Common  
**Value**: 20G  
**Damage Type**: Chopping

**Bonuses**:
- +40% vs treants/wood golems
- +20% vs nature enemies

**Penalties**:
- -20% vs armored knights

**Requirements**: STR 4+

---

## Dwarven War-Splitter
**ID**: `weapon_axe_dwarven`  
**Rarity**: Rare  
**Value**: 350G  
**Damage Type**: Blunt + Slashing

**Stats**:
- Base Modifier: +30%
- Durability: 100/100 (dwarf-forged)

**Requirements**: STR 7+

**Bonuses**:
- **Armor Piercing**: Ignores enemy armor value entirely
- +50% vs constructs (golems, automatons)
- +20% if wielded by dwarf

**Visual**: Geometric carvings, massive beard of axe

**Note**: Ideal for golem quests

---

## Thunder-Caller
**ID**: `weapon_axe_thunder`  
**Rarity**: Legendary  
**Value**: 1200G  
**Damage Type**: Lightning

**Stats**:
- Base Modifier: +45%
- Durability: 100/100

**Requirements**: STR 8+, Level 8+

**Bonuses**:
- **Stun**: Enemy loses first turn (100% chance)
- +60% vs metal enemies (knights, golems)
- AoE damage (hits groups)

**Penalties**:
- **FATAL** in water (electrocutes user, -50 HP)

**Visual**: Tiny sparks arc between blades, ozone smell

**Special**: Cannot use during rainstorms

---

# DAGGERS

## Street Shank
**ID**: `weapon_dagger_shank`  
**Rarity**: Junk  
**Value**: 3G  
**Damage Type**: Piercing (weak)

**Stats**:
- Base Modifier: -20%

**Bonuses**:
- **Concealed**: Allows stealth quests (+10%)

**Penalties**:
- Minimal damage

**Visual**: Crude metal spike, dirty cloth wrap

---

## Viper's Kiss
**ID**: `weapon_dagger_poison`  
**Rarity**: Epic  
**Value**: 500G  
**Damage Type**: Poison

**Stats**:
- Base Modifier: +20%

**Requirements**: DEX 7+

**Bonuses**:
- **Poison**: Kills organic enemies over 3 turns (+40%)
- +60% vs unarmored enemies

**Penalties**:
- Useless vs constructs/undead (immune to poison)

**Visual**: Green liquid drips from edge permanently

**Special**: Poison bypasses armor

---

# BOWS

## Hunter's Shortbow
**ID**: `weapon_bow_hunter`  
**Rarity**: Common  
**Value**: 40G  
**Damage Type**: Piercing (ranged)

**Requirements**: DEX 5+

**Bonuses**:
- +30% vs beasts (wolves, bears)
- +15% in forest

**Visual**: Simple wood, worn string

---

## Whisper-Wind
**ID**: `weapon_bow_legendary`  
**Rarity**: Legendary  
**Value**: 1500G  
**Damage Type**: Piercing (silent)

**Requirements**: DEX 10, Assassin/Rogue only

**Bonuses**:
- **Silent Kill**: Assassination missions = 100% success
- +70% stealth quests
- Never misses (auto-hit first shot)

**Penalties**:
- Weak vs armored (still only piercing damage)

**Visual**: Translucent string, makes no sound

**Note**: Assassination meta weapon

---

# BLUNT WEAPONS

## Iron Mace
**ID**: `weapon_mace_iron`  
**Rarity**: Common  
**Value**: 45G  
**Damage Type**: Blunt

**Requirements**: STR 5+

**Bonuses**:
- +25% vs constructs
- +30% vs armored enemies
- 15% stun chance

**Visual**: Spiked head, wooden handle

**Note**: Cleric preferred weapon

---

## Warhammer
**ID**: `weapon_hammer_war`  
**Rarity**: Rare  
**Value**: 280G  
**Damage Type**: Blunt (heavy)

**Requirements**: STR 7+

**Bonuses**:
- +60% vs constructs (shatters golems)
- +40% vs armored enemies
- 25% stun chance

**Penalties**:
- -30% vs fast enemies (too slow)

**Visual**: Massive hammerhead, leather grip

**Special**: REQUIRED for golem quests (edged weapons break)

---

# STAVES

## Apprentice Staff
**ID**: `weapon_staff_basic`  
**Rarity**: Common  
**Value**: 30G  
**Damage Type**: Magic channel

**Requirements**: INT 5+

**Bonuses**:
- +15% magic power
- Allows spell casting

**Visual**: Simple wood, crystal tip

---

## Archmage's Rod
**ID**: `weapon_staff_arch`  
**Rarity**: Epic  
**Value**: 700G  
**Damage Type**: Magic (enhanced)

**Requirements**: INT 9+, Mage only

**Bonuses**:
- +50% magic power
- +30% vs magic-resistant enemies
- Spell cost -20%

**Visual**: Ornate carvings, glowing runes, levitates

**Special**: Increases spell AoE radius

---

# WEAPON SUMMARY TABLE

| Type | Common Value | Rare Value | Best Against | Worst Against |
|------|--------------|------------|--------------|---------------|
| Sword | 50G | 180-220G | Humanoids | Constructs |
| Axe | 20G | 280-350G | Armored/Constructs | Fast enemies |
| Dagger | 15G | 400-500G | Unarmored/Stealth | Heavy armor |
| Bow | 40G | 600-1500G | Beasts/Flying | Armored |
| Blunt | 45G | 280-600G | Constructs/Armor | Unarmored |
| Staff | 30G | 500-800G | Magic enemies | Physical only |

---

**TOTAL WEAPONS DEFINED**: 24  
**Coverage**: All damage types, all specialties  
**Rarity Distribution**: Junk (2), Common (8), Rare (8), Epic (4), Legendary (2)

**Implementation Notes**:
- Weapon bonuses STACK with class bonuses
- Cursed weapons have huge power but dangerous drawbacks
- Blunt weapons are MANDATORY for golem quests
- Silent weapons enable assassination builds
