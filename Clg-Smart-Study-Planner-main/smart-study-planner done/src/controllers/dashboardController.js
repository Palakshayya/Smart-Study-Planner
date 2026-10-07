/**
 * ============================================================================
 * DASHBOARD VIEW CONTROLLER
 * ============================================================================
 * Renders the primary academic dashboard, high-level summary KPI cards,
 * daily schedule preview, weekly study progress bar chart, and upcoming tasks.
 */

import { appState } from '../data/state.js';

export function renderDashboard() {
  const container = document.getElementById('dashboard-container');
  if (!container) return;

  const todayTasks = appState.tasks.filter((t) => !t.isCompleted).slice(0, 3);
  const upcomingExams = appState.exams.slice(0, 2);
  const activeGoal = appState.goals.find((g) => g.status === 'active');

  container.innerHTML = `
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">
            Good morning, ${appState.user.firstName}
          </h1>
          <span class="w-2.5 h-2.5 rounded-xs bg-[#5551FF]"></span>
        </div>
        <p class="text-xs text-slate-500 font-medium mt-1">
          Monday, Oct 23 <span class="mx-1">·</span>
          <span class="text-[#5551FF] font-semibold">You're 3 tasks away from your weekly goal!</span>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="openModal('add-task-modal')" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Add Task</span>
        </button>
        <button onclick="openModal('add-schedule-modal')" class="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 transition-colors">
          <svg class="w-4 h-4 text-[#5551FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>
          <span>Schedule Study</span>
        </button>
      </div>
    </div>

    <!-- 4 Metric Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
        <div class="flex items-center gap-2 text-slate-500 text-xs font-semibold">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke-width="2"/></svg>
          <span>Study Hours</span>
        </div>
        <div class="mt-3 sm:mt-4">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">4.5h</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
        <div class="flex items-center gap-2 text-slate-500 text-xs font-semibold">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Tasks Due</span>
        </div>
        <div class="mt-3 sm:mt-4">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">5</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
        <div class="flex items-center gap-2 text-slate-500 text-xs font-semibold">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
          <span>Upcoming Exams</span>
        </div>
        <div class="mt-3 sm:mt-4">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">2</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between gap-2 overflow-hidden">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
            <span class="w-2 h-2 rounded-full bg-[#5551FF] shrink-0"></span>
            <span class="truncate">Overall Progress</span>
          </div>
          <div class="mt-2 sm:mt-3">
            <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">68%</span>
          </div>
        </div>
        <div class="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path class="text-slate-100" stroke-width="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            <path class="text-[#5551FF]" stroke-dasharray="68, 100" stroke-width="4" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Main 2-Column Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <!-- Left Column (2 spans) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Today's Schedule Timeline -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-slate-900 font-bold text-base">
              <svg class="w-4 h-4 text-[#5551FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke-width="2"/></svg>
              <span>Today's Schedule</span>
            </div>
            <button onclick="switchView('schedule')" class="text-xs font-semibold text-[#5551FF] hover:underline">
              View Full Timetable →
            </button>
          </div>

          <div class="space-y-3.5">
            <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-[#4F46E5]"></span>
                <div>
                  <h4 class="text-sm font-bold text-slate-800">Data Structures</h4>
                  <p class="text-xs text-slate-400 font-medium">Lecture · Room 302</p>
                </div>
              </div>
              <span class="px-2.5 py-1 bg-slate-200/60 text-slate-700 rounded-lg text-xs font-mono font-bold">08:00</span>
            </div>

            <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></span>
                <div>
                  <h4 class="text-sm font-bold text-slate-800">DBMS</h4>
                  <p class="text-xs text-slate-400 font-medium">Lab Session · CS Lab 1</p>
                </div>
              </div>
              <span class="px-2.5 py-1 bg-slate-200/60 text-slate-700 rounded-lg text-xs font-mono font-bold">10:00</span>
            </div>

            <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-[#059669]"></span>
                <div>
                  <h4 class="text-sm font-bold text-slate-800">Python</h4>
                  <p class="text-xs text-slate-400 font-medium">Self Study · Library</p>
                </div>
              </div>
              <span class="px-2.5 py-1 bg-slate-200/60 text-slate-700 rounded-lg text-xs font-mono font-bold">14:00</span>
            </div>
          </div>
        </div>

        <!-- Weekly Progress Bar Chart -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div class="flex items-center gap-2 text-slate-900 font-bold text-base mb-6">
            <svg class="w-4 h-4 text-[#5551FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="4" stroke-width="2"/><line x1="6" y1="20" x2="6" y2="14" stroke-width="2"/></svg>
            <span>Weekly Progress</span>
          </div>

          <div class="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            ${[
              { day: 'Mon', h: '2.5h', pct: '38%' },
              { day: 'Tue', h: '3.8h', pct: '56%' },
              { day: 'Wed', h: '6.2h', pct: '92%', active: true },
              { day: 'Thu', h: '4.5h', pct: '68%' },
              { day: 'Fri', h: '1.0h', pct: '16%' },
              { day: 'Sat', h: '1.2h', pct: '18%' },
              { day: 'Sun', h: '1.5h', pct: '22%' }
            ].map(d => `
              <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span class="text-[11px] text-slate-400 font-mono">${d.h}</span>
                <div class="w-full bg-slate-100 rounded-lg h-32 flex items-end overflow-hidden">
                  <div class="w-full rounded-lg transition-all ${d.active ? 'bg-[#5551FF] shadow-xs' : 'bg-indigo-300'}" style="height: ${d.pct}"></div>
                </div>
                <span class="text-xs font-semibold ${d.active ? 'text-[#5551FF] font-bold' : 'text-slate-500'}">${d.day}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Today's Tasks -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-slate-900 font-bold text-base">
              <svg class="w-4 h-4 text-[#5551FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Today's Tasks</span>
            </div>
            <button onclick="switchView('tasks')" class="text-xs font-semibold text-[#5551FF] hover:underline">All Tasks →</button>
          </div>

          <div class="space-y-2.5">
            ${todayTasks.map(t => `
              <div onclick="toggleTaskCompletion('${t.id}')" class="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" ${t.isCompleted ? 'checked' : ''} class="mt-1 w-4 h-4 rounded text-[#5551FF] accent-[#5551FF]">
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-800 truncate ${t.isCompleted ? 'line-through text-slate-400' : ''}">${t.title}</p>
                  <span class="text-[10px] px-1.5 py-0.5 rounded font-semibold inline-block mt-1 ${t.priority === 'high' ? 'bg-rose-50 text-rose-700' : 'bg-purple-50 text-purple-700'}">
                    ${t.priority === 'high' ? 'High Priority' : 'Medium'}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Exams -->
        <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2 text-slate-900 font-bold text-base">
              <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>Upcoming Exams</span>
            </div>
            <button onclick="switchView('exams')" class="text-xs font-semibold text-[#5551FF] hover:underline">Plan Prep →</button>
          </div>

          <div class="space-y-3">
            ${upcomingExams.map((ex, i) => `
              <div class="p-3.5 rounded-xl border flex items-center justify-between ${i === 0 ? 'bg-rose-50/50 border-rose-100' : 'bg-blue-50/50 border-blue-100'}">
                <div>
                  <h4 class="text-xs font-bold text-slate-900">${ex.title}</h4>
                  <p class="text-[11px] text-slate-500 font-medium">${i === 0 ? 'Ch 1-5' : 'Comprehensive'}</p>
                </div>
                <div class="text-right">
                  <span class="text-base font-extrabold tabular-nums block ${i === 0 ? 'text-rose-600' : 'text-blue-600'}">${ex.daysLeft}</span>
                  <span class="text-[10px] uppercase font-bold text-slate-400">Days Left</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Active Goals -->
        ${activeGoal ? `
          <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2 text-slate-900 font-bold text-base">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                <span>Active Goals</span>
              </div>
              <button onclick="switchView('goals')" class="text-xs font-semibold text-[#5551FF] hover:underline">View Goals →</button>
            </div>

            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-bold text-slate-800">${activeGoal.title}</span>
                <span class="font-extrabold text-emerald-600 tabular-nums">${activeGoal.progressPercentage}%</span>
              </div>
              <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: ${activeGoal.progressPercentage}%"></div>
              </div>
              <p class="text-[11px] text-slate-400 font-medium mt-2">4 modules remaining</p>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
