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
        this.availableHires = [];   // Adventurers seeking work
        this.morningEvent = null;

        // Daily History (for Ledger)
        this.dailyLog = {
            income: [],
            expenses: [],
            questReports: []
        };
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
        this.dailyLog = { income: [], expenses: [], questReports: [] };

        // Check for returning quests (multi-day quests that completed)
        this.processReturningQuests();

        // 30% chance of a visitor event
        this.morningEvent = null;
        if (Math.random() < 0.3) {
            this.morningEvent = {
                id: 'royal_guard',
                name: 'Royal Guard',
                text: 'The Captain sent me. We need a "donation" for the local protection fund.',
                cost: 20
            };
        }

        this.saveGame();
        console.log(`Phase: ${this.phase} (Day ${this.day}, Event: ${this.morningEvent ? 'Yes' : 'No'})`);
    }

    /**
     * Process quests that return today (multi-day support)
     */
    processReturningQuests() {
        const returning = this.activeQuests.filter(q => q.returnDay <= this.day);

        returning.forEach(quest => {
            // Roll for success based on hero/quest match
            const hero = this.findHeroById(quest.assignedHeroId);
            const success = Math.random() > 0.3; // 70% base (TODO: use MatchFormula)

            let reward = quest.rewards.gold;

            // Apply freelancer cut if applicable
            if (hero && hero.hireType === 'freelance') {
                const cut = Math.floor(reward * (hero.rewardCut || 0.5));
                reward -= cut;
                if (success) {
                    this.dailyLog.expenses.push({
                        source: `${hero.name}'s Cut (50%)`,
                        amount: cut
                    });
                }
            }

            // Log the quest result
            this.dailyLog.questReports.push({
                questId: quest.id,
                name: quest.name,
                heroName: hero ? hero.name : 'Unknown',
                success: success,
                reward: reward
            });

            // Apply rewards if successful
            if (success) {
                this.gold += reward;
                this.dailyLog.income.push({
                    source: `${quest.name} (${hero ? hero.name : '?'})`,
                    amount: reward
                });
            }

            // Update hero status
            if (hero) {
                hero.status = success ? 'IDLE' : 'INJURED';
                hero.busyUntilDay = null;

                // Freelancers leave after their quest
                if (hero.hireType === 'freelance') {
                    this.freelancers = this.freelancers.filter(f => f.id !== hero.id);
                }
            }
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
                const duration = parseInt(quest.duration) || 1;

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

        // 2. Pay Wages (Full-Time Only)
        let totalWages = 20; // Base upkeep
        this.roster.forEach(char => {
            if (char.status !== 'DEAD') {
                totalWages += (char.dailyWage || 10);
            }
        });

        this.gold -= totalWages;
        this.dailyLog.expenses.push({ source: "Daily Upkeep & Wages", amount: totalWages });

        // 3. Transition to Ledger
        this.phase = 'LEDGER';
        this.saveGame();
        return this.dailyLog;
    }

    nextDay() {
        this.day++;
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
            // Quests: still random for variety
            const allQuests = window.GAME_DATA.quests || [];
            this.availableQuests = this.getRandomSubset(allQuests, 4);

            // Characters: DAY-SPECIFIC per UI_DESIGN_SPEC.md
            // Characters have a 'day' field (1-21), cycle through weeks
            const allChars = window.GAME_DATA.characters || [];
            const dayOfCycle = ((this.day - 1) % 21) + 1; // 1-21 repeating

            // Get characters for today (may be multiple on some days like day 10)
            const existingIds = [...this.roster, ...this.freelancers].map(c => c.id);
            const todaysCharacters = allChars.filter(c =>
                c.day === dayOfCycle && !existingIds.includes(c.id)
            );

            // Also check for unlock conditions (legendary characters)
            const unlockedChars = todaysCharacters.filter(c => {
                if (!c.unlockCondition) return true;
                const { questsCompleted, goldSaved } = c.unlockCondition;
                // TODO: Track total quests completed
                const meetsGold = !goldSaved || this.gold >= goldSaved;
                return meetsGold;
            });

            this.availableHires = unlockedChars;
            console.log(`Day ${this.day} (Cycle Day ${dayOfCycle}): ${unlockedChars.length} adventurer(s) available`);
        }
    }

    getRandomSubset(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
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
            availableHires: this.availableHires,
            morningEvent: this.morningEvent
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
                this.availableHires = data.availableHires || [];
                this.morningEvent = data.morningEvent || null;

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
