/**
 * ============================================================================
 * LANDING PAGE INTERACTIVE SIMULATION SERVICE
 * ============================================================================
 * Powers the interactive AI auto-rebalance schedule demo on the marketing landing page.
 */

import { showToast } from '../utils/toast.js';

export function initLandingInteractivity() {
  const triggerBtn = document.getElementById('trigger-overrun-btn');
  const demoAlert = document.getElementById('demo-delayed-alert');
  const demoResolved = document.getElementById('demo-resolved-alert');

  if (triggerBtn && demoAlert && demoResolved) {
    triggerBtn.onclick = () => {
      triggerBtn.disabled = true;
      triggerBtn.classList.add('opacity-75');
      triggerBtn.innerHTML = '<span>⚡ Auto-Rebalancing Algorithm Executing...</span>';

      setTimeout(() => {
        demoAlert.classList.remove('hidden');
        demoResolved.classList.remove('hidden');
        triggerBtn.innerHTML = '<span>✓ Tasks Successfully Re-Allocated!</span>';
        showToast('Dynamic calendar engine redistributed 3 tasks without conflict!', 'success');

        setTimeout(() => {
          triggerBtn.disabled = false;
          triggerBtn.classList.remove('opacity-75');
          triggerBtn.innerHTML = '<span>Trigger Sudden 2-Hour Lab Overrun</span>';
        }, 4000);
      }, 700);
    };
  }
}
