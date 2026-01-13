/**
 * QuestResolver.js - Comprehensive Quest Resolution Engine
 * 
 * Creates dynamic, engaging quest outcomes that feel like real adventures:
 * - Probability-based (even weak heroes can succeed, strong can fail)
 * - Multiple outcome tiers with narrative events
 * - Consequences: injuries, death, bonus loot, reputation
 * - Story generation: what actually happened during the quest
 */

class QuestResolver {
    constructor() {
        // Outcome tiers with probability ranges
        this.OUTCOME_TIERS = {
            LEGENDARY: { min: 0.00, max: 0.05, label: 'Legendary Success', goldMult: 3.0, xpMult: 2.0 },
            GREAT: { min: 0.05, max: 0.15, label: 'Great Success', goldMult: 1.5, xpMult: 1.3 },
            SUCCESS: { min: 0.15, max: null, label: 'Success', goldMult: 1.0, xpMult: 1.0 },
            PARTIAL: { min: null, max: 0.15, label: 'Partial Success', goldMult: 0.5, xpMult: 0.7 },
            FAILURE: { min: 0.15, max: 0.10, label: 'Failure', goldMult: 0, xpMult: 0.2 },
            DISASTER: { min: 0.10, max: 0.00, label: 'Disaster', goldMult: 0, xpMult: 0 }
        };

        // Injury severity levels
        this.INJURY_TYPES = [
            { id: 'bruised', label: 'Bruised', severity: 'minor', recoveryDays: 1, statPenalty: 0 },
            { id: 'wounded', label: 'Wounded', severity: 'moderate', recoveryDays: 2, statPenalty: -1 },
            { id: 'badly_hurt', label: 'Badly Hurt', severity: 'major', recoveryDays: 3, statPenalty: -2 },
            { id: 'critical', label: 'Critical Condition', severity: 'critical', recoveryDays: 5, statPenalty: -3 }
        ];

        // Story event templates for narrative generation
        this.STORY_EVENTS = {
            // Success stories
            success: [
                "{hero} completed the quest with skill and determination.",
                "{hero} handled {quest} professionally, earning respect.",
                "The task was challenging, but {hero} rose to the occasion.",
                "{hero} returned victorious, barely breaking a sweat.",
                "Local folk will be talking about {hero}'s success for days."
            ],
            // Great success stories
            great: [
                "{hero} exceeded all expectations on {quest}!",
                "Not only did {hero} succeed, but found bonus treasure!",
                "{hero}'s reputation grows - they made this look easy.",
                "The client was impressed beyond words by {hero}'s work.",
                "{hero} discovered a shortcut that others missed."
            ],
            // Legendary success stories  
            legendary: [
                "{hero} has become a LEGEND! Tales of {quest} will be told for generations!",
                "Against all odds, {hero} achieved the impossible!",
                "{hero} single-handedly turned {quest} into a triumph!",
                "Bards are already composing songs about {hero}'s valor!",
                "{hero} found an ancient artifact during {quest}!"
            ],
            // Partial success stories
            partial: [
                "{hero} completed {quest}, but not without complications.",
                "The job is done, though {hero} had some... setbacks.",
                "{hero} limped back - mission accomplished, but barely.",
                "Success, technically. {hero} looks like they've been through hell.",
                "The quest is complete, but the client isn't thrilled with the collateral damage."
            ],
            // Failure stories
            failure: [
                "{hero} was forced to retreat from {quest}.",
                "The quest proved too much for {hero} this time.",
                "{hero} returned empty-handed, but alive.",
                "Sometimes discretion is the better part of valor. {hero} fled.",
                "{hero} underestimated {quest} and paid the price."
            ],
            // Disaster stories
            disaster: [
                "{hero} barely survived {quest}. They may never be the same.",
                "Everything went wrong. {hero} is lucky to be alive.",
                "{hero} was overwhelmed and nearly didn't make it back.",
                "A catastrophic failure. {hero} needs serious recovery time.",
                "The quest was a disaster. {hero}'s reputation has suffered greatly."
            ]
        };

        // Special event templates (rare occurrences)
        this.SPECIAL_EVENTS = [
            { chance: 0.05, type: 'found_treasure', text: "{hero} discovered hidden treasure worth {gold}G!" },
            { chance: 0.03, type: 'made_friend', text: "{hero} befriended a local who may help in the future." },
            { chance: 0.02, type: 'found_item', text: "{hero} found a useful item during their adventure!" },
            { chance: 0.04, type: 'gained_reputation', text: "{hero}'s deeds have spread - +1 Guild Reputation!" },
            { chance: 0.03, type: 'close_call', text: "{hero} had a close call but escaped through pure luck!" },
            { chance: 0.02, type: 'mysterious_stranger', text: "A mysterious stranger aided {hero} during the quest..." },
            { chance: 0.03, type: 'learned_something', text: "{hero} learned a valuable lesson that increased their skill." }
        ];
    }

