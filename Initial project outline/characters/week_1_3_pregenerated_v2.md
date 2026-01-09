# WEEK 1-3 PRE-GENERATED CHARACTERS (MVP)

**Purpose**: Testing-ready adventurer pool with minimal schema  
**Format**: Essential data only - expandable in Phase 2-3  
**Total**: 22 characters (7 Week 1, 8 Week 2, 7 Week 3)  
**Inspiration**: Subtle references to anime/games (not obvious copies)

---

## 📋 DATA FORMAT

```javascript
{
    id: "char_week1_001",
    name: "Marcus",
    surname: "Ironheart",
    classId: "mercenary",
    level: 2,
    baseStats: { str: 7, int: 4, dex: 5, vit: 8 },
    traits: ["pragmatic", "greedy"],
    equipment: {
        weaponId: "sword_iron",
        armorId: "armor_chain"
    },
    hireCost: 110,
    dailyWage: 20,
    visualTells: [
        "Well-worn chainmail",
        "Constantly counting coins"
    ],
    week: 1,
    day: 1
}
```

---

# 📅 WEEK 1 - The Hopefuls

## Day 1: Marcus Ironheart
**ID**: `char_week1_001`  
**Class**: Mercenary | **Level**: 2  
**Cost**: 110G | **Salary**: 20G/day

**Stats**: STR 7 | INT 4 | DEX 5 | VIT 8  
**Traits**: Pragmatic, Greedy

**Equipment**:
- Weapon: `sword_iron` (Iron Longsword)
- Armor: `armor_chain` (Chainmail)

**Visual Tells**:
- Well-worn chainmail with multiple dents
- Coin purse prominently displayed
- Calculating eyes, assesses everything's value

**Inspiration**: Reliable starter mercenary

---

## Day 2: Wilhelm the Wanderer
**ID**: `char_week1_002`  
**Class**: Knight-Errant | **Level**: 4  
**Cost**: 150G | **Salary**: 22G/day

**Stats**: STR 8 | INT 5 | DEX 3 | VIT 9  
**Traits**: Honorbound, Veteran, [HIDDEN] Humble

**Equipment**:
- Weapon: `sword_ancient` (Ancient Greatsword)
- Armor: `armor_plate_worn` (Worn Plate Armor)

**Visual Tells**:
- Weathered armor that's clearly legendary quality
- Kind smile, wise but tired eyes
- Speaks of "old campaigns" nobody remembers
- Ancient sword with faded etchings

**Special**: After 10 successful quests, reveals he was part of a legendary hero's party 80 years ago

**Inspiration**: Forgotten veteran (Himmel/Frieren vibe, but subtle)

---

## Day 3: Aldric of the Eastern Peaks
**ID**: `char_week1_003`  
**Class**: Ronin | **Level**: 6  
**Cost**: 240G | **Salary**: 25G/day

**Stats**: STR 7 | INT 9 | DEX 10 | VIT 6  
**Traits**: Disciplined, [HIDDEN] True Sight

