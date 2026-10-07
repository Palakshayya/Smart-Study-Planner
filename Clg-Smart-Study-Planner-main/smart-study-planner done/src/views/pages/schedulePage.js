/**
 * ============================================================================
 * SCHEDULE PAGE VIEW
 * ============================================================================
 * Responsive weekly study timetable, daily agenda, and monthly overview.
 * Features dynamic date navigation, multi-mode view switcher, and zero-overflow
 * timetable layout with interactive study sessions.
 */

export function getSchedulePageHTML() {
  return `
    <!-- 3. SCHEDULE VIEW -->
    <div id="view-schedule" class="view-panel">
      <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Schedule</h1>
            <p class="text-xs text-slate-500 font-medium mt-1">Manage your study timetable and upcoming sessions.</p>
          </div>
          <button onclick="openModal('add-schedule-modal')" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Schedule Study</span>
          </button>
        </div>

        <!-- Timetable & Right Panel Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <!-- Main Timetable Card (Responsive, Zero-Overflow) -->
          <div class="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 sm:p-6 overflow-hidden">
            <!-- Calendar Navigation & View Mode Switcher -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2 sm:gap-3">
                <button onclick="navigateSchedule('prev')" class="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center font-bold text-base cursor-pointer" title="Previous">
                  ‹
                </button>
                <h2 id="schedule-month-title" class="text-base font-bold text-slate-900 min-w-[140px] text-center sm:text-left select-none">
                  October 2023
                </h2>
                <button onclick="navigateSchedule('next')" class="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center font-bold text-base cursor-pointer" title="Next">
                  ›
                </button>
              </div>

              <!-- Day / Week / Month View Switcher -->
              <div class="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto select-none">
                <button id="schedule-view-day-btn" onclick="setScheduleView('day')" class="px-3 py-1 text-slate-500 hover:text-slate-900 rounded-md transition-colors cursor-pointer">
                  Day
                </button>
                <button id="schedule-view-week-btn" onclick="setScheduleView('week')" class="px-3 py-1 bg-white text-slate-900 shadow-2xs rounded-md transition-all cursor-pointer">
                  Week
                </button>
                <button id="schedule-view-month-btn" onclick="setScheduleView('month')" class="px-3 py-1 text-slate-500 hover:text-slate-900 rounded-md transition-colors cursor-pointer">
                  Month
                </button>
              </div>
            </div>

            <!-- Main Timetable Content (Rendered by scheduleController.js) -->
            <div id="schedule-main-content" class="w-full mt-4">
              <!-- Dynamically rendered Week / Day / Month view -->
            </div>
          </div>

          <!-- Right Sidebar Panel -->
          <div class="space-y-6">
            <!-- Mini Calendar Widget -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-sm font-bold text-slate-900">Mini Calendar</h3>
                <span class="text-[10px] font-semibold text-slate-400">Click a day</span>
              </div>
              
              <div class="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                <div class="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-2">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
                <div id="mini-calendar-days" class="grid grid-cols-7 text-center gap-1">
                  <!-- Dynamically rendered days -->
                </div>
              </div>
            </div>

            <!-- Upcoming Study Sessions -->
            <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-slate-900">Upcoming</h3>
                <button onclick="setScheduleView('day')" class="text-xs font-semibold text-[#5551FF] hover:underline cursor-pointer">View Agenda</button>
              </div>
              
              <div id="schedule-upcoming-list" class="space-y-3">
                <!-- Dynamically rendered from appState.schedule -->
              </div>

              <button onclick="syncCalendarSchedule()" class="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <span>↻ Sync Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
