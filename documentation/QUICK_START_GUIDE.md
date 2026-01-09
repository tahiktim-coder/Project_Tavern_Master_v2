# 🚀 Quick Start Guide - What to Build Next

**Date**: 2026-01-08  
**For**: Tavern Guild Master Development Team  
**Read Time**: 5 minutes

---

## 📍 WHERE ARE WE NOW?

### ✅ What's Been Completed
- **Game Design**: 100% complete
- **Content Database**: ~5000 lines of implementation-ready data
  - 13 character classes fully defined
  - 50+ traits with gameplay effects
  - 18 quests across all difficulty ranks
  - Complete combat/quest resolution formula
  - 7 special morning visitor events
  - Full economy and pricing system

### ❌ What's Missing
- **Everything else** — No code has been written yet
- This is a **content-first, code-second** project
- All the game design is done, now we need to build it

---

## 🎯 YOUR NEXT 3 STEPS

### Step 1: Build the MD → JSON Parser (Day 1)
**Goal**: Convert all markdown content files to JSON

**Location**: `Initial project outline/` folder  
**Output**: `data/` folder with JSON files

**What to do**:
```bash
# Create a Node.js script
# File: tools/md-to-json.js

# It should:
# 1. Read all .md files from "Initial project outline/"
# 2. Parse the structured data (tables, lists, code blocks)
# 3. Convert to JSON objects with IDs
# 4. Validate cross-references (e.g., quest requires "fire_immunity_potion" → check items.json)
# 5. Output to data/ folder

# Example output: data/classes.json
{
  "knight": {
    "id": "class_knight",
    "category": "martial",
    "baseStats": { "str": 8, "int": 3, "dex": 3, "vit": 7 },
    "specialties": [...],
    "hireCost": { "level1": 100, "level4": 150 }
  }
}
```

**Test**: Load `data/classes.json` and verify all 13 classes are present

---

### Step 2: Build GameState Manager (Day 2)
**Goal**: Create the core data structure for runtime game state

**Reference**: See `DEVELOPER_HANDOVER_GUIDE.md` section 2 for exact data models

**What to do**:
```javascript
// File: src/core/GameState.js

class GameState {
    constructor() {
        this.currentDay = 1;
        this.gold = 350;
        this.reputation = { town: 0, crown: 0 };
        this.roster = [];          // Hired adventurers
        this.questBoard = [];      // Available quests
        this.townPool = [];        // Unhired adventurers
        this.activeQuests = [];    // In-progress quests
    }
    
    save() {
        // Save to LocalStorage
    }
    
    load() {
        // Load from LocalStorage
    }
    
    advanceDay() {
        this.currentDay++;
        // Pay salaries, refresh quests, etc.
    }
}
```

**Test**: Create instance, add gold, save, reload page, verify gold persists

---

### Step 3: Build Character Generator (Day 3)
**Goal**: Generate random adventurers using class/trait data

**Dependencies**: `data/classes.json`, `data/traits.json`

**What to do**:
```javascript
// File: src/core/CharacterGenerator.js

function generateAdventurer(level, classId) {
    const classData = ContentDB.classes[classId];
    
    // 1. Generate base stats
    const stats = calculateStats(classData, level);
    
    // 2. Roll for starting traits
    const traits = rollTraits(classData.startingTraits);
    
    // 3. Calculate hire cost
    const cost = calculateHireCost(classData, level);
    
    // 4. Create adventurer object
    return {
        id: generateGUID(),
        name: "Placeholder Name", // Future: name generator
        classId: classId,
        level: level,
        baseStats: stats,
        traits: traits,
        status: 'idle',
        hireType: 'full_time',
        dailyWage: classData.dailySalary
    };
}
```

**Test**: Generate 10 knights, verify stats are in correct ranges, traits roll correctly

---

## 📅 WEEK 1 DETAILED PLAN

### Monday (Day 1)
- [ ] **AM**: Set up project structure (folders, package.json)
- [ ] **PM**: Build MD → JSON parser
- [ ] **EOD**: Verify all 8 content files converted to JSON

### Tuesday (Day 2)
- [ ] **AM**: Create GameState class
- [ ] **PM**: Implement save/load with LocalStorage
- [ ] **EOD**: Test state persistence

