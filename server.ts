import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Payload limit for base64 image uploads
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Lazy initialize GoogleGenAI client on the server
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

// Timeout helper to guarantee fast responses and prevent Node fetch timeouts
function callWithTimeout<T>(promise: Promise<T>, timeoutMs = 6500, fallbackVal: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallbackVal), timeoutMs)),
  ]);
}

// Dynamic canonical generator for Orb Prophecies
function generateDynamicProphecy(orbId: string, query: string) {
  const orbThemes: Record<string, { vision: string; chant: string; guidance: string }> = {
    'orb-of-time': {
      vision: 'Ancient solar-sail vessels gliding across the Denorios Belt under the golden twin suns of Ashalla, their radiant sails spanning five millennia.',
      chant: "Pagh-tem'far Koran Boranat Selan",
      guidance: 'Do not measure your path in linear constraints. What you sow in dedication is already harvested in the timeless realm of the Celestial Temple.',
    },
    'orb-of-prophecy': {
      vision: 'A radiant confluence where three streams of starlight converge, revealing pathways of peace yet unwritten.',
      chant: 'Tem-nor Koran Ashalla Boran',
      guidance: 'The timeline is not a fixed monument, but an unfolding celestial garden guided by your convictions.',
    },
    'orb-of-wisdom': {
      vision: 'The serene spires of the Kendra Monastery standing calm as stardust drifts gently through the Janir Valley.',
      chant: 'Karan Pagh Selan Ashalla',
      guidance: 'True clarity arrives when you listen to the stillness between your thoughts. Let patience guide your Pagh.',
    },
    'orb-of-contemplation': {
      vision: 'A tranquil reflecting sanctuary in the Temple of Bakhala, reflecting stars and distant horizons in perfect balance.',
      chant: 'Maras Pagh-tara Denorios Tem',
      guidance: 'Release the heavy armor of anxiety; the light of the Prophets surrounds and safeguards your inner sanctuary.',
    },
    'orb-of-destiny': {
      vision: 'A solitary celestial beacon guiding starfarers safely through the turbulent currents of the Denorios corridor.',
      chant: 'Boranat Tem-far Selan Koran',
      guidance: 'Trust the current moving through your spirit. Your purpose reveals itself through steadfast courage and diplomatic grace.',
    },
  };

  const theme = orbThemes[orbId] || orbThemes['orb-of-time'];
  return {
    prophecy: `The Prophets perceive your inquiry regarding "${query}". In the timeless reality of the Celestial Temple, your courage and dedication resonate across all thresholds. Walk forward in steadfast faith.`,
    bajoranTranslation: theme.chant,
    bajoranGlyphText: 'P T O B S D',
    temporalVision: theme.vision,
    guidanceForPagh: theme.guidance,
    visionClarity: 95 + Math.floor(Math.random() * 4),
  };
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Temple of Bajor - Portal of Light API',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 1. Transform Image to Bajoran Persona API
app.post('/api/transform-persona', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', archetype, earCuff, epoch, customBlessing } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const ai = getGenAI();

    const category = archetype?.name?.includes('Militia')
      ? 'Bajoran Militia Officer'
      : archetype?.name?.includes('Pacifist')
      ? 'Bajoran Pacifist Monk'
      : 'Celestial Temple Diplomat';

    let transformedImage = '';
    let spiritualAnalysis = {
      bajoranName: 'Kira Alora of Ashalla',
      paghResonance: 96,
      paghStatus: 'Luminous & Resolute',
      spiritualLineage: 'House of the Kendra Sanctuary',
      prophecyText: 'The Prophets perceive your courage. In this epoch of change, your devotion to peace and duty stands as a lantern in the celestial currents.',
      bajoranScriptProphecy: "Pagh-tara Koran Boranat Ashalla Tem'far",
      temporalCoordinates: 'Sector 001/Bajor-Denorios • Stardate 48214.5',
      characteristics: {
        nasalRidgesCount: 6,
        paghDominance: 'Solar Dawn',
        prophecyAlignment: `${category} Vanguard`,
        celestialAffinity: 'Denorios Wormhole Resonance',
      },
    };

    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const analysisPrompt = `You are an elder of the Temple of Bajor and the Celestial Temple.
Analyze the provided face and craft an authentic Bajoran Persona identity based on the Star Trek DS9 universe.
(Strictly for Diplomats, Militia, or Pacifists; not high-clergy dignitaries):
- Archetype: ${archetype?.name || 'Celestial Temple Diplomat'} (${archetype?.attire || 'Diplomatic / Militia / Pacifist Attire'})
- Ear Cuff (D'ja Pagh): ${earCuff?.name || 'Ashalla Solar Filigree'} (${earCuff?.lineage || 'Sanctuary of Kendra'})
- Epoch: ${epoch?.name || '24th Century DS9 Era'}
- Custom Focus: ${customBlessing || 'None'}

Return a structured JSON object with:
1. bajoranName (Traditional Bajoran naming: [Family Name] [Given Name], e.g., 'Kira Alora', 'Ro Maras', 'Li Duran', 'Tahna Selan')
2. paghResonance (Integer 85-99)
3. paghStatus (e.g., 'Luminous & Resolute', 'Steadfast & Courageous', 'Deeply Connected to the Prophets')
4. spiritualLineage (e.g., 'Lineage of the Dawn Province', 'House of the Kendra Sanctuary')
5. prophecyText (Poetic, dignified 2-3 sentence prophecy from the Prophets in the voice of the Orb of Time)
6. bajoranScriptProphecy (Phonetic Bajoran ceremony chant e.g. 'Pagh-tara Koran Boranat Selan Tem'far')
7. temporalCoordinates (e.g., 'Denorios Belt • Sector 52/B • Stardate 48912.4')
8. characteristics (object with nasalRidgesCount: number 4-7, paghDominance: string, prophecyAlignment: string, celestialAffinity: string)`;

        const analysisPromise = ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: {
            parts: [
              {
                text: analysisPrompt,
              },
            ],
          },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                bajoranName: { type: Type.STRING },
                paghResonance: { type: Type.INTEGER },
                paghStatus: { type: Type.STRING },
                spiritualLineage: { type: Type.STRING },
                prophecyText: { type: Type.STRING },
                bajoranScriptProphecy: { type: Type.STRING },
                temporalCoordinates: { type: Type.STRING },
                characteristics: {
                  type: Type.OBJECT,
                  properties: {
                    nasalRidgesCount: { type: Type.INTEGER },
                    paghDominance: { type: Type.STRING },
                    prophecyAlignment: { type: Type.STRING },
                    celestialAffinity: { type: Type.STRING },
                  },
                },
              },
              required: ['bajoranName', 'paghResonance', 'prophecyText', 'spiritualLineage', 'bajoranScriptProphecy'],
            },
          },
        });

        const analysisResponse = await callWithTimeout(analysisPromise, 5000, null as any);

        if (analysisResponse && analysisResponse.text) {
          const parsed = JSON.parse(analysisResponse.text);
          spiritualAnalysis = {
            ...spiritualAnalysis,
            ...parsed,
          };
        }
      } catch (aiErr) {
        console.warn('Gemini persona analysis notice (safe fallback applied):', aiErr);
      }
    }

    res.json({
      success: true,
      data: {
        originalImage: `data:${mimeType};base64,${cleanBase64}`,
        transformedImage: transformedImage,
        ...spiritualAnalysis,
        timestamp: Date.now(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Transformation failed';
    res.status(500).json({ error: message });
  }
});

// 2. Orb of Time Prophecy Consultation API
app.post('/api/orb-prophecy', async (req, res) => {
  try {
    const { orbId, query } = req.body;
    const ai = getGenAI();

    const fallbackData = generateDynamicProphecy(orbId || 'orb-of-time', query || 'What is the future of Bajor?');
    let prophecyResponse = {
      orbId: orbId || 'orb-of-time',
      query: query || 'What is the future of Bajor?',
      ...fallbackData,
    };

    if (ai && process.env.GEMINI_API_KEY && query) {
      try {
        const prompt = `You are the consciousness of the Prophets speaking through the sacred Star Trek Bajoran "${orbId || 'Orb of Time'}". Seeker asks: "${query}". Respond non-linear, profound, spiritual, and benevolent. Return JSON with: prophecy, bajoranTranslation, bajoranGlyphText, temporalVision, guidanceForPagh, visionClarity.`;

        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                prophecy: { type: Type.STRING },
                bajoranTranslation: { type: Type.STRING },
                bajoranGlyphText: { type: Type.STRING },
                temporalVision: { type: Type.STRING },
                guidanceForPagh: { type: Type.STRING },
                visionClarity: { type: Type.INTEGER },
              },
              required: ['prophecy', 'bajoranTranslation', 'temporalVision', 'guidanceForPagh'],
            },
          },
        });

        const result = await callWithTimeout(generatePromise, 5000, null as any);

        if (result && result.text) {
          const parsed = JSON.parse(result.text);
          prophecyResponse = {
            ...prophecyResponse,
            ...parsed,
          };
        }
      } catch (err) {
        console.warn('Orb prophecy API notice (safe fallback applied):', err);
      }
    }

    res.json({ success: true, data: prophecyResponse });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Prophecy consultation failed';
    res.status(500).json({ error: message });
  }
});

