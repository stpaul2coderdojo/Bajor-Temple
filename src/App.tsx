/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CelestialBackground } from './components/CelestialBackground';
import { OrbOfTimePortal } from './components/OrbOfTimePortal';
import { PersonaTransformer } from './components/PersonaTransformer';
import { CinematicTransformationStage } from './components/CinematicTransformationStage';
import { OrbConsultation } from './components/OrbConsultation';
import { BajoranTranslatorView } from './components/BajoranTranslatorView';
import { TempleSanctuary } from './components/TempleSanctuary';
import { AuthorBenevityModal } from './components/AuthorBenevityModal';
import { TransformationResult } from './types';
import { ExternalLink, Sparkles, Heart, Smartphone, Building2, User } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'transform' | 'orbs' | 'translator' | 'sanctuary'>('portal');
  const [transformationResult, setTransformationResult] = useState<TransformationResult | null>(null);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [authorModalTab, setAuthorModalTab] = useState<'authorship' | 'benevity' | 'webapk'>('authorship');

  const handleOpenAuthorModal = (tab: 'authorship' | 'benevity' | 'webapk' = 'authorship') => {
    setAuthorModalTab(tab);
    setIsAuthorModalOpen(true);
  };

  const handleTransformationComplete = (result: TransformationResult) => {
    setTransformationResult(result);
  };

  const handleResetTransformation = () => {
    setTransformationResult(null);
    setActiveTab('transform');
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-amber-50 font-['Outfit'] relative selection:bg-amber-500 selection:text-black flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Celestial Starfield & Wormhole Background */}
      <CelestialBackground intensity={1.1} themeColor="#38bdf8" />

      {/* Atmospheric Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'transform') {
            setTransformationResult(null);
          }
        }}
        onOpenAuthorModal={handleOpenAuthorModal}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow">
        {/* Render View based on Tab & State */}
        {transformationResult ? (
          <CinematicTransformationStage
            result={transformationResult}
            onReset={handleResetTransformation}
          />
        ) : activeTab === 'portal' ? (
          <OrbOfTimePortal
            onStartTransform={() => setActiveTab('transform')}
            onOpenConsultation={() => setActiveTab('orbs')}
          />
        ) : activeTab === 'transform' ? (
          <PersonaTransformer
            onTransformationComplete={handleTransformationComplete}
          />
        ) : activeTab === 'orbs' ? (
          <OrbConsultation />
        ) : activeTab === 'translator' ? (
          <BajoranTranslatorView />
        ) : activeTab === 'sanctuary' ? (
          <TempleSanctuary onOpenBenevityModal={() => handleOpenAuthorModal('benevity')} />
        ) : null}
      </main>

      {/* Sanctuary Footer */}
      <footer className="relative z-20 border-t border-amber-500/15 bg-[#05070c]/95 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-amber-200/60 font-['Outfit'] space-y-4">
        {/* Temple Lore Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-['Cinzel'] text-amber-300/80">
          <span>TEMPLE OF BAJOR</span>
          <span>•</span>
          <span>PAGH-TEM'FAR</span>
          <span>•</span>
          <span>THE CELESTIAL TEMPLE</span>
          <span>•</span>
          <span>BORANAT ASHALLA</span>
        </div>

        {/* Authorship Banner */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0d1426] to-amber-500/10 border border-amber-500/25 space-y-2">
          <div className="text-[11px] font-['Cinzel'] tracking-wider text-amber-300 font-semibold uppercase flex items-center justify-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Authored by Vedek Bheemaiah Anil Kumar</span>
            <span>•</span>
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Mother Divine Inc., Seattle</span>
          </div>

          <p className="text-[11px] leading-relaxed text-amber-100/70">
            Dedicated to the spiritual exploration of Bajoran theology, the Tears of the Prophets, and the timeless wisdom of the Celestial Temple.
          </p>

          {/* Action Links: Benevity Causes, Authorship, WebAPK */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a
              href="https://causes.benevity.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/40 text-rose-200 hover:text-white transition-all text-xs font-['Cinzel'] font-bold shadow-sm"
              title="Support Mother Divine Inc Seattle on Benevity Causes"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
              <span>Benevity Causes Link</span>
              <ExternalLink className="w-3 h-3 text-rose-300" />
            </a>

            <button
              onClick={() => handleOpenAuthorModal('authorship')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11192e] hover:bg-[#192440] border border-amber-500/30 text-amber-200 text-xs font-['Outfit'] transition-all"
            >
              <span>Author Info</span>
            </button>

            <button
              onClick={() => handleOpenAuthorModal('webapk')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11192e] hover:bg-[#192440] border border-amber-500/30 text-amber-200 text-xs font-['Outfit'] transition-all"
            >
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>Install WebAPK</span>
            </button>
          </div>
        </div>

        {/* Archives External Link */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <a
            href="https://templeofbajor.weebly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-200 transition-colors font-medium underline underline-offset-4"
          >
            <span>templeofbajor.weebly.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>

      {/* Author, Benevity & WebAPK Modal */}
      <AuthorBenevityModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
        defaultTab={authorModalTab}
      />
    </div>
  );
}
