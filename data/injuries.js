/**
 * injuries.js - Injury System Data
 * 
 * Injuries are now specific, narrative-rich, and have lasting consequences.
 * Each injury has:
 * - bodyPart: Where they got hurt (affects future quests)
 * - narrative: Story text for how it happened
 * - recovery: Days to heal
 * - statPenalty: Temporary stat reduction while injured
 * - scarChance: Chance this becomes a permanent scar (visual tell + minor effect)
 */

window.GAME_DATA = window.GAME_DATA || {};

// === INJURY TYPES BY SEVERITY ===
window.GAME_DATA.injuries = {
    // MINOR - Heal quickly, no lasting effects
    minor: [
        {
            id: 'bruised_ribs',
            label: 'Bruised Ribs',
            bodyPart: 'torso',
            narrative: '{hero} took a hard blow to the chest but kept fighting.',
            recovery: 1,
            statPenalty: { vit: -1 },
            scarChance: 0
        },
        {
            id: 'twisted_ankle',
            label: 'Twisted Ankle',
            bodyPart: 'leg',
            narrative: '{hero} stumbled on rough terrain and twisted their ankle.',
            recovery: 1,
            statPenalty: { dex: -1 },
            scarChance: 0
        },
        {
            id: 'cut_hand',
            label: 'Cut Hand',
            bodyPart: 'arm',
            narrative: '{hero} got a nasty cut on their sword hand.',
            recovery: 1,
            statPenalty: { str: -1 },
            scarChance: 0.05
        },
        {
            id: 'black_eye',
            label: 'Black Eye',
            bodyPart: 'head',
            narrative: '{hero} caught a fist to the face. The swelling will go down.',
            recovery: 1,
            statPenalty: { int: -1 },
            scarChance: 0
        }
    ],

    // MODERATE - Take longer, small scar chance
    moderate: [
        {
            id: 'deep_gash',
            label: 'Deep Gash',
            bodyPart: 'torso',
            narrative: '{hero} took a blade across the stomach. It will need stitches.',
            recovery: 2,
            statPenalty: { vit: -2, str: -1 },
            scarChance: 0.15
        },
        {
            id: 'sprained_arm',
            label: 'Sprained Arm',
            bodyPart: 'arm',
            narrative: '{hero}\'s arm was wrenched at a bad angle. Needs rest.',
            recovery: 2,
            statPenalty: { str: -2, dex: -1 },
            scarChance: 0
        },
        {
            id: 'concussion',
            label: 'Concussion',
            bodyPart: 'head',
            narrative: '{hero} took a nasty blow to the head. Their vision swims.',
            recovery: 2,
            statPenalty: { int: -2, dex: -1 },
            scarChance: 0.1
        },
        {
            id: 'arrow_wound',
            label: 'Arrow Wound',
            bodyPart: 'leg',
            narrative: 'An arrow found its mark in {hero}\'s thigh. The healer removed it.',
            recovery: 2,
            statPenalty: { dex: -2, vit: -1 },
            scarChance: 0.2
        }
    ],

    // MAJOR - Long recovery, significant scar chance
    major: [
        {
            id: 'fractured_arm',
            label: 'Fractured Arm',
            bodyPart: 'arm',
            narrative: '{hero}\'s arm was broken in the fight. It will take weeks to heal properly.',
            recovery: 4,
            statPenalty: { str: -3, dex: -2 },
            scarChance: 0.25
        },
        {
            id: 'internal_bleeding',
            label: 'Internal Bleeding',
            bodyPart: 'torso',
            narrative: '{hero} suffered internal injuries. The healer says they\'re lucky to be alive.',
            recovery: 4,
            statPenalty: { vit: -3, str: -2 },
            scarChance: 0.3
        },
        {
            id: 'skull_fracture',
            label: 'Skull Fracture',
            bodyPart: 'head',
            narrative: '{hero}\'s skull was cracked. They keep forgetting things.',
            recovery: 5,
            statPenalty: { int: -3, dex: -2 },
            scarChance: 0.35
        },
        {
            id: 'shattered_leg',
            label: 'Shattered Leg',
            bodyPart: 'leg',
            narrative: '{hero}\'s leg was crushed. They may walk with a limp forever.',
            recovery: 5,
            statPenalty: { dex: -4, vit: -1 },
            scarChance: 0.4
        }
    ],

    // CRITICAL - Near death, high scar chance
    critical: [
        {
            id: 'severed_finger',
            label: 'Severed Finger',
            bodyPart: 'arm',
            narrative: '{hero} lost a finger in the battle. It cannot grow back.',
            recovery: 3,
            statPenalty: { dex: -2 },
            scarChance: 1.0, // Always becomes a permanent visual tell
            permanentEffect: { dex: -1 }
        },
        {
            id: 'blinded_eye',
            label: 'Blinded Eye',
            bodyPart: 'head',
            narrative: '{hero}\'s eye was destroyed. Their depth perception is ruined.',
            recovery: 4,
            statPenalty: { dex: -3, int: -2 },
            scarChance: 1.0,
            permanentEffect: { dex: -1 }
        },
        {
            id: 'maimed_hand',
            label: 'Maimed Hand',
            bodyPart: 'arm',
            narrative: '{hero}\'s hand was mangled. They may never grip a sword the same way.',
            recovery: 5,
            statPenalty: { str: -3, dex: -3 },
            scarChance: 0.8,
            permanentEffect: { str: -1 }
        },
        {
            id: 'near_death',
            label: 'At Death\'s Door',
            bodyPart: 'torso',
            narrative: '{hero} was left for dead. The healer worked through the night.',
            recovery: 7,
            statPenalty: { str: -4, vit: -4, dex: -3, int: -2 },
            scarChance: 0.5,
            permanentEffect: { vit: -1 }
        }
    ]
};

// === SCARS (Permanent Visual Tells from Injuries) ===
window.GAME_DATA.scars = [
    { id: 'facial_scar', label: 'Facial Scar', visualTell: 'A jagged scar across the face' },
    { id: 'limp', label: 'Permanent Limp', visualTell: 'Walks with a noticeable limp' },
    { id: 'missing_finger', label: 'Missing Finger', visualTell: 'Missing a finger on their hand' },
    { id: 'glass_eye', label: 'Glass Eye', visualTell: 'One eye doesn\'t quite match the other' },
    { id: 'burn_marks', label: 'Burn Scars', visualTell: 'Old burn marks on the arms' },
    { id: 'crooked_nose', label: 'Crooked Nose', visualTell: 'Nose has been broken many times' }
];

// === INJURY NARRATIVES BY QUEST TYPE ===
window.GAME_DATA.injuryNarratives = {
    'Monster Hunt': [
        'The beast\'s claws found their mark.',
        'Fangs sank deep before {hero} could react.',
        'A wild thrash caught {hero} off guard.'
    ],
    'Boss Hunt': [
        'The creature\'s power was overwhelming.',
        '{hero} underestimated their foe.',
        'Even in victory, the cost was high.'
    ],
    'Escort': [
        'Bandits struck without warning.',
        'The ambush was well-planned.',
        '{hero} took the blow meant for the client.'
    ],
    'Stealth': [
        'The guards were more alert than expected.',
        'An alarm triggered a desperate fight.',
        'Escape came at a cost.'
    ],
    'Retrieval': [
        'A trap sprung unexpectedly.',
        'Ancient guardians still protected the prize.',
        'The journey back was harder than expected.'
    ]
};

console.log('💊 Injury System loaded:',
    Object.values(window.GAME_DATA.injuries).flat().length,
    'unique injuries');
