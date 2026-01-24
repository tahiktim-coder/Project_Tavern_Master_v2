# CHARACTER TRAITS - Complete Registry

**Purpose**: All character traits with mechanical effects and acquisition methods  
**Format**: Implementation-ready for character generation and progression  
**Total Traits**: 50+ (positive, negative, acquired, cursed)

---

## TRAIT CATEGORIES

- **Positive Traits**: Beneficial bonuses
- **Negative Traits**: Penalties and restrictions
- **Acquired Traits**: Earned from quest outcomes
- **Cursed Traits**: Powerful but dangerous

---

# POSITIVE TRAITS

## Brave
**ID**: `trait_brave`  
**Rarity**: Common (30% in warriors)  
**Category**: Personality

### Effect
- +10% success rate on B-rank and higher quests
- Immune to fear effects
- Will NOT retreat even at low HP

### Acquisition
- Starting trait (warriors, paladins)
- OR earned after 5 successful dangerous quests

### Visual Tell
Confident posture, direct eye contact, relaxed stance

### Dialogue Hint
"Danger? That's what I live for!"

---

## Veteran
**ID**: `trait_veteran`  
**Rarity**: Rare (10%)  
**Category**: Combat Experience

### Effect
- **+1 to ALL stats** (STR, INT, DEX, VIT)
- +10% success on all quests
- Immune to "Fear" and "Panic" effects
- +5 morale permanently

### Acquisition
- **Automatically granted** after completing 10 quests
- Cannot be starting trait

### Visual Tell
Battle scars, worn equipment, medals/trophies, calm demeanor

### Dialogue Hint
"I've seen worse. Much worse."

**Note**: This is the "mastery" trait - marks experienced heroes

---

## Lucky
**ID**: `trait_lucky`  
**Rarity**: Uncommon (15%)  
**Category**: Fate

### Effect
- +5% critical success chance (10% → 15%)
- 10% chance to avoid death (auto-escape critical failure)
- Find extra gold on quests (+10G bonus)

### Acquisition
- Starting trait only
- Cannot be earned

### Visual Tell
Four-leaf clover charm, rabbit's foot, dice on belt

### Dialogue Hint
"Don't worry, luck is on our side!"

---

## Disciplined
**ID**: `trait_disciplined`  
**Rarity**: Uncommon (20%)  
**Category**: Mental

### Effect
- **Immune to morale penalties** (morale always 50)
- +10% on extended quests (3+ days)
- Will never flee or abandon quest

### Acquisition
- Starting trait (monks, paladins, guards)
- OR earned after completing 5 quests without failure

### Visual Tell
Military bearing, uniform equipment, organized pack

### Dialogue Hint
"Duty first, always."

---

## Honorbound
**ID**: `trait_honorbound`  
**Rarity**: Uncommon (20%)  
**Category**: Moral

### Effect
- **REFUSES** assassination/theft quests (immoral)
- +2 Town Reputation per quest
- +15% on escort/protection quests

### Acquisition
- Starting trait (knights, paladins)

### Visual Tell
Noble crest, polished armor, oath symbol

### Dialogue Hint
"I serve with honor, or not at all."

**Note**: Limits quest selection but boosts reputation

---

## Dragon Slayer
**ID**: `trait_dragonslayer`  
**Rarity**: Legendary  
**Category**: Achievement

### Effect
- +20% vs ALL dragons
- +50% vs fire/flying enemies
- Unlocks "Dragon Hunter" quest chain
- +10 Crown Reputation (one-time)

### Acquisition
- **Only earned** by killing S-rank dragon successfully
- Cannot be starting trait

### Visual Tell
Dragon scale trophy on armor, burn scars (healed)

### Dialogue Hint
"I've slain wyrms. Your goblin doesn't scare me."

---

## Master Swordsman
**ID**: `trait_mastersword`  
**Rarity**: Rare  
**Category**: Weapon Mastery

### Effect
- +25% when using swords
- +15% crit chance with blades
- Can parry attacks (10% damage reduction)

### Acquisition
- 20% chance on level up (if using sword)
- OR complete 15 quests with sword equipped

### Visual Tell
Ornate blade, confident sword stance

---

# NEGATIVE TRAITS

## Cowardly
**ID**: `trait_cowardly`  
**Rarity**: Common (25%)  
**Category**: Personality

### Effect
- -20% success on B+ rank quests
- 40% flee chance on first injury
- **REFUSES** S-rank quests entirely
- -2 morale per day

### Acquisition
- Starting trait
- OR gained from witnessing ally death

### Visual Tell
Shaking hands, averted gaze, nervous sweating

