class GameState {
    constructor() {
        if (GameState.instance) {
            return GameState.instance;
        }
        GameState.instance = this;

        this.resetState();
    }

    /**
     * Reset all game state to defaults (used for New Game)
     */
    resetState() {
        // Core Resources
        this.gold = 350;
        this.day = 1;
        this.reputation = { town: 5, crown: 0 };

        // Game Phases: 'MORNING' | 'TOWN_HALL' | 'GUILD_HALL' | 'EVENING' | 'LEDGER'
        this.phase = 'MORNING';

        // Content
        this.roster = [];           // Full-time hired adventurers
        this.freelancers = [];      // Freelance adventurers (temporary)
        this.activeQuests = [];     // Quests currently in progress (with heroes assigned)
        this.availableQuests = [];  // Quests on the Town Board
        this.claimedQuests = [];    // Quests claimed but not yet dispatched
        this.acceptedQuests = [];   // Quests accepted from Quest Board (new flow)
        this.availableHires = [];   // Adventurers seeking work
        this.morningEvent = null;

        // Daily History (for Ledger)
        this.dailyLog = {
            income: [],
            expenses: [],
            questReports: [],
            events: [],           // Choice events from this day
            pendingVigils: []     // Deaths awaiting vigil choice
        };

        // Memorial - Wall of the Fallen
        this.memorial = [];       // Array of { name, className, level, deathDay, questName, howDied }

        // Story Quest Tracking
        this.completedStoryQuests = [];  // IDs of completed story quests
        this.activeQuestProgress = null; // Current interactive quest progress event to show
    }

    /**
     * Initialize the game state, potentially loading from save.
     */
    init() {
        console.log("GameState initialized.");
        const loaded = this.loadGame();

        // If new game (no data loaded) or phase undefined, start fresh
        if (!loaded || !this.phase) {
            this.startMorning();
        }
    }

    // =========================================================
    // GAME LOOP PHASES
    // =========================================================

    startMorning() {
        this.phase = 'MORNING';
        this.refreshDailyContent();
        this.dailyLog = {
            income: [],
            expenses: [],
            questReports: [],
            events: [],
            pendingVigils: []
        };

        // Check for returning quests (multi-day quests that completed)
        this.processReturningQuests();

        // === CHECK FOR INTERACTIVE QUEST PROGRESS ===
        this.activeQuestProgress = null;
        const progressEvents = window.GAME_DATA?.questProgressEvents || [];
        for (const activeQuest of this.activeQuests) {
            if (!activeQuest.isInteractive) continue;

            // Initialize progress data if not present
            if (!activeQuest.progressData) {
                activeQuest.progressData = { currentDay: 0, choices: [], modifiers: [] };
            }

            // Increment progress day
            activeQuest.progressData.currentDay++;
            const progDay = activeQuest.progressData.currentDay;

            // Find matching progress event
            const progressEvent = progressEvents.find(pe =>
                pe.questId === activeQuest.id && pe.progressDay === progDay
            );

            if (progressEvent) {
                this.activeQuestProgress = {
                    questId: activeQuest.id,
                    questName: activeQuest.name,
                    heroId: activeQuest.assignedHeroId,
                    ...progressEvent
                };
                console.log(`🩸 Quest Progress Event: ${progressEvent.title} (Day ${progDay})`);
                break; // Only show one progress event per morning
            }
        }

        // 30% chance of a visitor event (only if no quest progress event)
        this.morningEvent = null;
        if (!this.activeQuestProgress && Math.random() < 0.3) {
            this.morningEvent = {
                id: 'royal_guard',
                name: 'Royal Guard',
                text: 'The Captain sent me. We need a "donation" for the local protection fund.',
                cost: 20
            };
        }

        this.saveGame();
        console.log(`Phase: ${this.phase} (Day ${this.day}, QuestProgress: ${this.activeQuestProgress ? 'Yes' : 'No'}, Event: ${this.morningEvent ? 'Yes' : 'No'})`);
    }