### Wednesday (Day 3)
- [ ] **AM**: Build CharacterGenerator
- [ ] **PM**: Build character pool manager
- [ ] **EOD**: Console test: generate 20 adventurers

### Thursday (Day 4)
- [ ] **AM**: Implement match formula (Part 1: base calculation)
- [ ] **PM**: Implement match formula (Part 2: all modifiers)
- [ ] **EOD**: Unit tests for match formula

### Friday (Day 5)
- [ ] **AM**: Integrate quest system with GameState
- [ ] **PM**: Build console-based game loop (no UI)
- [ ] **EOD**: **PLAYTEST** — Can you complete a quest via console?

**Friday Success Criteria**:
```javascript
// You should be able to run this in console:
const game = new GameState();
const char = generateAdventurer(1, 'knight');
game.hireAdventurer(char, 100); // Cost 100G
game.gold; // Should be 250G (started with 350)

const quest = game.questBoard[0]; // Pick first quest
const result = calculateQuestSuccess(char, quest);
console.log(result); // Show success rate and outcome

// ✅ If this works, Week 1 is a SUCCESS
```

---

## 🗂️ RECOMMENDED PROJECT STRUCTURE

```
tavern-guild-master/
│
├── Initial project outline/      ← [SOURCE] Content files
│   ├── characters/
│   ├── quests/
│   ├── items/
│   └── ...
│
├── data/                          ← [GENERATED] JSON files
│   ├── classes.json
│   ├── traits.json
│   ├── quests.json
│   └── ...
│
├── src/
│   ├── core/                      ← Game logic (NO UI)
│   │   ├── GameState.js
│   │   ├── CharacterGenerator.js
│   │   ├── MatchFormula.js
│   │   ├── EconomyManager.js
│   │   └── ContentLoader.js
│   │
│   ├── ui/                        ← UI components (Week 2)
│   │   ├── Dashboard.js
│   │   ├── QuestBoard.js
│   │   ├── Desk.js
│   │   └── Roster.js
│   │
│   └── events/                    ← Event system (Week 3)
│       └── MorningVisitors.js
│
├── tools/
│   └── md-to-json.js              ← Build script
│
├── tests/                         ← Unit tests
│   └── match-formula.test.js
│
├── index.html                     ← Main entry point
├── styles.css
├── main.js
└── package.json
```

---

## ⚠️ CRITICAL RULES

