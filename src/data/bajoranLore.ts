import { BajoranArchetype, EarCuffStyle, TemporalEpoch, SacredOrb, BajoranGlyph } from '../types';

export const SACRED_ORBS: SacredOrb[] = [
  {
    id: 'orb-of-time',
    name: 'Orb of Time',
    bajoranName: "Pagh-tem'far",
    title: 'Tear of the Prophets: The Continuum',
    power: 'Transcends temporal boundaries, allows passage across epochs and glimpses of destiny.',
    discoveryDate: 'Discovered in 9th Century B.C.E. in Ashalla Valley',
    glowColor: '#38bdf8', // radiant celestial cyan
    secondaryColor: '#f59e0b', // warm golden ark
    quote: 'The timeline is not a straight corridor, but a garden cultivated by the Prophets.',
    description: 'The most revered relic for traversing the tapestry of existence. Those who peer into its hourglass core experience non-linear visions of the past and future.'
  },
  {
    id: 'orb-of-prophecy',
    name: 'Orb of Prophecy and Change',
    bajoranName: 'Pagh-nor',
    title: 'Tear of the Prophets: Vision of Destiny',
    power: 'Reveals forthcoming crises, the arrival of the Emissary, and spiritual trials.',
    discoveryDate: 'Found 16th Century B.C.E.',
    glowColor: '#ec4899',
    secondaryColor: '#f59e0b',
    quote: 'When the Celestial Temple opens, the Emissary of the Prophets shall walk among us.',
    description: 'Brought forth during the dawn of Bajoran spiritual enlightenment, foretelling the great union of the people and the trial of the Pagh-wraiths.'
  },
  {
    id: 'orb-of-wisdom',
    name: 'Orb of Wisdom',
    bajoranName: 'Pagh-velar',
    title: 'Tear of the Prophets: The Deep Truth',
    power: 'Bestows boundless clarity of thought, moral conviction, and spiritual fortitude.',
    discoveryDate: 'Found in the Temple of Bakhala',
    glowColor: '#a855f7',
    secondaryColor: '#eab308',
    quote: 'To understand the will of the Prophets, one must first silence the turbulence within.',
    description: 'Consulted by High Vedeks and Kais for millennia before rendering pivotal rulings for the spiritual guidance of Bajor.'
  },
  {
    id: 'orb-of-contemplation',
    name: 'Orb of Contemplation',
    bajoranName: 'Pagh-duran',
    title: 'Tear of the Prophets: Inner Horizon',
    power: 'Illuminates the hidden recesses of one’s soul and harmonizes inner discord.',
    discoveryDate: 'Discovered in Janir province',
    glowColor: '#10b981',
    secondaryColor: '#f59e0b',
    quote: 'Look into the light, and see not what you appear to be, but what your Pagh desires.',
    description: 'Reveals reflections of personal truth, stripping away illusions and worldly fears.'
  },
  {
    id: 'orb-of-destiny',
    name: 'Orb of Destiny',
    bajoranName: 'Pagh-alor',
    title: 'Tear of the Prophets: The Loom',
    power: 'Unveils the interwoven fates of individuals and civilizations across the Denorios belt.',
    discoveryDate: 'Recovered from Cardassian custody in 2371',
    glowColor: '#fbbf24',
    secondaryColor: '#6366f1',
    quote: 'Every soul is an unrepeated verse in the hymn of the Celestial Temple.',
    description: 'Cast upon the stars to remind all beings that destiny is an active covenant between faith and action.'
  },
  {
    id: 'orb-of-memory',
    name: 'Orb of Memory',
    bajoranName: 'Pagh-rethor',
    title: 'Tear of the Prophets: Ancestral Chronicle',
    power: 'Unlocks ancestral memories, ancient songs, and lost architectural knowledge of Ashalla.',
    discoveryDate: 'Preserved in the Monastery of Kendra',
    glowColor: '#f97316',
    secondaryColor: '#3b82f6',
    quote: 'The voices of ten thousand generations sing within the celestial glass.',
    description: 'Preserves the living spirit of ancient Bajoran dynasties dating back more than 500,000 years.'
  }
];