    /**
     * Process quests that return today using QuestResolver for real outcomes
     */
    processReturningQuests() {
        const returning = this.activeQuests.filter(q => q.returnDay <= this.day);

        returning.forEach(quest => {
            const hero = this.findHeroById(quest.assignedHeroId);
            if (!hero) return;

            // === USE QUEST RESOLVER FOR REAL OUTCOMES ===
            const result = window.QuestResolver.resolveQuest(hero, quest);

            // Store the full result for the evening report
            this.dailyLog.questResults = this.dailyLog.questResults || [];
            this.dailyLog.questResults.push(result);

            // Apply gold rewards
            if (result.goldEarned > 0) {
                this.gold += result.goldEarned;
                this.dailyLog.income.push({
                    source: `${quest.name} (${hero.name})`,
                    amount: result.goldEarned
                });
            }

            // Apply freelancer cut if applicable
            if (result.freelancerCut > 0) {
                this.dailyLog.expenses.push({
                    source: `${hero.name}'s Cut (Freelance)`,
                    amount: result.freelancerCut
                });
            }

            // Apply reputation change
            if (result.reputationChange !== 0) {
                this.reputation.town += result.reputationChange;
            }

            // Apply Crown Rep from quest (for Crown Missions)
            if (quest.rewards && quest.rewards.crownRep) {
                this.reputation.crown += quest.rewards.crownRep;
                console.log(`👑 Crown Rep ${quest.rewards.crownRep > 0 ? '+' : ''}${quest.rewards.crownRep}`);
            }

            // Clear Crown Mission flag when completed
            if (quest.isCrownMission && window.ChoiceEventSystem) {
                delete window.ChoiceEventSystem.storyFlags['crown_mission_active'];
                delete window.ChoiceEventSystem.storyFlags['crown_mission_delayed'];
                console.log('👑 Crown Mission completed - cleared flags');
            }

            // Apply consequences to hero
            if (result.died) {
                hero.status = 'DEAD';
                hero.deathDay = this.day;
                hero.deathCause = `Died during ${quest.name}`;
                console.log(`💀 ${hero.name} has died during ${quest.name}!`);

                // Add to pending vigils for player choice
                this.dailyLog.pendingVigils = this.dailyLog.pendingVigils || [];
                this.dailyLog.pendingVigils.push({
                    heroId: hero.id,
                    heroName: hero.name,
                    className: hero.className || 'Adventurer',
                    level: hero.level || 1,
                    questName: quest.name,
                    howDied: result.story || 'Died heroically'
                });
            } else if (result.injury) {
                hero.status = 'INJURED';
                hero.injury = result.injury;
                hero.busyUntilDay = this.day + result.recoveryDays;
                hero.injuryNarrative = result.injuryNarrative || null;

                // Apply permanent scar if gained
                if (result.scarGained) {
                    hero.scars = hero.scars || [];
                    hero.scars.push(result.scarGained);
                    console.log(`⚔️ ${hero.name} gained a permanent scar: ${result.scarGained.label}`);

                    // Add scar's visual tell to hero's visualTells
                    hero.visualTells = hero.visualTells || [];
                    if (result.scarGained.visualTell) {
                        hero.visualTells.push(result.scarGained.visualTell);
                    }
                }

                // Apply permanent stat effects from critical injuries
                if (result.injury.permanentEffect) {
                    Object.entries(result.injury.permanentEffect).forEach(([stat, penalty]) => {
                        if (hero.baseStats && hero.baseStats[stat] !== undefined) {
                            hero.baseStats[stat] = Math.max(1, hero.baseStats[stat] + penalty);
                            console.log(`💔 ${hero.name}'s ${stat} permanently reduced by ${Math.abs(penalty)}`);
                        }
                    });
                }
            } else {
                hero.status = 'IDLE';
                hero.busyUntilDay = null;
            }

            // Freelancers always leave after their quest
            if (hero.hireType === 'freelance' && !result.died) {
                this.freelancers = this.freelancers.filter(f => f.id !== hero.id);
            }

            // Legacy quest report for backwards compatibility
            this.dailyLog.questReports.push({
                questId: quest.id,
                name: quest.name,
                heroName: hero.name,
                success: result.outcome === 'LEGENDARY' || result.outcome === 'GREAT' || result.outcome === 'SUCCESS',
                outcome: result.outcomeLabel,
                reward: result.goldEarned,
                story: result.story
            });
        });

        // Remove processed quests from active
        this.activeQuests = this.activeQuests.filter(q => q.returnDay > this.day);
    }

    enterTownHall() {
        this.phase = 'TOWN_HALL';
        this.saveGame();
        console.log(`Phase: ${this.phase}`);
    }