    /**
     * Main resolution function - calculates quest outcome
     * @param {Object} hero - The adventurer
     * @param {Object} quest - The quest
     * @returns {Object} Complete resolution result with story and consequences
     */
    resolveQuest(hero, quest) {
        // Step 1: Calculate base success rate
        const successRate = this.calculateSuccessRate(hero, quest);

        // Step 2: Roll for outcome
        const roll = Math.random();
        const outcome = this.determineOutcome(successRate, roll);

        // Step 3: Calculate rewards/penalties
        const rewards = this.calculateRewards(quest, outcome);

        // Step 4: Determine consequences (injuries, death)
        const consequences = this.calculateConsequences(hero, quest, outcome);

        // Step 5: Check for special events
        const specialEvents = this.rollSpecialEvents(hero, quest, outcome);

        // Step 6: Generate narrative story
        const story = this.generateStory(hero, quest, outcome, specialEvents);

        // Step 7: Calculate freelancer cut if applicable
        const freelancerCut = hero.hireType === 'freelance' ? Math.floor(rewards.gold * 0.5) : 0;

        // Step 8: Generate combat log for B+ rank quests
        let combatLog = null;
        if (window.NarrativeGenerator) {
            combatLog = window.NarrativeGenerator.generateCombatLog(hero, quest, outcome.tier);
        }

        // Step 9: Roll travel events for multi-day quests
        let travelEvents = [];
        const duration = parseInt(quest.duration ?? 0);
        if (window.NarrativeGenerator && duration >= 2) {
            travelEvents = window.NarrativeGenerator.rollTravelEvents(quest, duration);
        }

        return {
            heroId: hero.id,
            heroName: hero.name,
            questId: quest.id,
            questName: quest.name,

            // Core outcome
            outcome: outcome.tier,
            outcomeLabel: outcome.label,
            successRate: Math.round(successRate * 100),
            roll: Math.round(roll * 100),

            // Rewards
            goldEarned: rewards.gold - freelancerCut,
            freelancerCut: freelancerCut,
            xpEarned: rewards.xp,
            reputationChange: rewards.reputation,
            bonusLoot: rewards.bonusLoot,

            // Consequences
            injury: consequences.injury,
            died: consequences.died,
            moralChange: consequences.moralChange,
            recoveryDays: consequences.recoveryDays,

            // Narrative
            story: story,
            specialEvents: specialEvents,
            combatLog: combatLog,
            travelEvents: travelEvents,

            // Breakdown for transparency
            modifierBreakdown: this.lastModifierBreakdown || []
        };
    }

