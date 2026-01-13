/**
 * NarrativeGenerator.js - Combat Logs & Travel Events
 * 
 * Generates turn-by-turn combat narratives for high-rank quests
 * and random travel events for multi-day quests.
 */

class NarrativeGenerator {
    constructor() {
        // Combat templates by trait
        this.TRAIT_COMBAT = {
            brave: { attack: "charges fearlessly", defend: "stands firm despite the pain" },
            cowardly: { attack: "strikes hesitantly", defend: "flinches and stumbles back" },
            reckless: { attack: "recklessly throws themselves at", defend: "ignores defensive stance" },
            disciplined: { attack: "executes a precise strike", defend: "maintains perfect guard" },
            greedy: { attack: "eyes the treasure while fighting", defend: "protects the loot bag" },
            pyromaniac: { attack: "cackles while hurling flames", defend: "sets the ground ablaze" },
            bloodthirsty: { attack: "savagely tears into", defend: "grins through the blood" }
        };

        // ═══════════════════════════════════════════════════════════════
        // CLASS → WEAPON TYPE MAPPING
        // Maps each class to its primary weapon type for modular combat text
        // ═══════════════════════════════════════════════════════════════
        this.CLASS_WEAPON_TYPES = {
            'Mercenary': 'blade',
            'Knight-Errant': 'blade',
            'Ronin': 'blade',
            'Barbarian': 'blade',
            'Rogue': 'blade',
            'Pit Fighter': 'unarmed',
            'Ranger': 'ranged',
            'Battle Mage': 'magic',
            'Necromancer': 'magic',
            'Cleric': 'blunt',
            'Scholar': 'magic',
            'Illusionist': 'magic',
            'Town Guard': 'blunt'
        };

        // ═══════════════════════════════════════════════════════════════
        // TRAIT → STYLE GROUP MAPPING
        // Maps character traits to combat style categories
        // ═════════════════════════════════════════════════════════════════
        this.TRAIT_STYLE_MAP = {
            'Brave': 'brave',
            'Fearless': 'brave',
            'Reckless': 'reckless',
            'Disciplined': 'disciplined',
            'Cowardly': 'cowardly',
            'Bloodthirsty': 'bloodthirsty',
            'Sadist': 'bloodthirsty',
            'Greedy': 'greedy',
            'Pragmatic': 'greedy'
        };

        // Weapon attack descriptions
        this.WEAPON_ATTACKS = {
            'Mercenary': ["swings a heavy blade", "delivers a crushing blow", "parries and counter-strikes"],
            'Knight-Errant': ["brings down a legendary strike", "charges with shield raised", "executes a knightly technique"],
            'Ronin': ["draws the katana in a flash", "performs a deadly iaido slash", "flows like water between attacks"],
            'Rogue': ["strikes from the shadows", "finds a gap in the armor", "disappears and reappears behind"],
            'Barbarian': ["roars and swings wildly", "enters a berserker rage", "smashes through defenses"],
            'Necromancer': ["summons spectral hands", "drains life force", "commands the dead to attack"],
            'Battle Mage': ["channels arcane energy", "unleashes a magical blast", "enchants weapon with power"],
            'Ranger': ["fires a precise arrow", "sets a quick trap", "calls upon nature's aid"],
            'default': ["attacks with determination", "strikes true", "presses the assault"]
        };

        // Enemy attack descriptions by quest type
        this.ENEMY_ATTACKS = {
            'Monster Hunt': ["lunges with savage claws", "unleashes a primal roar", "swipes with deadly force"],
            'Boss Hunt': ["breathes devastating fire", "slams the ground creating shockwaves", "summons minions to aid"],
            'Escort': ["ambushes from cover", "targets the protected convoy", "attempts to separate the group"],
            'Retrieval': ["guards the objective fiercely", "springs a hidden trap", "calls for reinforcements"],
            'default': ["attacks viciously", "presses the assault", "strikes back hard"]
        };

        // Travel events pool
        this.TRAVEL_EVENTS = [
            // Positive events
            { type: 'positive', text: "found a shortcut through old mining tunnels", effect: "Returns 1 day earlier!", modifier: { daysEarly: 1 } },
            { type: 'positive', text: "discovered an abandoned camp with supplies", effect: "+10% success chance", modifier: { successBonus: 10 } },
            { type: 'positive', text: "met a traveling healer who treated minor wounds", effect: "Fully rested", modifier: { healMinor: true } },
            { type: 'positive', text: "found a hidden cache of coins", effect: "+15G bonus", modifier: { goldBonus: 15 } },
            { type: 'positive', text: "received directions from friendly locals", effect: "Better prepared", modifier: { successBonus: 5 } },

            // Neutral events
            { type: 'neutral', text: "camped by a peaceful stream", effect: "Uneventful rest", modifier: {} },
            { type: 'neutral', text: "spotted distant smoke from another party", effect: "Not alone out here", modifier: {} },
            { type: 'neutral', text: "weathered a brief rainstorm in a cave", effect: "Delayed briefly", modifier: {} },

            // Negative events
            { type: 'negative', text: "was ambushed by bandits on the road", effect: "-10% success chance", modifier: { successPenalty: 10 } },
            { type: 'negative', text: "got lost in dense fog and lost time", effect: "Returns 1 day later", modifier: { daysLate: 1 } },
            { type: 'negative', text: "ate spoiled rations and felt ill", effect: "-15% success chance", modifier: { successPenalty: 15 } },
            { type: 'negative', text: "encountered hostile wildlife and was injured", effect: "Minor injury risk", modifier: { injuryChance: 20 } },
            { type: 'negative', text: "had equipment stolen while sleeping", effect: "-5G from reward", modifier: { goldPenalty: 5 } }
        ];
    }

