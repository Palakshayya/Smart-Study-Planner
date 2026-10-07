/**
 * ============================================================================
 * EXAMS PAGE VIEW
 * ============================================================================
 * Academic exam preparation dashboard: featured countdown exam, priority metrics,
 * revision checklists, syllabus completion, and upcoming exams timeline.
 */

export function getExamsPageHTML() {
  return `
    <!-- 5. EXAMS VIEW -->
    <div id="view-exams" class="view-panel">
      <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Exam Preparation</h1>
            <p class="text-xs text-slate-500 font-medium mt-1">Focus on your upcoming milestones.</p>
          </div>
          <button onclick="openModal('create-exam-modal')" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Exam Plan</span>
          </button>
        </div>

        <!-- Exam Preparation Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div id="featured-exam-container" class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 sm:p-8 space-y-6">
            <!-- Rendered by renderExams() -->
          </div>

          <div class="space-y-6 flex flex-col">
            <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 class="text-sm font-bold text-slate-900">Upcoming Timeline</h3>
                <span class="text-[11px] font-semibold text-slate-400">Roadmap</span>
              </div>
              <div id="upcoming-exams-timeline" class="space-y-3.5">
                <!-- Rendered by renderExams() -->
              </div>
            </div>

            <div class="relative rounded-2xl overflow-hidden shadow-2xs border border-slate-200 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 p-6 text-white min-h-[140px] flex flex-col justify-end">
              <span class="text-xs font-semibold text-indigo-300 uppercase tracking-wider block mb-1">Mindset Focus</span>
              <h4 class="text-xl font-bold tracking-tight">Stay consistent.</h4>
              <p class="text-xs text-slate-300 mt-1">Daily 25-minute sprints compound into semester honors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