    /**
     * Calculate success rate based on hero stats, traits, equipment vs quest requirements
     */
    calculateSuccessRate(hero, quest) {
        const breakdown = [];

        // === STEP 1: BASE SUCCESS (Stat vs Requirement) ===
        const reqStat = quest.requirements?.stat || 'str';
        const reqMin = quest.requirements?.min || 5;
        const heroStat = hero.baseStats?.[reqStat] || 5;

        // Base formula: (hero stat / requirement) × 60%, clamped 10-90%
        let baseSuccess = (heroStat / Math.max(reqMin, 1)) * 0.6;
        baseSuccess = Math.max(0.10, Math.min(0.90, baseSuccess));
        breakdown.push({ factor: 'Base (Stats)', value: Math.round(baseSuccess * 100) + '%' });

        let totalModifier = 0;

        // === STEP 2: LEVEL ADVANTAGE ===
        const questLevel = this.rankToLevel(quest.rank);
        const levelDiff = (hero.level || 1) - questLevel;
        const levelMod = levelDiff * 0.05; // ±5% per level
        totalModifier += levelMod;
        if (levelMod !== 0) {
            breakdown.push({ factor: 'Level Difference', value: (levelMod >= 0 ? '+' : '') + Math.round(levelMod * 100) + '%' });
        }

        // === STEP 3: CLASS AFFINITY ===
        const classMod = this.getClassModifier(hero.className, quest);
        totalModifier += classMod;
        if (classMod !== 0) {
            breakdown.push({ factor: 'Class Affinity', value: (classMod >= 0 ? '+' : '') + Math.round(classMod * 100) + '%' });
        }

        // === STEP 4: TRAIT EFFECTS ===
        const traitMod = this.getTraitModifiers(hero, quest);
        totalModifier += traitMod.total;
        traitMod.breakdown.forEach(t => breakdown.push(t));

        // === STEP 5: EQUIPMENT BONUSES ===
        // TODO: Implement when equipment system is ready

        // === STEP 6: MORALE EFFECT ===
        const morale = hero.morale || 50;
        const moraleMod = (morale - 50) * 0.002; // ±10% range
        totalModifier += moraleMod;
        if (Math.abs(moraleMod) > 0.01) {
            breakdown.push({ factor: 'Morale', value: (moraleMod >= 0 ? '+' : '') + Math.round(moraleMod * 100) + '%' });
        }

        // === STEP 7: INJURY PENALTY ===
        if (hero.status === 'INJURED') {
            totalModifier -= 0.15;
            breakdown.push({ factor: 'Injured', value: '-15%' });
        }

        // === STEP 8: RANDOM VARIANCE (Makes it feel alive) ===
        // Add ±5% random variance so outcomes aren't purely deterministic
        const variance = (Math.random() - 0.5) * 0.10;
        totalModifier += variance;
        breakdown.push({ factor: 'Luck Factor', value: (variance >= 0 ? '+' : '') + Math.round(variance * 100) + '%' });

        // === FINAL CALCULATION ===
        let finalSuccess = baseSuccess + totalModifier;
        finalSuccess = Math.max(0.05, Math.min(0.95, finalSuccess)); // Clamp 5-95%

        breakdown.push({ factor: 'FINAL', value: Math.round(finalSuccess * 100) + '%', isTotal: true });

        this.lastModifierBreakdown = breakdown;
        return finalSuccess;
    }

    /**
     * Get class bonuses/penalties based on quest type
     */
    getClassModifier(className, quest) {
        // Normalize quest type: "Monster Hunt" -> "monster_hunt"
        const rawType = quest.type || 'combat';
        const questType = rawType.toLowerCase().replace(/\s+/g, '_');

        const CLASS_AFFINITIES = {
            'Mercenary': { monster_hunt: 0.15, escort: 0.10, boss_hunt: 0.10, retrieval: 0.05 },
            'Knight-Errant': { escort: 0.25, monster_hunt: 0.15, boss_hunt: 0.20, stealth: -0.30 },
            'Barbarian': { monster_hunt: 0.25, boss_hunt: 0.30, escort: -0.40, retrieval: -0.20 },
            'Rogue': { stealth: 0.55, retrieval: 0.30, escort: -0.20, boss_hunt: -0.30 },
            'Battle Mage': { monster_hunt: 0.20, boss_hunt: 0.25, stealth: -0.40 },
            'Cleric': { undead: 0.60, monster_hunt: 0.10, escort: 0.15 },
            'Ranger': { monster_hunt: 0.30, retrieval: 0.25, escort: 0.10 },
            'Necromancer': { monster_hunt: 0.15, boss_hunt: 0.10 },
            'Pit Fighter': { monster_hunt: 0.20, boss_hunt: 0.35 },
            'Scholar': { retrieval: 0.40, escort: 0.10, monster_hunt: -0.40, boss_hunt: -0.60 },
            'Ronin': { monster_hunt: 0.20, boss_hunt: 0.30, escort: 0.05 },
            'Illusionist': { stealth: 0.45, retrieval: 0.20, escort: 0.10 },
            'Town Guard': { escort: 0.20, monster_hunt: 0.05 }
        };

        const classData = CLASS_AFFINITIES[className];
        if (!classData) return 0;

        return classData[questType] || 0;
    }

