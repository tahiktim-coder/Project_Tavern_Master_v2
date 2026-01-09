# 🎨 UI/UX SPECIFICATION - Complete Interface Design

**Purpose**: Pixel-perfect UI specification for implementation  
**Covers**: All screens, interactions, animations, and user flows

---

## SCREEN MAP (Navigation Flow)

```
GAME START
    ↓
[MORNING PHASE]
    ↓
Morning Visitor Event? → [VISITOR MODAL] → Continue
    ↓
[TOWN HALL SCREEN] (Quest Claiming)
    ↓
[TRANSITION: Walking Back]
    ↓
[GUILD HALL - DESK VIEW] (Adventurer Queue)
    ↓
[GUILD HALL - ROSTER VIEW] (Quest Assignment)
    ↓
[CONFIRM & SEND] 
    ↓
[EVENING REPORT] (Quest Results)
    ↓
[LEDGER SCREEN] (Daily Summary)
    ↓
Sleep → Next Day → Loop to MORNING PHASE
```

---

# DETAILED SCREEN SPECIFICATIONS

## 1. MORNING VISITOR MODAL 🌅

### Trigger
- 20-40% chance OR scripted events
- Appears BEFORE Town Hall
- **Blocks** all other actions (modal overlay)

### Layout
```
┌─────────────────────────────────────────┐
│  ╔═════════════════════════════════════╗│
│  ║ [PORTRAIT: 300x400px left side]    ║│
│  ║                                     ║│
│  ║  Right Side:                        ║│
│  ║  ┌───────────────────────────────┐  ║│
│  ║  │ Visitor Name (Large)          │  ║│
│  ║  │ "Royal Guard"                 │  ║│
│  ║  └───────────────────────────────┘  ║│
│  ║                                     ║│
│  ║  [DIALOGUE BOX - wrapped text]      ║│
│  ║  "The Captain sent me..."           ║│
│  ║                                     ║│
│  ║  CHOICES:                           ║│
│  ║  [Button A] Pay Bribe (20G)         ║│
│  ║  [Button B] Refuse                  ║│
│  ╚═════════════════════════════════════╝│
└─────────────────────────────────────────┘
```

### Interactions
1. **Portraits**: Static illustrations (or placeholder colored rectangles)
2. **Dialogue**: Typewriter effect (optional) or instant display
3. **Choice Buttons**: 
   - Hover: Highlight + show consequence tooltip
   - Click: Apply immediate effect → Close modal → Continue to Town Hall

### Visual Cues
- **Gold Cost**: Show in RED if you can't afford
- **Reputation Impact**: Small icon (+Crown, -Town, etc.)

---

## 2. TOWN HALL SCREEN 🏛️

### Description
You're standing before the **Quest Board** (a cork board with parchment quests pinned).

### Layout
```
┌──────────────────────────────────────────────────┐
│ [HEADER BAR]                                     │
│ Day 1 │ 350G │ Town Rep: 0 │ Crown Rep: 0       │
├──────────────────────────────────────────────────┤
│                                                  │
│  QUEST BOARD (Grid Layout 3x4)                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                │
│  │Quest│ │Quest│ │Quest│ │Quest│                │
│  │ F   │ │ D   │ │ F   │ │ C   │                │
│  │Rats │ │Gobln│ │Herb │ │Bandt│                │
│  │     │ │     │ │     │ │     │                │
│  │25G  │ │70G  │ │20G  │ │120G │                │
│  └─────┘ └─────┘ └─────┘ └─────┘                │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                │
│  │     │ │     │ │     │ │     │                │
│  └─────┘ └─────┘ └─────┘ └─────┘                │
│                                                  │
│  [Bottom Bar]                                    │
│  Claimed: 0/2  [RETURN TO GUILD] button          │
└──────────────────────────────────────────────────┘
```

### Quest Card (Unopened)
```
┌─────────────────┐
│  [RANK BADGE]   │  ← "F", "D", "C" colored circle
│                 │
│  Quest Name     │
│  "Rats!"        │
│                 │
│  Reward: 25G    │
│                 │
│  [UNCLAIMED]    │  ← Gray state
└─────────────────┘
```

### Interactions

#### Hover Over Quest Card
- **Effect**: Card lifts slightly (CSS transform: translateY(-5px))
- **Cursor**: Changes to pointer

#### Click Quest Card → **FLIP ANIMATION**
The card **rotates 180° on Y-axis** revealing the back:

