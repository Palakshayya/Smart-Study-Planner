/**
 * ============================================================================
 * PROFILE PAGE VIEW
 * ============================================================================
 * Student profile details, avatar, enrollment status badges, GPA summary,
 * credit hours completion bar, and semester task metrics.
 */

export function getProfilePageHTML() {
  return `
    <!-- 9. PROFILE VIEW -->
    <div id="view-profile" class="view-panel">
      <div class="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Student Profile</h1>
          <p class="text-xs text-slate-500 font-medium mt-1">Manage your academic identity and track your overall progress.</p>
        </div>

        <!-- Profile Info Card -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <!-- Avatar with Photo Upload Trigger -->
            <div class="relative group cursor-pointer" onclick="triggerProfilePhotoUpload()" title="Click to upload/change photo">
              <div id="profile-main-avatar" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md ring-4 ring-slate-50 shrink-0 select-none transition-transform group-hover:scale-102">
                AM
              </div>
              <div class="absolute inset-0 rounded-full bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold gap-1 pointer-events-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Change</span>
              </div>
              <button type="button" onclick="event.stopPropagation(); triggerProfilePhotoUpload()" class="absolute -bottom-1 -right-1 w-7 h-7 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-full flex items-center justify-center shadow-md ring-2 ring-white cursor-pointer transition-transform hover:scale-110" title="Upload new photo">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </button>
            </div>

            <div>
              <div class="flex items-center gap-2">
                <h2 id="profile-view-name" class="text-xl font-bold text-slate-900">Alex Mercer</h2>
              </div>
              <p id="profile-view-major" class="text-sm font-semibold text-slate-600">Computer Science, B.S.</p>
              <p id="profile-view-inst" class="text-xs text-slate-400 mt-0.5">State University of Technology</p>
              
              <div class="flex flex-wrap items-center gap-2 mt-2.5">
                <button type="button" onclick="triggerProfilePhotoUpload()" class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
                  <svg class="w-3.5 h-3.5 text-[#5551FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                  <span>Upload Photo</span>
                </button>
                <button type="button" id="profile-remove-photo-btn" onclick="removeProfilePhoto()" class="hidden inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  <span>Remove Photo</span>
                </button>
              </div>

              <div class="flex flex-wrap gap-2 mt-2.5">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">Sophomore</span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700">Dean's List</span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">Enrolled</span>
              </div>
            </div>
          </div>
          <button onclick="openModal('edit-profile-modal')" class="px-4 py-2 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start md:self-auto cursor-pointer">
            <span>✏️ Edit Profile</span>
          </button>
        </div>

        <!-- Academic Standing Card -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-4">
          <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>⭐</span> <span>Academic Standing</span>
          </h3>
          <div class="flex items-baseline gap-2">
            <span class="text-4xl font-extrabold text-slate-900 tabular-nums">3.8</span>
            <span class="text-slate-400 text-sm font-semibold">/ 4.0 GPA</span>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold text-slate-500 mb-1">
              <span>Credits Earned</span>
              <span>78 / 120 (65%)</span>
            </div>
            <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div class="bg-[#5551FF] h-full rounded-full" style="width: 65%"></div>
            </div>
          </div>
        </div>

        <!-- Academic Summary -->
        <div>
          <h3 class="text-base font-bold text-slate-900 mb-4">Academic Summary</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl bg-blue-50 text-[#5551FF] flex items-center justify-center font-bold text-lg">📚</div>
              <div>
                <span class="text-xs text-slate-400 font-semibold block">Total Subjects</span>
                <span class="text-2xl font-extrabold text-slate-900 tabular-nums">5</span>
              </div>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">✓</div>
              <div>
                <span class="text-xs text-slate-400 font-semibold block">Tasks Completed</span>
                <span class="text-2xl font-extrabold text-slate-900 tabular-nums">142</span>
              </div>
            </div>
            <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">⏱</div>
              <div>
                <span class="text-xs text-slate-400 font-semibold block">Study Hours</span>
                <span class="text-2xl font-extrabold text-slate-900 tabular-nums">24.5 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
