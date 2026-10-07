/**
 * ============================================================================
 * PROGRESS & ANALYTICS PAGE VIEW
 * ============================================================================
 * Academic metrics, GPA circular gauge, task completion rate, GitHub-style
 * study consistency streak heatmap, and subject progress breakdown bars.
 */

export function getProgressPageHTML() {
  return `
    <!-- 7. PROGRESS VIEW -->
    <div id="view-progress" class="view-panel">
      <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Progress Overview</h1>
          <p class="text-xs text-slate-500 font-medium mt-1">Track your academic performance and study habits.</p>
        </div>

        <!-- Top 3 Metric Cards (Matching Progress - Smart Study Planner.png) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Overall Standing -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900">Overall Standing</h3>
            <div class="flex items-center justify-center py-2">
              <div class="relative w-32 h-32 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="text-[#5551FF]" stroke-dasharray="82, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="absolute text-center">
                  <span class="text-2xl font-extrabold text-slate-900 block tabular-nums">82%</span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">A- Average</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center text-xs font-medium pt-2 border-t border-slate-100 text-slate-500">
              <span>Target: 85%</span>
              <span class="text-emerald-600 font-bold">+2% this week</span>
            </div>
          </div>

          <!-- Task Completion -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-5">
            <h3 class="text-sm font-bold text-slate-900">Task Completion</h3>
            <div class="space-y-3 pt-2">
              <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</div>
                <div>
                  <span class="text-xl font-extrabold text-slate-900 tabular-nums">48</span>
                  <span class="text-xs text-slate-400 block font-medium">Completed</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-bold">⏱</div>
                <div>
                  <span class="text-xl font-extrabold text-slate-900 tabular-nums">12</span>
                  <span class="text-xs text-slate-400 block font-medium">Pending</span>
                </div>
              </div>
            </div>
            <div class="pt-3 border-t border-slate-100">
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 80%"></div>
              </div>
              <span class="text-xs text-slate-500 font-semibold block text-center">80% Completion Rate</span>
            </div>
          </div>

          <!-- Study Consistency (GitHub Style Heatmap) -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-900">Study Consistency</h3>
              <span class="text-[11px] px-2 py-0.5 rounded-full font-bold bg-purple-50 text-[#5551FF]">🔥 14 Day Streak</span>
            </div>
            
            <div class="pt-2">
              <div class="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 px-1">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
              <!-- Grid Squares -->
              <div class="grid grid-cols-7 gap-1.5">
                <div class="h-6 rounded bg-indigo-100"></div>
                <div class="h-6 rounded bg-indigo-300"></div>
                <div class="h-6 rounded bg-indigo-400"></div>
                <div class="h-6 rounded bg-indigo-200"></div>
                <div class="h-6 rounded bg-[#5551FF] text-white text-[10px] flex items-center justify-center font-bold">★</div>
                <div class="h-6 rounded bg-indigo-50"></div>
                <div class="h-6 rounded bg-indigo-100"></div>

                <div class="h-6 rounded bg-indigo-400"></div>
                <div class="h-6 rounded bg-indigo-300"></div>
                <div class="h-6 rounded bg-[#5551FF]"></div>
                <div class="h-6 rounded bg-indigo-200"></div>
                <div class="h-6 rounded border-2 border-dashed border-[#5551FF]/40 bg-indigo-50"></div>
                <div class="h-6 rounded bg-slate-100"></div>
                <div class="h-6 rounded bg-slate-100"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-4">
                <span>Less</span>
                <div class="flex gap-1">
                  <span class="w-2.5 h-2.5 rounded bg-indigo-100"></span>
                  <span class="w-2.5 h-2.5 rounded bg-indigo-200"></span>
                  <span class="w-2.5 h-2.5 rounded bg-indigo-400"></span>
                  <span class="w-2.5 h-2.5 rounded bg-[#5551FF]"></span>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Subject Progress Bar List (Matching Frame 2.png) -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-900">Subject Progress</h3>
            <button class="text-xs font-semibold text-[#5551FF] hover:underline cursor-pointer">View All</button>
          </div>

          <div class="space-y-5">
            <div>
              <div class="flex justify-between text-xs font-semibold mb-1.5">
                <div><span class="text-slate-900 font-bold block">Advanced Calculus</span><span class="text-[11px] text-slate-400 font-normal">Midterm Prep</span></div>
                <span class="text-slate-800 font-mono">85%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-[#5551FF] h-full rounded-full" style="width: 85%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1.5">
                <div><span class="text-slate-900 font-bold block">Organic Chemistry</span><span class="text-[11px] text-slate-400 font-normal">Lab Reports</span></div>
                <span class="text-slate-800 font-mono">60%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 60%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs font-semibold mb-1.5">
                <div><span class="text-slate-900 font-bold block">World History</span><span class="text-[11px] text-slate-400 font-normal">Final Essay</span></div>
                <span class="text-slate-800 font-mono">30%</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div class="bg-rose-500 h-full rounded-full" style="width: 30%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