export const BAJORAN_ARCHETYPES: BajoranArchetype[] = [
  {
    id: 'vedek',
    name: 'Vedek Spiritual Scholar',
    title: 'Keeper of the Sacred Prophecies',
    description: 'Devoted to contemplation, theological scholarship, and reading the Pagh of all who seek blessing.',
    attire: 'Crimson silk and copper brocade flowing robes with high ceremonial mantle and embroidered Pagh runes.',
    spiritualFocus: 'Harmonizing temple congregations, interpreting Orb visions, and divine counsel.',
    defaultEpoch: 'epoch-ds9',
    iconName: 'Sparkles',
    accentColor: '#e11d48'
  },
  {
    id: 'kai',
    name: 'Kai Supreme Spiritual Leader',
    title: 'Voice of the Prophets on Bajor',
    description: 'The highest religious authority of the Bajoran faith, clad in regal auric vestments and sacred headdress.',
    attire: 'Regal layered burgundy velvet with gold-threaded solar sunbursts, jewel-encrusted pagh pectoral, and ceremonial mitre.',
    spiritualFocus: 'Spiritual leadership of all Bajor, coronation of leaders, and communion with the Emissary.',
    defaultEpoch: 'epoch-ds9',
    iconName: 'Crown',
    accentColor: '#f59e0b'
  },
  {
    id: 'militia-commander',
    name: 'Bajoran Militia Commander',
    title: 'Defender of the Sacred Homeland',
    description: 'A courageous officer upholding the freedom and honor of Bajor, steadfast in duty and faithful in spirit.',
    attire: 'Terracotta and earth-toned tailored tactical uniform with Bajoran Militia rank pin and leather duty harness.',
    spiritualFocus: 'Protection of holy shrines, safeguarding Denorios trade corridors, and military discipline.',
    defaultEpoch: 'epoch-ds9',
    iconName: 'Shield',
    accentColor: '#ea580c'
  },
  {
    id: 'artisan',
    name: 'Master Artisan of Ashalla',
    title: 'Creator of Holy Reliquaries',
    description: 'Weaver of sacred textiles, carver of temple spires, and jeweler of d’ja pagh ear heirlooms.',
    attire: 'Earth-toned woven tunic with lapis and amber beadwork, artisan apron, and engraved drafting stylus.',
    spiritualFocus: 'Preservation of Bajoran artistic heritage and crafting vessels worthy of the Orbs.',
    defaultEpoch: 'epoch-ancient',
    iconName: 'Palette',
    accentColor: '#059669'
  },
  {
    id: 'orb-custodian',
    name: 'Orb Custodian & Seer',
    title: 'Guardian of the Celestial Reliquaries',
    description: 'Initiated in the sacred rites of unsealing the Tears of the Prophets within the inner sanctum.',
    attire: 'Deep midnight indigo and gold starlight hooded vestments with consecrated copper unsealing tongs.',
    spiritualFocus: 'Safekeeping the Orbs, recording temporal anomalies, and chanting the diurnal litany.',
    defaultEpoch: 'epoch-celestial',
    iconName: 'Eye',
    accentColor: '#8b5cf6'
  },
  {
    id: 'emissary-liaison',
    name: 'Celestial Temple Diplomat',
    title: 'Federation & Bajoran Alliance Envoy',
    description: 'Bridging the cosmic realm of the Prophets with the broader interstellar quadrant.',
    attire: 'Starfleet officer uniform seamlessly integrated with traditional Bajoran ceremonial sash and d’ja pagh earring.',
    spiritualFocus: 'Diplomatic unity, scientific study of the wormhole, and honoring ancient prophecies.',
    defaultEpoch: 'epoch-ds9',
    iconName: 'Globe',
    accentColor: '#0284c7'
  }
];

export const EAR_CUFF_STYLES: EarCuffStyle[] = [
  {
    id: 'ashalla-filigree',
    name: 'Ashalla Solar Filigree',
    lineage: 'House of the Dawn Province',
    description: 'Interwoven gold spirals cradling a radiant amber drop, representing family devotion and spiritual clarity.',
    material: '24k Bajoran Solar Gold',
    gemstone: 'Ashalla Amber',
    chainCount: 2
  },
  {
    id: 'temple-tri-chain',
    name: 'Sanctuary Tri-Chain of the Prophets',
    lineage: 'Monastery of Kendra Order',
    description: 'Three delicate gold chains linked to a temple bell clasp, chiming softly with the breath of the wearer.',
    material: 'Copper-Alloy Temple Gold',
    gemstone: 'Denorios Wormhole Opal',
    chainCount: 3
  },
  {
    id: 'militia-honor-clasp',
    name: 'Resistance Vanguard Clasp',
    lineage: 'Shakaar Resistance & Militia',
    description: 'Sleek angular platinum and burnished bronze, bearing the carved insignia of Bajoran liberation.',
    material: 'Tritanium & Burnished Bronze',
    gemstone: 'None (Honor Inscription)',
    chainCount: 1
  },
  {
    id: 'seer-celestial-cascade',
    name: 'Celestial Cascade of Time',
    lineage: 'Order of the Temporal Seers',
    description: 'Cascading miniature hourglass motifs with micro-crystals that glint like starlight in the Denorios belt.',
    material: 'Electrum & Celestial Silver',
    gemstone: 'Starlight Spinel',
    chainCount: 4
  }
];