    enterDesk() {
        this.phase = 'DESK';
        this.deskQueueIndex = 0; // Track position in hiring queue
        this.saveGame();
        console.log(`Phase: ${this.phase} (${this.availableHires.length} adventurers waiting)`);
    }

    enterGuildHall() {
        this.phase = 'GUILD_HALL';
        this.saveGame();
        console.log(`Phase: ${this.phase}`);
    }

    /**
     * Dispatch all assigned quests and end the day
     */
    endDay() {
        console.log(`Ending Day ${this.day}...`);

        // 1. Move assigned claimed quests to active (dispatch heroes)
        const dispatched = [];
        this.claimedQuests.forEach(quest => {
            if (quest.assignedHeroId) {
                const hero = this.findHeroById(quest.assignedHeroId);
                const duration = parseInt(quest.duration ?? 1);

                // Set quest return day
                quest.returnDay = this.day + duration;
                quest.startedDay = this.day;

                // Update hero status
                if (hero) {
                    hero.status = 'ON_QUEST';
                    hero.busyUntilDay = quest.returnDay;
                    hero.currentQuestName = quest.name;
                }

                this.activeQuests.push(quest);
                dispatched.push(quest);
            }
        });

        // Remove dispatched quests from claimed
        this.claimedQuests = this.claimedQuests.filter(q => !q.assignedHeroId);

        // 1.5 Process 0-Day (Immediate) Quests
        // Quests with duration 0 returning today are resolved now so they appear in this evening's report
        this.processReturningQuests();

        // 2. Pay Wages (Full-Time Only)
        let totalWages = 20; // Base upkeep
        this.roster.forEach(char => {
            if (char.status !== 'DEAD') {
                totalWages += (char.dailyWage || 10);
            }
        });

        this.gold -= totalWages;
        this.dailyLog.expenses.push({ source: "Daily Upkeep & Wages", amount: totalWages });

        // 3. Check for Crown Rep Game Over condition
        if (this.reputation.crown < 0) {
            console.log("⚠️ GAME OVER: Crown Reputation has fallen below 0!");
            this.phase = 'GAME_OVER';
            return { ...this.dailyLog, gameOver: true, reason: 'crown_rep' };
        }

        // 4. Transition to Ledger
        this.phase = 'LEDGER';
        this.saveGame();
        return { ...this.dailyLog, gameOver: false };
    }

    nextDay() {
        this.day++;

        // Check for healed injured heroes
        const allHeroes = [...this.roster, ...this.freelancers];
        allHeroes.forEach(hero => {
            if (hero.status === 'INJURED' && hero.busyUntilDay && this.day >= hero.busyUntilDay) {
                console.log(`💚 ${hero.name} has recovered from their injury!`);
                hero.status = 'IDLE';
                hero.injury = null;
                hero.injuryNarrative = null;
                hero.busyUntilDay = null;
            }
        });

        this.startMorning();
        return this.day;
    }

    // =========================================================
    // HELPER METHODS
    // =========================================================

    /**
     * Find a hero by ID across roster and freelancers
     */
    findHeroById(heroId) {
        return this.roster.find(h => h.id === heroId) ||
            this.freelancers.find(h => h.id === heroId);
    }

    /**
     * Check if a hero is currently available (not on quest or injured)
     */
    isHeroAvailable(heroId) {
        const hero = this.findHeroById(heroId);
        if (!hero) return false;
        return hero.status === 'IDLE' || !hero.status;
    }

    /**
     * Check if hero is already assigned to a quest
     */
    isHeroAssigned(heroId) {
        return this.claimedQuests.some(q => q.assignedHeroId === heroId) ||
            this.activeQuests.some(q => q.assignedHeroId === heroId);
    }

    // =========================================================
    // ACTIONS
    // =========================================================

    claimQuest(questId) {
        if (this.claimedQuests.length >= 2) {
            return { success: false, message: "Max 2 quests can be claimed!" };
        }

        const qIndex = this.availableQuests.findIndex(q => q.id === questId);
        if (qIndex === -1) {
            return { success: false, message: "Quest not found." };
        }

        const quest = this.availableQuests.splice(qIndex, 1)[0];
        quest.assignedHeroId = null; // Ensure clean state
        this.claimedQuests.push(quest);
        this.saveGame();
        return { success: true, message: "Quest Claimed" };
    }

