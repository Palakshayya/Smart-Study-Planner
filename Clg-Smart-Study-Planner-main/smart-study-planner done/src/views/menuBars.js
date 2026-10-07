/**
 * ============================================================================
 * MENU BARS & NAVIGATION SHELL COMPONENT
 * ============================================================================
 * Contains the top presentation header, sub-view mode switcher, and the 
 * sidebar menu bar with student profile and navigation controls.
 */

export function getTopHeaderHTML() {
  return `
    <!-- Zone 1: Side Menu Button & Project Branding -->
    <div class="flex items-center gap-2.5 sm:gap-3">
      <button id="sidebar-toggle-btn" onclick="toggleSidebar()" class="group px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#5551FF] bg-slate-50 hover:bg-indigo-50/70 active:bg-indigo-100/70 border border-slate-200 hover:border-indigo-200 active:scale-95 transition-all flex items-center gap-2 font-semibold text-xs shadow-xs focus:outline-none focus:ring-2 focus:ring-[#5551FF]/30 cursor-pointer -ml-0.5 sm:-ml-1" title="Toggle Navigation Sidebar" aria-label="Toggle Side Menu">
        <svg class="w-4 h-4 text-slate-600 group-hover:text-[#5551FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        <span class="inline text-xs font-semibold">Menu</span>
      </button>

      <div onclick="switchMode('app')" class="flex items-center gap-2.5 cursor-pointer group py-0.5 select-none border-l border-slate-200/80 pl-2.5 sm:pl-3" title="Smart Study Planner - Go to Planner App">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5551FF] to-indigo-500 text-white flex items-center justify-center text-sm shadow-xs group-hover:scale-105 group-hover:shadow-indigo-500/25 transition-all shrink-0">
          🎓
        </div>
        <div class="flex flex-col items-start leading-none">
          <span class="text-xs sm:text-sm font-bold text-slate-900 tracking-tight group-hover:text-[#5551FF] transition-colors whitespace-nowrap leading-tight">Smart Study</span>
          <span class="text-[9px] font-extrabold text-[#5551FF] bg-[#5551FF]/10 px-1.5 py-0.5 rounded-md tracking-wider uppercase whitespace-nowrap leading-none mt-0.5">Planner</span>
        </div>
      </div>
    </div>

    <!-- Zone 2: Backend Developer Handbook & User Profile Icon -->
    <div class="flex items-center gap-2">
      <button onclick="openModal('backend-guide-modal')" class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#5551FF] bg-[#5551FF]/10 hover:bg-[#5551FF]/15 border border-[#5551FF]/20 rounded-lg transition-colors cursor-pointer">
        <span>👨‍💻 Backend API Docs</span>
      </button>

      <!-- Top Header User Profile Icon -->
      <div onclick="switchView('profile')" class="flex items-center gap-2 py-1 px-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-all select-none group" title="View Profile">
        <div id="header-avatar" class="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
          AM
        </div>
        <span id="header-user-name" class="text-xs font-semibold text-slate-700 group-hover:text-[#5551FF] transition-colors pr-1.5 hidden sm:inline">Alex</span>
      </div>
    </div>
  `;
}

export function getSidebarHTML() {
  return `
    <div class="p-3 pt-3">
      <!-- Mobile Close Header -->
      <div class="flex items-center justify-between px-2 pb-2 md:hidden">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</span>
        <button onclick="toggleSidebar()" class="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer" title="Close Side Menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Main Nav Links -->
      <nav class="space-y-1">
        <button onclick="switchView('dashboard')" data-view="dashboard" class="nav-item active w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
          </div>
        </button>

        <button onclick="switchView('subjects')" data-view="subjects" class="nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            <span>Subjects</span>
          </div>
        </button>

        <button onclick="switchView('schedule')" data-view="schedule" class="nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/></svg>
            <span>Schedule</span>
          </div>
        </button>

        <button onclick="switchView('tasks')" data-view="tasks" class="nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Tasks</span>
          </div>
        </button>

        <button onclick="switchView('exams')" data-view="exams" class="nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 10v6M2 10l10-5 10 5-10 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span>Exams</span>
          </div>
        </button>

        <button onclick="switchView('goals')" data-view="goals" class="nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            <span>Goals</span>
          </div>
        </button>

        <button onclick="switchView('progress')" data-view="progress" class="nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            <span>Progress</span>
          </div>
        </button>
      </nav>
    </div>

    <!-- Bottom Navigation & User Profile -->
    <div class="p-3 border-t border-slate-100 space-y-1">
      <button onclick="switchView('notifications')" data-view="notifications" class="nav-item w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
        <div class="flex items-center gap-2.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span>Notifications</span>
        </div>
        <span id="unread-notif-count" class="text-xs px-2 py-0.5 rounded-full font-bold tabular-nums bg-rose-50 text-rose-600">3</span>
      </button>

      <button onclick="switchView('settings')" data-view="settings" class="nav-item w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer">
        <div class="flex items-center gap-2.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>Settings</span>
        </div>
      </button>

      <!-- Student Profile Mini Card -->
      <div onclick="switchView('profile')" class="mt-2 pt-2.5 border-t border-slate-100 flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group select-none" title="View Student Profile">
        <div id="sidebar-avatar" class="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs ring-2 ring-white shrink-0 group-hover:ring-indigo-200 transition-all">
          AM
        </div>
        <div class="min-w-0 flex-1">
          <div id="sidebar-user-name" class="text-xs font-bold text-slate-800 truncate group-hover:text-[#5551FF] transition-colors leading-tight">Alex Mercer</div>
          <p id="sidebar-user-detail" class="text-[10px] text-slate-400 font-medium truncate mt-0.5">Computer Science · Yr 2</p>
        </div>
        <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-[#5551FF] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </div>
    </div>
  `;
}

export function initMenuBars() {
  const topHeader = document.getElementById('main-header');
  if (topHeader) {
    topHeader.innerHTML = getTopHeaderHTML();
  }

  const sidebar = document.getElementById('app-sidebar');
  if (sidebar) {
    sidebar.innerHTML = getSidebarHTML();
  }

  if (typeof window.renderAllAvatars === 'function') {
    window.renderAllAvatars();
  }
}