    /**
     * Get trait bonuses/penalties
     */
    getTraitModifiers(hero, quest) {
        const allTraits = [
            ...(hero.traits || []),
            ...(hero.hiddenTraits || []),
            ...(hero.cursedTraits || []),
            ...(hero.legendaryTraits || [])
        ];

        const TRAIT_EFFECTS = {
            // Positive traits
            'Brave': { condition: (q) => ['B', 'A', 'S'].includes(q.rank), modifier: 0.10 },
            'Veteran': { condition: () => true, modifier: 0.10 },
            'Disciplined': { condition: () => true, modifier: 0.05 },
            'Honorbound': { condition: (q) => q.type === 'escort', modifier: 0.15 },
            'Faithful': { condition: () => true, modifier: 0.05 },
            'Lucky': { condition: () => true, modifier: 0.08 },
            'Pragmatic': { condition: () => true, modifier: 0.03 },
            'Analytical': { condition: (q) => q.type === 'puzzle' || q.type === 'mystery', modifier: 0.20 },
            'Tracker': { condition: (q) => q.type === 'tracking' || q.type === 'beast_hunt', modifier: 0.15 },

            // Negative traits
            'Cowardly': { condition: (q) => ['B', 'A', 'S'].includes(q.rank), modifier: -0.20 },
            'Greedy': { condition: () => true, modifier: -0.05 }, // Distracted by loot
            'Lazy': { condition: (q) => parseInt(q.duration) > 1, modifier: -0.20 },
            'Reckless': { condition: () => true, modifier: -0.10 },
            'Bloodthirsty': { condition: (q) => q.type !== 'combat' && q.type !== 'monster_hunt', modifier: -0.15 },
            'Pyromaniac': { condition: (q) => q.type === 'escort' || q.type === 'stealth', modifier: -0.25 },
            'Kleptomaniac': { condition: () => true, modifier: -0.10 },
            'Outcast': { condition: () => true, modifier: -0.05 },
            'Creepy': { condition: (q) => q.type === 'escort', modifier: -0.20 },
            'Unstable': { condition: () => true, modifier: -0.15 },
            'Traitor': { condition: () => Math.random() < 0.3, modifier: -0.30 }, // 30% chance to betray

            // Cursed traits
            'Fire-Touched': { condition: (q) => q.environment === 'volcano' || q.type === 'fire', modifier: 0.40 },
            'Mind-Flooded': { condition: () => true, modifier: -0.10 },
            'Demon Mark': { condition: (q) => q.type === 'demons', modifier: 0.30 },
            'Half-Dragon': { condition: (q) => q.environment === 'winter', modifier: 0.30 },
            'Rot-Touched': { condition: () => true, modifier: -0.05 },
            'Dual Soul': { condition: () => Math.random() < 0.5, modifier: 0.20 }, // Unpredictable
            'Abyss-Touched': { condition: (q) => q.type === 'abyss' || q.type === 'demons', modifier: 0.35 },

            // Legendary traits
            'Storm Sovereign': { condition: () => true, modifier: 0.25 },
            'Blade Sovereign': { condition: (q) => q.type === 'combat', modifier: 0.35 },
            'True Sight': { condition: (q) => q.type === 'mystery' || q.type === 'stealth', modifier: 0.30 },
            'Undying': { condition: () => true, modifier: 0.15 },
            'Inspirational': { condition: () => true, modifier: 0.10 },
            'Anti-Magic Body': { condition: (q) => q.enemy === 'mage', modifier: 0.50 },
            'Archmage': { condition: () => true, modifier: 0.30 },
            'Deluge Bringer': { condition: (q) => q.type === 'fire', modifier: 0.50 }
        };

        let total = 0;
        const breakdown = [];

        for (const trait of allTraits) {
            const effect = TRAIT_EFFECTS[trait];
            if (effect && effect.condition(quest)) {
                total += effect.modifier;
                if (Math.abs(effect.modifier) > 0) {
                    const sign = effect.modifier >= 0 ? '+' : '';
                    breakdown.push({
                        factor: `Trait: ${trait}`,
                        value: sign + Math.round(effect.modifier * 100) + '%'
                    });
                }
            }
        }

        return { total, breakdown };
    }

