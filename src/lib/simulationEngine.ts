import type { Pirate, Mission, SimulationEvent, SimulationStage, MissionHistoryEntry, SkillKey } from './types';
import { SKILL_LABELS, SIMULATION_STAGES } from './types';
import { calculateMissionReadiness } from './missionEngine';

// ── Contextual event generation based on crew skills ──

const STAGE_EVENTS: Record<SimulationStage, {
  positive: (p: Pirate) => string | null;
  negative: (p: Pirate) => string | null;
}[]> = {
  approach: [
    { positive: (p) => p.skills.navigation >= 70 ? `🧭 ${p.name} charts a swift approach, avoiding patrols.` : null, negative: () => null },
    { positive: () => null, negative: (p) => p.scurvy > 50 ? `☠️ ${p.name}'s scurvy slows the approach.` : null },
  ],
  recon: [
    { positive: (p) => p.skills.stealth >= 75 ? `🕵️ ${p.name} scouts ahead undetected, revealing enemy positions.` : null, negative: () => null },
    { positive: (p) => p.role === 'Lookout' ? `🔭 ${p.name} spots a weakness in their defenses.` : null, negative: () => null },
    { positive: () => null, negative: (p) => p.morale < 40 ? `😟 ${p.name} hesitates, nearly giving away the position.` : null },
  ],
  boarding: [
    { positive: (p) => p.skills.rigging >= 70 ? `🪢 ${p.name} swings across with expert precision.` : null, negative: () => null },
    { positive: () => null, negative: (p) => p.hp < 50 ? `❤️ ${p.name} struggles to board — injuries slow them down.` : null },
    { positive: () => null, negative: (p) => p.scurvy > 60 ? `☠️ ${p.name} collapses briefly — scurvy takes its toll.` : null },
  ],
  combat: [
    { positive: (p) => p.skills.swordsmanship >= 75 ? `⚔️ ${p.name} cuts through the enemy line with devastating skill.` : null, negative: () => null },
    { positive: (p) => p.skills.cannonGunnery >= 75 ? `💣 ${p.name} disables the enemy's defensive cannon.` : null, negative: () => null },
    { positive: () => null, negative: (p) => p.morale < 35 ? `😟 ${p.name} freezes in combat — low morale saps their courage.` : null },
    { positive: () => null, negative: (p) => p.hp < 40 ? `❤️ ${p.name} takes a serious hit and falls back.` : null },
  ],
  objective: [
    { positive: (p) => p.skills.navigation >= 60 ? `🗺️ ${p.name} locates the objective quickly.` : null, negative: () => null },
    { positive: (p) => p.role === 'Quartermaster' ? `💰 ${p.name} secures the plunder efficiently.` : null, negative: () => null },
    { positive: () => null, negative: () => null },
  ],
  escape: [
    { positive: (p) => p.skills.stealth >= 60 ? `🌫️ ${p.name} covers the retreat with a smoke diversion.` : null, negative: () => null },
    { positive: (p) => p.skills.navigation >= 70 ? `🧭 ${p.name} navigates the escape route flawlessly.` : null, negative: () => null },
    { positive: () => null, negative: (p) => p.scurvy > 50 ? `☠️ ${p.name} slows the retreat — scurvy saps their strength.` : null },
  ],
  result: [],
};

export function generateSimulationEvents(
  crew: Pirate[],
  mission: Mission,
  success: boolean
): SimulationEvent[] {
  const events: SimulationEvent[] = [];

  for (const stage of SIMULATION_STAGES) {
    if (stage === 'result') {
      events.push({
        stage,
        icon: success ? '🏴‍☠️' : '☠️',
        text: success
          ? 'The objective is secured! The crew returns victorious!'
          : 'The crew is forced to retreat. The mission has failed.',
        type: success ? 'positive' : 'negative',
      });
      continue;
    }

    const stageEventDefs = STAGE_EVENTS[stage];
    let stageHasEvent = false;

    // Generate positive events from skilled crew
    for (const def of stageEventDefs) {
      for (const p of crew) {
        const posText = def.positive(p);
        if (posText && Math.random() < 0.5) {
          events.push({ stage, icon: posText.slice(0, posText.indexOf(' ')), text: posText, type: 'positive' });
          stageHasEvent = true;
          break;
        }
      }
      if (stageHasEvent) break;
    }

    // Generate negative events from weak crew
    for (const def of stageEventDefs) {
      for (const p of crew) {
        const negText = def.negative(p);
        if (negText && Math.random() < 0.4) {
          events.push({ stage, icon: negText.slice(0, negText.indexOf(' ')), text: negText, type: 'negative' });
          stageHasEvent = true;
          break;
        }
      }
      if (stageHasEvent) break;
    }

    // If no event was generated, add a neutral one
    if (!stageHasEvent) {
      const neutralTexts: Record<SimulationStage, string> = {
        approach: 'The ship closes in on the target...',
        recon: 'The crew surveys the situation...',
        boarding: 'The boarding party prepares to strike...',
        combat: 'Clashing steel echoes across the deck...',
        objective: 'The crew pushes toward the objective...',
        escape: 'The crew makes their getaway...',
        result: '',
      };
      if (neutralTexts[stage]) {
        events.push({ stage, icon: '⚓', text: neutralTexts[stage], type: 'neutral' });
      }
    }
  }

  return events;
}

