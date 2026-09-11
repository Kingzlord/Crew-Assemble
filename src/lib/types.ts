export type Role = 'Captain' | 'Quartermaster' | 'Bosun' | 'Master Gunner' | 'Lookout' | 'Shipwright' | 'Deckhand';

export type Status = 'Active' | 'Wounded' | 'On Leave' | 'Discharged';

export type Skills = {
  swordsmanship: number;
  cannonGunnery: number;
  navigation: number;
  rigging: number;
  stealth: number;
  medicine: number;
};

export type Pirate = {
  id: string;
  name: string;
  age: number;
  role: Role;
  hp: number;
  scurvy: number;
  morale: number;
  experience: number;
  skills: Skills;
  status: Status;
  bio: string;
};

export type MissionType =
  | 'Merchant Ship Raid'
  | 'Naval Boarding'
  | 'Treasure Island Expedition'
  | 'Silent Harbor Infiltration'
  | 'Kraken Hunt'
  | 'Fort Assault'
  | 'Rescue Mission';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Extreme';

export type MissionStatus = 'Planning' | 'Active' | 'Completed' | 'Failed';

export type Mission = {
  id: string;
  name: string;
  type: MissionType;
  difficulty: number;
  requiredCrewSize: number;
  requiredSkills: Partial<Skills>;
  riskLevel: RiskLevel;
  assignedCrew: string[];
  status: MissionStatus;
};

export type MissionRecommendation = {
  pirateId: string;
  score: number;
  breakdown: {
    skillMatch: number;
    health: number;
    morale: number;
    experience: number;
    roleCompat: number;
    penalties: number;
  };
  pros: string[];
  cons: string[];
};

export type SkillKey = keyof Skills;

export const SKILL_LABELS: Record<SkillKey, string> = {
  swordsmanship: 'Swordsmanship',
  cannonGunnery: 'Cannon Gunnery',
  navigation: 'Navigation',
  rigging: 'Rigging',
  stealth: 'Stealth',
  medicine: 'Medicine',
};

export const ROLE_LIST: Role[] = ['Captain', 'Quartermaster', 'Bosun', 'Master Gunner', 'Lookout', 'Shipwright', 'Deckhand'];

export const MISSION_TYPES: MissionType[] = [
  'Merchant Ship Raid',
  'Naval Boarding',
  'Treasure Island Expedition',
  'Silent Harbor Infiltration',
  'Kraken Hunt',
  'Fort Assault',
  'Rescue Mission',
];

export function getHealthStatus(hp: number): { label: string; color: string } {
  if (hp >= 90) return { label: 'Excellent', color: 'text-emerald-400' };
  if (hp >= 70) return { label: 'Good', color: 'text-teal-400' };
  if (hp >= 40) return { label: 'Wounded', color: 'text-amber-400' };
  return { label: 'Critical', color: 'text-red-400' };
}

export function getMoraleStatus(morale: number): { label: string; color: string } {
  if (morale >= 80) return { label: 'High', color: 'text-emerald-400' };
  if (morale >= 50) return { label: 'Stable', color: 'text-teal-400' };
  if (morale >= 25) return { label: 'Low', color: 'text-amber-400' };
  return { label: 'Mutinous', color: 'text-red-400' };
}

export function getScurvyStatus(scurvy: number): { label: string; color: string } {
  if (scurvy <= 20) return { label: 'Healthy', color: 'text-emerald-400' };
  if (scurvy <= 50) return { label: 'Warning', color: 'text-amber-400' };
  if (scurvy <= 75) return { label: 'Severe', color: 'text-orange-400' };
  return { label: 'Critical', color: 'text-red-400' };
}

export function getReadinessStatus(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'READY TO SAIL', color: 'text-emerald-400' };
  if (score >= 70) return { label: 'OPERATIONAL', color: 'text-teal-400' };
  if (score >= 50) return { label: 'RISKY', color: 'text-amber-400' };
  return { label: 'NOT READY', color: 'text-red-400' };
}

// ── Mission Simulation Types ──

export type SimulationStage =
  | 'approach'
  | 'recon'
  | 'boarding'
  | 'combat'
  | 'objective'
  | 'escape'
  | 'result';

export const SIMULATION_STAGES: SimulationStage[] = [
  'approach', 'recon', 'boarding', 'combat', 'objective', 'escape', 'result',
];

export const STAGE_LABELS: Record<SimulationStage, string> = {
  approach: 'Approach',
  recon: 'Reconnaissance',
  boarding: 'Boarding',
  combat: 'Combat',
  objective: 'Objective',
  escape: 'Escape',
  result: 'Result',
};

export type SimulationEvent = {
  stage: SimulationStage;
  icon: string;
  text: string;
  type: 'positive' | 'negative' | 'neutral';
};

export type MissionHistoryEntry = {
  id: string;
  missionName: string;
  missionType: MissionType;
  difficulty: number;
  riskLevel: RiskLevel;
  crewIds: string[];
  crewNames: string[];
  readinessScore: number;
  successProbability: number;
  outcome: 'success' | 'failure';
  rewards: { gold: number; xp: number; reputation: number };
  events: SimulationEvent[];
  crewChanges: { pirateId: string; name: string; hpBefore: number; hpAfter: number; moraleBefore: number; moraleAfter: number }[];
  analysis: {
    whatWentWell: string[];
    whatWentWrong: string[];
    bestPerformer: { name: string; contribution: number } | null;
    weakestFactor: string;
    mostImportantSkill: string;
  };
  timestamp: number;
};
