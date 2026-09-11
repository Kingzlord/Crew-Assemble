import type { Pirate, Mission, MissionRecommendation, Skills, SkillKey } from './types';
import { SKILL_LABELS } from './types';

const ROLE_WEIGHTS: Record<string, Partial<Record<string, number>>> = {
  'Merchant Ship Raid': { Captain: 0.15, 'Master Gunner': 0.12, Quartermaster: 0.08, Lookout: 0.10, Bosun: 0.08, Shipwright: 0.05, Deckhand: 0.05 },
  'Naval Boarding': { Captain: 0.15, 'Master Gunner': 0.10, Bosun: 0.12, Quartermaster: 0.10, Lookout: 0.05, Shipwright: 0.05, Deckhand: 0.08 },
  'Treasure Island Expedition': { Captain: 0.10, Lookout: 0.12, Shipwright: 0.10, Quartermaster: 0.08, Bosun: 0.08, 'Master Gunner': 0.05, Deckhand: 0.07 },
  'Silent Harbor Infiltration': { Lookout: 0.15, Quartermaster: 0.10, Captain: 0.05, Bosun: 0.05, Shipwright: 0.05, 'Master Gunner': 0.03, Deckhand: 0.07 },
  'Kraken Hunt': { Captain: 0.15, 'Master Gunner': 0.15, Bosun: 0.10, Shipwright: 0.12, Quartermaster: 0.08, Lookout: 0.08, Deckhand: 0.07 },
  'Fort Assault': { Captain: 0.12, 'Master Gunner': 0.15, Bosun: 0.10, Quartermaster: 0.08, Lookout: 0.05, Shipwright: 0.08, Deckhand: 0.07 },
  'Rescue Mission': { Lookout: 0.12, Quartermaster: 0.10, Shipwright: 0.08, Captain: 0.08, Bosun: 0.08, 'Master Gunner': 0.05, Deckhand: 0.10 },
};

export function calculateMissionRecommendations(
  pirates: Pirate[],
  mission: Mission
): MissionRecommendation[] {
  const eligible = pirates.filter(
    (p) => p.status !== 'Discharged' && p.hp > 0
  );

  const recommendations = eligible.map((pirate) => {
    const { score, breakdown, pros, cons } = scorePirate(pirate, mission);
    return { pirateId: pirate.id, score, breakdown, pros, cons };
  });

  recommendations.sort((a, b) => b.score - a.score);
  return recommendations;
}

function scorePirate(pirate: Pirate, mission: Mission): Omit<MissionRecommendation, 'pirateId'> {
  const requiredKeys = Object.keys(mission.requiredSkills) as SkillKey[];
  const pros: string[] = [];
  const cons: string[] = [];

  // 1. Primary skill match (40%)
  let primarySkillScore = 0;
  if (requiredKeys.length > 0) {
    let totalMatch = 0;
    for (const key of requiredKeys) {
      const required = mission.requiredSkills[key] ?? 0;
      const actual = pirate.skills[key];
      const match = Math.min(actual / required, 1.3) / 1.3; // cap at 130%
      totalMatch += match;
      if (actual >= required + 15) pros.push(`Excellent ${SKILL_LABELS[key]}`);
      else if (actual >= required) pros.push(`Adequate ${SKILL_LABELS[key]}`);
      else if (actual >= required - 15) cons.push(`Below-par ${SKILL_LABELS[key]}`);
      else cons.push(`Weak ${SKILL_LABELS[key]}`);
    }
    primarySkillScore = totalMatch / requiredKeys.length;
  }

  // 2. Secondary skill match (20%) - average of non-required skills
  const allSkillKeys: SkillKey[] = ['swordsmanship', 'cannonGunnery', 'navigation', 'rigging', 'stealth', 'medicine'];
  const secondaryKeys = allSkillKeys.filter((k) => !requiredKeys.includes(k));
  let secondarySkillScore = 0;
  if (secondaryKeys.length > 0) {
    secondarySkillScore = secondaryKeys.reduce((sum, k) => sum + pirate.skills[k], 0) / (secondaryKeys.length * 100);
  }

  // 3. Health (15%)
  const healthScore = pirate.hp / 100;
  if (pirate.hp >= 90) pros.push('Excellent Health');
  else if (pirate.hp >= 70) pros.push('Good Health');
  else if (pirate.hp < 40) cons.push('Critical Health');

  // 4. Morale (10%)
  const moraleScore = pirate.morale / 100;
  if (pirate.morale >= 80) pros.push('High Morale');
  else if (pirate.morale < 25) cons.push('Mutinous Morale');

  // 5. Experience (10%)
  const expScore = pirate.experience / 100;
  if (pirate.experience >= 80) pros.push('Veteran Experience');
  else if (pirate.experience >= 60) pros.push('Experienced');

  // 6. Role compatibility (5%)
  const roleWeights = ROLE_WEIGHTS[mission.type] ?? {};
  const roleCompat = roleWeights[pirate.role] ?? 0.05;
  const roleScore = Math.min(roleCompat / 0.15, 1); // normalize

  // Penalties
  let penaltyScore = 0;
  if (pirate.hp < 30) {
    penaltyScore += 0.15;
    cons.push('⚠ Critical HP');
  }
  if (pirate.scurvy > 60) {
    penaltyScore += 0.10;
    cons.push('☠ Severe Scurvy');
  } else if (pirate.scurvy > 40) {
    penaltyScore += 0.05;
    cons.push('Moderate Scurvy');
  }
  if (pirate.morale < 25) {
    penaltyScore += 0.15;
    cons.push('⚠ Mutinous');
  } else if (pirate.morale < 40) {
    penaltyScore += 0.08;
    cons.push('Low Morale');
  }
  if (pirate.status === 'Wounded') {
    penaltyScore += 0.05;
  }

  const rawScore =
    0.40 * primarySkillScore +
    0.20 * secondarySkillScore +
    0.15 * healthScore +
    0.10 * moraleScore +
    0.10 * expScore +
    0.05 * roleScore;

  const finalScore = Math.max(0, Math.min(1, rawScore - penaltyScore));

  return {
    score: Math.round(finalScore * 100),
    breakdown: {
      skillMatch: Math.round(primarySkillScore * 100),
      health: Math.round(healthScore * 100),
      morale: Math.round(moraleScore * 100),
      experience: Math.round(expScore * 100),
      roleCompat: Math.round(roleScore * 100),
      penalties: Math.round(penaltyScore * 100),
    },
    pros: pros.slice(0, 5),
    cons: cons.slice(0, 4),
  };
}