    /**
     * Assign a hero to a claimed quest
     */
    assignHeroToQuest(questId, heroId) {
        const quest = this.claimedQuests.find(q => q.id === questId);
        if (!quest) {
            return { success: false, message: "Quest not found." };
        }

        // Check if hero exists
        const hero = this.findHeroById(heroId);
        if (!hero) {
            return { success: false, message: "Hero not found." };
        }

        // Check if hero is available
        if (!this.isHeroAvailable(heroId)) {
            return { success: false, message: `${hero.name} is not available (${hero.status}).` };
        }

        // Check if hero is already assigned to another quest
        const existingQuest = this.claimedQuests.find(q => q.assignedHeroId === heroId && q.id !== questId);
        if (existingQuest) {
            return { success: false, message: `${hero.name} is already assigned to "${existingQuest.name}"` };
        }

        // Assign hero
        quest.assignedHeroId = heroId;
        this.saveGame();
        return { success: true, message: `Assigned ${hero.name} to ${quest.name}` };
    }

    /**
     * Unassign a hero from a quest
     */
    unassignHeroFromQuest(questId) {
        const quest = this.claimedQuests.find(q => q.id === questId);
        if (!quest) {
            return { success: false, message: "Quest not found." };
        }

        quest.assignedHeroId = null;
        this.saveGame();
        return { success: true, message: "Hero unassigned." };
    }

    hireAdventurer(adventurerId, hireType = 'fulltime') {
        const char = this.availableHires.find(c => c.id === adventurerId);
        if (!char) return { success: false, message: "Adventurer not found." };

        let cost, wage;

        if (hireType === 'fulltime') {
            cost = char.hireCost || 100;
            wage = char.dailyWage || 10;

            if (this.gold < cost) {
                return { success: false, message: "Not enough gold!" };
            }

            this.gold -= cost;
            this.dailyLog.expenses.push({ source: `Hired ${char.name} (Full-Time)`, amount: cost });

            char.dailyWage = wage;
            char.hireType = 'fulltime';
            char.status = 'IDLE';
            char.busyUntilDay = null;
            this.roster.push(char);

        } else if (hireType === 'freelance') {
            cost = Math.floor((char.hireCost || 100) * 0.4);

            if (this.gold < cost) {
                return { success: false, message: "Not enough gold!" };
            }

            this.gold -= cost;
            this.dailyLog.expenses.push({ source: `Hired ${char.name} (Freelance)`, amount: cost });

            char.rewardCut = 0.5;
            char.hireType = 'freelance';
            char.status = 'IDLE';
            char.busyUntilDay = null;
            this.freelancers.push(char);
        }

        this.availableHires = this.availableHires.filter(c => c.id !== adventurerId);
        this.saveGame();

        return { success: true, message: `Hired ${char.name}!` };
    }

    refreshDailyContent() {
        if (window.GAME_DATA) {
            // Get IDs of quests that are already in play (to avoid duplicates)
            const inPlayQuestIds = [
                ...this.activeQuests.map(q => q.id),
                ...this.claimedQuests.map(q => q.id)
            ];

            // Quests: random selection, excluding any already in play
            const allQuests = window.GAME_DATA.quests || [];
            const availablePool = allQuests.filter(q => !inPlayQuestIds.includes(q.id));
            this.availableQuests = this.getRandomSubset(availablePool, 4);

            // === STORY QUEST INJECTION ===
            // Check if any story quests should appear based on flags
            const storyQuests = window.GAME_DATA.storyQuests || [];
            const flags = window.ChoiceEventSystem?.storyFlags || {};
            const completedStoryQuestIds = this.completedStoryQuests || [];

            storyQuests.forEach(sq => {
                // Check if already completed or active
                if (completedStoryQuestIds.includes(sq.id)) return;
                if (this.activeQuests.some(q => q.id === sq.id)) return;
                if (this.claimedQuests.some(q => q.id === sq.id)) return;
                if (this.availableQuests.some(q => q.id === sq.id)) return;

                // Check required flag
                if (sq.requiresFlag && !flags[sq.requiresFlag]) return;

                // Add to available quests at the front (priority)
                console.log(`📜 Story Quest Unlocked: ${sq.name}`);
                this.availableQuests.unshift({ ...sq });
            });

            // === PRE-GENERATED "SPECIAL" CHARACTERS ===
            const allChars = window.GAME_DATA.characters || [];
            const dayOfCycle = ((this.day - 1) % 21) + 1; // 1-21 repeating

            const existingIds = [...this.roster, ...this.freelancers].map(c => c.id);
            const todaysCharacters = allChars.filter(c =>
                c.day === dayOfCycle && !existingIds.includes(c.id)
            );

            // Check unlock conditions (legendary characters)
            const unlockedSpecials = todaysCharacters.filter(c => {
                if (!c.unlockCondition) return true;
                const { questsCompleted, goldSaved } = c.unlockCondition;
                const meetsGold = !goldSaved || this.gold >= goldSaved;
                return meetsGold;
            });

            // === GENERATE RANDOM ADVENTURERS ===
            const randomCount = 2 + Math.floor(Math.random() * 2); // 2-3 random
            const randomAdventurers = [];
            for (let i = 0; i < randomCount; i++) {
                const rando = this.generateRandomAdventurer(this.day, i);
                if (!existingIds.includes(rando.id)) {
                    randomAdventurers.push(rando);
                }
            }

            // Combine: specials first, then randoms
            this.availableHires = [...unlockedSpecials, ...randomAdventurers];
            console.log(`Day ${this.day}: ${unlockedSpecials.length} special + ${randomAdventurers.length} random = ${this.availableHires.length} total`);
        }
    }

