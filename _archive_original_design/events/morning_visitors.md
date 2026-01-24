# MORNING VISITORS - Special Event System

**Purpose**: Pre-dawn NPC visits that create strategic dilemmas and moral choices  
**Format**: Implementation-ready event system  
**Total Visitors**: 7 unique NPCs

---

## SYSTEM MECHANICS

### Timing
- **When**: After day start, BEFORE adventurer queue
- **Frequency**: 20-40% chance per day OR scripted triggers
- **Priority**: Visitor event → Then normal desk work

### UI Flow
1. Day starts → Check trigger conditions
2. If triggered → Show visitor modal (portrait + dialogue + choices)
3. Player chooses → Apply consequences immediately
4. Continue to normal adventurer queue

---

# VISITOR TYPES

## 1. Royal Guard (Corrupt Official)
**ID**: `visitor_guard`  
**Archetype**: Bribery / Crown Pressure  
**Portrait**: Guard in royal livery, hand outstretched

### Trigger Conditions
- Day 2, 5, 9, 14 (escalating pressure)
- OR Crown Reputation < 0

### Dialogue
> "The Captain sent me. He's noticed... irregularities in your ledger. For a small donation, I could overlook them."

### Choices

**Option A: Pay Bribe**  
- **Cost**: 20G (if Crown Rep > 0) OR 50G (if Crown Rep < 0)
- **Effect**: Crown Rep +1
- **Consequence**: Sets precedent (bribes increase over time)

**Option B: Refuse Bribe**  
- **Cost**: Free
- **Effect**: Crown Rep -2
- **Consequence**: 20% chance of "Inspection Event" on Day 14 (forced audit, -100G fine)

### Long-Term Effects
- Paying 3+ times → Corruption path (locked out of honorable quests)
- Refusing 3+ times → Honor path (unlocks royal favor quests)

---

## 2. Mourning Widow (Emotional Consequence)
**ID**: `visitor_widow`  
**Archetype**: Humanitarian Crisis / Death Consequence  
**Portrait**: Woman in black, tear-stained face, holding letter

### Trigger Conditions
- **100% guaranteed** the day after any guild member dies
- Cannot be avoided

### Dialogue
> *A woman clutches a crumpled letter. Her eyes are red from crying.*  
> "My husband... he took that quest you offered. He never came home. I have children to feed. Please..."

### Choices

**Option A: Give Full Charity** (50G)  
- **Cost**: 50G
- **Effect**: Town Rep +3, Morale +5 (all members feel guilt relieved)
- **Consequence**: "Compassionate Guild" reputation

**Option B: Give Partial** (25G)  
- **Cost**: 25G
- **Effect**: Town Rep +1
- **Consequence**: Neutral

**Option C: Express Sympathy (No Money)**  
- **Cost**: Free
- **Effect**: Town Rep -1
- **Consequence**: Morale -2 (members feel guilty)

**Option D: Turn Away**  
- **Cost**: Free
- **Effect**: Town Rep -5, Morale -10 (all members)
- **Consequence**: "Heartless Guild" reputation, 10% chance widow curses you ("Bad Luck" debuff, -5% all quests for 7 days)

### Emotional Impact
**THIS IS THE MOST IMPACTFUL EVENT**  
- Forces player to confront consequences of death
- Morale penalties affect the entire guild
- Creates narrative weight to character deaths

---

## 3. Traveling Merchant (Item Shop)
**ID**: `visitor_merchant`  
**Archetype**: Opportunity / Preparation  
**Portrait**: Cheerful merchant with wagon, exotic goods

### Trigger Conditions
- Every 5 days (predictable schedule)
- 100% chance on Day 5, 10, 15, 20...

### Dialogue
> "Fresh from the capital! Rare potions and charms, only for the discerning Guild Master!"

### Inventory (3 Random Items Per Visit)

**Tier 1 - Common** (40% chance each):
- **Healing Potion**: 40G (instant heal minor injury)
- **Antidote**: 30G (cure poison effect)
- **Lucky Charm**: 60G (+5% success for 1 week)

**Tier 2 - Uncommon** (15% chance each):
- **Fire Immunity Potion**: 200G (REQUIRED for dragon)
- **Holy Water**: 80G (+30% vs undead, single use)
- **Rope**: 20G (+20% climbing quests)
- **Water Breathing Potion**: 150G (REQUIRED for ocean quests)

**Tier 3 - Rare** (5% chance each):
- **Phoenix Down**: 500G (revive dead character ONCE)
- **Cursed Moonblade**: 300G (+5 STR weapon, 20% death curse)
- **Invisibility Cloak**: 400G (auto-succeed stealth quests, 3 uses)

### Negotiation
- CHA 8+ guild member present: 10% discount
- Greedy trait guild member: "Persuade" merchant (steal 30% chance)

### Choices
- **Buy Items**: Purchase up to 3 items
- **Browse Only**: See inventory, no purchase
- **Haggle**: CHA check, 50% success for -15% cost

**Note**: Essential for acquiring mandatory quest items

---

## 4. Mysterious Bard (Intel Broker)
**ID**: `visitor_bard`  
**Archetype**: Rumor / Bonus Quest  
**Portrait**: Bard with lute, conspiratorial grin

### Trigger Conditions
- Random (weekly intervals)
- Higher chance if Town Rep > 20

### Dialogue
> *A bard strums his lute, leaning close.*  
> "I heard whispers of a hidden treasure in the old ruins. For a drink and 30 gold, I'll mark it on your map."

### Choices

**Option A: Pay for Intel** (30G)  
- **Cost**: 30G
- **Effect**: Unlock **BONUS QUEST** (appears on board tomorrow)
- **Quest Type**: High reward (2x normal gold), high risk
- **Expiration**: 3 days (time-limited)

