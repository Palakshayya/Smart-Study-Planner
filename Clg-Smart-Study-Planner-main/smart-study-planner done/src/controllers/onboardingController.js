/**
 * ============================================================================
 * ONBOARDING WIZARD CONTROLLER
 * ============================================================================
 * Manages the multi-step student registration and onboarding experience:
 * - Step 1: Account Information (Name, Email, Password)
 * - Step 2: Profile Setup (University, Major, Semester, Enrolled Courses)
 * - Step 3: Setup Step Three (Study Preferences, Weekly Schedule, Academic Goals)
 */

import { appState, saveState } from '../data/state.js';
import { showToast } from '../utils/toast.js';
import { playNotificationChime } from '../utils/audio.js';
import { switchMode } from './navigationController.js';
import { renderProfile, renderSettings } from './profileController.js';

export let currentOnboardingStep = 1;

/**
 * Initialize or reset onboarding back to Step 1
 */
export function initOnboarding() {
  currentOnboardingStep = 1;
  updateOnboardingUI();
}

/**
 * Navigate to a specific onboarding step with validation
 * @param {number} targetStep 
 */
export function goToOnboardingStep(targetStep) {
  // If moving forward from Step 1 to Step 2, validate Step 1 fields
  if (currentOnboardingStep === 1 && targetStep > 1) {
    const nameInput = document.getElementById('onboard-fullname');
    const emailInput = document.getElementById('onboard-email');
    const passInput = document.getElementById('onboard-password');
    const confirmInput = document.getElementById('onboard-password-confirm');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!name) {
      showToast('Please enter your full name', 'warning');
      nameInput?.focus();
      return;
    }

    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      emailInput?.focus();
      return;
    }

    if (passInput && confirmInput && passInput.value && confirmInput.value) {
      if (passInput.value !== confirmInput.value) {
        showToast('Passwords do not match', 'warning');
        confirmInput.focus();
        return;
      }
    }
  }

  // If moving forward from Step 2 to Step 3, validate Step 2 fields
  if (currentOnboardingStep === 2 && targetStep > 2) {
    const universityInput = document.getElementById('onboard-university');
    const majorInput = document.getElementById('onboard-major');

    const university = universityInput ? universityInput.value.trim() : '';
    const major = majorInput ? majorInput.value.trim() : '';

    if (!university) {
      showToast('Please enter your university or school', 'warning');
      universityInput?.focus();
      return;
    }

    if (!major) {
      showToast('Please enter your course or major', 'warning');
      majorInput?.focus();
      return;
    }
  }

  currentOnboardingStep = targetStep;
  updateOnboardingUI();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update the visual stepper and card visibility based on currentOnboardingStep
 */
