/**
 * Curated 3D asset data for the Trellis 2 3D Experience page.
 * Each entry maps a Trellis 2-generated model to a Land and learning goal.
 *
 * glbUrl       — path to the GLB file (may not exist yet → triggers fallback)
 * fallbackImage — existing character/asset image used when GLB is unavailable
 * fallbackVideo — optional turntable video render
 */

export const heroAsset = {
    id: 'seriphia',
    name: 'Seriphia',
    title: 'The Eternal Learning Mother',
    land: 'The Celestial',
    landColor: '#9C27B0',
    glbUrl: '/assets/3d/seriphia.glb',
    fallbackImage: '/assets/characters/ETERNAL LEARNING MOTHER.png',
    fallbackVideo: null,
    learningTag: 'Guardian & Guide',
    description:
        'Seriphia is the radiant guardian who oversees all seven lands. Her calm, nurturing presence anchors every lesson, guiding children through each stage of their developmental journey.',
    stats: ['Wisdom', 'Patience', 'Nurturing'],
};

export const landAssets = [
    {
        id: 'harmonia-lyreharp',
        name: 'The Lyreharp of Harmonia',
        title: 'Voice of First Words',
        land: 'Harmonia',
        landIcon: '🎵',
        landColor: '#d4a843',
        glbUrl: '/assets/3d/harmonia-lyreharp.glb',
        fallbackImage: '/assets/duos/1_Kenji Aiko.jpg',
        fallbackVideo: null,
        learningTag: 'Language & Manners',
        description:
            'The enchanted Lyreharp resonates with every new word a child speaks. Kenji and Aiko use its melodic strings to unlock phonics, vocabulary, and the art of respectful communication.',
        stats: ['Phonics', 'Vocabulary', 'Manners'],
        learningDesc: 'Master the music of language — phonics, vocabulary songs, and the art of kind communication.',
        characters: 'Kenji & Aiko',
    },
    {
        id: 'numeria-rhythmstone',
        name: 'The Rhythm Stone',
        title: 'Counter of Infinite Beats',
        land: 'Numeria',
        landIcon: '🔢',
        landColor: '#7fb685',
        glbUrl: '/assets/3d/numeria-rhythmstone.glb',
        fallbackImage: '/assets/duos/5_Kwame Octavia.jpg',
        fallbackVideo: null,
        learningTag: 'Numbers & Mathematics',
        description:
            'The Rhythm Stone pulses with mathematical patterns. Each beat carries a number, each pattern a formula — Kwame and Octavia transform counting into rhythmic adventures.',
        stats: ['Counting', 'Patterns', 'Early Math'],
        learningDesc: 'Discover the rhythm of numbers — counting, patterns, and mathematical foundations through musical beats.',
        characters: 'Kwame & Octavia',
    },
    {
        id: 'vitalis-dancetotem',
        name: 'The Dance Totem',
        title: 'Pillar of Movement',
        land: 'Vitalis',
        landIcon: '🤸',
        landColor: '#c4785a',
        glbUrl: '/assets/3d/vitalis-dancetotem.glb',
        fallbackImage: '/assets/duos/3_Felix Amara.jpg',
        fallbackVideo: null,
        learningTag: 'Physical & Motor Skills',
        description:
            'The Dance Totem channels boundless energy into coordinated movement. Felix and Amara use it to build strong physical foundations through joyful, musical dance.',
        stats: ['Motor Skills', 'Coordination', 'Dance'],
        learningDesc: 'Build strength and coordination through rhythmic movement, dance, and body awareness exercises.',
        characters: 'Felix & Amara',
    },
    {
        id: 'chronia-hourglass',
        name: 'The Celestial Hourglass',
        title: 'Keeper of Seasons',
        land: 'Chronia',
        landIcon: '⏰',
        landColor: '#9678c4',
        glbUrl: '/assets/3d/chronia-hourglass.glb',
        fallbackImage: '/assets/duos/6_Elias Selene.jpg',
        fallbackVideo: null,
        learningTag: 'Time & Seasons',
        description:
            'The Celestial Hourglass measures not just minutes, but the rhythm of seasons. Elias and Selene use its flowing sands to make the abstract flow of time tangible.',
        stats: ['Days & Months', 'Seasons', 'Routines'],
        learningDesc: 'Understand the rhythm of time — days, months, seasons, and routines become musical compositions.',
        characters: 'Elias & Selene',
    },
    {
        id: 'lexiconia-quill',
        name: 'The Sonic Quill',
        title: 'Sculptor of Sound',
        land: 'Lexiconia',
        landIcon: '📖',
        landColor: '#d4a843',
        glbUrl: '/assets/3d/lexiconia-quill.glb',
        fallbackImage: '/assets/duos/7_Ronan Nerissa.jpg',
        fallbackVideo: null,
        learningTag: 'Advanced Language',
        description:
            'The Sonic Quill transforms difficult phonemes into beautiful words. Ronan and Nerissa wield it to sculpt complex sounds into conquerable melodies.',
        stats: ['Phonemes', 'Reading', 'Expression'],
        learningDesc: 'Tackle advanced phonics and reading — challenging sounds become melodic adventures to master.',
        characters: 'Ronan & Nerissa',
    },
    {
        id: 'geometria-compass',
        name: 'The Starlight Compass',
        title: 'Navigator of Form',
        land: 'Geometria',
        landIcon: '📐',
        landColor: '#7fb685',
        glbUrl: '/assets/3d/geometria-compass.glb',
        fallbackImage: '/assets/duos/2_Silas Vesta.jpg',
        fallbackVideo: null,
        learningTag: 'Shapes & Spatial Reasoning',
        description:
            'The Starlight Compass reveals geometry hidden in nature and music. Silas and Vesta use it to navigate spatial relationships and discover the mathematical beauty of form.',
        stats: ['Shapes', 'Spatial', 'Geometry'],
        learningDesc: 'Explore shapes, spatial reasoning, and the geometric patterns woven into the world around us.',
        characters: 'Silas & Vesta',
    },
    {
        id: 'natura-shell',
        name: 'The Echo Shell',
        title: 'Listener of Nature',
        land: 'Natura',
        landIcon: '🌊',
        landColor: '#5ba4c9',
        glbUrl: '/assets/3d/natura-shell.glb',
        fallbackImage: '/assets/duos/4_Ezra Athena.jpg',
        fallbackVideo: null,
        learningTag: 'Science & Nature',
        description:
            'The Echo Shell captures every sound in nature — the rain, the ocean, the heartbeat. Ezra and Athena listen through it to illuminate the wonders of science.',
        stats: ['Body', 'Nature', 'Discovery'],
        learningDesc: 'Listen to what nature teaches — the body, the ocean, and every natural phenomenon becomes a musical lesson.',
        characters: 'Ezra & Athena',
    },
];

export const allAssets = [heroAsset, ...landAssets];
