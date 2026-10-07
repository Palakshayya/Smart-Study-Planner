/**
 * ============================================================================
 * APPLICATION STATE & PERSISTENCE MANAGER
 * ============================================================================
 * Provides synchronized LocalStorage persistence, safe fallback handling,
 * and data structure migrations (such as adding reminder arrays to exams).
 */

import { defaultState } from './seedData.js';

const STORAGE_KEY = 'smart_study_planner_state';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(defaultState));
    const state = JSON.parse(raw);

    // Schema Migration: Ensure all exams have valid reminders array
    if (state.exams && Array.isArray(state.exams)) {
      state.exams.forEach(ex => {
        if (!Array.isArray(ex.reminders)) {
          ex.reminders = [
            { id: `rem_${ex.id}_24h`, hoursBefore: 24, label: '24 hours before (1 day)', unit: 'hours', value: 24, channel: 'in-app', enabled: true },
            { id: `rem_${ex.id}_1h`, hoursBefore: 1, label: '1 hour before', unit: 'hours', value: 1, channel: 'in-app', enabled: true }
          ];
        }
      });
    }

    return state;
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return JSON.parse(JSON.stringify(defaultState));
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

export function resetState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  appState = JSON.parse(JSON.stringify(defaultState));
  return appState;
}

// Global active state reference
export let appState = loadState();
