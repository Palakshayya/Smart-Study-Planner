/**
 * ============================================================================
 * TASKS PAGE VIEW
 * ============================================================================
 * Assignment deadlines, study session queues, status filters (All, Today,
 * Upcoming, Completed, Overdue), and SVG progress ring.
 */

export function getTasksPageHTML() {
  return `
    <!-- 4. TASKS VIEW -->
    <div id="view-tasks" class="view-panel">
      <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
              <p class="text-xs text-slate-500 font-medium mt-1">Manage your assignments and study sessions.</p>
            </div>
            <button onclick="openModal('add-task-modal')" class="px-4 py-2.5 bg-[#5551FF] hover:bg-[#4338ca] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Task</span>
            </button>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="setTaskFilter('all')" data-filter="all" class="task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-[#5551FF] text-white shadow-xs cursor-pointer">All</button>
            <button onclick="setTaskFilter('today')" data-filter="today" class="task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Today</button>
            <button onclick="setTaskFilter('upcoming')" data-filter="upcoming" class="task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Upcoming</button>
            <button onclick="setTaskFilter('completed')" data-filter="completed" class="task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">Completed</button>
            <button onclick="setTaskFilter('overdue')" data-filter="overdue" class="task-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
              <span>⚠️</span> <span>Overdue</span>
            </button>
          </div>
        </div>

        <!-- Task List and Ring Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div id="tasks-list-container" class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-2xs divide-y divide-slate-100 overflow-hidden flex flex-col justify-between">
            <!-- Rendered by renderTasks() -->
          </div>

          <div class="space-y-6 flex flex-col">
            <div id="task-ring-container" class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-6">
              <!-- Rendered dynamically based on filter -->
            </div>
            <div id="task-callout-container">
              <!-- Callout box rendered dynamically -->
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
