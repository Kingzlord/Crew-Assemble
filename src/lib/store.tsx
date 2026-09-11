'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Pirate, Mission, MissionHistoryEntry } from './types';
import { SAMPLE_PIRATES } from './data';
import { SAMPLE_MISSIONS } from './data';

interface StoreState {
  pirates: Pirate[];
  missions: Mission[];
  selectedPirateId: string | null;
  selectedMissionId: string | null;
  missionHistory: MissionHistoryEntry[];
}

interface StoreActions {
  addPirate: (pirate: Pirate) => void;
  updatePirate: (pirate: Pirate) => void;
  removePirate: (id: string) => void;
  selectPirate: (id: string | null) => void;
  addMission: (mission: Mission) => void;
  updateMission: (mission: Mission) => void;
  removeMission: (id: string) => void;
  selectMission: (id: string | null) => void;
  assignCrewToMission: (missionId: string, crewIds: string[]) => void;
  addMissionHistory: (entry: MissionHistoryEntry) => void;
  updatePirates: (updated: Pirate[]) => void;
}

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

const STORAGE_KEY = 'blackflag-command-store';

function loadFromStorage(): StoreState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure missionHistory exists (migration for older stores)
      if (!parsed.missionHistory) parsed.missionHistory = [];
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
}

function saveToStorage(state: StoreState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>({
    pirates: SAMPLE_PIRATES,
    missions: SAMPLE_MISSIONS,
    selectedPirateId: null,
    selectedMissionId: null,
    missionHistory: [],
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setState(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveToStorage(state);
    }
  }, [state, hydrated]);

  const addPirate = useCallback((pirate: Pirate) => {
    setState((s) => ({ ...s, pirates: [...s.pirates, pirate] }));
  }, []);

  const updatePirate = useCallback((pirate: Pirate) => {
    setState((s) => ({
      ...s,
      pirates: s.pirates.map((p) => (p.id === pirate.id ? pirate : p)),
    }));
  }, []);

  const removePirate = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      pirates: s.pirates.filter((p) => p.id !== id),
      selectedPirateId: s.selectedPirateId === id ? null : s.selectedPirateId,
    }));
  }, []);

  const selectPirate = useCallback((id: string | null) => {
    setState((s) => ({ ...s, selectedPirateId: id }));
  }, []);

  const addMission = useCallback((mission: Mission) => {
    setState((s) => ({ ...s, missions: [...s.missions, mission] }));
  }, []);

  const updateMission = useCallback((mission: Mission) => {
    setState((s) => ({
      ...s,
      missions: s.missions.map((m) => (m.id === mission.id ? mission : m)),
    }));
  }, []);

  const removeMission = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      missions: s.missions.filter((m) => m.id !== id),
      selectedMissionId: s.selectedMissionId === id ? null : s.selectedMissionId,
    }));
  }, []);

  const selectMission = useCallback((id: string | null) => {
    setState((s) => ({ ...s, selectedMissionId: id }));
  }, []);

  const assignCrewToMission = useCallback((missionId: string, crewIds: string[]) => {
    setState((s) => ({
      ...s,
      missions: s.missions.map((m) =>
        m.id === missionId ? { ...m, assignedCrew: crewIds } : m
      ),
    }));
  }, []);

  const addMissionHistory = useCallback((entry: MissionHistoryEntry) => {
    setState((s) => ({ ...s, missionHistory: [entry, ...s.missionHistory] }));
  }, []);

  const updatePirates = useCallback((updated: Pirate[]) => {
    setState((s) => ({ ...s, pirates: updated }));
  }, []);

  return (
    <StoreContext.Provider
      value={{
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
        updatePirates,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
