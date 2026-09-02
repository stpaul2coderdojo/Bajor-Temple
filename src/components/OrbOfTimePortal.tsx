import React, { useState, useEffect } from 'react';
import { Sparkles, Wand2, Compass, Play, Eye, Flame, Shield, ArrowRight, RotateCcw } from 'lucide-react';
import { SACRED_ORBS, BAJORAN_GLYPHS, CEREMONIAL_BLESSINGS } from '../data/bajoranLore';
import { audioEngine } from '../utils/audioEngine';

interface OrbOfTimePortalProps {
  onStartTransform: () => void;
  onOpenConsultation: () => void;
}

export const OrbOfTimePortal: React.FC<OrbOfTimePortalProps> = ({
  onStartTransform,
  onOpenConsultation,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeVisionIndex, setActiveVisionIndex] = useState(0);
  const [blessingIndex, setBlessingIndex] = useState(0);
  const [isResonating, setIsResonating] = useState(false);

  const orbOfTime = SACRED_ORBS[0]; // Orb of Time (Pagh-tem'far)

  const temporalVisions = [
    {
      epoch: 'The Golden Age of Ashalla (8,000 BCE)',
      vision: 'Solar-sail galleons gliding gracefully above the azure oceans of ancient Bajor under twin amber suns.',
      glyphWord: 'Selan Boranat Ashalla',
      glyphChars: ['S', 'B', 'A', 'P'],
    },
    {
      epoch: 'The Denorios Nexus (Timeless Continuum)',
      vision: 'The Celestial Temple uncoiling in rings of radiant blue light as the Prophets welcome the Emissary.',
      glyphWord: "Denorios Tem'far Karan",
      glyphChars: ['D', 'T', 'E', 'O'],
    },
    {
      epoch: 'The Dawn of Reclamation (24th Century)',
      vision: 'A unified Bajor stepping into its rightful place among the stars, with faith as its guiding beacon.',
      glyphWord: 'Pagh-nor Maras Kai',
      glyphChars: ['P', 'M', 'K', 'V'],
    },
  ];

  const handleToggleOrb = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      audioEngine.playOrbResonance(528);
      setIsResonating(true);
      setTimeout(() => setIsResonating(false), 3000);
    } else {
      audioEngine.playTempleChime();
    }
  };

  const handleNextVision = () => {
    setActiveVisionIndex((prev) => (prev + 1) % temporalVisions.length);
    audioEngine.playOrbResonance(440 + activeVisionIndex * 60);
  };

  const handleNextBlessing = () => {
    setBlessingIndex((prev) => (prev + 1) % CEREMONIAL_BLESSINGS.length);
    audioEngine.playTempleChime();
  };

  useEffect(() => {
    // Initial chime
    const timer = setTimeout(() => {
      audioEngine.playOrbResonance(528);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const currentVision = temporalVisions[activeVisionIndex];
  const currentBlessing = CEREMONIAL_BLESSINGS[blessingIndex];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Temple Inscription Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-['Cinzel'] tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Celestial Reliquary • Ashalla Sanctuary</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-['Cinzel'] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600">
          THE ORB OF TIME
        </h2>

        <p className="text-sm sm:text-base text-amber-100/70 font-['Outfit'] leading-relaxed">
          Gaze into the <span className="text-amber-300 font-semibold font-['Cinzel']">Pagh-tem'far</span>, the sacred Tear of the Prophets. Enter the portal of light to traverse the non-linear continuum, awaken your inner Pagh, and manifest your cinematic Bajoran persona.
        </p>

        {/* Ceremonial Inscription in Bajoran */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="bg-[#0f172a]/80 border border-amber-500/20 rounded-xl px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1 text-amber-400 font-['Cinzel'] text-lg">
              <span>☥</span>
              <span>Ψ</span>
              <span>Ω</span>
              <span>☥</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-['Cinzel'] text-amber-200 font-semibold tracking-wide">
                "{currentBlessing.bajoran}"
              </p>
              <p className="text-[11px] text-amber-200/60 font-['Outfit']">
                {currentBlessing.english}
              </p>
            </div>
            <button
              onClick={handleNextBlessing}
              title="Rotate Ceremonial Blessing"
              className="p-1 hover:bg-amber-500/20 rounded-md text-amber-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Center Interactive Orb Stage */}
      <div className="my-8 relative flex flex-col items-center justify-center">
        {/* Radiant Light Rays FX */}
        {isOpen && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-sky-500/30 via-amber-400/25 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent blur-sm rotate-45 animate-pulse" />
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-sm -rotate-45 animate-pulse" />
          </div>
        )}

        {/* Concentric Rotating Bajoran Glyph Ring */}
        <div className="relative w-72 sm:w-96 h-72 sm:h-96 flex items-center justify-center">
          {/* Outer Ring */}
          <div
            className={`absolute inset-0 rounded-full border border-amber-500/25 border-dashed transition-transform duration-1000 ${
              isOpen ? 'animate-[spin_40s_linear_infinite]' : 'rotate-0'
            }`}
          />

          {/* Middle Glyph Orbit */}
          <div
            className={`absolute inset-4 rounded-full border border-amber-400/20 transition-transform duration-1000 ${
              isOpen ? 'animate-[spin_25s_linear_infinite_reverse]' : 'rotate-0'
            }`}
          >
            {BAJORAN_GLYPHS.slice(0, 8).map((glyph, idx) => {
              const angle = (idx * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const radius = 135; // px approx for medium screen
              return (
                <div
                  key={glyph.char}
                  className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center text-amber-400/70 font-['Cinzel'] text-xs font-bold transition-all hover:text-amber-200"
                  style={{
                    top: `calc(50% + ${Math.sin(rad) * radius}px)`,
                    left: `calc(50% + ${Math.cos(rad) * radius}px)`,
                  }}
                  title={`${glyph.bajoranName}: ${glyph.meaning}`}
                >
                  {glyph.char}
                </div>
              );
            })}
          </div>

          {/* Golden Reliquary Ark Container */}
          <div
            onClick={handleToggleOrb}
            className="relative cursor-pointer group flex items-center justify-center w-48 sm:w-60 h-48 sm:h-60 rounded-full p-2"
          >
            {/* Ark Base Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/30 via-yellow-600/20 to-sky-600/30 blur-md group-hover:blur-lg transition-all" />

            {/* Ark Golden Filigree Rim */}
            <div className="relative w-full h-full rounded-full border-2 border-amber-400/70 bg-gradient-to-br from-[#1a140a] via-[#0e1726] to-[#070b14] flex items-center justify-center overflow-hidden shadow-2xl shadow-amber-500/30 group-hover:border-amber-300 transition-all">
              {/* Petal/Shutter Mechanism */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-amber-700/60 via-amber-900/80 to-black transition-all duration-700 ease-out flex items-center justify-center ${
                  isOpen ? 'opacity-0 scale-150' : 'opacity-100 scale-100'
                }`}
              >
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mb-2">
                    <span className="font-['Cinzel'] text-amber-300 text-xl font-bold">☥</span>
                  </div>
                  <p className="text-xs font-['Cinzel'] font-bold text-amber-200 tracking-wider">
                    SEALED RELIQUARY
                  </p>
                  <p className="text-[10px] text-amber-300/70 font-['Outfit'] mt-1">
                    Touch to unseal the Orb
                  </p>
                </div>
              </div>

              {/* Radiant Crystalline Orb Core (When Open) */}
              {isOpen && (
                <div className="relative w-36 sm:w-44 h-36 sm:h-44 rounded-full bg-gradient-to-tr from-sky-400 via-amber-200 to-sky-100 p-1 shadow-[0_0_50px_rgba(56,189,248,0.8)] animate-pulse">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-300 via-sky-600 to-indigo-900 relative overflow-hidden flex items-center justify-center">
                    {/* Swirling Hourglass / Vortex effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(56,189,248,0.6)_40%,rgba(15,23,42,0.9)_100%)] animate-[spin_8s_linear_infinite]" />
                    
                    {/* Center Tear of the Prophets */}
                    <div className="relative z-10 text-center pointer-events-none">
                      <div className="w-8 h-14 mx-auto border border-amber-200/90 rounded-full bg-gradient-to-t from-amber-300/80 to-white/90 shadow-lg shadow-amber-300/90 flex items-center justify-center animate-bounce">
                        <div className="w-2 h-4 bg-sky-200 rounded-full blur-[1px]" />
                      </div>
                    </div>

                    {/* Light specular highlight */}
                    <div className="absolute top-2 left-6 w-10 h-6 bg-white/40 rounded-full blur-[3px] -rotate-45" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Orb Status & Prompt */}
        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-xs font-['Cinzel'] tracking-widest text-sky-300 font-semibold uppercase">
              {isOpen ? "Orb of Time Unsealed • Temporal Field Active" : "Reliquary Dormant"}
            </span>
          </div>

          <p className="text-xs text-amber-200/60 max-w-sm">
            {isOpen
              ? "The Celestial Temple is in resonance. Channel your presence into the light."
              : "Click the golden reliquary to open the Tear of the Prophets."}
          </p>
        </div>
      </div>

      {/* Active Temporal Vision Panel */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vision Card */}
        <div className="md:col-span-2 bg-[#0c1220]/90 border border-amber-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-['Cinzel'] text-amber-300 font-bold uppercase tracking-wider">
                  Orb of Time Temporal Glimpse
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                {currentVision.epoch}
              </span>
            </div>

            <p className="text-sm sm:text-base text-amber-50 font-['Outfit'] italic leading-relaxed">
              "{currentVision.vision}"
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-300/70 font-['Cinzel']">Glyph Inscription:</span>
              <div className="flex gap-1.5">
                {currentVision.glyphChars.map((char) => (
                  <span
                    key={char}
                    className="w-6 h-6 rounded bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-['Cinzel'] font-bold flex items-center justify-center shadow-inner"
                  >
                    {char}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-amber-300/80">({currentVision.glyphWord})</span>
            </div>

            <button
              onClick={handleNextVision}
              className="text-xs text-sky-300 hover:text-sky-100 font-['Outfit'] font-medium flex items-center gap-1 transition-colors"
            >
              <span>Next Temporal Vision</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Action Panel */}
        <div className="bg-gradient-to-br from-[#12192c] to-[#0a0f1d] border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-['Cinzel'] font-bold uppercase tracking-wider">
              <Wand2 className="w-4 h-4 text-amber-400" />
              <span>Persona Transformation</span>
            </div>
            <p className="text-xs text-amber-100/70 font-['Outfit']">
              Upload any photo or selfie to undergo neural manifestation as a Bajoran Vedek, Kai, Militia Commander, or Ancient Seer.
            </p>
          </div>

          <div className="space-y-2.5 mt-4">
            <button
              onClick={onStartTransform}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-['Cinzel'] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              <span>Transform Image Now</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 px-4 rounded-xl bg-[#162035] hover:bg-[#1e2c49] border border-amber-500/20 text-amber-200 font-['Outfit'] font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Consult the 9 Sacred Orbs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
