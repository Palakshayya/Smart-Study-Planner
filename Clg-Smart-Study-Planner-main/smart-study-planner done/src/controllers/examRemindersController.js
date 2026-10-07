/**
 * ============================================================================
 * EXAM NOTIFICATION REMINDERS CONTROLLER
 * ============================================================================
 * Manages automated countdown reminders (e.g. 24h before, 1h before, 3d before)
 * for each exam. Provides modal management, instant test alert dispatch with
 * Web Audio API chime, and persistent storage.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { openModal } from '../utils/modal.js';
import { playNotificationChime } from '../utils/audio.js';
import { renderNotifications } from './notificationsController.js';
import { renderExams } from './examsController.js';

export let currentReminderExamId = 'exm_01';

export function openExamReminderModal(examId) {
  currentReminderExamId = examId;
  window.currentReminderExamId = examId;
  renderExamRemindersModal();
  openModal('exam-reminder-modal');
}

export function renderExamRemindersModal() {
  const exam = appState.exams.find((e) => e.id === currentReminderExamId) || appState.exams[0];
  if (!exam) return;

  const titleEl = document.getElementById('reminder-exam-title');
  const metaEl = document.getElementById('reminder-exam-meta');
  const badgeEl = document.getElementById('reminder-active-count-badge');
  const listEl = document.getElementById('reminder-items-list');

  if (titleEl) titleEl.textContent = exam.title;
  if (metaEl) metaEl.textContent = `${exam.examDate} · ${exam.examTime || '10:00 AM'} (${exam.daysLeft} Days Left)`;

  if (!Array.isArray(exam.reminders)) {
    exam.reminders = [];
  }

  const activeCount = exam.reminders.filter(r => r.enabled).length;
  if (badgeEl) {
    badgeEl.textContent = `${activeCount} Active`;
  }

  if (listEl) {
    if (exam.reminders.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p class="text-xs font-semibold text-slate-600">No reminders configured yet</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Click a quick preset or use the custom form below.</p>
        </div>
      `;
    } else {
      listEl.innerHTML = exam.reminders.map(rem => `
        <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between transition-all hover:border-slate-300">
          <div class="flex items-center gap-3 min-w-0">
            <input type="checkbox" onchange="toggleExamReminder('${exam.id}', '${rem.id}')" ${rem.enabled ? 'checked' : ''} class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF] cursor-pointer">
            <div class="min-w-0">
              <span class="text-xs font-bold block text-slate-800 ${rem.enabled ? '' : 'line-through text-slate-400'}">${rem.label}</span>
              <span class="text-[10px] text-slate-400 font-medium capitalize">Via ${rem.channel || 'in-app'}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="triggerTestExamNotification('${exam.id}', '${rem.label}')" class="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-[#5551FF] rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1">
              <span>🔔 Test</span>
            </button>
            <button type="button" onclick="deleteExamReminder('${exam.id}', '${rem.id}')" class="text-slate-400 hover:text-rose-600 p-1 font-bold text-xs" title="Delete">
              ✕
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

export function toggleExamReminder(examId, reminderId) {
  const exam = appState.exams.find(e => e.id === examId);
  if (!exam || !exam.reminders) return;
  const rem = exam.reminders.find(r => r.id === reminderId);
  if (rem) {
    rem.enabled = !rem.enabled;
    saveState(appState);
    renderExams();
    renderExamRemindersModal();
    showToast(`Reminder "${rem.label}" ${rem.enabled ? 'enabled' : 'paused'}`, 'info');
  }
}

export function deleteExamReminder(examId, reminderId) {
  const exam = appState.exams.find(e => e.id === examId);
  if (!exam || !exam.reminders) return;
  const idx = exam.reminders.findIndex(r => r.id === reminderId);
  if (idx !== -1) {
    const deleted = exam.reminders.splice(idx, 1)[0];
    saveState(appState);
    renderExams();
    renderExamRemindersModal();
    showToast(`Deleted reminder: ${deleted.label}`, 'info');
  }
}

export function applyReminderPreset(value, unit, label) {
  const numInput = document.getElementById('custom-remind-num');
  const unitSelect = document.getElementById('custom-remind-unit');
  if (numInput) numInput.value = value;
  if (unitSelect) unitSelect.value = unit;
  addCustomExamReminder(currentReminderExamId, value, unit, label, 'in-app');
}

export function handleCustomReminderSubmit(e) {
  e.preventDefault();
  const num = Number(document.getElementById('custom-remind-num')?.value) || 1;
  const unit = document.getElementById('custom-remind-unit')?.value || 'hours';
  const channel = document.getElementById('custom-remind-channel')?.value || 'in-app';

  let label = `${num} ${unit} before`;
  if (unit === 'hours' && num === 24) label = '24 hours before (1 day)';
  if (unit === 'hours' && num === 1) label = '1 hour before';
  if (unit === 'hours' && num === 48) label = '48 hours before (2 days)';
  if (unit === 'days' && num === 7) label = '1 week before';

  addCustomExamReminder(currentReminderExamId, num, unit, label, channel);
}

export function quickAddExamReminder(examId, value, unit, label) {
  addCustomExamReminder(examId, value, unit, label, 'in-app');
}

export function addCustomExamReminder(examId, value, unit, label, channel = 'in-app') {
  const exam = appState.exams.find(e => e.id === examId);
  if (!exam) return;
  if (!Array.isArray(exam.reminders)) exam.reminders = [];

  const existing = exam.reminders.find(r => r.label.toLowerCase() === label.toLowerCase());
  if (existing) {
    existing.enabled = true;
    showToast(`Reminder "${label}" is already configured and enabled!`, 'info');
  } else {
    let hours = value;
    if (unit === 'days') hours = value * 24;
    if (unit === 'minutes') hours = value / 60;

    const newRem = {
      id: `rem_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      hoursBefore: hours,
      value,
      unit,
      label,
      channel,
      enabled: true
    };

    exam.reminders.push(newRem);
    showToast(`Configured reminder: ${label}!`, 'success');
  }

  saveState(appState);
  renderExams();
  renderExamRemindersModal();
}

export function triggerTestExamNotification(examId, reminderLabel = '24 hours before') {
  const exam = appState.exams.find(e => e.id === examId) || appState.exams[0];
  if (!exam) return;

  playNotificationChime();

  const newNotif = {
    id: `notif_${Date.now()}`,
    title: `⏰ Upcoming Exam Alert: ${exam.title}`,
    message: `Reminder (${reminderLabel}): Your ${exam.subjectName || exam.title} exam is scheduled for ${exam.examDate} (${exam.daysLeft} days remaining). Be sure to review your preparation checklist!`,
    badgeText: 'Exam Alert',
    badgeType: 'urgent',
    timeAgo: 'Just now',
    isRead: false
  };

  appState.notifications.unshift(newNotif);
  saveState(appState);
  renderNotifications();

  showToast(`🔔 Reminder Alert: ${exam.title} is coming up (${reminderLabel})! Added to notification center.`, 'warning');
}