**Equipment**:
- Weapon: `katana_whisper` (Whispering Wind Katana)
- Armor: `armor_cloth` (Traveler's Robes)
- Accessory: `blindfold_silk` (Silk Blindfold)

**Visual Tells**:
- Permanent dark silk blindfold
- Silver streaks in dark hair despite young age
- Moves with uncanny precision for someone blind
- Katana hums softly when drawn

**Special**: Hidden trait "True Sight" - can sense magical auras, +40% vs cursed enemies

**Inspiration**: Blind swordsman archetype (subtle Gojo/Zatoichi mix)

---

## Day 4: Grimm the Opportunist
**ID**: `char_week1_004`  
**Class**: Rogue | **Level**: 3  
**Cost**: 120G | **Salary**: 19G/day

**Stats**: STR 3 | INT 7 | DEX 9 | VIT 4  
**Traits**: Greedy, Traitor, Kleptomaniac

**Equipment**:
- Weapon: `dagger_twin` (Twin Daggers)
- Armor: `armor_leather` (Leather Armor)

**Visual Tells**:
- Bald head, thick beard
- Permanent smirk
- Eyes constantly darting to valuables
- Stands suspiciously near ledges

**Special**: 30% chance to steal quest rewards. 10% chance to kick party members off cliffs (instant death). If fired, returns Week 5 with better gear.

**Inspiration**: Patches (Dark Souls) - that bastard

---

## Day 5: Ash the Wanderer
**ID**: `char_week1_005`  
**Class**: Barbarian | **Level**: 1  
**Cost**: 80G | **Salary**: 18G/day

**Stats**: STR 10 | INT 2 | DEX 6 | VIT 8  
**Traits**: Reckless, [HIDDEN] Undying

**Equipment**:
- Weapon: `greatsword_burned` (Charred Greatsword)
- Armor: `armor_none` (No Armor)

**Visual Tells**:
- Covered in ash and burn scars
- Eyes glow faintly like embers
- Never speaks, only nods
- Smells of charcoal
- Partially melted equipment

**Special**: If killed, respawns at guild in 3 days but loses -1 VIT permanently each death. Fire immunity.

**Inspiration**: Ashen One (Dark Souls) - the respawning warrior

---

## Day 6: Viktor the Gravedigger
**ID**: `char_week1_006`  
**Class**: Necromancer | **Level**: 3  
**Cost**: 130G | **Salary**: 20G/day

**Stats**: STR 4 | INT 9 | DEX 3 | VIT 6  
**Traits**: Outcast, Creepy, [HIDDEN] Gentle Soul

**Equipment**:
- Weapon: `shovel_iron` (Iron Shovel) - not a staff!
- Armor: `robes_dark` (Dark Robes)

**Visual Tells**:
- Carries a shovel instead of traditional staff
- Dirt permanently under fingernails
- Kind grandfather face despite dark aesthetic
- Apologizes to his skeleton minions
- Brings flowers to graves

**Special**: -5 Town Rep per quest. Refuses to desecrate sacred graves. Can reduce penalty if reputation high enough.

**Inspiration**: Wholesome necromancer trope

---

## Day 7: Zara the Flameheart
**ID**: `char_week1_007`  
**Class**: Battle Mage | **Level**: 2  
**Cost**: 140G | **Salary**: 23G/day

**Stats**: STR 5 | INT 8 | DEX 6 | VIT 7  
**Traits**: Pyromaniac, [CURSED] Fire-Touched

**Equipment**:
- Weapon: `staff_ember` (Ember Staff)
- Armor: `robes_scorched` (Scorched Robes)

**Visual Tells**:
- Robes singed at the edges
- Hair has orange-red tips (natural or dyed?)
- Staff crackles with heat
- Avoids touching flammable objects
- Fingers twitch when stressed (sparks fly)

**Special**: 20% chance to burn quest objectives. +40% vs ice/water enemies. Weak to water damage.

**Inspiration**: Fire-obsessed mage archetype

---

# 📅 WEEK 2 - The Veterans

## Day 8: Roland the Scarred
**ID**: `char_week2_001`  
**Class**: Mercenary | **Level**: 8  
**Cost**: 300G | **Salary**: 30G/day

**Stats**: STR 10 | INT 4 | DEX 7 | VIT 10  
**Traits**: Veteran, Bloodthirsty, [CURSED] Demon Mark

**Equipment**:
- Weapon: `greatsword_dragon` (Dragonslayer Greatsword)
- Armor: `armor_plate_black` (Black Plate Armor)
- Accessory: `prosthetic_cannon` (Cannon Arm - replaces left arm)

**Visual Tells**:
- Massive sword (taller than most men)
- Missing left arm (has cannon prosthetic)
- Eyepatch over right eye
- Neck scar that bleeds near demons
- Aura of barely-contained rage

**Special**: Brand attracts demons (+1 enemy wave on demon quests). +70% vs demons. Refuses escort quests.

**Inspiration**: Guts (Berserk) - demon hunter

---

## Day 9: Celeste Moonweaver
**ID**: `char_week2_002`  
**Class**: Battle Mage | **Level**: 5  
**Cost**: 210G | **Salary**: 26G/day

**Stats**: STR 3 | INT 10 | DEX 5 | VIT 6  
**Traits**: Disciplined, Analytical

**Equipment**:
- Weapon: `staff_lunar` (Lunar Crystal Staff)
- Armor: `robes_pristine` (Pristine Mage Robes)

**Visual Tells**:
- Purple hair in perfect braids
- Emotionless expression
- Takes extensive notes before quests
- Never wastes a single spell
- Perfect posture

**Special**: Never triggers Collateral Damage (removes Battle Mage penalty). -20% salary if not questing (studies instead).

**Inspiration**: Disciplined mage archetype (Fern vibe)

---

## Day 10: Silas the Radiant
**ID**: `char_week2_003`  
**Class**: Cleric | **Level**: 7  
**Cost**: 280G | **Salary**: 27G/day

**Stats**: STR 8 | INT 7 | DEX 4 | VIT 10  
**Traits**: Zealot, Faithful, [HIDDEN] Inspirational

**Equipment**:
- Weapon: `mace_blessed` (Blessed Mace)
- Armor: `armor_plate_gold` (Golden Plate Armor)
- Accessory: `medal_sun` (Sun Medallion)

**Visual Tells**:
- Bright yellow tabard with sun emblem
- Constantly cheerful despite grim work
- Armor reflects sunlight brilliantly
- Leaves small sun-shaped medals everywhere
- Frequently raises arms in praise

**Special**: Party members gain +10 morale when near him. +20% success when paired with any ally. Leaves medals that grant +1 Town Rep.

**Inspiration**: Jolly cooperation! (Solaire energy)

---

## Day 10.5: Moros the Drowned
**ID**: `char_week2_003b`  
**Class**: Battle Mage (Water Specialist) | **Level**: 6  
**Cost**: 230G | **Salary**: 27G/day

**Stats**: STR 3 | INT 10 | DEX 4 | VIT 5  
**Traits**: [CURSED] Mind-Flooded, Unstable, [HIDDEN] Deluge Bringer

**Equipment**:
- Weapon: `staff_tide` (Staff of Endless Tides)
- Armor: `robes_drowned` (Waterlogged Robes - permanently soaked)
- Accessory: `anchor_iron` (Iron Anchor Pendant)

**Visual Tells**:
- Robes constantly dripping with water (no source)
- Speaks to himself in different voices
- Pupils dilated, thousand-yard stare
- Hair wet and stringy, stuck to face
- Leaves puddles wherever he stands
- Mutters "I drown... we all drown..."

**Special**: When morale < 30, creates flooding zones (30% chance to drown party members). +80% vs fire enemies. Each quest completed has 15% chance to trigger "Deluge Event" (floods quest area, makes future quests there harder). Extremely powerful but VERY dangerous to hire.

**Quote**: *"I drown in my head, and half the world will drown with me."*

**Backstory Hint**: Lost his family in a flood. Now the flood lives inside him. His nightmares leak into reality.

**Inspiration**: Tortured soul whose inner turmoil manifests as literal water magic

---

## Day 11: Kael Shadowcaller
**ID**: `char_week2_004`  
**Class**: Ranger | **Level**: 4  
**Cost**: 180G | **Salary**: 22G/day

**Stats**: STR 6 | INT 8 | DEX 8 | VIT 5  
**Traits**: Loner, [HIDDEN] Spirit Summoner

**Equipment**:
- Weapon: `bow_shadow` (Shadow Longbow)
- Armor: `armor_leather_dark` (Dark Leather Armor)

**Visual Tells**:
- Dark blue hair, permanent scowl
- Makes hand signs instead of whistling for animals
- Shadows around him seem deeper than normal
- Wolf-like shapes flicker in his shadow
- Refuses to smile

**Special**: Can summon shadow beasts (scales with quest rank). Will sacrifice HP to save party members.

**Inspiration**: Shadow summoner (Megumi vibe, subtle)

---

## Day 12: Ivory the Pale
**ID**: `char_week2_005`  
**Class**: Illusionist | **Level**: 6  
**Cost**: 220G | **Salary**: 24G/day

**Stats**: STR 4 | INT 9 | DEX 8 | VIT 5  
**Traits**: Deceptive, [CURSED] Half-Dragon, [HIDDEN] Frost Aura

**Equipment**:
- Weapon: `scythe_frost` (Frost Scythe)
- Armor: `dress_white` (White Dress)

**Visual Tells**:
- Barefoot even in snow (doesn't feel cold)
- Pale white skin, white hair
- Dragon tail poorly hidden under dress
- Glowing white weapon
- Becomes invisible in snowstorms

**Special**: +60% in winter/snow quests. Townsfolk fear her (-Town Rep). Auto-kills undead with Lifehunt ability.

**Inspiration**: Half-dragon outcast (Priscilla vibe)

---

## Day 13: Finnegan the Scribe
**ID**: `char_week2_006`  
**Class**: Scholar | **Level**: 3  
**Cost**: 130G | **Salary**: 18G/day

**Stats**: STR 2 | INT 10 | DEX 3 | VIT 3  
**Traits**: Cowardly, Curious, [HIDDEN] Brilliant

**Equipment**:
- Weapon: `staff_oak` (Oak Walking Staff) - not for combat
- Armor: `robes_scholar` (Scholar's Robes)

**Visual Tells**:
- Thick glasses, ink-stained fingers
- Carries more books than weapons
- Nervous demeanor, jumps at noises
- Magnifying glass and journal always present
- Mutters calculations under breath

**Special**: +70% on puzzle/mystery quests. Dies instantly if hit in combat. 50% chance to open cursed chests (causes problems).

**Inspiration**: Fragile genius archetype

---

## Day 14: Cassius the Stormbreaker
**ID**: `char_week2_007` ⚔️ **LEGENDARY**  
**Class**: Knight-Errant | **Level**: 10  
**Cost**: 500G | **Salary**: 50G/day

**Stats**: STR 10 | INT 8 | DEX 9 | VIT 10  
**Traits**: Veteran, Honorbound, [LEGENDARY] Storm Sovereign

**Equipment**:
- Weapon: `spear_lightning` (Lightning Spear)
- Armor: `armor_storm` (Storm-wreathed Armor)
- Accessory: `crown_forgotten` (Weathered Crown)

**Visual Tells**:
- Golden crown perpetually covered in storm clouds
- Armor crackles with constant electricity
- Lightning arcs between armor plates
- No one remembers his name after hearing it
- Thunder rumbles when angry

**Special**: Can solo S-rank quests at 95% success. Auto-kills flying enemies. Extremely expensive but worth it. Only appears if 15+ quests completed and 500G saved.

**Inspiration**: Forgotten deity (Nameless King, subtle)

---

# 📅 WEEK 3 - Chaos and Power

## Day 15: Toren the Breaker
**ID**: `char_week3_001`  
**Class**: Pit Fighter | **Level**: 7  
**Cost**: 250G | **Salary**: 28G/day

**Stats**: STR 10 | INT 3 | DEX 10 | VIT 8  
**Traits**: Sadist, Showman, [UNIQUE] Anti-Magic Body

**Equipment**:
- Weapon: `chain_cursed` (Cursed Chain Whip)
- Armor: `armor_none` (No Armor - refuses)

**Visual Tells**:
- Impossibly muscular, casual stance
- Scar across lips forming cruel smile
- Carries weapons in seemingly impossible places
- Moves like hunting cat
- Eyes pierce through illusions

**Special**: +80% vs magic-users. Immune to ALL magic (buffs AND debuffs). Refuses to work with mages/clerics.

**Inspiration**: Anti-magic warrior (Toji vibe, subtle)

---

## Day 16: Seraph the Undefeated
**ID**: `char_week3_002` ⚔️ **LEGENDARY**  
**Class**: Ronin | **Level**: 9  
**Cost**: 450G | **Salary**: 45G/day

**Stats**: STR 9 | INT 6 | DEX 10 | VIT 8  
**Traits**: Disciplined, [CURSED] Rot-Touched, [LEGENDARY] Blade Sovereign

**Equipment**:
- Weapon: `katana_gold` (Golden Katana)
- Armor: `armor_prosthetic` (Includes prosthetic arm and leg)

**Visual Tells**:
- Red hair, prosthetic right arm
- Prosthetic left leg (moves with inhuman grace)
- Constantly dripping strange flowers
- Helmet with wing motif
- Scent of decay mixed with flowers

**Special**: 95% base success on all quests. Creates rot zones after critical success (area cursed 7 days). Each quest increases town disease risk slightly.

**Inspiration**: Cursed warrior (Malenia vibe, subtle)

---

## Day 17: Grimm's Return
**ID**: `char_week3_003`  
**Class**: Rogue | **Level**: 5  
**Cost**: 180G | **Salary**: 21G/day

**Stats**: STR 4 | INT 8 | DEX 9 | VIT 5  
**Traits**: Greedy, Traitor, [HIDDEN] Unkillable

**Visual Tells**:
- Same bald bastard from Day 4
- Now wearing expensive merchant gear
- Grin even wider than before
- Clearly profited from betraying someone
- "No hard feelings, friend!"

**Special**: 100% will betray you again. Sells rare items at 2x price. If killed, returns Week 5 richer. Comedic villain.

**Inspiration**: Patches returns (because of course he does)

---

## Day 18: Lyra Starweaver
**ID**: `char_week3_004` 🌟 **MYTHIC**  
**Class**: Battle Mage | **Level**: 50  
**Cost**: 999G | **Salary**: 100G/day

**Stats**: STR 3 | INT 10+ | DEX 4 | VIT 7  
**Traits**: Disciplined, [UNIQUE] Immortal Elf, [LEGENDARY] Archmage, [HIDDEN] Collector

**Equipment**:
- Weapon: `staff_ancient` (Staff from Age of Heroes)
- Armor: `robes_elven` (Simple Elven Robes - deceptively powerful)
- Accessory: `grimoire_demon` (Demon King's Spellbook)

**Visual Tells**:
- Petite elf with white hair in twin braids
- Carries ancient weathered staff
- Emotionless expression, blank stare
- Mimic chest follows her around
- Looks young but eyes are ancient

**Special**: 99% success on ANY quest. Refuses F-D rank ("not worth my time"). If Wilhelm hired first, offers 90% discount out of nostalgia. Collects rare spells after quests.

**Inspiration**: Ancient mage (Frieren vibe, but named differently)

---

## Day 19: Dante the Corrupted
**ID**: `char_week3_005`  
**Class**: Knight-Errant | **Level**: 8  
**Cost**: 320G | **Salary**: 35G/day

**Stats**: STR 10 | INT 4 | DEX 8 | VIT 9  
**Traits**: Honorbound, [CURSED] Abyss-Touched, [LEGENDARY] Abyss Walker

**Equipment**:
- Weapon: `greatsword_abyss` (Abyssal Greatsword)
- Armor: `armor_tattered` (Tattered Knight Armor)
- Accessory: `wolf_helm` (Wolf-shaped Helm)

**Visual Tells**:
- Tattered blue cape
- Left arm hangs limp (shattered)
- Greatsword wielded one-handed
- Wolf-helm never removed
- Dark aura, moves with pained limp

**Special**: +70% vs abyss/dark enemies. -30% on all other quests (broken arm). Can rescue wolf companion (removes penalties). 10% chance to corrupt fully (becomes enemy).

**Inspiration**: Fallen knight (Artorias vibe, subtle)

---

## Day 20: Yuki the Vessel
**ID**: `char_week3_006`  
**Class**: Pit Fighter | **Level**: 4  
**Cost**: 150G | **Salary**: 20G/day

**Stats**: STR 7 | INT 5 | DEX 8 | VIT 9  
**Traits**: [CURSED] Dual Soul, Reckless

**Equipment**:
- Weapon: `fists` (Bare Fists - preferred)
- Armor: `armor_none` (No Armor)

**Visual Tells**:
- Marks appear under eyes when stressed
- Second pair of eyes manifest during combat
- Mouth on hand (speaks sometimes)
- Switches between cheerful and murderous
- Hair stands on end during transformation

**Special**: If HP < 20%, second soul takes over (100% combat success BUT might kill quest giver). Eating cursed items increases second soul's power (+risk).

**Inspiration**: Dual-soul fighter (Yuji/Sukuna vibe, very subtle)

---

## Day 21: Ravos the Defiler
**ID**: `char_week3_007`  
**Class**: Barbarian | **Level**: 6  
**Cost**: 200G | **Salary**: 25G/day

**Stats**: STR 10 | INT 2 | DEX 5 | VIT 10  
**Traits**: [EVIL] Corpse Defiler, Bloodthirsty, [CURSED] Omen Curse

**Equipment**:
- Weapon: `sword_rusted` (Rust-caked Longsword)
- Armor: `armor_blood` (Blood-soaked Armor)

**Visual Tells**:
- Armor covered in dried blood (never washed)
- Speaks in disturbing riddles
- Smells of death
- Eyes glow red with malice
- Townsfolk flee when they see him

**Special**: -10 Town Rep per quest. Every kill spreads curse (future quests harder). +90% on assassination/evil quests. At -50 Rep, townsfolk riot. **Evil option for cursed playthroughs.**

**Inspiration**: Villain option (Dung Eater, but less obvious)

---

## 📊 CHARACTER SUMMARY

### Power Distribution
- **F-D Tier** (Starter): Marcus, Grimm, Ash, Zara, Finnegan (5)
- **C-B Tier** (Solid): Wilhelm, Aldric, Viktor, Roland, Celeste, Silas, Moros, Kael, Ivory, Toren, Dante, Yuki (12)
- **A Tier** (Strong): Seraph, Ravos (2)
- **S Tier** (Legendary): Cassius (1)
- **Mythic** (Endgame): Lyra (1)
- **Comedy/Chaos**: Grimm returns (1)

**Total**: 22 characters

### Trait Variety
- Positive traits: Veteran, Disciplined, Honorbound, Faithful
- Negative traits: Greedy, Cowardly, Traitor, Pyromaniac, Bloodthirsty, Unstable
- Cursed traits: Demon Mark, Half-Dragon, Rot-Touched, Dual Soul, Omen Curse, Mind-Flooded
- Hidden/Legendary: True Sight, Undying, Storm Sovereign, Anti-Magic Body, Immortal Elf, Deluge Bringer

### Cost Range
- Week 1: 80G-240G (avg ~140G)
- Week 2: 130G-500G (avg ~250G)
- Week 3: 150G-999G (avg ~350G + mythic outlier)

---

## 💾 JSON CONVERSION EXAMPLE

```json
{
  "char_week1_001": {
    "id": "char_week1_001",
    "name": "Marcus",
    "surname": "Ironheart",
    "classId": "mercenary",
    "level": 2,
    "baseStats": { "str": 7, "int": 4, "dex": 5, "vit": 8 },
    "traits": ["pragmatic", "greedy"],
    "equipment": {
      "weaponId": "sword_iron",
      "armorId": "armor_chain"
    },
    "hireCost": 110,
    "dailyWage": 20,
    "visualTells": [
      "Well-worn chainmail with dents",
      "Coin purse prominently displayed",
      "Calculating eyes"
    ],
    "week": 1,
    "day": 1
  }
}
```

---

**Ready for MD → JSON conversion and immediate use in MVP!** 🎮
