/**
 * ============================================================================
 * SUBJECTS VIEW CONTROLLER
 * ============================================================================
 * Handles rendering the course subjects grid, progress bars, instructors,
 * and creating new subjects.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import { renderDashboard } from './dashboardController.js';

export function renderSubjects() {
  const container = document.getElementById('subjects-grid');
  if (!container) return;

  container.innerHTML = appState.subjects.map((sub) => {
    const total = sub.totalTasks || 1;
    const completed = sub.completedTasks || 0;
    const pct = Math.min(100, Math.round((completed / total) * 100));

    return `
      <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 flex flex-col justify-between hover:shadow-xs transition-shadow">
        <div>
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs font-bold text-base" style="background-color: ${sub.color}">
                ${sub.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900">${sub.name}</h3>
                <span class="text-xs font-semibold text-slate-400 font-mono">${sub.courseCode}</span>
              </div>
            </div>
            <button class="text-slate-400 hover:text-slate-600 p-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </div>

          <div class="flex items-center gap-2 mt-4 text-xs text-slate-600 font-medium">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>${sub.instructor}</span>
          </div>

          <div class="mt-5 space-y-1.5">
            <div class="flex items-center justify-between text-xs font-semibold">
              <span class="text-slate-500">Task Progress</span>
              <span class="text-slate-800 font-mono tabular-nums">${completed}/${total}</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all" style="width: ${pct}%; background-color: ${sub.color}"></div>
            </div>
          </div>

          <div class="mt-4 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>
            <span>${sub.nextMilestone.type}: <strong class="text-slate-900 font-semibold">${sub.nextMilestone.date}</strong></span>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
          <button onclick="showToast('Loading syllabus outline for ${sub.name}...')" class="flex-1 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 text-center transition-colors">
            View Details
          </button>
          <button onclick="openModal('add-subject-modal')" class="px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
            Edit
          </button>
        </div>
      </div>
    `;
  }).join('');
}

export function handleAddSubject(e) {
  e.preventDefault();
  const name = document.getElementById('subject-name-input')?.value.trim();
  const courseCode = document.getElementById('subject-code-input')?.value.trim() || 'CS100';
  const instructor = document.getElementById('subject-instructor-input')?.value.trim() || 'Faculty';
  const color = document.querySelector('input[name="subject-color"]:checked')?.value || '#4F46E5';

  if (!name) return;

  const newSubject = {
    id: `sub_${Date.now()}`,
    name,
    courseCode,
    instructor,
    color,
    icon: 'book',
    totalTasks: 0,
    completedTasks: 0,
    nextMilestone: { type: 'Midterm', date: 'TBA' }
  };

  appState.subjects.unshift(newSubject);
  saveState(appState);
  showToast(`Added subject: ${name}`, 'success');
  closeModal('add-subject-modal');
  renderSubjects();
  renderDashboard();

  const form = document.getElementById('add-subject-form');
  if (form) form.reset();
}