// 3. Bajoran Language Translation API
app.post('/api/bajoran-translate', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const ai = getGenAI();
    let resultData = {
      originalText: text,
      bajoranPhonetic: 'Pagh-tara Koran Boranat Ashalla',
      literalMeaning: 'Soul-light of the Orb in the sacred sanctuary',
      ceremonialInvocation: 'May the Prophets guide your Pagh across all epochs.',
      glyphs: ['P', 'T', 'O', 'B', 'S'],
    };

    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `Translate the following phrase into authentic Bajoran ceremonial language (as heard in Star Trek DS9):
Input: "${text}"

Return a JSON object with:
1. bajoranPhonetic (Flowing phonetic Bajoran words with hyphens and apostrophes, e.g. "Pagh-tara Koran Selan Tem'far")
2. literalMeaning (Breakdown of what each Bajoran root word means)
3. ceremonialInvocation (A formal temple blessing derived from this meaning)
4. glyphs (Array of 3-6 single-letter glyph keys: 'P', 'T', 'O', 'B', 'E', 'V', 'K', 'D', 'N', 'S', 'A', 'M')`;

        const responsePromise = ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                bajoranPhonetic: { type: Type.STRING },
                literalMeaning: { type: Type.STRING },
                ceremonialInvocation: { type: Type.STRING },
                glyphs: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['bajoranPhonetic', 'literalMeaning', 'ceremonialInvocation', 'glyphs'],
            },
          },
        });

        const response = await callWithTimeout(responsePromise, 5000, null as any);

        if (response && response.text) {
          resultData = {
            originalText: text,
            ...JSON.parse(response.text),
          };
        }
      } catch (err) {
        console.warn('Translate error (safe fallback applied):', err);
      }
    }

    res.json({ success: true, data: resultData });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Translation failed';
    res.status(500).json({ error: message });
  }
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Temple of Bajor Portal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

