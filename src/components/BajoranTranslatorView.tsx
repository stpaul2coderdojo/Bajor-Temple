import React, { useState } from 'react';
import { Languages, Sparkles, Copy, Check, Volume2, ArrowRight } from 'lucide-react';
import { BAJORAN_GLYPHS, CEREMONIAL_BLESSINGS } from '../data/bajoranLore';
import { translateToBajoran } from '../utils/bajoranTranslator';
import { audioEngine } from '../utils/audioEngine';

export const BajoranTranslatorView: React.FC = () => {
  const [inputText, setInputText] = useState<string>('May the light of the Orb guide your soul');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeGlyph, setActiveGlyph] = useState(BAJORAN_GLYPHS[0]);

  const translation = translateToBajoran(inputText);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${translation.translatedText} (${translation.phoneticText}) - Temple of Bajor Translation`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    audioEngine.playTempleChime();
  };

  const handlePronounce = () => {
    audioEngine.playOrbResonance(528);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-['Cinzel'] tracking-widest uppercase">
          <Languages className="w-3.5 h-3.5" />
          <span>Sacred Script of Ashalla</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
          BAJORAN LANGUAGE & GLYPHS
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 font-['Outfit']">
          Translate speech and sacred scripture into the ceremonial tongue of the Prophets, explore the 26 ancient glyph characters, and chant the litanies of the Temple.
        </p>
      </div>

      {/* Translator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-[#0d1322] border border-amber-500/25 rounded-2xl p-5 space-y-3 shadow-xl">
          <label className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider flex items-center justify-between">
            <span>Enter English / Federation Text:</span>
            <span className="text-[10px] text-amber-400/60 font-normal">Real-time Phonetics</span>
          </label>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-[#080c16] border border-amber-500/20 focus:border-amber-400 text-amber-100 text-sm font-['Outfit'] focus:outline-none transition-colors resize-none"
            placeholder="Type any word, blessing, or phrase..."
          />

          {/* Preset ceremonial phrase tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {CEREMONIAL_BLESSINGS.map((b) => (
              <button
                key={b.english}
                onClick={() => {
                  setInputText(b.english);
                  audioEngine.playTempleChime();
                }}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-[#11192e] hover:bg-[#16223e] text-amber-200/70 hover:text-amber-100 border border-amber-500/15 transition-all text-left"
              >
                "{b.english.slice(0, 30)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Translated Output Panel */}
        <div className="bg-[#0d1322] border border-amber-500/25 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider">
                Bajoran Script & Phonetics:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePronounce}
                  title="Resonate Chant Audio"
                  className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  title="Copy Translation"
                  className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Glowing Glyphs Display */}
            <div className="p-4 bg-[#070b14] border border-amber-500/20 rounded-xl flex items-center justify-center gap-2 min-h-[60px]">
              <div className="flex gap-2">
                {translation.glyphs.map((char, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 font-['Cinzel'] font-bold text-base flex items-center justify-center shadow-inner"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-base font-['Cinzel'] font-bold text-amber-200">
                "{translation.translatedText}"
              </p>
              <p className="text-xs text-amber-300/70 font-mono mt-1">
                Phonetic: [{translation.phoneticText}]
              </p>
            </div>
          </div>

          <div className="text-[11px] text-amber-200/50 font-['Outfit'] border-t border-amber-500/10 pt-2">
            The Bajoran language reflects the non-linear sacred connection between all souls and the Celestial Temple.
          </div>
        </div>
      </div>

      {/* Glyph Compendium Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-['Cinzel'] font-bold text-amber-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>The 12 Sacred Root Glyphs of Ashalla</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {BAJORAN_GLYPHS.map((glyph) => {
            const isSelected = activeGlyph.char === glyph.char;
            return (
              <button
                key={glyph.char}
                onClick={() => {
                  setActiveGlyph(glyph);
                  audioEngine.playTempleChime();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#152038] border-amber-400 text-amber-100 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-[#0d1322] border-amber-500/15 text-amber-200/70 hover:bg-[#11192e] hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center font-['Cinzel'] font-bold text-amber-300 text-sm">
                    {glyph.char}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/20">
                    {glyph.element}
                  </span>
                </div>

                <div className="font-['Cinzel'] text-xs font-bold text-amber-200 truncate">
                  {glyph.bajoranName}
                </div>
                <div className="text-[10px] text-amber-300/70 font-mono mt-0.5">
                  [{glyph.phonetic}]
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Glyph Deep Lore */}
        <div className="bg-[#0c1220] border border-amber-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl font-['Cinzel'] font-bold text-amber-300 shadow-lg shadow-amber-500/20">
              {activeGlyph.char}
            </div>
            <div>
              <h4 className="text-base font-['Cinzel'] font-bold text-amber-200">
                Glyph "{activeGlyph.char}" — {activeGlyph.bajoranName}
              </h4>
              <p className="text-xs text-amber-300/80 font-mono">
                Phonetic Chanting: [{activeGlyph.phonetic}] • Element: {activeGlyph.element}
              </p>
              <p className="text-xs text-amber-100/70 font-['Outfit'] mt-1">
                {activeGlyph.meaning}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setInputText(activeGlyph.meaning);
              audioEngine.playOrbResonance(528);
            }}
            className="px-4 py-2 rounded-xl bg-[#11192e] hover:bg-[#16223e] border border-amber-500/20 text-amber-200 text-xs font-['Outfit'] transition-colors whitespace-nowrap"
          >
            Translate Glyph Concept
          </button>
        </div>
      </div>
    </div>
  );
};
