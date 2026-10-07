/**
 * ============================================================================
 * SUBJECTS PAGE VIEW
 * ============================================================================
 * Course list, credits breakdown, instructor details, syllabus tracking,
 * and individual subject action cards.
 */

export function getSubjectsPageHTML() {
  return `
    <!-- 2. SUBJECTS VIEW -->
    <div id="view-subjects" class="view-panel">
      <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Subjects</h1>
            <p class="text-xs text-slate-500 font-medium mt-1">Manage your academic workload and track progress.</p>
          </div>
          <button onclick="openModal('add-subject-modal')" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add Subject</span>
          </button>
        </div>
        <div id="subjects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  `;
}
