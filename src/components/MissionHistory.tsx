'use client';

import type { MissionHistoryEntry } from '@/lib/types';
import { getReadinessStatus } from '@/lib/types';
import { Clock, Trophy, Skull, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export function MissionHistory({ history }: { history: MissionHistoryEntry[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <div className="parchment-panel p-5 text-center">
        <p className="text-parchment-200/40">No missions completed yet. Plan and launch your first mission!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((entry) => {
        const isExpanded = expandedId === entry.id;
        const date = new Date(entry.timestamp);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return (
          <div key={entry.id} className="parchment-panel p-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : entry.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                entry.outcome === 'success' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'
              }`}>
                {entry.outcome === 'success' ? <Trophy className="w-4 h-4" /> : <Skull className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-parchment-100 truncate">{entry.missionName}</p>
                <p className="text-[10px] text-parchment-200/30">{entry.missionType} • {dateStr} {timeStr}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xs font-semibold ${entry.outcome === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {entry.outcome === 'success' ? 'VICTORY' : 'DEFEAT'}
                </p>
                <p className="text-[10px] text-parchment-200/30">Readiness: {entry.readinessScore}</p>
              </div>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-parchment-200/30" /> : <ChevronDown className="w-4 h-4 text-parchment-200/30" />}
            </div>

            {isExpanded && (
              <div className="mt-4 space-y-3 border-t border-navy-700/30 pt-3">
                {/* Basic Info */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-parchment-200/30">Difficulty</p>
                    <p className="text-parchment-200/70">{'★'.repeat(entry.difficulty)}{'☆'.repeat(5 - entry.difficulty)}</p>
                  </div>
                  <div>
                    <p className="text-parchment-200/30">Success Prob.</p>
                    <p className="text-brass-400">{entry.successProbability}%</p>
                  </div>
                  <div>
                    <p className="text-parchment-200/30">Risk Level</p>
                    <p className="text-parchment-200/70">{entry.riskLevel}</p>
                  </div>
                </div>

                {/* Crew */}
                <div>
                  <p className="text-[10px] text-parchment-200/30 mb-1">Crew</p>
                  <div className="flex gap-1 flex-wrap">
                    {entry.crewNames.map((name, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-navy-700/30 text-parchment-200/50 border border-navy-700/20">{name}</span>
                    ))}
                  </div>
                </div>

                {/* Rewards */}
                <div>
                  <p className="text-[10px] text-parchment-200/30 mb-1">Rewards</p>
                  <div className="flex gap-4 text-xs">
                    <span>💰 {entry.rewards.gold} Gold</span>
                    <span>🏆 +{entry.rewards.xp} XP</span>
                    <span>📜 Rep {entry.rewards.reputation >= 0 ? '+' : ''}{entry.rewards.reputation}</span>
                  </div>
                </div>

                {/* Crew Changes */}
                <div>
                  <p className="text-[10px] text-parchment-200/30 mb-1">Crew Status Changes</p>
                  <div className="space-y-1">
                    {entry.crewChanges.map(cc => (
                      <div key={cc.pirateId} className="flex items-center gap-3 text-[10px]">
                        <span className="text-parchment-200/60 w-20 truncate">{cc.name}</span>
                        <span className="text-parchment-200/40">
                          HP {cc.hpBefore}→<span className={cc.hpAfter < cc.hpBefore ? 'text-red-400' : 'text-emerald-400'}>{cc.hpAfter}</span>
                        </span>
                        <span className="text-parchment-200/40">
                          MRL {cc.moraleBefore}→<span className={cc.moraleAfter > cc.moraleBefore ? 'text-emerald-400' : 'text-red-400'}>{cc.moraleAfter}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analysis Summary */}
                <div>
                  <p className="text-[10px] text-parchment-200/30 mb-1">Tactical Analysis</p>
                  <div className="text-[10px] space-y-0.5">
                    {entry.analysis.whatWentWell.slice(0, 2).map((w, i) => (
                      <p key={i} className="text-emerald-400/60">✓ {w}</p>
                    ))}
                    {entry.analysis.whatWentWrong.slice(0, 2).map((w, i) => (
                      <p key={i} className="text-red-400/60">⚠ {w}</p>
                    ))}
                    {entry.analysis.bestPerformer && (
                      <p className="text-brass-400/60">Best: {entry.analysis.bestPerformer.name} ({entry.analysis.bestPerformer.contribution})</p>
                    )}
                  </div>
                </div>

                {/* Events */}
                <div>
                  <p className="text-[10px] text-parchment-200/30 mb-1">Events</p>
                  <div className="max-h-24 overflow-auto space-y-0.5">
                    {entry.events.map((evt, i) => (
                      <p key={i} className={`text-[10px] ${evt.type === 'positive' ? 'text-emerald-400/50' : evt.type === 'negative' ? 'text-red-400/50' : 'text-parchment-200/30'}`}>
                        {evt.icon} {evt.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