export function updateOnboardingUI() {
  // 1. Show / Hide step container divs
  const step1El = document.getElementById('onboard-step-1');
  const step2El = document.getElementById('onboard-step-2');
  const step3El = document.getElementById('onboard-step-3');

  if (step1El) step1El.classList.toggle('hidden', currentOnboardingStep !== 1);
  if (step2El) step2El.classList.toggle('hidden', currentOnboardingStep !== 2);
  if (step3El) step3El.classList.toggle('hidden', currentOnboardingStep !== 3);

  // 2. Update progress bar fill
  const progressBar = document.getElementById('onboarding-progress-bar');
  if (progressBar) {
    if (currentOnboardingStep === 1) progressBar.style.width = '0%';
    else if (currentOnboardingStep === 2) progressBar.style.width = '50%';
    else if (currentOnboardingStep === 3) progressBar.style.width = '100%';
  }

  // 3. Update Step Pill 1
  const step1Indicator = document.getElementById('step-indicator-1');
  const step1Text = document.getElementById('step-text-1');
  if (step1Indicator && step1Text) {
    if (currentOnboardingStep > 1) {
      step1Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#5551FF] text-white shadow-xs';
      step1Indicator.innerHTML = '✓';
      step1Text.className = 'text-xs font-bold text-slate-800';
    } else {
      step1Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#5551FF] text-white ring-4 ring-indigo-100 shadow-xs';
      step1Indicator.innerHTML = '1';
      step1Text.className = 'text-xs font-bold text-[#5551FF]';
    }
  }

  // 4. Update Step Pill 2 (Profile Setup)
  const step2Indicator = document.getElementById('step-indicator-2');
  const step2Text = document.getElementById('step-text-2');
  if (step2Indicator && step2Text) {
    if (currentOnboardingStep > 2) {
      step2Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#5551FF] text-white shadow-xs';
      step2Indicator.innerHTML = '✓';
      step2Text.className = 'text-xs font-bold text-slate-800';
    } else if (currentOnboardingStep === 2) {
      step2Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#5551FF] text-white ring-4 ring-indigo-100 shadow-xs';
      step2Indicator.innerHTML = '2';
      step2Text.className = 'text-xs font-bold text-[#5551FF]';
    } else {
      step2Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200';
      step2Indicator.innerHTML = '2';
      step2Text.className = 'text-xs font-medium text-slate-400';
    }
  }

  // 5. Update Step Pill 3 (Setup Step Three)
  const step3Indicator = document.getElementById('step-indicator-3');
  const step3Text = document.getElementById('step-text-3');
  if (step3Indicator && step3Text) {
    if (currentOnboardingStep === 3) {
      step3Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#5551FF] text-white ring-4 ring-indigo-100 shadow-xs';
      step3Indicator.innerHTML = '3';
      step3Text.className = 'text-xs font-bold text-[#5551FF]';
    } else {
      step3Indicator.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-400 border border-slate-200';
      step3Indicator.innerHTML = '3';
      step3Text.className = 'text-xs font-medium text-slate-400';
    }
  }
}

/**
 * Toggle preferred study days (Mon-Sun)
 * @param {HTMLElement} btn 
 */
export function toggleOnboardingDay(btn) {
  const isSelected = btn.classList.contains('bg-[#5551FF]');
  if (isSelected) {
    btn.className = 'onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer select-none';
  } else {
    btn.className = 'onboard-day-btn px-3 py-1.5 rounded-lg text-xs font-bold bg-[#5551FF] text-white shadow-xs transition-colors cursor-pointer select-none';
  }
}

/**
 * Toggle subjects enrolled during Step 2
 * @param {HTMLElement} btn 
 */
export function toggleOnboardingSubject(btn) {
  const isSelected = btn.classList.contains('bg-indigo-50');
  if (isSelected) {
    btn.className = 'onboard-subject-btn px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5';
    const check = btn.querySelector('.subject-check');
    if (check) check.textContent = '+';
  } else {
    btn.className = 'onboard-subject-btn px-3 py-1.5 rounded-xl border border-[#5551FF] text-[#5551FF] bg-indigo-50 font-semibold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs';
    const check = btn.querySelector('.subject-check');
    if (check) check.textContent = '✓';
  }
}

/**
 * Final submission handler for Step 3
 * Saves profile data, updates application state, and switches to planner dashboard
 * @param {Event} e 
 */
