/**
 * ============================================================================
 * GOALS PAGE VIEW
 * ============================================================================
 * Academic targets, GPA benchmarks, milestone progress tracking, status filters
 * (All, Active, Completed, Archived), and goal card actions.
 */

export function getGoalsPageHTML() {
  return `
    <!-- 6. GOALS VIEW -->
    <div id="view-goals" class="view-panel">
      <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Goals</h1>
            <p class="text-xs text-slate-500 font-medium mt-1">Track and manage your academic objectives.</p>
          </div>
          <button onclick="openModal('create-goal-modal')" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Create Goal</span>
          </button>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2">
          <button onclick="setGoalFilter('all')" data-filter="all" class="goal-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">All Goals (5)</button>
          <button onclick="setGoalFilter('active')" data-filter="active" class="goal-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#5551FF] text-white shadow-xs cursor-pointer">Active (3)</button>
          <button onclick="setGoalFilter('completed')" data-filter="completed" class="goal-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Completed (2)</button>
          <button onclick="setGoalFilter('archived')" data-filter="archived" class="goal-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Archived</button>
        </div>

        <div id="goals-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Rendered by renderGoals() -->
        </div>
      </div>
    </div>
  `;
}