```
┌─────────────────────────────┐
│ BACK SIDE (Detailed View)   │
├─────────────────────────────┤
│ Quest: Rats in Cellar       │
│ Rank: F                     │
│ Reward: 25G, 10 XP          │
│                             │
│ Requirements:               │
│ • STR 3+                    │
│ • Any class                 │
│                             │
│ Environment: Urban          │
│ Duration: Same-day          │
│ Expiration: 2 days          │
│                             │
│ Description:                │
│ "Tavern owner needs rats    │
│  cleared from storage."     │
│                             │
│ [CLAIM QUEST] button        │
│ [BACK] button               │
└─────────────────────────────┘
```

#### Click "CLAIM QUEST"
- **Effect**: Card border turns **GOLD** (claimed state)
- **Counter**: "Claimed: 1/2" updates
- **Limit Check**: If at max claims (2), other cards become grayed/disabled

#### Click "BACK"
- **Effect**: Card flips back to front

#### Click "RETURN TO GUILD"
- **Validation**: Must have claimed at least 1 quest
- **Transition**: Screen fades → Walking animation (optional) → Guild Hall loads

---

## 3. GUILD HALL - DESK VIEW (Adventurer Queue) 🏠

### Description
You're behind your desk. Adventurers are waiting in a **queue** outside your door.

### Layout
```
┌────────────────────────────────────────────────────────┐
│ [HEADER BAR - Same as before]                          │
├────────────────────────────────────────────────────────┤
│                                                        │
│  YOUR DESK (Center)                                    │
│  ┌──────────────────────────┐                          │
│  │  [Active Adventurer Card]│  ← Currently viewing     │
│  │                          │                          │
│  │  (See Card spec below)   │                          │
│  │                          │                          │
│  │  [HIRE] [REJECT] buttons │                          │
│  └──────────────────────────┘                          │
│                                                        │
│  QUEUE INDICATOR (Bottom)                              │
│  Waiting: 4 adventurers                                │
│  [●][○][○][○] ← Dots showing position                  │
│                                                        │
│  [SKIP TO ROSTER] button (if done hiring)              │
└────────────────────────────────────────────────────────┘
```

### Adventurer Card (On Desk)

```
┌───────────────────────────────────────────┐
│ ┌─────────┐        MARCUS THE MERCENARY   │
│ │PORTRAIT │        Level 2                │
│ │ 150x200 │                               │
│ │  (Art)  │        ★★☆☆☆ (XP Progress)    │
│ └─────────┘                               │
│                                           │
│  CLASS: Mercenary                         │
│  TRAITS: Greedy, Pragmatic               │
│                                           │
│  ┌──────────────────────────┐             │
│  │ STATS                    │             │
│  │ STR: ████████░░ 8        │             │
│  │ INT: ████░░░░░░ 4        │             │
│  │ DEX: █████░░░░░ 5        │             │
│  │ VIT: ████████░░ 8        │             │
│  └──────────────────────────┘             │
│                                           │
│  HIRE COST:                               │
│  ┌──────────────┬──────────────┐          │
│  │ FULL-TIME    │ FREELANCE    │          │
│  │ 100G upfront │ 40G + 50%    │          │
│  │ 10G/day wage │ quest reward │          │
│  └──────────────┴──────────────┘          │
│                                           │
│  [HIRE FULL-TIME] [HIRE FREELANCE]        │
│  [REJECT]                                 │
└───────────────────────────────────────────┘
```

### Interactions

#### Click "HIRE FULL-TIME"
- **Validation**: Check if roster has empty slot (Max 2 initially)
- **Validation**: Check if gold >= 100G
- **Effect**: 
  - Gold deducted
  - Card **slides left** off-screen
  - Next adventurer **slides in from right**
  - Counter updates: "Waiting: 3 adventurers"
- **State**: Marcus added to `roster` array

