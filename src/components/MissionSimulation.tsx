'use client';

import { useState, useEffect, useRef } from 'react';
import type { Pirate, Mission, SimulationEvent, SimulationStage, MissionHistoryEntry } from '@/lib/types';
import { SIMULATION_STAGES, STAGE_LABELS, getReadinessStatus } from '@/lib/types';
import { calculateMissionReadiness } from '@/lib/missionEngine';
import { generateSimulationEvents, calculateMissionOutcome, applyCrewChanges, generateAnalysis } from '@/lib/simulationEngine';
import { Anchor, Swords, Trophy, Skull, ChevronRight, BarChart3 } from 'lucide-react';

type SimPhase = 'launch' | 'running' | 'result' | 'analysis';

export function MissionSimulation({
  mission,
  crew,
  allPirates,
  onComplete,
  onClose,
}: {
  mission: Mission;
  crew: Pirate[];
  allPirates: Pirate[];
  onComplete: (historyEntry: MissionHistoryEntry, updatedPirates: Pirate[]) => void;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<SimPhase>('launch');
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<SimulationEvent[]>([]);
  const [outcome, setOutcome] = useState<{ success: boolean; probability: number; rewards: { gold: number; xp: number; reputation: number } } | null>(null);
  const [historyEntry, setHistoryEntry] = useState<MissionHistoryEntry | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const eventLogRef = useRef<HTMLDivElement>(null);

  const readiness = calculateMissionReadiness(allPirates, mission, crew.map(p => p.id));

  // Start simulation after brief launch screen
  useEffect(() => {
    if (phase === 'launch') {
      const timer = setTimeout(() => {
        const result = calculateMissionOutcome(allPirates, mission, crew.map(p => p.id));
        setOutcome(result);
        const simEvents = generateSimulationEvents(crew, mission, result.success);
        setEvents(simEvents);
        setPhase('running');
        setCurrentStageIdx(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, allPirates, mission, crew]);

  // Progress through stages
  useEffect(() => {
    if (phase !== 'running') return;
    if (currentStageIdx >= SIMULATION_STAGES.length) {
      // Simulation complete — compute results
      if (outcome) {
        const { updated, changes } = applyCrewChanges(crew, outcome.success, mission);
        const analysis = generateAnalysis(crew, mission, outcome.success, readiness.score, events);

        const entry: MissionHistoryEntry = {
          id: `mh_${Date.now()}`,
          missionName: mission.name,
          missionType: mission.type,
          difficulty: mission.difficulty,
          riskLevel: mission.riskLevel,
          crewIds: crew.map(p => p.id),
          crewNames: crew.map(p => p.name),
          readinessScore: readiness.score,
          successProbability: outcome.probability,
          outcome: outcome.success ? 'success' : 'failure',
          rewards: outcome.rewards,
          events,
          crewChanges: changes,
          analysis,
          timestamp: Date.now(),
        };
        setHistoryEntry(entry);
        setPhase('result');
      }
      return;
    }

    // Show events for current stage
    const stageEvents = events.filter(e => e.stage === SIMULATION_STAGES[currentStageIdx]);
    const revealDelay = 400;
    let timeout: ReturnType<typeof setTimeout>;

    if (stageEvents.length > 0) {
      // Reveal events one by one
      stageEvents.forEach((evt, i) => {
        setTimeout(() => {
          setVisibleEvents(prev => [...prev, evt]);
        }, revealDelay * (i + 1));
      });
      // Move to next stage after all events shown
      timeout = setTimeout(() => {
        setCurrentStageIdx(idx => idx + 1);
      }, revealDelay * (stageEvents.length + 1) + 800);
    } else {
      timeout = setTimeout(() => {
        setCurrentStageIdx(idx => idx + 1);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [phase, currentStageIdx, events, outcome, crew, mission, readiness.score]);

  // Auto-scroll event log
  useEffect(() => {
    if (eventLogRef.current) {
      eventLogRef.current.scrollTop = eventLogRef.current.scrollHeight;
    }
  }, [visibleEvents]);

  const handleComplete = () => {
    if (historyEntry && outcome) {
      const { updated } = applyCrewChanges(crew, outcome.success, mission);
      onComplete(historyEntry, updated);
    }
  };

  const DIFFICULTY_STARS = (d: number) => '★'.repeat(d) + '☆'.repeat(5 - d);

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
      <div className="parchment-panel-highlight p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">

        {/* ── LAUNCH PHASE ── */}
        {phase === 'launch' && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4 float-anim">🏴‍☠️</div>
            <h2 className="text-2xl font-bold text-brass-400 nautical-text mb-2">MISSION LAUNCHED</h2>
            <p className="text-lg text-parchment-200/70 mb-4">{mission.name}</p>
            <p className="text-sm text-parchment-200/40 italic">Your ship approaches the target...</p>
            <div className="mt-6 flex justify-center">
              <div className="w-8 h-8 border-2 border-brass-400/30 border-t-brass-400 rounded-full animate-spin" />
            </div>
          </div>
        )}

        {/* ── RUNNING PHASE ── */}
        {phase === 'running' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-brass-400 nautical-text">⚔️ {mission.name}</h2>
              <span className="text-xs text-parchment-200/30">{DIFFICULTY_STARS(mission.difficulty)}</span>
            </div>

            {/* Stage Progress */}
            <div className="flex gap-1 mb-4">
              {SIMULATION_STAGES.map((stage, idx) => (
                <div key={stage} className="flex-1">
                  <div className={`h-2 rounded-full transition-all duration-500 ${
                    idx < currentStageIdx ? 'bg-emerald-500' :
                    idx === currentStageIdx ? 'bg-brass-400 pulse-glow' :
                    'bg-navy-700/50'
                  }`} />
                  <p className={`text-[9px] mt-1 text-center ${
                    idx <= currentStageIdx ? 'text-parchment-200/60' : 'text-parchment-200/20'
                  }`}>
                    {STAGE_LABELS[stage]}
                  </p>
                </div>
              ))}
            </div>

            {/* Current Stage Header */}
            {currentStageIdx < SIMULATION_STAGES.length && (
              <div className="text-center mb-4 py-2 rounded-lg bg-navy-800/50 border border-brass-400/20">
                <p className="text-xs text-brass-400/60 uppercase tracking-wider">Stage {currentStageIdx + 1} of {SIMULATION_STAGES.length}</p>
                <p className="text-sm font-semibold text-brass-400">{STAGE_LABELS[SIMULATION_STAGES[currentStageIdx]]}</p>
              </div>
            )}

            {/* Event Log */}
            <div ref={eventLogRef} className="space-y-2 max-h-64 overflow-auto p-3 rounded-lg bg-navy-900/50 border border-navy-700/30">
              {visibleEvents.map((evt, i) => (
                <div key={i} className={`flex items-start gap-2 p-2 rounded text-sm animate-in fade-in ${
                  evt.type === 'positive' ? 'bg-emerald-900/20 text-emerald-300 border-l-2 border-emerald-500' :
                  evt.type === 'negative' ? 'bg-red-900/20 text-red-300 border-l-2 border-red-500' :
                  'bg-navy-800/30 text-parchment-200/60 border-l-2 border-navy-600'
                }`}>
                  <span className="shrink-0">{evt.icon}</span>
                  <span>{evt.text}</span>
                </div>
              ))}
              {visibleEvents.length === 0 && (
                <p className="text-center text-parchment-200/30 text-sm italic">Awaiting reports...</p>
              )}
            </div>

            {/* Crew Status Mini */}
            <div className="mt-4 flex gap-2 flex-wrap">
              {crew.map(p => (
                <div key={p.id} className="flex items-center gap-1 px-2 py-1 rounded bg-navy-800/30 border border-navy-700/20">
                  <div className="w-5 h-5 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 text-[9px] font-bold border border-brass-400/20">
                    {p.name.charAt(0)}
                  </div>
                  <span className="text-[10px] text-parchment-200/60">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT PHASE ── */}
        {phase === 'result' && outcome && historyEntry && (
          <div>
            <div className="text-center mb-6">
              {outcome.success ? (
                <>
                  <div className="text-5xl mb-2">🏴‍☠️</div>
                  <h2 className="text-2xl font-bold text-emerald-400 nautical-text">MISSION COMPLETE</h2>
                  <p className="text-lg text-parchment-200/70 mt-1">The objective has been secured!</p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-2">☠️</div>
                  <h2 className="text-2xl font-bold text-red-400 nautical-text">MISSION FAILED</h2>
                  <p className="text-lg text-parchment-200/70 mt-1">The boarding party was forced to retreat.</p>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-navy-900/50 border border-navy-700/20">
                <p className="text-xs text-parchment-200/30">Success Probability</p>
                <p className="text-xl font-bold text-brass-400 nautical-text">{outcome.probability}%</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-navy-900/50 border border-navy-700/20">
                <p className="text-xs text-parchment-200/30">Mission Readiness</p>
                <p className={`text-xl font-bold ${getReadinessStatus(readiness.score).color} nautical-text`}>{readiness.score}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-navy-900/50 border border-navy-700/20">
                <p className="text-xs text-parchment-200/30">Outcome</p>
                <p className={`text-xl font-bold ${outcome.success ? 'text-emerald-400' : 'text-red-400'} nautical-text`}>
                  {outcome.success ? 'VICTORY' : 'DEFEAT'}
                </p>
              </div>
            </div>

            {/* Rewards */}
            <div className="p-3 rounded-lg bg-navy-900/50 border border-brass-400/20 mb-4">
              <h3 className="text-sm font-semibold text-brass-400 mb-2">Rewards</h3>
              <div className="flex gap-6">
                <span className="text-sm">💰 <span className={outcome.rewards.gold > 0 ? 'text-brass-400' : 'text-parchment-200/40'}>{outcome.rewards.gold} Gold</span></span>
                <span className="text-sm">🏆 <span className="text-emerald-400">+{outcome.rewards.xp} XP</span></span>
                <span className="text-sm">📜 <span className={outcome.rewards.reputation >= 0 ? 'text-ocean-300' : 'text-red-400'}>Reputation {outcome.rewards.reputation >= 0 ? '+' : ''}{outcome.rewards.reputation}</span></span>
              </div>
            </div>

            {/* Crew Changes */}
            <div className="p-3 rounded-lg bg-navy-900/50 border border-navy-700/20 mb-4">
              <h3 className="text-sm font-semibold text-brass-400 mb-2">Crew Status</h3>
              <div className="space-y-2">
                {historyEntry.crewChanges.map(cc => (
                  <div key={cc.pirateId} className="flex items-center gap-3 text-sm">
                    <span className="text-parchment-100 w-28 truncate">{cc.name}</span>
                    <span className="text-parchment-200/50">
                      ❤️ {cc.hpBefore} → <span className={cc.hpAfter < cc.hpBefore ? 'text-red-400' : 'text-emerald-400'}>{cc.hpAfter}</span>
                    </span>
                    <span className="text-parchment-200/50">
                      😈 {cc.moraleBefore} → <span className={cc.moraleAfter > cc.moraleBefore ? 'text-emerald-400' : 'text-red-400'}>{cc.moraleAfter}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Summary */}
            <div className="p-3 rounded-lg bg-navy-900/50 border border-navy-700/20 mb-4 max-h-40 overflow-auto">
              <h3 className="text-sm font-semibold text-brass-400 mb-2">Mission Events</h3>
              <div className="space-y-1">
                {events.map((evt, i) => (
                  <p key={i} className={`text-xs ${evt.type === 'positive' ? 'text-emerald-400/70' : evt.type === 'negative' ? 'text-red-400/70' : 'text-parchment-200/40'}`}>
                    {evt.icon} {evt.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAnalysis(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium"
              >
                <BarChart3 className="w-4 h-4" /> Tactical Analysis
              </button>
              <button
                onClick={handleComplete}
                className="px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 border border-navy-700/30 hover:border-brass-400/20 transition text-sm"
              >
                Return to Missions
              </button>
            </div>
          </div>
        )}

        {/* ── ANALYSIS OVERLAY ── */}
        {showAnalysis && historyEntry && (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4" onClick={() => setShowAnalysis(false)}>
            <div className="parchment-panel-highlight p-6 w-full max-w-2xl max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-bold text-brass-400 nautical-text mb-4">📊 TACTICAL ANALYSIS</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-400 mb-2">✓ What Went Well</h3>
                  {historyEntry.analysis.whatWentWell.map((w, i) => (
                    <p key={i} className="text-xs text-parchment-200/60 ml-2 mb-1">• {w}</p>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-red-400 mb-2">⚠ What Went Wrong</h3>
                  {historyEntry.analysis.whatWentWrong.map((w, i) => (
                    <p key={i} className="text-xs text-parchment-200/60 ml-2 mb-1">• {w}</p>
                  ))}
                </div>

                <div className="brass-divider" />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-parchment-200/30">Best Performer</p>
                    <p className="text-sm font-semibold text-brass-400">{historyEntry.analysis.bestPerformer?.name ?? 'N/A'}</p>
                    <p className="text-[10px] text-parchment-200/30">Contribution: {historyEntry.analysis.bestPerformer?.contribution ?? 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-parchment-200/30">Weakest Factor</p>
                    <p className="text-sm font-semibold text-amber-400">{historyEntry.analysis.weakestFactor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-parchment-200/30">Most Important Skill</p>
                    <p className="text-sm font-semibold text-ocean-300">{historyEntry.analysis.mostImportantSkill}</p>
                  </div>
                </div>

                <div className="brass-divider" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-parchment-200/30">Readiness Before Launch</p>
                    <p className="text-sm font-semibold text-parchment-100">{historyEntry.readinessScore}/100</p>
                  </div>
                  <div>
                    <p className="text-xs text-parchment-200/30">Outcome</p>
                    <p className={`text-sm font-semibold ${historyEntry.outcome === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {historyEntry.outcome === 'success' ? 'Victory' : 'Defeat'}
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={() => setShowAnalysis(false)} className="mt-6 px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 transition text-sm">
                Close Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
