'use client';

import { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import {
  getHealthStatus, getMoraleStatus, getScurvyStatus,
  ROLE_LIST, SKILL_LABELS, type Role, type SkillKey, type Pirate, type Skills,
} from '@/lib/types';
import { Search, Filter, X, Plus, Edit3, Trash2, Eye } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type SortKey = 'name' | 'hp' | 'morale' | 'experience' | 'skill' | 'scurvy';
type SortDir = 'asc' | 'desc';

export default function CrewManifest() {
  const { pirates, addPirate, updatePirate, removePirate } = useStore();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | ''>('');
  const [healthFilter, setHealthFilter] = useState<'Excellent' | 'Good' | 'Wounded' | 'Critical' | ''>('');
  const [moraleFilter, setMoraleFilter] = useState<'High' | 'Stable' | 'Low' | 'Mutinous' | ''>('');
  const [scurvyFilter, setScurvyFilter] = useState<'Healthy' | 'Warning' | 'Severe' | 'Critical' | ''>('');
  const [skillFilter, setSkillFilter] = useState<SkillKey | ''>('');
  const [skillMin, setSkillMin] = useState(0);
  const [readinessFilter, setReadinessFilter] = useState<'Ready' | 'Not Ready' | ''>('');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [viewPirate, setViewPirate] = useState<Pirate | null>(null);
  const [editPirate, setEditPirate] = useState<Pirate | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showProfile, setShowProfile] = useState<Pirate | null>(null);

  const filtered = useMemo(() => {
    let result = pirates.filter((p) => p.status !== 'Discharged');

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q));
    }
    if (roleFilter) result = result.filter((p) => p.role === roleFilter);
    if (healthFilter) {
      result = result.filter((p) => getHealthStatus(p.hp).label === healthFilter);
    }
    if (moraleFilter) {
      result = result.filter((p) => getMoraleStatus(p.morale).label === moraleFilter);
    }
    if (scurvyFilter) {
      result = result.filter((p) => getScurvyStatus(p.scurvy).label === scurvyFilter);
    }
    if (skillFilter) {
      result = result.filter((p) => p.skills[skillFilter] >= skillMin);
    }
    if (readinessFilter) {
      if (readinessFilter === 'Ready') result = result.filter((p) => p.hp >= 70 && p.morale >= 50 && p.scurvy <= 50);
      else result = result.filter((p) => p.hp < 70 || p.morale < 50 || p.scurvy > 50);
    }

    result.sort((a, b) => {
      let va = 0, vb = 0;
      switch (sortBy) {
        case 'name': return sortDir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case 'hp': va = a.hp; vb = b.hp; break;
        case 'morale': va = a.morale; vb = b.morale; break;
        case 'experience': va = a.experience; vb = b.experience; break;
        case 'scurvy': va = a.scurvy; vb = b.scurvy; break;
        case 'skill': {
          const avgA = Object.values(a.skills).reduce((s, v) => s + v, 0) / 6;
          const avgB = Object.values(b.skills).reduce((s, v) => s + v, 0) / 6;
          va = avgA; vb = avgB; break;
        }
      }
      return sortDir === 'asc' ? va - vb : vb - va;
    });

    return result;
  }, [pirates, search, roleFilter, healthFilter, moraleFilter, scurvyFilter, skillFilter, skillMin, readinessFilter, sortBy, sortDir]);

  const activeFilters = [roleFilter, healthFilter, moraleFilter, scurvyFilter, skillFilter, readinessFilter].filter(Boolean).length;

  const roleBadgeColor = (role: Role) => {
    const map: Record<Role, string> = {
      Captain: 'bg-brass-400/20 text-brass-400 border-brass-400/30',
      Quartermaster: 'bg-brass-500/20 text-brass-500 border-brass-500/30',
      Bosun: 'bg-ocean-400/20 text-ocean-300 border-ocean-400/30',
      'Master Gunner': 'bg-blood-500/20 text-blood-300 border-blood-400/30',
      Lookout: 'bg-ocean-300/20 text-ocean-300 border-ocean-300/30',
      Shipwright: 'bg-emerald-900/30 text-emerald-400 border-emerald-600/30',
      Deckhand: 'bg-navy-600/30 text-parchment-200/60 border-navy-600/30',
    };
    return map[role];
  };

  return (
    <div className="p-4 lg:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">☠</span>
          <div>
            <h1 className="text-2xl font-bold text-brass-400 nautical-text tracking-wide">Crew Manifest</h1>
            <p className="text-xs text-parchment-200/50">{filtered.length} of {pirates.filter(p => p.status !== 'Discharged').length} crew shown</p>
          </div>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditPirate(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Pirate
        </button>
      </div>

      {/* Search + Filter Toggle */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-parchment-200/30" />
          <input
            type="text"
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition
            ${showFilters ? 'bg-brass-400/20 text-brass-400 border-brass-400/30' : 'bg-navy-800/50 text-parchment-200/60 border-navy-700/30 hover:border-brass-400/20'}
          `}
        >
          <Filter className="w-4 h-4" /> Filters {activeFilters > 0 && `(${activeFilters})`}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="parchment-panel p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-brass-400">Filter Criteria</span>
            <button
              onClick={() => { setRoleFilter(''); setHealthFilter(''); setMoraleFilter(''); setScurvyFilter(''); setSkillFilter(''); setSkillMin(0); setReadinessFilter(''); }}
              className="text-xs text-parchment-200/40 hover:text-parchment-100 transition"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Role</label>
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as Role | '')} className="w-full">
                <option value="">All</option>
                {ROLE_LIST.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Health</label>
              <select value={healthFilter} onChange={(e) => setHealthFilter(e.target.value as typeof healthFilter)} className="w-full">
                <option value="">All</option>
                <option>Excellent</option><option>Good</option><option>Wounded</option><option>Critical</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Morale</label>
              <select value={moraleFilter} onChange={(e) => setMoraleFilter(e.target.value as typeof moraleFilter)} className="w-full">
                <option value="">All</option>
                <option>High</option><option>Stable</option><option>Low</option><option>Mutinous</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Scurvy</label>
              <select value={scurvyFilter} onChange={(e) => setScurvyFilter(e.target.value as typeof scurvyFilter)} className="w-full">
                <option value="">All</option>
                <option>Healthy</option><option>Warning</option><option>Severe</option><option>Critical</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Skill</label>
              <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value as SkillKey | '')} className="w-full">
                <option value="">None</option>
                {(Object.keys(SKILL_LABELS) as SkillKey[]).map((k) => <option key={k} value={k}>{SKILL_LABELS[k]}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Readiness</label>
              <select value={readinessFilter} onChange={(e) => setReadinessFilter(e.target.value as typeof readinessFilter)} className="w-full">
                <option value="">All</option>
                <option>Ready</option><option>Not Ready</option>
              </select>
            </div>
          </div>
          {skillFilter && (
            <div className="flex items-center gap-3">
              <label className="text-xs text-parchment-200/40">{SKILL_LABELS[skillFilter]} minimum:</label>
              <input type="range" min={0} max={100} value={skillMin} onChange={(e) => setSkillMin(Number(e.target.value))} className="flex-1 accent-brass-400" />
              <span className="text-sm text-brass-400 font-mono w-8">{skillMin}</span>
            </div>
          )}
          {/* Sort */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-parchment-200/40">Sort:</span>
            {(['name', 'hp', 'morale', 'experience', 'skill', 'scurvy'] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => { if (sortBy === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); else { setSortBy(key); setSortDir('desc'); } }}
                className={`text-xs px-2 py-1 rounded border transition ${sortBy === key ? 'bg-brass-400/20 text-brass-400 border-brass-400/30' : 'text-parchment-200/40 border-navy-700/30 hover:border-brass-400/20'}`}
              >
                {key === 'skill' ? 'Avg Skill' : key.charAt(0).toUpperCase() + key.slice(1)}
                {sortBy === key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pirate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((pirate) => (
          <div key={pirate.id} className="parchment-panel p-4 card-hover">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 font-bold text-lg border-2 border-brass-400/30 shrink-0">
                {pirate.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-parchment-100 truncate">{pirate.name}</h3>
                </div>
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded border ${roleBadgeColor(pirate.role)}`}>
                  {pirate.role}
                </span>
                <p className="text-xs text-parchment-200/40 mt-1">Age {pirate.age} • Exp {pirate.experience}</p>
              </div>
            </div>

            {/* Vitals Row */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <MiniVital label="HP" value={pirate.hp} max={100} color={pirate.hp >= 70 ? '#059669' : pirate.hp >= 40 ? '#f59e0b' : '#dc2626'} />
              <MiniVital label="MRL" value={pirate.morale} max={100} color={pirate.morale >= 50 ? '#2a8ba8' : pirate.morale >= 25 ? '#f59e0b' : '#dc2626'} />
              <MiniVital label="SCV" value={100 - pirate.scurvy} max={100} color={pirate.scurvy <= 30 ? '#059669' : pirate.scurvy <= 60 ? '#f59e0b' : '#dc2626'} />
            </div>

            {/* Skill Preview */}
            <div className="mt-3 flex gap-1 flex-wrap">
              {(Object.entries(pirate.skills) as [SkillKey, number][]).sort(([, a], [, b]) => b - a).slice(0, 3).map(([key, val]) => (
                <span key={key} className="text-[10px] px-1.5 py-0.5 rounded bg-navy-700/50 text-parchment-200/50 border border-navy-700/30">
                  {SKILL_LABELS[key].slice(0, 4)} {val}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-navy-700/30">
              <button onClick={() => setShowProfile(pirate)} className="flex items-center gap-1 text-xs text-brass-400/70 hover:text-brass-400 transition">
                <Eye className="w-3 h-3" /> Profile
              </button>
              <button onClick={() => { setEditPirate(pirate); setShowAddForm(true); }} className="flex items-center gap-1 text-xs text-parchment-200/40 hover:text-parchment-200 transition">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
              <button onClick={() => removePirate(pirate.id)} className="flex items-center gap-1 text-xs text-blood-300/50 hover:text-blood-300 transition ml-auto">
                <Trash2 className="w-3 h-3" /> Discharge
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="parchment-panel p-8 text-center">
          <p className="text-parchment-200/40">No crew members match the current filters.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddForm && (
        <PirateForm
          initial={editPirate}
          onSave={(p) => { if (editPirate) updatePirate(p); else addPirate(p); setShowAddForm(false); setEditPirate(null); }}
          onClose={() => { setShowAddForm(false); setEditPirate(null); }}
        />
      )}

      {/* Profile Modal */}
      {showProfile && (
        <PirateProfileModal pirate={showProfile} onClose={() => setShowProfile(null)} />
      )}
    </div>
  );
}

function MiniVital({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[10px] text-parchment-200/30">{label}</span>
        <span className="text-[10px] text-parchment-200/60 font-mono">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-navy-900 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

function PirateForm({ initial, onSave, onClose }: { initial: Pirate | null; onSave: (p: Pirate) => void; onClose: () => void }) {
  const blank: Pirate = {
    id: `p${Date.now()}`,
    name: '',
    age: 25,
    role: 'Deckhand',
    hp: 100,
    scurvy: 0,
    morale: 70,
    experience: 30,
    skills: { swordsmanship: 50, cannonGunnery: 50, navigation: 50, rigging: 50, stealth: 50, medicine: 50 },
    status: 'Active',
    bio: '',
  };
  const [form, setForm] = useState<Pirate>(initial ?? blank);
  const set = (partial: Partial<Pirate>) => setForm((f) => ({ ...f, ...partial }));
  const setSkill = (key: SkillKey, val: number) => setForm((f) => ({ ...f, skills: { ...f.skills, [key]: val } }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="parchment-panel-highlight p-6 w-full max-w-lg max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-brass-400 mb-4">{initial ? 'Edit Pirate' : 'Add Pirate'}</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-parchment-200/40 block mb-1">Name</label>
            <input value={form.name} onChange={(e) => set({ name: e.target.value })} className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Age</label>
              <input type="number" value={form.age} onChange={(e) => set({ age: Number(e.target.value) })} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Role</label>
              <select value={form.role} onChange={(e) => set({ role: e.target.value as Role })} className="w-full">
                {ROLE_LIST.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">HP (0-100)</label>
              <input type="number" min={0} max={100} value={form.hp} onChange={(e) => set({ hp: Number(e.target.value) })} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Scurvy (0-100)</label>
              <input type="number" min={0} max={100} value={form.scurvy} onChange={(e) => set({ scurvy: Number(e.target.value) })} className="w-full" />
            </div>
            <div>
              <label className="text-xs text-parchment-200/40 block mb-1">Morale (0-100)</label>
              <input type="number" min={0} max={100} value={form.morale} onChange={(e) => set({ morale: Number(e.target.value) })} className="w-full" />
            </div>
          </div>
          <div>
            <label className="text-xs text-parchment-200/40 block mb-1">Experience (0-100)</label>
            <input type="range" min={0} max={100} value={form.experience} onChange={(e) => set({ experience: Number(e.target.value) })} className="w-full accent-brass-400" />
            <span className="text-xs text-brass-400">{form.experience}</span>
          </div>
          <div>
            <label className="text-xs text-parchment-200/40 block mb-2">Skills</label>
            {(Object.keys(SKILL_LABELS) as SkillKey[]).map((key) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <span className="text-xs text-parchment-200/50 w-28">{SKILL_LABELS[key]}</span>
                <input type="range" min={0} max={100} value={form.skills[key]} onChange={(e) => setSkill(key, Number(e.target.value))} className="flex-1 accent-brass-400" />
                <span className="text-xs text-brass-400 w-6 text-right">{form.skills[key]}</span>
              </div>
            ))}
          </div>
          <div>
            <label className="text-xs text-parchment-200/40 block mb-1">Status</label>
            <select value={form.status} onChange={(e) => set({ status: e.target.value as Pirate['status'] })} className="w-full">
              <option>Active</option><option>Wounded</option><option>On Leave</option><option>Discharged</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-parchment-200/40 block mb-1">Bio</label>
            <textarea value={form.bio} onChange={(e) => set({ bio: e.target.value })} className="w-full" rows={2} />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={() => onSave(form)} className="px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium">
            {initial ? 'Save Changes' : 'Add to Crew'}
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 transition text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PirateProfileModal({ pirate, onClose }: { pirate: Pirate; onClose: () => void }) {
  const hs = getHealthStatus(pirate.hp);
  const ms = getMoraleStatus(pirate.morale);
  const ss = getScurvyStatus(pirate.scurvy);
  const skillKeys: SkillKey[] = ['swordsmanship', 'cannonGunnery', 'navigation', 'rigging', 'stealth', 'medicine'];
  const radarData = skillKeys.map((key) => ({
    skill: SKILL_LABELS[key],
    value: pirate.skills[key],
    fullMark: 100,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="parchment-panel-highlight p-6 w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 font-bold text-2xl border-2 border-brass-400/30">
            {pirate.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-brass-400 nautical-text">{pirate.name}</h2>
            <p className="text-sm text-parchment-200/60">{pirate.role} • Age {pirate.age}</p>
          </div>
        </div>

        <p className="text-sm text-parchment-200/70 mb-4 italic">&ldquo;{pirate.bio}&rdquo;</p>

        {/* Vitals */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold nautical-text">{pirate.hp}</p>
            <p className={`text-xs font-semibold ${hs.color}`}>{hs.label}</p>
            <p className="text-[10px] text-parchment-200/30">Health</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold nautical-text">{pirate.morale}</p>
            <p className={`text-xs font-semibold ${ms.color}`}>{ms.label}</p>
            <p className="text-[10px] text-parchment-200/30">Morale</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold nautical-text">{pirate.scurvy}</p>
            <p className={`text-xs font-semibold ${ss.color}`}>{ss.label}</p>
            <p className="text-[10px] text-parchment-200/30">Scurvy</p>
          </div>
        </div>

        <div className="brass-divider mb-4" />

        {/* Skill Radar Chart */}
        <h3 className="text-sm font-semibold text-brass-400 mb-3">Skill Radar</h3>
        <div className="flex justify-center mb-4">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
              <PolarGrid stroke="rgba(212,168,83,0.15)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#e8d4a0', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(232,212,160,0.3)', fontSize: 8 }} />
              <Radar name="Skills" dataKey="value" stroke="#d4a853" fill="#d4a853" fillOpacity={0.35} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Bars */}
        <h3 className="text-sm font-semibold text-brass-400 mb-3">Skill Details</h3>
        <div className="space-y-2 mb-4">
          {(Object.entries(pirate.skills) as [SkillKey, number][]).sort(([, a], [, b]) => b - a).map(([key, val]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-parchment-200/60 w-28">{SKILL_LABELS[key]}</span>
              <div className="flex-1 h-2 rounded-full bg-navy-900 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: `${val}%`,
                  background: val >= 80 ? '#059669' : val >= 60 ? '#2a8ba8' : val >= 40 ? '#f59e0b' : '#dc2626',
                }} />
              </div>
              <span className="text-xs text-brass-400 font-mono w-8 text-right">{val}</span>
            </div>
          ))}
        </div>

        <div className="brass-divider mb-4" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-parchment-200/30">Experience</p>
            <p className="text-lg font-semibold text-parchment-100">{pirate.experience}/100</p>
          </div>
          <div>
            <p className="text-xs text-parchment-200/30">Status</p>
            <p className="text-lg font-semibold text-parchment-100">{pirate.status}</p>
          </div>
        </div>

        <button onClick={onClose} className="mt-6 px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 transition text-sm">
          Close
        </button>
      </div>
    </div>
  );
}