export const TEMPORAL_EPOCHS: TemporalEpoch[] = [
  {
    id: 'epoch-ds9',
    name: '24th Century DS9 & Dominion Era',
    stardate: 'Stardate 48000 - 52000 (2371-2375)',
    era: 'The Golden Reclamation',
    description: 'Station Deep Space Nine guards the entrance to the Celestial Temple as the Emissary fulfills ancient prophecies.'
  },
  {
    id: 'epoch-ancient',
    name: 'Ancient First Dynasty of Bajor',
    stardate: '10,000 BCE - 5,000 BCE',
    era: 'The Age of Great Architects',
    description: 'Sailing across the stars in solar-sail vessels, building magnificent sandstone temples across the lush planet of Bajor.'
  },
  {
    id: 'epoch-resistance',
    name: 'Occupation Resistance Era',
    stardate: '2340 - 2369',
    era: 'The Fire of the Pagh',
    description: 'Defending the sacred soil and temples against Cardassian oppressors, keeping the light of the Prophets burning in secret.'
  },
  {
    id: 'epoch-celestial',
    name: 'The Timeless Realm of the Prophets',
    stardate: 'Non-Linear Continuum',
    era: 'The Denorios Nexus',
    description: 'Inside the Celestial Temple wormhole where past, present, and future coalesce into pure divine consciousness.'
  }
];

export const BAJORAN_GLYPHS: BajoranGlyph[] = [
  {
    char: 'P',
    bajoranName: 'Pagh',
    meaning: 'Life force, spiritual essence, inner soul resonance',
    phonetic: 'PAH-gh',
    element: 'Pagh',
    svgPath: 'M12 2 L22 12 L18 20 L6 20 L2 12 Z M12 6 L16 12 L12 16 L8 12 Z M12 2 L12 22'
  },
  {
    char: 'T',
    bajoranName: 'Tem',
    meaning: 'Time, temporal flux, eternal cycles',
    phonetic: 'TEM',
    element: 'Time',
    svgPath: 'M4 4 L20 4 L14 12 L20 20 L4 20 L10 12 Z M12 4 L12 20'
  },
  {
    char: 'O',
    bajoranName: 'Orb (Koran)',
    meaning: 'Tear of the Prophets, holy vessel of illumination',
    phonetic: 'KOH-rahn',
    element: 'Light',
    svgPath: 'M12 2 C18 2 22 7 22 12 C22 18 17 22 12 22 C6 22 2 18 2 12 C2 6 6 2 12 2 Z M12 7 C15 7 17 9 17 12 C17 15 15 17 12 17 C9 17 7 15 7 12 C7 9 9 7 12 7 Z'
  },
  {
    char: 'B',
    bajoranName: 'Boranat',
    meaning: 'Sanctuary, sacred temple hearth, holy refuge',
    phonetic: 'boh-rah-NAHT',
    element: 'Celestial',
    svgPath: 'M12 2 L22 10 L22 22 L2 22 L2 10 Z M12 6 L18 11 L18 20 L6 20 L6 11 Z'
  },
  {
    char: 'E',
    bajoranName: 'Emissary (Karan)',
    meaning: 'The Chosen One who walks with the Prophets',
    phonetic: 'KAH-rahn',
    element: 'Prophecy',
    svgPath: 'M12 2 L16 8 L22 8 L18 13 L20 20 L12 16 L4 20 L6 13 L2 8 L8 8 Z'
  },
  {
    char: 'V',
    bajoranName: 'Vedek',
    meaning: 'Teacher of faith, custodian of scripture',
    phonetic: 'veh-DEHK',
    element: 'Spirit',
    svgPath: 'M12 2 L20 18 L12 22 L4 18 Z M12 6 L16 16 L12 18 L8 16 Z M12 2 L12 22'
  },
  {
    char: 'K',
    bajoranName: 'Kai',
    meaning: 'Supreme light, summit of devotion, crown of Bajor',
    phonetic: 'KYE',
    element: 'Celestial',
    svgPath: 'M4 6 L12 2 L20 6 L18 22 L6 22 Z M8 10 L12 6 L16 10 L15 18 L9 18 Z M12 2 L12 22'
  },
  {
    char: 'D',
    bajoranName: 'Denorios',
    meaning: 'The celestial belt, realm of the wormhole',
    phonetic: 'deh-noh-REE-ohs',
    element: 'Light',
    svgPath: 'M2 12 C6 4 18 4 22 12 C18 20 6 20 2 12 Z M7 12 C9 8 15 8 17 12 C15 16 9 16 7 12 Z'
  },
  {
    char: 'N',
    bajoranName: 'Naris',
    meaning: 'Lineage, devotion to roots and ancestor memories',
    phonetic: 'NAH-rees',
    element: 'Pagh',
    svgPath: 'M4 4 L8 4 L16 20 L20 20 M8 4 L8 20 M16 4 L16 20'
  },
  {
    char: 'S',
    bajoranName: 'Selan',
    meaning: 'Starfire, warmth of the twin suns of Bajor',
    phonetic: 'seh-LAHN',
    element: 'Light',
    svgPath: 'M12 2 L14 9 L21 9 L15 13 L17 20 L12 16 L7 20 L9 13 L3 9 L10 9 Z'
  },
  {
    char: 'A',
    bajoranName: 'Ashalla',
    meaning: 'The heart city, eternal capital of peace',
    phonetic: 'ah-SHAH-lah',
    element: 'Celestial',
    svgPath: 'M12 2 L22 12 L12 22 L2 12 Z M12 7 L17 12 L12 17 L7 12 Z M6 6 L18 18 M18 6 L6 18'
  },
  {
    char: 'M',
    bajoranName: 'Maras',
    meaning: 'Endurance through trials, victory of righteousness',
    phonetic: 'MAH-rahs',
    element: 'Spirit',
    svgPath: 'M4 20 L4 4 L12 14 L20 4 L20 20 M8 12 L16 12'
  }
];

