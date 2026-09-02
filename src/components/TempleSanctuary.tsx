import React, { useState, useEffect } from 'react';
import { Flame, Play, Pause, RotateCcw, Sparkles, ExternalLink, BookOpen, Volume2, Shield } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const TempleSanctuary: React.FC = () => {
  const [isMeditating, setIsMeditating] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(180); // 3 mins default
  const [selectedDuration, setSelectedDuration] = useState<number>(180);
  const [flameIntensity, setFlameIntensity] = useState<number>(1.0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMeditating && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsMeditating(false);
            audioEngine.playTempleChime();
            return 0;
          }
          if (prev % 60 === 0) {
            audioEngine.playTempleChime();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMeditating, secondsRemaining]);

  const handleStartMeditation = () => {
    if (!isMeditating) {
      audioEngine.playTempleChime();
      audioEngine.playOrbResonance(528);
      setIsMeditating(true);
    } else {
      setIsMeditating(false);
    }
  };

  const handleResetTimer = (dur: number) => {
    setSelectedDuration(dur);
    setSecondsRemaining(dur);
    setIsMeditating(false);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-['Cinzel'] tracking-widest uppercase">
          <Flame className="w-3.5 h-3.5" />
          <span>The Inner Sanctuary of Ashalla</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
          TEMPLE SANCTUARY & MEDITATION
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 font-['Outfit']">
          Center your Pagh in the quiet sanctuary of the Prophets. Enter sacred meditation accompanied by resonant temple singing bowls and celestial contemplation.
        </p>
      </div>

      {/* Sanctuary Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Meditation Chamber & Singing Bowl Timer */}
        <div className="lg:col-span-7 bg-[#0d1322] border border-amber-500/25 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
          {/* Sacred Brazier Visualizer */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl bg-gradient-to-b from-[#070b14] via-[#0f172a] to-[#1e1308] border border-amber-500/20 overflow-hidden flex flex-col items-center justify-center">
            {/* Atmospheric light glow */}
            <div
              className="absolute w-40 h-40 rounded-full bg-amber-500/20 blur-3xl transition-all duration-1000"
              style={{ transform: `scale(${isMeditating ? 1.5 : 1.0})` }}
            />

            {/* Sacred Brazier Icon */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <Flame
                  className={`w-16 h-16 text-amber-400 transition-transform duration-700 ${
                    isMeditating ? 'animate-bounce text-amber-300 scale-110' : 'text-amber-500/80'
                  }`}
                />
                <div className="absolute inset-0 bg-amber-400 blur-md opacity-40 animate-pulse" />
              </div>

              <span className="font-['Cinzel'] text-xs font-bold text-amber-200 mt-2 tracking-widest uppercase">
                {isMeditating ? 'Pagh in Communion' : 'Sacred Brazier of Ashalla'}
              </span>
            </div>

            {/* Inscription watermark */}
            <div className="absolute bottom-2 text-[10px] text-amber-400/40 font-['Cinzel'] tracking-widest">
              BORANAT ASHALLA • CELESTIAL TEMPLE
            </div>
          </div>

          {/* Timer Display */}
          <div className="text-center space-y-3">
            <div className="text-5xl sm:text-6xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 tracking-wider">
              {formatTime(secondsRemaining)}
            </div>
            <p className="text-xs text-amber-200/60 font-['Outfit']">
              {isMeditating ? 'Breathe deeply. Let the presence of the Prophets fill your thoughts.' : 'Select a meditation duration and begin your communion.'}
            </p>

            {/* Duration Selector */}
            <div className="flex justify-center gap-2 pt-2">
              {[
                { label: '1 Min', secs: 60 },
                { label: '3 Mins', secs: 180 },
                { label: '5 Mins', secs: 300 },
                { label: '10 Mins', secs: 600 },
              ].map((dur) => (
                <button
                  key={dur.secs}
                  onClick={() => handleResetTimer(dur.secs)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-['Outfit'] border transition-all ${
                    selectedDuration === dur.secs
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                      : 'bg-[#11192e] border-amber-500/15 text-amber-200/70 hover:bg-[#16223e]'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>

            {/* Meditation Action Controls */}
            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={handleStartMeditation}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-['Cinzel'] font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                {isMeditating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isMeditating ? 'Pause Meditation' : 'Begin Pagh Meditation'}</span>
              </button>

              <button
                onClick={() => handleResetTimer(selectedDuration)}
                className="px-4 py-3 rounded-xl bg-[#11192e] border border-amber-500/20 text-amber-300 font-['Outfit'] text-xs hover:bg-[#16223e] transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Scripture Archives & Temple of Bajor Link */}
        <div className="lg:col-span-5 space-y-4">
          {/* Temple of Bajor Official Portal Card */}
          <div className="bg-gradient-to-br from-[#121a30] to-[#0a0f1d] border-2 border-amber-400/40 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-['Cinzel'] text-amber-300 font-bold uppercase tracking-wider">
                Temple of Bajor Archives
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Official Sanctuary
              </span>
            </div>

            <p className="text-xs text-amber-100/80 font-['Outfit'] leading-relaxed">
              Explore the living spiritual home, historical chronicles, liturgical teachings, and philosophical community at <span className="text-amber-300 font-semibold">templeofbajor.weebly.com</span>.
            </p>

            <a
              href="https://templeofbajor.weebly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1a2542] hover:bg-[#23325a] border border-amber-400/40 text-amber-200 text-xs font-['Cinzel'] font-bold flex items-center justify-center gap-2 transition-all group"
            >
              <span>Visit templeofbajor.weebly.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Sacred Lore Readings */}
          <div className="bg-[#0d1322] border border-amber-500/20 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-['Cinzel'] text-amber-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Sacred Litany of the Celestial Temple</span>
            </h4>

            <div className="space-y-2 text-xs text-amber-100/70 font-['Outfit']">
              <p className="italic bg-[#11192e] p-3 rounded-xl border border-amber-500/10">
                "The Prophets did not build the Celestial Temple with stone or mortar, but with the eternal fabric of space and thought. In their sight, all generations are one choir."
              </p>
              <p className="italic bg-[#11192e] p-3 rounded-xl border border-amber-500/10">
                "When your Pagh is clouded, look not into the shadow, but into the Tear of the Prophets. The light will show you who you have always been."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
