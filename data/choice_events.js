/**
 * choice_events.js - Event Definitions for Choice Event System
 * 
 * Each event has:
 * - phase: When it can trigger (MORNING, TOWN_HALL, EVENING)
 * - probability: Chance per phase check (0.0 - 1.0)
 * - conditions: Requirements to trigger
 * - choices: Binary options with effects
 */

const CHOICE_EVENTS = [
    // ============================================
    // MORNING EVENTS - Start of day dilemmas
    // ============================================

    {
        id: 'noble_son',
        phase: 'MORNING',
        probability: 0.12,
        oneTime: true,
        conditions: { minDay: 3, minGold: 50 },
        title: "The Noble's Request",
        description: "A well-dressed noble enters your guild hall looking irritated. \"My fool son fancies himself an adventurer and keeps pestering the local guilds. I'll pay you 200 gold NOW to tell him you're 'fully booked' if he ever shows up. Save us both the headache.\"",
        choices: [
            {
                text: "Accept the bribe (Easy money)",
                effects: { gold: 200, addFlag: 'noble_son_accepted' }
            },
            {
                text: "Refuse (\"We judge by merit, not pedigree.\")",
                effects: { townRep: 2 }
            }
        ]
    },


    {
        id: 'protection_racket',
        phase: 'MORNING',
        probability: 0.10,
        cooldownDays: 10,
        conditions: { minDay: 2 },
        title: "Unwelcome Visitors",
        description: "Two rough-looking men block your doorway. \"Nice guild you've got here. Shame if something... happened to it. 30 gold a week keeps us friendly.\"",
        choices: [
            {
                text: "Pay them off (Avoid trouble)",
                effects: { gold: -30, addFlag: 'paying_protection' }
            },
            {
                text: "Throw them out (Risk retaliation)",
                effects: { townRep: 3, addFlag: 'defied_thugs' }
            }
        ]
    },

    {
        id: 'injured_traveler',
        phase: 'MORNING',
        probability: 0.15,
        cooldownDays: 7,
        conditions: { minDay: 1 },
        title: "A Stranger's Plea",
        description: "A wounded traveler stumbles into your guild. \"Please... bandits on the road... I can pay.\" He clutches a bloodied coin purse.",
        choices: [
            {
                text: "Help him (Use your supplies)",
                effects: { gold: -15, townRep: 2 }
            },
            {
                text: "Send him to the temple",
                effects: { townRep: -1 }
            }
        ]
    },

    {
        id: 'merchant_deal',
        phase: 'MORNING',
        probability: 0.12,
        cooldownDays: 8,
        conditions: { minGold: 100 },
        title: "A Business Proposition",
        description: "A merchant offers you a deal: \"I have goods that need... discreet transport. 100 gold upfront, double when delivered. No questions asked.\"",
        choices: [
            {
                text: "Accept the shady deal",
                effects: { gold: 100, crownRep: -3, addFlag: 'smuggler_contact' }
            },
            {
                text: "Decline politely",
                effects: { townRep: 1 }
            }
        ]
    },

    {
        id: 'tax_collector',
        phase: 'MORNING',
        probability: 0.15,
        cooldownDays: 15,
        conditions: { minDay: 7, minGold: 80 },
        title: "The Crown's Due",
        description: "A tax collector arrives with guards. \"Your quarterly guild tax is due. 80 gold, or we'll need to... reassess your operating license.\"",
        choices: [
            {
                text: "Pay in full",
                effects: { gold: -80, crownRep: 2 }
            },
            {
                text: "Negotiate a delay (\"Business has been slow...\")",
                effects: { crownRep: -3, addFlag: 'tax_debt' }
            }
        ]
    },

    // ============================================
    // TOWN_HALL EVENTS - Political pressure
    // ============================================

    {
        id: 'guild_rivalry',
        phase: 'TOWN_HALL',
        probability: 0.10,
        cooldownDays: 12,
        conditions: { minDay: 5 },
        title: "A Rival's Challenge",
        description: "The guildmaster of a competing guild approaches you. \"Your adventurers are stealing our contracts. Perhaps we should... discuss territories.\"",
        choices: [
            {
                text: "Negotiate a truce (Share the market)",
                effects: { townRep: 2 }
            },
            {
                text: "Stand your ground (\"May the best guild win.\")",
                effects: { townRep: -1, addFlag: 'guild_rivalry' }
            }
        ]
    },

    {
        id: 'crown_mandate',
        phase: 'TOWN_HALL',
        probability: 0.08,
        oneTime: true,
        conditions: { minDay: 10, minCrownRep: 3 },
        title: "Royal Attention",
        description: "A royal messenger arrives with a sealed scroll. \"The Crown has taken notice of your guild. They request your adventurers assist with a... delicate matter. Refusal would be... unwise.\"",
        choices: [
            {
                text: "Accept the Crown's task",
                effects: { crownRep: 5, addFlag: 'crown_favor' }
            },
            {
                text: "Politely decline (cite prior commitments)",
                effects: { crownRep: -5, townRep: 3 }
            }
        ]
    },

    {
        id: 'town_festival',
        phase: 'TOWN_HALL',
        probability: 0.12,
        cooldownDays: 20,
        conditions: { minDay: 5, minGold: 50 },
        title: "Festival Sponsorship",
        description: "The town crier announces the upcoming harvest festival. \"Would your guild like to sponsor a booth? Great visibility for just 50 gold!\"",
        choices: [
            {
                text: "Sponsor the festival",
                effects: { gold: -50, townRep: 4 }
            },
            {
                text: "Decline",
                effects: {}
            }
        ]
    },

    // ============================================
    // EVENING EVENTS - End of day consequences
    // ============================================

    {
        id: 'tavern_brawl',
        phase: 'EVENING',
        probability: 0.10,
        cooldownDays: 7,
        conditions: { minDay: 3 },
        title: "Trouble at the Tavern",
        description: "Word reaches you that your adventurers got into a brawl at the local tavern. The barkeeper is demanding compensation for broken furniture.",
        choices: [
            {
                text: "Pay for damages (Protect your reputation)",
                effects: { gold: -40, townRep: 1 }
            },
            {
                text: "Let them sort it out",
                effects: { townRep: -2 }
            }
        ]
    },

    {
        id: 'night_thief',
        phase: 'EVENING',
        probability: 0.08,
        cooldownDays: 10,
        conditions: { minGold: 100 },
        title: "Shadows in the Night",
        description: "You catch a figure sneaking through your guild hall. When cornered, they reveal themselves as a desperate orphan. \"Please... I'm just hungry.\"",
        choices: [
            {
                text: "Give them food and coin",
                effects: { gold: -20, townRep: 2, addFlag: 'kind_to_orphans' }
            },
            {
                text: "Hand them to the guards",
                effects: { crownRep: 1, townRep: -1 }
            }
        ]
    },

    {
        id: 'mysterious_letter',
        phase: 'EVENING',
        probability: 0.10,
        oneTime: true,
        conditions: { minDay: 8 },
        title: "An Unsigned Letter",
        description: "A letter slipped under your door reads: \"You've been noticed. The Crimson Hand offers partnership. Leave 100 gold at the old well by midnight for an introduction. Or don't. Your choice.\"",
        choices: [
            {
                text: "Leave the gold (Join the shadows)",
                effects: { gold: -100, addFlag: 'crimson_hand_contact' }
            },
            {
                text: "Burn the letter",
                effects: { addFlag: 'rejected_crimson_hand' }
            }
        ]
    },

    // ============================================
    // CASCADING EVENTS - Follow-ups to previous choices
    // ============================================

    {
        id: 'thug_retaliation',
        phase: 'MORNING',
        probability: 0.25,
        oneTime: true,
        conditions: {
            minDay: 4,
            requiresFlag: 'defied_thugs'
        },
        title: "Payback",
        description: "You arrive to find your guild hall vandalized. A crude message is painted on the wall: \"SHOULD HAVE PAID.\" The damage is extensive.",
        choices: [
            {
                text: "Repair and reinforce (Show strength)",
                effects: { gold: -75, townRep: 3, removeFlag: 'defied_thugs' }
            },
            {
                text: "Report to the guard",
                effects: { crownRep: 2, removeFlag: 'defied_thugs' }
            }
        ]
    },

    {
        id: 'smuggler_delivery',
        phase: 'EVENING',
        probability: 0.30,
        oneTime: true,
        conditions: {
            minDay: 5,
            requiresFlag: 'smuggler_contact'
        },
        title: "The Delivery",
        description: "A hooded figure arrives at dusk. \"The goods were delivered successfully. Here's your payment.\" They hand you a heavy purse... but you notice guards watching from across the street.",
        choices: [
            {
                text: "Take the money quickly",
                effects: { gold: 150, crownRep: -2, removeFlag: 'smuggler_contact' }
            },
            {
                text: "Turn them in to the guards",
                effects: { crownRep: 5, townRep: -2, removeFlag: 'smuggler_contact' }
            }
        ]
    },

    {
        id: 'crimson_hand_mission',
        phase: 'MORNING',
        probability: 0.20,
        oneTime: true,
        conditions: {
            minDay: 12,
            requiresFlag: 'crimson_hand_contact'
        },
        title: "A Favor Owed",
        description: "A masked figure visits your office. \"The Hand remembers its friends. We have a task: silence a merchant who talks too much. The reward is... substantial.\"",
        choices: [
            {
                text: "Accept the dark task",
                effects: { gold: 300, townRep: -5, crownRep: -3, addFlag: 'crimson_hand_member' }
            },
            {
                text: "Refuse (Break ties with the Hand)",
                effects: { townRep: 2, removeFlag: 'crimson_hand_contact' }
            }
        ]
    },

    // ============================================
    // STORY ARC EVENTS - Red Moon Cult
    // ============================================

    {
        id: 'whispers_dark',
        phase: 'MORNING',
        probability: 0.35, // High chance once conditions met
        oneTime: true,
        conditions: { minDay: 3, maxDay: 8 },
        title: "Whispers in the Dark",
        description: "A nervous farmer bursts into your guild hall, eyes darting. \"Please, you have to listen! Strange folk in the woods... red robes, chanting under the moon. My daughter saw them—and now she won't stop screaming about blood. The guards say I'm mad, but I know what I saw!\"",
        choices: [
            {
                text: "Investigate (This sounds serious)",
                effects: { addFlag: 'cult_investigation_started', crownRep: 1 }
            },
            {
                text: "Ignore (We're not the town guard)",
                effects: { townRep: -1, addFlag: 'ignored_cult_warning' }
            }
        ]
    },

    // ============================================
    // STORY ARC EVENTS - Noble's Conspiracy
    // ============================================

    {
        id: 'noble_conspiracy_start',
        phase: 'EVENING',
        probability: 0.30,
        oneTime: true,
        conditions: { minDay: 5, minTownRep: 3 },
        title: "A Hushed Warning",
        description: "After the day's work, a servant in House Ashford livery approaches you nervously. \"My master... Lord Ashford... he's been meeting strange folk. Mercenaries, assassins maybe. I fear something terrible is planned. Please, someone must investigate before it's too late.\"",
        choices: [
            {
                text: "Agree to look into it (A noble conspiracy?)",
                effects: { addFlag: 'noble_rumors_heard', crownRep: 1 }
            },
            {
                text: "Refuse (Not our business)",
                effects: { gold: 20, addFlag: 'ignored_noble_warning' }
            }
        ]
    },

    // ============================================
    // MORE VARIETY EVENTS
    // ============================================

    {
        id: 'retired_hero',
        phase: 'MORNING',
        probability: 0.08,
        oneTime: true,
        conditions: { minDay: 7 },
        title: "The Old Legend",
        description: "A grizzled old man hobbles in, leaning on a gnarled staff. \"You don't know me, but years ago I was the greatest hero this kingdom ever saw. Baron the Bold, they called me. I'm too old for quests now, but I can teach your young ones a thing or two... for a modest fee.\"",
        choices: [
            {
                text: "Hire him as a trainer (50G - permanent XP bonus)",
                effects: { gold: -50, addFlag: 'trainer_baron', xpBonus: 10 }
            },
            {
                text: "Politely decline (We can't afford it)",
                effects: { townRep: -1 }
            }
        ]
    },

    {
        id: 'cursed_item',
        phase: 'EVENING',
        probability: 0.10,
        oneTime: true,
        conditions: { minDay: 4, mustHaveCompletedQuests: 3 },
        title: "A Strange Trinket",
        description: "While sorting through today's loot, you find an odd black amulet that wasn't there before. It pulses with a faint warmth and seems to whisper promises of power. Your heroes look at you uneasily.",
        choices: [
            {
                text: "Keep it (Power is power)",
                effects: { addFlag: 'cursed_amulet_kept', goldMultiplier: 1.1 }
            },
            {
                text: "Destroy it immediately",
                effects: { townRep: 1, crownRep: 1 }
            }
        ]
    },

    {
        id: 'guild_rivalry',
        phase: 'TOWN_HALL',
        probability: 0.12,
        cooldownDays: 15,
        conditions: { minDay: 6, minTownRep: 4 },
        title: "A Rival's Challenge",
        description: "A messenger from the Steel Fang Guild delivers a sealed letter. \"Our master challenges your guild to a formal competition. Send your best to the Arena in 3 days. Winner takes 500 gold from the loser. Decline, and everyone will know you're weak.\"",
        choices: [
            {
                text: "Accept the challenge",
                effects: { addFlag: 'arena_challenge_accepted' }
            },
            {
                text: "Decline (We have nothing to prove)",
                effects: { townRep: -2, crownRep: -1 }
            }
        ]
    }
];

// Expose globally
window.CHOICE_EVENTS = CHOICE_EVENTS;

