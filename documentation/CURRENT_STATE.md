# 🎮 Tavern Guild Master - Current Implementation State
**Last Updated**: 2026-01-22

---

## 📁 Project Structure

```
Tavern Guild Master/
├── index.html              # Main game (159KB, includes inline UI code)
├── data/                   # Game content (JS)
├── src/                    # Core logic (JS)
├── documentation/          # Current docs
├── _archive_original_design/  # Old design docs (reference only)
├── assets/                 # Images, backgrounds
├── Music/                  # Audio files
└── tools/                  # Dev utilities
```

---

## 🔌 Loaded Scripts (in order)

### Data Files (`/data/`)
| File | Purpose | Used By |
|------|---------|---------|
| `classes.js` | 8 classes with base stats, abilities | CharacterGenerator, QuestResolver |
| `traits.js` | 13 traits with effects | QuestResolver.getTraitModifiers |
| `quests.js` | Quest templates + chain quests | GameState.refreshDailyContent |
| `items.js` | Weapons, consumables | (TODO: equipment system) |
| `characters.js` | Pre-programmed adventurers | GameState.refreshDailyContent |
| `choice_events.js` | Reigns-style events | ChoiceEventSystem |
| `combat_pools.js` | Combat narrative words | NarrativeGenerator |
| `injuries.js` | Injury types/severity | QuestResolver.calculateConsequences |
| `adventurer_dialogue.js` | Hiring greetings | UI.renderDesk |

### Logic Files (`/src/`)
| File | Lines | Purpose |
|------|-------|---------|
| `core/GameState.js` | 836 | Game state, save/load, quest chains |
| `core/QuestResolver.js` | 589 | DnD-style quest outcomes |
| `events/ChoiceEventSystem.js` | ~200 | Reigns-style event handling |
| `narrative/NarrativeGenerator.js` | ~500 | Combat logs, travel events |
| `ui/QuestMap.js` | ~100 | Quest location mapping |
| `utils/ContentLoader.js` | ~50 | Data loading utilities |

---

## ✅ Implemented Features

### Core Game Loop
- [x] Map as central hub
- [x] Quest Board (flip cards)
- [x] Tavern (hiring queue)
- [x] Guild Hall (roster view)
- [x] **Daily Report button** (check quest results anytime)
- [x] **End Day** (blackout sleep transition)
- [x] Save/Load (localStorage)

### Quest System
- [x] Quest chains (prerequisite unlocking)
- [x] Clean quest copies (no template mutation)
- [x] Quest assignment (drag-drop)
- [x] Mid-quest choice events
- [x] Multi-outcome resolution (6 tiers)

### DnD-Style Mechanics (QuestResolver.js)
- [x] Stat-based success calculation
- [x] Class affinities (±% per quest type)
- [x] Trait effects (conditional bonuses)
- [x] Level advantage (±5% per level)
- [x] Morale effects
- [x] Injury penalties
- [x] Random variance (luck factor)

### Consequences
- [x] Injury system (minor → critical)
- [x] Death chance (rank-based)
- [x] Scar system
- [x] "Undying" trait saves from death
- [x] Wall of the Fallen (memorial)

### Narrative
- [x] Story generation per outcome tier
- [x] Combat log generation
- [x] Travel events (multi-day quests)
- [x] Special event rolls

---

## ⚠️ TODO / Partial

| Feature | Status | Notes |
|---------|--------|-------|
| Equipment System | ❌ TODO | Line 213 in QuestResolver |
| Faction Reputation | ❌ Not started | Town/Crown/Underworld |
| Hero Loyalty | 🟡 Partial | Morale exists, loyalty doesn't |
| Gifting System | ❌ Not started | In design docs |
| Biome Effects | ❌ Skipped | Location-based modifiers |

---

## 🎲 How Quest Resolution Works

```
calculateSuccessRate(hero, quest)
    │
    ├── Base: (heroStat / questRequirement) × 60%
    ├── + Level: (heroLevel - questLevel) × 5%
    ├── + Class: getClassModifier() (±0-55%)
    ├── + Traits: getTraitModifiers() (sum of all applicable)
    ├── + Morale: (morale - 50) × 0.2%
    ├── - Injury: -15% if injured
    └── ± Luck: random ±5%
    
    = Final success rate (clamped 5-95%)
```

**Roll determines tier:**
- Roll < 5% of success zone → LEGENDARY
- Roll < 20% of success zone → GREAT
- Roll < success rate → SUCCESS
- Roll < success + 50% → PARTIAL
- Roll < success + 85% → FAILURE
- Roll ≥ that → DISASTER

---

## 📖 Documentation Files

| File | Status | Notes |
|------|--------|-------|
| `CURRENT_STATE.md` | ✅ Current | This file |
| `GAME_ARCHITECTURE.md` | ⚠️ Outdated | Still says "0% done" |
| `ARCHITECTURE_SUMMARY.md` | ⚠️ May be outdated | Check against current |
| `QUICK_START_GUIDE.md` | ✅ Useful | Setup instructions |
| `UI_DESIGN_SPEC.md` | 🟡 Partial | May not match current UI |
| `VISUAL_STYLE_GUIDE.md` | ✅ Useful | Art direction |
| `NARRATIVE_SYSTEM_ASSESSMENT.md` | ⚠️ Check | Verify accuracy |