    /**
     * Convert quest rank to numeric level
     */
    rankToLevel(rank) {
        const RANKS = { 'F': 1, 'D': 2, 'C': 3, 'B': 5, 'A': 7, 'S': 9 };
        return RANKS[rank] || 2;
    }

    /**
     * Determine outcome tier based on success rate and roll
     */
    determineOutcome(successRate, roll) {
        // The "success zone" is 0 to successRate
        // Within success zone, we have tiers
        // Beyond success zone, we have failure tiers

        if (roll <= successRate) {
            // SUCCESS RANGE
            const successRoll = roll / successRate; // Normalize to 0-1 within success range

            if (successRoll < 0.05) {
                return { tier: 'LEGENDARY', label: 'Legendary Success!', isSuccess: true };
            } else if (successRoll < 0.20) {
                return { tier: 'GREAT', label: 'Great Success!', isSuccess: true };
            } else {
                return { tier: 'SUCCESS', label: 'Success', isSuccess: true };
            }
        } else {
            // FAILURE RANGE
            const failureRange = 1 - successRate;
            const failureRoll = (roll - successRate) / failureRange; // Normalize to 0-1 within failure range

            if (failureRoll < 0.50) {
                return { tier: 'PARTIAL', label: 'Partial Success', isSuccess: false };
            } else if (failureRoll < 0.85) {
                return { tier: 'FAILURE', label: 'Failure', isSuccess: false };
            } else {
                return { tier: 'DISASTER', label: 'Disaster!', isSuccess: false };
            }
        }
    }

    /**
     * Calculate rewards based on quest and outcome
     */
    calculateRewards(quest, outcome) {
        const baseGold = quest.rewards?.gold || 50;
        const baseXp = quest.rewards?.xp || 20;

        const MULTIPLIERS = {
            LEGENDARY: { gold: 2.5, xp: 2.0, rep: 2, bonusLoot: true },
            GREAT: { gold: 1.5, xp: 1.3, rep: 1, bonusLoot: Math.random() < 0.3 },
            SUCCESS: { gold: 1.0, xp: 1.0, rep: 0, bonusLoot: false },
            PARTIAL: { gold: 0.4, xp: 0.5, rep: 0, bonusLoot: false },
            FAILURE: { gold: 0, xp: 0.2, rep: -1, bonusLoot: false },
            DISASTER: { gold: 0, xp: 0, rep: -2, bonusLoot: false }
        };

        const mult = MULTIPLIERS[outcome.tier];

        return {
            gold: Math.floor(baseGold * mult.gold),
            xp: Math.floor(baseXp * mult.xp),
            reputation: mult.rep,
            bonusLoot: mult.bonusLoot
        };
    }

