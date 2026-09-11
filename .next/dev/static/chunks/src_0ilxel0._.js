(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MISSION_TYPES",
    ()=>MISSION_TYPES,
    "ROLE_LIST",
    ()=>ROLE_LIST,
    "SIMULATION_STAGES",
    ()=>SIMULATION_STAGES,
    "SKILL_LABELS",
    ()=>SKILL_LABELS,
    "STAGE_LABELS",
    ()=>STAGE_LABELS,
    "getHealthStatus",
    ()=>getHealthStatus,
    "getMoraleStatus",
    ()=>getMoraleStatus,
    "getReadinessStatus",
    ()=>getReadinessStatus,
    "getScurvyStatus",
    ()=>getScurvyStatus
]);
const SKILL_LABELS = {
    swordsmanship: 'Swordsmanship',
    cannonGunnery: 'Cannon Gunnery',
    navigation: 'Navigation',
    rigging: 'Rigging',
    stealth: 'Stealth',
    medicine: 'Medicine'
};
const ROLE_LIST = [
    'Captain',
    'Quartermaster',
    'Bosun',
    'Master Gunner',
    'Lookout',
    'Shipwright',
    'Deckhand'
];
const MISSION_TYPES = [
    'Merchant Ship Raid',
    'Naval Boarding',
    'Treasure Island Expedition',
    'Silent Harbor Infiltration',
    'Kraken Hunt',
    'Fort Assault',
    'Rescue Mission'
];
function getHealthStatus(hp) {
    if (hp >= 90) return {
        label: 'Excellent',
        color: 'text-emerald-400'
    };
    if (hp >= 70) return {
        label: 'Good',
        color: 'text-teal-400'
    };
    if (hp >= 40) return {
        label: 'Wounded',
        color: 'text-amber-400'
    };
    return {
        label: 'Critical',
        color: 'text-red-400'
    };
}
function getMoraleStatus(morale) {
    if (morale >= 80) return {
        label: 'High',
        color: 'text-emerald-400'
    };
    if (morale >= 50) return {
        label: 'Stable',
        color: 'text-teal-400'
    };
    if (morale >= 25) return {
        label: 'Low',
        color: 'text-amber-400'
    };
    return {
        label: 'Mutinous',
        color: 'text-red-400'
    };
}
function getScurvyStatus(scurvy) {
    if (scurvy <= 20) return {
        label: 'Healthy',
        color: 'text-emerald-400'
    };
    if (scurvy <= 50) return {
        label: 'Warning',
        color: 'text-amber-400'
    };
    if (scurvy <= 75) return {
        label: 'Severe',
        color: 'text-orange-400'
    };
    return {
        label: 'Critical',
        color: 'text-red-400'
    };
}
function getReadinessStatus(score) {
    if (score >= 90) return {
        label: 'READY TO SAIL',
        color: 'text-emerald-400'
    };
    if (score >= 70) return {
        label: 'OPERATIONAL',
        color: 'text-teal-400'
    };
    if (score >= 50) return {
        label: 'RISKY',
        color: 'text-amber-400'
    };
    return {
        label: 'NOT READY',
        color: 'text-red-400'
    };
}
const SIMULATION_STAGES = [
    'approach',
    'recon',
    'boarding',
    'combat',
    'objective',
    'escape',
    'result'
];
const STAGE_LABELS = {
    approach: 'Approach',
    recon: 'Reconnaissance',
    boarding: 'Boarding',
    combat: 'Combat',
    objective: 'Objective',
    escape: 'Escape',
    result: 'Result'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/missionEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateMissionReadiness",
    ()=>calculateMissionReadiness,
    "calculateMissionRecommendations",
    ()=>calculateMissionRecommendations,
    "getAlerts",
    ()=>getAlerts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
;
const ROLE_WEIGHTS = {
    'Merchant Ship Raid': {
        Captain: 0.15,
        'Master Gunner': 0.12,
        Quartermaster: 0.08,
        Lookout: 0.10,
        Bosun: 0.08,
        Shipwright: 0.05,
        Deckhand: 0.05
    },
    'Naval Boarding': {
        Captain: 0.15,
        'Master Gunner': 0.10,
        Bosun: 0.12,
        Quartermaster: 0.10,
        Lookout: 0.05,
        Shipwright: 0.05,
        Deckhand: 0.08
    },
    'Treasure Island Expedition': {
        Captain: 0.10,
        Lookout: 0.12,
        Shipwright: 0.10,
        Quartermaster: 0.08,
        Bosun: 0.08,
        'Master Gunner': 0.05,
        Deckhand: 0.07
    },
    'Silent Harbor Infiltration': {
        Lookout: 0.15,
        Quartermaster: 0.10,
        Captain: 0.05,
        Bosun: 0.05,
        Shipwright: 0.05,
        'Master Gunner': 0.03,
        Deckhand: 0.07
    },
    'Kraken Hunt': {
        Captain: 0.15,
        'Master Gunner': 0.15,
        Bosun: 0.10,
        Shipwright: 0.12,
        Quartermaster: 0.08,
        Lookout: 0.08,
        Deckhand: 0.07
    },
    'Fort Assault': {
        Captain: 0.12,
        'Master Gunner': 0.15,
        Bosun: 0.10,
        Quartermaster: 0.08,
        Lookout: 0.05,
        Shipwright: 0.08,
        Deckhand: 0.07
    },
    'Rescue Mission': {
        Lookout: 0.12,
        Quartermaster: 0.10,
        Shipwright: 0.08,
        Captain: 0.08,
        Bosun: 0.08,
        'Master Gunner': 0.05,
        Deckhand: 0.10
    }
};
function calculateMissionRecommendations(pirates, mission) {
    const eligible = pirates.filter((p)=>p.status !== 'Discharged' && p.hp > 0);
    const recommendations = eligible.map((pirate)=>{
        const { score, breakdown, pros, cons } = scorePirate(pirate, mission);
        return {
            pirateId: pirate.id,
            score,
            breakdown,
            pros,
            cons
        };
    });
    recommendations.sort((a, b)=>b.score - a.score);
    return recommendations;
}
function scorePirate(pirate, mission) {
    const requiredKeys = Object.keys(mission.requiredSkills);
    const pros = [];
    const cons = [];
    // 1. Primary skill match (40%)
    let primarySkillScore = 0;
    if (requiredKeys.length > 0) {
        let totalMatch = 0;
        for (const key of requiredKeys){
            const required = mission.requiredSkills[key] ?? 0;
            const actual = pirate.skills[key];
            const match = Math.min(actual / required, 1.3) / 1.3; // cap at 130%
            totalMatch += match;
            if (actual >= required + 15) pros.push(`Excellent ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]}`);
            else if (actual >= required) pros.push(`Adequate ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]}`);
            else if (actual >= required - 15) cons.push(`Below-par ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]}`);
            else cons.push(`Weak ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]}`);
        }
        primarySkillScore = totalMatch / requiredKeys.length;
    }
    // 2. Secondary skill match (20%) - average of non-required skills
    const allSkillKeys = [
        'swordsmanship',
        'cannonGunnery',
        'navigation',
        'rigging',
        'stealth',
        'medicine'
    ];
    const secondaryKeys = allSkillKeys.filter((k)=>!requiredKeys.includes(k));
    let secondarySkillScore = 0;
    if (secondaryKeys.length > 0) {
        secondarySkillScore = secondaryKeys.reduce((sum, k)=>sum + pirate.skills[k], 0) / (secondaryKeys.length * 100);
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
    const rawScore = 0.40 * primarySkillScore + 0.20 * secondarySkillScore + 0.15 * healthScore + 0.10 * moraleScore + 0.10 * expScore + 0.05 * roleScore;
    const finalScore = Math.max(0, Math.min(1, rawScore - penaltyScore));
    return {
        score: Math.round(finalScore * 100),
        breakdown: {
            skillMatch: Math.round(primarySkillScore * 100),
            health: Math.round(healthScore * 100),
            morale: Math.round(moraleScore * 100),
            experience: Math.round(expScore * 100),
            roleCompat: Math.round(roleScore * 100),
            penalties: Math.round(penaltyScore * 100)
        },
        pros: pros.slice(0, 5),
        cons: cons.slice(0, 4)
    };
}
function calculateMissionReadiness(pirates, mission, assignedIds) {
    const assigned = pirates.filter((p)=>assignedIds.includes(p.id));
    if (assigned.length === 0) {
        return {
            score: 0,
            avgHealth: 0,
            avgMorale: 0,
            skillCoverage: 0,
            factors: [
                'No crew assigned'
            ]
        };
    }
    const factors = [];
    const avgHealth = assigned.reduce((s, p)=>s + p.hp, 0) / assigned.length;
    const avgMorale = assigned.reduce((s, p)=>s + p.morale, 0) / assigned.length;
    const avgExp = assigned.reduce((s, p)=>s + p.experience, 0) / assigned.length;
    // Skill coverage
    const requiredKeys = Object.keys(mission.requiredSkills);
    let coveredSkills = 0;
    for (const key of requiredKeys){
        const required = mission.requiredSkills[key] ?? 0;
        const bestInCrew = Math.max(...assigned.map((p)=>p.skills[key]));
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
    const highScurvy = assigned.filter((p)=>p.scurvy > 50).length;
    if (highScurvy > 0) factors.push(`⚠ ${highScurvy} crew with severe scurvy`);
    // Readiness formula
    const score = Math.round(0.30 * (skillCoverage * 100) + 0.25 * (crewSizeRatio * 100) + 0.20 * avgHealth + 0.15 * avgMorale + 0.10 * avgExp);
    return {
        score: Math.min(100, score),
        avgHealth: Math.round(avgHealth),
        avgMorale: Math.round(avgMorale),
        skillCoverage: Math.round(skillCoverage * 100),
        factors
    };
}
function getAlerts(pirates) {
    const alerts = [];
    const active = pirates.filter((p)=>p.status !== 'Discharged');
    const criticalHealth = active.filter((p)=>p.hp < 40).length;
    if (criticalHealth > 0) alerts.push(`⚠ ${criticalHealth} crew member${criticalHealth > 1 ? 's have' : ' has'} critical health.`);
    const severeScurvy = active.filter((p)=>p.scurvy > 50).length;
    if (severeScurvy > 0) alerts.push(`☠ ${severeScurvy} crew member${severeScurvy > 1 ? 's have' : ' has'} severe scurvy.`);
    const avgMorale = active.length > 0 ? active.reduce((s, p)=>s + p.morale, 0) / active.length : 100;
    if (avgMorale < 50) alerts.push('⚓ Crew morale has fallen below operational level.');
    const mutinous = active.filter((p)=>p.morale < 25).length;
    if (mutinous > 0) alerts.push(`🏴 ${mutinous} crew member${mutinous > 1 ? 's are' : ' is'} at mutinous morale!`);
    const wounded = active.filter((p)=>p.status === 'Wounded').length;
    if (wounded > 0) alerts.push(`⚔ ${wounded} crew member${wounded > 1 ? 's are' : ' is'} wounded and recovering.`);
    return alerts;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/simulationEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyCrewChanges",
    ()=>applyCrewChanges,
    "calculateMissionOutcome",
    ()=>calculateMissionOutcome,
    "generateAnalysis",
    ()=>generateAnalysis,
    "generateSimulationEvents",
    ()=>generateSimulationEvents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/missionEngine.ts [app-client] (ecmascript)");
;
;
// ── Contextual event generation based on crew skills ──
const STAGE_EVENTS = {
    approach: [
        {
            positive: (p)=>p.skills.navigation >= 70 ? `🧭 ${p.name} charts a swift approach, avoiding patrols.` : null,
            negative: ()=>null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.scurvy > 50 ? `☠️ ${p.name}'s scurvy slows the approach.` : null
        }
    ],
    recon: [
        {
            positive: (p)=>p.skills.stealth >= 75 ? `🕵️ ${p.name} scouts ahead undetected, revealing enemy positions.` : null,
            negative: ()=>null
        },
        {
            positive: (p)=>p.role === 'Lookout' ? `🔭 ${p.name} spots a weakness in their defenses.` : null,
            negative: ()=>null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.morale < 40 ? `😟 ${p.name} hesitates, nearly giving away the position.` : null
        }
    ],
    boarding: [
        {
            positive: (p)=>p.skills.rigging >= 70 ? `🪢 ${p.name} swings across with expert precision.` : null,
            negative: ()=>null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.hp < 50 ? `❤️ ${p.name} struggles to board — injuries slow them down.` : null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.scurvy > 60 ? `☠️ ${p.name} collapses briefly — scurvy takes its toll.` : null
        }
    ],
    combat: [
        {
            positive: (p)=>p.skills.swordsmanship >= 75 ? `⚔️ ${p.name} cuts through the enemy line with devastating skill.` : null,
            negative: ()=>null
        },
        {
            positive: (p)=>p.skills.cannonGunnery >= 75 ? `💣 ${p.name} disables the enemy's defensive cannon.` : null,
            negative: ()=>null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.morale < 35 ? `😟 ${p.name} freezes in combat — low morale saps their courage.` : null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.hp < 40 ? `❤️ ${p.name} takes a serious hit and falls back.` : null
        }
    ],
    objective: [
        {
            positive: (p)=>p.skills.navigation >= 60 ? `🗺️ ${p.name} locates the objective quickly.` : null,
            negative: ()=>null
        },
        {
            positive: (p)=>p.role === 'Quartermaster' ? `💰 ${p.name} secures the plunder efficiently.` : null,
            negative: ()=>null
        },
        {
            positive: ()=>null,
            negative: ()=>null
        }
    ],
    escape: [
        {
            positive: (p)=>p.skills.stealth >= 60 ? `🌫️ ${p.name} covers the retreat with a smoke diversion.` : null,
            negative: ()=>null
        },
        {
            positive: (p)=>p.skills.navigation >= 70 ? `🧭 ${p.name} navigates the escape route flawlessly.` : null,
            negative: ()=>null
        },
        {
            positive: ()=>null,
            negative: (p)=>p.scurvy > 50 ? `☠️ ${p.name} slows the retreat — scurvy saps their strength.` : null
        }
    ],
    result: []
};
function generateSimulationEvents(crew, mission, success) {
    const events = [];
    for (const stage of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"]){
        if (stage === 'result') {
            events.push({
                stage,
                icon: success ? '🏴‍☠️' : '☠️',
                text: success ? 'The objective is secured! The crew returns victorious!' : 'The crew is forced to retreat. The mission has failed.',
                type: success ? 'positive' : 'negative'
            });
            continue;
        }
        const stageEventDefs = STAGE_EVENTS[stage];
        let stageHasEvent = false;
        // Generate positive events from skilled crew
        for (const def of stageEventDefs){
            for (const p of crew){
                const posText = def.positive(p);
                if (posText && Math.random() < 0.5) {
                    events.push({
                        stage,
                        icon: posText.slice(0, posText.indexOf(' ')),
                        text: posText,
                        type: 'positive'
                    });
                    stageHasEvent = true;
                    break;
                }
            }
            if (stageHasEvent) break;
        }
        // Generate negative events from weak crew
        for (const def of stageEventDefs){
            for (const p of crew){
                const negText = def.negative(p);
                if (negText && Math.random() < 0.4) {
                    events.push({
                        stage,
                        icon: negText.slice(0, negText.indexOf(' ')),
                        text: negText,
                        type: 'negative'
                    });
                    stageHasEvent = true;
                    break;
                }
            }
            if (stageHasEvent) break;
        }
        // If no event was generated, add a neutral one
        if (!stageHasEvent) {
            const neutralTexts = {
                approach: 'The ship closes in on the target...',
                recon: 'The crew surveys the situation...',
                boarding: 'The boarding party prepares to strike...',
                combat: 'Clashing steel echoes across the deck...',
                objective: 'The crew pushes toward the objective...',
                escape: 'The crew makes their getaway...',
                result: ''
            };
            if (neutralTexts[stage]) {
                events.push({
                    stage,
                    icon: '⚓',
                    text: neutralTexts[stage],
                    type: 'neutral'
                });
            }
        }
    }
    return events;
}
function calculateMissionOutcome(pirates, mission, assignedIds) {
    const crew = pirates.filter((p)=>assignedIds.includes(p.id));
    if (crew.length === 0) return {
        success: false,
        probability: 0,
        rewards: {
            gold: 0,
            xp: 0,
            reputation: 0
        }
    };
    const readiness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionReadiness"])(pirates, mission, assignedIds);
    const avgHealth = crew.reduce((s, p)=>s + p.hp, 0) / crew.length;
    const avgMorale = crew.reduce((s, p)=>s + p.morale, 0) / crew.length;
    const avgExp = crew.reduce((s, p)=>s + p.experience, 0) / crew.length;
    const avgScurvy = crew.reduce((s, p)=>s + p.scurvy, 0) / crew.length;
    // Skill advantage
    const requiredKeys = Object.keys(mission.requiredSkills);
    let skillAdvantage = 0;
    if (requiredKeys.length > 0) {
        for (const key of requiredKeys){
            const required = mission.requiredSkills[key] ?? 0;
            const best = Math.max(...crew.map((p)=>p.skills[key]));
            skillAdvantage += Math.min((best - required) / 100, 0.3);
        }
        skillAdvantage /= requiredKeys.length;
    }
    // Base probability from readiness
    let probability = readiness.score / 100;
    // Adjustments
    probability += skillAdvantage * 0.15;
    probability += (avgHealth - 50) / 200; // ±0.25
    probability += (avgMorale - 50) / 250; // ±0.2
    probability += (avgExp - 50) / 400; // ±0.125
    probability -= avgScurvy / 300; // -0 to -0.33
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
    const rewards = success ? {
        gold: Math.round((300 + Math.random() * 500) * diffMult),
        xp: Math.round((80 + Math.random() * 200) * diffMult),
        reputation: Math.round((5 + Math.random() * 15) * diffMult)
    } : {
        gold: Math.round(50 + Math.random() * 100),
        xp: Math.round(20 + Math.random() * 40),
        reputation: -Math.round(3 + Math.random() * 8)
    };
    return {
        success,
        probability: Math.round(probability * 100),
        rewards
    };
}
function applyCrewChanges(crew, success, mission) {
    const changes = [];
    const updated = crew.map((p)=>{
        const hpDelta = success ? Math.round(-(Math.random() * 15 + 5) * (mission.difficulty / 3)) : Math.round(-(Math.random() * 25 + 10) * (mission.difficulty / 3));
        const moraleDelta = success ? Math.round(Math.random() * 12 + 3) : Math.round(-(Math.random() * 15 + 5));
        const newHp = Math.max(5, Math.min(100, p.hp + hpDelta));
        const newMorale = Math.max(0, Math.min(100, p.morale + moraleDelta));
        changes.push({
            pirateId: p.id,
            name: p.name,
            hpBefore: p.hp,
            hpAfter: newHp,
            moraleBefore: p.morale,
            moraleAfter: newMorale
        });
        return {
            ...p,
            hp: newHp,
            morale: newMorale,
            status: newHp < 40 ? 'Wounded' : p.status
        };
    });
    return {
        updated,
        changes
    };
}
function generateAnalysis(crew, mission, success, readinessScore, events) {
    const whatWentWell = [];
    const whatWentWrong = [];
    const posEvents = events.filter((e)=>e.type === 'positive');
    const negEvents = events.filter((e)=>e.type === 'negative');
    if (posEvents.length > negEvents.length) whatWentWell.push('More positive events than negative');
    else if (negEvents.length > posEvents.length) whatWentWrong.push('Crew faced more setbacks than advantages');
    const avgHealth = crew.reduce((s, p)=>s + p.hp, 0) / crew.length;
    if (avgHealth >= 80) whatWentWell.push('Crew entered with strong health');
    else if (avgHealth < 60) whatWentWrong.push('Crew health was below par');
    const avgMorale = crew.reduce((s, p)=>s + p.morale, 0) / crew.length;
    if (avgMorale >= 70) whatWentWell.push('High crew morale');
    else if (avgMorale < 45) whatWentWrong.push('Morale was dangerously low');
    const requiredKeys = Object.keys(mission.requiredSkills);
    for (const key of requiredKeys){
        const required = mission.requiredSkills[key] ?? 0;
        const best = Math.max(...crew.map((p)=>p.skills[key]));
        if (best >= required + 15) whatWentWell.push(`Excellent ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]} coverage`);
        else if (best < required) whatWentWrong.push(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]} below requirement`);
    }
    const lowHp = crew.filter((p)=>p.hp < 50).length;
    if (lowHp > 0) whatWentWrong.push(`${lowHp} crew entered with low HP`);
    const highScurvy = crew.filter((p)=>p.scurvy > 50).length;
    if (highScurvy > 0) whatWentWrong.push(`${highScurvy} crew with severe scurvy`);
    if (success) whatWentWell.push('Mission objective achieved');
    else whatWentWrong.push('Mission objective failed');
    // Best performer
    const contributions = crew.map((p)=>{
        let score = 0;
        for (const key of requiredKeys){
            score += p.skills[key] / Math.max(mission.requiredSkills[key] ?? 1, 1);
        }
        score += p.hp / 100 + p.morale / 100 + p.experience / 100;
        return {
            name: p.name,
            contribution: Math.round(score)
        };
    }).sort((a, b)=>b.contribution - a.contribution);
    const bestPerformer = contributions[0] ?? null;
    // Weakest factor
    let weakestFactor = 'Unknown';
    if (avgHealth < 60) weakestFactor = 'Crew Health';
    else if (avgMorale < 45) weakestFactor = 'Crew Morale';
    else if (highScurvy > 0) weakestFactor = 'Scurvy';
    else {
        for (const key of requiredKeys){
            const required = mission.requiredSkills[key] ?? 0;
            const best = Math.max(...crew.map((p)=>p.skills[key]));
            if (best < required) {
                weakestFactor = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key];
                break;
            }
        }
    }
    // Most important skill
    const mostImportantSkill = requiredKeys.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][requiredKeys.reduce((best, key)=>{
        const reqB = mission.requiredSkills[best] ?? 0;
        const reqK = mission.requiredSkills[key] ?? 0;
        return reqK > reqB ? key : best;
    }, requiredKeys[0])] : 'General Combat';
    if (whatWentWell.length === 0) whatWentWell.push('Crew deployed successfully');
    if (whatWentWrong.length === 0) whatWentWrong.push('No significant issues');
    return {
        whatWentWell: whatWentWell.slice(0, 5),
        whatWentWrong: whatWentWrong.slice(0, 5),
        bestPerformer,
        weakestFactor,
        mostImportantSkill
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MissionSimulation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MissionSimulation",
    ()=>MissionSimulation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/missionEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/simulationEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.mjs [app-client] (ecmascript) <export default as BarChart3>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function MissionSimulation({ mission, crew, allPirates, onComplete, onClose }) {
    _s();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('launch');
    const [currentStageIdx, setCurrentStageIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visibleEvents, setVisibleEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [outcome, setOutcome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [historyEntry, setHistoryEntry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAnalysis, setShowAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const eventLogRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const readiness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionReadiness"])(allPirates, mission, crew.map((p)=>p.id));
    // Start simulation after brief launch screen
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionSimulation.useEffect": ()=>{
            if (phase === 'launch') {
                const timer = setTimeout({
                    "MissionSimulation.useEffect.timer": ()=>{
                        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionOutcome"])(allPirates, mission, crew.map({
                            "MissionSimulation.useEffect.timer.result": (p)=>p.id
                        }["MissionSimulation.useEffect.timer.result"]));
                        setOutcome(result);
                        const simEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSimulationEvents"])(crew, mission, result.success);
                        setEvents(simEvents);
                        setPhase('running');
                        setCurrentStageIdx(0);
                    }
                }["MissionSimulation.useEffect.timer"], 2000);
                return ({
                    "MissionSimulation.useEffect": ()=>clearTimeout(timer)
                })["MissionSimulation.useEffect"];
            }
        }
    }["MissionSimulation.useEffect"], [
        phase,
        allPirates,
        mission,
        crew
    ]);
    // Progress through stages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionSimulation.useEffect": ()=>{
            if (phase !== 'running') return;
            if (currentStageIdx >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"].length) {
                // Simulation complete — compute results
                if (outcome) {
                    const { updated, changes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyCrewChanges"])(crew, outcome.success, mission);
                    const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAnalysis"])(crew, mission, outcome.success, readiness.score, events);
                    const entry = {
                        id: `mh_${Date.now()}`,
                        missionName: mission.name,
                        missionType: mission.type,
                        difficulty: mission.difficulty,
                        riskLevel: mission.riskLevel,
                        crewIds: crew.map({
                            "MissionSimulation.useEffect": (p)=>p.id
                        }["MissionSimulation.useEffect"]),
                        crewNames: crew.map({
                            "MissionSimulation.useEffect": (p)=>p.name
                        }["MissionSimulation.useEffect"]),
                        readinessScore: readiness.score,
                        successProbability: outcome.probability,
                        outcome: outcome.success ? 'success' : 'failure',
                        rewards: outcome.rewards,
                        events,
                        crewChanges: changes,
                        analysis,
                        timestamp: Date.now()
                    };
                    setHistoryEntry(entry);
                    setPhase('result');
                }
                return;
            }
            // Show events for current stage
            const stageEvents = events.filter({
                "MissionSimulation.useEffect.stageEvents": (e)=>e.stage === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"][currentStageIdx]
            }["MissionSimulation.useEffect.stageEvents"]);
            const revealDelay = 400;
            let timeout;
            if (stageEvents.length > 0) {
                // Reveal events one by one
                stageEvents.forEach({
                    "MissionSimulation.useEffect": (evt, i)=>{
                        setTimeout({
                            "MissionSimulation.useEffect": ()=>{
                                setVisibleEvents({
                                    "MissionSimulation.useEffect": (prev)=>[
                                            ...prev,
                                            evt
                                        ]
                                }["MissionSimulation.useEffect"]);
                            }
                        }["MissionSimulation.useEffect"], revealDelay * (i + 1));
                    }
                }["MissionSimulation.useEffect"]);
                // Move to next stage after all events shown
                timeout = setTimeout({
                    "MissionSimulation.useEffect": ()=>{
                        setCurrentStageIdx({
                            "MissionSimulation.useEffect": (idx)=>idx + 1
                        }["MissionSimulation.useEffect"]);
                    }
                }["MissionSimulation.useEffect"], revealDelay * (stageEvents.length + 1) + 800);
            } else {
                timeout = setTimeout({
                    "MissionSimulation.useEffect": ()=>{
                        setCurrentStageIdx({
                            "MissionSimulation.useEffect": (idx)=>idx + 1
                        }["MissionSimulation.useEffect"]);
                    }
                }["MissionSimulation.useEffect"], 600);
            }
            return ({
                "MissionSimulation.useEffect": ()=>clearTimeout(timeout)
            })["MissionSimulation.useEffect"];
        }
    }["MissionSimulation.useEffect"], [
        phase,
        currentStageIdx,
        events,
        outcome,
        crew,
        mission,
        readiness.score
    ]);
    // Auto-scroll event log
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionSimulation.useEffect": ()=>{
            if (eventLogRef.current) {
                eventLogRef.current.scrollTop = eventLogRef.current.scrollHeight;
            }
        }
    }["MissionSimulation.useEffect"], [
        visibleEvents
    ]);
    const handleComplete = ()=>{
        if (historyEntry && outcome) {
            const { updated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$simulationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyCrewChanges"])(crew, outcome.success, mission);
            onComplete(historyEntry, updated);
        }
    };
    const DIFFICULTY_STARS = (d)=>'★'.repeat(d) + '☆'.repeat(5 - d);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4",
        onClick: (e)=>e.stopPropagation(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parchment-panel-highlight p-6 w-full max-w-3xl max-h-[90vh] overflow-auto",
            children: [
                phase === 'launch' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-5xl mb-4 float-anim",
                            children: "🏴‍☠️"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-brass-400 nautical-text mb-2",
                            children: "MISSION LAUNCHED"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-parchment-200/70 mb-4",
                            children: mission.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-parchment-200/40 italic",
                            children: "Your ship approaches the target..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 border-2 border-brass-400/30 border-t-brass-400 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MissionSimulation.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this),
                phase === 'running' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-bold text-brass-400 nautical-text",
                                    children: [
                                        "⚔️ ",
                                        mission.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-parchment-200/30",
                                    children: DIFFICULTY_STARS(mission.difficulty)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 144,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 mb-4",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"].map((stage, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `h-2 rounded-full transition-all duration-500 ${idx < currentStageIdx ? 'bg-emerald-500' : idx === currentStageIdx ? 'bg-brass-400 pulse-glow' : 'bg-navy-700/50'}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-[9px] mt-1 text-center ${idx <= currentStageIdx ? 'text-parchment-200/60' : 'text-parchment-200/20'}`,
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGE_LABELS"][stage]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 158,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, stage, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 152,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this),
                        currentStageIdx < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"].length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4 py-2 rounded-lg bg-navy-800/50 border border-brass-400/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-brass-400/60 uppercase tracking-wider",
                                    children: [
                                        "Stage ",
                                        currentStageIdx + 1,
                                        " of ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"].length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 170,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-brass-400",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGE_LABELS"][__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIMULATION_STAGES"][currentStageIdx]]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 171,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 169,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: eventLogRef,
                            className: "space-y-2 max-h-64 overflow-auto p-3 rounded-lg bg-navy-900/50 border border-navy-700/30",
                            children: [
                                visibleEvents.map((evt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-start gap-2 p-2 rounded text-sm animate-in fade-in ${evt.type === 'positive' ? 'bg-emerald-900/20 text-emerald-300 border-l-2 border-emerald-500' : evt.type === 'negative' ? 'bg-red-900/20 text-red-300 border-l-2 border-red-500' : 'bg-navy-800/30 text-parchment-200/60 border-l-2 border-navy-600'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0",
                                                children: evt.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 183,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: evt.text
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this)),
                                visibleEvents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-center text-parchment-200/30 text-sm italic",
                                    children: "Awaiting reports..."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 188,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex gap-2 flex-wrap",
                            children: crew.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 px-2 py-1 rounded bg-navy-800/30 border border-navy-700/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-5 h-5 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 text-[9px] font-bold border border-brass-400/20",
                                            children: p.name.charAt(0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 196,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-parchment-200/60",
                                            children: p.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 195,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MissionSimulation.tsx",
                    lineNumber: 143,
                    columnNumber: 11
                }, this),
                phase === 'result' && outcome && historyEntry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: outcome.success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl mb-2",
                                        children: "🏴‍☠️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 212,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-emerald-400 nautical-text",
                                        children: "MISSION COMPLETE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 213,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-parchment-200/70 mt-1",
                                        children: "The objective has been secured!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 214,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl mb-2",
                                        children: "☠️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 218,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-red-400 nautical-text",
                                        children: "MISSION FAILED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 219,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg text-parchment-200/70 mt-1",
                                        children: "The boarding party was forced to retreat."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 220,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-4 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-3 rounded-lg bg-navy-900/50 border border-navy-700/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-parchment-200/30",
                                            children: "Success Probability"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl font-bold text-brass-400 nautical-text",
                                            children: [
                                                outcome.probability,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-3 rounded-lg bg-navy-900/50 border border-navy-700/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-parchment-200/30",
                                            children: "Mission Readiness"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-xl font-bold ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReadinessStatus"])(readiness.score).color} nautical-text`,
                                            children: readiness.score
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-3 rounded-lg bg-navy-900/50 border border-navy-700/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-parchment-200/30",
                                            children: "Outcome"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-xl font-bold ${outcome.success ? 'text-emerald-400' : 'text-red-400'} nautical-text`,
                                            children: outcome.success ? 'VICTORY' : 'DEFEAT'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-navy-900/50 border border-brass-400/20 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-brass-400 mb-2",
                                    children: "Rewards"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: [
                                                "💰 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: outcome.rewards.gold > 0 ? 'text-brass-400' : 'text-parchment-200/40',
                                                    children: [
                                                        outcome.rewards.gold,
                                                        " Gold"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: [
                                                "🏆 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-emerald-400",
                                                    children: [
                                                        "+",
                                                        outcome.rewards.xp,
                                                        " XP"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: [
                                                "📜 ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: outcome.rewards.reputation >= 0 ? 'text-ocean-300' : 'text-red-400',
                                                    children: [
                                                        "Reputation ",
                                                        outcome.rewards.reputation >= 0 ? '+' : '',
                                                        outcome.rewards.reputation
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 246,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-navy-900/50 border border-navy-700/20 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-brass-400 mb-2",
                                    children: "Crew Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: historyEntry.crewChanges.map((cc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-parchment-100 w-28 truncate",
                                                    children: cc.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-parchment-200/50",
                                                    children: [
                                                        "❤️ ",
                                                        cc.hpBefore,
                                                        " → ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: cc.hpAfter < cc.hpBefore ? 'text-red-400' : 'text-emerald-400',
                                                            children: cc.hpAfter
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 42
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-parchment-200/50",
                                                    children: [
                                                        "😈 ",
                                                        cc.moraleBefore,
                                                        " → ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: cc.moraleAfter > cc.moraleBefore ? 'text-emerald-400' : 'text-red-400',
                                                            children: cc.moraleAfter
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 46
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, cc.pirateId, true, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 258,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 rounded-lg bg-navy-900/50 border border-navy-700/20 mb-4 max-h-40 overflow-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-brass-400 mb-2",
                                    children: "Mission Events"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: events.map((evt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-xs ${evt.type === 'positive' ? 'text-emerald-400/70' : evt.type === 'negative' ? 'text-red-400/70' : 'text-parchment-200/40'}`,
                                            children: [
                                                evt.icon,
                                                " ",
                                                evt.text
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 276,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAnalysis(true),
                                    className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MissionSimulation.tsx",
                                            lineNumber: 288,
                                            columnNumber: 17
                                        }, this),
                                        " Tactical Analysis"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 284,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleComplete,
                                    className: "px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 border border-navy-700/30 hover:border-brass-400/20 transition text-sm",
                                    children: "Return to Missions"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MissionSimulation.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MissionSimulation.tsx",
                    lineNumber: 208,
                    columnNumber: 11
                }, this),
                showAnalysis && historyEntry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4",
                    onClick: ()=>setShowAnalysis(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "parchment-panel-highlight p-6 w-full max-w-2xl max-h-[80vh] overflow-auto",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-brass-400 nautical-text mb-4",
                                children: "📊 TACTICAL ANALYSIS"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                lineNumber: 304,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-emerald-400 mb-2",
                                                children: "✓ What Went Well"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this),
                                            historyEntry.analysis.whatWentWell.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-parchment-200/60 ml-2 mb-1",
                                                    children: [
                                                        "• ",
                                                        w
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 307,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-red-400 mb-2",
                                                children: "⚠ What Went Wrong"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 315,
                                                columnNumber: 19
                                            }, this),
                                            historyEntry.analysis.whatWentWrong.map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-parchment-200/60 ml-2 mb-1",
                                                    children: [
                                                        "• ",
                                                        w
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/MissionSimulation.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 314,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "brass-divider"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 321,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Best Performer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-brass-400",
                                                        children: historyEntry.analysis.bestPerformer?.name ?? 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[10px] text-parchment-200/30",
                                                        children: [
                                                            "Contribution: ",
                                                            historyEntry.analysis.bestPerformer?.contribution ?? 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Weakest Factor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-amber-400",
                                                        children: historyEntry.analysis.weakestFactor
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Most Important Skill"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-ocean-300",
                                                        children: historyEntry.analysis.mostImportantSkill
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "brass-divider"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Readiness Before Launch"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold text-parchment-100",
                                                        children: [
                                                            historyEntry.readinessScore,
                                                            "/100"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Outcome"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `text-sm font-semibold ${historyEntry.outcome === 'success' ? 'text-emerald-400' : 'text-red-400'}`,
                                                        children: historyEntry.outcome === 'success' ? 'Victory' : 'Defeat'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                                lineNumber: 346,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionSimulation.tsx",
                                        lineNumber: 341,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                lineNumber: 306,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowAnalysis(false),
                                className: "mt-6 px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 transition text-sm",
                                children: "Close Analysis"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MissionSimulation.tsx",
                                lineNumber: 355,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MissionSimulation.tsx",
                        lineNumber: 303,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/MissionSimulation.tsx",
                    lineNumber: 302,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/MissionSimulation.tsx",
            lineNumber: 126,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MissionSimulation.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(MissionSimulation, "WkWdrHNaOdqDLqEtXrOsCouk5S4=");
_c = MissionSimulation;
var _c;
__turbopack_context__.k.register(_c, "MissionSimulation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MissionHistory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MissionHistory",
    ()=>MissionHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.mjs [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skull.mjs [app-client] (ecmascript) <export default as Skull>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.mjs [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function MissionHistory({ history }) {
    _s();
    const [expandedId, setExpandedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    if (history.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parchment-panel p-5 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-parchment-200/40",
                children: "No missions completed yet. Plan and launch your first mission!"
            }, void 0, false, {
                fileName: "[project]/src/components/MissionHistory.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MissionHistory.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: history.map((entry)=>{
            const isExpanded = expandedId === entry.id;
            const date = new Date(entry.timestamp);
            const dateStr = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            const timeStr = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "parchment-panel p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 cursor-pointer",
                        onClick: ()=>setExpandedId(isExpanded ? null : entry.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-8 h-8 rounded-full flex items-center justify-center text-sm ${entry.outcome === 'success' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`,
                                children: entry.outcome === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionHistory.tsx",
                                    lineNumber: 36,
                                    columnNumber: 48
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__["Skull"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MissionHistory.tsx",
                                    lineNumber: 36,
                                    columnNumber: 81
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-parchment-100 truncate",
                                        children: entry.missionName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30",
                                        children: [
                                            entry.missionType,
                                            " • ",
                                            dateStr,
                                            " ",
                                            timeStr
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-xs font-semibold ${entry.outcome === 'success' ? 'text-emerald-400' : 'text-red-400'}`,
                                        children: entry.outcome === 'success' ? 'VICTORY' : 'DEFEAT'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30",
                                        children: [
                                            "Readiness: ",
                                            entry.readinessScore
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this),
                            isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                className: "w-4 h-4 text-parchment-200/30"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 48,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "w-4 h-4 text-parchment-200/30"
                            }, void 0, false, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 48,
                                columnNumber: 87
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MissionHistory.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this),
                    isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 space-y-3 border-t border-navy-700/30 pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-parchment-200/30",
                                                children: "Difficulty"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 56,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-parchment-200/70",
                                                children: [
                                                    '★'.repeat(entry.difficulty),
                                                    '☆'.repeat(5 - entry.difficulty)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 57,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 55,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-parchment-200/30",
                                                children: "Success Prob."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 60,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-brass-400",
                                                children: [
                                                    entry.successProbability,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 61,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 59,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-parchment-200/30",
                                                children: "Risk Level"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 64,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-parchment-200/70",
                                                children: entry.riskLevel
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 65,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 63,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 54,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30 mb-1",
                                        children: "Crew"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 71,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1 flex-wrap",
                                        children: entry.crewNames.map((name, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] px-1.5 py-0.5 rounded bg-navy-700/30 text-parchment-200/50 border border-navy-700/20",
                                                children: name
                                            }, i, false, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 74,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 70,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30 mb-1",
                                        children: "Rewards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 81,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "💰 ",
                                                    entry.rewards.gold,
                                                    " Gold"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 83,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "🏆 +",
                                                    entry.rewards.xp,
                                                    " XP"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 84,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "📜 Rep ",
                                                    entry.rewards.reputation >= 0 ? '+' : '',
                                                    entry.rewards.reputation
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 85,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 82,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 80,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30 mb-1",
                                        children: "Crew Status Changes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 91,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: entry.crewChanges.map((cc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-parchment-200/60 w-20 truncate",
                                                        children: cc.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-parchment-200/40",
                                                        children: [
                                                            "HP ",
                                                            cc.hpBefore,
                                                            "→",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: cc.hpAfter < cc.hpBefore ? 'text-red-400' : 'text-emerald-400',
                                                                children: cc.hpAfter
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 44
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-parchment-200/40",
                                                        children: [
                                                            "MRL ",
                                                            cc.moraleBefore,
                                                            "→",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: cc.moraleAfter > cc.moraleBefore ? 'text-emerald-400' : 'text-red-400',
                                                                children: cc.moraleAfter
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, cc.pirateId, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 94,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 92,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 90,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30 mb-1",
                                        children: "Tactical Analysis"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 109,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] space-y-0.5",
                                        children: [
                                            entry.analysis.whatWentWell.slice(0, 2).map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-emerald-400/60",
                                                    children: [
                                                        "✓ ",
                                                        w
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/MissionHistory.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 23
                                                }, this)),
                                            entry.analysis.whatWentWrong.slice(0, 2).map((w, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-400/60",
                                                    children: [
                                                        "⚠ ",
                                                        w
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/components/MissionHistory.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 23
                                                }, this)),
                                            entry.analysis.bestPerformer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-brass-400/60",
                                                children: [
                                                    "Best: ",
                                                    entry.analysis.bestPerformer.name,
                                                    " (",
                                                    entry.analysis.bestPerformer.contribution,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 118,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 110,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 108,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30 mb-1",
                                        children: "Events"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 125,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-24 overflow-auto space-y-0.5",
                                        children: entry.events.map((evt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-[10px] ${evt.type === 'positive' ? 'text-emerald-400/50' : evt.type === 'negative' ? 'text-red-400/50' : 'text-parchment-200/30'}`,
                                                children: [
                                                    evt.icon,
                                                    " ",
                                                    evt.text
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/MissionHistory.tsx",
                                                lineNumber: 128,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MissionHistory.tsx",
                                        lineNumber: 126,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MissionHistory.tsx",
                                lineNumber: 124,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MissionHistory.tsx",
                        lineNumber: 52,
                        columnNumber: 15
                    }, this)
                ]
            }, entry.id, true, {
                fileName: "[project]/src/components/MissionHistory.tsx",
                lineNumber: 28,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/MissionHistory.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(MissionHistory, "qpIQi94hcn+lxkJWgZG2jWze6qI=");
_c = MissionHistory;
var _c;
__turbopack_context__.k.register(_c, "MissionHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/missions/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MissionsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/missionEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.mjs [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/swords.mjs [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MissionSimulation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MissionSimulation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MissionHistory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MissionHistory.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const DIFFICULTY_STARS = (d)=>'★'.repeat(d) + '☆'.repeat(5 - d);
_c = DIFFICULTY_STARS;
const RISK_COLORS = {
    Low: 'text-emerald-400',
    Medium: 'text-amber-400',
    High: 'text-orange-400',
    Extreme: 'text-red-400'
};
function MissionsPage() {
    _s();
    const { pirates, missions, addMission, updateMission, removeMission, assignCrewToMission, addMissionHistory, updatePirates, missionHistory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])();
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(missions[0]?.id ?? null);
    const [showNewMission, setShowNewMission] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [simulating, setSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('planning');
    const selectedMission = missions.find((m)=>m.id === selectedId) ?? null;
    const recommendations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MissionsPage.useMemo[recommendations]": ()=>{
            if (!selectedMission) return [];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionRecommendations"])(pirates, selectedMission);
        }
    }["MissionsPage.useMemo[recommendations]"], [
        selectedMission,
        pirates
    ]);
    const readiness = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MissionsPage.useMemo[readiness]": ()=>{
            if (!selectedMission) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$missionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateMissionReadiness"])(pirates, selectedMission, selectedMission.assignedCrew);
        }
    }["MissionsPage.useMemo[readiness]"], [
        selectedMission,
        pirates
    ]);
    const activePirates = pirates.filter((p)=>p.status !== 'Discharged');
    const toggleCrew = (pirateId)=>{
        if (!selectedMission) return;
        const current = selectedMission.assignedCrew;
        const next = current.includes(pirateId) ? current.filter((id)=>id !== pirateId) : [
            ...current,
            pirateId
        ];
        assignCrewToMission(selectedMission.id, next);
    };
    const autoAssign = ()=>{
        if (!selectedMission) return;
        const topIds = recommendations.slice(0, selectedMission.requiredCrewSize).map((r)=>r.pirateId);
        assignCrewToMission(selectedMission.id, topIds);
    };
    const clearCrew = ()=>{
        if (!selectedMission) return;
        assignCrewToMission(selectedMission.id, []);
    };
    // Mission launch requirements
    const canStartMission = selectedMission && selectedMission.assignedCrew.length >= selectedMission.requiredCrewSize && readiness && readiness.score >= 30;
    const launchBlockers = [];
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
    const handleSimulationComplete = (historyEntry, updatedPirates)=>{
        addMissionHistory(historyEntry);
        // Apply crew stat changes globally
        const newPirates = pirates.map((p)=>{
            const updated = updatedPirates.find((up)=>up.id === p.id);
            return updated ?? p;
        });
        updatePirates(newPirates);
        // Update mission status
        if (selectedMission) {
            updateMission({
                ...selectedMission,
                status: historyEntry.outcome === 'success' ? 'Completed' : 'Failed'
            });
        }
        setSimulating(false);
        setActiveTab('history');
    };
    const simCrew = selectedMission ? pirates.filter((p)=>selectedMission.assignedCrew.includes(p.id)) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 lg:p-6 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                                className: "w-7 h-7 text-brass-400"
                            }, void 0, false, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold text-brass-400 nautical-text tracking-wide",
                                        children: "Mission Planning"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-parchment-200/50",
                                        children: [
                                            missions.length,
                                            " missions available"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowNewMission(true),
                            className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                " New Mission"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('planning'),
                        className: `px-4 py-2 rounded-lg border text-sm transition ${activeTab === 'planning' ? 'bg-brass-400/20 text-brass-400 border-brass-400/30 font-medium' : 'text-parchment-200/50 border-navy-700/30 hover:border-brass-400/20'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"], {
                                className: "w-4 h-4 inline mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            " Planning"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('history'),
                        className: `px-4 py-2 rounded-lg border text-sm transition ${activeTab === 'history' ? 'bg-brass-400/20 text-brass-400 border-brass-400/30 font-medium' : 'text-parchment-200/50 border-navy-700/30 hover:border-brass-400/20'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: "w-4 h-4 inline mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            " History (",
                            missionHistory.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            activeTab === 'history' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MissionHistory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MissionHistory"], {
                history: missionHistory
            }, void 0, false, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this),
            activeTab === 'planning' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 flex-col lg:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-72 shrink-0 space-y-2",
                        children: missions.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedId(m.id),
                                className: `w-full text-left p-3 rounded-lg border transition card-hover
                  ${m.id === selectedId ? 'parchment-panel-highlight border-brass-400/30' : 'parchment-panel border-navy-700/30 hover:border-brass-400/20'}
                `,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-parchment-100 truncate",
                                        children: m.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[10px] ${RISK_COLORS[m.riskLevel]}`,
                                                children: m.riskLevel
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-parchment-200/30",
                                                children: DIFFICULTY_STARS(m.difficulty)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-parchment-200/30 mt-1",
                                        children: [
                                            m.assignedCrew.length,
                                            "/",
                                            m.requiredCrewSize,
                                            " crew • ",
                                            m.status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, m.id, true, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    selectedMission ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "parchment-panel-highlight p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-lg font-bold text-brass-400 nautical-text",
                                                        children: selectedMission.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-parchment-200/60",
                                                        children: selectedMission.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-sm font-semibold ${RISK_COLORS[selectedMission.riskLevel]}`,
                                                children: [
                                                    selectedMission.riskLevel,
                                                    " Risk"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Difficulty"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-brass-400 font-mono",
                                                        children: DIFFICULTY_STARS(selectedMission.difficulty)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Required Crew"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-parchment-100 font-semibold",
                                                        children: selectedMission.requiredCrewSize
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 188,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Assigned"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-parchment-100 font-semibold",
                                                        children: [
                                                            selectedMission.assignedCrew.length,
                                                            "/",
                                                            selectedMission.requiredCrewSize
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-parchment-200/30",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 197,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-parchment-100 font-semibold",
                                                        children: selectedMission.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 196,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-parchment-200/30 mb-2",
                                                children: "Required Skills"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 flex-wrap",
                                                children: Object.entries(selectedMission.requiredSkills).map(([key, val])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs px-2 py-1 rounded bg-navy-700/50 text-parchment-200/70 border border-navy-700/30",
                                                        children: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]} ≥ ${val}`
                                                    }, key, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, this),
                            readiness && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "parchment-panel p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-brass-400",
                                                children: "Mission Readiness"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: autoAssign,
                                                        className: "px-3 py-1.5 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-xs font-medium",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                className: "w-3 h-3 inline mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Auto-Assign"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: clearCrew,
                                                        className: "px-3 py-1.5 rounded-lg text-parchment-200/40 hover:text-parchment-200 border border-navy-700/30 hover:border-brass-400/20 transition text-xs",
                                                        children: "Clear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-6 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-28 h-28",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                viewBox: "0 0 36 36",
                                                                className: "w-full h-full -rotate-90",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",
                                                                        fill: "none",
                                                                        stroke: "rgba(30,58,110,0.5)",
                                                                        strokeWidth: "3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                                        lineNumber: 231,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",
                                                                        fill: "none",
                                                                        stroke: readiness.score >= 70 ? '#059669' : readiness.score >= 50 ? '#f59e0b' : '#dc2626',
                                                                        strokeWidth: "3",
                                                                        strokeDasharray: `${readiness.score}, 100`,
                                                                        strokeLinecap: "round"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                                        lineNumber: 232,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 230,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-xl font-bold ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReadinessStatus"])(readiness.score).color}`,
                                                                    children: readiness.score
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                                    lineNumber: 242,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 229,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `text-xs font-semibold mt-1 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReadinessStatus"])(readiness.score).color}`,
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReadinessStatus"])(readiness.score).label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 grid grid-cols-2 md:grid-cols-4 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                                                        label: "Avg Health",
                                                        value: `${readiness.avgHealth}%`,
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                                                        label: "Avg Morale",
                                                        value: `${readiness.avgMorale}%`,
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                                                        label: "Skill Coverage",
                                                        value: `${readiness.skillCoverage}%`,
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniStat, {
                                                        label: "Crew Size",
                                                        value: `${selectedMission.assignedCrew.length}/${selectedMission.requiredCrewSize}`,
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 19
                                    }, this),
                                    readiness.factors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 space-y-1",
                                        children: readiness.factors.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-parchment-200/50",
                                                children: [
                                                    f.startsWith('⚠') ? '⚠️' : '✓',
                                                    " ",
                                                    f.replace('⚠ ', '')
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 215,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "parchment-panel p-5",
                                children: canStartMission ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSimulating(true),
                                    className: "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-emerald-900/30 text-emerald-400 border-2 border-emerald-500/40 hover:bg-emerald-900/50 hover:border-emerald-500/60 transition text-lg font-bold nautical-text pulse-glow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 271,
                                            columnNumber: 21
                                        }, this),
                                        "START MISSION"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            disabled: true,
                                            className: "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-navy-800/30 text-parchment-200/20 border-2 border-navy-700/20 text-lg font-bold nautical-text cursor-not-allowed",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                    className: "w-6 h-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 23
                                                }, this),
                                                "START MISSION"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 21
                                        }, this),
                                        launchBlockers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 space-y-1",
                                            children: launchBlockers.map((blocker, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-amber-400/70 flex items-start gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            className: "w-3 h-3 shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/missions/page.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 29
                                                        }, this),
                                                        " ",
                                                        blocker
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 27
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 284,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 265,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "parchment-panel p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold text-brass-400 mb-3",
                                        children: [
                                            "Boarding Party (",
                                            selectedMission.assignedCrew.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 17
                                    }, this),
                                    selectedMission.assignedCrew.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-parchment-200/40",
                                        children: "No crew assigned. Use Auto-Assign or select from recommendations below."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-2",
                                        children: selectedMission.assignedCrew.map((pid)=>{
                                            const p = pirates.find((x)=>x.id === pid);
                                            const rec = recommendations.find((r)=>r.pirateId === pid);
                                            if (!p) return null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 p-2 rounded-lg bg-navy-900/50 border border-brass-400/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-brass-400 font-bold text-xs border border-brass-400/30",
                                                        children: p.name.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-medium text-parchment-100 truncate",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] text-parchment-200/40",
                                                                children: [
                                                                    p.role,
                                                                    rec ? ` • ${rec.score}% fit` : ''
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleCrew(pid),
                                                        className: "text-parchment-200/30 hover:text-blood-300 transition",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/missions/page.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, pid, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 308,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 297,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "parchment-panel p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-semibold text-brass-400 mb-3",
                                        children: "Crew Recommendations"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 328,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 max-h-96 overflow-auto",
                                        children: recommendations.map((rec, idx)=>{
                                            const p = pirates.find((x)=>x.id === rec.pirateId);
                                            if (!p) return null;
                                            const isAssigned = selectedMission.assignedCrew.includes(rec.pirateId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex items-start gap-3 p-3 rounded-lg border transition cursor-pointer
                          ${isAssigned ? 'bg-brass-400/10 border-brass-400/30' : 'bg-navy-900/30 border-navy-700/20 hover:border-brass-400/20'}
                        `,
                                                onClick: ()=>toggleCrew(rec.pirateId),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center shrink-0 w-12",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-lg font-bold ${rec.score >= 70 ? 'text-emerald-400' : rec.score >= 50 ? 'text-amber-400' : 'text-red-400'}`,
                                                                children: [
                                                                    rec.score,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 343,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] text-parchment-200/30",
                                                                children: "Fit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-parchment-100",
                                                                        children: p.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                                        lineNumber: 350,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] text-parchment-200/40",
                                                                        children: p.role
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                                        lineNumber: 351,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    isAssigned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] text-brass-400",
                                                                        children: "✓ Assigned"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                                        lineNumber: 352,
                                                                        columnNumber: 44
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 349,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-1 flex-wrap mt-1",
                                                                children: [
                                                                    rec.pros.map((pro, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-600/20",
                                                                            children: [
                                                                                "+ ",
                                                                                pro
                                                                            ]
                                                                        }, i, true, {
                                                                            fileName: "[project]/src/app/missions/page.tsx",
                                                                            lineNumber: 356,
                                                                            columnNumber: 31
                                                                        }, this)),
                                                                    rec.cons.map((con, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] px-1.5 py-0.5 rounded bg-red-900/30 text-red-400 border border-red-600/20",
                                                                            children: [
                                                                                "- ",
                                                                                con
                                                                            ]
                                                                        }, i, true, {
                                                                            fileName: "[project]/src/app/missions/page.tsx",
                                                                            lineNumber: 361,
                                                                            columnNumber: 31
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/missions/page.tsx",
                                                                lineNumber: 354,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-parchment-200/20 shrink-0",
                                                        children: [
                                                            "#",
                                                            idx + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/missions/page.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, rec.pirateId, true, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 329,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/missions/page.tsx",
                                lineNumber: 327,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 parchment-panel p-8 text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-parchment-200/40",
                            children: "Select a mission to view details and assign crew."
                        }, void 0, false, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 376,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/missions/page.tsx",
                        lineNumber: 375,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this),
            showNewMission && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewMissionForm, {
                onSave: (m)=>{
                    addMission(m);
                    setShowNewMission(false);
                    setSelectedId(m.id);
                },
                onClose: ()=>setShowNewMission(false)
            }, void 0, false, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 384,
                columnNumber: 9
            }, this),
            simulating && selectedMission && simCrew.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MissionSimulation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MissionSimulation"], {
                mission: selectedMission,
                crew: simCrew,
                allPirates: pirates,
                onComplete: handleSimulationComplete,
                onClose: ()=>setSimulating(false)
            }, void 0, false, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 392,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/missions/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(MissionsPage, "eZ+V0L2PGpPGulpiNOB4BolGMrw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c1 = MissionsPage;
function MiniStat({ label, value, icon: Icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "w-4 h-4 text-brass-400/40 mb-1"
            }, void 0, false, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 407,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold text-parchment-100",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 408,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[10px] text-parchment-200/30",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/missions/page.tsx",
                lineNumber: 409,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/missions/page.tsx",
        lineNumber: 406,
        columnNumber: 5
    }, this);
}
_c2 = MiniStat;
function NewMissionForm({ onSave, onClose }) {
    _s1();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Merchant Ship Raid');
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [crewSize, setCrewSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [risk, setRisk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Medium');
    const [skills, setSkills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const handleSave = ()=>{
        const m = {
            id: `m${Date.now()}`,
            name: name || type,
            type,
            difficulty,
            requiredCrewSize: crewSize,
            requiredSkills: skills,
            riskLevel: risk,
            assignedCrew: [],
            status: 'Planning'
        };
        onSave(m);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parchment-panel-highlight p-6 w-full max-w-lg max-h-[90vh] overflow-auto",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-lg font-bold text-brass-400 mb-4",
                    children: "New Mission"
                }, void 0, false, {
                    fileName: "[project]/src/app/missions/page.tsx",
                    lineNumber: 440,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs text-parchment-200/40 block mb-1",
                                    children: "Mission Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    placeholder: "e.g. Plunder the Silver Galleon",
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 444,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs text-parchment-200/40 block mb-1",
                                            children: "Type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: type,
                                            onChange: (e)=>setType(e.target.value),
                                            className: "w-full",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MISSION_TYPES"].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: t,
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 43
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 447,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs text-parchment-200/40 block mb-1",
                                            children: "Risk Level"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: risk,
                                            onChange: (e)=>setRisk(e.target.value),
                                            className: "w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Low"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Medium"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "High"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 60
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    children: "Extreme"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/missions/page.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 81
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 446,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs text-parchment-200/40 block mb-1",
                                            children: "Difficulty (1-5)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 462,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "range",
                                            min: 1,
                                            max: 5,
                                            value: difficulty,
                                            onChange: (e)=>setDifficulty(Number(e.target.value)),
                                            className: "w-full accent-brass-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 463,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-brass-400",
                                            children: DIFFICULTY_STARS(difficulty)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 464,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs text-parchment-200/40 block mb-1",
                                            children: "Required Crew"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 467,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: 1,
                                            max: 20,
                                            value: crewSize,
                                            onChange: (e)=>setCrewSize(Number(e.target.value)),
                                            className: "w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/missions/page.tsx",
                                            lineNumber: 468,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs text-parchment-200/40 block mb-2",
                                    children: "Required Skills (set minimum or leave at 0)"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/missions/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 13
                                }, this),
                                Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"]).map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-parchment-200/50 w-28",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKILL_LABELS"][key]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "range",
                                                min: 0,
                                                max: 100,
                                                value: skills[key] ?? 0,
                                                onChange: (e)=>setSkills({
                                                        ...skills,
                                                        [key]: Number(e.target.value)
                                                    }),
                                                className: "flex-1 accent-brass-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-brass-400 w-6 text-right",
                                                children: skills[key] ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/missions/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/src/app/missions/page.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/missions/page.tsx",
                    lineNumber: 441,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3 mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            className: "px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium",
                            children: "Create Mission"
                        }, void 0, false, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 483,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-4 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 transition text-sm",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/missions/page.tsx",
                            lineNumber: 486,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/missions/page.tsx",
                    lineNumber: 482,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/missions/page.tsx",
            lineNumber: 439,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/missions/page.tsx",
        lineNumber: 438,
        columnNumber: 5
    }, this);
}
_s1(NewMissionForm, "q4dowhk0Dn84tJSu6JApZzFy1N0=");
_c3 = NewMissionForm;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "DIFFICULTY_STARS");
__turbopack_context__.k.register(_c1, "MissionsPage");
__turbopack_context__.k.register(_c2, "MiniStat");
__turbopack_context__.k.register(_c3, "NewMissionForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0ilxel0._.js.map