export function calculateMissionReadiness(
  pirates: Pirate[],
  mission: Mission,
  assignedIds: string[]
): { score: number; avgHealth: number; avgMorale: number; skillCoverage: number; factors: string[] } {
  const assigned = pirates.filter((p) => assignedIds.includes(p.id));

  if (assigned.length === 0) {
    return { score: 0, avgHealth: 0, avgMorale: 0, skillCoverage: 0, factors: ['No crew assigned'] };
  }

  const factors: string[] = [];
  const avgHealth = assigned.reduce((s, p) => s + p.hp, 0) / assigned.length;
  const avgMorale = assigned.reduce((s, p) => s + p.morale, 0) / assigned.length;
  const avgExp = assigned.reduce((s, p) => s + p.experience, 0) / assigned.length;

  // Skill coverage
  const requiredKeys = Object.keys(mission.requiredSkills) as SkillKey[];
  let coveredSkills = 0;
  for (const key of requiredKeys) {
    const required = mission.requiredSkills[key] ?? 0;
    const bestInCrew = Math.max(...assigned.map((p) => p.skills[key]));
    if (bestInCrew >= required) coveredSkills++;
  }
  const skillCoverage = requiredKeys.length > 0 ? coveredSkills / requiredKeys.length : 1;

  // Crew size factor
  const crewSizeRatio = Math.min(assigned.length / mission.requiredCrewSize, 1);
  if (assigned.length < mission.requiredCrewSize) {
    factors.push(`Undermanned: ${assigned.length}/${mission.requiredCrewSize}`);
  } else {
    factors.push(`Fully manned: ${assigned.length}/${mission.requiredCrewSize}`);
  }

  // Health factor
  if (avgHealth >= 80) factors.push('Crew health is strong');
  else if (avgHealth >= 60) factors.push('Some crew members wounded');
  else factors.push('⚠ Crew health is concerning');

  // Morale factor
  if (avgMorale >= 70) factors.push('Morale is solid');
  else if (avgMorale >= 45) factors.push('Morale is wavering');
  else factors.push('⚠ Morale is dangerously low');

  // Skill coverage factor
  if (skillCoverage >= 1) factors.push('All required skills covered');
  else if (skillCoverage >= 0.5) factors.push('Partial skill coverage');
  else factors.push('⚠ Major skill gaps');

  // Scurvy check
  const highScurvy = assigned.filter((p) => p.scurvy > 50).length;
  if (highScurvy > 0) factors.push(`⚠ ${highScurvy} crew with severe scurvy`);

  // Readiness formula
  const score = Math.round(
    0.30 * (skillCoverage * 100) +
    0.25 * (crewSizeRatio * 100) +
    0.20 * avgHealth +
    0.15 * avgMorale +
    0.10 * avgExp
  );

  return { score: Math.min(100, score), avgHealth: Math.round(avgHealth), avgMorale: Math.round(avgMorale), skillCoverage: Math.round(skillCoverage * 100), factors };
}

export function getAlerts(pirates: Pirate[]): string[] {
  const alerts: string[] = [];
  const active = pirates.filter((p) => p.status !== 'Discharged');

  const criticalHealth = active.filter((p) => p.hp < 40).length;
  if (criticalHealth > 0) alerts.push(`⚠ ${criticalHealth} crew member${criticalHealth > 1 ? 's have' : ' has'} critical health.`);

  const severeScurvy = active.filter((p) => p.scurvy > 50).length;
  if (severeScurvy > 0) alerts.push(`☠ ${severeScurvy} crew member${severeScurvy > 1 ? 's have' : ' has'} severe scurvy.`);

  const avgMorale = active.length > 0 ? active.reduce((s, p) => s + p.morale, 0) / active.length : 100;
  if (avgMorale < 50) alerts.push('⚓ Crew morale has fallen below operational level.');

  const mutinous = active.filter((p) => p.morale < 25).length;
  if (mutinous > 0) alerts.push(`🏴 ${mutinous} crew member${mutinous > 1 ? 's are' : ' is'} at mutinous morale!`);

  const wounded = active.filter((p) => p.status === 'Wounded').length;
  if (wounded > 0) alerts.push(`⚔ ${wounded} crew member${wounded > 1 ? 's are' : ' is'} wounded and recovering.`);

  return alerts;
}
