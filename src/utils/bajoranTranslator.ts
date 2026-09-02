/**
 * Bajoran Translator & Glyph Converter
 * Generates Bajoran phonetic transliterations, glyph sequences, and spiritual titles
 */

import { BAJORAN_GLYPHS } from '../data/bajoranLore';

// Mapping of English words and concepts to authentic Bajoran equivalents
const BAJORAN_VOCABULARY: Record<string, string> = {
  'the': 'ta',
  'and': 'e',
  'of': 'tem',
  'in': 'il',
  'to': 'va',
  'is': 'ko',
  'you': 'man',
  'your': 'man-tar',
  'my': 'tor',
  'soul': 'pagh',
  'spirit': 'pagh-alor',
  'light': 'selan',
  'time': "tem'far",
  'prophet': 'koran-al',
  'prophets': 'koran-ali',
  'temple': 'boranat',
  'sanctuary': 'bakhala',
  'emissary': 'karan-em',
  'celestial': 'denorios',
  'wormhole': 'denorios-tem',
  'wisdom': 'velar',
  'destiny': 'alor',
  'truth': 'duran',
  'memory': 'rethor',
  'peace': 'ashalla-ra',
  'path': 'tara',
  'guide': 'naris-tem',
  'blessing': 'vedek-or',
  'vision': 'pagh-nor',
  'fire': 'kosst',
  'shadow': 'wraith',
  'eternal': 'tem-mara',
  'heart': 'kora',
  'courage': 'maras-tek'
};

const BAJORAN_FAMILY_PREFIXES = [
  'Kira', 'Ro', 'Li', 'Tahna', 'Shakaar', 'Bareil', 'Winn', 'Opaka', 'Solbor', 
  'Lenaris', 'Faris', 'Kubus', 'Mullibok', 'Anara', 'Kalis', 'Jaro', 'Prylar'
];

const BAJORAN_GIVEN_NAMES = [
  'Nerys', 'Laren', 'Nalas', 'Loser', 'Edon', 'Antos', 'Adami', 'Raza', 'Ghemor',
  'Boran', 'Selan', 'Tarah', 'Maras', 'Duran', 'Velan', 'Koril', 'Alora', 'Teryn'
];

export function translateToBajoran(input: string): {
  translatedText: string;
  phoneticText: string;
  glyphs: string[];
} {
  if (!input || !input.trim()) {
    return {
      translatedText: "Pagh-tara Koran Boranat",
      phoneticText: "PAH-gh TAH-rah KOH-rahn boh-rah-NAHT",
      glyphs: ['P', 'T', 'O', 'B']
    };
  }

  const words = input.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
  const translatedWords: string[] = [];
  const phoneticParts: string[] = [];

  words.forEach(word => {
    if (BAJORAN_VOCABULARY[word]) {
      const bWord = BAJORAN_VOCABULARY[word];
      translatedWords.push(bWord.charAt(0).toUpperCase() + bWord.slice(1));
      phoneticParts.push(bWord.toUpperCase());
    } else {
      // Phonetic syllable construction
      const transformed = transliterateWord(word);
      translatedWords.push(transformed);
      phoneticParts.push(transformed.toUpperCase());
    }
  });

  const glyphs: string[] = [];
  translatedWords.join('').split('').forEach(char => {
    const upper = char.toUpperCase();
    if (BAJORAN_GLYPHS.some(g => g.char === upper) && !glyphs.includes(upper)) {
      glyphs.push(upper);
    }
  });

  // Ensure at least 3 glyphs
  if (glyphs.length < 3) {
    glyphs.push('P', 'T', 'O');
  }

  return {
    translatedText: translatedWords.join(' '),
    phoneticText: phoneticParts.join(' - '),
    glyphs: glyphs.slice(0, 8)
  };
}

function transliterateWord(word: string): string {
  if (word.length <= 2) return word + "'al";
  const syllables = ['nor', 'tara', 'lan', 'sek', 'ran', 'mar', 'tem', 'bor', 'kora', 'del'];
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = (hash * 31 + word.charCodeAt(i)) % syllables.length;
  }
  const firstLetter = word.charAt(0).toUpperCase();
  const suffix = syllables[Math.abs(hash)];
  return `${firstLetter}${word.slice(1, 3)}'${suffix}`;
}

export function generateBajoranPersonaDetails(archetypeId: string, customSeed = 42) {
  const familyIdx = Math.floor(Math.abs(Math.sin(customSeed) * 10000)) % BAJORAN_FAMILY_PREFIXES.length;
  const givenIdx = Math.floor(Math.abs(Math.cos(customSeed) * 10000)) % BAJORAN_GIVEN_NAMES.length;
  
  const family = BAJORAN_FAMILY_PREFIXES[familyIdx];
  const given = BAJORAN_GIVEN_NAMES[givenIdx];
  const bajoranName = `${family} ${given}`;

  const resonanceBase = 88 + Math.floor(Math.abs(Math.sin(customSeed * 3)) * 12);
  const resonanceStatus = resonanceBase > 96 ? 'Luminous & Transcendent' : resonanceBase > 92 ? 'Strong & Resolute' : 'Harmonious & Seeking';

  const lineages = [
    'Lineage of the Ashalla Dawn Priests',
    'House of the Janir Province Architects',
    'Kendra Order of Contemplation',
    'Denorios Celestial Gatekeepers',
    'First Dynasty Solar Navigators'
  ];
  const lineage = lineages[Math.floor(Math.abs(Math.cos(customSeed * 7) * 1000)) % lineages.length];

  const stardates = ['48214.5', '49122.9', '51098.2', '52891.4', 'Ancient Era 1400.1'];
  const temporalCoord = `Sector 001/Bajor-Denorios • SD ${stardates[Math.floor(Math.abs(Math.sin(customSeed * 5) * 10)) % stardates.length]}`;

  return {
    bajoranName,
    paghResonance: resonanceBase,
    paghStatus: resonanceStatus,
    spiritualLineage: lineage,
    temporalCoordinates: temporalCoord
  };
}
