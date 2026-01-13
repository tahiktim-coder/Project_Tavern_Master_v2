/**
 * ChoiceEventSystem.js - Reigns-style Binary Choice Events
 * 
 * Creates dramatic decision moments with meaningful consequences.
 * Events trigger during game phases and affect gold, reputation, and story flags.
 */

class ChoiceEventSystem {
    constructor() {
        // Track which events have been seen/triggered
        this.eventHistory = [];

        // Flags set by previous choices (for cascading events)
        this.storyFlags = {};

        // Currently active event (if any)
        this.activeEvent = null;

        // Cooldown tracking (prevent same event too soon)
        this.eventCooldowns = {};
    }

    /**
     * Check if an event should trigger for the current phase
     * @param {string} phase - Current game phase (MORNING, TOWN_HALL, EVENING, etc.)
     * @param {Object} gameState - Reference to GameState
     * @returns {Object|null} Event to trigger, or null
     */
    checkForEvent(phase, gameState) {
        if (!window.CHOICE_EVENTS) return null;

        // Filter events valid for this phase
        const validEvents = window.CHOICE_EVENTS.filter(event => {
            // Phase match
            if (event.phase !== phase) return false;

            // Day requirement
            if (event.conditions?.minDay && gameState.day < event.conditions.minDay) return false;
            if (event.conditions?.maxDay && gameState.day > event.conditions.maxDay) return false;

            // Gold requirement
            if (event.conditions?.minGold && gameState.gold < event.conditions.minGold) return false;

            // Reputation requirements
            if (event.conditions?.minTownRep && gameState.reputation.town < event.conditions.minTownRep) return false;
            if (event.conditions?.minCrownRep && gameState.reputation.crown < event.conditions.minCrownRep) return false;

            // Required story flags
            if (event.conditions?.requiresFlag && !this.storyFlags[event.conditions.requiresFlag]) return false;

            // Blocking flags (event won't trigger if flag is set)
            if (event.conditions?.blockedByFlag && this.storyFlags[event.conditions.blockedByFlag]) return false;

            // Cooldown check
            const lastTriggered = this.eventCooldowns[event.id];
            if (lastTriggered && gameState.day - lastTriggered < (event.cooldownDays || 5)) return false;

            // One-time events
            if (event.oneTime && this.eventHistory.includes(event.id)) return false;

            return true;
        });

        if (validEvents.length === 0) return null;

        // Roll for each valid event
        for (const event of validEvents) {
            const roll = Math.random();
            if (roll < (event.probability || 0.15)) {
                this.activeEvent = event;
                this.eventCooldowns[event.id] = gameState.day;
                return event;
            }
        }

        return null;
    }

    /**
     * Apply the consequences of a choice
     * @param {number} choiceIndex - Which choice was selected (0 or 1)
     * @param {Object} gameState - Reference to GameState
     * @returns {Object} Result summary
     */
    applyChoice(choiceIndex, gameState) {
        if (!this.activeEvent) return { success: false, message: 'No active event' };

        const choice = this.activeEvent.choices[choiceIndex];
        if (!choice) return { success: false, message: 'Invalid choice' };

        const effects = choice.effects || {};
        const results = {
            success: true,
            eventId: this.activeEvent.id,
            choiceText: choice.text,
            appliedEffects: []
        };

        // Apply gold changes
        if (effects.gold) {
            gameState.gold += effects.gold;
            results.appliedEffects.push({ type: 'gold', amount: effects.gold });

            // Log to daily expenses/income
            if (effects.gold > 0) {
                gameState.dailyLog.income.push({
                    source: `Event: ${this.activeEvent.title}`,
                    amount: effects.gold
                });
            } else {
                gameState.dailyLog.expenses.push({
                    source: `Event: ${this.activeEvent.title}`,
                    amount: Math.abs(effects.gold)
                });
            }
        }

        // Apply town reputation changes
        if (effects.townRep) {
            gameState.reputation.town = Math.max(0, Math.min(100,
                gameState.reputation.town + effects.townRep));
            results.appliedEffects.push({ type: 'townRep', amount: effects.townRep });
        }

        // Apply crown reputation changes
        if (effects.crownRep) {
            gameState.reputation.crown = Math.max(0, Math.min(100,
                gameState.reputation.crown + effects.crownRep));
            results.appliedEffects.push({ type: 'crownRep', amount: effects.crownRep });
        }

        // Set story flags
        if (effects.addFlag) {
            this.storyFlags[effects.addFlag] = true;
            results.appliedEffects.push({ type: 'flag', flag: effects.addFlag });
        }

        // Remove story flags
        if (effects.removeFlag) {
            delete this.storyFlags[effects.removeFlag];
            results.appliedEffects.push({ type: 'removeFlag', flag: effects.removeFlag });
        }

        // Record in history
        this.eventHistory.push(this.activeEvent.id);

        // Log to daily events
        if (!gameState.dailyLog.events) {
            gameState.dailyLog.events = [];
        }
        gameState.dailyLog.events.push({
            type: 'choice_event',
            eventId: this.activeEvent.id,
            title: this.activeEvent.title,
            choiceIndex: choiceIndex,
            choiceText: choice.text,
            effects: results.appliedEffects
        });

        // Clear active event
        this.activeEvent = null;

        // Save game state
        gameState.saveGame();

        return results;
    }

    /**
     * Get save data for persistence
     */
    getSaveData() {
        return {
            eventHistory: this.eventHistory,
            storyFlags: this.storyFlags,
            eventCooldowns: this.eventCooldowns
        };
    }

    /**
     * Load from save data
     */
    loadSaveData(data) {
        if (data) {
            this.eventHistory = data.eventHistory || [];
            this.storyFlags = data.storyFlags || {};
            this.eventCooldowns = data.eventCooldowns || {};
        }
    }

    /**
     * Reset for new game
     */
    reset() {
        this.eventHistory = [];
        this.storyFlags = {};
        this.eventCooldowns = {};
        this.activeEvent = null;
    }
}

// Create singleton and expose globally
window.ChoiceEventSystem = new ChoiceEventSystem();