    generateRandomAdventurer(day, index) {
        const classes = window.GAME_DATA.classes || [];
        const traits = window.GAME_DATA.traits || [];

        // Name pools
        const firstNames = ['Bron', 'Elara', 'Kira', 'Thorne', 'Mira', 'Dax', 'Soren', 'Ivy', 'Rex', 'Luna', 'Cass', 'Jorn', 'Vera', 'Pike', 'Nyla', 'Grim', 'Freya', 'Orin', 'Wren', 'Zane'];
        const surnames = ['Stonefist', 'Nightblade', 'Ironfist', 'Swiftfoot', 'Blackwood', 'Ravencrest', 'Goldleaf', 'Steelwind', 'Ashborn', 'Duskwalker', 'Flameheart', 'Frostborn', 'Shadowmere', 'Brightshield', 'Thornwood'];
        const visualTellsPool = [
            'Scarred face', 'Missing finger', 'Distinctive tattoo', 'Weathered gear', 'Nervous twitch',
            'Confident stance', 'Shifty eyes', 'Calm demeanor', 'Eager smile', 'Worn boots',
            'Polished armor', 'Rusty weapon', 'Fresh bandages', 'Travel-stained cloak', 'Calloused hands'
        ];

        // Pick random class
        const classData = classes[Math.floor(Math.random() * classes.length)];

        // Generate level (1-4 for early game)
        const level = 1 + Math.floor(Math.random() * 4);

        // Generate stats based on class + level variance
        const baseStats = { ...classData.stats };
        Object.keys(baseStats).forEach(stat => {
            baseStats[stat] = Math.max(1, Math.min(10, baseStats[stat] + Math.floor(Math.random() * 3) - 1));
        });

        // Pick 1-2 random traits
        const traitCount = 1 + Math.floor(Math.random() * 2);
        const selectedTraits = this.getRandomSubset(traits, traitCount).map(t => t.name);

        // Pick 1-2 visual tells
        const tells = this.getRandomSubset(visualTellsPool, 1 + Math.floor(Math.random() * 2));

        // Calculate costs based on level
        const hireCost = 60 + (level * 20) + Math.floor(Math.random() * 30);
        const dailyWage = 12 + (level * 3) + Math.floor(Math.random() * 5);

        return {
            id: `random_day${day}_${index}_${Date.now()}`,
            name: firstNames[Math.floor(Math.random() * firstNames.length)],
            surname: surnames[Math.floor(Math.random() * surnames.length)],
            className: classData.name,
            level: level,
            baseStats: baseStats,
            traits: selectedTraits,
            hireCost: hireCost,
            dailyWage: dailyWage,
            visualTells: tells,
            isGenerated: true // Flag to identify random chars
        };
    }

