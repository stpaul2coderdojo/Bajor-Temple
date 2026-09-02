import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, Wand2, Shield, Flame, Check, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { BAJORAN_ARCHETYPES, EAR_CUFF_STYLES, TEMPORAL_EPOCHS, SAMPLE_INPUT_PORTRAITS } from '../data/bajoranLore';
import { BajoranArchetype, EarCuffStyle, TemporalEpoch, TransformationResult } from '../types';
import { generateBajoranPersonaDetails } from '../utils/bajoranTranslator';
import { audioEngine } from '../utils/audioEngine';

interface PersonaTransformerProps {
  onTransformationComplete: (result: TransformationResult) => void;
}

export const PersonaTransformer: React.FC<PersonaTransformerProps> = ({
  onTransformationComplete,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_INPUT_PORTRAITS[0].image);
  const [selectedArchetype, setSelectedArchetype] = useState<BajoranArchetype>(BAJORAN_ARCHETYPES[0]);
  const [selectedEarCuff, setSelectedEarCuff] = useState<EarCuffStyle>(EAR_CUFF_STYLES[0]);
  const [selectedEpoch, setSelectedEpoch] = useState<TemporalEpoch>(TEMPORAL_EPOCHS[0]);
  const [customBlessing, setCustomBlessing] = useState<string>('');
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setErrorMessage('Image size exceeds 15MB. Please choose a smaller portrait.');
        return;
      }
      setErrorMessage(null);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        audioEngine.playTempleChime();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        audioEngine.playTempleChime();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleSelect = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setErrorMessage(null);
    audioEngine.playTempleChime();
  };

  const handleStartTransformation = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload or select an image first.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    audioEngine.playTemporalPortalWarp();

    const stages = [
      'Unsealing the Reliquary of the Orb of Time...',
      'Scanning biological template for nasal ridge alignment...',
      "Forging ancestral D'ja Pagh ear cuff lineage in the sacred flames...",
      'Weaving ceremonial robes in the Celestial Temple...',
      'Receiving the prophetic Pagh reading from the Prophets...',
    ];

    let stageIdx = 0;
    setProcessingStage(stages[0]);
    const interval = setInterval(() => {
      stageIdx++;
      if (stageIdx < stages.length) {
        setProcessingStage(stages[stageIdx]);
        audioEngine.playOrbResonance(480 + stageIdx * 40);
      }
    }, 1200);

    try {
      // Call server-side API
      const response = await fetch('/api/transform-persona', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          archetype: selectedArchetype,
          earCuff: selectedEarCuff,
          epoch: selectedEpoch,
          customBlessing: customBlessing,
        }),
      });

      const json = await response.json();
      clearInterval(interval);

      if (json.success && json.data) {
        const payload: TransformationResult = {
          id: `bajoran-${Date.now()}`,
          originalImage: selectedImage,
          transformedImage: json.data.transformedImage || selectedImage,
          bajoranName: json.data.bajoranName,
          archetype: selectedArchetype,
          earCuff: selectedEarCuff,
          epoch: selectedEpoch,
          paghResonance: json.data.paghResonance || 95,
          paghStatus: json.data.paghStatus || 'Luminous & Resolute',
          spiritualLineage: json.data.spiritualLineage || selectedEarCuff.lineage,
          prophecyText: json.data.prophecyText,
          bajoranScriptProphecy: json.data.bajoranScriptProphecy,
          temporalCoordinates: json.data.temporalCoordinates,
          timestamp: Date.now(),
          characteristics: json.data.characteristics || {
            nasalRidgesCount: 5,
            paghDominance: 'Solar Dawn',
            prophecyAlignment: 'Celestial Vanguard',
            celestialAffinity: 'Denorios Wormhole Harmonic',
          },
        };

        setIsProcessing(false);
        onTransformationComplete(payload);
      } else {
        // Fallback offline generation
        fallbackTransform();
      }
    } catch (err) {
      console.warn('API error, executing client-side spiritual synthesis fallback:', err);
      fallbackTransform();
    }
  };

  const fallbackTransform = () => {
    const details = generateBajoranPersonaDetails(selectedArchetype.id, Date.now());
    const fallbackResult: TransformationResult = {
      id: `bajoran-${Date.now()}`,
      originalImage: selectedImage!,
      transformedImage: selectedImage!, // Shader layer will enhance
      bajoranName: `${details.bajoranName} of Ashalla`,
      archetype: selectedArchetype,
      earCuff: selectedEarCuff,
      epoch: selectedEpoch,
      paghResonance: details.paghResonance,
      paghStatus: details.paghStatus,
      spiritualLineage: details.spiritualLineage,
      prophecyText: `In the timeless reflection of the Orb, your Pagh shines with the enduring courage of Bajor. Walk forward with the blessings of the Celestial Temple.`,
      bajoranScriptProphecy: "Pagh-tara Koran Boranat Ashalla Selan",
      temporalCoordinates: details.temporalCoordinates,
      timestamp: Date.now(),
      characteristics: {
        nasalRidgesCount: 6,
        paghDominance: 'Dawn Luminescence',
        prophecyAlignment: 'Ashalla Sanctorum',
        celestialAffinity: 'Denorios Resonant',
      },
    };
    setIsProcessing(false);
    onTransformationComplete(fallbackResult);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-['Cinzel'] tracking-widest uppercase">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Orb of Time Neural Metamorphosis</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
          BECOME A PERSONA OF BAJOR
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 font-['Outfit']">
          Upload any portrait to manifest as a high spiritual dignitary, noble militia warrior, or ancient temple architect with authentic nasal ridges, right-ear d’ja pagh jewelry, and personalized Pagh prophecy.
        </p>
      </div>

      {/* Main Grid: Upload & Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Upload & Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="relative cursor-pointer group aspect-square rounded-2xl border-2 border-dashed border-amber-500/40 hover:border-amber-400 bg-[#0d1322]/80 hover:bg-[#11192e] transition-all overflow-hidden flex flex-col items-center justify-center p-6 shadow-2xl shadow-amber-500/10"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Selected persona"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4 text-center">
                  <Upload className="w-6 h-6 text-amber-300 mb-1" />
                  <span className="text-xs font-['Cinzel'] text-amber-200 font-bold">
                    Change Uploaded Photo
                  </span>
                  <span className="text-[11px] text-amber-200/70 font-['Outfit']">
                    Click or drag & drop a new image
                  </span>
                </div>

                {/* Bajoran Target Marker */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-amber-500/30 text-[10px] font-['Cinzel'] text-amber-300">
                  Target Template
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/15 border border-amber-400/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm font-['Cinzel'] font-bold text-amber-200">
                    Upload Portrait or Selfie
                  </p>
                  <p className="text-xs text-amber-200/60 font-['Outfit'] mt-0.5">
                    Drag and drop, or click to browse (PNG, JPG, WebP)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Preset Sample Avatars */}
          <div className="space-y-2">
            <span className="text-xs font-['Cinzel'] text-amber-300/80 uppercase tracking-wider block">
              Or Choose a Starfleet / Earth Sample:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_INPUT_PORTRAITS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample.image)}
                  className={`relative group rounded-xl overflow-hidden border-2 aspect-square transition-all ${
                    selectedImage === sample.image
                      ? 'border-amber-400 shadow-md shadow-amber-500/30 scale-95'
                      : 'border-amber-500/20 hover:border-amber-400/60 opacity-70 hover:opacity-100'
                  }`}
                  title={`${sample.name} (${sample.role})`}
                >
                  <img
                    src={sample.image}
                    alt={sample.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-1 text-center">
                    <span className="text-[9px] font-['Outfit'] text-amber-100 truncate w-full">
                      {sample.name.split(' ')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customization & Parameters */}
        <div className="lg:col-span-7 space-y-6">
          {/* Archetype Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1. Select Bajoran Archetype</span>
              </label>
              <span className="text-[11px] text-amber-300 font-['Outfit']">
                {selectedArchetype.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BAJORAN_ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetype.id === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => {
                      setSelectedArchetype(arch);
                      audioEngine.playTempleChime();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#152038] border-amber-400 text-amber-100 shadow-md shadow-amber-500/20'
                        : 'bg-[#0d1322] border-amber-500/15 text-amber-200/70 hover:bg-[#11192e] hover:border-amber-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-['Cinzel'] text-xs font-bold text-amber-200">
                          {arch.name}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-amber-200/60 font-['Outfit'] line-clamp-2">
                        {arch.description}
                      </p>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-amber-300/80 bg-black/40 px-2 py-0.5 rounded border border-amber-500/20">
                      {arch.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* D'ja Pagh Ear Cuff Lineage */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>2. D'ja Pagh Ear Cuff Lineage (Right Ear)</span>
              </label>
              <span className="text-[11px] text-amber-300 font-['Outfit']">
                {selectedEarCuff.material}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EAR_CUFF_STYLES.map((cuff) => {
                const isSelected = selectedEarCuff.id === cuff.id;
                return (
                  <button
                    key={cuff.id}
                    onClick={() => {
                      setSelectedEarCuff(cuff);
                      audioEngine.playTempleChime();
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#152038] border-amber-400 text-amber-100 shadow-md shadow-amber-500/20'
                        : 'bg-[#0d1322] border-amber-500/15 text-amber-200/70 hover:bg-[#11192e] hover:border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-['Cinzel'] text-xs font-bold text-amber-200">
                        {cuff.name}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-amber-300/80 font-['Outfit']">
                      Lineage: {cuff.lineage}
                    </p>
                    <p className="text-[10px] text-amber-200/60 font-['Outfit'] mt-1">
                      {cuff.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Temporal Epoch */}
          <div className="space-y-2">
            <label className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Temporal Epoch of Origin</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TEMPORAL_EPOCHS.map((epoch) => {
                const isSelected = selectedEpoch.id === epoch.id;
                return (
                  <button
                    key={epoch.id}
                    onClick={() => {
                      setSelectedEpoch(epoch);
                      audioEngine.playTempleChime();
                    }}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                        : 'bg-[#0d1322] border-amber-500/15 text-amber-200/60 hover:bg-[#11192e]'
                    }`}
                  >
                    <span className="font-['Cinzel'] text-[11px] font-bold block">
                      {epoch.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] text-amber-300/70 font-mono block">
                      {epoch.era}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Prayer / Focus (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-['Cinzel'] text-amber-200/90 font-semibold uppercase tracking-wider flex items-center justify-between">
              <span>Personal Pagh Prayer or Intention (Optional)</span>
              <span className="text-[10px] text-amber-400/70 font-normal">Channeled to the Prophets</span>
            </label>
            <input
              type="text"
              value={customBlessing}
              onChange={(e) => setCustomBlessing(e.target.value)}
              placeholder="e.g., Guide me through the celestial storms to bring peace to my people"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-amber-500/20 focus:border-amber-400 text-amber-100 text-xs font-['Outfit'] placeholder:text-amber-200/30 focus:outline-none transition-colors"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Launch Transformation Button */}
          <button
            onClick={handleStartTransformation}
            disabled={isProcessing || !selectedImage}
            className={`w-full py-4 px-6 rounded-2xl font-['Cinzel'] font-bold text-sm sm:text-base tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-3 ${
              isProcessing
                ? 'bg-amber-600/50 text-amber-200 cursor-wait'
                : !selectedImage
                ? 'bg-amber-900/30 text-amber-400/40 cursor-not-allowed border border-amber-500/10'
                : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                <span className="text-xs sm:text-sm">{processingStage || 'Consulting the Orb of Time...'}</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>UNSEAL ORB & MANIFEST BAJORAN PERSONA</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
