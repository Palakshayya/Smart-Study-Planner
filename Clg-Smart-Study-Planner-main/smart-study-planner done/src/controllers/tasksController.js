/**
 * ============================================================================
 * TASKS VIEW CONTROLLER
 * ============================================================================
 * Handles task filtering ('all', 'today', 'upcoming', 'completed', 'overdue'),
 * task expansion pagination ("See More" / "Show Less"), completion toggles,
 * right-panel study time ring charts, and task creation.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import { renderDashboard } from './dashboardController.js';

export let currentTaskFilter = 'all';
export let tasksExpanded = false;
export const TASKS_PREVIEW_LIMIT = 4;

export function getCurrentTaskFilter() {
  return currentTaskFilter;
}

export function toggleTasksExpanded() {
  tasksExpanded = !tasksExpanded;
  renderTasks(currentTaskFilter);
}

export function setTaskFilter(filter) {
  currentTaskFilter = filter;
  tasksExpanded = false; // Reset expansion when switching categories
  document.querySelectorAll('.task-filter-btn').forEach((btn) => {
    if (btn.getAttribute('data-filter') === filter) {
      btn.className = 'task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#5551FF] text-white shadow-xs';
    } else {
      btn.className = 'task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50';
    }
  });
  renderTasks(filter);
}

export function renderTasks(filter = 'all') {
  const listContainer = document.getElementById('tasks-list-container');
  const ringContainer = document.getElementById('task-ring-container');
  const calloutContainer = document.getElementById('task-callout-container');
  if (!listContainer) return;

  const filtered = appState.tasks.filter((t) => {
    if (filter === 'completed') return t.isCompleted;
    if (filter === 'overdue') return t.isOverdue && !t.isCompleted;
    if (filter === 'today') return t.dueDate.toLowerCase().includes('today') && !t.isCompleted;
    if (filter === 'upcoming') return !t.isCompleted && !t.isOverdue && (t.dueDate.toLowerCase().includes('tomorrow') || t.dueDate.toLowerCase().includes('oct 2'));
    return true; // all
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="p-12 text-center text-slate-400 my-auto">
        <svg class="w-10 h-10 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <p class="text-sm font-semibold text-slate-600">No tasks in this category</p>
        <p class="text-xs mt-1">Try switching to 'All' or create a new assignment.</p>
      </div>
    `;
  } else {
    const isOverLimit = filtered.length > TASKS_PREVIEW_LIMIT;
    const displayList = (!tasksExpanded && isOverLimit) ? filtered.slice(0, TASKS_PREVIEW_LIMIT) : filtered;

    const itemsHtml = `
      <div class="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[500px]">
        ${displayList.map((task) => `
          <div onclick="toggleTaskCompletion('${task.id}')" class="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer border-b border-slate-100 last:border-0">
            <div class="mt-0.5">
              <input type="checkbox" ${task.isCompleted ? 'checked' : ''} class="w-5 h-5 rounded-md text-[#5551FF] accent-[#5551FF] cursor-pointer">
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                ${task.isOverdue && !task.isCompleted ? '<span class="text-rose-500 font-bold">⚠️</span>' : ''}
                <h3 class="text-sm font-bold text-slate-900 ${task.isCompleted ? 'line-through text-slate-400' : ''}">
                  ${task.title}
                </h3>
              </div>
              <div class="flex flex-wrap items-center gap-2 mt-2">
                <span class="px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-white" style="background-color: ${task.subjectColor}">
                  ${task.subjectName}
                </span>
                <span class="text-xs flex items-center gap-1 font-medium ${task.isOverdue && !task.isCompleted ? 'text-rose-600 font-semibold' : 'text-slate-500'}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>
                  <span>${task.dueDate}</span>
                </span>
                <span class="text-[10px] px-2 py-0.5 rounded-md font-semibold capitalize ${task.priority === 'high' ? 'bg-rose-50 text-rose-700' : task.priority === 'medium' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}">
                  ${task.priority === 'high' ? 'High Priority' : task.priority === 'medium' ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const footerHtml = isOverLimit ? `
      <div class="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
        <span class="text-slate-500 font-medium">Showing ${displayList.length} of ${filtered.length} tasks</span>
        <button type="button" onclick="toggleTasksExpanded()" class="px-3.5 py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-[#5551FF] text-[#5551FF] font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs">
          <span>${tasksExpanded ? 'Show Less' : `See More (+${filtered.length - TASKS_PREVIEW_LIMIT} more)`}</span>
          <svg class="w-3.5 h-3.5 transform ${tasksExpanded ? 'rotate-180' : ''} transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
      </div>
    ` : `
      <div class="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-auto">
        <span>${filtered.length} task${filtered.length === 1 ? '' : 's'} in this view</span>
        <button onclick="openModal('add-task-modal')" class="text-[#5551FF] font-semibold hover:underline">+ Quick Add</button>
      </div>
    `;

    listContainer.innerHTML = itemsHtml + footerHtml;
  }

  // Dynamic Right-Panel Ring & Callouts
  if (ringContainer) {
    if (filter === 'completed') {
      ringContainer.innerHTML = `
        <h3 class="text-sm font-bold text-slate-900 mb-6">Estimated Study Time</h3>
        <div class="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <path class="text-[#5551FF]" stroke-dasharray="100, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          </svg>
          <div class="absolute text-center">
            <span class="text-2xl font-extrabold text-slate-900 block">Done</span>
            <span class="text-[11px] font-medium text-slate-400">Great job!</span>
          </div>
        </div>
        <div class="space-y-3 pt-6">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-600">Data Structures</span>
              <span class="text-slate-800 font-mono">2h 30m</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-[#5551FF]" style="width: 100%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-600">Physics 101</span>
              <span class="text-slate-800 font-mono">2h 00m</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-emerald-500" style="width: 100%"></div>
            </div>
          </div>
        </div>
      `;
    } else if (filter === 'overdue') {
      ringContainer.innerHTML = `
        <h3 class="text-sm font-bold text-slate-900 mb-6">Missed Study Time</h3>
        <div class="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <path class="text-rose-500" stroke-dasharray="65, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          </svg>
          <div class="absolute text-center">
            <span class="text-2xl font-extrabold text-slate-900 block tabular-nums">4.5h</span>
            <span class="text-[11px] font-medium text-slate-400">Behind</span>
          </div>
        </div>
        <div class="space-y-3 pt-6">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-600">Python</span>
              <span class="text-slate-800 font-mono">2h 30m</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-rose-500" style="width: 75%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-600">Web Tech</span>
              <span class="text-slate-800 font-mono">2h 00m</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-rose-400" style="width: 50%"></div>
            </div>
          </div>
        </div>
      `;
    } else {
      ringContainer.innerHTML = `
        <h3 class="text-sm font-bold text-slate-900 mb-6">Estimated Study Time</h3>
        <div class="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <path class="text-[#5551FF]" stroke-dasharray="70, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          </svg>
          <div class="absolute text-center">
            <span class="text-2xl font-extrabold text-slate-900 block tabular-nums">4.5</span>
            <span class="text-[11px] font-medium text-slate-400">Hours</span>
          </div>
        </div>
        <div class="space-y-3 pt-6">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-600">Data Structures</span>
              <span class="text-slate-800 font-mono">2h 30m</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-[#5551FF]" style="width: 60%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-600">Physics 101</span>
              <span class="text-slate-800 font-mono">2h 00m</span>
            </div>
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-emerald-500" style="width: 40%"></div>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (calloutContainer) {
    if (filter === 'overdue') {
      calloutContainer.innerHTML = `
        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-5 space-y-2">
          <h4 class="text-sm font-bold text-rose-900">Action Required!</h4>
          <p class="text-xs text-rose-700 leading-relaxed">
            You have 2 overdue tasks. Complete them today to stay on track with your weekly goals.
          </p>
        </div>
      `;
    } else if (filter === 'completed') {
      calloutContainer.innerHTML = `
        <div class="bg-[#5551FF] text-white rounded-2xl p-5 space-y-2 shadow-xs">
          <h4 class="text-sm font-bold">All caught up!</h4>
          <p class="text-xs text-indigo-100 leading-relaxed">
            Great job completing your tasks. You're ahead of your schedule for the week.
          </p>
        </div>
      `;
    } else {
      calloutContainer.innerHTML = `
        <div class="bg-[#5551FF] text-white rounded-2xl p-5 space-y-2 shadow-xs">
          <h4 class="text-sm font-bold">You're on track!</h4>
          <p class="text-xs text-indigo-100 leading-relaxed">
            Completing these tasks will keep you ahead of your weekly study goals.
          </p>
        </div>
      `;
    }
  }
}

export function toggleTaskCompletion(taskId) {
  const task = appState.tasks.find((t) => t.id === taskId);
  if (task) {
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      task.completedDate = 'Just now';
      task.isOverdue = false;
      showToast(`Completed: ${task.title}`, 'success');
    }
    saveState(appState);
    renderTasks(currentTaskFilter);
    renderDashboard();
  }
}

export function handleAddTask(e) {
  e.preventDefault();
  const title = document.getElementById('task-title-input')?.value.trim();
  const description = document.getElementById('task-desc-input')?.value.trim() || '';
  const subjectId = document.getElementById('task-subject-select')?.value;
  const dueDate = document.getElementById('task-due-input')?.value.trim() || 'Today, 11:59 PM';
  const priority = document.querySelector('input[name="task-priority"]:checked')?.value || 'medium';
  const minutes = Number(document.getElementById('task-mins-input')?.value) || 45;

  if (!title) return;

  const subject = appState.subjects.find((s) => s.id === subjectId) || appState.subjects[0];

  const newTask = {
    id: `tsk_${Date.now()}`,
    title,
    description,
    subjectId: subject.id,
    subjectName: subject.name,
    subjectColor: subject.color,
    dueDate,
    priority,
    estimatedMinutes: minutes,
    isCompleted: false
  };

  appState.tasks.unshift(newTask);
  saveState(appState);
  showToast(`Created task: ${title}`, 'success');
  closeModal('add-task-modal');
  renderTasks(currentTaskFilter);
  renderDashboard();

  const form = document.getElementById('add-task-form');
  if (form) form.reset();
}