// ── Outcome calculation engine ──

export function calculateMissionOutcome(
  pirates: Pirate[],
  mission: Mission,
  assignedIds: string[]
): { success: boolean; probability: number; rewards: { gold: number; xp: number; reputation: number } } {
  const crew = pirates.filter((p) => assignedIds.includes(p.id));
  if (crew.length === 0) return { success: false, probability: 0, rewards: { gold: 0, xp: 0, reputation: 0 } };

  const readiness = calculateMissionReadiness(pirates, mission, assignedIds);
  const avgHealth = crew.reduce((s, p) => s + p.hp, 0) / crew.length;
  const avgMorale = crew.reduce((s, p) => s + p.morale, 0) / crew.length;
  const avgExp = crew.reduce((s, p) => s + p.experience, 0) / crew.length;
  const avgScurvy = crew.reduce((s, p) => s + p.scurvy, 0) / crew.length;

  // Skill advantage
  const requiredKeys = Object.keys(mission.requiredSkills) as SkillKey[];
  let skillAdvantage = 0;
  if (requiredKeys.length > 0) {
    for (const key of requiredKeys) {
      const required = mission.requiredSkills[key] ?? 0;
      const best = Math.max(...crew.map((p) => p.skills[key]));
      skillAdvantage += Math.min((best - required) / 100, 0.3);
    }
    skillAdvantage /= requiredKeys.length;
  }

  // Base probability from readiness
  let probability = readiness.score / 100;

  // Adjustments
  probability += skillAdvantage * 0.15;
  probability += (avgHealth - 50) / 200;      // ±0.25
  probability += (avgMorale - 50) / 250;      // ±0.2
  probability += (avgExp - 50) / 400;         // ±0.125
  probability -= avgScurvy / 300;             // -0 to -0.33
  probability -= (mission.difficulty - 3) * 0.08; // difficulty adjustment

  // Crew size factor
  const crewRatio = crew.length / mission.requiredCrewSize;
  if (crewRatio < 1) probability -= (1 - crewRatio) * 0.15;

  // Clamp between 5% and 95%
  probability = Math.max(0.05, Math.min(0.95, probability));

  const roll = Math.random();
  const success = roll < probability;

  // Rewards scale with difficulty and success
  const diffMult = mission.difficulty / 3;
  const rewards = success
    ? {
        gold: Math.round((300 + Math.random() * 500) * diffMult),
        xp: Math.round((80 + Math.random() * 200) * diffMult),
        reputation: Math.round((5 + Math.random() * 15) * diffMult),
      }
    : {
        gold: Math.round(50 + Math.random() * 100),
        xp: Math.round(20 + Math.random() * 40),
        reputation: -Math.round(3 + Math.random() * 8),
      };

  return { success, probability: Math.round(probability * 100), rewards };
}

// ── Apply post-mission crew changes ──

export function applyCrewChanges(
  crew: Pirate[],
  success: boolean,
  mission: Mission
): { updated: Pirate[]; changes: MissionHistoryEntry['crewChanges'] } {
  const changes: MissionHistoryEntry['crewChanges'] = [];
  const updated = crew.map((p) => {
    const hpDelta = success
      ? Math.round(-(Math.random() * 15 + 5) * (mission.difficulty / 3))
      : Math.round(-(Math.random() * 25 + 10) * (mission.difficulty / 3));
    const moraleDelta = success
      ? Math.round(Math.random() * 12 + 3)
      : Math.round(-(Math.random() * 15 + 5));

    const newHp = Math.max(5, Math.min(100, p.hp + hpDelta));
    const newMorale = Math.max(0, Math.min(100, p.morale + moraleDelta));

    changes.push({
      pirateId: p.id,
      name: p.name,
      hpBefore: p.hp,
      hpAfter: newHp,
      moraleBefore: p.morale,
      moraleAfter: newMorale,
    });

    return {
      ...p,
      hp: newHp,
      morale: newMorale,
      status: newHp < 40 ? 'Wounded' as const : p.status,
    };
  });

  return { updated, changes };
}