export const SAMPLE_INPUT_PORTRAITS = [
  {
    id: 'sample-human-explorer',
    name: 'Starfleet Diplomat',
    gender: 'Neutral',
    role: 'Alpha Quadrant Ambassador',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    description: 'Ideal for seeing how a Terran officer transforms into a Bajoran high dignitary.'
  },
  {
    id: 'sample-scholar',
    name: 'Earth Archeologist',
    gender: 'Masculine',
    role: 'Xenoculture Researcher',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    description: 'Great for seeing the transition to a Vedek scholar with ornate nasal ridges.'
  },
  {
    id: 'sample-pilot',
    name: 'Deep Space Navigator',
    gender: 'Feminine',
    role: 'Shuttle Commander',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
    description: 'Perfect for the Bajoran Militia officer transformation.'
  },
  {
    id: 'sample-elder',
    name: 'Planetary Historian',
    gender: 'Masculine',
    role: 'Archives Elder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    description: 'Exemplifies the venerable Kai Supreme Leader metamorphosis.'
  }
];

export const CEREMONIAL_BLESSINGS = [
  {
    bajoran: "Pagh-tara Koran Boranat Ashalla",
    phonetic: "Pah-gh TAH-rah KOH-rahn boh-rah-NAHT ah-SHAH-lah",
    english: "May the light of the Orb protect the sanctuary of your soul."
  },
  {
    bajoran: "Denorios Tem Selan Karan Pagh",
    phonetic: "deh-noh-REE-ohs TEM seh-LAHN KAH-rahn PAH-gh",
    english: "Through the celestial storm of time, the Prophets walk beside your Pagh."
  },
  {
    bajoran: "Kai Vedek Ashalla Pagh-nor",
    phonetic: "KYE veh-DEHK ah-SHAH-lah pah-gh-NOR",
    english: "Listen to the prophecy of the dawn, for faith is the lantern in the shadow."
  },
  {
    bajoran: "May the Prophets guide your Pagh across all horizons.",
    phonetic: "Pagh-tem'far Koran Ashalla Boranat",
    english: "The timeline is one continuous tapestry; walk with reverence and courage."
  }
];