#### Click "HIRE FREELANCE"
- **Validation**: Check gold >= 40G
- **Effect**: Same slide animation
- **State**: Marcus added to temporary freelancer list (doesn't take roster slot)

#### Click "REJECT"
- **Effect**: 
  - Card **slides down** and fades
  - Next adventurer slides in
  - Marcus returned to `townPool` (can reappear later in week)

#### All Adventurers Processed
- **Auto-Enable**: "SKIP TO ROSTER" button becomes highlighted
- **Click**: Transition to Roster View

---

## 4. GUILD HALL - ROSTER VIEW (Quest Assignment) 📋

### Description
You see your **hired roster** on the left, and your **claimed quests** on the right. This is where you **drag-and-drop** assignments.

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER BAR]                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LEFT: ROSTER                   RIGHT: CLAIMED QUESTS       │
│  ┌─────────────────┐            ┌─────────────────┐         │
│  │ 🗡️ MARCUS       │            │ 📜 Rats Quest   │         │
│  │ Mercenary Lvl2  │            │ F-Rank          │         │
│  │ Status: IDLE    │            │ Reward: 25G     │         │
│  │                 │            │                 │         │
│  │ [DRAG ME]       │            │ [DROP HERE]     │         │
│  └─────────────────┘            └─────────────────┘         │
│                                                             │
│  ┌─────────────────┐            ┌─────────────────┐         │
│  │ 🧙 ELARA        │            │ 📜 Goblin Quest │         │
│  │ Mage Lvl 1      │            │ D-Rank          │         │
│  │ Status: IDLE    │            │ Reward: 70G     │         │
│  │                 │            │                 │         │
│  │ [DRAG ME]       │            │ [UNASSIGNED]    │         │
│  └─────────────────┘            └─────────────────┘         │
│                                                             │
│  BOTTOM: GUILD INVENTORY (Items)                            │
│  ┌─────┐ ┌─────┐ ┌─────┐                                   │
│  │🐰   │ │🗡️   │ │🧪   │  ← Trinkets/Consumables          │
│  │Foot │ │Oil  │ │Potion│                                  │
│  └─────┘ └─────┘ └─────┘                                   │
│                                                             │
│  [SEND ON QUESTS] button                                    │
└─────────────────────────────────────────────────────────────┘
```

### Drag-and-Drop Interactions

#### 1. Drag Adventurer to Quest
- **Visual**: Adventurer card becomes semi-transparent
- **Drop Zone**: Quest card highlights with green border
- **On Drop**:
  - Quest card shows **portrait + name** of assigned hero
  - Success % calculated and displayed: "Est. Success: 82%"
  - Quest card turns **BLUE** (assigned state)

#### 2. Drag Item to Adventurer
- **Visual**: Item icon follows cursor
- **Drop Zone**: Adventurer card lights up
- **On Drop**:
  - Item appears as small icon on adventurer card
  - Success % recalculates: "Est. Success: 82% → 95%"
  - Item removed from inventory (if consumable)

#### 3. Click Assigned Quest Card
- **Opens Detail Modal**:
```
┌──────────────────────────────────────┐
│ QUEST ASSIGNMENT DETAILS             │
├──────────────────────────────────────┤
│ Quest: Rats in Cellar (F-Rank)       │
│                                      │
│ Assigned to:                         │
│ [Portrait] Marcus (Mercenary Lvl 2)  │
│                                      │
│ SUCCESS CALCULATION:                 │
│ Base:     70% (STR 8 vs Req 3)       │
│ Class:    +0% (Neutral match)        │
│ Traits:   +0%                        │
│ Item:     +10% (Gifted Rabbit Foot)  │
│ ────────────────────                 │
│ FINAL:    80% Success                │
│                                      │
│ Risks:                               │
│ - 15% Failure (Minor Injury)         │
│ - 5% Critical Failure (Major Injury) │
│                                      │
│ [UNASSIGN] [CLOSE]                   │
└──────────────────────────────────────┘
```

#### Click "SEND ON QUESTS"
- **Validation**: All quests must be assigned OR explicitly abandoned
- **Confirmation Modal**: "Send 2 heroes on quests? This will advance to evening."
- **Effect**: Transition to Evening Report

---

## 5. EVENING REPORT (Quest Results) 🌙

### Description
The day ends. You receive **one report per quest** showing outcomes.

### Layout (Per Quest Report)
```
┌─────────────────────────────────────────────┐
│         ⭐ QUEST COMPLETE ⭐                 │
├─────────────────────────────────────────────┤
│                                             │
│  [Hero Portrait]     Marcus Returns!        │
│                                             │
│  Quest: Rats in Cellar                      │
│  Outcome: SUCCESS                           │
│                                             │
│  Rewards:                                   │
│  💰 +25 Gold                                │
│  ⭐ +10 XP                                  │
│  📦 Loot: [Rusty Dagger]                    │
│                                             │
│  Report:                                    │
│  "Marcus cleared the cellar efficiently.    │
│   The tavern owner was grateful."           │
│                                             │
│  [NEXT] button                              │
└─────────────────────────────────────────────┘
```

### For Failures
```
┌─────────────────────────────────────────────┐
│         ⚠️ QUEST FAILED ⚠️                  │
├─────────────────────────────────────────────┤
│                                             │
│  [Hero Portrait]     Elara Returns Injured  │
│                                             │
│  Quest: Library Ghost                       │
│  Outcome: FAILURE                           │
│                                             │
│  Injuries:                                  │
│  🩹 Minor Injury (1 day recovery)           │
│                                             │
│  Report:                                    │
│  "The 'ghost' was actually bandits!         │
│   Elara tried using magic but was           │
│   overwhelmed. She retreated safely."       │
│                                             │
│  [NEXT] button                              │
└─────────────────────────────────────────────┘
```

### Interactions
- **Sequential Display**: Reports appear ONE AT A TIME
- **Click "NEXT"**: Current report fades → Next report appears
- **After All Reports**: Button changes to "VIEW LEDGER"

---

## 6. LEDGER SCREEN (Daily Summary) 📊

### Description
Accounting screen showing income/expenses for the day.

### Layout
```
┌─────────────────────────────────────────────┐
│           DAY 1 LEDGER                      │
├─────────────────────────────────────────────┤
│                                             │
│  INCOME:                                    │
│  + Quest: Rats in Cellar      +25G          │
│  + Quest: Goblin Patrol       +70G          │
│  ─────────────────────────                  │
│  Total Income:                +95G          │
│                                             │
│  EXPENSES:                                  │
│  - Hired Marcus               -100G         │
│  - Hired Elara                -100G         │
│  - Daily Upkeep (2 members)   -20G          │
│  ─────────────────────────                  │
│  Total Expenses:              -220G         │
│                                             │
│  ════════════════════════════               │
│  NET CHANGE:                  -125G         │
│  ════════════════════════════               │
│                                             │
│  Starting Gold:   350G                      │
│  Ending Gold:     225G                      │
│                                             │
│  REPUTATION CHANGES:                        │
│  Town:  +2 (Completed quests)               │
│  Crown: +0                                  │
│                                             │
│  [SLEEP] button                             │
└─────────────────────────────────────────────┘
```

### Interactions
- **Click "SLEEP"**: 
  - Fade to black
  - "Day 2" text appears
  - Loop back to **MORNING PHASE**

---

## 7. PERSISTENT UI ELEMENTS

### Header Bar (Always Visible)
```
┌────────────────────────────────────────────────────┐
│ Day 3 | Monday | Week 1 | 💰 225G | ⭐Town: +2 | 👑Crown: 0 │
│                                   [⚙️ MENU]       │
└────────────────────────────────────────────────────┘
```

### Menu Modal (Click ⚙️)
```
┌──────────────────┐
│  GAME MENU       │
├──────────────────┤
│ Resume           │
│ Save Game        │
│ Load Game        │
│ Settings         │
│ Quit to Menu     │
└──────────────────┘
```

---

## 8. SPECIAL UI: CARD FLIP ANIMATION SPEC

### CSS Transform
```css
.quest-card {
  perspective: 1000px;
}