    /**
     * Calculate consequences (injuries, death, morale)
     */
    calculateConsequences(hero, quest, outcome) {
        const consequences = {
            injury: null,
            injuryNarrative: null,
            died: false,
            moralChange: 0,
            recoveryDays: 0,
            scarGained: null
        };

        // Death/injury chances by quest rank
        const DEATH_CHANCES = { 'F': 0.01, 'D': 0.03, 'C': 0.06, 'B': 0.12, 'A': 0.20, 'S': 0.35 };
        const deathChance = DEATH_CHANCES[quest.rank] || 0.05;

        // Get injury pools from new data
        const injuryData = window.GAME_DATA?.injuries;
        const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

        switch (outcome.tier) {
            case 'LEGENDARY':
                consequences.moralChange = 15;
                break;

            case 'GREAT':
                consequences.moralChange = 10;
                break;

            case 'SUCCESS':
                consequences.moralChange = 5;
                // Small chance of minor injury even on success
                if (Math.random() < 0.10 && injuryData?.minor) {
                    consequences.injury = pickRandom(injuryData.minor);
                    consequences.recoveryDays = consequences.injury.recovery;
                }
                break;

            case 'PARTIAL':
                consequences.moralChange = -5;
                // Moderate injury likely
                if (Math.random() < 0.50) {
                    const pool = Math.random() < 0.7 ? injuryData?.minor : injuryData?.moderate;
                    if (pool) {
                        consequences.injury = pickRandom(pool);
                        consequences.recoveryDays = consequences.injury.recovery;
                    }
                }
                break;

            case 'FAILURE':
                consequences.moralChange = -10;
                // Injury very likely
                if (Math.random() < 0.70) {
                    const roll = Math.random();
                    let pool;
                    if (roll < 0.3) pool = injuryData?.minor;
                    else if (roll < 0.8) pool = injuryData?.moderate;
                    else pool = injuryData?.major;

                    if (pool) {
                        consequences.injury = pickRandom(pool);
                        consequences.recoveryDays = consequences.injury.recovery;
                    }
                }
                break;

            case 'DISASTER':
                consequences.moralChange = -20;
                // Death check
                if (Math.random() < deathChance) {
                    consequences.died = true;
                } else {
                    // Serious injury if survived - major or critical
                    const pool = Math.random() < 0.6 ? injuryData?.major : injuryData?.critical;
                    if (pool) {
                        consequences.injury = pickRandom(pool);
                        consequences.recoveryDays = consequences.injury.recovery;
                    }
                }
                break;
        }

        // Generate injury narrative if injured
        if (consequences.injury) {
            const narratives = window.GAME_DATA?.injuryNarratives?.[quest.type] || [];
            const baseNarrative = consequences.injury.narrative.replace('{hero}', hero.name);
            const contextNarrative = narratives.length > 0 ? pickRandom(narratives).replace('{hero}', hero.name) : '';
            consequences.injuryNarrative = contextNarrative ? `${contextNarrative} ${baseNarrative}` : baseNarrative;

            // Roll for permanent scar
            if (consequences.injury.scarChance && Math.random() < consequences.injury.scarChance) {
                const scars = window.GAME_DATA?.scars || [];
                if (scars.length > 0) {
                    consequences.scarGained = pickRandom(scars);
                }
            }
        }

        // Check for "Undying" trait
        if (consequences.died && (hero.hiddenTraits?.includes('Undying') || hero.traits?.includes('Undying'))) {
            consequences.died = false;
            if (injuryData?.critical) {
                consequences.injury = pickRandom(injuryData.critical);
                consequences.recoveryDays = consequences.injury.recovery;
            }
            consequences.undyingSaved = true;
        }

        return consequences;
    }

    /**
     * Roll for special events (rare occurrences)
     */
    rollSpecialEvents(hero, quest, outcome) {
        const events = [];

        // Only roll for special events on success tiers
        if (!outcome.isSuccess && outcome.tier !== 'PARTIAL') {
            return events;
        }

        for (const event of this.SPECIAL_EVENTS) {
            // Higher chance on better outcomes
            let chance = event.chance;
            if (outcome.tier === 'LEGENDARY') chance *= 3;
            else if (outcome.tier === 'GREAT') chance *= 2;

            if (Math.random() < chance) {
                const text = event.text
                    .replace('{hero}', hero.name)
                    .replace('{quest}', quest.name)
                    .replace('{gold}', Math.floor(Math.random() * 50 + 20));

                events.push({
                    type: event.type,
                    text: text
                });
            }
        }

        return events;
    }

    /**
     * Generate narrative story of what happened
     */
    generateStory(hero, quest, outcome, specialEvents) {
        // Pick story template based on outcome
        const templates = this.STORY_EVENTS[outcome.tier.toLowerCase()] || this.STORY_EVENTS.success;
        let story = templates[Math.floor(Math.random() * templates.length)];

        // Replace placeholders
        story = story
            .replace(/{hero}/g, hero.name)
            .replace(/{quest}/g, quest.name);

        // Add special event narratives
        if (specialEvents.length > 0) {
            story += ' ' + specialEvents.map(e => e.text).join(' ');
        }

        return story;
    }
}

// Export as singleton
window.QuestResolver = new QuestResolver();