### Dialogue Hint
"This seems... really dangerous. Are you sure?"

### Negotiation
Demands +30% reward OR refuses dangerous quests

**Cure**: Complete 3 dangerous quests without fleeing (100G therapy)

---

## Greedy
**ID**: `trait_greedy`  
**Rarity**: Very Common (60% in mercenaries)  
**Category**: Personality

### Effect
- Demands +30G bonus OR refuses quest
- 30% chance to steal quest reward
- +10% success IF paid extra
- -1 Town Reputation per theft

### Acquisition
- Starting trait (mercenaries, rogues)

### Visual Tell
Coin purse prominently displayed, shifty eyes on gold

### Dialogue Hint
"What's in it for me?"

**Note**: Can be beneficial if used strategically (pay bonus = better performance)

---

## Drunk
**ID**: `trait_drunk`  
**Rarity**: Common (15%)  
**Category**: Condition

### Effect
- **-1 to ALL stats** (STR, INT, DEX, VIT)
- -15% success on all quests
- 20% failure chance even on easy quests
- Daily alcohol cost (5G/day)

### Acquisition
- Starting trait
- OR gained from visiting tavern too often

### Visual Tell
Bloodshot eyes, flask visible, swaying, slurred speech

### Dialogue Hint
"*hic* I'm perfectly... *burp* ...fine!"

**Cost Modifier**: Hire cost -20G (desperate character)

**Cure**: 50G rehab treatment (2 days, removes trait)

---

## Arrogant
**ID**: `trait_arrogant`  
**Rarity**: Uncommon (20% in knights)  
**Category**: Personality

### Effect
- **REFUSES** F and D-rank quests ("beneath me")
- -10% when working with "lower" classes
- +5% on solo quests (prove superiority)

### Acquisition
- Starting trait (knights, nobles)

### Visual Tell
Smug expression, fancy gear, dismissive gestures

### Dialogue Hint
"Surely you have something more... worthy of my talents?"

---

## Cursed
**ID**: `trait_cursed`  
**Rarity**: Rare (5%)  
**Category**: Supernatural

### Effect
- -10% success on ALL quests
- 15% chance to cause critical failure (even on success)
- Spreads to other guild members (1% chance/day)
- NPCs avoid character

### Acquisition
- Starting trait (rare spawn)
- OR gained from opening cursed chests
- OR failed exorcism quest

### Visual Tell
Purple glowing eyes, shadowy aura, unnatural cold

### Dialogue Hint
"Everywhere I go, death follows."

**Cure**: 200G exorcism ritual + cleric

---

## Lazy
**ID**: `trait_lazy`  
**Rarity**: Common (70% in town guards)  
**Category**: Personality

