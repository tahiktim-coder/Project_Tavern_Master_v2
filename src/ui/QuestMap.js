/**
 * QuestMap.js - Visual Adventure Progress Map
 * 
 * Displays a stylized map showing adventurers on their quest journeys.
 * Each active quest shows as a path from the guild to the destination,
 * with the adventurer's position indicating progress.
 */

class QuestMap {
    constructor() {
        // Map colors for different quest ranks
        this.RANK_COLORS = {
            'S': '#9C27B0',
            'A': '#F44336',
            'B': '#FF9800',
            'C': '#4CAF50',
            'D': '#2196F3',
            'F': '#9E9E9E'
        };

        // Quest type icons
        this.QUEST_ICONS = {
            'monster_hunt': '🐉',
            'Monster Hunt': '🐉',
            'escort': '🛡️',
            'Escort': '🛡️',
            'retrieval': '📦',
            'Retrieval': '📦',
            'stealth': '🗡️',
            'Stealth': '🗡️',
            'boss_hunt': '💀',
            'Boss Hunt': '💀',
            'default': '⚔️'
        };
    }

    /**
     * Render the quest map showing active adventurer progress
     * @param {Array} activeQuests - Quests currently in progress
     * @param {Object} gameState - Reference to GameState for finding heroes
     * @param {number} currentDay - Current game day
     * @returns {string} HTML string for the map
     */
    render(activeQuests, gameState, currentDay) {
        if (!activeQuests || activeQuests.length === 0) {
            return this.renderEmptyMap();
        }

        let html = `
            <div class="quest-map" style="
                background: linear-gradient(135deg, #1a1208 0%, #2d2015 50%, #1a1208 100%);
                border: 3px solid #5d4037;
                border-radius: 8px;
                padding: 20px;
                margin: 15px 0;
                position: relative;
                min-height: 120px;
                box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
            ">
                <div style="
                    text-align: center;
                    font-family: var(--font-display);
                    color: #d4af37;
                    font-size: 1rem;
                    margin-bottom: 15px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                ">🗺️ ADVENTURE MAP</div>
                
                <!-- Guild marker (center-left) -->
                <div style="
                    position: absolute;
                    left: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    text-align: center;
                    z-index: 10;
                ">
                    <div style="font-size: 2rem;">🏰</div>
                    <div style="font-size: 0.7rem; color: #aaa;">Guild</div>
                </div>
                
                <!-- Quest paths container -->
                <div style="
                    margin-left: 80px;
                    margin-right: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                ">
        `;

        activeQuests.forEach((quest, index) => {
            const hero = gameState.findHeroById(quest.assignedHeroId);
            if (!hero) return;

            const progress = this.calculateProgress(quest.startedDay, quest.returnDay, currentDay);
            const pathColor = this.RANK_COLORS[quest.rank] || '#4CAF50';
            const questIcon = this.QUEST_ICONS[quest.type] || this.QUEST_ICONS['default'];

            html += this.renderQuestPath(quest, hero, progress, pathColor, questIcon);
        });

        html += `
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Calculate quest progress as percentage (0-100)
     */
    calculateProgress(startDay, returnDay, currentDay) {
        const totalDuration = returnDay - startDay;
        if (totalDuration <= 0) return 100;

        const elapsed = currentDay - startDay;
        const progress = (elapsed / totalDuration) * 100;

        return Math.min(100, Math.max(0, progress));
    }

    /**
     * Render a single quest path with adventurer marker
     */
    renderQuestPath(quest, hero, progress, pathColor, questIcon) {
        const duration = quest.returnDay - quest.startedDay;
        const daysRemaining = quest.returnDay - (quest.startedDay + Math.floor(progress / 100 * duration));

        return `
            <div style="
                background: rgba(0,0,0,0.3);
                border-radius: 6px;
                padding: 10px 15px;
                position: relative;
            ">
                <!-- Quest info header -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                ">
                    <span style="color: #fff; font-weight: bold; font-size: 0.85rem;">
                        ${hero.name} → ${quest.name}
                    </span>
                    <span style="
                        background: ${pathColor};
                        color: white;
                        padding: 2px 8px;
                        border-radius: 3px;
                        font-size: 0.7rem;
                        font-weight: bold;
                    ">${quest.rank}</span>
                </div>
                
                <!-- Progress track -->
                <div style="
                    height: 24px;
                    background: linear-gradient(to right, #3e2723, #5d4037);
                    border-radius: 12px;
                    position: relative;
                    border: 2px solid #4e342e;
                    overflow: visible;
                ">
                    <!-- Path line (dashed) -->
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 5%;
                        right: 5%;
                        height: 2px;
                        background: repeating-linear-gradient(
                            to right,
                            ${pathColor} 0px,
                            ${pathColor} 8px,
                            transparent 8px,
                            transparent 16px
                        );
                        transform: translateY(-50%);
                    "></div>
                    
                    <!-- Destination marker -->
                    <div style="
                        position: absolute;
                        right: -5px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 1.2rem;
                    ">${questIcon}</div>
                    
                    <!-- Adventurer marker (positioned by progress) -->
                    <div style="
                        position: absolute;
                        left: calc(${Math.min(progress, 90)}% - 12px);
                        top: 50%;
                        transform: translateY(-50%);
                        width: 24px;
                        height: 24px;
                        background: ${pathColor};
                        border-radius: 50%;
                        border: 2px solid #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.8rem;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
                        transition: left 0.5s ease;
                    ">🧙</div>
                </div>
                
                <!-- Progress text -->
                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                    font-size: 0.7rem;
                    color: #888;
                ">
                    <span>Day ${quest.startedDay}</span>
                    <span style="color: ${pathColor};">${Math.round(progress)}% complete</span>
                    <span>Returns Day ${quest.returnDay}</span>
                </div>
            </div>
        `;
    }

    /**
     * Render empty map state
     */
    renderEmptyMap() {
        return `
            <div class="quest-map" style="
                background: linear-gradient(135deg, #1a1208 0%, #2d2015 50%, #1a1208 100%);
                border: 3px solid #5d4037;
                border-radius: 8px;
                padding: 20px;
                margin: 15px 0;
                text-align: center;
                box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
            ">
                <div style="font-size: 1.5rem; margin-bottom: 10px;">🗺️</div>
                <div style="color: #888; font-style: italic;">
                    No adventurers are currently on quests.
                </div>
            </div>
        `;
    }
}

// Export as singleton
window.QuestMap = new QuestMap();
