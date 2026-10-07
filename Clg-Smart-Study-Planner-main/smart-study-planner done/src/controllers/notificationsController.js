/**
 * ============================================================================
 * NOTIFICATIONS VIEW CONTROLLER
 * ============================================================================
 * Manages the student notification center, urgent exam alert badges,
 * marking all as read, and clearing notifications.
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';

export function renderNotifications() {
  const container = document.getElementById('notifications-list-container');
  const countBadge = document.getElementById('unread-notif-count');
  if (!container) return;

  const unreadCount = appState.notifications.filter((n) => !n.isRead).length;
  if (countBadge) {
    if (unreadCount > 0) {
      countBadge.textContent = unreadCount;
      countBadge.classList.remove('hidden');
    } else {
      countBadge.classList.add('hidden');
    }
  }

  if (appState.notifications.length === 0) {
    container.innerHTML = `
      <div class="p-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100 shadow-2xs">
        <div class="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3 text-xl">
          🔔
        </div>
        <p class="text-base font-bold text-slate-700">No notifications</p>
        <p class="text-xs text-slate-400 mt-1">You are completely up to date with lectures and deadlines!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.notifications.map((n) => `
    <div class="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 flex items-start gap-4 hover:shadow-xs transition-shadow">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        n.badgeType === 'urgent' ? 'bg-rose-50 text-rose-600' :
        n.badgeType === 'warning' ? 'bg-purple-50 text-purple-600' :
        n.badgeType === 'info' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
      }">
        ${n.badgeType === 'urgent' ? '📝' : n.badgeType === 'warning' ? '📄' : n.badgeType === 'info' ? '👥' : '✓'}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-900">${n.title}</h3>
          <span class="text-xs text-slate-400 font-medium">${n.timeAgo}</span>
        </div>
        <p class="text-xs text-slate-500 mt-1 leading-relaxed">${n.message}</p>
        <div class="mt-2.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
            n.badgeType === 'urgent' ? 'bg-rose-100 text-rose-700' :
            n.badgeType === 'warning' ? 'bg-purple-100 text-purple-700' :
            n.badgeType === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
          }">
            ${n.badgeText}
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

export function markAllNotificationsRead() {
  appState.notifications.forEach((n) => (n.isRead = true));
  saveState(appState);
  showToast('All notifications marked as read', 'success');
  renderNotifications();
}

export function clearAllNotifications() {
  appState.notifications = [];
  saveState(appState);
  showToast('Notifications cleared', 'info');
  renderNotifications();
}
