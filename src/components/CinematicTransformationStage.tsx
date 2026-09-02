import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Wand2, Download, RotateCcw, Share2, Play, Pause, Layers, Eye, ShieldCheck, Flame, Volume2, Award } from 'lucide-react';
import { TransformationResult } from '../types';
import { audioEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface CinematicTransformationStageProps {
  result: TransformationResult;
  onReset: () => void;
}

export const CinematicTransformationStage: React.FC<CinematicTransformationStageProps> = ({
  result,
  onReset,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0-100
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(true);
  const [glowIntensity, setGlowIntensity] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'prophecy' | 'relic'>('visualizer');
  const [relicDownloaded, setRelicDownloaded] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cinematic pulse and particle celebration on initial load
  useEffect(() => {
    audioEngine.playOrbResonance(528);
    audioEngine.playTempleChime();

    // Trigger golden celestial stardust confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#fbbf24', '#ffffff'],
      });
    } catch {
      // Ignore confetti if unsupported
    }
  }, []);

  // Visualizer Canvas effect for glowing nasal ridges, ear cuff glint, and celestial aura
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlayingAnimation) {
        // Celestial aura around the portrait
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width * 0.45;

        const aura = ctx.createRadialGradient(
          centerX,
          centerY,
          radius * 0.5,
          centerX,
          centerY,
          radius
        );
        const pulse = Math.sin(time * 2) * 0.15 + 0.85;
        aura.addColorStop(0, 'rgba(56, 189, 248, 0)');
        aura.addColorStop(0.7, `rgba(245, 158, 11, ${0.12 * pulse * glowIntensity})`);
        aura.addColorStop(1, `rgba(56, 189, 248, ${0.25 * pulse * glowIntensity})`);

        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Simulated Bajoran nasal ridges light glow along the bridge of the nose
        const noseX = canvas.width * 0.5;
        const noseY = canvas.height * 0.42;
        const ridgeCount = result.characteristics.nasalRidgesCount || 5;

        for (let i = 0; i < ridgeCount; i++) {
          const yOffset = (i - ridgeCount / 2) * 6;
          const ridgeWidth = 24 - Math.abs(i - ridgeCount / 2) * 3;
          const ridgeGlow = Math.sin(time * 3 + i * 0.5) * 0.3 + 0.7;

          ctx.beginPath();
          ctx.ellipse(noseX, noseY + yOffset, ridgeWidth / 2, 1.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254, 240, 138, ${0.45 * ridgeGlow * glowIntensity})`;
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Simulated right ear D'ja Pagh glint
        const earX = canvas.width * 0.68;
        const earY = canvas.height * 0.45;
        const glint = Math.sin(time * 4) * 0.5 + 0.5;

        ctx.save();
        ctx.translate(earX, earY);
        ctx.rotate(time * 0.5);
        ctx.fillStyle = `rgba(255, 255, 255, ${glint * 0.9 * glowIntensity})`;
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlayingAnimation, glowIntensity, result]);

  // Generate and download the Ceremonial Relic Card
  const handleDownloadRelicCard = () => {
    const cardCanvas = document.createElement('canvas');
    cardCanvas.width = 1200;
    cardCanvas.height = 800;
    const ctx = cardCanvas.getContext('2d');
    if (!ctx) return;

    // Rich parchment background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, '#0d1322');
    bgGrad.addColorStop(0.5, '#151d32');
    bgGrad.addColorStop(1, '#090d18');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // Ornate Golden Border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, 1120, 720);

    // Header Title
    ctx.font = "bold 36px 'Cinzel', serif";
    ctx.fillStyle = '#fef3c7';
    ctx.textAlign = 'center';
    ctx.fillText('TEMPLE OF BAJOR • SACRED IDENTITY RELIC', 600, 95);

    ctx.font = "16px 'Outfit', sans-serif";
    ctx.fillStyle = '#f59e0b';
    ctx.fillText("BORANAT ASHALLA • CELESTIAL TEMPLE CONTINUUM", 600, 125);

    // Render image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 70, 170, 380, 480);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.strokeRect(70, 170, 380, 480);

      // Text Data
      ctx.textAlign = 'left';
      ctx.font = "bold 32px 'Cinzel', serif";
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(result.bajoranName, 490, 220);

      ctx.font = "18px 'Outfit', sans-serif";
      ctx.fillStyle = '#93c5fd';
      ctx.fillText(`Archetype: ${result.archetype.name}`, 490, 260);

      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`Pagh Resonance: ${result.paghResonance}% (${result.paghStatus})`, 490, 295);
      ctx.fillText(`Spiritual Lineage: ${result.spiritualLineage}`, 490, 330);
      ctx.fillText(`Ear Cuff: ${result.earCuff.name} (${result.earCuff.material})`, 490, 365);
      ctx.fillText(`Temporal Epoch: ${result.epoch.name}`, 490, 400);

      // Prophecy text
      ctx.fillStyle = '#fbbf24';
      ctx.font = "bold 18px 'Cinzel', serif";
      ctx.fillText("ORB OF TIME PROPHECY:", 490, 455);

      ctx.font = "italic 16px 'Outfit', sans-serif";
      ctx.fillStyle = '#f8fafc';
      const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
      };
      wrapText(result.prophecyText, 490, 485, 620, 24);

      // Bajoran Script line
      ctx.font = "15px 'Cinzel', serif";
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Ceremonial Inscription: "${result.bajoranScriptProphecy}"`, 490, 600);

      // Footer
      ctx.font = "12px 'Outfit', sans-serif";
      ctx.fillStyle = '#64748b';
      ctx.fillText(`Sanctuary Coordinates: ${result.temporalCoordinates} • Temple of Bajor Archive`, 490, 640);

      // Download
      const link = document.createElement('a');
      link.download = `${result.bajoranName.replace(/\s+/g, '_')}_Temple_of_Bajor_Relic.png`;
      link.href = cardCanvas.toDataURL('image/png');
      link.click();
      setRelicDownloaded(true);
      audioEngine.playTempleChime();
    };
    img.src = result.transformedImage || result.originalImage;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cinematic Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-['Cinzel'] text-amber-300 font-bold uppercase tracking-wider">
              Temporal Manifestation Complete
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
            {result.bajoranName}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 font-['Outfit'] mt-0.5">
            {result.archetype.title} • {result.spiritualLineage}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              audioEngine.playOrbResonance(528);
              setIsPlayingAnimation(!isPlayingAnimation);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#11192e] border border-amber-500/30 text-amber-200 text-xs font-['Outfit'] hover:bg-[#16223e] transition-all"
          >
            {isPlayingAnimation ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPlayingAnimation ? 'Pause Stardust' : 'Play Stardust'}</span>
          </button>

          <button
            onClick={handleDownloadRelicCard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-['Cinzel'] font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Relic Card</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111728] border border-amber-500/20 text-amber-300 text-xs font-['Outfit'] hover:bg-amber-500/10 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Transform Another</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visualizer Stage with Before/After Slider */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-amber-500/30 bg-black shadow-2xl shadow-amber-500/20">
            {/* Visualizer Canvas overlay */}
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* Split Image Display */}
            {isComparing ? (
              <div className="relative w-full h-full select-none">
                {/* Background Image (Transformed Bajoran Persona) */}
                <img
                  src={result.transformedImage || result.originalImage}
                  alt="Bajoran Persona"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Foreground Image (Original Earth/Input Face) clipped by slider */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={result.originalImage}
                    alt="Original Input"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-['Cinzel'] text-amber-200 border border-amber-500/30">
                    Terran Template
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-['Cinzel'] text-amber-300 border border-amber-500/30">
                  Bajoran Persona
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 -ml-3 w-6 flex items-center justify-center pointer-events-none z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-black flex items-center justify-center text-black font-bold text-[10px] shadow-lg shadow-amber-400/80">
                    ↔
                  </div>
                </div>

                {/* Range Input for Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                />
              </div>
            ) : (
              <img
                src={result.transformedImage || result.originalImage}
                alt="Bajoran Persona"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Slider & Effect Controls */}
          <div className="bg-[#0c1220] border border-amber-500/20 rounded-xl p-3 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsComparing(!isComparing)}
                className={`px-3 py-1.5 rounded-lg border font-['Outfit'] transition-all ${
                  isComparing
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-[#111728] border-amber-500/20 text-amber-300/70'
                }`}
              >
                <Layers className="w-3.5 h-3.5 inline mr-1" />
                {isComparing ? 'Split Slider Active' : 'Full View'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-amber-300/70 font-['Cinzel']">Orb Luminescence:</span>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.1"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(Number(e.target.value))}
                className="w-24 accent-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Spiritual Pagh Reading & Lore Tabs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Navigation Sub-Tabs */}
          <div className="flex rounded-xl bg-[#0d1322] border border-amber-500/20 p-1">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`flex-1 py-2 rounded-lg text-xs font-['Cinzel'] font-bold transition-all ${
                activeTab === 'visualizer'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-amber-200/70 hover:text-amber-100'
              }`}
            >
              Pagh Reading
            </button>
            <button
              onClick={() => setActiveTab('prophecy')}
              className={`flex-1 py-2 rounded-lg text-xs font-['Cinzel'] font-bold transition-all ${
                activeTab === 'prophecy'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-amber-200/70 hover:text-amber-100'
              }`}
            >
              Orb Inscription
            </button>
            <button
              onClick={() => setActiveTab('relic')}
              className={`flex-1 py-2 rounded-lg text-xs font-['Cinzel'] font-bold transition-all ${
                activeTab === 'relic'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-amber-200/70 hover:text-amber-100'
              }`}
            >
              Relic Details
            </button>
          </div>

          {/* Tab 1: Spiritual Pagh Reading */}
          {activeTab === 'visualizer' && (
            <div className="bg-[#0d1322]/90 border border-amber-500/25 rounded-2xl p-5 space-y-4 shadow-xl">
              {/* Resonance Gauge */}
              <div className="bg-[#141c30] border border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-['Cinzel'] text-amber-300/80 uppercase tracking-widest block">
                    PAGH RESONANCE SPECTRUM
                  </span>
                  <span className="text-xl font-['Cinzel'] font-bold text-amber-200">
                    {result.paghResonance}% • {result.paghStatus}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center font-['Cinzel'] font-bold text-amber-300 text-lg shadow-inner">
                  ☥
                </div>
              </div>

              {/* Persona Attributes */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-amber-200/60 font-['Outfit']">Bajoran Name:</span>
                  <span className="font-['Cinzel'] font-bold text-amber-200">{result.bajoranName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-amber-200/60 font-['Outfit']">Archetype Title:</span>
                  <span className="font-['Outfit'] text-amber-300">{result.archetype.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-amber-200/60 font-['Outfit']">D'ja Pagh Ear Cuff:</span>
                  <span className="font-['Outfit'] text-amber-300">{result.earCuff.name} ({result.earCuff.material})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-amber-200/60 font-['Outfit']">Spiritual Lineage:</span>
                  <span className="font-['Outfit'] text-amber-300">{result.spiritualLineage}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-amber-500/10">
                  <span className="text-amber-200/60 font-['Outfit']">Temporal Epoch:</span>
                  <span className="font-['Outfit'] text-sky-300">{result.epoch.name}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-amber-200/60 font-['Outfit']">Nasal Ridge Count:</span>
                  <span className="font-mono text-amber-300">{result.characteristics.nasalRidgesCount} Ridges</span>
                </div>
              </div>

              {/* Prophecy Quote */}
              <div className="bg-[#11192e] border-l-2 border-amber-400 rounded-r-xl p-3.5 space-y-1">
                <span className="text-[10px] font-['Cinzel'] text-amber-300 font-bold uppercase tracking-wider block">
                  Prophetic Vision of the Pagh:
                </span>
                <p className="text-xs text-amber-100/90 font-['Outfit'] italic leading-relaxed">
                  "{result.prophecyText}"
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Prophecy & Bajoran Calligraphy */}
          {activeTab === 'prophecy' && (
            <div className="bg-[#0d1322]/90 border border-amber-500/25 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="text-center space-y-2">
                <span className="text-[11px] font-['Cinzel'] text-amber-300 uppercase tracking-widest">
                  SACRED BAJORAN GLYPH PROPHECY
                </span>

                <div className="py-4 px-3 bg-[#070b14] border border-amber-500/20 rounded-xl flex items-center justify-center gap-2">
                  <span className="text-2xl text-amber-400 font-['Cinzel'] tracking-widest font-bold">
                    ☥ Ψ Ω ☥ ☥
                  </span>
                </div>

                <p className="text-xs font-['Cinzel'] text-amber-200 font-bold tracking-wider">
                  "{result.bajoranScriptProphecy}"
                </p>
                <p className="text-[11px] text-amber-200/60 font-['Outfit'] italic">
                  Chanted by the Vedeks of Ashalla during the dawn meditation.
                </p>
              </div>

              <div className="p-3 bg-[#11192e] rounded-xl border border-amber-500/15 space-y-1.5 text-xs text-amber-200/80 font-['Outfit']">
                <div className="font-semibold text-amber-300 font-['Cinzel']">Spiritual Exegesis:</div>
                <p>
                  The Prophets perceive your timeline as an unbroken loop of courage. The nasal ridges anchored upon your countenance signify endurance through cosmic trials.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Relic Export */}
          {activeTab === 'relic' && (
            <div className="bg-[#0d1322]/90 border border-amber-500/25 rounded-2xl p-5 space-y-4 shadow-xl text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                <Award className="w-7 h-7 text-amber-300" />
              </div>

              <div className="space-y-1">
                <h3 className="font-['Cinzel'] font-bold text-base text-amber-200">
                  Temple of Bajor Identity Relic
                </h3>
                <p className="text-xs text-amber-200/70 font-['Outfit']">
                  Download a high-resolution certificate parchment incorporating your transformed portrait, official Bajoran glyph seals, and Pagh resonance inscription.
                </p>
              </div>

              <button
                onClick={handleDownloadRelicCard}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-['Cinzel'] font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Parchment Relic Card</span>
              </button>

              {relicDownloaded && (
                <div className="text-[11px] text-emerald-400 font-['Outfit']">
                  ✓ Relic card exported successfully to your downloads!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
