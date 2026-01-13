/**
 * adventurer_dialogue.js - Random First Impression Lines
 * 
 * When an adventurer approaches your desk, they say something random.
 * These are completely random - not tied to traits or class.
 * Makes each encounter feel unique and gives personality.
 */

window.GAME_DATA = window.GAME_DATA || {};

// === GREETINGS (First thing they say) ===
window.GAME_DATA.adventurerGreetings = [
    // Confident
    "You won't find anyone better than me. Trust me.",
    "I've killed things you've only heard of in stories.",
    "My sword arm is the fastest in three kingdoms.",
    "I heard you're looking for quality. Here I am.",
    "Name a monster. I've probably killed it twice.",

    // Humble/Nervous
    "I... I hope I'm not wasting your time.",
    "First time at a guild. Is this where I sign up?",
    "My mother said I should find honest work...",
    "I'm not the strongest, but I always come back.",
    "Just looking for a chance to prove myself.",

    // Mysterious
    "Don't ask about my past. It stays buried.",
    "I go by many names. Pick one you like.",
    "The less you know about me, the better we'll get along.",
    "Some doors should stay closed. I open them anyway.",
    "I've seen things. Things I can't unsee.",

    // Mercenary/Practical
    "Gold talks. Everything else walks.",
    "How dangerous? How much gold? That's all I need to know.",
    "I don't do loyalty. I do contracts.",
    "Pay me well and I'll make your problems disappear.",
    "Let's skip the small talk. What's the job?",

    // Friendly
    "Always nice to meet a fellow professional!",
    "Heard good things about this guild. Hope they're true!",
    "Buy me a drink later and I'll tell you some stories.",
    "You look like someone who knows talent when they see it.",
    "I like the vibe here. Cozy place you've got.",

    // Weary/Experienced
    "Another guild, another chance to die for coin.",
    "I've outlived three guild masters. Hope you last longer.",
    "The scars? Each one has a story. None of them are fun.",
    "Just point me at something that needs killing.",
    "I'm too old for glory. Just give me steady work.",

    // Eccentric
    "The voices said I'd find work here. Were they right?",
    "I once punched a dragon. It was a small dragon. Still counts.",
    "Do you validate parking? ...I don't have a horse, just asking.",
    "My last guild burned down. Wasn't my fault. Mostly.",
    "I can juggle! ...No? Not relevant? Okay, moving on.",

    // Eager/Young
    "This is going to be so EPIC! When do we start?",
    "I've trained my whole life for this moment!",
    "My village is counting on me. I won't let them down.",
    "I want to be a legend! Is that too much to ask?",
    "I've read every hero story. Now I'm living one!",

    // Gruff/Short
    "Talk fast. I'm busy.",
    "Hmph.",
    "...Well? Are we doing this or not?",
    "I don't shake hands. Nothing personal.",
    "Less talking. More working.",

    // Philosophical
    "Every quest is a journey within, don't you think?",
    "To adventure is to court death and call it living.",
    "The coin is nice, but the stories? Those last forever.",
    "We're all just trying to leave a mark before we're dust.",
    "I seek not glory, but purpose. Can you provide that?"
];

// === DEPARTURE LINES (When rejected) ===
window.GAME_DATA.adventurerRejections = [
    "Your loss.",
    "Fine. Their loss is someone else's gain.",
    "I didn't want to work here anyway.",
    "You'll regret this when you hear about my deeds.",
    "Suit yourself.",
    "*shrugs and walks away*",
    "May your standards serve you well.",
    "I suppose I'll try the guild across town.",
    "*mutters something under their breath*",
    "Next time, then."
];

// === ACCEPTANCE LINES (When hired) ===
window.GAME_DATA.adventurerAcceptances = [
    "Wise choice. You won't regret this.",
    "Finally, someone with sense!",
    "I'll make you proud.",
    "Point me at the problem.",
    "Let's get to work.",
    "Consider your enemies already dead.",
    "A new chapter begins!",
    "I'll earn every coin. That's a promise.",
    "You've got yourself a deal.",
    "Just tell me where to go."
];

console.log('💬 Adventurer Dialogue loaded:',
    window.GAME_DATA.adventurerGreetings.length, 'greetings');
