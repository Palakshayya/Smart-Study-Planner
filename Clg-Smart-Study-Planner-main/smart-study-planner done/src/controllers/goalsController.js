/**
 * ============================================================================
 * GOALS VIEW CONTROLLER
 * ============================================================================
 * Manages active, completed, and archived academic goals, weekly routine goals,
 * streak counters, restoring archived goals, and creating new goals.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import { renderDashboard } from './dashboardController.js';

export let currentGoalFilter = 'active';

export function getCurrentGoalFilter() {
  return currentGoalFilter;
}

export function setGoalFilter(filter) {
  currentGoalFilter = filter;
  document.querySelectorAll('.goal-filter-btn').forEach((btn) => {
    if (btn.getAttribute('data-filter') === filter) {
      btn.className = 'goal-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#5551FF] text-white shadow-xs';
    } else {
      btn.className = 'goal-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50';
    }
  });
  renderGoals(filter);
}

export function renderGoals(filter = 'active') {
  const container = document.getElementById('goals-grid');
  if (!container) return;

  const filtered = appState.goals.filter((g) => {
    if (filter === 'all') return true;
    return g.status === filter;
  });

  const cardsHtml = filtered.map((goal) => {
    if (goal.status === 'completed') {
      return `
        <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="text-[11px] px-2 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-700">${goal.category}</span>
                <span class="text-[11px] px-2 py-0.5 rounded-md font-semibold bg-emerald-50 text-emerald-700">✓ Done</span>
              </div>
            </div>
            <h3 class="text-base font-bold text-slate-900 line-through opacity-85">${goal.title}</h3>
            <p class="text-xs text-slate-500 mt-2 line-clamp-2">${goal.description}</p>
          </div>
          <div class="pt-6 mt-6 border-t border-slate-100">
            <div class="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span class="text-emerald-600 font-bold">100% Complete</span>
              <span class="text-slate-400 font-normal">${goal.completedDate}</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="bg-emerald-500 h-full w-full rounded-full"></div>
            </div>
          </div>
        </div>
      `;
    }

    if (goal.status === 'archived') {
      return `
        <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-slate-400">📚</span>
              <span class="text-[11px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600">Archived</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 line-through opacity-75">${goal.title}</h3>
            <p class="text-xs text-slate-500 mt-2 line-clamp-2">${goal.description}</p>
          </div>
          <div class="pt-6 mt-6 border-t border-slate-100 space-y-4">
            <div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1.5">
                <div class="bg-slate-400 h-full rounded-full" style="width: ${goal.progressPercentage}%"></div>
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>${goal.progressPercentage}% Complete</span>
                <span>${goal.archivedDate}</span>
              </div>
            </div>
            <button onclick="restoreGoal('${goal.id}')" class="w-full py-2 text-xs font-semibold text-[#5551FF] hover:bg-blue-50/70 rounded-xl transition-colors flex items-center justify-center gap-1.5">
              <span>↻ Restore Goal</span>
            </button>
          </div>
        </div>
      `;
    }

    // Active Goals
    return `
      <div class="bg-white rounded-2xl border-l-4 border-l-[#5551FF] border-y border-r border-slate-100 shadow-2xs p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-md font-semibold bg-emerald-50 text-emerald-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
            </span>
            <span class="text-[11px] font-semibold text-slate-400">${goal.category}</span>
          </div>
          <h3 class="text-base font-bold text-slate-900">${goal.title}</h3>
          <p class="text-xs text-slate-500 mt-2">${goal.description}</p>
        </div>

        <div class="pt-6 mt-6 border-t border-slate-100 space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-semibold">
              <span class="text-slate-500">${goal.unit ? 'This Week' : 'Progress'}</span>
              <span class="text-[#5551FF] font-bold tabular-nums font-mono">
                ${goal.unit ? `${goal.currentValue}h / ${goal.targetValue}h (${goal.progressPercentage}%)` : `${goal.progressPercentage}%`}
              </span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="bg-[#5551FF] h-full rounded-full transition-all" style="width: ${goal.progressPercentage}%"></div>
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>${goal.targetDate ? `Due: ${goal.targetDate}` : goal.resetsDay}</span>
            ${goal.tasksCompleted !== undefined ? `<span class="font-mono">${goal.tasksCompleted}/${goal.totalTasks} Tasks</span>` : ''}
            ${goal.streakWeeks !== undefined ? `<span class="text-amber-600 font-bold">🔥 ${goal.streakWeeks} Week Streak</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Append Add Goal dashed card if filter is active or all
  const addCardHtml = (filter === 'active' || filter === 'all') ? `
    <div onclick="openModal('create-goal-modal')" class="border-2 border-dashed border-slate-200 hover:border-[#5551FF]/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/40 hover:bg-white min-h-[220px]">
      <div class="w-12 h-12 rounded-full bg-blue-50 text-[#5551FF] flex items-center justify-center mb-3 text-xl font-bold">
        +
      </div>
      <h3 class="text-base font-bold text-slate-900">Add New Goal</h3>
      <p class="text-xs text-slate-500 mt-1">Set a new target to track.</p>
    </div>
  ` : '';

  container.innerHTML = cardsHtml + addCardHtml;
}

export function restoreGoal(goalId) {
  const goal = appState.goals.find((g) => g.id === goalId);
  if (goal) {
    goal.status = 'active';
    saveState(appState);
    showToast(`Restored goal: ${goal.title}`, 'success');
    renderGoals(currentGoalFilter);
  }
}

export function handleCreateGoal(e) {
  e.preventDefault();
  const name = document.getElementById('goal-name-input')?.value.trim();
  const category = document.getElementById('goal-category-select')?.value || 'Academics';
  const progress = Number(document.getElementById('goal-progress-slider')?.value) || 0;

  if (!name) return;

  const newGoal = {
    id: `gol_${Date.now()}`,
    title: name,
    description: `Track target progress for ${name} in ${category}.`,
    category,
    status: 'active',
    progressPercentage: progress,
    targetDate: 'End of Term'
  };

  appState.goals.unshift(newGoal);
  saveState(appState);
  showToast(`Created goal: ${name}`, 'success');
  closeModal('create-goal-modal');
  renderGoals(currentGoalFilter);
  renderDashboard();

  const form = document.getElementById('create-goal-form');
  if (form) form.reset();
}
