# CONSUMABLES & TRINKETS REGISTRY

**Purpose**: One-use items and passive trinkets gifted to adventurers to aid quests.
**Mechanic**: Player drags **1 Item** to adventurer before quest start.

---

## 1. CONSUMABLES (One-Time Use)
*Used automatically during quest if needed. Disappears after use.*

| Item ID | Name | Cost | Effect | Usage Condition |
| :--- | :--- | :--- | :--- | :--- |
| `item_pot_heal_minor` | **Minor Healing Potion** | 40G | Heals **Minor Injury** instantly. Prevents injury from worsening. | On Injury Roll |
| `item_pot_heal_major` | **Major Healing Potion** | 100G | Heals **Major Injury** or saves from Death (becomes Major). | On Critical Injury/Death |
| `item_pot_str` | **Giant Strength Vial** | 60G | **+4 STR** for one quest. | Always (Pre-calc) |
| `item_pot_dex` | **Cat's Grace Oil** | 60G | **+4 DEX** for one quest. | Always (Pre-calc) |
| `item_pot_int` | **Mind Clarity Brew** | 60G | **+4 INT** for one quest. | Always (Pre-calc) |
| `item_scroll_fire` | **Scroll of Fireball** | 120G | Grants **Fire Magic** trait for 1 quest. | Vs Swarms/Ice |
| `item_scroll_warp` | **Escape Scroll** | 150G | **Guaranteed Escape** from failed quest (No Injury/Death). | On Quest Failure |

---

## 2. TRINKETS (Reusable*)
*Passive buffs. Return to inventory after quest. 10% Chance to be LOST/BROKEN on failure.*

| Item ID | Name | Cost | Effect | Flavor |
| :--- | :--- | :--- | :--- | :--- |
| `trinket_rabbit_foot` | **Rabbit's Foot** | 30G | **+2 DEX**. +5% Critical Chance. | "Lucky!" |
| `trinket_whetstone` | **Dwarven Whetstone** | 30G | **+2 STR**. | "Keep it sharp." |
| `trinket_spectacles` | **Scholar's Lens** | 30G | **+2 INT**. | "See the details." |
| `trinket_holy_symbol` | **Wooden Holy Symbol** | 50G | **+20% vs Undead**. | "Faith protects." |
| `trinket_compass` | **Explorer's Compass** | 40G | **+15% Survival** in Wilderness. | "Never lost." |
| `trinket_lucky_coin` | **Loaded Dice** | 80G | **Reroll 1 Failed Check** (Hidden mechanic). | "Cheat fate." |

---

## 3. SPECIAL / QUEST ITEMS
*Required for specific High-Rank quests.*

| Item ID | Name | Cost | Effect |
| :--- | :--- | :--- | :--- |
| `item_fire_immunity` | **Potion of Magma Skin** | 200G | **REQUIRED** for Volcano/Dragon quests. Prevents Heat Death. |
| `item_water_breath` | **Gillyweed Extract** | 150G | **REQUIRED** for Underwater quests. Prevents Drowning. |
| `item_pure_light` | **Lantern of Truth** | 100G | Reveals Invisible Stalkers (A-Rank). |

---

## SHOP LOGIC
- **Morning Merchant**: Sells 3 random items Daily.
- **Bard**: Sells "Quest Intel" (Not an item, instant reveal).
- **Loot**: 10% chance to find a Trinket in C-Rank+ chests.
