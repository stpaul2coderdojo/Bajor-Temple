import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Wand2, Compass, Languages, Flame, ExternalLink, ShieldCheck, Heart, Box, Smartphone } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface HeaderProps {
  activeTab: 'portal' | 'transform' | 'orbs' | 'translator' | 'sanctuary';
  setActiveTab: (tab: 'portal' | 'transform' | 'orbs' | 'translator' | 'sanctuary') => void;
  onOrbClick?: () => void;
  onOpenAuthorModal?: (tab?: 'authorship' | 'benevity' | 'webapk' | 'docker') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOrbClick, onOpenAuthorModal }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleSound = () => {
    const playing = audioEngine.toggleAmbientDrone();
    setIsAudioPlaying(playing);
    audioEngine.playTempleChime();
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="relative z-30 border-b border-amber-500/20 bg-[#07090e]/80 backdrop-blur-xl sticky top-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Temple Insignia */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('portal')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0d121f] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-sky-400/20 animate-pulse" />
                  <span className="font-['Cinzel'] font-bold text-amber-300 text-xl tracking-tighter group-hover:scale-110 transition-transform">
                    ☥
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-['Cinzel'] text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                    TEMPLE OF BAJOR
                  </h1>
                  <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    PAGH-TEM'FAR
                  </span>
                </div>
                <p className="text-xs text-amber-200/60 font-['Outfit'] flex items-center gap-1.5">
                  <span>Portal of Light</span>
                  <span>•</span>
                  <span className="text-sky-300/80">The Celestial Temple</span>
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d1322]/80 border border-amber-500/15 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setActiveTab('portal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'portal'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-md shadow-amber-500/30'
                  : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Orb of Time</span>
            </button>

            <button
              onClick={() => setActiveTab('transform')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'transform'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-md shadow-amber-500/30'
                  : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Persona Transformation</span>
            </button>

            <button
              onClick={() => setActiveTab('orbs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'orbs'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-md shadow-amber-500/30'
                  : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Sacred Orbs</span>
            </button>

            <button
              onClick={() => setActiveTab('translator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'translator'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-md shadow-amber-500/30'
                  : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>Bajoran Script</span>
            </button>

            <button
              onClick={() => setActiveTab('sanctuary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeTab === 'sanctuary'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-md shadow-amber-500/30'
                  : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Sanctuary</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Ambient Soundscape Synthesizer */}
            <button
              onClick={handleToggleSound}
              title={isAudioPlaying ? 'Stop Ambient Temple Drone' : 'Start Ambient Temple Drone (Web Audio API)'}
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isAudioPlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm shadow-amber-500/20'
                  : 'bg-[#111728] border-amber-500/20 text-amber-300/80 hover:border-amber-400/40 hover:text-amber-100'
              }`}
            >
              {isAudioPlaying ? (
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-amber-400 animate-pulse rounded-full" />
                  <span className="w-1 h-4 bg-amber-300 animate-pulse delay-75 rounded-full" />
                  <span className="w-1 h-2 bg-amber-500 animate-pulse delay-150 rounded-full" />
                  <span className="ml-1 text-[11px] font-['Outfit'] hidden sm:inline">Temple Chants</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-['Outfit'] hidden sm:inline">Soundscape</span>
                </div>
              )}
            </button>

            {/* Benevity Causes: Mother Divine Seattle & Author */}
            {onOpenAuthorModal && (
              <button
                onClick={() => onOpenAuthorModal('benevity')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-950/40 hover:bg-rose-900/40 text-rose-200 text-xs font-['Outfit'] transition-all shadow-sm"
                title="Benevity Causes: Support Mother Divine Inc Seattle"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
                <span className="hidden md:inline font-medium">Benevity Cause</span>
                <span className="md:hidden font-medium">Cause</span>
              </button>
            )}

            {/* Docker & Builds Modal Trigger */}
            {onOpenAuthorModal && (
              <button
                onClick={() => onOpenAuthorModal('docker')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-sky-500/35 bg-sky-950/40 hover:bg-sky-900/40 text-sky-200 text-xs font-['Outfit'] transition-all shadow-sm"
                title="Docker Container & Multi-Platform Builds (Android, iOS, Desktop)"
              >
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden lg:inline font-medium">Docker</span>
              </button>
            )}

            {/* WebAPK / App Trigger */}
            {onOpenAuthorModal && (
              <button
                onClick={() => onOpenAuthorModal('webapk')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-400/35 bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 text-xs font-['Outfit'] transition-all shadow-sm"
                title="Install WebAPK (Android, iOS, Desktop)"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline font-medium">WebAPK</span>
              </button>
            )}

            {/* Temple External Archive Link */}
            <a
              href="https://templeofbajor.weebly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/20 bg-[#111728] hover:bg-amber-500/10 text-amber-300/90 text-xs font-['Outfit'] transition-all"
              title="Visit the Temple of Bajor Sanctuary Archives"
            >
              <span className="hidden sm:inline">templeofbajor.weebly.com</span>
              <span className="sm:hidden">Archives</span>
              <ExternalLink className="w-3 h-3 text-amber-400/80" />
            </a>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="flex lg:hidden overflow-x-auto py-2.5 gap-1.5 border-t border-amber-500/10 no-scrollbar">
          {[
            { id: 'portal', label: 'Orb of Time', icon: Sparkles },
            { id: 'transform', label: 'Transform Persona', icon: Wand2 },
            { id: 'orbs', label: '9 Orbs', icon: Compass },
            { id: 'translator', label: 'Script', icon: Languages },
            { id: 'sanctuary', label: 'Sanctuary', icon: Flame },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'bg-[#111728] text-amber-200/70 border border-amber-500/15'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
