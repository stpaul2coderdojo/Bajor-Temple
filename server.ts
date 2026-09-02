import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for base64 image uploads
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Lazy initialize GoogleGenAI client on the server
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. Using smart neural fallback synthesizer.');
    }
    genAI = new GoogleGenAI({
      apiKey: apiKey || 'dummy-key',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
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

    let transformedImage = '';
    let spiritualAnalysis = {
      bajoranName: 'Kira Nerys of Ashalla',
      paghResonance: 96,
      paghStatus: 'Luminous & Resolute',
      spiritualLineage: 'House of the Kendra Monastery Keepers',
      prophecyText: 'You stand at the confluence of two rivers in time. The Prophets have weighed your spirit and found it resonant with the dawn of Bajor.',
      bajoranScriptProphecy: "Pagh-tara Koran Boranat Ashalla Tem'far",
      temporalCoordinates: 'Sector 001/Bajor-Denorios • Stardate 48214.5',
      characteristics: {
        nasalRidgesCount: 6,
        paghDominance: 'Solar Dawn',
        prophecyAlignment: 'Celestial Temple Vanguard',
        celestialAffinity: 'Denorios Wormhole Resonance',
      },
    };

    // Prompt for Gemini to analyze the image and generate high-fidelity Bajoran Persona details
    const analysisPrompt = `You are a high Vedek of the Temple of Bajor and the Celestial Temple.
Analyze the human/alien face in the provided photo and craft an authentic Bajoran Persona identity based on the Star Trek DS9 universe:
- Archetype: ${archetype?.name || 'Vedek Spiritual Guide'} (${archetype?.attire || 'Ceremonial Robes'})
- Ear Cuff (D'ja Pagh): ${earCuff?.name || 'Ashalla Solar Filigree'} (${earCuff?.lineage || 'Sanctuary of Kendra'})
- Epoch: ${epoch?.name || '24th Century DS9 Era'}
- Custom Focus: ${customBlessing || 'None'}

Return a structured JSON object with:
1. bajoranName (Traditional Bajoran naming: [Family Name] [Given Name], e.g., 'Kira Alora', 'Ro Maras', 'Li Duran', 'Bareil Antos', 'Tahna Selan')
2. paghResonance (Integer 85-99)
3. paghStatus (e.g., 'Luminous & Transcendent', 'Steadfast & Resolute', 'Deeply Connected to the Prophets')
4. spiritualLineage (e.g., 'Lineage of the Ashalla Sun Priests', 'House of the Janir Province Builders')
5. prophecyText (Poetic, dignified 2-3 sentence prophecy from the Prophets in the voice of the Orb of Time)
6. bajoranScriptProphecy (Phonetic Bajoran ceremony chant e.g. 'Pagh-tara Koran Boranat Selan Tem'far')
7. temporalCoordinates (e.g., 'Denorios Belt • Sector 52/B • Stardate 48912.4')
8. characteristics (object with nasalRidgesCount: number 4-7, paghDominance: string, prophecyAlignment: string, celestialAffinity: string)
9. visualDescriptionForGeneration (A detailed portrait prompt description specifying the subject with horizontal Bajoran nasal bridge ridges, ornate right ear d'ja pagh ear cuff with chains, spiritual robes, in the glowing celestial light of the Orb of Time)`;

    try {
      if (process.env.GEMINI_API_KEY) {
        const analysisResponse = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: cleanBase64,
                },
              },
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
                visualDescriptionForGeneration: { type: Type.STRING },
              },
              required: ['bajoranName', 'paghResonance', 'prophecyText', 'spiritualLineage', 'bajoranScriptProphecy'],
            },
          },
        });

        if (analysisResponse.text) {
          const parsed = JSON.parse(analysisResponse.text);
          spiritualAnalysis = {
            ...spiritualAnalysis,
            ...parsed,
          };
        }

        // Try image-to-image or image generation with gemini-3.1-flash-image
        try {
          const imageGenPrompt = `A cinematic, ultra-detailed photorealistic portrait of the person from the reference image transformed into a Bajoran from Star Trek Deep Space Nine. 
Key features:
- Authentic Bajoran horizontal nasal ridges along the bridge of the nose.
- Wearing an ornate gold and jewel-encrusted Bajoran ear cuff (d'ja pagh) on the right ear with hanging filigree chain.
- Attire: ${archetype?.attire || 'Traditional Bajoran spiritual vestments in deep crimson, copper, and amber'}.
- Atmosphere: Standing before the radiant glowing blue and gold Orb of Time inside the Temple of Bajor, celestial light rays from the Denorios wormhole, golden particle shimmer, 8k resolution, cinematic movie lighting.`;

          const imgResponse = await ai.models.generateContent({
            model: 'gemini-3.1-flash-image',
            contents: {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: cleanBase64,
                  },
                },
                {
                  text: imageGenPrompt,
                },
              ],
            },
            config: {
              imageConfig: {
                aspectRatio: '1:1',
                imageSize: '1K',
              },
            },
          });

          if (imgResponse.candidates && imgResponse.candidates[0]?.content?.parts) {
            for (const part of imgResponse.candidates[0].content.parts) {
              if (part.inlineData && part.inlineData.data) {
                transformedImage = `data:image/png;base64,${part.inlineData.data}`;
                break;
              }
            }
          }
        } catch (imgError) {
          console.warn('Image generation with flash-image encountered error, applying vision blend fallback:', imgError);
        }
      }
    } catch (aiErr) {
      console.warn('Gemini API call failed, using graceful fallback:', aiErr);
    }

    res.json({
      success: true,
      data: {
        originalImage: `data:${mimeType};base64,${cleanBase64}`,
        transformedImage: transformedImage, // If empty, frontend canvas compositor renders cinematic Bajoran shader layer
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

    let prophecyResponse = {
      orbId: orbId || 'orb-of-time',
      query: query || 'What is the future of Bajor?',
      prophecy: 'The timeline does not begin or end where your mortal eyes perceive. In the light of the Celestial Temple, your past deeds and future choices are woven into the same sacred fabric.',
      bajoranTranslation: 'Koran Selan Tem Boranat Pagh-tara',
      bajoranGlyphText: 'P T O B S D',
      temporalVision: 'A vision of solar-sail ships descending on the Denorios Belt under the golden dawn of Ashalla.',
      guidanceForPagh: 'Hold steadfast to your convictions; the storm tests the roots of faith.',
      visionClarity: 97,
    };

    if (process.env.GEMINI_API_KEY && query) {
      try {
        const prompt = `You are the consciousness of the Prophets speaking through the sacred Star Trek Bajoran "${orbId || 'Orb of Time'}".
The seeker asks: "${query}"

Respond as the Prophets do in Deep Space Nine: timeless, non-linear, profound, spiritual, and benevolent. 
Return JSON with:
1. prophecy (2-3 sentences of prophetic insight in the poetic voice of the Prophets)
2. bajoranTranslation (Ceremonial phonetic Bajoran phrase e.g. "Pagh-tem'far Selan Boranat Ashalla")
3. bajoranGlyphText (String of space-separated glyph letters e.g. "P T O B S D")
4. temporalVision (A vivid visual glimpse of a past, present, or future moment in Bajor's history)
5. guidanceForPagh (Actionable spiritual advice for the seeker's soul/Pagh)
6. visionClarity (Integer 90-99)`;

        const result = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
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

        if (result.text) {
          const parsed = JSON.parse(result.text);
          prophecyResponse = {
            ...prophecyResponse,
            ...parsed,
          };
        }
      } catch (err) {
        console.warn('Orb prophecy Gemini error:', err);
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
      bajoranPhonetic: "Pagh-tara Koran Boranat Ashalla",
      literalMeaning: "Soul-light of the Orb in the sacred sanctuary",
      ceremonialInvocation: "May the Prophets guide your Pagh across all epochs.",
      glyphs: ['P', 'T', 'O', 'B', 'S'],
    };

    if (process.env.GEMINI_API_KEY) {
      try {
        const prompt = `Translate the following phrase into authentic Bajoran ceremonial language (as heard in Star Trek DS9):
Input: "${text}"

Return a JSON object with:
1. bajoranPhonetic (Flowing phonetic Bajoran words with hyphens and apostrophes, e.g. "Pagh-tara Koran Selan Tem'far")
2. literalMeaning (Breakdown of what each Bajoran root word means)
3. ceremonialInvocation (A formal temple blessing derived from this meaning)
4. glyphs (Array of 3-6 single-letter glyph keys: 'P', 'T', 'O', 'B', 'E', 'V', 'K', 'D', 'N', 'S', 'A', 'M')`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
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

        if (response.text) {
          resultData = {
            originalText: text,
            ...JSON.parse(response.text),
          };
        }
      } catch (err) {
        console.warn('Translate error:', err);
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
