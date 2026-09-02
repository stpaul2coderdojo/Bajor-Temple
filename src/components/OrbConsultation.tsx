import React, { useState } from 'react';
import { Compass, Sparkles, MessageSquare, Send, Eye, Shield, RefreshCw } from 'lucide-react';
import { SACRED_ORBS } from '../data/bajoranLore';
import { SacredOrb, OrbProphecyResponse } from '../types';
import { audioEngine } from '../utils/audioEngine';

export const OrbConsultation: React.FC = () => {
  const [selectedOrb, setSelectedOrb] = useState<SacredOrb>(SACRED_ORBS[0]);
  const [query, setQuery] = useState<string>('What destiny awaits in the Celestial Temple?');
  const [isConsulting, setIsConsulting] = useState<boolean>(false);
  const [prophecy, setProphecy] = useState<OrbProphecyResponse | null>(null);

  const sampleQuestions = [
    'What destiny awaits in the Celestial Temple?',
    'How do I overcome the trials in my current path?',
    'What did the ancient architects of Ashalla foresee?',
    'Is the timeline fixed, or can my choices reweave it?',
  ];

  const handleConsult = async () => {
    if (!query.trim()) return;
    setIsConsulting(true);
    audioEngine.playOrbResonance(528);

    try {
      const response = await fetch('/api/orb-prophecy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orbId: selectedOrb.id,
          query: query,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setProphecy(json.data);
      } else {
        // Fallback
        setProphecy({
          orbId: selectedOrb.id,
          query: query,
          prophecy: 'The timeline is not a road with a single destination, but an unfolding celestial garden. Your devotion to truth is the compass that guides your Pagh.',
          bajoranTranslation: "Pagh-tara Koran Boranat Selan Tem'far",
          bajoranGlyphText: 'P T O B S D',
          temporalVision: 'A glimpse of radiant sunlight illuminating the spires of the Temple of Bakhala across thousands of years.',
          guidanceForPagh: 'Remain centered in faith; turbulence passes as the twin suns rise over Ashalla.',
          visionClarity: 96,
        });
      }
    } catch {
      // Fallback
      setProphecy({
        orbId: selectedOrb.id,
        query: query,
        prophecy: 'The Prophets exist outside linear time. What you perceive as the future is already etched into the celestial continuum.',
        bajoranTranslation: 'Koran Selan Tem Boranat Pagh-tara',
        bajoranGlyphText: 'P T O B',
        temporalVision: 'Solar galleons traversing the Denorios wormhole in radiant synchrony.',
        guidanceForPagh: 'Listen to the stillness within your Pagh before taking the next step.',
        visionClarity: 94,
      });
    } finally {
      setIsConsulting(false);
      audioEngine.playTempleChime();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-['Cinzel'] tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>The 9 Sacred Tears of the Prophets</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
          CONSULT THE SACRED ORBS
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 font-['Outfit']">
          Select an Orb of the Prophets to peer into the timeless realm of the Celestial Temple and receive non-linear prophetic guidance.
        </p>
      </div>

      {/* Orb Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SACRED_ORBS.map((orb) => {
          const isSelected = selectedOrb.id === orb.id;
          return (
            <button
              key={orb.id}
              onClick={() => {
                setSelectedOrb(orb);
                audioEngine.playOrbResonance(500);
              }}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-[#152038] border-amber-400 text-amber-100 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-[#0d1322] border-amber-500/15 text-amber-200/70 hover:bg-[#11192e] hover:border-amber-400/40'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-xs font-bold font-['Cinzel'] shadow-sm"
                style={{
                  backgroundColor: `${orb.glowColor}25`,
                  border: `1.5px solid ${orb.glowColor}`,
                  color: orb.glowColor,
                }}
              >
                ☥
              </div>

              <div>
                <span className="font-['Cinzel'] text-xs font-bold block text-amber-200 truncate">
                  {orb.name}
                </span>
                <span className="text-[10px] text-amber-300/80 font-mono block">
                  {orb.bajoranName}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Orb Focus & Query Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Orb Card */}
        <div className="lg:col-span-5 bg-[#0d1322] border border-amber-500/25 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold font-['Cinzel'] shadow-lg"
              style={{
                backgroundColor: `${selectedOrb.glowColor}20`,
                border: `2px solid ${selectedOrb.glowColor}`,
                color: selectedOrb.glowColor,
                boxShadow: `0 0 25px ${selectedOrb.glowColor}40`,
              }}
            >
              ☥
            </div>
            <div>
              <h3 className="text-lg font-['Cinzel'] font-bold text-amber-200">
                {selectedOrb.name}
              </h3>
              <p className="text-xs text-amber-300/80 font-mono">
                {selectedOrb.bajoranName} • {selectedOrb.title}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-100/80 font-['Outfit'] leading-relaxed">
            {selectedOrb.description}
          </p>

          <div className="p-3 rounded-xl bg-[#11192e] border-l-2 border-amber-400 text-xs italic text-amber-200/90 font-['Outfit']">
            "{selectedOrb.quote}"
          </div>

          <div className="pt-2 text-[11px] text-amber-300/60 font-mono flex items-center justify-between border-t border-amber-500/10">
            <span>Power: {selectedOrb.power}</span>
          </div>
        </div>

        {/* Right Column: Question & Prophecy Reveal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0d1322] border border-amber-500/25 rounded-2xl p-5 space-y-4 shadow-xl">
            <label className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider block">
              Inquire of the Prophets through the {selectedOrb.name}:
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask the Prophets a question regarding your path..."
                className="flex-1 px-4 py-3 rounded-xl bg-[#080c16] border border-amber-500/20 focus:border-amber-400 text-amber-100 text-xs sm:text-sm font-['Outfit'] focus:outline-none transition-colors"
              />
              <button
                onClick={handleConsult}
                disabled={isConsulting || !query.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-['Cinzel'] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/30 transition-all flex items-center gap-1.5 shrink-0"
              >
                {isConsulting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Commune</span>
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-['Cinzel'] text-amber-300/60 uppercase">
                Sacred Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuery(q);
                      audioEngine.playTempleChime();
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#11192e] hover:bg-[#16223e] text-amber-200/70 hover:text-amber-100 border border-amber-500/15 transition-all text-left truncate max-w-full"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prophecy Response Card */}
          {prophecy && (
            <div className="bg-[#0c1220] border-2 border-amber-400/40 rounded-2xl p-6 space-y-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider">
                    Vision from the Celestial Temple
                  </span>
                </div>
                <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-500/30">
                  Clarity: {prophecy.visionClarity}%
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm sm:text-base text-amber-50 font-['Outfit'] italic leading-relaxed">
                  "{prophecy.prophecy}"
                </p>
              </div>

              <div className="p-3 bg-[#11192e] rounded-xl border border-amber-500/15 space-y-1">
                <span className="text-[10px] font-['Cinzel'] text-sky-300 font-bold uppercase block">
                  Temporal Glimpse:
                </span>
                <p className="text-xs text-amber-200/80 font-['Outfit']">
                  {prophecy.temporalVision}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-amber-500/15 text-xs">
                <div>
                  <span className="text-amber-300/70 font-['Cinzel'] block text-[10px]">
                    Ceremonial Chant:
                  </span>
                  <span className="font-['Cinzel'] text-amber-200 font-semibold">
                    "{prophecy.bajoranTranslation}"
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-amber-300/70 font-['Cinzel'] text-[10px]">Glyphs:</span>
                  <span className="text-sm text-amber-400 font-bold font-['Cinzel']">
                    ☥ Ψ Ω ☥
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
