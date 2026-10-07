/**
 * ============================================================================
 * TOAST NOTIFICATION UTILITY
 * ============================================================================
 * Displays transient, elegant toast notifications at the bottom-right corner.
 */

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold text-white transition-all transform duration-300 flex items-center gap-2 pointer-events-auto ${
    type === 'success'
      ? 'bg-emerald-600'
      : type === 'warning'
      ? 'bg-amber-600'
      : type === 'error'
      ? 'bg-rose-600'
      : 'bg-slate-900'
  }`;

  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