**Option B: Decline**  
- **Cost**: Free
- **Effect**: Nothing happens

### Bonus Quest Properties
- Unique visual (blue wax seal, "Bard's Tip" label)
- Reward: 150-300G (2x normal for rank)
- Risk: +20% difficulty (trap or ambush)
- Loot: Rare item (30% chance)

**Strategic Value**: High-risk high-reward gambling

---

## 5. Loan Shark (Emergency Funds)
**ID**: `visitor_loanshark`  
**Archetype**: Desperation / Debt Trap  
**Portrait**: Hooded figure, calculating eyes, ledger book

### Trigger Conditions
- **Only appears** if Gold < 20G (bankrupt)
- 100% chance when bankrupt for 2+ days

### Dialogue
> "I hear you're having... cash flow problems. I can help. 100 gold now, 150 gold in seven days. Take it or leave your guild in ruins."

### Choices

**Option A: Accept Loan**  
- **Gain**: +100G immediately
- **Debt**: Must pay 150G within 7 days
- **Consequence**: If unpaid by Day 7, debt collectors visit (-200G forced payment, or lose guild)

**Option B: Refuse Loan**  
- **Effect**: Continue with negative gold
- **Consequence**: 3-day grace period, then Game Over

### Debt Mechanics
- Loan Shark tracks debt (UI indicator)
- Day 7: Debt collectors arrive (forced payment)
- If cannot pay: Game Over OR sell guild members (forced fire)

**Note**: Last resort option, creates pressure to recover financially

---

## 6. Town Elder (Community Request)
**ID**: `visitor_elder`  
**Archetype**: Local Quest / Town Favor  
**Portrait**: Gray-haired elder with staff, kind eyes

### Trigger Conditions
- Town Rep > 15
- Random (10% chance per day)

### Dialogue
> "Guild Master, the harvest festival is in 3 days. We need strong hands to prepare. Could you spare an adventurer for a day?"

### Choices

**Option A: Volunteer Member**  
- **Cost**: Lose 1 guild member for 1 day (unavailable)
- **Effect**: Town Rep +5, Festival unlocks (+2 morale to all next week)

**Option B: Decline Politely**  
- **Cost**: Free
- **Effect**: Town Rep -1

**Option C: Send Freelancer (if available)**  
- **Cost**: 30G (hire freelancer for town)
- **Effect**: Town Rep +3, good compromise

### Festival Effects (if helped)
- Next week: All guild members +2 morale
- Unlocks "Festival Quest" (fun, low-risk, good rewards)

---

## 7. Deserter (Fugitive Offer)
**ID**: `visitor_deserter`  
**Archetype**: Moral Dilemma / High Risk Hire  
**Portrait**: Scared soldier, torn uniform, looking over shoulder

### Trigger Conditions
- Crown Rep < -10 (low standing with kingdom)
- OR random (5% chance)

### Dialogue
> *A soldier in torn uniform begs for sanctuary.*  
> "The army... I couldn't do it anymore. They'll execute me if they find me. Let me work for you, please. I'm strong, and I'll work for half price."

### Choices

**Option A: Hire Deserter**  
- **Cost**: 50G (half normal hire cost)
- **Character Quality**: Level 4-6, good stats
- **BUT**: Has "Wanted" trait (20% chance Crown inspects guild each day)
- **Risk**: If inspected and deserter found = -20 Crown Rep, 100G fine

**Option B: Turn Him In**  
- **Cost**: Free
- **Effect**: Crown Rep +5, 50G bounty reward
- **Consequence**: Morale -5 (guild sees you as traitor)

**Option C: Reject (Send Away)**  
- **Cost**: Free
- **Effect**: No changes

### Strategic Decision
- Cheap powerful hire vs. constant inspection risk
- Moral choice: Help fugitive or serve kingdom?

---

# VISITOR FREQUENCY TABLE

| Visitor | Trigger | Frequency | Importance |
|---------|---------|-----------|------------|
| Royal Guard | Scripted (Day 2, 5, 9) | Guaranteed | High (reputation path) |
| Mourning Widow | After death | 100% next day | **CRITICAL** (emotional) |
| Merchant | Every 5 days | Predictable | High (mandatory items) |
| Bard | Random | Weekly | Medium (bonus content) |
| Loan Shark | Gold < 20G | When bankrupt | High (survival) |
| Town Elder | Town Rep > 15 | Random (10%) | Medium (morale boost) |
| Deserter | Crown Rep < -10 | Rare (5%) | Medium (moral choice) |

---

# STRATEGIC IMPLICATIONS

## Resource Management
- **Merchant**: Must save gold for mandatory items (Fire Immunity, Water Breathing)
- **Loan Shark**: Emergency bailout, but creates debt pressure
- **Royal Guard**: Bribes drain gold but prevent worse penalties

## Reputation Paths
- **Corrupt Path**: Pay all bribes, turn in deserter → Crown favor
- **Honor Path**: Refuse bribes, help widow → Town favor
- Can't maximize both (mutually exclusive)

## Emotional Weight
- **Widow Event**: Makes deaths meaningful, not just stat loss
- Creates narrative consequence to risky quests

## Preparation
- **Merchant Timing**: Must plan ahead for dragon/ocean quests
- Missing merchant = cannot attempt S-rank quests

---

**TOTAL VISITORS**: 7  
**Coverage**: Economy, morality, preparation, narrative  
**Emotional Impact**: High (especially Widow)

**Implementation Notes**:
- Visitors are MODAL (block normal gameplay until resolved)
- Choices have lasting consequences (reputation paths)
- Some visitors are **mandatory** preparation (Merchant for S-rank)
- Widow event is the emotional core of the game (death matters)
- Visitor choices reveal player values (honor vs. pragmatism)