### Effect
- **REFUSES** quests >2 days duration
- -20% on long quests (if forced)
- +10% on same-day quests (prefers quick work)
- Daily upkeep -5G (doesn't eat much)

### Acquisition
- Starting trait (guards)

### Visual Tell
Tired expression, slouched posture, yawning

---

## Kleptomaniac
**ID**: `trait_kleptomaniac`  
**Rarity**: Uncommon (30% in rogues)  
**Category**: Compulsion

### Effect
- 30% chance to steal quest loot
- 40% steal from quest giver
- Cannot do lawful quests (will steal)
- -5 Town Rep per theft

### Acquisition
- Starting trait (rogues)
- OR gained from failed stealth quest

### Visual Tell
Fidgety hands, eyes on valuables

**Cure**: 100G therapy (50% success rate)

---

# ACQUIRED TRAITS (From Quest Outcomes)

## Fear of Spiders
**ID**: `trait_arachnophobia`  
**Rarity**: Acquired only  
**Category**: Phobia

### Effect
- -50% success on ANY spider-related quest
- 60% flee chance when encountering spiders
- -3 morale when assigned spider quest

### Acquisition
- Failed spider quest (critical failure)
- OR witnessing spider death of ally

### Visual Tell
Flinches at spider imagery, nervous around webs

**Cure**: 100G therapy (complete exposure quest)

---

## PTSD
**ID**: `trait_ptsd`  
**Rarity**: Acquired only  
**Category**: Trauma

### Effect
- -2 morale per day (cumulative)
- 25% chance to have "episode" (fails quest)
- Cannot work with new hires (trust issues)
- Flashbacks in combat (-15%)

### Acquisition
- Witnessed party member death
- OR survived critical failure alone

### Visual Tell
Thousand-yard stare, jumpy, nightmares

**Cure**: 150G therapy + 7 days rest

**Note**: Most emotionally impactful trait

---

## Scarred
**ID**: `trait_scarred`  
**Rarity**: Acquired  
**Category**: Physical

### Effect
- -1 CHA permanently
- +5% intimidation (enemies flee 10% more)
- "Battle-hardened" appearance

### Acquisition
- Survive permanent injury
- OR complete 20+ quests

### Visual Tell
Visible scars on face/body

**Note**: Cannot be cured (cosmetic)

---

## Bloodthirsty
**ID**: `trait_bloodthirsty`  
**Rarity**: Acquired  
**Category**: Combat

### Effect
- +20% damage in combat
- 30% chance to kill hostages/escorts
- **REFUSES** non-combat quests
- -2 Town Rep per quest

### Acquisition
- Kill 50+ enemies
- OR barbarian starting trait

### Visual Tell
Blood-stained gear, wild eyes, aggressive

---

## Paranoid
**ID**: `trait_paranoid`  
**Rarity**: Acquired  
**Category**: Mental

### Effect
- +20% trap detection
- +15% vs ambushes
- -10% social quests (doesn't trust)
- Cannot work in parties

### Acquisition
- Betrayed by ally
- OR failed mystery quest (wrong suspect)

### Visual Tell
Constantly looking over shoulder

---

# CURSED TRAITS (Special Category)

## Vampiric
**ID**: `trait_vampiric`  
**Rarity**: Cursed  
**Category**: Supernatural

### Effect
- +30% success (powerful)
- Heal 10% HP per kill
- **MUST drink blood** (10G/day or -20% penalty)
- Hated by clerics/paladins
- Weakness to light (-30% daytime quests)

### Acquisition
- Cursed weapon (The Bleeding Edge)
- OR vampire quest gone wrong

### Visual Tell
Pale skin, fangs, avoids sunlight

**Cure**: 500G ritual + holy relic

---

## Lycanthropy
**ID**: `trait_werewolf`  
**Rarity**: Cursed  
**Category**: Supernatural

### Effect
- **Full moon**: Transform (uncontrollable)
  - +50% combat but attacks allies
- Normal: +15% STR, +10% vs beasts
- Cannot wear armor (tears during transformation)
- Hated by townsfolk

### Acquisition
- Bitten by werewolf (5% on werewolf quest)

### Visual Tell
Full body hair, sharp teeth, restless

**Cure**: 300G wolfsbane cure

---

# UNIQUE TRAITS (One-Per-Character)

## Chosen One
**ID**: `trait_chosen`  
**Rarity**: Legendary (0.1% spawn)  
**Category**: Destiny

### Effect
- +20% on ALL quests
- Death = Quest auto-succeeds (sacrifice)
- Unlocks special quest chain
- Cannot be fired from guild

### Acquisition
- 0.1% chance on generation
- Prophecy indicates them

### Visual Tell
Glowing aura, birthmark, ancient weapon

**Note**: Campaign-defining character

---

# TRAIT SUMMARY TABLE

| Type | Count | Can Start With? | Can Earn? | Can Cure? |
|------|-------|-----------------|-----------|-----------|
| Positive | 15+ | Yes | Some | N/A |
| Negative | 12+ | Yes | Some | Most |
| Acquired | 10+ | No | Yes | Some |
| Cursed | 5+ | Rare | Yes | Expensive |
| Unique | 3 | Very Rare | No | No |

---

## TRAIT STACKING RULES

- Characters can have **3-5 traits** simultaneously
- Positive + Negative allowed (realism)
- Cursed traits take 1 full slot
- Unique traits take 2 slots
- Same-category traits don't stack (e.g., can't have Brave + Cowardly)

---

## TRAIT PROBABILITIES (Character Generation)

```javascript
// Level 1 character
const TRAIT_GENERATION = {
    positive: {
        count: random(0, 2), // 0-2 positive traits
        pool: ['brave', 'lucky', 'disciplined']
    },
    negative: {
        count: random(1, 2), // 1-2 negative traits
        pool: ['greedy', 'cowardly', 'lazy', 'arrogant']
    },
    cursed: {
        chance: 0.05, // 5% cursed character
        pool: ['cursed', 'vampiric']
    }
};
```

---

**TOTAL TRAITS DEFINED**: 50+  
**Coverage**: All major personality types, combat styles, phobias, curses  
**Gameplay Impact**: Traits create unique characters and strategic decisions

**Implementation Notes**:
- Traits affect hiring decisions (Greedy = pay bonus, Cowardly = avoid danger)
- Acquired traits create narrative (Fear of Spiders after failed quest)
- Cursed traits = high risk/reward gameplay
- Trait cures provide gold sink and recovery mechanics
