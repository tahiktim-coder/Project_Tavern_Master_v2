/**
 * ContentLoader.js
 * Ensures all game data is loaded and validated before the game starts.
 */
const ContentLoader = {
    async init() {
        console.log("Loading Content...");

        return new Promise((resolve, reject) => {
            // In our current no-build setup, data is loaded via <script> tags in index.html
            // creating window.GAME_DATA.

            // We just need to verify it exists.
            const checkInterval = setInterval(() => {
                if (window.GAME_DATA &&
                    window.GAME_DATA.classes &&
                    window.GAME_DATA.quests) {

                    clearInterval(checkInterval);
                    console.log("Content Loaded Successfully.");
                    this.enrichData();
                    resolve(true);
                }
            }, 100);

            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkInterval);
                if (!window.GAME_DATA) {
                    console.error("Failed to load GAME_DATA.");
                    reject("Data Load Timeout");
                }
            }, 5000);
        });
    },

    /**
     * Post-processing to link IDs to objects if needed.
     */
    enrichData() {
        // future: link classId to class object in characters
    }
};

window.ContentLoader = ContentLoader;