// ── Tactical analysis ──

export function generateAnalysis(
  crew: Pirate[],
  mission: Mission,
  success: boolean,
  readinessScore: number,
  events: SimulationEvent[]
): MissionHistoryEntry['analysis'] {
  const whatWentWell: string[] = [];
  const whatWentWrong: string[] = [];

  const posEvents = events.filter((e) => e.type === 'positive');
  const negEvents = events.filter((e) => e.type === 'negative');

  if (posEvents.length > negEvents.length) whatWentWell.push('More positive events than negative');
  else if (negEvents.length > posEvents.length) whatWentWrong.push('Crew faced more setbacks than advantages');

  const avgHealth = crew.reduce((s, p) => s + p.hp, 0) / crew.length;
  if (avgHealth >= 80) whatWentWell.push('Crew entered with strong health');
  else if (avgHealth < 60) whatWentWrong.push('Crew health was below par');

  const avgMorale = crew.reduce((s, p) => s + p.morale, 0) / crew.length;
  if (avgMorale >= 70) whatWentWell.push('High crew morale');
  else if (avgMorale < 45) whatWentWrong.push('Morale was dangerously low');

  const requiredKeys = Object.keys(mission.requiredSkills) as SkillKey[];
  for (const key of requiredKeys) {
    const required = mission.requiredSkills[key] ?? 0;
    const best = Math.max(...crew.map((p) => p.skills[key]));
    if (best >= required + 15) whatWentWell.push(`Excellent ${SKILL_LABELS[key]} coverage`);
    else if (best < required) whatWentWrong.push(`${SKILL_LABELS[key]} below requirement`);
  }

  const lowHp = crew.filter((p) => p.hp < 50).length;
  if (lowHp > 0) whatWentWrong.push(`${lowHp} crew entered with low HP`);

  const highScurvy = crew.filter((p) => p.scurvy > 50).length;
  if (highScurvy > 0) whatWentWrong.push(`${highScurvy} crew with severe scurvy`);

  if (success) whatWentWell.push('Mission objective achieved');
  else whatWentWrong.push('Mission objective failed');

  // Best performer
  const contributions = crew.map((p) => {
    let score = 0;
    for (const key of requiredKeys) {
      score += p.skills[key] / Math.max(mission.requiredSkills[key] ?? 1, 1);
    }
    score += p.hp / 100 + p.morale / 100 + p.experience / 100;
    return { name: p.name, contribution: Math.round(score) };
  }).sort((a, b) => b.contribution - a.contribution);

  const bestPerformer = contributions[0] ?? null;

  // Weakest factor
  let weakestFactor = 'Unknown';
  if (avgHealth < 60) weakestFactor = 'Crew Health';
  else if (avgMorale < 45) weakestFactor = 'Crew Morale';
  else if (highScurvy > 0) weakestFactor = 'Scurvy';
  else {
    for (const key of requiredKeys) {
      const required = mission.requiredSkills[key] ?? 0;
      const best = Math.max(...crew.map((p) => p.skills[key]));
      if (best < required) { weakestFactor = SKILL_LABELS[key]; break; }
    }
  }

  // Most important skill
  const mostImportantSkill = requiredKeys.length > 0
    ? SKILL_LABELS[requiredKeys.reduce((best, key) => {
        const reqB = mission.requiredSkills[best] ?? 0;
        const reqK = mission.requiredSkills[key] ?? 0;
        return reqK > reqB ? key : best;
      }, requiredKeys[0])]
    : 'General Combat';

  if (whatWentWell.length === 0) whatWentWell.push('Crew deployed successfully');
  if (whatWentWrong.length === 0) whatWentWrong.push('No significant issues');

  return {
    whatWentWell: whatWentWell.slice(0, 5),
    whatWentWrong: whatWentWrong.slice(0, 5),
    bestPerformer,
    weakestFactor,
    mostImportantSkill,
  };
}