    // ═══════════════════════════════════════════════════════════════
    // HELPER METHODS - Combat Text Generation
    // ═══════════════════════════════════════════════════════════════

    /**
     * Get weapon type for a character's class
     * @param {string} className - The character's class name
     * @returns {string} Weapon type (blade, blunt, ranged, magic, unarmed)
     */
    getWeaponType(className) {
        return this.CLASS_WEAPON_TYPES[className] || 'blade';
    }

    /**
     * Get combat style based on character traits
     * @param {Array} traits - Array of trait strings
     * @returns {string} Style adverb for combat description
     */
    getStyleFromTraits(traits) {
        if (!traits || traits.length === 0) {
            return 'with determination';
        }

        // Find first matching trait
        for (const trait of traits) {
            if (this.TRAIT_STYLE_MAP[trait]) {
                const styleKey = this.TRAIT_STYLE_MAP[trait];
                const styles = window.GAME_DATA?.combatPools?.styleAdverbs?.[styleKey];
                if (styles && styles.length > 0) {
                    return this.pickRandom(styles);
                }
            }
        }

        return 'skillfully'; // Default fallback
    }

    /**
     * Get enemy type category for body part selection
     * @param {Object} quest - The quest object
     * @returns {string} Enemy type (humanoid, beast, monster)
     */
    categorizeEnemy(quest) {
        const enemy = quest.enemy?.type || quest.type || '';
        const enemyLower = enemy.toLowerCase();

        if (enemyLower.includes('beast') || enemyLower.includes('wolf') ||
            enemyLower.includes('bear') || enemyLower.includes('spider')) {
            return 'beast';
        } else if (enemyLower.includes('dragon') || enemyLower.includes('golem') ||
            enemyLower.includes('demon') || enemyLower.includes('monster')) {
            return 'monster';
        }
        return 'humanoid'; // Default: bandits, cultists, etc.
    }

    /**
     * Get enemy type for attack pool selection
     * Maps quest names to specific enemy types for narrative variety
     * @param {Object} quest - The quest object
     * @returns {string} Enemy type key for enemyAttacks pool
     */
    getEnemyType(quest) {
        const name = quest.name.toLowerCase();
        if (name.includes('dragon')) return 'dragon';
        if (name.includes('wolf') || name.includes('beast') || name.includes('spider') || name.includes('bear')) return 'beast';
        if (name.includes('stalker') || name.includes('invisible') || name.includes('phantom')) return 'stalker';
        if (name.includes('witch') || name.includes('warlock') || name.includes('mage') || name.includes('swamp')) return 'witch';
        if (name.includes('golem') || name.includes('stone') || name.includes('construct')) return 'golem';
        if (name.includes('undead') || name.includes('skeleton') || name.includes('zombie') || name.includes('lich')) return 'undead';
        if (name.includes('horde') || name.includes('goblin') || name.includes('swarm')) return 'horde';
        if (name.includes('bandit') || name.includes('cultist') || name.includes('knight') || name.includes('thief')) return 'humanoid';
        return 'default';
    }

