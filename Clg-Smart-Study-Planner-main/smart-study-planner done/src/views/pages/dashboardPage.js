/**
 * ============================================================================
 * DASHBOARD PAGE VIEW
 * ============================================================================
 * Academic executive overview: weekly target completion, subject progress cards,
 * schedule snapshot, urgent deadlines, and study statistics.
 */

export function getDashboardPageHTML() {
  return `
    <!-- 1. DASHBOARD VIEW -->
    <div id="view-dashboard" class="view-panel active">
      <div id="dashboard-container" class="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        <!-- Dynamic Dashboard rendered by renderDashboard() -->
      </div>
    </div>
  `;
}
