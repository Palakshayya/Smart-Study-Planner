/**
 * ============================================================================
 * EXAMS VIEW CONTROLLER
 * ============================================================================
 * Manages exam roadmap cards, preparation score gauges, topic checklists,
 * practice test summaries, and creation of new exams.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { closeModal } from '../utils/modal.js';
import {
  openExamReminderModal,
  toggleExamReminder,
  deleteExamReminder,
  quickAddExamReminder,
  triggerTestExamNotification
} from './examRemindersController.js';

export let examTopicsList = ['SQL Fundamentals', 'Normalization Forms'];

export function renderExams() {
  const container = document.getElementById('featured-exam-container');
  const timelineContainer = document.getElementById('upcoming-exams-timeline');
  if (!container) return;

  const featured = appState.exams.find((e) => e.isFeatured) || appState.exams[0];
  const others = appState.exams.filter((e) => e.id !== featured.id);

  if (!Array.isArray(featured.reminders)) {
    featured.reminders = [];
  }
  const activeReminders = featured.reminders.filter(r => r.enabled);
  const activeRemindersCount = activeReminders.length;

  container.innerHTML = `
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#5551FF] flex items-center justify-center font-bold text-lg">
          🗄️
        </div>
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">${featured.title}</h2>
          <p class="text-xs text-slate-400 font-semibold mt-0.5">${featured.examDate} · ${featured.examTime || '10:00 AM'}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-5 py-3 rounded-2xl bg-[#5551FF] text-white text-center shadow-xs">
          <span class="text-2xl font-extrabold block tabular-nums leading-none">${featured.daysLeft}</span>
          <span class="text-[10px] font-bold uppercase tracking-wider opacity-90">Days Left</span>
        </div>
      </div>
    </div>

    <!-- Exam Score & Topic Breakdown Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100 mt-6">
      <div class="space-y-6">
        <div class="flex items-center gap-5">
          <div class="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              <path class="text-[#5551FF]" stroke-dasharray="${featured.preparationScore}, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            </svg>
            <span class="absolute text-lg font-extrabold text-slate-900 tabular-nums">${featured.preparationScore}%</span>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">Preparation Score</h3>
            <p class="text-xs text-slate-500 font-medium mt-1">You are on track. Keep up the consistent study habits.</p>
          </div>
        </div>

        <div>
          <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Practice Tests</h4>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
              <span class="text-[11px] text-slate-500 font-medium block">Completed</span>
              <span class="text-lg font-extrabold text-[#5551FF] font-mono">${featured.practiceTestsCompleted} / ${featured.practiceTestsTotal}</span>
            </div>
            <div class="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
              <span class="text-[11px] text-slate-500 font-medium block">Avg. Score</span>
              <span class="text-lg font-extrabold text-emerald-600 font-mono">${featured.practiceTestAvgScore}%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Topic Breakdown</h4>
          <span class="text-[11px] font-bold text-slate-400">${(featured.topics || []).length} Topics</span>
        </div>
        <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
          ${(featured.topics || []).map(top => `
            <div onclick="toggleExamTopic('${featured.id}', '${top.id}')" class="p-2.5 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${top.isActive ? 'bg-blue-50/70 border-blue-200 text-slate-900' : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'}">
              <div class="flex items-center gap-2.5">
                <input type="checkbox" ${top.isCompleted ? 'checked' : ''} class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF]">
                <span class="text-xs font-semibold ${top.isCompleted ? 'line-through text-slate-400' : ''}">${top.title}</span>
              </div>
              ${top.isActive ? '<span class="px-2 py-0.5 bg-[#5551FF] text-white rounded-md text-[10px] font-bold">Active</span>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- NOTIFICATION REMINDERS SECTION -->
    <div class="pt-6 border-t border-slate-100 mt-6 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-1.5 rounded-lg bg-indigo-50 text-[#5551FF]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </span>
            <h3 class="text-sm font-bold text-slate-900">Custom Notification Reminders</h3>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${activeRemindersCount > 0 ? 'bg-indigo-50 text-[#5551FF]' : 'bg-slate-100 text-slate-500'}">
              ${activeRemindersCount} Active
            </span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">Automated countdown alerts dispatched before this exam commences.</p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="triggerTestExamNotification('${featured.id}')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors" title="Simulate a real-time notification alert right now">
            <span>🔔 Test Alert</span>
          </button>
          <button onclick="openExamReminderModal('${featured.id}')" class="px-3.5 py-1.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>+ Set Reminder</span>
          </button>
        </div>
      </div>

      <!-- Configured Reminders Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        ${featured.reminders.length === 0 ? `
          <div class="col-span-full p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            No reminders configured. Choose a quick preset below or click "+ Set Reminder".
          </div>
        ` : featured.reminders.map(rem => `
          <div class="p-3 rounded-xl border flex items-center justify-between transition-all ${rem.enabled ? 'bg-indigo-50/50 border-indigo-200 text-slate-900 shadow-2xs' : 'bg-slate-50/70 border-slate-200 text-slate-400'}">
            <div class="flex items-center gap-2.5 min-w-0">
              <input type="checkbox" onchange="toggleExamReminder('${featured.id}', '${rem.id}')" ${rem.enabled ? 'checked' : ''} class="w-4 h-4 rounded text-[#5551FF] accent-[#5551FF] cursor-pointer">
              <div class="min-w-0">
                <span class="text-xs font-bold block truncate ${rem.enabled ? 'text-slate-900' : 'line-through text-slate-400'}">${rem.label}</span>
                <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">${rem.channel || 'in-app'}</span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="triggerTestExamNotification('${featured.id}', '${rem.label}')" class="text-slate-400 hover:text-[#5551FF] p-1 text-xs" title="Test Alert">
                🔔
              </button>
              <button onclick="deleteExamReminder('${featured.id}', '${rem.id}')" class="text-slate-400 hover:text-rose-500 p-1 font-bold text-xs" title="Remove reminder">
                ✕
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Fast Preset Quick-Add Bar -->
      <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
        <span class="font-bold text-slate-600">Quick Add:</span>
        <button onclick="quickAddExamReminder('${featured.id}', 1, 'hours', '1 hour before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-semibold transition-colors">+ 1h before</button>
        <button onclick="quickAddExamReminder('${featured.id}', 24, 'hours', '24 hours before (1 day)')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-semibold transition-colors">+ 24h before</button>
        <button onclick="quickAddExamReminder('${featured.id}', 48, 'hours', '48 hours before (2 days)')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-semibold transition-colors">+ 48h before</button>
        <button onclick="quickAddExamReminder('${featured.id}', 168, 'days', '1 week before')" class="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-[#5551FF] hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-700 font-semibold transition-colors">+ 1 week before</button>
      </div>
    </div>
  `;

  if (timelineContainer) {
    timelineContainer.innerHTML = others.map((ex, i) => {
      const activeCount = (ex.reminders || []).filter(r => r.enabled).length;
      return `
      <div class="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3 hover:shadow-2xs transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-sm font-bold text-slate-900">${ex.title}</h4>
            <p class="text-[11px] text-slate-400 font-medium">${ex.statusTag || 'Upcoming'} · ${ex.examDate}</p>
          </div>
          <div class="text-center px-2 py-1 bg-white border border-slate-200 rounded-lg">
            <span class="text-xs font-extrabold text-slate-900 block tabular-nums">${ex.daysLeft}</span>
            <span class="text-[9px] uppercase font-bold text-slate-400">Days</span>
          </div>
        </div>
        <div class="space-y-1">
          <div class="flex justify-between text-[11px] font-semibold text-slate-500">
            <span>Preparation</span>
            <span class="tabular-nums font-mono">${ex.preparationScore}%</span>
          </div>
          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div class="h-full rounded-full ${i === 0 ? 'bg-[#5551FF]' : 'bg-emerald-500'}" style="width: ${ex.preparationScore}%"></div>
          </div>
        </div>

        <div class="pt-2 border-t border-slate-200/60 flex items-center justify-between">
          <button onclick="openExamReminderModal('${ex.id}')" class="text-xs font-semibold text-[#5551FF] hover:underline flex items-center gap-1.5">
            <span>🔔</span> <span>${activeCount > 0 ? `${activeCount} Reminders` : '+ Reminder'}</span>
          </button>
          <button onclick="setFeaturedExam('${ex.id}')" class="text-[11px] font-medium text-slate-500 hover:text-slate-800">
            Focus Roadmap →
          </button>
        </div>
      </div>
      `;
    }).join('');
  }
}

export function setFeaturedExam(examId) {
  appState.exams.forEach(e => {
    e.isFeatured = (e.id === examId);
  });
  saveState(appState);
  renderExams();
  showToast('Switched active roadmap focus', 'info');
}

export function toggleExamTopic(examId, topicId) {
  const exam = appState.exams.find((e) => e.id === examId);
  if (exam) {
    const topic = exam.topics.find((t) => t.id === topicId);
    if (topic) {
      topic.isCompleted = !topic.isCompleted;
      const completedCount = exam.topics.filter((t) => t.isCompleted).length;
      exam.preparationScore = Math.round((completedCount / exam.topics.length) * 100);
      saveState(appState);
      renderExams();
    }
  }
}

export function addTopicToExamList() {
  const input = document.getElementById('exam-topic-input');
  if (input && input.value.trim()) {
    examTopicsList.push(input.value.trim());
    input.value = '';
    renderExamTopicsList();
  }
}

export function removeTopicFromExamList(idx) {
  examTopicsList.splice(idx, 1);
  renderExamTopicsList();
}

export function renderExamTopicsList() {
  const container = document.getElementById('exam-topics-container');
  if (!container) return;
  container.innerHTML = examTopicsList.map((top, idx) => `
    <div class="flex items-center justify-between p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-xl text-xs">
      <span class="font-medium text-slate-700">::: ${top}</span>
      <button type="button" onclick="removeTopicFromExamList(${idx})" class="text-slate-400 hover:text-red-500 font-bold p-1">✕</button>
    </div>
  `).join('');
}

export function handleCreateExam(e) {
  e.preventDefault();
  const name = document.getElementById('exam-name-input')?.value.trim();
  const subjectId = document.getElementById('exam-subject-select')?.value;
  const targetScore = Number(document.getElementById('exam-target-score')?.value) || 90;

  if (!name) return;
  const subject = appState.subjects.find((s) => s.id === subjectId) || appState.subjects[0];

  // Collect configured notification reminders
  const initialReminders = [];
  if (document.getElementById('exam-remind-24h')?.checked) {
    initialReminders.push({
      id: `rem_${Date.now()}_24h`,
      hoursBefore: 24,
      label: '24 hours before (1 day)',
      unit: 'hours',
      value: 24,
      channel: 'in-app',
      enabled: true
    });
  }
  if (document.getElementById('exam-remind-1h')?.checked) {
    initialReminders.push({
      id: `rem_${Date.now()}_1h`,
      hoursBefore: 1,
      label: '1 hour before',
      unit: 'hours',
      value: 1,
      channel: 'in-app',
      enabled: true
    });
  }
  if (document.getElementById('exam-remind-3d')?.checked) {
    initialReminders.push({
      id: `rem_${Date.now()}_3d`,
      hoursBefore: 72,
      label: '3 days before',
      unit: 'days',
      value: 3,
      channel: 'in-app',
      enabled: true
    });
  }
  if (document.getElementById('exam-remind-1w')?.checked) {
    initialReminders.push({
      id: `rem_${Date.now()}_1w`,
      hoursBefore: 168,
      label: '1 week before',
      unit: 'days',
      value: 7,
      channel: 'in-app',
      enabled: true
    });
  }
  const customVal = Number(document.getElementById('exam-custom-remind-val')?.value);
  const customUnit = document.getElementById('exam-custom-remind-unit')?.value || 'hours';
  if (customVal && customVal > 0) {
    let hours = customVal;
    if (customUnit === 'days') hours = customVal * 24;
    if (customUnit === 'minutes') hours = customVal / 60;
    initialReminders.push({
      id: `rem_${Date.now()}_custom`,
      hoursBefore: hours,
      label: `${customVal} ${customUnit} before`,
      unit: customUnit,
      value: customVal,
      channel: 'in-app',
      enabled: true
    });
  }

  const newExam = {
    id: `exm_${Date.now()}`,
    title: name,
    subjectName: subject.name,
    examDate: 'NOV 20, 2023',
    examTime: '10:00 AM',
    daysLeft: 22,
    preparationScore: 0,
    statusTag: 'Upcoming',
    targetScore,
    practiceTestsCompleted: 0,
    practiceTestsTotal: 4,
    practiceTestAvgScore: 0,
    reminders: initialReminders,
    topics: examTopicsList.map((t, i) => ({
      id: `top_${Date.now()}_${i}`,
      title: t,
      isCompleted: false,
      isActive: i === 0
    }))
  };

  appState.exams.unshift(newExam);
  saveState(appState);
  showToast(`Exam roadmap created: ${name} with ${initialReminders.length} reminder(s)!`, 'success');
  closeModal('create-exam-modal');
  renderExams();

  const form = document.getElementById('create-exam-form');
  if (form) form.reset();
}