    /**
     * Helper: Pick random element from array
     * @param {Array} array - Array to pick from
     * @returns {*} Random element
     */
    pickRandom(array) {
        if (!array || array.length === 0) return '';
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Generate combat log for high-rank quests
     * @param {Object} hero - The adventurer
     * @param {Object} quest - The quest
     * @param {string} outcome - SUCCESS, FAILURE, etc.
     * @returns {Array} Array of turn objects
     */
    generateCombatLog(hero, quest, outcome) {
        // Only generate for B+ rank quests
        const logRanks = ['S', 'A', 'B'];
        if (!logRanks.includes(quest.rank)) {
            return null;
        }

        // Determine number of turns based on rank and outcome
        // S-rank: 10-12 turns, A-rank: 7-9 turns, B-rank: 5-6 turns
        const baseTurns = quest.rank === 'S' ? 10 : quest.rank === 'A' ? 7 : 5;
        const numTurns = baseTurns + Math.floor(Math.random() * 3);

        const turns = [];
        const heroName = hero.name;
        const className = hero.className || 'Adventurer';
        const enemyName = this.getEnemyName(quest);

        // Track HP for narrative purposes
        let heroHP = 100;
        let enemyHP = 100;

        // Track critical moment triggers
        let nearDeathTriggered = false;
        let lastStandTriggered = false;
        let villainMonologueTriggered = false;

        const pools = window.GAME_DATA?.combatPools;
        const isPositiveOutcome = ['SUCCESS', 'GREAT', 'LEGENDARY'].includes(outcome);

        // Opening turn
        turns.push({
            turn: 1,
            actor: 'hero',
            text: `${heroName} enters the ${this.getLocation(quest)}. ${this.getOpeningLine(hero, quest)}`
        });

        // Boss Hunt quest type flavor (turn 2)
        if (quest.type === 'Boss Hunt' && pools?.criticalMoments?.questMoments?.['Boss Hunt']) {
            const flavor = this.pickRandom(pools.criticalMoments.questMoments['Boss Hunt']);
            turns.push({
                turn: 2,
                actor: 'narrator',
                text: flavor
            });
        }

        // Combat exchanges
        const startTurn = quest.type === 'Boss Hunt' ? 3 : 2;
        for (let i = startTurn; i < numTurns; i++) {
            const isHeroTurn = i % 2 === 0;

            // Check for villain monologue mid-combat (Boss Hunt only)
            if (quest.type === 'Boss Hunt' && !villainMonologueTriggered && i === Math.floor(numTurns / 2)) {
                villainMonologueTriggered = true;
                if (pools?.criticalMoments?.villainMonologue) {
                    const monologue = this.pickRandom(pools.criticalMoments.villainMonologue)
                        .replace(/\{hero\}/g, heroName)
                        .replace(/\{enemy\}/g, enemyName);
                    turns.push({
                        turn: i,
                        actor: 'critical',
                        text: monologue
                    });
                    continue;
                }
            }

            if (isHeroTurn) {
                const damage = 10 + Math.floor(Math.random() * 20);
                const isCrit = Math.random() < 0.15;

                if (isPositiveOutcome) {
                    enemyHP -= damage;
                    turns.push({
                        turn: i,
                        actor: 'hero',
                        text: this.getHeroAttack(hero, enemyName, damage, isCrit),
                        damage: isCrit ? damage * 2 : damage
                    });
                } else {
                    // Failed quest - attacks less effective
                    const miss = Math.random() < 0.4;
                    if (miss) {
                        turns.push({
                            turn: i,
                            actor: 'hero',
                            text: `${heroName} ${this.getWeaponAttack(className)} but ${enemyName} evades!`
                        });
                    } else {
                        enemyHP -= damage / 2;
                        turns.push({
                            turn: i,
                            actor: 'hero',
                            text: this.getHeroAttack(hero, enemyName, damage / 2, false)
                        });
                    }
                }
            } else {
                // Enemy turn
                const damage = 15 + Math.floor(Math.random() * 25);
                heroHP -= damage;
                turns.push({
                    turn: i,
                    actor: 'enemy',
                    text: this.getEnemyAttack(enemyName, heroName, quest, outcome, damage),
                    damage: damage
                });

                // Check for Near Death Rally (hero HP low, positive outcome)
                if (!nearDeathTriggered && heroHP <= 25 && isPositiveOutcome && pools?.criticalMoments?.nearDeathRally) {
                    nearDeathTriggered = true;
                    const rally = this.pickRandom(pools.criticalMoments.nearDeathRally)
                        .replace(/\{hero\}/g, heroName)
                        .replace(/\{enemy\}/g, enemyName);
                    turns.push({
                        turn: i,
                        actor: 'critical',
                        text: rally
                    });
                }

                // Check for Last Stand (both combatants low HP)
                if (!lastStandTriggered && heroHP <= 35 && enemyHP <= 35 && pools?.criticalMoments?.lastStand) {
                    lastStandTriggered = true;
                    const lastStand = this.pickRandom(pools.criticalMoments.lastStand)
                        .replace(/\{hero\}/g, heroName)
                        .replace(/\{enemy\}/g, enemyName);
                    turns.push({
                        turn: i,
                        actor: 'critical',
                        text: lastStand
                    });
                }
            }
        }

        // S-rank LEGENDARY outcome gets overwhelming force moment before resolution
        if (quest.rank === 'S' && outcome === 'LEGENDARY' && pools?.criticalMoments?.overwhelmingForce) {
            const epic = this.pickRandom(pools.criticalMoments.overwhelmingForce)
                .replace(/\{hero\}/g, heroName)
                .replace(/\{enemy\}/g, enemyName);
            turns.push({
                turn: numTurns - 1,
                actor: 'critical',
                text: epic
            });
        }

        // Resolution turn
        turns.push({
            turn: numTurns,
            actor: 'resolution',
            text: this.getResolution(hero, quest, outcome, heroHP, enemyHP)
        });

        return turns;
    }


    getOpeningLine(hero, quest) {
        const pools = window.GAME_DATA?.combatPools;
        if (pools?.openingLines) {
            const className = hero.className || 'default';
            const openings = pools.openingLines[className] || pools.openingLines['default'];
            return this.pickRandom(openings);
        }
        // Fallback
        return 'Weapon drawn, ready for battle.';
    }

    getLocation(quest) {
        const locations = {
            'Monster Hunt': ['dark cave', 'ancient ruins', 'howling forest', 'abandoned mine'],
            'Boss Hunt': ['dragon\'s lair', 'corrupted temple', 'volcanic depths', 'cursed throne room'],
            'Escort': ['bandit-infested road', 'treacherous mountain pass', 'haunted highway'],
            'Retrieval': ['forgotten tomb', 'sunken crypt', 'overgrown temple']
        };
        const options = locations[quest.type] || ['dangerous territory'];
        return options[Math.floor(Math.random() * options.length)];
    }

    getEnemyName(quest) {
        // Extract from quest name or generate - use proper capitalization
        if (quest.name.includes('Dragon')) return 'The Dragon';
        if (quest.name.includes('Witch')) return 'The Witch';
        if (quest.name.includes('Goblin')) return 'The Goblin Horde';
        if (quest.name.includes('Wolf') || quest.name.includes('Howling')) return 'The Alpha Wolf';
        if (quest.name.includes('Golem')) return 'The Stone Golem';
        if (quest.name.includes('Stalker')) return 'The Invisible Stalker';
        if (quest.name.includes('Bandit')) return 'The Bandit Leader';
        if (quest.name.includes('Lich')) return 'The Lich';
        if (quest.name.includes('Beast')) return 'The Beast';
        if (quest.name.includes('Spider')) return 'The Giant Spider';
        return 'The Enemy';
    }

    getWeaponAttack(className) {
        const attacks = this.WEAPON_ATTACKS[className] || this.WEAPON_ATTACKS['default'];
        return attacks[Math.floor(Math.random() * attacks.length)];
    }

    /**
     * Generate hero attack description
     * Uses new modular combat pools if available, falls back to old system
     * @param {Object} hero - The hero character
     * @param {string} enemyName - Name of the enemy
     * @param {number} damage - Damage dealt
     * @param {boolean} isCrit - Whether this is a critical hit
     * @returns {string} Attack description
     */
    getHeroAttack(hero, enemyName, damage, isCrit) {
        const name = hero.name;
        const className = hero.className || 'Adventurer';

        // NEW: Use modular combat pools if available
        if (window.GAME_DATA?.combatPools) {
            const weaponType = this.getWeaponType(className);
            const verb = this.pickRandom(window.GAME_DATA.combatPools.weaponVerbs[weaponType]);
            const style = this.getStyleFromTraits(hero.traits);
            const effect = this.pickRandom(window.GAME_DATA.combatPools.hitEffects);

            if (isCrit) {
                const critIntro = this.pickRandom(window.GAME_DATA.combatPools.critIntros);
                return `${critIntro} ${name} ${verb} ${style} — CRITICAL HIT! ${enemyName} staggers!`;
            } else {
                return `${name} ${verb} ${style}. ${effect}!`;
            }
        }

        // FALLBACK: Old system for backwards compatibility
        const attack = this.getWeaponAttack(className);
        if (isCrit) {
            return `${name} ${attack} — CRITICAL HIT! ${enemyName} staggers!`;
        }
        return `${name} ${attack} at ${enemyName}. The strike connects!`;
    }

    /**
     * Generate enemy attack description
     * Uses enemy-type pools with hero defense reactions
     * @param {string} enemyName - The enemy's name
     * @param {string} heroName - The hero's name
     * @param {Object} quest - The quest object for enemy type detection
     * @param {string} outcome - Quest outcome for defense quality
     * @param {number} damage - Damage dealt
     * @returns {string} Attack description
     */
    getEnemyAttack(enemyName, heroName, quest, outcome, damage) {
        const pools = window.GAME_DATA?.combatPools;

        if (pools?.enemyAttacks) {
            const enemyType = this.getEnemyType(quest);
            const attacks = pools.enemyAttacks[enemyType] || pools.enemyAttacks['default'];
            const attack = this.pickRandom(attacks);

            // Hero defense based on outcome
            const isSuccess = ['SUCCESS', 'GREAT', 'LEGENDARY'].includes(outcome);
            const defensePool = isSuccess ? pools.heroDefenses?.success : pools.heroDefenses?.failure;
            const defense = this.pickRandom(defensePool || ['takes the hit']);

            return `${enemyName} ${attack}! ${heroName} ${defense}.`;
        }

        // Fallback to old system
        const attacks = this.ENEMY_ATTACKS[quest?.type] || this.ENEMY_ATTACKS['default'];
        const attack = attacks[Math.floor(Math.random() * attacks.length)];
        return `${enemyName} ${attack}! ${heroName} takes the hit.`;
    }

    /**
     * Generate resolution text with template variants
     * @param {Object} hero - The hero character
     * @param {Object} quest - The quest
     * @param {string} outcome - Quest outcome tier
     * @param {number} heroHP - Final hero HP
     * @param {number} enemyHP - Final enemy HP
     * @returns {string} Resolution text
     */
    getResolution(hero, quest, outcome, heroHP, enemyHP) {
        const name = hero.name;
        const enemy = this.getEnemyName(quest);
        const pools = window.GAME_DATA?.combatPools;

        // Use template pools if available
        if (pools?.resolutions?.[outcome]) {
            const template = this.pickRandom(pools.resolutions[outcome]);
            return template.replace(/\{hero\}/g, name).replace(/\{enemy\}/g, enemy);
        }

        // Fallback to hardcoded
        switch (outcome) {
            case 'LEGENDARY':
                return `With a final, legendary strike, ${name} defeats ${enemy} in spectacular fashion! Bards will sing of this day!`;
            case 'GREAT':
                return `${name} lands a decisive blow! ${enemy} falls. A great victory is claimed!`;
            case 'SUCCESS':
                return `After a fierce battle, ${name} emerges victorious. ${enemy} is no more.`;
            case 'PARTIAL':
                return `${name} manages to complete the objective but ${enemy} escapes wounded. A bittersweet victory.`;
            case 'FAILURE':
                return `Overwhelmed, ${name} is forced to retreat. ${enemy} remains undefeated.`;
            case 'DISASTER':
                return `${name} collapses, grievously wounded. The quest ends in disaster...`;
            default:
                return `The battle concludes. ${name} returns to the guild.`;
        }
    }

    /**
     * Roll travel events for multi-day quests
     * @param {Object} quest - The quest
     * @param {number} duration - Quest duration in days
     * @returns {Array} Array of event objects
     */
    rollTravelEvents(quest, duration) {
        if (duration < 2) return [];

        const events = [];
        const eventChance = 0.4; // 40% chance per extra day

        for (let day = 1; day < duration; day++) {
            if (Math.random() < eventChance) {
                const event = this.pickTravelEvent(quest);
                events.push({
                    day: day,
                    ...event
                });
            }
        }

        return events;
    }

    pickTravelEvent(quest) {
        // Weight based on quest rank (higher rank = more dangerous events)
        const weights = {
            'S': { positive: 0.2, neutral: 0.2, negative: 0.6 },
            'A': { positive: 0.25, neutral: 0.25, negative: 0.5 },
            'B': { positive: 0.3, neutral: 0.3, negative: 0.4 },
            'C': { positive: 0.35, neutral: 0.35, negative: 0.3 },
            'D': { positive: 0.4, neutral: 0.4, negative: 0.2 },
            'F': { positive: 0.5, neutral: 0.4, negative: 0.1 }
        };

        const weight = weights[quest.rank] || weights['D'];
        const roll = Math.random();

        let type;
        if (roll < weight.positive) type = 'positive';
        else if (roll < weight.positive + weight.neutral) type = 'neutral';
        else type = 'negative';

        const pool = this.TRAVEL_EVENTS.filter(e => e.type === type);
        return pool[Math.floor(Math.random() * pool.length)];
    }

    /**
     * Format combat log for display
     * @param {Array} turns - Array of turn objects
     * @returns {string} HTML string
     */
    formatCombatLogHTML(turns, questName) {
        if (!turns || turns.length === 0) return '';

        let html = `
            <div style="
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border: 2px solid #4a3f35;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                font-family: 'Courier New', monospace;
            ">
                <div style="
                    text-align: center;
                    color: #e94560;
                    font-weight: bold;
                    font-size: 0.9rem;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                ">⚔️ Combat Log: ${questName}</div>
        `;

        turns.forEach(turn => {
            // Determine color and prefix based on actor type
            let color, prefix, fontStyle = 'normal';

            switch (turn.actor) {
                case 'hero':
                    color = '#4ecca3';
                    prefix = `Turn ${turn.turn}:`;
                    break;
                case 'enemy':
                    color = '#ff6b6b';
                    prefix = `Turn ${turn.turn}:`;
                    break;
                case 'critical':
                    color = '#ff9f43';  // Orange for dramatic moments
                    prefix = '⚡';
                    fontStyle = 'italic';
                    break;
                case 'narrator':
                    color = '#a29bfe';  // Purple for atmosphere
                    prefix = '📜';
                    fontStyle = 'italic';
                    break;
                case 'resolution':
                    color = '#ffd93d';
                    prefix = '★';
                    break;
                default:
                    color = '#888';
                    prefix = '';
            }

            html += `
                <div style="
                    color: ${color};
                    font-size: 0.8rem;
                    margin: 6px 0;
                    padding-left: 10px;
                    border-left: 2px solid ${color};
                    font-style: ${fontStyle};
                ">
                    <span style="color: #888;">${prefix}</span> ${turn.text}
                </div>
            `;
        });


        html += `</div>`;
        return html;
    }

    /**
     * Format travel events for display
     * @param {Array} events - Array of event objects
     * @param {string} heroName - Hero's name
     * @returns {string} HTML string
     */
    formatTravelEventsHTML(events, heroName) {
        if (!events || events.length === 0) return '';

        let html = `
            <div style="
                background: #2d2d2d;
                border-left: 3px solid #8b7355;
                padding: 10px 15px;
                margin: 10px 0;
                border-radius: 0 6px 6px 0;
            ">
                <div style="color: #c9a959; font-size: 0.85rem; margin-bottom: 8px;">
                    📜 Travel Log for ${heroName}:
                </div>
        `;

        events.forEach(event => {
            const icon = event.type === 'positive' ? '✨' :
                event.type === 'negative' ? '⚠️' : '📍';
            const color = event.type === 'positive' ? '#4ecca3' :
                event.type === 'negative' ? '#ff6b6b' : '#888';

            html += `
                <div style="font-size: 0.8rem; margin: 4px 0; color: #ccc;">
                    ${icon} <span style="color: #888;">Day ${event.day}:</span> 
                    ${heroName} ${event.text}. 
                    <span style="color: ${color};">${event.effect}</span>
                </div>
            `;
        });

        html += `</div>`;
        return html;
    }
}

// Export as singleton
window.NarrativeGenerator = new NarrativeGenerator();
