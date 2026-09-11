'use client';

import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { getHealthStatus, getMoraleStatus, getScurvyStatus, getReadinessStatus, SKILL_LABELS, type SkillKey } from '@/lib/types';
import { getAlerts, calculateMissionReadiness } from '@/lib/missionEngine';
import { Swords, Heart, AlertTriangle, Shield, Activity, Anchor } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export default function ReadinessPage() {
  const { pirates, missions } = useStore();
  const active = pirates.filter((p) => p.status !== 'Discharged');
  const alerts = getAlerts(pirates);

  // Health categories
  const healthCats = [
    { label: 'Excellent (90-100)', count: active.filter(p => p.hp >= 90).length, color: '#059669' },
    { label: 'Good (70-89)', count: active.filter(p => p.hp >= 70 && p.hp < 90).length, color: '#2a8ba8' },
    { label: 'Wounded (40-69)', count: active.filter(p => p.hp >= 40 && p.hp < 70).length, color: '#f59e0b' },
    { label: 'Critical (0-39)', count: active.filter(p => p.hp < 40).length, color: '#dc2626' },
  ];

  const moraleCats = [
    { label: 'High (80+)', count: active.filter(p => p.morale >= 80).length, color: '#059669' },
    { label: 'Stable (50-79)', count: active.filter(p => p.morale >= 50 && p.morale < 80).length, color: '#2a8ba8' },
    { label: 'Low (25-49)', count: active.filter(p => p.morale >= 25 && p.morale < 50).length, color: '#f59e0b' },
    { label: 'Mutinous (0-24)', count: active.filter(p => p.morale < 25).length, color: '#dc2626' },
  ];

  const scurvyCats = [
    { label: 'Healthy (0-20)', count: active.filter(p => p.scurvy <= 20).length, color: '#059669' },
    { label: 'Warning (21-50)', count: active.filter(p => p.scurvy > 20 && p.scurvy <= 50).length, color: '#f59e0b' },
    { label: 'Severe (51-75)', count: active.filter(p => p.scurvy > 50 && p.scurvy <= 75).length, color: '#f59e0b' },
    { label: 'Critical (76-100)', count: active.filter(p => p.scurvy > 75).length, color: '#dc2626' },
  ];

  // Overall readiness
  const battleReady = active.filter(p => p.hp >= 70 && p.morale >= 50 && p.scurvy <= 50);
  const avgHealth = active.length > 0 ? Math.round(active.reduce((s, p) => s + p.hp, 0) / active.length) : 0;
  const avgMorale = active.length > 0 ? Math.round(active.reduce((s, p) => s + p.morale, 0) / active.length) : 0;
  const avgScurvy = active.length > 0 ? Math.round(active.reduce((s, p) => s + p.scurvy, 0) / active.length) : 0;

  const overallReadiness = Math.round(
    (battleReady.length / Math.max(active.length, 1)) * 40 +
    (avgHealth / 100) * 25 +
    (avgMorale / 100) * 20 +
    ((100 - avgScurvy) / 100) * 15
  );

  const readinessInfo = getReadinessStatus(overallReadiness);

  // Mission readiness summaries
  const missionReadiness = missions.filter(m => m.status === 'Planning' || m.status === 'Active').map(m => {
    const r = calculateMissionReadiness(pirates, m, m.assignedCrew);
    return { mission: m, ...r };
  });

  // Individual readiness scores
  const pirateReadiness = active.map(p => {
    let score = 0;
    score += (p.hp / 100) * 35;
    score += (p.morale / 100) * 25;
    score += ((100 - p.scurvy) / 100) * 15;
    score += (p.experience / 100) * 15;
    const avgSkill = Object.values(p.skills).reduce((s, v) => s + v, 0) / 6;
    score += (avgSkill / 100) * 10;
    if (p.status === 'Wounded') score *= 0.8;
    return { pirate: p, score: Math.round(Math.min(100, score)) };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Swords className="w-7 h-7 text-brass-400" />
        <div>
          <h1 className="text-2xl font-bold text-brass-400 nautical-text tracking-wide">Battle Readiness</h1>
          <p className="text-xs text-parchment-200/50">Crew Vitals &amp; Operational Status</p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blood-500/20 border border-blood-400/30 text-sm text-blood-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}

      {/* Overall Readiness Gauge */}
      <div className="parchment-panel-highlight p-6 flex items-center gap-8 flex-wrap">
        <div className="text-center">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(30,58,110,0.5)" strokeWidth="3" />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={overallReadiness >= 70 ? '#059669' : overallReadiness >= 50 ? '#f59e0b' : '#dc2626'}
                strokeWidth="3"
                strokeDasharray={`${overallReadiness}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-3xl font-bold ${readinessInfo.color} nautical-text`}>{overallReadiness}</span>
            </div>
          </div>
          <p className={`text-sm font-semibold mt-2 ${readinessInfo.color}`}>{readinessInfo.label}</p>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-parchment-100 nautical-text">{active.length}</p>
            <p className="text-xs text-parchment-200/40">Total Crew</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400 nautical-text">{battleReady.length}</p>
            <p className="text-xs text-parchment-200/40">Battle Ready</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-parchment-100 nautical-text">{avgHealth}</p>
            <p className="text-xs text-parchment-200/40">Avg Health</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-parchment-100 nautical-text">{avgMorale}</p>
            <p className="text-xs text-parchment-200/40">Avg Morale</p>
          </div>
        </div>
      </div>

      {/* Vitals Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VitalsChart title="Health Distribution" data={healthCats} icon={Heart} />
        <VitalsChart title="Morale Distribution" data={moraleCats} icon={Activity} />
        <VitalsChart title="Scurvy Distribution" data={scurvyCats} icon={Shield} />
      </div>

      {/* Individual Readiness */}
      <div className="parchment-panel p-5">
        <h3 className="text-sm font-semibold text-brass-400 mb-3">Individual Readiness Scores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pirateReadiness.map(({ pirate: p, score }) => {
            const ri = getReadinessStatus(score);
            return (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/30 border border-navy-700/20">
                <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 font-bold text-sm border border-brass-400/30 shrink-0">
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-parchment-100 truncate">{p.name}</p>
                  <p className="text-[10px] text-parchment-200/30">{p.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${ri.color}`}>{score}</p>
                  <p className={`text-[10px] ${ri.color}`}>{ri.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Readiness */}
      {missionReadiness.length > 0 && (
        <div className="parchment-panel p-5">
          <h3 className="text-sm font-semibold text-brass-400 mb-3">Mission Readiness Overview</h3>
          <div className="space-y-3">
            {missionReadiness.map(({ mission: m, score, avgHealth: ah, avgMorale: am, skillCoverage: sc }) => {
              const ri = getReadinessStatus(score);
              return (
                <div key={m.id} className="p-3 rounded-lg bg-navy-900/30 border border-navy-700/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-parchment-100">{m.name}</p>
                      <p className="text-[10px] text-parchment-200/30">{m.type} • {m.assignedCrew.length}/{m.requiredCrewSize} crew</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${ri.color}`}>{score}</p>
                      <p className={`text-[10px] ${ri.color}`}>{ri.label}</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-navy-900 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${score}%`,
                      background: score >= 70 ? '#059669' : score >= 50 ? '#f59e0b' : '#dc2626',
                    }} />
                  </div>
                  <div className="flex gap-4 mt-2 text-[10px] text-parchment-200/30">
                    <span>Health: {ah}%</span>
                    <span>Morale: {am}%</span>
                    <span>Skill Coverage: {sc}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function VitalsChart({ title, data, icon: Icon }: { title: string; data: { label: string; count: number; color: string }[]; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="parchment-panel p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-brass-400/60" />
        <h3 className="text-sm font-semibold text-brass-400">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fill: '#e8d4a0', fontSize: 9 }} />
          <YAxis tick={{ fill: 'rgba(232,212,160,0.3)', fontSize: 10 }} allowDecimals={false} />
          <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 8, color: '#e8d4a0' }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