export function handleFinishOnboarding(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('onboard-fullname');
  const emailInput = document.getElementById('onboard-email');
  const universityInput = document.getElementById('onboard-university');
  const majorInput = document.getElementById('onboard-major');
  const semesterInput = document.getElementById('onboard-semester');
  const studentIdInput = document.getElementById('onboard-student-id');
  const goalInput = document.getElementById('onboard-goal');
  const hoursInput = document.getElementById('onboard-hours');

  const fullName = nameInput ? nameInput.value.trim() : (appState.user.fullName || 'Student');
  const parts = fullName.split(' ');
  const firstName = parts[0] || 'Student';
  const lastName = parts.slice(1).join(' ') || '';
  const email = emailInput ? emailInput.value.trim() : (appState.user.email || 'student@university.edu');
  const institution = universityInput ? universityInput.value.trim() : (appState.user.institution || 'State University');
  const major = majorInput ? majorInput.value.trim() : (appState.user.major || 'Computer Science');
  const semester = semesterInput ? semesterInput.value : (appState.user.currentYear || 'Fall 2024');
  const studentId = studentIdInput && studentIdInput.value.trim() ? studentIdInput.value.trim() : appState.user.studentId;
  const bio = goalInput && goalInput.value.trim() ? goalInput.value.trim() : appState.user.bio;

  // Persist into appState
  appState.user = {
    ...appState.user,
    firstName,
    lastName,
    fullName,
    email,
    institution,
    major,
    currentYear: semester,
    studentId,
    bio
  };

  // If a goal was provided, add or update active goal
  if (goalInput && goalInput.value.trim()) {
    const goalTitle = goalInput.value.trim();
    const existingGoal = appState.goals.find((g) => g.status === 'active');
    if (existingGoal) {
      existingGoal.title = goalTitle;
    } else {
      appState.goals.unshift({
        id: `goal_${Date.now()}`,
        title: goalTitle,
        targetDate: 'End of Semester',
        status: 'active',
        progress: 10,
        category: 'Academic'
      });
    }
  }

  saveState(appState);
  renderProfile();
  renderSettings();

  playNotificationChime();
  showToast(`🎉 Welcome, ${firstName}! Your academic profile and study plan are ready.`, 'success');

  // Launch dashboard planner
  switchMode('app');

  // Reset wizard back to step 1 for future runs
  currentOnboardingStep = 1;
}

/**
 * Toggle custom styled dropdown open/closed
 * @param {string} dropdownId 
 */
export function toggleCustomDropdown(dropdownId) {
  const menu = document.getElementById(`${dropdownId}-menu`);
  const chevron = document.getElementById(`${dropdownId}-chevron`);
  if (!menu) return;

  const isHidden = menu.classList.contains('hidden');

  // Close all other open dropdowns first
  document.querySelectorAll('.custom-dropdown-menu').forEach((otherMenu) => {
    if (otherMenu.id !== `${dropdownId}-menu`) {
      otherMenu.classList.add('hidden');
    }
  });
  document.querySelectorAll('.custom-dropdown-chevron').forEach((otherChev) => {
    if (otherChev.id !== `${dropdownId}-chevron`) {
      otherChev.classList.remove('rotate-180');
    }
  });

  if (isHidden) {
    menu.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    menu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

/**
 * Handle selecting an option inside a custom dropdown
 * @param {string} dropdownId 
 * @param {string} value 
 * @param {string} labelHtml 
 */
export function selectCustomDropdownOption(dropdownId, value, labelHtml) {
  // Update hidden input value
  const hiddenInput = document.getElementById(dropdownId);
  if (hiddenInput) {
    hiddenInput.value = value;
  }

  // Update trigger display label
  const labelEl = document.getElementById(`${dropdownId}-label`);
  if (labelEl) {
    labelEl.innerHTML = labelHtml;
  }

  // Update checkmarks and active highlight inside options list
  const menu = document.getElementById(`${dropdownId}-menu`);
  if (menu) {
    menu.querySelectorAll('.dropdown-item').forEach((item) => {
      const itemVal = item.getAttribute('data-value');
      const checkEl = item.querySelector('.dropdown-check');
      if (itemVal === value) {
        item.classList.add('bg-indigo-50/90', 'text-[#5551FF]', 'font-semibold');
        item.classList.remove('text-slate-700');
        if (checkEl) checkEl.classList.remove('opacity-0');
      } else {
        item.classList.remove('bg-indigo-50/90', 'text-[#5551FF]', 'font-semibold');
        item.classList.add('text-slate-700');
        if (checkEl) checkEl.classList.add('opacity-0');
      }
    });

    // Close menu
    menu.classList.add('hidden');
  }

  const chevron = document.getElementById(`${dropdownId}-chevron`);
  if (chevron) chevron.classList.remove('rotate-180');
}

// Global outside-click closer for custom dropdowns
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown-container')) {
      document.querySelectorAll('.custom-dropdown-menu').forEach((menu) => {
        menu.classList.add('hidden');
      });
      document.querySelectorAll('.custom-dropdown-chevron').forEach((chev) => {
        chev.classList.remove('rotate-180');
      });
    }
  });
}

