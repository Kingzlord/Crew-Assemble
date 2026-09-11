'use client';

import { useStore } from '@/lib/store';
import { getHealthStatus, getMoraleStatus, getScurvyStatus, getReadinessStatus, SKILL_LABELS, type SkillKey } from '@/lib/types';
import { calculateMissionReadiness, getAlerts } from '@/lib/missionEngine';
import { Anchor, Users, Heart, AlertTriangle, Shield, Skull, Activity, Compass, Ship, Swords } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function CommandDeck() {
  const { pirates, missions } = useStore();
  const active = pirates.filter((p) => p.status !== 'Discharged');
  const battleReady = active.filter((p) => p.hp >= 70 && p.morale >= 50 && p.scurvy <= 50);
  const avgMorale = active.length > 0 ? Math.round(active.reduce((s, p) => s + p.morale, 0) / active.length) : 0;
  const avgHealth = active.length > 0 ? Math.round(active.reduce((s, p) => s + p.hp, 0) / active.length) : 0;
  const scurvyAlerts = active.filter((p) => p.scurvy > 50).length;
  const alerts = getAlerts(pirates);
  const activeMission = missions.find((m) => m.status === 'Active');
  const planningMissions = missions.filter((m) => m.status === 'Planning');

  const crewReadiness = active.length > 0
    ? Math.round(
        (battleReady.length / active.length) * 40 +
        (avgHealth / 100) * 25 +
        (avgMorale / 100) * 20 +
        (active.filter(p => p.scurvy <= 30).length / active.length) * 15
      )
    : 0;

  const readinessInfo = getReadinessStatus(crewReadiness);

  const roleData = Object.entries(
    active.reduce<Record<string, number>>((acc, p) => {
      acc[p.role] = (acc[p.role] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const PIE_COLORS = ['#d4a853', '#c9952a', '#2a8ba8', '#dc2626', '#3dabbf', '#059669', '#6b7280'];

  const skillKeys: SkillKey[] = ['swordsmanship', 'cannonGunnery', 'navigation', 'rigging', 'stealth', 'medicine'];
  const skillAvgData = skillKeys.map((key) => ({
    skill: SKILL_LABELS[key],
    value: active.length > 0 ? Math.round(active.reduce((s, p) => s + p.skills[key], 0) / active.length) : 0,
  }));

  const healthBuckets = [
    { range: '90-100', count: active.filter(p => p.hp >= 90).length, color: '#059669' },
    { range: '70-89', count: active.filter(p => p.hp >= 70 && p.hp < 90).length, color: '#2a8ba8' },
    { range: '40-69', count: active.filter(p => p.hp >= 40 && p.hp < 70).length, color: '#f59e0b' },
    { range: '0-39', count: active.filter(p => p.hp < 40).length, color: '#dc2626' },
  ];

  const readinessColor = crewReadiness >= 70 ? '#059669' : crewReadiness >= 50 ? '#f59e0b' : '#dc2626';

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Hero Header */}
      <div className="parchment-panel-highlight p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,168,83,0.1) 35px, rgba(212,168,83,0.1) 36px)`,
        }} />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-navy-700/50 flex items-center justify-center border-2 border-brass-400/30">
              <Anchor className="w-8 h-8 text-brass-400" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-brass-400 nautical-text tracking-wide">Command Deck</h1>
              <p className="text-sm text-parchment-200/50">Captain&apos;s Overview — Midnight Reaver</p>
            </div>
          </div>
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(30,58,110,0.5)" strokeWidth="2.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={readinessColor} strokeWidth="2.5" strokeDasharray={`${crewReadiness}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-xl font-bold ${readinessInfo.color} nautical-text`}>{crewReadiness}</span>
                <span className={`text-[8px] ${readinessInfo.color} font-semibold`}>{readinessInfo.label}</span>
              </div>
            </div>
            <p className="text-xs text-parchment-200/40 mt-1">Crew Readiness</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blood-500/20 border border-blood-400/30 text-sm text-blood-300 shimmer">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Crew" value={active.length} sub={`${pirates.length} on manifest`} accent="text-brass-400" />
        <StatCard icon={Shield} label="Battle Ready" value={battleReady.length} sub={`${Math.round(battleReady.length / Math.max(active.length, 1) * 100)}% of crew`} accent="text-emerald-400" />
        <StatCard icon={Heart} label="Avg Health" value={avgHealth} sub={getHealthStatus(avgHealth).label} accent={getHealthStatus(avgHealth).color} />
        <StatCard icon={Activity} label="Avg Morale" value={avgMorale} sub={getMoraleStatus(avgMorale).label} accent={getMoraleStatus(avgMorale).color} />
        <StatCard icon={Skull} label="Scurvy Alerts" value={scurvyAlerts} sub={scurvyAlerts > 0 ? 'Needs attention' : 'All clear'} accent={scurvyAlerts > 0 ? 'text-blood-300' : 'text-emerald-400'} />
        <StatCard icon={Compass} label="Active Mission" value={activeMission ? 1 : 0} sub={activeMission?.name ?? 'None active'} accent="text-brass-400" />
        <StatCard icon={Swords} label="Planning" value={planningMissions.length} sub="missions in queue" accent="text-ocean-300" />
        <StatCard icon={Anchor} label="Wounded" value={active.filter(p => p.status === 'Wounded').length} sub="recovering" accent="text-amber-400" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Skill Radar */}
        <div className="parchment-panel p-4">
          <h3 className="text-sm font-semibold text-brass-400 mb-3">Crew Skill Averages</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={skillAvgData}>
              <PolarGrid stroke="rgba(212,168,83,0.15)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#e8d4a0', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#e8d4a055', fontSize: 8 }} />
              <Radar name="Avg Skill" dataKey="value" stroke="#d4a853" fill="#d4a853" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Health Distribution */}
        <div className="parchment-panel p-4">
          <h3 className="text-sm font-semibold text-brass-400 mb-3">Health Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={healthBuckets}>
              <XAxis dataKey="range" tick={{ fill: '#e8d4a0', fontSize: 11 }} />
              <YAxis tick={{ fill: '#e8d4a055', fontSize: 10 }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 8, color: '#e8d4a0' }} labelStyle={{ color: '#d4a853' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {healthBuckets.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution */}
        <div className="parchment-panel p-4">
          <h3 className="text-sm font-semibold text-brass-400 mb-3">Role Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                {roleData.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a1628', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 8, color: '#e8d4a0' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Crew Members */}
      <div className="parchment-panel p-4">
        <h3 className="text-sm font-semibold text-brass-400 mb-3">Top Battle-Ready Crew</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {battleReady
            .sort((a, b) => {
              const scoreA = (a.hp + a.morale + a.experience + Object.values(a.skills).reduce((s, v) => s + v, 0) / 6) / 4;
              const scoreB = (b.hp + b.morale + b.experience + Object.values(b.skills).reduce((s, v) => s + v, 0) / 6) / 4;
              return scoreB - scoreA;
            })
            .slice(0, 6)
            .map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-navy-900/50 border border-navy-700/30 card-hover">
                <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 font-bold text-sm border border-brass-400/30">
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-parchment-100 truncate">{p.name}</p>
                  <p className="text-xs text-parchment-200/50">{p.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-emerald-400">{p.hp} HP</p>
                  <p className="text-xs text-brass-400/60">{p.morale} MRL</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  sub: string;
  accent?: string;
}) {
  return (
    <div className="parchment-panel p-4 card-hover">
      <div className="flex items-start justify-between mb-2">
        <Icon className="w-5 h-5 text-brass-400/50" />
      </div>
      <p className={`text-2xl font-bold nautical-text ${accent ?? 'text-parchment-100'}`}>{value}</p>
      <p className="text-xs text-parchment-200/50 mt-1">{label}</p>
      <p className="text-[10px] text-parchment-200/30 mt-0.5 truncate">{sub}</p>
    </div>
  );
}
