'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { SKILL_LABELS, type SkillKey } from '@/lib/types';
import { BarChart3 } from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';

const SKILL_COLORS: Record<SkillKey, string> = {
  swordsmanship: '#dc2626',
  cannonGunnery: '#f59e0b',
  navigation: '#2a8ba8',
  rigging: '#059669',
  stealth: '#8b5cf6',
  medicine: '#ec4899',
};

export default function IntelligencePage() {
  const { pirates } = useStore();
  const [selectedPirateId, setSelectedPirateId] = useState<string | null>(null);
  const active = pirates.filter((p) => p.status !== 'Discharged');
  const skillKeys: SkillKey[] = ['swordsmanship', 'cannonGunnery', 'navigation', 'rigging', 'stealth', 'medicine'];

  const selectedPirate = active.find((p) => p.id === selectedPirateId) ?? null;

  const radarData = selectedPirate
    ? skillKeys.map((key) => ({ skill: SKILL_LABELS[key], value: selectedPirate.skills[key], fullMark: 100 }))
    : skillKeys.map((key) => ({
        skill: SKILL_LABELS[key],
        value: active.length > 0 ? Math.round(active.reduce((s, p) => s + p.skills[key], 0) / active.length) : 0,
        fullMark: 100,
      }));

  const skillDistribution = skillKeys.map((key) => {
    const values = active.map((p) => p.skills[key]);
    return {
      skill: SKILL_LABELS[key],
      avg: values.length > 0 ? Math.round(values.reduce((s, v) => s + v, 0) / values.length) : 0,
      max: values.length > 0 ? Math.max(...values) : 0,
      color: SKILL_COLORS[key],
    };
  });

  const sortedPirates = [...active].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-7 h-7 text-brass-400" />
        <div>
          <h1 className="text-2xl font-bold text-brass-400 nautical-text tracking-wide">Intelligence</h1>
          <p className="text-xs text-parchment-200/50">Crew Skill Analysis &amp; Distribution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar Chart */}
        <div className="parchment-panel p-5">
          <h3 className="text-sm font-semibold text-brass-400 mb-3">
            {selectedPirate ? `${selectedPirate.name}'s Skills` : 'Crew Average Skills'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(212,168,83,0.15)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#e8d4a0', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(232,212,160,0.3)', fontSize: 9 }} />
              <Radar name="Skill" dataKey="value" stroke="#d4a853" fill="#d4a853" fillOpacity={0.35} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-3">
            <label className="text-xs text-parchment-200/40 block mb-1">Select Pirate for Radar</label>
            <select value={selectedPirateId ?? ''} onChange={(e) => setSelectedPirateId(e.target.value || null)} className="w-full">
              <option value="">Crew Average</option>
              {active.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>

        {/* Skill Distribution Bars */}
        <div className="parchment-panel p-5">
          <h3 className="text-sm font-semibold text-brass-400 mb-3">Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillDistribution} layout="vertical">
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(232,212,160,0.3)', fontSize: 10 }} />
              <YAxis dataKey="skill" type="category" tick={{ fill: '#e8d4a0', fontSize: 11 }} width={100} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 8, color: '#e8d4a0' }} />
              <Bar dataKey="avg" name="Average" radius={[0, 4, 4, 0]}>
                {skillDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center flex-wrap">
            {skillDistribution.map((s) => (
              <div key={s.skill} className="text-center">
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ background: s.color }} />
                <p className="text-[10px] text-parchment-200/40">{s.avg} avg</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Matrix Table */}
      <div className="parchment-panel p-5">
        <h3 className="text-sm font-semibold text-brass-400 mb-3">Complete Skill Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-xs text-parchment-200/40 pb-2 pr-3 sticky left-0 bg-navy-800">Pirate</th>
                {skillKeys.map((key) => (
                  <th key={key} className="text-center text-xs text-parchment-200/40 pb-2 px-2">{SKILL_LABELS[key]}</th>
                ))}
                <th className="text-center text-xs text-parchment-200/40 pb-2 px-2">Avg</th>
              </tr>
            </thead>
            <tbody>
              {sortedPirates.map((pirate) => {
                const avg = Math.round(skillKeys.reduce((s, k) => s + pirate.skills[k], 0) / skillKeys.length);
                return (
                  <tr key={pirate.id} className="border-t border-navy-700/20 hover:bg-navy-700/10 transition">
                    <td className="py-2 pr-3 sticky left-0 bg-navy-800">
                      <span className="text-parchment-100 font-medium">{pirate.name}</span>
                      <span className="text-[10px] text-parchment-200/30 ml-2">{pirate.role}</span>
                    </td>
                    {skillKeys.map((key) => {
                      const val = pirate.skills[key];
                      return (
                        <td key={key} className="text-center py-2 px-2">
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-12 h-2 rounded-full bg-navy-900 overflow-hidden">
                              <div className="h-full rounded-full" style={{
                                width: `${val}%`,
                                background: val >= 80 ? SKILL_COLORS[key] : val >= 50 ? `${SKILL_COLORS[key]}88` : `${SKILL_COLORS[key]}44`,
                              }} />
                            </div>
                            <span className="text-[10px] font-mono text-parchment-200/50 w-6 text-right">{val}</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="text-center py-2 px-2">
                      <span className={`text-xs font-mono font-semibold ${avg >= 70 ? 'text-emerald-400' : avg >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                        {avg}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Specialists */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {skillKeys.map((key) => {
          const top = [...active].sort((a, b) => b.skills[key] - a.skills[key])[0];
          if (!top) return null;
          return (
            <div key={key} className="parchment-panel p-4 text-center card-hover">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: SKILL_COLORS[key] }} />
              <p className="text-[10px] text-parchment-200/40">{SKILL_LABELS[key]}</p>
              <p className="text-sm font-semibold text-parchment-100 mt-1">{top.name}</p>
              <p className="text-lg font-bold nautical-text" style={{ color: SKILL_COLORS[key] }}>{top.skills[key]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
