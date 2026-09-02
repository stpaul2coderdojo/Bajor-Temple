export interface BajoranArchetype {
  id: string;
  name: string;
  title: string;
  description: string;
  attire: string;
  spiritualFocus: string;
  defaultEpoch: string;
  iconName: string;
  accentColor: string;
}

export interface EarCuffStyle {
  id: string;
  name: string;
  lineage: string;
  description: string;
  material: string;
  gemstone: string;
  chainCount: number;
}

export interface TemporalEpoch {
  id: string;
  name: string;
  stardate: string;
  era: string;
  description: string;
}

export interface SacredOrb {
  id: string;
  name: string;
  bajoranName: string;
  title: string;
  power: string;
  discoveryDate: string;
  glowColor: string;
  secondaryColor: string;
  quote: string;
  description: string;
}

export interface BajoranGlyph {
  char: string;
  bajoranName: string;
  meaning: string;
  phonetic: string;
  svgPath: string;
  element: 'Light' | 'Time' | 'Pagh' | 'Prophecy' | 'Celestial' | 'Spirit';
}

export interface TransformationResult {
  id: string;
  originalImage: string;
  transformedImage: string;
  bajoranName: string;
  archetype: BajoranArchetype;
  earCuff: EarCuffStyle;
  epoch: TemporalEpoch;
  paghResonance: number; // 0-100
  paghStatus: string;
  spiritualLineage: string;
  prophecyText: string;
  bajoranScriptProphecy: string;
  temporalCoordinates: string;
  timestamp: number;
  characteristics: {
    nasalRidgesCount: number;
    paghDominance: string;
    prophecyAlignment: string;
    celestialAffinity: string;
  };
}

export interface OrbProphecyResponse {
  orbId: string;
  query: string;
  prophecy: string;
  bajoranTranslation: string;
  bajoranGlyphText: string;
  temporalVision: string;
  guidanceForPagh: string;
  visionClarity: number;
}
