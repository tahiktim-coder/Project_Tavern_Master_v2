# 🏗️ SENIOR DEVELOPER HANDOVER GUIDE

**Date**: 2026-01-09
**Status**: APPROVED FOR HANDOVER ✅
**Package**: `latestgamedecisions/`

---

## 1. SENIOR ARCHITECTURE REVIEW

### 🟢 Strengths
- **Data-Driven Design**: Separating content (MD files) from logic is excellent. It allows balancing the game by editing text files without touching code.
- **Formulas Defined**: The `match_formula.md` is mathematically sound and ready for a unit test.
- **Economy Bounds**: `pricing.md` prevents the "infinite money" or "instant bankruptcy" loops effectively.

### ⚠️ Implementation Warnings
- **Reference Integrity**: The parser MUST validate that every `quest.enemy.type` matches a defined logic. (e.g., if a formatted MD file says `type: dragon`, the code must handle `dragon`).
- **State Complexity**: The "Morning Visitor" -> "Town Hall" -> "Desk" loop has complex state transitions. Use a strong State Machine (XState or Redux-like pattern).

---

## 2. CORE DATA MODELS (The "Values" You Need)

You need to define these structures *before* writing any UI.

### A. The Global `GameState`
```javascript
{
  // Meta
  "saveSlotId": "guid-1234",
  "version": "0.1.0",
  
  // Time & Progression
  "currentDay": 1,         // Starts at 1. Increments on sleep.
  "weekNumber": 1,         // Math.floor(day / 7) + 1
  "isDaytime": true,       // Toggles Morning -> Night

  // Economy & Resources
  "gold": 350,             // Current cash (Integer)
  "reputation": {
    "town": 0,             // -100 to +100
    "crown": 0             // -100 to +100
  },
  
  // Guild Upgrades
  "maxRosterSlots": 2,     // Starts at 2. Upgradable to 3, 4...
  "upgrades": ["charter"], // List of unlocked IDs e.g. ["barracks_1"]

  // Active Pointers
  "roster": [],            // Array of Adventurer Objects
  "questBoard": [],        // Array of Available Quest Objects
  "townPool": [],          // Weekly pool of ~15 UnhiredAdventurers
  "activeQuests": [],      // Quests currently in progress (assigned)
  
  // Morning Visitor State
  "visitorQueue": [],      // Who constitutes the 'desk queue' today
  "visitorProcessed": false // Have we finished the morning event?
}
```

### B. The `Adventurer` Object
```javascript
{
  "id": "char_ab12",       // Unique GUID generated on spawn
  "name": "Marcus",
  "classId": "mercenary",  // Links to classes.md
  "level": 1,
  "xp": 0,                 // 0/100 to next level
  
  // Dynamic Stats (Base + Modifiers calculated at runtime)
  "baseStats": { "str": 7, "int": 4, "dex": 5, "vit": 8 },
  
  // Status
  "status": "idle",        // 'idle', 'questing', 'injured', 'dead'
  "injuries": [],          // Array of injury objects
  "morale": 50,            // 0-100
  
  // Economy
  "hireType": "full_time", // 'full_time' or 'freelance'
  "dailyWage": 10,         // if full_time
  "freelanceCut": 0.0,     // if freelance (e.g. 0.4 for 40%)

  // Inventory
  "giftedItem": null       // One slot for the "Trinket/Consumable"
}
```

### C. The `Quest` Object
```javascript
{
  "id": "quest_rats_101",
  "templateId": "rats_cellar", // Links to quest_registry.md
  "expiryDay": 3,              // If currentDay > expiryDay, fail
  "assignedTo": ["char_ab12"], // Character ID(s)
  "twistRevealed": false       // Set true if Bard revealed it
}
```

---

## 3. IMPLEMENTATION ROADMAP (Where to Start)

**Don't build the UI first.** Build the engine logic.

### Phase 1: The "Parser" & "Store" (Days 1-2)
1.  **Markdown Parser**: Write a script (Regex/JSON) to load all `.md` files in `latestgamedecisions` into memory at startup.
    -   *Goal*: `ContentDB.classes['knight']` returns the Knight object.
2.  **State Manager**: Create the `GameState` object and basic actions:
    -   `addGold(amount)`
    -   `advanceDay()`
    -   `hireAdventurer(adventurer)`
3.  **Generator**: Write `generateAdventurer()` using the loaded Class/Trait lists.

### Phase 2: The Core Loop (Days 3-4)
1.  **Town Hall Logic**:
    -   Write `refreshQuestBoard()`: Pulls random quests based on Rank.
2.  **Desk Logic**:
    -   Write `generateDailyQueue()`: Pick 3-6 randoms from `townPool`.
3.  **Mission Logic**:
    -   Implement the `calculateSuccess()` function from `match_formula.md` EXACTLY.
    -   *Test*: Run it in console with dummy data.

### Phase 3: The UI (Days 5+)
1.  ** Dashboard**: Show Gold, Day, Rep.
2.  ** Roster View**: List hired heroes. Drag-and-drop items.
3.  ** Quest Board**: Click to claim.
4.  ** Modal System**: For "Morning Visitors" (essential for the event system).

---

## 4. WHAT TO "MOCK" FOR NOW (Wait for V2)
*Don't overengineer these yet:*

1.  **XP Curves**: Just make it `100 XP * Level` for now.
2.  **Complex Save System**: Just save to local storage or memory.
3.  **Advanced Animations**: Just use text logs. "Quest Failed" > "Quest Failed (Swords clashing visual)".
4.  **Inventory Management**: Just have an infinite "Guild Chest" for now. Don't limit grid slots.

---

## 5. FINAL CHECKLIST
- [ ] Do you have the `latestgamedecisions` folder?
- [ ] Do you have a way to read files? (Node.js `fs` or equivalent)?
- [ ] Is your random number generator seeded? (Optional, but good for debug).

**VERDICT**: This package is **COMPLETE**. You may copy `latestgamedecisions` to your codebase and execute Phase 1.