    getRandomSubset(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // =========================================================
    // MEMORIAL / DEATH MATTERS
    // =========================================================

    /**
     * Hold a vigil for a fallen hero (costs gold, gains reputation)
     */
    holdVigil(heroId) {
        const vigilData = this.dailyLog.pendingVigils?.find(v => v.heroId === heroId);
        if (!vigilData) return { success: false, message: 'No pending vigil for this hero' };

        const cost = 50;
        if (this.gold < cost) {
            return { success: false, message: 'Not enough gold for vigil' };
        }

        // Pay for vigil
        this.gold -= cost;
        this.dailyLog.expenses.push({ source: `Vigil for ${vigilData.heroName}`, amount: cost });

        // Gain reputation based on hero class/origin
        const repGain = vigilData.className === 'Knight-Errant' ? 7 : 5;
        this.reputation.town += repGain;

        // Add to memorial
        this.memorial.push({
            ...vigilData,
            deathDay: this.day,
            vigilHeld: true
        });

        // Remove from pending
        this.dailyLog.pendingVigils = this.dailyLog.pendingVigils.filter(v => v.heroId !== heroId);

        // Remove dead hero from roster
        this.roster = this.roster.filter(h => h.id !== heroId);
        this.freelancers = this.freelancers.filter(h => h.id !== heroId);

        this.saveGame();
        return { success: true, message: `Held vigil for ${vigilData.heroName}. +${repGain} Town Rep` };
    }

    /**
     * Skip vigil for a fallen hero (no cost, no reputation)
     */
    skipVigil(heroId) {
        const vigilData = this.dailyLog.pendingVigils?.find(v => v.heroId === heroId);
        if (!vigilData) return { success: false, message: 'No pending vigil for this hero' };

        // Add to memorial without vigil
        this.memorial.push({
            ...vigilData,
            deathDay: this.day,
            vigilHeld: false
        });

        // Remove from pending
        this.dailyLog.pendingVigils = this.dailyLog.pendingVigils.filter(v => v.heroId !== heroId);

        // Remove dead hero from roster
        this.roster = this.roster.filter(h => h.id !== heroId);
        this.freelancers = this.freelancers.filter(h => h.id !== heroId);

        this.saveGame();
        return { success: true, message: `${vigilData.heroName} laid to rest without ceremony.` };
    }


    saveGame() {
        const data = {
            gold: this.gold,
            day: this.day,
            reputation: this.reputation,
            phase: this.phase,
            roster: this.roster,
            freelancers: this.freelancers,
            activeQuests: this.activeQuests,
            claimedQuests: this.claimedQuests,
            availableQuests: this.availableQuests,
            acceptedQuests: this.acceptedQuests,
            availableHires: this.availableHires,
            morningEvent: this.morningEvent,
            memorial: this.memorial,
            completedStoryQuests: this.completedStoryQuests,
            activeQuestProgress: this.activeQuestProgress,
            choiceEventData: window.ChoiceEventSystem?.getSaveData() || null
        };
        localStorage.setItem('TGM_Save', JSON.stringify(data));
        console.log("Game Saved.");
    }

    loadGame() {
        const saved = localStorage.getItem('TGM_Save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.gold = data.gold;
                this.day = data.day;
                this.reputation = data.reputation || { town: 5, crown: 0 };
                this.phase = data.phase || 'MORNING';
                this.roster = data.roster || [];
                this.freelancers = data.freelancers || [];
                this.activeQuests = data.activeQuests || [];
                this.claimedQuests = data.claimedQuests || [];
                this.availableQuests = data.availableQuests || [];
                this.acceptedQuests = data.acceptedQuests || [];
                this.availableHires = data.availableHires || [];
                this.morningEvent = data.morningEvent || null;
                this.memorial = data.memorial || [];
                this.completedStoryQuests = data.completedStoryQuests || [];
                this.activeQuestProgress = data.activeQuestProgress || null;

                // Load choice event system data
                if (data.choiceEventData && window.ChoiceEventSystem) {
                    window.ChoiceEventSystem.loadSaveData(data.choiceEventData);
                }

                console.log("Game Loaded.");
                return true;
            } catch (e) {
                console.error("Failed to load save:", e);
                return false;
            }
        }
        return false;
    }


    /**
     * Static method to reset singleton for New Game
     */
    static resetInstance() {
        if (GameState.instance) {
            GameState.instance.resetState();
        }
    }
}

// Expose to window for global access
window.GameState = new GameState();
