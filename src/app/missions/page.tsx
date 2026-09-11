'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { calculateMissionRecommendations, calculateMissionReadiness } from '@/lib/missionEngine';
import { getReadinessStatus, SKILL_LABELS, MISSION_TYPES, type MissionType, type RiskLevel, type SkillKey, type Mission, type Pirate } from '@/lib/types';
import { Map, Swords, Plus, X, AlertTriangle, Shield, Heart, Activity, Zap, Clock, Play } from 'lucide-react';
import { MissionSimulation } from '@/components/MissionSimulation';
import { MissionHistory } from '@/components/MissionHistory';

const DIFFICULTY_STARS = (d: number) => '★'.repeat(d) + '☆'.repeat(5 - d);
const RISK_COLORS: Record<RiskLevel, string> = { Low: 'text-emerald-400', Medium: 'text-amber-400', High: 'text-orange-400', Extreme: 'text-red-400' };

export default function MissionsPage() {
  const { pirates, missions, addMission, updateMission, removeMission, assignCrewToMission, addMissionHistory, updatePirates, missionHistory } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(missions[0]?.id ?? null);
  const [showNewMission, setShowNewMission] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'planning' | 'history'>('planning');

  const selectedMission = missions.find((m) => m.id === selectedId) ?? null;
  const recommendations = useMemo(() => {
    if (!selectedMission) return [];
    return calculateMissionRecommendations(pirates, selectedMission);
  }, [selectedMission, pirates]);

  const readiness = useMemo(() => {
    if (!selectedMission) return null;
    return calculateMissionReadiness(pirates, selectedMission, selectedMission.assignedCrew);
  }, [selectedMission, pirates]);

  const activePirates = pirates.filter((p) => p.status !== 'Discharged');

  const toggleCrew = (pirateId: string) => {
    if (!selectedMission) return;
    const current = selectedMission.assignedCrew;
    const next = current.includes(pirateId)
      ? current.filter((id) => id !== pirateId)
      : [...current, pirateId];
    assignCrewToMission(selectedMission.id, next);
  };

  const autoAssign = () => {
    if (!selectedMission) return;
    const topIds = recommendations.slice(0, selectedMission.requiredCrewSize).map((r) => r.pirateId);
    assignCrewToMission(selectedMission.id, topIds);
  };

  const clearCrew = () => {
    if (!selectedMission) return;
    assignCrewToMission(selectedMission.id, []);
  };

  // Mission launch requirements
  const canStartMission = selectedMission &&
    selectedMission.assignedCrew.length >= selectedMission.requiredCrewSize &&
    readiness && readiness.score >= 30;

  const launchBlockers: string[] = [];
  if (selectedMission) {
    if (selectedMission.assignedCrew.length === 0) {
      launchBlockers.push('No crew assigned. Use Auto-Assign or select from recommendations.');
    }
    if (selectedMission.assignedCrew.length < selectedMission.requiredCrewSize) {
      launchBlockers.push(`Boarding party requires ${selectedMission.requiredCrewSize} crew members. Currently selected: ${selectedMission.assignedCrew.length}.`);
    }
    if (readiness && readiness.skillCoverage < 50) {
      launchBlockers.push('Major skill gaps — crew does not cover required skills.');
    }
    if (readiness && readiness.avgHealth < 30) {
      launchBlockers.push('Crew health is critically low — consider replacing injured members.');
    }
  }

  const handleSimulationComplete = (historyEntry: Parameters<typeof addMissionHistory>[0], updatedPirates: Pirate[]) => {
    addMissionHistory(historyEntry);
    // Apply crew stat changes globally
    const newPirates = pirates.map(p => {
      const updated = updatedPirates.find(up => up.id === p.id);
      return updated ?? p;
    });
    updatePirates(newPirates);
    // Update mission status
    if (selectedMission) {
      updateMission({
        ...selectedMission,
        status: historyEntry.outcome === 'success' ? 'Completed' : 'Failed',
      });
    }
    setSimulating(false);
    setActiveTab('history');
  };

  const simCrew = selectedMission
    ? pirates.filter((p) => selectedMission.assignedCrew.includes(p.id))
    : [];

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Map className="w-7 h-7 text-brass-400" />
          <div>
            <h1 className="text-2xl font-bold text-brass-400 nautical-text tracking-wide">Mission Planning</h1>
            <p className="text-xs text-parchment-200/50">{missions.length} missions available</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNewMission(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> New Mission
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('planning')}
          className={`px-4 py-2 rounded-lg border text-sm transition ${
            activeTab === 'planning' ? 'bg-brass-400/20 text-brass-400 border-brass-400/30 font-medium' : 'text-parchment-200/50 border-navy-700/30 hover:border-brass-400/20'
          }`}
        >
          <Swords className="w-4 h-4 inline mr-1" /> Planning
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg border text-sm transition ${
            activeTab === 'history' ? 'bg-brass-400/20 text-brass-400 border-brass-400/30 font-medium' : 'text-parchment-200/50 border-navy-700/30 hover:border-brass-400/20'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-1" /> History ({missionHistory.length})
        </button>
      </div>

      {/* History Tab */}
      {activeTab === 'history' && (
        <MissionHistory history={missionHistory} />
      )}

      {/* Planning Tab */}
      {activeTab === 'planning' && (
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Mission List */}
          <div className="lg:w-72 shrink-0 space-y-2">
            {missions.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`w-full text-left p-3 rounded-lg border transition card-hover
                  ${m.id === selectedId ? 'parchment-panel-highlight border-brass-400/30' : 'parchment-panel border-navy-700/30 hover:border-brass-400/20'}
                `}
              >
                <p className="text-sm font-medium text-parchment-100 truncate">{m.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] ${RISK_COLORS[m.riskLevel]}`}>{m.riskLevel}</span>
                  <span className="text-[10px] text-parchment-200/30">{DIFFICULTY_STARS(m.difficulty)}</span>
                </div>
                <p className="text-[10px] text-parchment-200/30 mt-1">
                  {m.assignedCrew.length}/{m.requiredCrewSize} crew • {m.status}
                </p>
              </button>
            ))}
          </div>

          {/* Mission Detail */}
          {selectedMission ? (
            <div className="flex-1 space-y-4">
              {/* Mission Info */}
              <div className="parchment-panel-highlight p-5">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-brass-400 nautical-text">{selectedMission.name}</h2>
                    <p className="text-sm text-parchment-200/60">{selectedMission.type}</p>
                  </div>
                  <span className={`text-sm font-semibold ${RISK_COLORS[selectedMission.riskLevel]}`}>
                    {selectedMission.riskLevel} Risk
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-parchment-200/30">Difficulty</p>
                    <p className="text-brass-400 font-mono">{DIFFICULTY_STARS(selectedMission.difficulty)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-parchment-200/30">Required Crew</p>
                    <p className="text-parchment-100 font-semibold">{selectedMission.requiredCrewSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-parchment-200/30">Assigned</p>
                    <p className="text-parchment-100 font-semibold">{selectedMission.assignedCrew.length}/{selectedMission.requiredCrewSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-parchment-200/30">Status</p>
                    <p className="text-parchment-100 font-semibold">{selectedMission.status}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-parchment-200/30 mb-2">Required Skills</p>
                  <div className="flex gap-2 flex-wrap">
                    {(Object.entries(selectedMission.requiredSkills) as [SkillKey, number][]).map(([key, val]) => (
                      <span key={key} className="text-xs px-2 py-1 rounded bg-navy-700/50 text-parchment-200/70 border border-navy-700/30">
                        {`${SKILL_LABELS[key]} ≥ ${val}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Readiness Gauge + START MISSION */}
              {readiness && (
                <div className="parchment-panel p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-brass-400">Mission Readiness</h3>
                    <div className="flex gap-2">
                      <button onClick={autoAssign} className="px-3 py-1.5 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-xs font-medium">
                        <Zap className="w-3 h-3 inline mr-1" />Auto-Assign
                      </button>
                      <button onClick={clearCrew} className="px-3 py-1.5 rounded-lg text-parchment-200/40 hover:text-parchment-200 border border-navy-700/30 hover:border-brass-400/20 transition text-xs">
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="text-center">
                      <div className="relative w-28 h-28">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(30,58,110,0.5)" strokeWidth="3" />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={readiness.score >= 70 ? '#059669' : readiness.score >= 50 ? '#f59e0b' : '#dc2626'}
                            strokeWidth="3"
                            strokeDasharray={`${readiness.score}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xl font-bold ${getReadinessStatus(readiness.score).color}`}>{readiness.score}</span>
                        </div>
                      </div>
                      <p className={`text-xs font-semibold mt-1 ${getReadinessStatus(readiness.score).color}`}>{getReadinessStatus(readiness.score).label}</p>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <MiniStat label="Avg Health" value={`${readiness.avgHealth}%`} icon={Heart} />
                      <MiniStat label="Avg Morale" value={`${readiness.avgMorale}%`} icon={Activity} />
                      <MiniStat label="Skill Coverage" value={`${readiness.skillCoverage}%`} icon={Shield} />
                      <MiniStat label="Crew Size" value={`${selectedMission.assignedCrew.length}/${selectedMission.requiredCrewSize}`} icon={Swords} />
                    </div>
                  </div>
                  {readiness.factors.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {readiness.factors.map((f, i) => (
                        <p key={i} className="text-xs text-parchment-200/50">{f.startsWith('⚠') ? '⚠️' : '✓'} {f.replace('⚠ ', '')}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* START MISSION Button */}
              <div className="parchment-panel p-5">
                {canStartMission ? (
                  <button
                    onClick={() => setSimulating(true)}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-emerald-900/30 text-emerald-400 border-2 border-emerald-500/40 hover:bg-emerald-900/50 hover:border-emerald-500/60 transition text-lg font-bold nautical-text pulse-glow"
                  >
                    <Play className="w-6 h-6" />
                    START MISSION
                  </button>
                ) : (
                  <div>
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-navy-800/30 text-parchment-200/20 border-2 border-navy-700/20 text-lg font-bold nautical-text cursor-not-allowed"
                    >
                      <Play className="w-6 h-6" />
                      START MISSION
                    </button>
                    {launchBlockers.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {launchBlockers.map((blocker, i) => (
                          <p key={i} className="text-xs text-amber-400/70 flex items-start gap-1">
                            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" /> {blocker}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Assigned Crew */}
              <div className="parchment-panel p-5">
                <h3 className="text-sm font-semibold text-brass-400 mb-3">Boarding Party ({selectedMission.assignedCrew.length})</h3>
                {selectedMission.assignedCrew.length === 0 ? (
                  <p className="text-sm text-parchment-200/40">No crew assigned. Use Auto-Assign or select from recommendations below.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedMission.assignedCrew.map((pid) => {
                      const p = pirates.find((x) => x.id === pid);
                      const rec = recommendations.find((r) => r.pirateId === pid);
                      if (!p) return null;
                      return (
                        <div key={pid} className="flex items-center gap-3 p-2 rounded-lg bg-navy-900/50 border border-brass-400/20">
                          <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 font-bold text-xs border border-brass-400/30">
                            {p.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-parchment-100 truncate">{p.name}</p>
                            <p className="text-[10px] text-parchment-200/40">{p.role}{rec ? ` • ${rec.score}% fit` : ''}</p>
                          </div>
                          <button onClick={() => toggleCrew(pid)} className="text-parchment-200/30 hover:text-blood-300 transition">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              <div className="parchment-panel p-5">
                <h3 className="text-sm font-semibold text-brass-400 mb-3">Crew Recommendations</h3>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {recommendations.map((rec, idx) => {
                    const p = pirates.find((x) => x.id === rec.pirateId);
                    if (!p) return null;
                    const isAssigned = selectedMission.assignedCrew.includes(rec.pirateId);
                    return (
                      <div
                        key={rec.pirateId}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition cursor-pointer
                          ${isAssigned ? 'bg-brass-400/10 border-brass-400/30' : 'bg-navy-900/30 border-navy-700/20 hover:border-brass-400/20'}
                        `}
                        onClick={() => toggleCrew(rec.pirateId)}
                      >
                        <div className="text-center shrink-0 w-12">
                          <span className={`text-lg font-bold ${rec.score >= 70 ? 'text-emerald-400' : rec.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                            {rec.score}%
                          </span>
                          <p className="text-[9px] text-parchment-200/30">Fit</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-parchment-100">{p.name}</span>
                            <span className="text-[10px] text-parchment-200/40">{p.role}</span>
                            {isAssigned && <span className="text-[10px] text-brass-400">✓ Assigned</span>}
                          </div>
                          <div className="flex gap-1 flex-wrap mt-1">
                            {rec.pros.map((pro, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-600/20">
                                + {pro}
                              </span>
                            ))}
                            {rec.cons.map((con, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-red-900/30 text-red-400 border border-red-600/20">
                                - {con}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-parchment-200/20 shrink-0">#{idx + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 parchment-panel p-8 text-center">
              <p className="text-parchment-200/40">Select a mission to view details and assign crew.</p>
            </div>
          )}
        </div>
      )}

      {/* New Mission Modal */}
      {showNewMission && (
        <NewMissionForm
          onSave={(m) => { addMission(m); setShowNewMission(false); setSelectedId(m.id); }}
          onClose={() => setShowNewMission(false)}
        />
      )}

      {/* Mission Simulation Overlay */}
      {simulating && selectedMission && simCrew.length > 0 && (
        <MissionSimulation
          mission={selectedMission}
          crew={simCrew}
          allPirates={pirates}
          onComplete={handleSimulationComplete}
          onClose={() => setSimulating(false)}
        />
      )}
    </div>
  );
}

function MiniStat({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <Icon className="w-4 h-4 text-brass-400/40 mb-1" />
      <p className="text-sm font-semibold text-parchment-100">{value}</p>
      <p className="text-[10px] text-parchment-200/30">{label}</p>
    </div>
  );
}

function NewMissionForm({ onSave, onClose }: { onSave: (m: Mission) => void; onClose: () => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<MissionType>('Merchant Ship Raid');
  const [difficulty, setDifficulty] = useState(3);
  const [crewSize, setCrewSize] = useState(5);
  const [risk, setRisk] = useState<RiskLevel>('Medium');
  const [skills, setSkills] = useState<Partial<Record<SkillKey, number>>>({});

  const handleSave = () => {
    const m: Mission = {
      id: `m${Date.now()}`,
      name: name || type,
      type,
      difficulty,
      requiredCrewSize: crewSize,
      requiredSkills: skills,
      riskLevel: risk,
      assignedCrew: [],
      status: 'Planning',
    };
    onSave(m);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="parchment-panel-highlight p-6 w-full max-w-lg max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-brass-400 mb-4">New Mission</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-parchment-200/40 block mb-1">Mission Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Plunder the Silver Galleon" className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as MissionType)} className="w-full">
                {MISSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Risk Level</label>
              <select value={risk} onChange={(e) => setRisk(e.target.value as RiskLevel)} className="w-full">
                <option>Low</option><option>Medium</option><option>High</option><option>Extreme</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Difficulty (1-5)</label>
              <input type="range" min={1} max={5} value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} className="w-full accent-brass-400" />
              <span className="text-xs text-brass-400">{DIFFICULTY_STARS(difficulty)}</span>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Required Crew</label>
              <input type="number" min={1} max={20} value={crewSize} onChange={(e) => setCrewSize(Number(e.target.value))} className="w-full" />
            </div>
          </div>
          <div>
            <label className="text-xs text-parchment-200/40 block mb-2">Required Skills (set minimum or leave at 0)</label>
            {(Object.keys(SKILL_LABELS) as SkillKey[]).map((key) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <span className="text-xs text-parchment-200/50 w-28">{SKILL_LABELS[key]}</span>
                <input type="range" min={0} max={100} value={skills[key] ?? 0} onChange={(e) => setSkills({ ...skills, [key]: Number(e.target.value) })} className="flex-1 accent-brass-400" />
                <span className="text-xs text-brass-400 w-6 text-right">{skills[key] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium">
            Create Mission
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 transition text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}
