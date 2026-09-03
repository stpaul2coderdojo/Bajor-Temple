import React, { useState, useEffect } from 'react';
import {
  Heart,
  ExternalLink,
  ShieldCheck,
  Building2,
  Smartphone,
  Download,
  Check,
  X,
  Copy,
  Sparkles,
  Info,
  Gift,
  Terminal,
  Box,
  Monitor,
  Apple
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface AuthorBenevityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'authorship' | 'benevity' | 'webapk' | 'docker';
}

export const AuthorBenevityModal: React.FC<AuthorBenevityModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'authorship'
}) => {
  const [activeTab, setActiveTab] = useState<'authorship' | 'benevity' | 'webapk' | 'docker'>(defaultTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [downloadTriggered, setDownloadTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      handleDownloadWebApkPackage();
    }
    audioEngine.playTempleChime();
  };

  const handleDownloadWebApkPackage = () => {
    setDownloadTriggered(true);
    const webApkMeta = {
      name: "Temple of Bajor - Portal of Light & Orb of Time",
      short_name: "Temple of Bajor",
      package_id: "org.motherdivine.templeofbajor.webapk",
      version: "2.5.0",
      author: "Vedek Bheemaiah Anil Kumar",
      organization: "Mother Divine Inc.",
      location: "Seattle, Washington, USA",
      benevity_causes_url: "https://causes.benevity.org/",
      website: "https://templeofbajor.weebly.com/",
      type: "Progressive Web App (PWA) / Android WebAPK",
      start_url: window.location.origin,
      display: "standalone",
      theme_color: "#f59e0b",
      background_color: "#06080e",
      categories: ["entertainment", "lifestyle", "education"],
      instructions: [
        "1. Chrome Android: Open menu -> Tap 'Install app' or 'Add to Home Screen' to generate native WebAPK.",
        "2. iOS Safari: Tap Share icon -> Tap 'Add to Home Screen'.",
        "3. Desktop Chrome/Edge: Click the Install icon in the browser address bar."
      ],
      generated_at: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(webApkMeta, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Mother_Divine_Temple_of_Bajor_WebAPK_Config.json";
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadTriggered(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#090e1b] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/20 text-amber-50 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Background glow accents */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[11px] font-['Cinzel'] text-amber-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Temple of Bajor Sanctuary Information</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-['Cinzel'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500">
              AUTHORSHIP & BENEVITY CAUSES
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#11192e] hover:bg-[#1a2644] border border-amber-500/20 text-amber-300 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-xl bg-[#050811] p-1 border border-amber-500/20 text-xs font-['Cinzel']">
          <button
            onClick={() => setActiveTab('authorship')}
            className={`flex-1 py-2 px-1 sm:px-2 rounded-lg transition-all text-center ${
              activeTab === 'authorship'
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'text-amber-200/70 hover:text-amber-100'
            }`}
          >
            Authorship
          </button>
          <button
            onClick={() => setActiveTab('benevity')}
            className={`flex-1 py-2 px-1 sm:px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              activeTab === 'benevity'
                ? 'bg-rose-500 text-white font-bold shadow'
                : 'text-amber-200/70 hover:text-amber-100'
            }`}
          >
            <Heart className="w-3 h-3 text-rose-300 fill-rose-300/40" />
            <span className="truncate">Benevity</span>
          </button>
          <button
            onClick={() => setActiveTab('webapk')}
            className={`flex-1 py-2 px-1 sm:px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              activeTab === 'webapk'
                ? 'bg-amber-500 text-black font-bold shadow'
                : 'text-amber-200/70 hover:text-amber-100'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span className="truncate">WebAPK</span>
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`flex-1 py-2 px-1 sm:px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
              activeTab === 'docker'
                ? 'bg-sky-500 text-black font-bold shadow'
                : 'text-amber-200/70 hover:text-amber-100'
            }`}
          >
            <Box className="w-3 h-3 text-sky-400" />
            <span className="truncate">Docker</span>
          </button>
        </div>

        {/* Tab 1: Authorship */}
        {activeTab === 'authorship' && (
          <div className="space-y-4 font-['Outfit']">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#16223e] border border-amber-500/30 space-y-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 text-2xl font-bold font-['Cinzel'] shadow-inner">
                  ☥
                </div>
                <div>
                  <div className="text-[11px] text-amber-300/80 uppercase tracking-widest font-['Cinzel'] font-bold">
                    Sanctuary Creator & Guide
                  </div>
                  <h4 className="text-xl font-['Cinzel'] font-bold text-amber-200">
                    Vedek Bheemaiah Anil Kumar
                  </h4>
                  <div className="text-xs text-amber-300 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mother Divine Inc., Seattle</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-500/20 space-y-2.5 text-xs text-amber-100/90 leading-relaxed">
                <div className="flex items-center justify-between py-1 border-b border-amber-500/10">
                  <span className="text-amber-300/70">Author:</span>
                  <span className="font-semibold text-amber-100">Vedek Bheemaiah Anil Kumar</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-amber-500/10">
                  <span className="text-amber-300/70">Organization:</span>
                  <span className="font-semibold text-amber-100">Mother Divine Inc.</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-amber-500/10">
                  <span className="text-amber-300/70">City / Headquarters:</span>
                  <span className="font-semibold text-amber-100">Seattle, Washington</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-amber-300/70">Sanctuary Archives:</span>
                  <a
                    href="https://templeofbajor.weebly.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-200 underline font-mono flex items-center gap-1"
                  >
                    <span>templeofbajor.weebly.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080d18] border border-amber-500/20 text-xs text-amber-200/80 leading-relaxed italic text-center">
              "Dedicated to honoring the timeless spiritual heritage, non-linear Orb of Time visions, and sacred community of Bajor and the Celestial Temple."
            </div>
          </div>
        )}

        {/* Tab 2: Benevity Causes */}
        {activeTab === 'benevity' && (
          <div className="space-y-4 font-['Outfit']">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1a111f] to-[#12192e] border-2 border-rose-500/40 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400 flex items-center justify-center text-rose-300">
                    <Heart className="w-6 h-6 fill-rose-500/30" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300 font-bold uppercase tracking-wider">
                      Workplace Giving & Matching
                    </span>
                    <h4 className="text-lg font-['Cinzel'] font-bold text-amber-100 mt-1">
                      Mother Divine Inc. Seattle on Benevity Causes
                    </h4>
                  </div>
                </div>
              </div>

              <p className="text-xs text-amber-100/90 leading-relaxed">
                Support <strong className="text-amber-300 font-semibold">Mother Divine Inc., Seattle</strong> through your corporate workplace giving, employer donation matching, and volunteer grant programs powered by <strong>Benevity Causes</strong>.
              </p>

              {/* Cause Details Box */}
              <div className="p-3.5 rounded-xl bg-[#0b0e1b] border border-rose-500/25 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-rose-300/70">Cause Name:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-200 font-bold">Mother Divine Inc</span>
                    <button
                      onClick={() => handleCopy('Mother Divine Inc', 'cause')}
                      className="text-amber-400 hover:text-amber-200 p-1"
                      title="Copy cause name"
                    >
                      {copiedText === 'cause' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-rose-300/70">Location:</span>
                  <span className="text-amber-200">Seattle, WA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-rose-300/70">Platform:</span>
                  <span className="text-rose-200 font-bold">Benevity Causes Portal</span>
                </div>
              </div>

              {/* Direct Benevity Link Button */}
              <a
                href="https://causes.benevity.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 text-white font-['Cinzel'] font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-rose-200" />
                <span>Open Benevity Causes Portal</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-[#0a0f1d] border border-amber-500/15 text-xs text-amber-200/70 space-y-1">
              <span className="font-semibold text-amber-300 block">How to give via your employer:</span>
              <p className="text-[11px] leading-relaxed">
                Log into your company’s Benevity giving portal (e.g., Apple, Microsoft, Google, Nike, Starbucks), search for <em>Mother Divine Inc</em> (Seattle), and submit your contribution for automatic employer dollar-for-dollar matching.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: WebAPK & Standalone App */}
        {activeTab === 'webapk' && (
          <div className="space-y-4 font-['Outfit']">
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-['Cinzel'] font-bold text-amber-200 text-base">
                    Temple of Bajor WebAPK
                  </h4>
                  <p className="text-xs text-amber-200/60 font-mono">
                    org.motherdivine.templeofbajor.webapk • v2.5.0
                  </p>
                </div>
              </div>

              <p className="text-xs text-amber-100/80 leading-relaxed">
                Install this sanctuary app directly to your home screen with zero latency, full offline capability, and native fullscreen temple communion.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-['Cinzel'] font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {isInstalled ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>App Active in Standalone Mode</span>
                    </>
                  ) : deferredPrompt ? (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>Install WebAPK Now</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download WebAPK Package & Config</span>
                    </>
                  )}
                </button>

                {downloadTriggered && (
                  <p className="text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    WebAPK Package configuration downloaded!
                  </p>
                )}
              </div>
            </div>

            {/* Platform Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-200/70">
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-amber-500/15 space-y-1">
                <span className="font-bold text-amber-300 block">Android (Chrome):</span>
                <span>Tap the three dots (⋮) &gt; select "Install App" or "Add to Home screen" to generate native WebAPK.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-amber-500/15 space-y-1">
                <span className="font-bold text-amber-300 block">iOS (Safari):</span>
                <span>Tap the Share button &gt; scroll down and select "Add to Home Screen".</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Docker & Multi-Platform Builds */}
        {activeTab === 'docker' && (
          <div className="space-y-4 font-['Outfit']">
            <div className="p-5 rounded-2xl bg-[#0a1224] border-2 border-sky-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-400 text-sky-300">
                    <Box className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-['Cinzel'] font-bold text-sky-200 text-base">
                      Docker Container
                    </h4>
                    <p className="text-xs text-sky-300/70 font-mono">
                      temple-of-bajor:latest • Port 3000
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/40 text-sky-300 font-bold uppercase">
                  Production
                </span>
              </div>

              <p className="text-xs text-amber-100/80 leading-relaxed">
                Run the multi-stage, hardened Node 20 Alpine production container locally or deploy to any Kubernetes / Cloud Run cluster:
              </p>

              {/* One-click docker run copy snippet */}
              <div className="p-3 rounded-xl bg-[#040813] border border-sky-500/25 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-sky-300/80 font-mono">
                  <span>Docker CLI Command</span>
                  <button
                    onClick={() => handleCopy('docker run -d -p 3000:3000 --name temple-of-bajor temple-of-bajor:latest', 'docker-run')}
                    className="text-sky-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedText === 'docker-run' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'docker-run' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-amber-200/90 overflow-x-auto whitespace-pre p-2 rounded bg-black/50">
                  docker run -d -p 3000:3000 --name temple-of-bajor temple-of-bajor:latest
                </pre>
              </div>

              {/* Compose Command */}
              <div className="p-3 rounded-xl bg-[#040813] border border-sky-500/25 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-sky-300/80 font-mono">
                  <span>Docker Compose</span>
                  <button
                    onClick={() => handleCopy('docker compose up -d', 'docker-compose')}
                    className="text-sky-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedText === 'docker-compose' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'docker-compose' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-amber-200/90 overflow-x-auto whitespace-pre p-2 rounded bg-black/50">
                  docker compose up -d
                </pre>
              </div>
            </div>

            {/* Platform builds summary */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-amber-500/15 space-y-1">
                <Smartphone className="w-4 h-4 text-emerald-400 mx-auto" />
                <span className="font-bold text-amber-200 block text-[11px]">Android</span>
                <span className="text-[10px] text-amber-300/60 font-mono">WebAPK</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-amber-500/15 space-y-1">
                <Apple className="w-4 h-4 text-rose-300 mx-auto" />
                <span className="font-bold text-amber-200 block text-[11px]">iOS</span>
                <span className="text-[10px] text-amber-300/60 font-mono">Safari PWA</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-amber-500/15 space-y-1">
                <Monitor className="w-4 h-4 text-sky-300 mx-auto" />
                <span className="font-bold text-amber-200 block text-[11px]">Desktop</span>
                <span className="text-[10px] text-amber-300/60 font-mono">Chrome / Edge</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
