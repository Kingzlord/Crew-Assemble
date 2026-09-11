'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Anchor, Skull, Swords, Heart, Map, BarChart3 } from 'lucide-react';

const TUTORIAL_KEY = 'blackflag-tutorial-complete';

const STEPS = [
  {
    step: 1,
    icon: Anchor,
    emoji: '⚓',
    title: 'Command Deck',
    description: 'Welcome aboard, Captain! This is your command center. Monitor crew size, health, morale, scurvy and overall readiness from here. The dashboard gives you an instant snapshot of your fleet\'s condition.',
    highlight: 'command-deck',
  },
  {
    step: 2,
    icon: Skull,
    emoji: '☠',
    title: 'Crew Manifest',
    description: 'Manage your pirates here. Search by name, filter by role, health, morale, or scurvy level. Inspect detailed skill profiles, edit crew members, add new pirates to your roster, or discharge those who\'ve lost their sea legs.',
    highlight: 'crew-manifest',
  },
  {
    step: 3,
    icon: Swords,
    emoji: '⚔',
    title: 'Crew Skills',
    description: 'Each pirate has six core skills: Swordsmanship, Cannon Gunnery, Navigation, Rigging, Stealth and Medicine — rated on a 0-100 scale. The Intelligence page shows radar charts, skill distribution and a full skill matrix for the entire crew.',
    highlight: 'crew-skills',
  },
  {
    step: 4,
    icon: Heart,
    emoji: '❤️',
    title: 'Vitals & Readiness',
    description: 'Keep a weather eye on HP, scurvy and morale. Crew with critical health or mutinous morale can sabotage mission readiness. The Battle Readiness page tracks individual and crew-wide operational status with alerts for dangerous conditions.',
    highlight: 'vitals',
  },
  {
    step: 5,
    icon: Map,
    emoji: '🗺',
    title: 'Mission Planning',
    description: 'Choose a mission and let the tactical engine recommend the best crew based on their skills, health, morale, experience and mission requirements. The AI scores each pirate and shows exactly why they were recommended — with pros and cons.',
    highlight: 'missions',
  },
  {
    step: 6,
    icon: BarChart3,
    emoji: '🏴‍☠️',
    title: 'Mission Simulation',
    description: 'Once your boarding party is prepared, launch the mission! Watch a tactical simulation unfold with dynamic events based on your crew\'s actual skills. The outcome depends on crew quality — not pure luck. Afterward, review tactical analysis and mission history.',
    highlight: 'simulation',
  },
];

export function Tutorial({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TUTORIAL_KEY, 'true');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={handleSkip}>
      <div className="parchment-panel-highlight p-0 w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-navy-700/30 to-transparent">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-parchment-200/30 hover:text-parchment-200 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-navy-700/50 flex items-center justify-center border-2 border-brass-400/30">
              <span className="text-2xl">{step.emoji}</span>
            </div>
            <div>
              <p className="text-[10px] text-brass-400/60 uppercase tracking-widest">Step {step.step} of {STEPS.length}</p>
              <h2 className="text-xl font-bold text-brass-400 nautical-text">{step.title}</h2>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  i < currentStep ? 'bg-brass-400' :
                  i === currentStep ? 'bg-brass-400/60 pulse-glow' :
                  'bg-navy-700/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-sm text-parchment-200/80 leading-relaxed">{step.description}</p>

          {/* Nautical decoration */}
          <div className="mt-4 flex items-center gap-2 text-parchment-200/15">
            <div className="flex-1 brass-divider" />
            <span className="text-xs">⚓</span>
            <div className="flex-1 brass-divider" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-xs text-parchment-200/30 hover:text-parchment-200/60 transition"
          >
            Skip Tutorial
          </button>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 border border-navy-700/30 hover:border-brass-400/20 transition text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium"
            >
              {currentStep === STEPS.length - 1 ? (
                <>Finish <Anchor className="w-4 h-4" /></>
              ) : (
                <>Next <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function shouldShowTutorial(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(TUTORIAL_KEY) !== 'true';
}

export function resetTutorial() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TUTORIAL_KEY);
}
