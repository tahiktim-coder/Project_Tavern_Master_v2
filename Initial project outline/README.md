# LATESTGAMEDECISIONS - Game Content Database

**Purpose**: Implementation-ready game content files  
**Format**: Markdown with structured data examples  
**Status**: 🟡 In Progress (Structure created, content pending)

---

## FOLDER STRUCTURE

```
latestgamedecisions/
├── characters/       - All character-related data (classes, traits, names)
├── quests/           - Quest definitions and chains  
├── locations/        - World biomes, environments, hazards
├── items/            - Equipment (weapons, armor, consumables, magical)
├── mechanics/        - Core systems (match formula, personalities, inspection)
├── events/           - Special events (visitors, Crown messenger)
└── economy/          - Pricing, progression, guild upgrades
```

---

## FILES TO CREATE

### 📁 characters/
- `classes.md` - All 20+ character classes with stats/growth/specialties
- `traits.md` - All 50+ traits (positive, negative, acquired)
- `name_generator.md` - Name pools by race/gender (1000+ names)

### 📁 quests/
- `quest_registry.md` - All quest definitions (70+ quests across F-S ranks)
- `quest_modifiers.md` - Environmental/conditional success modifiers
- `quest_chains.md` - Multi-quest storylines (optional, post-MVP)

### 📁 locations/
- `biomes.md` - World locations (forest, swamp, mountain, volcano, etc.)
- `environments.md` - Environmental effects (weather, time of day)
- `hazards.md` - Natural hazards (drowning, lava, disease)

### 📁 items/
- `weapons.md` - All weapons (15+ types with stats/effects)
- `armors.md` - All armor types (8+ with protection/penalties)
- `consumables.md` - Potions, charms, utilities (10+ items)
- `magical_items.md` - Rare/unique items (post-MVP)

### 📁 mechanics/
- `match_formula.md` - Complete quest success calculation algorithm
- `personalities.md` - NPC behavior patterns and dialogue
- `inspection_system.md` - Visual tells and interrogation rules
- `injury_tables.md` - Injury types, probabilities, healing

### 📁 events/
- `morning_visitors.md` - All 7 special visitor events
- `crown_events.md` - Royal messenger and quota events
- `random_events.md` - World events (festivals, disasters) - optional

### 📁 economy/
- `pricing.md` - All costs and rewards (scaling formulas)
- `progression.md` - Guild upgrades, reputation tiers

---

## USAGE WORKFLOW

1. **Content Creation** → Write MD files with complete structured data
2. **Review** → User reviews for balance/flavor
3. **Parsing** → Build MD → JSON converter script
4. **Integration** → Import JSON into game engine
5. **Balancing** → Adjust through playtesting

---

## CONTENT STANDARDS

### Each File Should Include:
✅ Complete data (no placeholders or "TBD")  
✅ Structured format (consistent headings, tables)  
✅ Examples for each major category  
✅ Cross-references (e.g., "Quest requires Fire Immunity Potion - see items/consumables.md")  
✅ Flavor text (descriptions, dialogue snippets)

### Quality Checklist:
- [ ] No duplicate IDs
- [ ] All stat values validated (1-10 scale)
- [ ] Percentages sum to 100% where needed
- [ ] All referenced items/traits exist in other files
- [ ] Balanced rewards (higher risk = higher reward)

---

## PRIORITY ORDER (MVP Focus)

**WEEK 1-2**: Core Content
1. `characters/classes.md` (20 classes minimum)
2. `characters/traits.md` (30 traits minimum)
3. `quests/quest_registry.md` (40 quests: 10 per F/D/C/B rank, 5 A-rank, 5 S-rank)
4. `locations/biomes.md` (6 biomes: forest, swamp, mountain, desert, crypt, ocean)

**WEEK 3**: Systems \u0026 Items
5. `mechanics/match_formula.md` (complete algorithm)
6. `items/weapons.md` (10 weapons)
7. `items/armors.md` (5 armor types)
8. `items/consumables.md` (5 consumables)

**WEEK 4**: Events \u0026 Polish
9. `events/morning_visitors.md` (5 visitors minimum)
10. `economy/pricing.md` (cost/reward tables)
11. Fill gaps, add flavor, cross-check references

---

## HOW TO USE THIS SYSTEM

**For Game Designers**:
- Start with one file at a time
- Use examples from `/folder_structure_plan.md` as templates
- Focus on gameplay feel, not technical implementation

**For Developers**:
- Parse MD files into JSON at build time
- Validate all references (e.g., quest requires "silver_sword", check it exists)
- Use IDs for cross-referencing (never hard-code names)

**For AI Assistants**:
- Follow structure in `folder_structure_plan.md`
- Ensure complete entries (no TODO comments)
- Make content rich and flavorful, not dry database entries

---

## NEXT STEPS

1. Review `folder_structure_plan.md` (in artifacts) for detailed file structure examples
2. Start with `characters/classes.md` (foundational content)
3. Build incrementally, one file at a time
4. Test integration early (don't wait for all files to be done)

**Estimated Total Content**: ~5000 lines across 15 files  
**Estimated Time**: 2-3 weeks for MVP content  
**Current Status**: Folder structure created ✅, content files pending 🟡

---

**See also**: 
- `/docs/GAME_BLUEPRINT.md` - Overall game systems reference
- `/docs/MASTER_GAME_DESIGN.md` - Latest mechanics and decisions
- `C:/Users/farha/.gemini/antigravity/brain/.../folder_structure_plan.md` - Detailed file templates