.quest-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front, .card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

### User Experience
- **Hover**: Slight lift (shadow grows)
- **Click**: Smooth 180° flip
- **Second Click (on back)**: Flip back to front

---

## 9. COLOR SCHEME & VISUAL LANGUAGE

### Quest Ranks
- **F-Rank**: 🟢 Green (#4CAF50)
- **D-Rank**: 🔵 Blue (#2196F3)
- **C-Rank**: 🟡 Yellow (#FFC107)
- **B-Rank**: 🟠 Orange (#FF9800)
- **A-Rank**: 🔴 Red (#F44336)
- **S-Rank**: 🟣 Purple (#9C27B0)

### States
- **Unclaimed**: Gray border
- **Claimed**: Gold/Yellow border
- **Assigned**: Blue border
- **Completed**: Green checkmark
- **Failed**: Red X

### Buttons
- **Primary Action**: Green (#4CAF50)
- **Secondary Action**: Blue (#2196F3)
- **Destructive Action**: Red (#F44336)
- **Disabled**: Gray (#9E9E9E)

---

## 10. MISSING SCREENS TO ADD (V2)

- **Guild Upgrade Screen**: Show barracks, vault, etc.
- **Character Detail Modal**: Full stat sheet, history
- **Quest History Log**: Past completed quests
- **Town Reputation Screen**: Show unlocked benefits

---

**IMPLEMENTATION NOTES**:
1. **Start with Static Mockups**: Build each screen as HTML/CSS first.
2. **Then Add Interactivity**: Hook up click handlers.
3. **Then Add State Management**: Connect to GameState object.
4. **Finally Polish**: Add animations last.

This spec is **COMPLETE** for MVP. Copy this into your UI builder agent.
