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
import { TransformationResult } from './types';
import { ExternalLink, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'portal' | 'transform' | 'orbs' | 'translator' | 'sanctuary'>('portal');
  const [transformationResult, setTransformationResult] = useState<TransformationResult | null>(null);

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
          <TempleSanctuary />
        ) : null}
      </main>

      {/* Sanctuary Footer */}
      <footer className="relative z-20 border-t border-amber-500/15 bg-[#05070c]/90 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-amber-200/60 font-['Outfit'] space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-['Cinzel'] text-amber-300/80">
          <span>TEMPLE OF BAJOR</span>
          <span>•</span>
          <span>PAGH-TEM'FAR</span>
          <span>•</span>
          <span>THE CELESTIAL TEMPLE</span>
          <span>•</span>
          <span>BORANAT ASHALLA</span>
        </div>

        <p className="max-w-xl mx-auto text-[11px] leading-relaxed text-amber-100/50">
          Dedicated to the spiritual exploration of Bajoran theology, the Tears of the Prophets, and the timeless wisdom of Deep Space Nine.
        </p>

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
    </div>
  );
}
