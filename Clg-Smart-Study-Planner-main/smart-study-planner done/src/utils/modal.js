/**
 * ============================================================================
 * MODAL MANAGEMENT UTILITY
 * ============================================================================
 * Handles opening, closing, focus trap, and auto-population of modal inputs
 * based on current application state.
 */

import { appState } from '../data/state.js';

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove('hidden');

  // Pre-populate dropdowns dynamically
  if (modalId === 'add-task-modal') {
    const select = document.getElementById('task-subject-select');
    if (select) {
      select.innerHTML = appState.subjects.map(s => `<option value="${s.id}">${s.name} (${s.courseCode})</option>`).join('');
    }
  }

  if (modalId === 'add-schedule-modal') {
    const select = document.getElementById('schedule-subject-select');
    if (select) {
      select.innerHTML = appState.subjects.map(s => `<option value="${s.id}">${s.name} (${s.courseCode})</option>`).join('');
    }
  }

  if (modalId === 'create-exam-modal') {
    const select = document.getElementById('exam-subject-select');
    if (select) {
      select.innerHTML = appState.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    }
  }

  if (modalId === 'edit-profile-modal') {
    const fn = document.getElementById('edit-first-name');
    const ln = document.getElementById('edit-last-name');
    const em = document.getElementById('edit-email');
    const bio = document.getElementById('edit-bio');
    const inst = document.getElementById('edit-inst');
    const maj = document.getElementById('edit-major');
    const yr = document.getElementById('edit-year');

    if (fn) fn.value = appState.user.firstName || '';
    if (ln) ln.value = appState.user.lastName || '';
    if (em) em.value = appState.user.email || '';
    if (bio) bio.value = appState.user.bio || '';
    if (inst) inst.value = appState.user.institution || '';
    if (maj) maj.value = appState.user.major || '';
    if (yr) yr.value = appState.user.currentYear || '';

    if (typeof window.renderAllAvatars === 'function') {
      window.renderAllAvatars();
    }
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Escape key listener to close active modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModals = document.querySelectorAll('.fixed:not(.hidden)');
    activeModals.forEach((modal) => {
      if (modal.id && modal.id.includes('modal')) {
        closeModal(modal.id);
      }
    });
  }
});