### DO's ✅
1. **Build from bottom-up**: Data → Logic → UI
2. **Test each system in isolation** before connecting
3. **Use exact formulas** from `match_formula.md` (don't simplify)
4. **Follow data models** from `DEVELOPER_HANDOVER_GUIDE.md`
5. **Keep content separate from code** (edit JSON, not JS)

### DON'Ts ❌
1. **DON'T build UI first** — you'll regret it
2. **DON'T change the match formula** without playtesting
3. **DON'T hard-code content** — everything should load from JSON
4. **DON'T skip testing** — bugs compound quickly
5. **DON'T add features** not in the roadmap (scope creep!)

---

## 🧪 HOW TO KNOW YOU'RE ON TRACK

### Week 1 Success Metrics
- [ ] All content converted to valid JSON
- [ ] Character generator produces correct stats
- [ ] Match formula passes all unit tests
- [ ] Can run a quest simulation in console
- [ ] Save/load works (refresh page, state persists)

### Week 2 Success Metrics (UI Phase)
- [ ] Can see quest board on screen
- [ ] Can click to hire an adventurer
- [ ] Can assign adventurer to quest
- [ ] Quest result displays with outcome
- [ ] "End Day" button advances time

### Week 3 Success Metrics (Polish)
- [ ] Morning visitor events trigger randomly
- [ ] Equipment bonuses work correctly
- [ ] Injuries affect future quest performance
- [ ] Economy forces tough resource choices
- [ ] Game feels balanced and fun

---

## 📚 MOST IMPORTANT FILES TO READ

### Before You Start Coding
1. **[DEVELOPER_HANDOVER_GUIDE.md](file:///c:/Users/farha/Anti%20PROJECTS/Tavern%20Guild%20Master/Initial%20project%20outline/DEVELOPER_HANDOVER_GUIDE.md)**  
   → Data structures, implementation warnings, phase breakdown

2. **[mechanics/match_formula.md](file:///c:/Users/farha/Anti%20PROJECTS/Tavern%20Guild%20Master/Initial%20project%20outline/mechanics/match_formula.md)**  
   → Complete quest resolution algorithm (this is the heart of the game)

3. **[GAME_ARCHITECTURE.md](file:///c:/Users/farha/Anti%20PROJECTS/Tavern%20Guild%20Master/GAME_ARCHITECTURE.md)**  
   → System dependencies, roadmap, what to build when

### When Implementing Features
- **Characters**: `characters/classes.md`, `characters/traits.md`
- **Quests**: `quests/quest_registry.md`
- **Items**: `items/weapons.md`, `items/armors.md`
- **Events**: `events/morning_visitors.md`

---

## 🎮 WHAT THE GAMEPLAY SHOULD FEEL LIKE

### Core Loop (Repeat Daily)
1. **Morning** → Random visitor event (20% chance)
   - Example: Widow asks you to find her husband (moral choice)
   - Choice matters: Refuse = -2 Rep, Accept = unlock quest

2. **Town Hall** → Browse quest board
   - Filter by rank (F, D, C, B, A, S)
   - See requirements: "STR 6+, Fire Immunity recommended"

3. **Desk** → Hire adventurers
   - See visual tells: "Nervous eyes, ragged cloak" → Probably a rogue
   - Traits matter: "Greedy" → Demands +30G or refuses

4. **Roster** → Equip and assign
   - Drag "Fire Immunity Potion" to Knight
   - Assign Knight to "Dragon Quest"
   - See success rate: **72% (STR match + Fire Immunity bonus)**

5. **Send on Quest** → Resolve
   - Roll dice: **Success!**
   - Rewards: +150G, +50 XP
   - Knight returns injured (broken arm, -20% STR for 5 days)

6. **Night** → Pay salaries
   - You have 3 full-time adventurers @ 20G/day = -60G
   - Net profit today: +90G
   - Advance to Day 2

### Player Decisions That Matter
- **Who to hire**: Expensive knight or cheap town guard?
- **Risk management**: Send injured adventurer on easy quest or let them rest?
- **Resource allocation**: Buy equipment or save for better adventurers?
- **Reputation**: Take shady quests for gold, or maintain honor?

---

## 🏆 DEFINITION OF "DONE" (MVP)

The game is **minimally playable** when:
- ✅ I can start a new game
- ✅ I can hire adventurers with different classes
- ✅ I can see a quest board with various quests
- ✅ I can assign adventurers to quests
- ✅ Quest outcomes make sense (bonuses/penalties work)
- ✅ I can progress through multiple days
- ✅ I can save and reload my game
- ✅ I feel like I'm making meaningful decisions

**TIME ESTIMATE**: 3-4 weeks for one developer working full-time

---

## 🆘 WHEN YOU GET STUCK

### Technical Questions
- Re-read `DEVELOPER_HANDOVER_GUIDE.md` Section 2 (data models)
- Check `match_formula.md` for calculation examples
- Look at `GAME_ARCHITECTURE.md` for system dependencies

### Design Questions
- Review content files for examples and edge cases
- Check `CONTENT_SUMMARY.md` for coverage stats
- Playtest and adjust numbers in JSON (not code)

### Scope Questions
- Refer to `GAME_ARCHITECTURE.md` → "What Can Wait" section
- **When in doubt, defer to post-MVP**
- Better to ship a tight core loop than a bloated mess

---

## 🎯 YOUR ACTUAL TO-DO (Copy This Somewhere)

```markdown
# Week 1: Foundation
[ ] Day 1: Build MD → JSON parser
[ ] Day 2: Create GameState class
[ ] Day 3: Character generator
[ ] Day 4: Match formula implementation
[ ] Day 5: Console-based game loop

# Week 2: Minimal UI
[ ] Day 6-7: Dashboard + Quest Board
[ ] Day 8-9: Desk (hiring) + Roster (viewing)
[ ] Day 10: Quest assignment UI
[ ] Day 11-12: Quest resolution display

# Week 3: Core Features
[ ] Day 13-14: Equipment system
[ ] Day 15-16: Morning visitor events
[ ] Day 17-18: Injury/progression systems

# Week 4: Polish
[ ] Day 19-20: Balance testing
[ ] Day 21: Bug fixes
```

---

**Good luck, and remember**: The hard part (game design) is DONE. Now it's just turning data into code! 🚀

**Questions?** See the architecture docs or ask the design team.
