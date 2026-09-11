(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SAMPLE_MISSIONS",
    ()=>SAMPLE_MISSIONS,
    "SAMPLE_PIRATES",
    ()=>SAMPLE_PIRATES
]);
const SAMPLE_PIRATES = [
    {
        id: 'p1',
        name: "Blackbeard's Shadow",
        age: 42,
        role: 'Captain',
        hp: 95,
        scurvy: 5,
        morale: 92,
        experience: 98,
        skills: {
            swordsmanship: 95,
            cannonGunnery: 80,
            navigation: 90,
            rigging: 70,
            stealth: 60,
            medicine: 30
        },
        status: 'Active',
        bio: 'Legendary commander of the Midnight Reaver. Known for tactical brilliance and an iron will that inspires absolute loyalty.'
    },
    {
        id: 'p2',
        name: 'Silas Crow',
        age: 38,
        role: 'Quartermaster',
        hp: 88,
        scurvy: 12,
        morale: 85,
        experience: 90,
        skills: {
            swordsmanship: 75,
            cannonGunnery: 50,
            navigation: 85,
            rigging: 65,
            stealth: 80,
            medicine: 45
        },
        status: 'Active',
        bio: 'The captain\'s right hand. Manages plunder distribution and crew discipline with cold precision.'
    },
    {
        id: 'p3',
        name: 'Gunnar Ironhand',
        age: 45,
        role: 'Master Gunner',
        hp: 82,
        scurvy: 25,
        morale: 78,
        experience: 92,
        skills: {
            swordsmanship: 60,
            cannonGunnery: 98,
            navigation: 40,
            rigging: 50,
            stealth: 20,
            medicine: 15
        },
        status: 'Active',
        bio: 'A walking encyclopedia of artillery. Can hit a galleon\'s powder magazine from 400 yards in a storm.'
    },
    {
        id: 'p4',
        name: 'Rosa LaSirena',
        age: 28,
        role: 'Lookout',
        hp: 100,
        scurvy: 8,
        morale: 90,
        experience: 65,
        skills: {
            swordsmanship: 55,
            cannonGunnery: 20,
            navigation: 75,
            rigging: 60,
            stealth: 95,
            medicine: 40
        },
        status: 'Active',
        bio: 'Eyes like a hawk and moves like smoke. Spots naval patrols before anyone else and vanishes when needed.'
    },
    {
        id: 'p5',
        name: 'Old Tom Barnacle',
        age: 58,
        role: 'Shipwright',
        hp: 65,
        scurvy: 45,
        morale: 55,
        experience: 95,
        skills: {
            swordsmanship: 30,
            cannonGunnery: 15,
            navigation: 60,
            rigging: 95,
            stealth: 10,
            medicine: 70
        },
        status: 'Active',
        bio: 'Has kept the Midnight Reaver afloat through three hurricanes and two kraken attacks. The ship IS his life.'
    },
    {
        id: 'p6',
        name: 'Cutter Flynn',
        age: 25,
        role: 'Bosun',
        hp: 92,
        scurvy: 15,
        morale: 88,
        experience: 55,
        skills: {
            swordsmanship: 85,
            cannonGunnery: 45,
            navigation: 50,
            rigging: 80,
            stealth: 55,
            medicine: 20
        },
        status: 'Active',
        bio: 'Young but fierce. Commands the deck crew with a voice that carries over any storm and a cutlass that speaks louder.'
    },
    {
        id: 'p7',
        name: 'Mira the Sawbones',
        age: 34,
        role: 'Deckhand',
        hp: 78,
        scurvy: 30,
        morale: 72,
        experience: 60,
        skills: {
            swordsmanship: 35,
            cannonGunnery: 10,
            navigation: 30,
            rigging: 45,
            stealth: 40,
            medicine: 95
        },
        status: 'Active',
        bio: 'Unofficial ship surgeon. Can amputate a leg in under two minutes and has saved more crew than anyone alive.'
    },
    {
        id: 'p8',
        name: 'Dread Morgan',
        age: 50,
        role: 'Master Gunner',
        hp: 55,
        scurvy: 60,
        morale: 40,
        experience: 88,
        skills: {
            swordsmanship: 70,
            cannonGunnery: 90,
            navigation: 35,
            rigging: 40,
            stealth: 15,
            medicine: 10
        },
        status: 'Wounded',
        bio: 'Veteran gunner with a temper as volatile as his powder charges. His scurvy and wounds slow him but not his aim.'
    },
    {
        id: 'p9',
        name: 'Whisper Kade',
        age: 22,
        role: 'Lookout',
        hp: 100,
        scurvy: 5,
        morale: 95,
        experience: 35,
        skills: {
            swordsmanship: 40,
            cannonGunnery: 10,
            navigation: 65,
            rigging: 50,
            stealth: 98,
            medicine: 25
        },
        status: 'Active',
        bio: 'The youngest crew member but already the best infiltrator. Can slip into any port unnoticed and return with intel.'
    },
    {
        id: 'p10',
        name: 'Brine O\'Malley',
        age: 36,
        role: 'Deckhand',
        hp: 70,
        scurvy: 35,
        morale: 60,
        experience: 50,
        skills: {
            swordsmanship: 65,
            cannonGunnery: 55,
            navigation: 45,
            rigging: 70,
            stealth: 30,
            medicine: 20
        },
        status: 'Active',
        bio: 'A reliable jack-of-all-trades. Not exceptional at anything but competent at everything — the backbone of the crew.'
    },
    {
        id: 'p11',
        name: 'Scarlet Nunez',
        age: 30,
        role: 'Quartermaster',
        hp: 85,
        scurvy: 18,
        morale: 82,
        experience: 70,
        skills: {
            swordsmanship: 80,
            cannonGunnery: 30,
            navigation: 75,
            rigging: 55,
            stealth: 85,
            medicine: 50
        },
        status: 'Active',
        bio: 'Rival quartermaster who handles black market contacts. Her network of informants spans three oceans.'
    },
    {
        id: 'p12',
        name: 'Grog McTavish',
        age: 48,
        role: 'Deckhand',
        hp: 40,
        scurvy: 70,
        morale: 25,
        experience: 75,
        skills: {
            swordsmanship: 50,
            cannonGunnery: 40,
            navigation: 20,
            rigging: 60,
            stealth: 5,
            medicine: 10
        },
        status: 'Wounded',
        bio: 'Once a strong worker, now ravaged by scurvy and rum. His morale is dangerously low — keep an eye on him.'
    },
    {
        id: 'p13',
        name: 'Navarre Leclerc',
        age: 33,
        role: 'Bosun',
        hp: 90,
        scurvy: 10,
        morale: 75,
        experience: 68,
        skills: {
            swordsmanship: 70,
            cannonGunnery: 35,
            navigation: 80,
            rigging: 90,
            stealth: 45,
            medicine: 30
        },
        status: 'Active',
        bio: 'French-born sail master. Can coax speed from the laziest winds and repairs rigging faster than most can tie a knot.'
    },
    {
        id: 'p14',
        name: 'Jin Wavebreaker',
        age: 27,
        role: 'Shipwright',
        hp: 95,
        scurvy: 3,
        morale: 85,
        experience: 48,
        skills: {
            swordsmanship: 45,
            cannonGunnery: 20,
            navigation: 55,
            rigging: 88,
            stealth: 35,
            medicine: 65
        },
        status: 'Active',
        bio: 'Eastern carpenter with innovative hull-reinforcement techniques. His modifications have doubled the ship\'s durability.'
    },
    {
        id: 'p15',
        name: 'Rat Hawkins',
        age: 31,
        role: 'Deckhand',
        hp: 75,
        scurvy: 28,
        morale: 65,
        experience: 52,
        skills: {
            swordsmanship: 55,
            cannonGunnery: 60,
            navigation: 30,
            rigging: 50,
            stealth: 70,
            medicine: 15
        },
        status: 'Active',
        bio: 'A former naval deserter who brings insider knowledge of patrol routes and naval tactics to the crew.'
    },
    {
        id: 'p16',
        name: 'Tempest Voss',
        age: 29,
        role: 'Master Gunner',
        hp: 88,
        scurvy: 22,
        morale: 80,
        experience: 62,
        skills: {
            swordsmanship: 50,
            cannonGunnery: 92,
            navigation: 30,
            rigging: 45,
            stealth: 25,
            medicine: 20
        },
        status: 'Active',
        bio: 'Rising star in the gunnery crew. Invented the "Voss Volley" — a devastating three-cannon synchronized barrage.'
    },
    {
        id: 'p17',
        name: 'Plume Delacroix',
        age: 40,
        role: 'Deckhand',
        hp: 30,
        scurvy: 80,
        morale: 20,
        experience: 58,
        skills: {
            swordsmanship: 40,
            cannonGunnery: 25,
            navigation: 15,
            rigging: 35,
            stealth: 50,
            medicine: 55
        },
        status: 'Wounded',
        bio: 'The crew\'s poet and chronicler, now gravely ill. His scurvy is critical and morale near mutinous. Needs urgent care.'
    },
    {
        id: 'p18',
        name: 'Kira Stormwall',
        age: 26,
        role: 'Lookout',
        hp: 98,
        scurvy: 2,
        morale: 93,
        experience: 40,
        skills: {
            swordsmanship: 60,
            cannonGunnery: 15,
            navigation: 80,
            rigging: 55,
            stealth: 88,
            medicine: 35
        },
        status: 'Active',
        bio: 'Fearless climber who volunteers for the crow\'s nest in every storm. Her storm-navigation instincts are unmatched.'
    },
    {
        id: 'p19',
        name: 'Barnaby Cross',
        age: 52,
        role: 'Deckhand',
        hp: 60,
        scurvy: 40,
        morale: 48,
        experience: 82,
        skills: {
            swordsmanship: 45,
            cannonGunnery: 55,
            navigation: 25,
            rigging: 75,
            stealth: 20,
            medicine: 30
        },
        status: 'On Leave',
        bio: 'Seasoned deckhand recovering from a shoulder injury. Decades at sea have made him wise but his body is failing.'
    },
    {
        id: 'p20',
        name: 'Zara Blacktide',
        age: 24,
        role: 'Bosun',
        hp: 96,
        scurvy: 6,
        morale: 88,
        experience: 38,
        skills: {
            swordsmanship: 72,
            cannonGunnery: 25,
            navigation: 65,
            rigging: 85,
            stealth: 60,
            medicine: 40
        },
        status: 'Active',
        bio: 'Rising prodigy who can reef a sail in record time. Her energy is contagious and crew efficiency soars when she leads.'
    }
];
const SAMPLE_MISSIONS = [
    {
        id: 'm1',
        name: 'Plunder the Silver Galleon',
        type: 'Merchant Ship Raid',
        difficulty: 3,
        requiredCrewSize: 6,
        requiredSkills: {
            swordsmanship: 70,
            cannonGunnery: 60,
            navigation: 50
        },
        riskLevel: 'Medium',
        assignedCrew: [],
        status: 'Planning'
    },
    {
        id: 'm2',
        name: 'Board the HMS Sovereign',
        type: 'Naval Boarding',
        difficulty: 5,
        requiredCrewSize: 8,
        requiredSkills: {
            swordsmanship: 80,
            cannonGunnery: 70,
            stealth: 60,
            navigation: 60
        },
        riskLevel: 'Extreme',
        assignedCrew: [],
        status: 'Planning'
    },
    {
        id: 'm3',
        name: 'Skull Island Recovery',
        type: 'Treasure Island Expedition',
        difficulty: 4,
        requiredCrewSize: 5,
        requiredSkills: {
            navigation: 75,
            stealth: 70,
            rigging: 60,
            medicine: 50
        },
        riskLevel: 'High',
        assignedCrew: [],
        status: 'Planning'
    },
    {
        id: 'm4',
        name: 'Port Royal Infiltration',
        type: 'Silent Harbor Infiltration',
        difficulty: 4,
        requiredCrewSize: 4,
        requiredSkills: {
            stealth: 85,
            navigation: 60,
            swordsmanship: 40
        },
        riskLevel: 'High',
        assignedCrew: [],
        status: 'Planning'
    },
    {
        id: 'm5',
        name: 'The Leviathan Hunt',
        type: 'Kraken Hunt',
        difficulty: 5,
        requiredCrewSize: 10,
        requiredSkills: {
            cannonGunnery: 80,
            swordsmanship: 70,
            navigation: 70,
            rigging: 65,
            medicine: 60
        },
        riskLevel: 'Extreme',
        assignedCrew: [],
        status: 'Planning'
    },
    {
        id: 'm6',
        name: 'Storm Tortuga Garrison',
        type: 'Fort Assault',
        difficulty: 4,
        requiredCrewSize: 7,
        requiredSkills: {
            cannonGunnery: 75,
            swordsmanship: 75,
            rigging: 50,
            stealth: 40
        },
        riskLevel: 'High',
        assignedCrew: [],
        status: 'Planning'
    },
    {
        id: 'm7',
        name: 'Free the Prisoners of Isla Muerte',
        type: 'Rescue Mission',
        difficulty: 3,
        requiredCrewSize: 5,
        requiredSkills: {
            stealth: 75,
            medicine: 60,
            navigation: 55,
            swordsmanship: 50
        },
        riskLevel: 'Medium',
        assignedCrew: [],
        status: 'Planning'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/store.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const STORAGE_KEY = 'blackflag-command-store';
function loadFromStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Ensure missionHistory exists (migration for older stores)
            if (!parsed.missionHistory) parsed.missionHistory = [];
            return parsed;
        }
    } catch  {
    // ignore
    }
    return null;
}
function saveToStorage(state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch  {
    // ignore
    }
}
function StoreProvider({ children }) {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        pirates: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAMPLE_PIRATES"],
        missions: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SAMPLE_MISSIONS"],
        selectedPirateId: null,
        selectedMissionId: null,
        missionHistory: []
    });
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            const stored = loadFromStorage();
            if (stored) {
                setState(stored);
            }
            setHydrated(true);
        }
    }["StoreProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            if (hydrated) {
                saveToStorage(state);
            }
        }
    }["StoreProvider.useEffect"], [
        state,
        hydrated
    ]);
    const addPirate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addPirate]": (pirate)=>{
            setState({
                "StoreProvider.useCallback[addPirate]": (s)=>({
                        ...s,
                        pirates: [
                            ...s.pirates,
                            pirate
                        ]
                    })
            }["StoreProvider.useCallback[addPirate]"]);
        }
    }["StoreProvider.useCallback[addPirate]"], []);
    const updatePirate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updatePirate]": (pirate)=>{
            setState({
                "StoreProvider.useCallback[updatePirate]": (s)=>({
                        ...s,
                        pirates: s.pirates.map({
                            "StoreProvider.useCallback[updatePirate]": (p)=>p.id === pirate.id ? pirate : p
                        }["StoreProvider.useCallback[updatePirate]"])
                    })
            }["StoreProvider.useCallback[updatePirate]"]);
        }
    }["StoreProvider.useCallback[updatePirate]"], []);
    const removePirate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removePirate]": (id)=>{
            setState({
                "StoreProvider.useCallback[removePirate]": (s)=>({
                        ...s,
                        pirates: s.pirates.filter({
                            "StoreProvider.useCallback[removePirate]": (p)=>p.id !== id
                        }["StoreProvider.useCallback[removePirate]"]),
                        selectedPirateId: s.selectedPirateId === id ? null : s.selectedPirateId
                    })
            }["StoreProvider.useCallback[removePirate]"]);
        }
    }["StoreProvider.useCallback[removePirate]"], []);
    const selectPirate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[selectPirate]": (id)=>{
            setState({
                "StoreProvider.useCallback[selectPirate]": (s)=>({
                        ...s,
                        selectedPirateId: id
                    })
            }["StoreProvider.useCallback[selectPirate]"]);
        }
    }["StoreProvider.useCallback[selectPirate]"], []);
    const addMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addMission]": (mission)=>{
            setState({
                "StoreProvider.useCallback[addMission]": (s)=>({
                        ...s,
                        missions: [
                            ...s.missions,
                            mission
                        ]
                    })
            }["StoreProvider.useCallback[addMission]"]);
        }
    }["StoreProvider.useCallback[addMission]"], []);
    const updateMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateMission]": (mission)=>{
            setState({
                "StoreProvider.useCallback[updateMission]": (s)=>({
                        ...s,
                        missions: s.missions.map({
                            "StoreProvider.useCallback[updateMission]": (m)=>m.id === mission.id ? mission : m
                        }["StoreProvider.useCallback[updateMission]"])
                    })
            }["StoreProvider.useCallback[updateMission]"]);
        }
    }["StoreProvider.useCallback[updateMission]"], []);
    const removeMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removeMission]": (id)=>{
            setState({
                "StoreProvider.useCallback[removeMission]": (s)=>({
                        ...s,
                        missions: s.missions.filter({
                            "StoreProvider.useCallback[removeMission]": (m)=>m.id !== id
                        }["StoreProvider.useCallback[removeMission]"]),
                        selectedMissionId: s.selectedMissionId === id ? null : s.selectedMissionId
                    })
            }["StoreProvider.useCallback[removeMission]"]);
        }
    }["StoreProvider.useCallback[removeMission]"], []);
    const selectMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[selectMission]": (id)=>{
            setState({
                "StoreProvider.useCallback[selectMission]": (s)=>({
                        ...s,
                        selectedMissionId: id
                    })
            }["StoreProvider.useCallback[selectMission]"]);
        }
    }["StoreProvider.useCallback[selectMission]"], []);
    const assignCrewToMission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[assignCrewToMission]": (missionId, crewIds)=>{
            setState({
                "StoreProvider.useCallback[assignCrewToMission]": (s)=>({
                        ...s,
                        missions: s.missions.map({
                            "StoreProvider.useCallback[assignCrewToMission]": (m)=>m.id === missionId ? {
                                    ...m,
                                    assignedCrew: crewIds
                                } : m
                        }["StoreProvider.useCallback[assignCrewToMission]"])
                    })
            }["StoreProvider.useCallback[assignCrewToMission]"]);
        }
    }["StoreProvider.useCallback[assignCrewToMission]"], []);
    const addMissionHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addMissionHistory]": (entry)=>{
            setState({
                "StoreProvider.useCallback[addMissionHistory]": (s)=>({
                        ...s,
                        missionHistory: [
                            entry,
                            ...s.missionHistory
                        ]
                    })
            }["StoreProvider.useCallback[addMissionHistory]"]);
        }
    }["StoreProvider.useCallback[addMissionHistory]"], []);
    const updatePirates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updatePirates]": (updated)=>{
            setState({
                "StoreProvider.useCallback[updatePirates]": (s)=>({
                        ...s,
                        pirates: updated
                    })
            }["StoreProvider.useCallback[updatePirates]"]);
        }
    }["StoreProvider.useCallback[updatePirates]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: {
            ...state,
            addPirate,
            updatePirate,
            removePirate,
            selectPirate,
            addMission,
            updateMission,
            removeMission,
            selectMission,
            assignCrewToMission,
            addMissionHistory,
            updatePirates
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/store.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s(StoreProvider, "CopYdteXiPwif2t2pEtsbT8TA/E=");
_c = StoreProvider;
function useStore() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!ctx) throw new Error('useStore must be used within StoreProvider');
    return ctx;
}
_s1(useStore, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Tutorial.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tutorial",
    ()=>Tutorial,
    "resetTutorial",
    ()=>resetTutorial,
    "shouldShowTutorial",
    ()=>shouldShowTutorial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Anchor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/anchor.mjs [app-client] (ecmascript) <export default as Anchor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skull.mjs [app-client] (ecmascript) <export default as Skull>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/swords.mjs [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.mjs [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.mjs [app-client] (ecmascript) <export default as BarChart3>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const TUTORIAL_KEY = 'blackflag-tutorial-complete';
const STEPS = [
    {
        step: 1,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Anchor$3e$__["Anchor"],
        emoji: '⚓',
        title: 'Command Deck',
        description: 'Welcome aboard, Captain! This is your command center. Monitor crew size, health, morale, scurvy and overall readiness from here. The dashboard gives you an instant snapshot of your fleet\'s condition.',
        highlight: 'command-deck'
    },
    {
        step: 2,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skull$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Skull$3e$__["Skull"],
        emoji: '☠',
        title: 'Crew Manifest',
        description: 'Manage your pirates here. Search by name, filter by role, health, morale, or scurvy level. Inspect detailed skill profiles, edit crew members, add new pirates to your roster, or discharge those who\'ve lost their sea legs.',
        highlight: 'crew-manifest'
    },
    {
        step: 3,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"],
        emoji: '⚔',
        title: 'Crew Skills',
        description: 'Each pirate has six core skills: Swordsmanship, Cannon Gunnery, Navigation, Rigging, Stealth and Medicine — rated on a 0-100 scale. The Intelligence page shows radar charts, skill distribution and a full skill matrix for the entire crew.',
        highlight: 'crew-skills'
    },
    {
        step: 4,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        emoji: '❤️',
        title: 'Vitals & Readiness',
        description: 'Keep a weather eye on HP, scurvy and morale. Crew with critical health or mutinous morale can sabotage mission readiness. The Battle Readiness page tracks individual and crew-wide operational status with alerts for dangerous conditions.',
        highlight: 'vitals'
    },
    {
        step: 5,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
        emoji: '🗺',
        title: 'Mission Planning',
        description: 'Choose a mission and let the tactical engine recommend the best crew based on their skills, health, morale, experience and mission requirements. The AI scores each pirate and shows exactly why they were recommended — with pros and cons.',
        highlight: 'missions'
    },
    {
        step: 6,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
        emoji: '🏴‍☠️',
        title: 'Mission Simulation',
        description: 'Once your boarding party is prepared, launch the mission! Watch a tactical simulation unfold with dynamic events based on your crew\'s actual skills. The outcome depends on crew quality — not pure luck. Afterward, review tactical analysis and mission history.',
        highlight: 'simulation'
    }
];
function Tutorial({ onClose }) {
    _s();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const step = STEPS[currentStep];
    const Icon = step.icon;
    const handleNext = ()=>{
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };
    const handleBack = ()=>{
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };
    const handleSkip = ()=>{
        handleFinish();
    };
    const handleFinish = ()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem(TUTORIAL_KEY, 'true');
        }
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4",
        onClick: handleSkip,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "parchment-panel-highlight p-0 w-full max-w-lg overflow-hidden",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative px-6 pt-6 pb-4 bg-gradient-to-b from-navy-700/30 to-transparent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSkip,
                            className: "absolute top-4 right-4 text-parchment-200/30 hover:text-parchment-200 transition",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Tutorial.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 rounded-full bg-navy-700/50 flex items-center justify-center border-2 border-brass-400/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl",
                                        children: step.emoji
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Tutorial.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-brass-400/60 uppercase tracking-widest",
                                            children: [
                                                "Step ",
                                                step.step,
                                                " of ",
                                                STEPS.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Tutorial.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-bold text-brass-400 nautical-text",
                                            children: step.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Tutorial.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1",
                            children: STEPS.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex-1 h-1.5 rounded-full transition-all duration-300 ${i < currentStep ? 'bg-brass-400' : i === currentStep ? 'bg-brass-400/60 pulse-glow' : 'bg-navy-700/50'}`
                                }, i, false, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Tutorial.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-parchment-200/80 leading-relaxed",
                            children: step.description
                        }, void 0, false, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex items-center gap-2 text-parchment-200/15",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 brass-divider"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs",
                                    children: "⚓"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 brass-divider"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Tutorial.tsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 pb-6 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSkip,
                            className: "text-xs text-parchment-200/30 hover:text-parchment-200/60 transition",
                            children: "Skip Tutorial"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                currentStep > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleBack,
                                    className: "flex items-center gap-1 px-3 py-2 rounded-lg text-parchment-200/50 hover:text-parchment-200 border border-navy-700/30 hover:border-brass-400/20 transition text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Tutorial.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this),
                                        " Back"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNext,
                                    className: "flex items-center gap-1 px-4 py-2 rounded-lg bg-brass-400/20 text-brass-400 border border-brass-400/30 hover:bg-brass-400/30 transition text-sm font-medium",
                                    children: currentStep === STEPS.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            "Finish ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Anchor$3e$__["Anchor"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Tutorial.tsx",
                                                lineNumber: 159,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            "Next ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Tutorial.tsx",
                                                lineNumber: 161,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Tutorial.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Tutorial.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Tutorial.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Tutorial.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Tutorial.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(Tutorial, "1sJm2lQ2mRX7Y0EEARB7TDldOEM=");
_c = Tutorial;
function shouldShowTutorial() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem(TUTORIAL_KEY) !== 'true';
}
function resetTutorial() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(TUTORIAL_KEY);
}
var _c;
__turbopack_context__.k.register(_c, "Tutorial");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ship$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ship.mjs [app-client] (ecmascript) <export default as Ship>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tutorial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Tutorial.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const NAV_ITEMS = [
    {
        href: '/',
        label: 'Command Deck',
        emoji: '⚓'
    },
    {
        href: '/crew',
        label: 'Crew Manifest',
        emoji: '☠'
    },
    {
        href: '/missions',
        label: 'Missions',
        emoji: '🗺'
    },
    {
        href: '/intelligence',
        label: 'Intelligence',
        emoji: '📊'
    },
    {
        href: '/readiness',
        label: 'Battle Readiness',
        emoji: '⚔'
    }
];
function Sidebar({ onReplayTutorial }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleReplay = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tutorial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetTutorial"])();
        onReplayTutorial?.();
        setMobileOpen(false);
    };
    const navContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-navy-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ship$3e$__["Ship"], {
                                className: "w-7 h-7 text-brass-400"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-base font-bold text-brass-400 tracking-wider nautical-text",
                                        children: "BLACKFLAG"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[9px] text-brass-400/60 tracking-[0.2em] uppercase",
                                        children: "Command"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Sidebar.tsx",
                                        lineNumber: 37,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileOpen(false),
                                className: "ml-auto lg:hidden text-parchment-200/50 hover:text-parchment-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Sidebar.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-parchment-200/40 italic mt-2 leading-tight",
                        children: "Know Your Crew. Choose Your Raid. Rule the Seas."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-parchment-200/30 tracking-[0.15em] uppercase",
                            children: "Navigation"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    NAV_ITEMS.map((item)=>{
                        const isActive = pathname === item.href;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            onClick: ()=>setMobileOpen(false),
                            className: `flex items-center gap-3 px-4 py-3 text-sm transition-all sidebar-link
                ${isActive ? 'sidebar-link-active font-semibold' : 'text-parchment-200/70 hover:text-parchment-100'}
              `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base",
                                    children: item.emoji
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Sidebar.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Sidebar.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.href, true, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-t border-navy-700/50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleReplay,
                        className: "flex items-center gap-2 text-[10px] text-parchment-200/30 hover:text-brass-400 transition mb-3 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "w-3 h-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            " Replay Tutorial"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brass-divider mb-3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-[10px] text-parchment-200/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "🏴‍☠️"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "v1.0 — Tactical Command"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Sidebar.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-navy-950 border-b border-navy-700/50 flex items-center px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMobileOpen(true),
                        className: "text-parchment-200/70 hover:text-parchment-100 transition",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ship$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ship$3e$__["Ship"], {
                        className: "w-5 h-5 text-brass-400 ml-3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-brass-400 tracking-wider ml-2 nautical-text",
                        children: "BLACKFLAG"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Sidebar.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden fixed inset-0 z-50 bg-black/60",
                onClick: ()=>setMobileOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `
          shrink-0 border-r border-navy-700/50 bg-navy-950 flex flex-col
          w-56 lg:w-60
          fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `,
                children: navContent
            }, void 0, false, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden h-14"
            }, void 0, false, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Sidebar, "QspThAMvWq7Kvv9MPmTdnRtL4lQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AppShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tutorial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Tutorial.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AppShell({ children }) {
    _s();
    const [showTutorial, setShowTutorial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppShell.useEffect": ()=>{
            setMounted(true);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tutorial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldShowTutorial"])()) {
                setShowTutorial(true);
            }
        }
    }["AppShell.useEffect"], []);
    const handleReplayTutorial = ()=>{
        setShowTutorial(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StoreProvider"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-screen flex-col lg:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                        onReplayTutorial: handleReplayTutorial
                    }, void 0, false, {
                        fileName: "[project]/src/components/AppShell.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 overflow-auto lg:pt-0",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/AppShell.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AppShell.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            mounted && showTutorial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Tutorial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tutorial"], {
                onClose: ()=>setShowTutorial(false)
            }, void 0, false, {
                fileName: "[project]/src/components/AppShell.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AppShell.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(AppShell, "Omr1TWXI21ZzFfzmRRPEf5D2fmU=");
_c = AppShell;
var _c;
__turbopack_context__.k.register(_c, "AppShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0tm3yrp._.js.map