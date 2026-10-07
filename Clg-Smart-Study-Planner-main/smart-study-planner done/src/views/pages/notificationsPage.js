/**
 * ============================================================================
 * NOTIFICATIONS PAGE VIEW
 * ============================================================================
 * Alert feed, deadline notifications, mark as read, clear all actions,
 * and direct routing to settings.
 */

export function getNotificationsPageHTML() {
  return `
    <!-- 8. NOTIFICATIONS VIEW -->
    <div id="view-notifications" class="view-panel">
      <div class="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
          <div class="flex items-center gap-3">
            <button onclick="markAllNotificationsRead()" class="text-xs font-semibold text-[#5551FF] hover:underline flex items-center gap-1 cursor-pointer">
              <span>✓ Mark as Read</span>
            </button>
            <button onclick="switchView('settings')" class="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
              ⚙ Settings
            </button>
          </div>
        </div>

        <div id="notifications-list-container" class="space-y-3.5">
          <!-- Rendered by renderNotifications() -->
        </div>

        <div class="text-center pt-4">
          <button onclick="clearAllNotifications()" class="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer">
            Clear All Notifications
          </button>
        </div>
      </div>
    </div>
  `;
}
